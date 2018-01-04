var mongodbUri = process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost/test'
module.exports = {
  minify: process.env.MINIFY || 'concat', // 'concat' all files or 'minify' concat and minfy  or 'default' leave as is
  html: {
    title: process.env.HTML_TITLE || 'Test MEANSTACKJS'
  },
  logger: 'common',
  cdn: process.env.CDN || false,
  buildreq: {
    console: false
  },
  maxcdn: {
    zoneId: process.env.MAXCDN_ZONE_ID || false
  },
  mongoexpress: {
    port: process.env.MONGOEXPRESSPORT || 8081
  },
  socketio: {
    port: process.env.SOCKETIOPORT || 8282
  },
  http: {
    active: process.env.HTTP_ACTIVE || true,
    port: process.env.PORT || 3000
  },
  https: {
    active: process.env.HTTPS_ACTIVE || false,
    redirect: true,
    port: process.env.HTTPSPORT || 3043,
    key: process.env.HTTPS_KEY || './configs/certificates/keyExample.pem',
    cert: process.env.HTTPS_CERT || './configs/certificates/certExample.pem'
  },
  throttle: {
    rateLimit: {
      ttl: 600,
      max: 1000
    },
    mongoose: {
      uri: mongodbUri
    }
  },
  mongodb: {
    uri: mongodbUri,
    // Database options that will be passed directly to mongoose.connect
    // Below are some examples.
    // See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
    // and http://mongoosejs.com/docs/connections.html for more information

    options: {
      // server: {
      //   socketOptions: {
      //     keepAlive: 1
      //   },
      //   poolSize: 5
      // },
      // replset: {
      //   rs_name: 'myReplicaSet',
      //   poolSize: 5
      // },
      db: {
        w: 1,
        numberOfRetries: 2
      }
    }
  },
  agendash: {
    active: true,
    options: {
      db: {
        address: mongodbUri
      }
    }
  }
}
