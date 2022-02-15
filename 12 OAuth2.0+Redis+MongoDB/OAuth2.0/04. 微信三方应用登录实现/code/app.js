const Koa = require('koa')
const app = new Koa()
// const Redis = require('koa-redis')
require('./config/global_config')
const path = require('path')
const staticFiles = require('koa-static')
const views = require('koa-views')

/* psot请求配置 */
const bodyParser = require('koa-bodyparser');
app.use(bodyParser({ formLimit: "8mb" }))



app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(views('views', { map: { html: 'ejs' } }))


/*接口根路由设置*/
const baseRouter = require('./router/')
app.use(baseRouter.routes(), baseRouter.allowedMethods())

/* 程序响应 */
const server = app.listen(process.env.PORT, () => {
  console.log(`api请求服务开启，端口${server.address().port}`)
})
