exports.models = {
  User: {
    id: 'User',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        description: 'Email used for authentication and notifications'
      },
      password: {
        type: 'string',
        description: 'Password of the user'
      }
    }
  },
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
