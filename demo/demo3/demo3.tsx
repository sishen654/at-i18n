// 3) 元素标签内部
<div>创建时间哈哈</div>;
<div>
  <a>
    下架;
  </a>
</div>
let fn = () => {
  return <Typography.Text type="danger">删除</Typography.Text>
}
let fn2 = () => {
  return <Modal
    footer={<Button onClick={onCancel}> 关闭</Button>}
  />
}
let fn3 = () => {
  return <ProFormTextArea label="拒绝原因:" name="reason" />
}

<ol>
  <li>
    1.下载导入文件模板
    <a href={templateConfig.importSpuTemplate}>点击下载文件模板</a>
  </li>
  <li>
    2.单次导入，导入数量限制<a>1000</a>条
  </li>
  <li>3.支持导入更新，若选择导入更新，则商家SKU编码为必填项</li>
  <li>4.导入文件完成后，请前往导入导出模块查看导入结果</li>
</ol>
<Descriptions.Item label={<h4>账号编号</h4>}>{billInfo?.billId}</Descriptions.Item>
<Descriptions.Item label={<h4>供应商</h4>}>{billInfo?.supplierId}</Descriptions.Item>
toolBarRender = {() => [<Button type="primary">导出</Button>]}
<InputNumber placeholder="请输入" min={0} />
render: () => [<a key="price">禁用</a>, <a key="stock">启用</a>]
render: () => [<a key="price">提交</a>, <a key="stock">取消</a>, <a key="stock">备注</a>]
{ }
< ModalForm
  title="库存调整 xxx测试商品"
/>
{ }
<InfoCard title="单证/附件" />
{ }
<Popconfirm
  title="是否确认禁用?"
/>
{ }
<Descriptions.Item label="商家Spu编码">{record.customCode}</Descriptions.Item>
