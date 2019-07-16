module.exports = {
    development: {
      client: 'pg',
      connection: 'postgres://bookish:bookish@localhost:5432/Bookish',
      useNullAsDefault: true
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      useNullAsDefault: true
    }
  }