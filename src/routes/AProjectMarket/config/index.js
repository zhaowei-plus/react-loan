
// 操作项配置
export const getOperationConfig = (record = {}, handleClick) => {
  return (
    [{
      key: 'INVITE',
      label: '邀请客户',
      handleClick: () => handleClick('INVITE', record),
    }, {
      key: 'RECORD',
      label: '申请记录',
      to: `/loan-business-manage/list?&supplierName=${record.customerName}&applyType=0&businessType=1`,
    }, {
      key: 'NOTICE',
      label: '中标公告',
      handleClick: () => handleClick('NOTICE', record),
    }, {
      key: 'MESSAGE',
      label: '中标通知书',
      handleClick: () => handleClick('MESSAGE', record),
    }]
  );
};
