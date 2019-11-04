module.exports = {
    PORT: process.env.PORT,
    CORS: process.env.CORS,
    DATABASE: {
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASS
    }
}
