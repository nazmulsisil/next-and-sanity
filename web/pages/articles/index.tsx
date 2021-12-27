import { Post } from 'codegen/schema'
import { Layout } from 'Components/layout'
import { indexQuery } from 'lib/queries'
import { getClient, overlayDrafts } from 'lib/sanity.server'

interface IndexProps {
  preview?: boolean
  allPosts?: Post[]
}

export default function Index({ allPosts, preview }: IndexProps) {
  return (
    <>
      <Layout>
        {allPosts &&
          allPosts?.length > 0 &&
          allPosts.map((post: Post) => {
            return (
              <div key={post.title}>
                <div>{preview && <b>Preview mode!</b>}</div>
                <div>
                  {post.title} - <a href={`/articles/${post.slug}`}>visit</a>
                </div>
              </div>
            )
          })}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  return {
    props: { allPosts, preview },
  }
}
