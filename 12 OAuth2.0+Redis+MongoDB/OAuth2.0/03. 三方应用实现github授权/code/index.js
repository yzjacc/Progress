const Koa = require("koa");
const router = require("koa-router")();
const staticFiles = require('koa-static')
const path = require('path')
const views = require('koa-views')
const axios = require('axios')
const qs = require('qs')
const app = new Koa();

let userInfo = {}

app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(views('views', { map: { html: 'ejs' } }))

/* 模板路由处理 */
router.get('/login', async ctx => {
  await ctx.render('login')
})
router.get('/home', async ctx => {
  await ctx.render('home', { userInfo })
})

/* 拦截前端的a链接跳转 */
router.get('/loginByGithub', async ctx => {
  /* 跳转到git获取授权码的地址  携带了client_id参数*/
  const path = 'https://github.com/login/oauth/authorize?client_id=fe22292cc3cd3b745357'
  ctx.redirect(path)
})

/* 创建一个授权码的地址路由 */
router.get('/callback/github', async ctx => {
  const { code } = ctx.query
  /* 请求令牌 post  params参数 */
  const accessToken = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: 'fe22292cc3cd3b745357',
    client_secret: '7b14729dca86abeaefd6996a341da01d853cf0e6',
    code
  })
  const { access_token } = qs.parse(accessToken.data)
  /* 获取用户的信息 */
  userInfo = await axios.get('https://api.github.com/user', {
    /* Bearer 后面记得跟一个空格 */
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  userInfo = userInfo.data
  ctx.redirect('/home')
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('server is running on port 3000')
})
