export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'metaDescription',
      title: 'Meta description',
      type: 'string',
      validation: (Rule) =>
        Rule.max(160).warning(`A title shouldn't be more than 160 characters.`),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImageAltText',
      title: 'Hero image alt text',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          title: 'Tag properties',
          type: 'object',
          fields: [
            {
              title: 'Label',
              name: 'label',
              type: 'string',
            },
            {
              title: 'Value',
              name: 'value',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        //Locks menu from creating new tags (defaults to false)
        frozen: true,
        //Preset of tags (defaults to empty)
        preload: [
          { label: 'Touch typing', value: 'touchTyping' },
          { label: 'Productivity', value: 'productivity' },
          { label: 'Student', value: 'student' },
          { label: 'Job', value: 'job' },
        ],
        //Closes menu after tag selected (defaults to true)
        closeMenuOnSelect: true,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
