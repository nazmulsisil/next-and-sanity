### About

A Next.js app with Sanity CMS connected. I created this starter for TypingMentor.com.

### Deployment

This app is to be deployed on Vercel.

### CMS

Sanity.io has been used as the CMS. The articles should be published through this for the ease of the content writers for content marketing.

Also a cron-job has been created for the content writers so that they can set up the schedule for their drafted posts to be published.

How the cron-job works?

- The scheduled post updater api route is called by the cron-job set up here https://console.cron-job.org/ using sisil8sisil@gmail.com
- You need to update/create a post on https://typingmentor.sanity.studio/
- Set the publishedAt field value at a future date
- Now you have scheduled a post to be published
- A cron-job has been set to call this route "/publish-scheduled-posts" every day at 9am. https://console.cron-job.org/
- This current file (api route handler) fetches the scheduled posts through a groq query
- And publishes it by invoking the publish() function above.
- On Sanity.io a web hook is active which calls the vercel deployment hook after a post is created, deleted, or edited.
- In this case, a scheduled post has been published, so, Sanity webhook calls the vercel deployment hook to trigger a deployment, and after deployment the latest content will appear.
- In the case you want a scheduled post to publish before 9am because the scheduled time has passed already, you can call the api route '/publish-scheduled-posts' manually which will execute the same process.
