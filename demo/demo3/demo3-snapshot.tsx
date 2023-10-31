// 3) 元素标签内部
<div>{$t("创建时间哈哈")}</div>;
<div>
  <a>
    {$t("下架")};
  </a>
</div>
let fn = () => {
  return <Typography.Text type="danger">{$t("删除")}</Typography.Text>
}
let fn2 = () => {
  return <Modal
    footer={<Button onClick={onCancel}> {$t("关闭")}</Button>}
  />
}
let fn3 = () => {
  return <ProFormTextArea label={$t("拒绝原因:")} name="reason" />
}

<ol>
  <li>
    1.{$t("下载导入文件模板")}
    <a href={templateConfig.importSpuTemplate}>{$t("点击下载文件模板")}</a>
  </li>
  <li>
    2.{$t("单次导入，导入数量限制")}<a>1000</a>{$t("条")}
  </li>
  <li>3.{$t("支持导入更新，若选择导入更新，则商家SKU编码为必填项")}</li>
  <li>4.{$t("导入文件完成后，请前往导入导出模块查看导入结果")}</li>
</ol>
<Descriptions.Item label={<h4>{$t("账号编号")}</h4>}>{billInfo?.billId}</Descriptions.Item>
<Descriptions.Item label={<h4>{$t("供应商")}</h4>}>{billInfo?.supplierId}</Descriptions.Item>
toolBarRender = {() => [<Button type="primary">{$t("导出")}</Button>]}
<InputNumber placeholder={$t("请输入")} min={0} />
render: () => [<a key="price">{$t("禁用")}</a>, <a key="stock">{$t("启用")}</a>]
render: () => [<a key="price">{$t("提交")}</a>, <a key="stock">{$t("取消")}</a>, <a key="stock">{$t("备注")}</a>]
{ }
< ModalForm
  title={$t("库存调整 xxx测试商品")}
/>
{ }
<InfoCard title={$t("单证/附件")} />
{ }
<Popconfirm
  title={$t("是否确认禁用?")}
/>
{ }
<Descriptions.Item label={$t("商家Spu编码")}>{record.customCode}</Descriptions.Item>
