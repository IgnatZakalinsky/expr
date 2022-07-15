import env from 'dotenv'

const IS_DEVELOPER_VERSION = !process.env.PORT // false if release
IS_DEVELOPER_VERSION && env.config() // set env in developer mode

export const SETTINGS = {
    PORT: process.env.PORT || 5000,
    IS_DEVELOPER_VERSION,
    MONGO_DB_URIS: process.env.MONGO_DB_URIS || 'no-db-uris',
    GMAIL_PASS: process.env.GMAIL_PASS || 'no-pass',
    GMAIL_LOGIN: process.env.GMAIL_LOGIN || 'no-login',
    SECRET: process.env.SECRET || 'no-secret',
}
