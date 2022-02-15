const Koa = require('koa')
const app = new Koa()
const path = require('path')
const staticFiles = require('koa-static')
const views = require('koa-views')
const router = require('koa-router')()
/* 阿里支付相关 */
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default
/* 导入密钥文件 */
const config = require('./config')


app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(views('views', { map: { html: 'ejs' } }))

/* 静态界面展示 */
router.get('/', async ctx => {
  console.log(ctx.query)
  await ctx.render('alipay')
})

/* 阿里点击提交按钮跳转 */
router.get('/alipay/:payMoney', async ctx => {
  const alipaySdk = new AlipaySdk({
    appId: '2021000117660787',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    signType: 'RSA2',
    privateKey: config.privateKey,
    alipayPublicKey: config.alipayPublicKey
  })

  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  formData.addField('returnUrl', 'http://localhost:3000/');
  formData.addField('bizContent', {
    outTradeNo: Date.now().toString(),
    productCode: 'FAST_INSTANT_TRADE_PAY', //销售产品码
    totalAmount: (+ctx.params.payMoney).toFixed(2),
    subject: '商品',
    body: '支付测试商品',
  });

  /* 获取响应结果值 */
  const result = await alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  ctx.redirect(result)
})

app.use(router.routes(), router.allowedMethods())

/* 程序响应 */
const server = app.listen(3000, () => {
  console.log(`api请求服务开启，端口${server.address().port}`)
})
