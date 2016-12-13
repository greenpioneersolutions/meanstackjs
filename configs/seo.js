/* eslint-disable no-template-curly-in-string */
var _ = require('lodash')
module.exports = {
  '/': {
    title: 'Index',
    keywords: 'Main Index Seo',
    description: 'Main description'
  },
  '/404': {
    title: '404'
  },
  '/500': {
    title: '500'
  },
  '/signin': {
    title: 'signin '
  },
  '/signup': {
    title: 'signup '
  },
  '/account': {
    title: 'account '
  },
  '/forgot': {
    title: 'forgot '
  },
  '/reset/': {
    title: 'reset '
  },
  '/blog/create': {
    title: 'blog create '
  },
  '/blog/edit/': {
    title: 'blog edit '
  },
  '/blog/list': {
    title: 'blog list '
  },
  '/blog/view/:id': {
    title: '${ blog.title } -  ${ blog.user.profile.name } ',
    keywords: '${ blog.tags } ',
    description: '${ blog.content } ',
    ogUrl: '${ path }',
    twitterUrl: '${ path }',
    canonical: '${ path }',
    hook: function (self, data, cb) {
      data.blog = {
        tags: ['Add', 'Tags', 'To Blog', 'Mean Stack JS']
      }
      self.models.blog.findOne({_id: data.params.id}).populate('user').then(function (blog) {
        data.blog = _.merge(data.blog, blog)
        cb(null, data)
      }).catch(function (err) {
        cb(err)
      })
    }
  },
  '/todo/create': {
    title: 'todo create '
  },
  '/todo/edit/': {
    title: 'todo edit '
  },
  '/todo/list': {
    title: 'todo list '
  }
}
