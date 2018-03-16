/* eslint-disable no-template-curly-in-string */
module.exports = {
  '/': {
    title: process.env.SEO_TITLE || 'Mean Stack JS Demo'
  },
  '/404': {
    title: process.env.SEO_404 || 'Page Not Found'
  },
  '/500': {
    title: process.env.SEO_500 || 'Server Side Error'
  },
  '/signin': {
    title: process.env.SEO_LOG_IN || 'Signin to Mean Stack JS'
  },
  '/signup': {
    title: process.env.SEO_SIGN_UP || 'Join Mean Stack JS '
  },
  '/account': {
    title: process.env.SEO_ACCOUNT || '<%= user.profile.name %> Account'
  },
  '/forgot': {
    title: process.env.SEO_FORGOT || 'Forgot Your Password '
  },
  '/reset/': {
    title: process.env.SEO_RESET || 'reset '
  },
  '/blog/create': {
    title: process.env.SEO_CREATE || 'Create a New Blog'
  },
  '/blog/edit/': {
    title: process.env.SEO_EDIT || 'Edit Your Blog'
  },
  '/blog/list': {
    title: process.env.SEO_LIST || 'Blog List'
  },
  '/blog/view/:id': {
    title: '<%=  blog.title  %> -  <%=  blog.user.profile.name %> ',
    keywords: '<%=  blog.tags  %>',
    description: '<%=  blog.content  %> ',
    ogUrl: '<%=  path  %>',
    twitterUrl: '<%=  path  %>',
    canonical: '<%=  path  %>',
    ogTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    twitterTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    ogDescription: '<%=  blog.content  %> ',
    twitterDescription: '<%=  blog.content  %> ',
    hook: function (self, data, cb) {
      data.blog = {
        tags: process.env.SEO_TAGS || ['Add', 'Tags', 'To Blog', 'Mean Stack JS']
      }
      self.models.blog.findOne({_id: data.params.id}).populate('user').lean().then(function (blog) {
        data.blog = Object.assign({}, data.blog, blog)
        cb(null, data)
      }).catch(function (error) {
        cb(error)
      })
    }
  }
}
