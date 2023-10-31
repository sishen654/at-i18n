// @ts-nocheck

// 1) 注释
// 第一种
// 第 1.1 种
/* 第二种 */
/* 第 2.1 种 */
<span>{/* 第三种 */}</span>;
console.log(); // 第四种
console.log(); /* 第五种 */
// 第六种 ROW 你好
/* 第七种 ROW 你好 */

// 2) 组件属性
<Modal
  title1="取消订单"
  title2={"取消订单"}
  title3={"取消订单" + abc}
  title4={"取消订单" + "你好"}
  title5={`${a}你好`}
  title6={`${a}你好${b}`}
  title7={a + "nihao" + b}
/>;

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

// 4) 变量
const LocalRouter = {
  待支付: detail?.timeNodeInfo?.gmtCreate,
  待发货: detail?.timeNodeInfo?.gmtWaitShip,
  国内发出: detail?.timeNodeInfo?.gmtLocalDelivery,
  派送中: detail?.timeNodeInfo?.gmtDispatching,
  待签收: detail?.timeNodeInfo?.gmtDispatched,
  完成: detail?.timeNodeInfo?.gmtFinish,
  你好: "哈哈哈哈",
};
title: "商家SPU编码";
const arr = ["你好", "hh", "世界"];
const placeholder = "请输入备注内容...";
content: "确定上架吗?";
createColumn("单价", "info", {});

<Descriptions.Item label={<h4>账号编号</h4>}>{billInfo?.billId}</Descriptions.Item>
<Descriptions.Item label={<h4>供应商</h4>}>{billInfo?.supplierId}</Descriptions.Item>

{
  title: '合计结算总金额（元）',
}

rules: [{ required: true, message: '请选择国家/区域' }]
{
  country === '中国' ? ()
  }


const obj = {
  extra: '视频长度请限制在25s内，视频文件大小 <= 10M',
  help: '如有颜色、尺码等多种规格，请选是',
  title: '物流&申报信息',
  extra: '如1688连接，或海外电商平台ebay，亚马逊链接，填写有助于平台提供更好的配套数据服务',
  title: 'EAN码',
  title: '商品毛重(kg)',
  title: '商品尺寸(m)',
  title: '零售价-币种',
  title: 'SKU状态',
  title: '备货周期(天)',
  hello: '你好&世界',
  title: `批量编辑${title}`,
}
{ spuDetail?.saleState === SaleState.WAIT_SALE ? '保存' : '保存至待销售' }

message.success('当前参数已添加');
return `【${item.specName}】规格为必填项`;
return Promise.reject('存在重复规格名');

{
  title: 'SKU信息-产品尺寸（单位：m）'
  title: 'SKU信息-包装尺寸（单位：m）'
}
<div>
  已成功导入<a>{res.body.successCount}</a>条，导入失败
  <a style={{ color: 'red' }}>{res.body.failCount}</a>条
  <li>3.文件夹名称请与商品SPU编码保持一致，文件夹内最多放15张图片。</li>
  <li>4.图片大小：限制在3M以内，尺寸大小：建议在400x400像素/800x800像素</li>
  <Tooltip title={tooltip || `批量编辑${title}`} />
</div>

toolBarRender = {() => [<Button type="primary">导出</Button>]}

message.error('请完善商品信息');
return Promise.reject(new Error('请输入供货价'));

<InputNumber placeholder="请输入" min={0} />
render: () => [<a key="price">禁用</a>, <a key="stock">启用</a>]
render: () => [<a key="price">提交</a>, <a key="stock">取消</a>, <a key="stock">备注</a>]
{ }
< ModalForm
  title="库存调整 xxx测试商品"
/>
{ }
<InfoCard title="单证/附件" />

{
  title: '包装体积(m³)'
}
{ }
{ }
<Popconfirm
  title="是否确认禁用?"
/>
{ }
<Descriptions.Item label="商家Spu编码">{record.customCode}</Descriptions.Item>
{ }
<ExclamationCircleFilled style={{ color: '#faad14' }} /> 注意: 请确认选择的商品为供货商品
{
  defaultMessage: '登录失败，请重试！'
}
const fn = () => message.success('登录成功');
<ProFormText name="account" label="开户名(公司主体)" readonly />
const fn = () => {
  {
    if (resultList.length > 0) {
      await batchDownload(resultList);
      Modal.destroyAll();
    } else {
      message.error('当前选择暂无可导出内容');
      Modal.destroyAll();
    }
  }
}
const columns: ProColumns<Task>[] = [
  {
    title: activeTab === TaskType.IMPORT ? '导入类型' : '导出类型',
    dataIndex: 'title',
  },
  {
    title: activeTab === TaskType.IMPORT ? '导入行数' : '导出行数',
    hideInSearch: true,
    dataIndex: 'totalCount',
  },
]
{ }
<a key="download" href={record.singleResult}>
  {activeTab === TaskType.IMPORT ? '下载原始文件' : '下载文件'}
</a>
const fn = () => {
  if (!changeOpt.length) {
    message.error('该角色菜单权限没有更改,如需变更,请重新编辑');
    return;
  }
  return Promise.reject(new Error('两次密码不一致，请重新输入'));
}
{ }
<ProFormText.Password
  label="新登录密码"
  name="newPassword"
  rules={[
    { required: true, message: '请输入新登录密码' },
    { min: 6, message: '登录密码至少6位,请重新输入' },
  ]}
/>
{ }
<CreateOrUpdateDepartmentModal title='编辑部门' record={record} trigger={<a>编辑</a>}
  {
  pattern: userNameReg
  message:
    '用户名支持5~30个字符，支持数字，英文字母，英文下划线，英文句号,至少一个英文字母'
}

{ record?.userId ? null : <PasswordField label="登录密码" name="password" /> }

{
  required: true,
    message: '请输入确认密码!',
}
{ }
<Modal {...rest} title='选择部门' footer={<Row justify='end'>{footer}</Row>}>
  <TreeTransfer
    targetKeys={targetKeys}
    dataSource={dataSource}
    onChange={onTransferChange}
    onSelect={setSelectedRows}
  />
</Modal>
{/* <ExclamationCircleFilled style={{ color: '#faad14' }} /> 注意: 请确认选择的商品为供货商品 */ }
// 待定解决：
// 1
// let fn3 = () => {
//   return <div>签收状态: {record?.gmtStockoutFinish ? '已签收' : '未签收'}</div>
// }
// 2
{/* <ProFormText label="驳回原因" rules={[{ required: true, message: '请输入驳回原因' }]} /> */ }
// 3
// 每次生成的 json 换成 ts

/*
无法解决：定义的是组件属性的方式
const {
    onCreate,
    options,
    onChange,
    value,
    tip = '点击创建规格',
    placeholder = '查找或者创建规格',
  ...rest
} = props; */
{/* < ProFormField
  label="标题"
  help="请规范附件名称，支持扩展名：.rar .zip .doc .docx .pdf .jpg.."
/> */}
