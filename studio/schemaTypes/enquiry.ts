export default {
  name: 'enquiry',
  type: 'document',
  title: 'Enquiry Submission',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'type', type: 'string', title: 'Inquiry Type' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'productSlug', type: 'string', title: 'Related Product Page Slug' },
    { name: 'createdAt', type: 'datetime', title: 'Submitted At' }
  ]
}
