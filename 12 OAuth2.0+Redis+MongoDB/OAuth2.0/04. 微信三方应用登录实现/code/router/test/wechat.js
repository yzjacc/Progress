const router = require('koa-router')()
const SECRET_ACCESS_KEY = '26f6213816b547d8864d76382ed58a8a'
const axios = require('axios')
let userInfo = null

/* 登录界面静态地址 */
router.get('/', async ctx => {
  await ctx.render('login')

})
/* home页面 */
router.get('/home', async ctx => {
  await ctx.render('home')
})

/* 定义一个获取二维码URL的请求接口 */
router.get('/getQrCodeUrl', async ctx => {
  const res = await axios.get(`https://server01.vicy.cn/8lXdSX7FSMykbl9nFDWESdc6zfouSAEz/wxLogin/tempUserId?secretKey=${SECRET_ACCESS_KEY}`)
  if (res.data.errcode !== 0) return
  ctx.body = { code: 0, data: res.data.data }
})


/* 接收微信账户信息接口 */
router.post('/callback', async ctx => {
  /* 获取微信的用户信息 */
  userInfo = ctx.request.body
  ctx.body = { errcode: 0, message: '我已经请求成功了' }
})

/* 获取用户信息 */
router.get('/getUserInfo', async ctx => {
  ctx.body = { code: 0, userInfo }
})

module.exports = router
