import { readFileSync } from "fs"
import { getPathFromExecRoot } from "@src/util"
import { execaCommandSync } from 'execa'
import type { ExecaSyncReturnValue, SyncOptions, ExecaSyncError } from 'execa'
import { beforeAll } from 'vitest'

const getPath = (str: string) => {
  return [getPathFromExecRoot(`/demo/${str}/${str}.tsx=abc123abc`), getPathFromExecRoot(`/demo/${str}/${str}-snapshot.tsx`)]
}
const run = (str: string, options: SyncOptions = {}): ExecaSyncReturnValue | ExecaSyncError => {
  try {
    return execaCommandSync(`i18n /demo/${str}/${str}.tsx`, options)
  } catch (error) {
    return error as ExecaSyncError
  }
}

// 执行命令，生成文件
beforeAll(() => {
  run("demo1")
  run("demo2")
  run("demo3")
  run("demo4")
  run("demo5")
})

describe("Compare Snapshot", () => {
  test("demo1", () => {
    const [demo1, demo1Snapshot] = getPath("demo1")
    expect(readFileSync(demo1, { encoding: 'utf-8' })).toEqual(readFileSync(demo1Snapshot, { encoding: 'utf-8' }))
  })
  test("demo2", () => {
    const [demo2, demo1Snapshot] = getPath("demo2")
    expect(readFileSync(demo2, { encoding: 'utf-8' })).toEqual(readFileSync(demo1Snapshot, { encoding: 'utf-8' }))
  })
  test("demo3", () => {
    const [demo3, demo1Snapshot] = getPath("demo3")
    expect(readFileSync(demo3, { encoding: 'utf-8' })).toEqual(readFileSync(demo1Snapshot, { encoding: 'utf-8' }))
  })
  test("demo4", () => {
    const [demo4, demo1Snapshot] = getPath("demo4")
    expect(readFileSync(demo4, { encoding: 'utf-8' })).toEqual(readFileSync(demo1Snapshot, { encoding: 'utf-8' }))
  })
  test("demo5", () => {
    const [demo5, demo1Snapshot] = getPath("demo5")
    expect(readFileSync(demo5, { encoding: 'utf-8' })).toEqual(readFileSync(demo1Snapshot, { encoding: 'utf-8' }))
  })
})
