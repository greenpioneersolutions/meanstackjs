var mongodbUri = process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost/prod'
module.exports = {
  minify: process.env.MINIFY || 'minify', // 'concat' all files or 'minify' concat and minfy  or 'default' leave as is
  html: {
    title: process.env.HTML_TITLE || 'MEANSTACKJS'
  },
  logger: 'combined',
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
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
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
