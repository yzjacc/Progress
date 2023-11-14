const Mock = require("mockjs");

const locale = "en-US";

const result = Mock.mock({
  "list|3-8": [{
    'title': locale === 'en-US' ? '@title(4)' :'@ctitle(4)',
    'content': locale === 'en-US' ? '@paragraph(4,10)' : '@cparagraph(4,10)',
    'author': locale === 'en-US' ? '@name' : '@cname',
    'locale': locale
  }]
}).list;

module.exports = result;