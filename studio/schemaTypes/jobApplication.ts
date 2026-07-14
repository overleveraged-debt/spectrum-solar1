export default {
  name: 'jobApplication',
  type: 'document',
  title: 'Job Application',
  fields: [
    { name: 'name', type: 'string', title: 'Applicant Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'position', type: 'string', title: 'Position Applied For' },
    { name: 'coverLetter', type: 'text', title: 'Cover Letter / Details' },
    { name: 'resumeUrl', type: 'string', title: 'Resume Link' },
    { name: 'createdAt', type: 'datetime', title: 'Submitted At' }
  ]
}
