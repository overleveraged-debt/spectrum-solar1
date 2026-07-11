export default {
  name: 'pageContent',
  type: 'document',
  title: 'Page Content',
  fields: [
    {
      name: 'pageId',
      type: 'string',
      title: 'Page ID',
      description: 'Unique identifier for the page (e.g., "home", "about", "power-backup")',
    },
    {
      name: 'pageName',
      type: 'string',
      title: 'Page Name',
    },
    {
      name: 'content',
      type: 'text',
      title: 'Page Data (JSON String)',
      description: 'Holds all the page-specific texts, images, and section visibility configurations',
    },
  ],
}
