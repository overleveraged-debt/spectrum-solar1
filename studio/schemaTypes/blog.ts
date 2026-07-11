export default {
  name: 'blog',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
    },
    {
      name: 'body',
      type: 'text',
      title: 'Body Content (Markdown or Rich Text)',
    },
  ],
}
