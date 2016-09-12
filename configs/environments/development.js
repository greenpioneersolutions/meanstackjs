module.exports = {
  html: {
    title: 'Development MEANSTACKJS'
  },
  logger: 'dev',
  cdn: process.env.CDN || false,
  buildreq: {
    console: true
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
    active: true,
    port: process.env.PORT || 3000
  },
  https: {
    active: false,
    port: process.env.HTTPSPORT || 3043,
    key: './configs/certificates/keyExample.pem',
    cert: './configs/certificates/certExample.pem'
  },
  mongodb: {
    uri: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'localhost') + '/dev',
    db: 'dev',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT_27017 || 27017,
    ssl: false,
    username: process.env.DB_USERNAME || '',
    debug: false,

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
        address: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'localhost') + '/dev'
      }
    }
  }
}
