exports.models = {
  Blog: {
    id: 'Blog',
    required: [],
    properties: {
      created: {
        type: 'date',
        description: 'created of the blog'
      },
      title: {
        type: 'string',
        description: 'title of the blog'
      },
      content: {
        type: 'string',
        description: 'content of the blog'
      },
      user: {
        type: 'string',
        description: 'Ref to the user'
      }
    }
  }
}
