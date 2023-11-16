let templateStyle //临时模板style

export default function scopedCSS(styleElement, appName) {
  //设置前缀
  const prefix = `micro-app[name=${appName}]`;
  //因为现在style标签还没有被加载到浏览器上，现在还获取不了sheet
  // console.log(styleElement.sheet);
  // console.log(styleElement.textContent);

  //初始化模板
  if (!templateStyle) {
    templateStyle = document.createElement("style");
    //把临时模板放入到浏览器界面上
    document.body.appendChild(templateStyle);
    //为了不对界面产生影响，设置这个样式为disabled
    templateStyle.sheet.disabled = true;
  }

  if (styleElement.textContent) { 
    //将style标签的内容放入到模板中
    templateStyle.textContent = styleElement.textContent;
    // console.log(templateStyle.sheet);
    //将css前缀替换之后，修改tyleElement.textContent的内容
    styleElement.textContent = scopedRule(Array.from(templateStyle.sheet.cssRules)||[],prefix)

    //将模板清空
    templateStyle.textContent = "";
  }
}

//根据不同的rule进行不同的操作
//就是样将不同的rule加上前缀
function scopedRule(rules, prefix) { 
  let result = "";
  for (const rule of rules) { 
    switch (rule.type) { 
      case 1: //STYLE_RULE
        result += scopedStyleRule(rule, prefix);
        break;
      case 4: //MEDIA_RULE
        result += scopedPackRule(rule, prefix, 'media');
        break;
      case 12: //SUPPORTS_RULE
        result += scopedPackRule(rule, prefix, 'supports');
        break;
      default:
        result += rule.cssText;
        break;
    }
  }
  return result;
}

function scopedPackRule(rule, prefix, packName) { 
  //递归执行scopedRule，处理media和supports内部规则
  const result = scopedRule(Array.from(rule.cssRules), prefix);
  return `@${packName} ${rule.conditionText} {${result}}`;
}

/**
 * 修改CSS规则，添加前缀
 * @param {CSSRule} rule css规则
 * @param {string} prefix 前缀
 */
function scopedStyleRule (rule, prefix) {
  // 获取CSS规则对象的选择和内容
  const { selectorText, cssText } = rule

  // 处理顶层选择器，如 body，html,:root 都转换为 micro-app[name=xxx]
  if (/^((html[\s>~,]+body)|(html|body|:root))$/.test(selectorText)) {
    return cssText.replace(/^((html[\s>~,]+body)|(html|body|:root))/, prefix)
  } else if (selectorText === '*') {
    // 选择器 * 替换为 micro-app[name=xxx] *
    return cssText.replace('*', `${prefix} *`)
  }

  // 匹配顶层选择器，如 body，html
  const builtInRootSelectorRE = /(^|\s+)((html[\s>~]+body)|(html|body|:root))(?=[\s>~]+|$)/

  // 匹配查询选择器
  // div.test, div.layer{color:'red'}
  // micro-app[name=xxx] div.test, micro-app[name=xxx] div.layer{color:'red'}
  return cssText.replace(/^[\s\S]+{/, (selectors) => {
    return selectors.replace(/(^|,)([^,]+)/g, (all, $1, $2) => {
      // 如果含有顶层选择器，需要单独处理
      if (builtInRootSelectorRE.test($2)) {
        // body[name=xx]|body.xx|body#xx 等都不需要转换
        return all.replace(builtInRootSelectorRE, prefix)
      }
      // 在选择器前加上前缀
      return `${$1} ${prefix} ${$2.replace(/^\s*/, '')}`
    })
  })
}