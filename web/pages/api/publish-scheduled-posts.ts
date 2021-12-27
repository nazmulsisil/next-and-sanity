// import { sanityConfig } from 'lib/config'
import { Post } from 'codegen/schema'
import { getWriteClient, SanityClient } from 'lib/sanity.server'
import { NextApiRequest, NextApiResponse } from 'next'

const client = getWriteClient()

// Query for any scheduled publish events that should occur
const query = `* [_type == "schedule.metadata" && !(_id in path("drafts.**")) && datetime <= now()]`

const publish = async (metadata: Post, client: SanityClient) => {
  const dataset = client.config().dataset
  const id = metadata._id
  const rev = metadata._rev

  // Fetch the draft revision we should publish from the History API
  const uri = `/data/history/${dataset}/documents/drafts.${id}?revision=${rev}`
  const revision = await client
    .request({ uri })
    .then((response: { documents: Document[] }) => {
      return response.documents.length && response.documents[0]
    })

  if (!revision) {
    // Here we have a situation where the scheduled revision does not exist
    // This can happen if the document was deleted via Studio or API without
    // un-scheduling it first.
    // eslint-disable-next-line no-console
    console.error('Could not find document revision to publish', metadata)
    return
  }

  // Publish it
  return (
    client
      .transaction()
      // Publishing a document is simply writing it to the dataset without a
      // `drafts.` prefix. The `documentId` field on the metadata already does
      // not include this prefix, but the revision we fetched probably does, so
      // we overwrite it here.
      // HIGHLIGHT: removing this "any" is difficult
      .createOrReplace(Object.assign({} as any, revision, { _id: id }))
      // Then we delete any current draft.
      .delete(`drafts.${id}`)
      // And finally we delete the schedule metadata, since we're done with it.
      .delete(metadata._id)
      .commit()
  )
}

/**
 * HIGHLIGHT: This route is called by the cron-job set here https://console.cron-job.org/ using sisil8sisil@gmail.com login
 * HIGHLIGHT: How it works?
 * - You need to update/create a post on https://typingmentor.sanity.studio/
 * - Set the publishedAt field value at a future date
 * - Now you have scheduled a post to be published
 * - A cron-job has been set to call this route "/publish-scheduled-posts" every day at 9am. https://console.cron-job.org/
 * - This current file (api route handler) fetches the scheduled posts through a groq query
 * - And publishes it by invoking the publish() function above.
 * - On Sanity.io a web hook is active which calls the vercel deployment hook after a post is created, deleted, or edited.
 * - In this case, a scheduled post has been published, so, Sanity webhook calls the vercel deployment hook to trigger a deployment, and after deployment the latest content will appear.
 * - In the case you want a scheduled post to publish before 9am because the scheduled time has passed already, you can call the api route '/publish-scheduled-posts' manually which will execute the same process.
 */
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  client.fetch(query).then((response: Post[]) => {
    return Promise.all(
      response.map((metadata: Post) => publish(metadata, client))
    )
  })
  return res.end()
}
