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
{
  title: '合计结算总金额（元）',
}
rules: [{ required: true, message: '请选择国家/区域' }]

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
message.success('当前参数已添加');
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
</div>
