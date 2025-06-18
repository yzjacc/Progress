const https = require("https");

function sendRequest(cateCodeList) {
  const index = Math.floor(Math.random() * cateCodeList.length);
  const randomCateCode = cateCodeList[index].value;
  const randomCateName = cateCodeList[index].name;
  // 替换为 curl 中的 data
  const data = JSON.stringify({
    areaCode: "510099",
    longitude: "104.0433064778646",
    latitude: "30.55301432291667",
    acquireType: "1",
    cateCode: randomCateCode,
    activityId: null,
    engGrade: null,
    coordType: "gcj02ll",
  });

  // 替换为 curl 中的 headers
  const options = {
    hostname: "scene.cup.com.cn",
    path: "/gfmnewsc/appback/couponAcquire",
    method: "POST",
    headers: {
      Host: "scene.cup.com.cn",
      Cookie: "route=4a30cb11a4af272e935642d445afb713",
      Connection: "keep-alive",
      "X-Tingyun": "c=B|p35OnrDoP8k;x=795c2fc6ba154601",
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Sec-Fetch-Site": "same-origin",
      appNo: "YJHXJD3C044125017",
      channelNo: "Q000101",
      "Sec-Fetch-Mode": "cors",
      token:
        "bj_0e779c3482d9312392e5442081c7a4276c1731dd6e4a08bc0d8d72c1ffc76616_bj",
      Origin: "https://scene.cup.com.cn",
      bankCode: "",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148  (com.unionpay.chsp) (cordova 4.5.4) (updebug 0) (version 1022) (UnionPay/1.0 CloudPay) (clientVersion 322) (language zh_CN) (languageFamily zh_CN) (upHtml) (walletMode 00)",
      Referer:
        "https://scene.cup.com.cn/gsp_front/2025/online?appNo=YJHXJD3C044125017&channelNo=Q000101",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Sec-Fetch-Dest": "empty",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = https.request(options, (res) => {
    let result = "";
    res.on("data", (chunk) => {
      result += chunk;
    });
    res.on("end", () => {
      try {
        const json = JSON.parse(result);
        console.log("线上:", randomCateName, "返回:", json);
      } catch (e) {
        console.log("线上:", randomCateName, "原始返回:", result);
      }
    });
  });

  req.on("error", (error) => {
    console.error("请求出错:", error);
  });

  req.write(data);
  req.end();
}
module.exports = {
  sendRequest,
};
