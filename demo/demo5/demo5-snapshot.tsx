// 4) 变量
const LocalRouter = {
  $t("待支付"): detail?.timeNodeInfo?.gmtCreate,
  $t("待发货"): detail?.timeNodeInfo?.gmtWaitShip,
  $t("国内发出"): detail?.timeNodeInfo?.gmtLocalDelivery,
  $t("派送中"): detail?.timeNodeInfo?.gmtDispatching,
  $t("待签收"): detail?.timeNodeInfo?.gmtDispatched,
  $t("完成"): detail?.timeNodeInfo?.gmtFinish,
  $t("你好"): $t("哈哈哈哈"),
};
title: $t("商家SPU编码");
const arr = [$t("你好"), "hh", $t("世界")];
const placeholder = $t("请输入备注内容...");
content: $t("确定上架吗?");
createColumn($t("单价"), "info", {});
{
  title: $t('合计结算总金额（元）'),
}
rules: [{ required: true, message: $t('请选择国家/区域') }]

const obj = {
  extra: $t('视频长度请限制在25s内，视频文件大小 <= 10M'),
  help: $t('如有颜色、尺码等多种规格，请选是'),
  title: $t('物流&申报信息'),
  extra: $t('如1688连接，或海外电商平台ebay，亚马逊链接，填写有助于平台提供更好的配套数据服务'),
  title: $t('EAN码'),
  title: $t('商品毛重(kg)'),
  title: $t('商品尺寸(m)'),
  title: $t('零售价-币种'),
  title: $t('SKU状态'),
  title: $t('备货周期(天)'),
  hello: $t('你好&世界'),
  title: `${$t("批量编辑")}${title}`,
}
message.success($t('当前参数已添加'));
return Promise.reject($t('存在重复规格名'));
{
  title: $t('SKU信息-产品尺寸（单位：m）')
  title: $t('SKU信息-包装尺寸（单位：m）')
}
<div>
  {$t("已成功导入")}<a>{res.body.successCount}</a>{$t("条，导入失败")}
  <a style={{ color: 'red' }}>{res.body.failCount}</a>{$t("条")}
  <li>3.{$t("文件夹名称请与商品SPU编码保持一致，文件夹内最多放15张图片。")}</li>
  <li>4.{$t("图片大小：限制在3M以内，尺寸大小：建议在400x400像素/800x800像素")}</li>
</div>
