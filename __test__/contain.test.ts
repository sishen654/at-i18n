import { checkCn, checkCnInCompoentCase1, checkCnInCompoentCase2, checkCnInCompoentCase3, checkCnInElementCase1, checkCnInElementCase2, checkCnInSuperStr, checkCnInValue, checkContainComment, checkStartComment } from "@src/contains"

describe("Check function is worked", () => {
  // 1) 注释
  test("checkStartComment", () => {
    expect(checkStartComment("// 1) 注释")).toBeTruthy()
    expect(checkStartComment("// 第一种")).toBeTruthy()
    expect(checkStartComment("  // 第 1.1 种")).toBeTruthy()
    expect(checkStartComment("/* 第二种 */")).toBeTruthy()
    expect(checkStartComment("  /* 第 2.1 种 */")).toBeTruthy()
    expect(checkStartComment("{/* 第三种 */}")).toBeTruthy()
    expect(checkStartComment("// 第六种 ROW 你好")).toBeTruthy()
    expect(checkStartComment("/* 第七种 ROW 你好 */")).toBeTruthy()
    expect(checkStartComment("console.log();    // 第四种")).toBeFalsy()
    expect(checkStartComment("console.log();    /* 第五种 */")).toBeFalsy()
    expect(checkStartComment("/ 第七种 ROW 你好 */")).toBeFalsy()
    expect(checkStartComment("/ 第七种 ROW 你好")).toBeFalsy()
  })
  test("checkContainComment", () => {
    expect(checkContainComment("// 1) 注释")).toBeUndefined()
    expect(checkContainComment("// 第一种")).toBeUndefined()
    expect(checkContainComment("console.log();    1// 第四种")).toBe("console.log();    1")
    expect(checkContainComment("console.log();    2/* 第五种 */")).toBe("console.log();    2")
    expect(checkContainComment("/ 第七种 ROW 你好 */")).toBeUndefined()
    expect(checkContainComment("/ 第七种 ROW 你好")).toBeUndefined()
  })

  test("checkCn", () => {
    expect(checkCn("   待支付: detail?.timeNodeInfo?.gmtCreate,")).toBeTruthy()
    expect(checkCn("   : detail?.timeNodeIn待支付fo?.gmtCreate,")).toBeTruthy()
    expect(checkCn("   : detail?.timeNodeInfo?.gmtCreate,")).toBeFalsy()
    expect(checkCn("   : deta132")).toBeFalsy()
  })


  test("1) 模板字符串", () => {
    expect(checkCnInSuperStr(`  title: \`批量编辑\${title}\`,`)).toEqual(["批量编辑"])
    expect(checkCnInSuperStr(`return \`【\${item.specName}】规格为必填项\`;`)).toEqual(["规格为必填项"])
    expect(checkCnInSuperStr(`<Tooltip title={tooltip || \`批量编辑\${title}\`} />`)).toEqual(["批量编辑"])
  })

  // 2) 组件属性
  test("checkCnInCompoentCase1 组件属性：不带括号情况", () => {
    expect(checkCnInCompoentCase1(`  title1="abc取消订单def"`)).toEqual([`"abc取消订单def"`])
    expect(checkCnInCompoentCase1(`  title1="取消订单abc"`)).toEqual([`"取消订单abc"`])
    expect(checkCnInCompoentCase1(`  title1="取消订单def你好"`)).toEqual([`"取消订单def你好"`])
    expect(checkCnInCompoentCase1(`  title1="取消订单"`)).toEqual([`"取消订单"`])
    expect(checkCnInCompoentCase1(`  return <ProFormTextArea label="拒绝原因:" name="reason" />`)).toEqual([`"拒绝原因:"`])
    expect(checkCnInCompoentCase1(`  title1={"取消订单"}`)).toBeUndefined()
    expect(checkCnInCompoentCase1(`  title5={\`\${a}你好\`}`)).toBeUndefined()
    expect(checkCnInCompoentCase1(`  title6={\`\${a}你好\${b}\`}`)).toBeUndefined()
    expect(checkCnInCompoentCase1(`{ country === '中国' ? (`)).toEqual([`'中国'`])
    expect(checkCnInCompoentCase1(`<InputNumber placeholder="请输入" min={0} />`)).toEqual([`"请输入"`])
    expect(checkCnInCompoentCase1(`title="库存调整 xxx测试商品"`)).toEqual([`"库存调整 xxx测试商品"`])
    expect(checkCnInCompoentCase1(`<InfoCard title="单证/附件" />`)).toEqual([`"单证/附件"`])
    expect(checkCnInCompoentCase1(`  title="是否确认禁用?"`)).toEqual([`"是否确认禁用?"`])
    expect(checkCnInCompoentCase1(`<Descriptions.Item label="商品品牌">{spuDetail?.brandName}</Descriptions.Item>`)).toEqual([`"商品品牌"`])
  })
  test("checkCnInCompoentCase2 组件属性：带括号情况", () => {
    expect(checkCnInCompoentCase2(`  title1="abc取消订单def"`)).toBeUndefined()
    expect(checkCnInCompoentCase2(`  title1="取消订单abc"`)).toBeUndefined()
    expect(checkCnInCompoentCase2(`  title1="取消订单def你好"`)).toBeUndefined()
    expect(checkCnInCompoentCase2(`  title1="取消订单"`)).toBeUndefined()
    expect(checkCnInCompoentCase2(`  title7={a + "中nihao文" + b}`)).toEqual([`"中nihao文"`])
    expect(checkCnInCompoentCase2(`  title4={"取消订单" + "你好"}`)).toEqual([`"取消订单"`, `"你好"`])
    expect(checkCnInCompoentCase2(`  title5={\`\${a}你好\`}`)).toBeUndefined()
    expect(checkCnInCompoentCase2(`  title6={\`\${a}你好\${b}\`}`)).toBeUndefined()
  })
  test("checkCnInCompoentCase3 组件属性：带括号且内部是使用 ` 进行字符串的转换", () => {
    expect(checkCnInCompoentCase3(`  title1="abc取消订单def"`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title1="取消订单abc"`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title1="取消订单def你好"`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title1="取消订单"`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title7={a + "中nihao文" + b}`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title4={"取消订单" + "你好"}`)).toBeUndefined()
    expect(checkCnInCompoentCase3(`  title5={\`\${a}你好\`}`)).toEqual(["你好"])
    expect(checkCnInCompoentCase3(`  title6={\`\${a}你好\${b}\`}`)).toEqual(["你好"])
    expect(checkCnInCompoentCase3(`  title6={\`\${a}你nnn好\${b}\`}`)).toEqual(["你nnn好"])
    expect(checkCnInCompoentCase3(`  title6={\`\${a}nnn你好\${b}\`}`)).toEqual(["你好"])
    expect(checkCnInCompoentCase3(`  title6={\`\${a}nnn你好nnn\${b}\`}`)).toEqual(["你好"])
  })

  // 3) 标签
  test("3) 元素标签内部", () => {
    expect(checkCnInElementCase1(`toolBarRender = {() => [<Button type="primary">导出</Button>]}`)).toEqual(["导出"])
    expect(checkCnInElementCase1(`<div>创建时间</div>;`)).toEqual(["创建时间"])
    expect(checkCnInElementCase1(`<Typography.Text type="danger">删除</Typography.Text>`)).toEqual(["删除"])
    expect(checkCnInElementCase1(`  return <Typography.Text type="danger">删除</Typography.Text>`)).toEqual(["删除"])
    expect(checkCnInElementCase1(`<a href={templateConfig.importSpuTemplate}>点击下载文件模板</a>`)).toEqual(["点击下载文件模板"])
    expect(checkCnInElementCase1(`<li>3.支持导入更新，若选择导入更新，则商家SKU编码为必填项</li>`)).toEqual(["支持导入更新，若选择导入更新，则商家SKU编码为必填项"])
    expect(checkCnInElementCase1(`    <li>3.支持导入更新，若选择导入更新，则商家SKU编码为必填项</li>`)).toEqual(["支持导入更新，若选择导入更新，则商家SKU编码为必填项"])
    expect(checkCnInElementCase1(`<Descriptions.Item label={<h4>账号编号</h4>}>{billInfo?.billId}</Descriptions.Item>`)).toEqual(["账号编号"])
    expect(checkCnInElementCase1(`  <li>3.文件夹名称请与商品SPU编码保持一致，文件夹内最多放15张图片。</li>`)).toEqual(["文件夹名称请与商品SPU编码保持一致，文件夹内最多放15张图片。"])
    expect(checkCnInElementCase1(`  <li>4.图片大小：限制在3M以内，尺寸大小：建议在400x400像素/800x800像素</li>`)).toEqual(["图片大小：限制在3M以内，尺寸大小：建议在400x400像素/800x800像素"])
    expect(checkCnInElementCase1(`    2.单次导入，导入数量限制<a>1000</a>条`)).toEqual(["单次导入，导入数量限制", "条"])
    expect(checkCnInElementCase1(`<a style={{ color: 'red' }}>{res.body.failCount}</a>条`)).toEqual(["条"])
    expect(checkCnInElementCase1(`已成功导入<a>{res.body.successCount}</a>条，导入失败`)).toEqual(["已成功导入", "条，导入失败"])
    expect(checkCnInElementCase1(`render: () => [<a key="price">禁用</a>, <a key="stock">启用</a>]`)).toEqual(["禁用", "启用"])
    expect(checkCnInElementCase1(`render: () => [<a key="price">提交</a>, <a key="stock">取消</a>, <a key="stock">备注</a>]`)).toEqual(["提交", "取消", "备注"])

    expect(checkCnInElementCase1(`    下架;`)).toBeUndefined()
    // expect(checkCnInElementCase2(`    下架;`)).toEqual(["下架"])
  })
  test("组件属性正则不通过", () => {
    const arr = [
      `render: () => [<a key="price">禁用</a>, <a key="stock">启用</a>]`,
      `toolBarRender = {() => [<Button type="primary">导出</Button>]}`,
      `<a style={{ color: 'red' }}>{res.body.failCount}</a>条`,
      `  return <div>签收状态: {record?.gmtStockoutFinish ? '已签收' : '未签收'}</div>`,
      `      footer={<Button onClick={onCancel}> 关闭</Button>}`,
      `<div>创建时间</div>;`,
      `    下架;`,
      `  return <Typography.Text type="danger">删除</Typography.Text>`,
      `    1.下载导入文件模板`,
      `<a href={templateConfig.importSpuTemplate}>点击下载文件模板</a>`,
      `    2.单次导入，导入数量限制<a>1000</a>条`,
      `  <li>3.支持导入更新，若选择导入更新，则商家SKU编码为必填项</li>`,
      `<Descriptions.Item label={<h4>账号编号</h4>}>{billInfo?.billId}</Descriptions.Item>`,
      `  <li>3.文件夹名称请与商品SPU编码保持一致，文件夹内最多放15张图片。</li>`,
      `  <li>4.图片大小：限制在3M以内，尺寸大小：建议在400x400像素/800x800像素</li>`,
      `已成功导入<a>{res.body.successCount}</a>条，导入失败`,
    ]
    arr.forEach(v => {
      expect(checkCnInSuperStr(v)).toBeUndefined()
      expect(checkCnInCompoentCase1(v)).toBeUndefined()
      expect(checkCnInCompoentCase2(v)).toBeUndefined()
      expect(checkCnInCompoentCase3(v)).toBeUndefined()
    })
  })


  test("5) 变量定义不通过案例", () => {
    const arr: string[] = [
      `    message.success('添加备注成功');`,
      `<ExclamationCircleFilled style={{ color: '#faad14' }} /> 注意: 请确认选择的商品为供货商品`,
      `  title: '包装体积(m³)'`,
      `message.error('请完善商品信息');`,
      `message.success('当前参数已添加');`,
      `  title: '零售价-币种',`,
      `  title: '商品毛重(kg)',`,
      `  extra: '如1688连接，或海外电商平台ebay，亚马逊链接，填写有助于平台提供更好的配套数据服务',`,
      `  title: '物流&申报信息',`,
      `  help: '如有颜色、尺码等多种规格，请选是',`,
      `  extra: '视频长度请限制在25s内，视频文件大小 <= 10M',`,
      `title: '合计结算总金额（元）',`,
      `      title: '更新时间',`,
      `const arr = ["你好", "hh", "世界"];`,
      `const placeholder = "请输入备注内容...";`,
      `  待支付: detail?.timeNodeInfo?.gmtCreate,`,
      `  完成: detail?.timeNodeInfo?.gmtFinish,`,
      `  你好: "看看看看",`,
      `  title: '商家SPU编码',`,
      `content: '确定上架吗?',`,
      `  title: 'EAN码',`,
      `{ spuDetail?.saleState === SaleState.WAIT_SALE ? '保存' : '保存至待销售' }`,
      `return Promise.reject('存在重复规格名');`,
      `  title: 'SKU信息-产品尺寸（单位：m）'`,
    ]
    arr.forEach(v => {
      expect(checkCnInCompoentCase1(v)).toBeUndefined()
      expect(checkCnInCompoentCase2(v)).toBeUndefined()
      expect(checkCnInCompoentCase3(v)).toBeUndefined()
      expect(checkCnInElementCase1(v)).toBeUndefined()
      // expect(checkCnInElementCase2(v)).toBeUndefined()
      expect(checkCnInSuperStr(v)).toBeUndefined()
    })
  })
  test("5) 变量定义通过案例", () => {
    // expect(checkCnInValue(`<ExclamationCircleFilled style={{ color: '#faad14' }} /> 注意: 请确认选择的商品为供货商品`)).toEqual([`注意: 请确认选择的商品为供货商品`])
    expect(checkCnInValue(`const placeholder = "请输入备注内容...";`)).toEqual([`"请输入备注内容..."`])
    expect(checkCnInValue(`const arr = ["你好", "hh", "世界"];`)).toEqual([`"你好"`, `"世界"`])
    expect(checkCnInValue(`  完成: detail?.timeNodeInfo?.gmtFinish,`)).toEqual([`完成`])
    expect(checkCnInValue(`  你好: "看看看看",`)).toEqual([`你好`, `"看看看看"`])
    expect(checkCnInValue(`  你好: "你好",`)).toEqual([`你好`, `"你好"`])
    expect(checkCnInValue(`  title: '商家SPU编码',`)).toEqual([`'商家SPU编码'`])
    expect(checkCnInValue(`content: '确定上架吗?',`)).toEqual([`'确定上架吗?'`])
    expect(checkCnInValue(`title: '合计结算总金额（元）',`)).toEqual([`'合计结算总金额（元）'`])
    expect(checkCnInValue(`rules: [{ required: true, message: '请选择国家/区域' }]`)).toEqual([`'请选择国家/区域'`])
    expect(checkCnInValue(`  extra: '视频长度请限制在25s内，视频文件大小 <= 10M',`)).toEqual([`'视频长度请限制在25s内，视频文件大小 <= 10M'`])
    expect(checkCnInValue(`  title: '物流&申报信息',`)).toEqual([`'物流&申报信息'`])
    expect(checkCnInValue(`  extra: '如1688连接，或海外电商平台ebay，亚马逊链接，填写有助于平台提供更好的配套数据服务',`)).toEqual([`'如1688连接，或海外电商平台ebay，亚马逊链接，填写有助于平台提供更好的配套数据服务'`])
    expect(checkCnInValue(`  title: 'EAN码',`)).toEqual([`'EAN码'`])
    expect(checkCnInValue(`  title: 'SKU状态',`)).toEqual([`'SKU状态'`])
    expect(checkCnInValue(`  title: '商品毛重(kg)',`)).toEqual([`'商品毛重(kg)'`])
    expect(checkCnInValue(`  title: '商品尺寸(m)',`)).toEqual([`'商品尺寸(m)'`])
    expect(checkCnInValue(`  title: '  title: '备货周期(天)',',`)).toEqual([`'备货周期(天)'`])
    expect(checkCnInValue(`  title: '零售价-币种',`)).toEqual([`'零售价-币种'`])
    expect(checkCnInValue(`message.success('当前参数已添加');`)).toEqual([`'当前参数已添加'`])
    expect(checkCnInValue(`return Promise.reject('存在重复规格名');`)).toEqual([`'存在重复规格名'`])
    expect(checkCnInValue(`  title: 'SKU信息-产品尺寸（单位：m）'`)).toEqual([`'SKU信息-产品尺寸（单位：m）'`])
    expect(checkCnInValue(`message.error('请完善商品信息');`)).toEqual([`'请完善商品信息'`])
    expect(checkCnInValue(`  title: '包装体积(m³)'`)).toEqual([`'包装体积(m³)'`])
    expect(checkCnInValue(`    message.success('添加备注成功');`)).toEqual([`'添加备注成功'`])
  })
})
