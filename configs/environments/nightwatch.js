module.exports = {
  http: {
    active: process.env.HTTP_ACTIVE || true,
    port: process.env.PORT || 3000
  },
  https: {
    active: process.env.HTTPS_ACTIVE || false,
    redirect: false,
    http2: true,
    port: process.env.HTTPSPORT || 3043,
    key: process.env.HTTPS_KEY || './configs/certificates/keyExample.pem',
    cert: process.env.HTTPS_CERT || './configs/certificates/certExample.pem'
  },
  mongodb: {
    uri: process.env.MONGODB || 'mongodb://localhost/nightwatch',
    options: {
      autoIndex: false,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    }
  }
}
