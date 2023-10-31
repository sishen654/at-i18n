// 1) 注释
export function checkStartComment(str: string) {
  return /(^\s*\/\/)|(^\s*[/][*])|(^\s*{\s*[/][*])/.test(str)
};
export function checkContainComment(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/([\w\W]+)(\s*\/\/)|([\w\W]+)(\s*[/][*])/) || []
  return matchArr[1] || matchArr[3]
};


// 2) 组件属性
// case1: 不带括号情况
export function checkCnInCompoentCase1(str: string) {
  if (!checkCn(str)) return;
  if (checkInitVariable(str)) return;
  if (checkBlock(str)) {
    const bolckContent = getBlock(str)
    const bol = bolckContent?.some(block => checkCn(block.match(/<[\w\W]+>(.+)<\/[\w\W]+>/)?.[1] as string))
    if (bol) return;
  }
  if (/{.*[\u4e00-\u9fa5]+.*}/.test(str)) return;
  const matchArr = str.match(/\s*=[^{[]*\s*(['"][\w\W]+['"])\s*/) || []
  return getCnInSemicolon(matchArr[0] as string)
}
// case2: 带括号情况
export function checkCnInCompoentCase2(str: string) {
  if (!checkCn(str)) return;
  if (checkBlock(str)) return;
  const matchArr = str.match(/\s*=\s*{\s*([^`<][\w\W]+[^>])}/) || []
  return getCnInSemicolon(matchArr[1])
}
// case3: 带括号且内部是使用 ` 进行字符串的转换
export function checkCnInCompoentCase3(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/\s*=\s*{\s*(`[\w\W]+`)\s*}/) || []
  return getCnInSuperSemicolon(matchArr[1])
}


// 3) 元素标签内部
// case3.1: 前面有元素标签
export function checkCnInElementCase1(str: string) {
  if (!checkCn(str)) return;
  if (!checkBlock(str)) return;
  let matchArr = str.match(/<[\w\W]+>[^\u4e00-\u9fa5]*([\u4e00-\u9fa5“”，]+[:：]*[？?]*[\w]*[\.]*[\u4e00-\u9fa5“”，？?]*)<\/[\w\W]+>/) || []
  // 新的判断
  if (matchArr.length === 0) {
    matchArr = str.match(/<[\w\W]+>[\d.]*([\u4e00-\u9fa5]+[\u4e00-\u9fa5\w\d。，]+)<\/[\w\W]+>/) || []
    if (matchArr.length > 0) {
      return [matchArr[1]]
    }
  }
  if (matchArr.length === 0) {
    matchArr = str.match(/<[\w\W]+>[\d.]*([\u4e00-\u9fa5]+[\u4e00-\u9fa5\w\d。，:：x\/]+)<\/[\w\W]+>/) || []
    if (matchArr.length > 0) {
      return [matchArr[1]]
    }
  }
  return getCn(str)
}
// case3.2: 整行只有一个中文
export function checkCnInElementCase2(str: string) {
  if (!checkCn(str)) return;
  if (!/\s{3}\s*[^\u4e00-\u9fa5：:]*[\u4e00-\u9fa5“”，]+/g.test(str)) return;
  return getCn(str)
}

// 4) 模板字符串
export function checkCnInSuperStr(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/`[\w\W]+`/) || []
  return getCnInSuperSemicolon(matchArr[0] as string)
}

// 5) 变量&兜底
export function checkCnInValue(str: string) {
  let arr = []
  if (!checkCn(str)) return;
  if (/<[\w\W]+>.+<\/[\w\W]+>/.test(str)) {
    const matchVal = str.match(/<[\w\W]+>.+<\/[\w\W]+>/) || []
    const val = matchVal[0] as string
    if (!checkCn(val)) {
      str = str.replace(val as string, "{abc}")
    }
  }
  let matchArr = str.match(/["'`]*(\w*[\u4e00-\u9fa5“”，（）]+[？?-]*[\w]*[\.]*[\u4e00-\u9fa5“”，？?（）\/\s<=\d、&())]*)\w*[\u4e00-\u9fa5“”，？?（）\/\s<=\d、：m³)]*["'`]*/g) || []
  return [...new Set(matchArr.map(v => v.trim()))]
}

// util
export function checkCn(str: string) {
  return /[\u4e00-\u9fa5“”，]+/g.test(str)
}
export function checkBlock(str: string) {
  return /<[\w\W]+>.+<\/[\w\W]+>/g.test(str)
}
export function checkInitVariable(str: string) {
  return /^\s*((const)|(let)|(var))/.test(str)
}
// 提取有引号的值
export function getCnInSemicolon(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/\s*(['"][\w]*[\u4e00-\u9fa5“”，\.：:\/]+\s*[\w]*[\u4e00-\u9fa5“”，\.：:？?]*['"])\s*/g) || []
  if (matchArr.length === 0) return getCn(str);
  return [...new Set(matchArr.map(v => v.trim()))]
}
// 提取有 ` 的值
export function getCnInSuperSemicolon(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/[\u4e00-\u9fa5“”，]+[\w]*[\u4e00-\u9fa5“”，]+/g) || []
  return [...new Set(matchArr.map(v => v.trim()))]
}
// 提取有中文的值
export function getCn(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/[\u4e00-\u9fa5“”，。]+\w*[\u4e00-\u9fa5“”，。]*\d*[\u4e00-\u9fa5“”，。]*/g) || []
  return [...new Set(matchArr.map(v => v.trim()))]
}
// 提取有中文的值
export function getBlock(str: string) {
  if (!checkCn(str)) return;
  const matchArr = str.match(/<[\w\W]+>.+<\/[\w\W]+>/g) || []
  return [...new Set(matchArr.map(v => v.trim()))]
}

