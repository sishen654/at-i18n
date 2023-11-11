import path from "node:path"
import fs, { readFileSync, writeFileSync } from "node:fs"
import { ensureFile, ensureDir, remove } from "fs-extra"
import { getArgs, handlerError, getPathFromExecRoot, DirToJson, fileIsExits, judgeType, copyFile, copyDir, writeJsonSync, chalk } from "./util.js"
import { checkCn, checkCnInCompoentCase1, checkCnInCompoentCase2, checkCnInCompoentCase3, checkCnInElementCase1, checkCnInElementCase2, checkCnInSuperStr, checkCnInValue, checkContainComment, checkStartComment } from "./contains.js"

// 1 获取路径参数
const args = getArgs();
!args[0] && handlerError(new Error("请输入需要转换的路径参数"))
const READ_PATH = getPathFromExecRoot(args[0]);
const WRITE_PATH = READ_PATH + "=abc123abc"
let EN_PATH = ""
let CN_PATH = ""
let EN_PATH_TS = ""
let CN_PATH_TS = ""
let COPY_PATH = ""
const transformCN: any = {}
const transformEN: any = {}
let tranformCopy: string = ""

// 2 判断路径是否存在
fileIsExits(READ_PATH)

// 3 读取是文件夹还是文件
readDir()
async function readDir() {
  if (judgeType(READ_PATH) === "file") {
    EN_PATH = `${path.dirname(READ_PATH)}\\transform.en.json`
    CN_PATH = `${path.dirname(READ_PATH)}\\transform.cn.json`
    COPY_PATH = `${path.dirname(READ_PATH)}\\COPY_PATH.txt`
    // 1 删除文件
    await remove(WRITE_PATH)
    await remove(EN_PATH)
    await remove(CN_PATH)
    await remove(COPY_PATH)
    // 2 复制文件
    copyFile(READ_PATH, WRITE_PATH)
    ensureFile(EN_PATH)
    ensureFile(CN_PATH)
    // 3 转换该文件
    transformFile(WRITE_PATH, path.basename(WRITE_PATH))
  } else {
    EN_PATH = `${WRITE_PATH}\\transform.en.json`
    CN_PATH = `${WRITE_PATH}\\transform.cn.json`
    COPY_PATH = `${WRITE_PATH}\\COPY_PATH.txt`
    // 1 删除文件
    await remove(WRITE_PATH)
    // 2 复制一份文件夹
    copyDir(READ_PATH, WRITE_PATH)
    ensureFile(EN_PATH)
    ensureFile(CN_PATH)
    ensureFile(COPY_PATH)
    // 3 转化为 json
    const dirObj = DirToJson(WRITE_PATH)
    // 4 遍历转化 tsx 文件
    transformFolder(dirObj)
  }
  // 写入文件
  Object.keys(transformCN).forEach(key => tranformCopy += `${key}\n`)
  setTimeout(() => {
    writeFileSync(COPY_PATH, tranformCopy, { encoding: 'utf8' })
    writeJsonSync(EN_PATH, transformEN)
    writeJsonSync(CN_PATH, transformCN)
  }, 1000);
}

// 4 转化文件夹
function transformFolder(dirObj: any, lastKey?: string) {
  Object.keys(dirObj).forEach(key => {
    const val = dirObj[key]
    const filePath = `${WRITE_PATH}\\${lastKey ? lastKey + '\\' : ''}${val}`
    // 文件夹
    if (typeof val === "object") {
      transformFolder(val, `${lastKey ? lastKey + '\\' : ''}${key}`)
    }
    // 文件
    else {
      path.extname(val) === ".tsx" && transformFile(filePath, `${lastKey ? lastKey + '\\' : ''}${val}`)
    }
  })
}

// 5 转化 tsx 文件
function transformFile(filePath: string, key: string) {
  // 1 设置初始注释位置
  const tip = path.basename(READ_PATH) + "/" + key.replaceAll("\\", "/")
  transformCN[`==============${tip}==============`] = tip
  transformEN[`==============${tip}==============`] = ""
  // 2 读取文件内容
  const data = fs.readFileSync(filePath, "utf-8")
  // 3 逐行读取
  let newData = ""
  const lines = data.split(/\r?\n/);
  lines.forEach((line, lineIndex) => {
    // 1 读取为注释
    if (checkStartComment(line)) { /* 注释不需要操作 */ }
    // 2 读取行内包括注释，且行包括中文
    else if (checkContainComment(line)) {
      const val = checkContainComment(line) as string
      if (checkCn(val)) {
        const newVal = changeFont(val, lineIndex, lines)
        line = line.replace(val, newVal)
      }
    }
    // 3 读取为中文
    else if (checkCn(line)) {
      line = changeFont(line, lineIndex, lines)
    }
    // 4 重新赋值
    newData += `${line}${lineIndex === lines.length - 1 ? "" : "\n"}`
  });
  // 4 重写文件
  fs.writeFileSync(filePath, newData)
}

function changeFont(input: string, lineIndex: number, lines: string[]) {
  let arr: string[] = []
  if (checkCnInSuperStr(input)) {
    arr = checkCnInSuperStr(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, `\${$t("${str}")}`)
    })
  }
  else if (checkCnInCompoentCase1(input)) {
    arr = checkCnInCompoentCase1(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, ($1, index) => {
        // 比较情况不需要加括号
        if (/={2,3}\s*/.test(input.substring(index - 6, index))) return `$t(${str})`
        return `{$t(${str})}`
      })
    })
  }
  else if (checkCnInCompoentCase2(input)) {
    arr = checkCnInCompoentCase2(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, `$t(${str})`)
    })
  }
  else if (checkCnInCompoentCase3(input)) {
    arr = checkCnInCompoentCase3(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, `\${$t("${str}")}`)
    })
  }
  else if (checkCnInElementCase1(input)) {

    arr = checkCnInElementCase1(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, `{$t("${str}")}`)
    })
  }
  // else if (checkCnInElementCase2(input)) {
  //   arr = checkCnInElementCase2(input) as string[]
  //   arr.forEach(str => {
  //     input = input.replaceAll(str, `{$t("${str}")}`)
  //   })
  // }
  else if (checkCnInValue(input)) {
    arr = checkCnInValue(input) as string[]
    arr.forEach(str => {
      input = input.replaceAll(str, ($1, index) => {
        if (input.substring(index - 3, index) === "$t(") return $1;
        const usageStr = /^["'`][\w\W]+["'`]$/.test(str) ? `$t(${str})` : `$t("${str}")`
        // 上一行是标签
        if (/<[\w\W]+>$/g.test(lines[lineIndex - 1])) {
          return `{${usageStr}}`
        }
        return usageStr
      })
    })
  }
  else {
    console.log(`${chalk.red("检测失败: ")}${chalk.yellow(`第 ${lineIndex + 1} 行文字：${input}`)}`);
  }
  // 循环赋值
  arr.forEach(str => {
    str = str.replaceAll(/['"`]/g, "")
    transformCN[`${str}`] = str
    transformEN[`${str}`] = ""
  })
  return input
}
