const Koa = require('koa')
const bodyParser = require('koa-body')
const logger = require('koa-logger')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')

const router = require('./router')
const config = require('./config')

const app = new Koa()

app.use(bodyParser())
app.use(logger())
app.use(
    cors({
        origin: ctx => config.CORS.includes(ctx.get('Origin')) && ctx.get('Origin')
    })
)
app.use(helmet())
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.PORT, () => console.log(`Listening on ${config.PORT}`))
