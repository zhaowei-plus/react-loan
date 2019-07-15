const Mock = require('mockjs');
const _ = require('lodash');

function randomSuccess(res) {
  return Mock.mock({
    success: false,
    result: res || {},
    statusText: '服务出错',
    error: '错误',
  });
}

module.exports = {
  '/api/loan/service/bill/list': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|12': [
          {
            'id|+1': 1,
            accountBank: '测试内容04i3',
            accountName: '测试内容py73',
            accountNo: '622 2223 3333 1111 333',
            createTime: 30711,
            currentInstallment: 57812,
            loadNo: '测试内容wcep',
            orderId: '测试内容ossf',
            paidType: '技术服务费',
            planChargeAmount: 13212,
            planChargeTime: 1536587230000,
            realityChargeAmount: 14453,
            realityChargeTime: 1536587230000,
            remark: '测试内容l5bb',
            status: 54247,
            supplierId: 55172,
            supplierName: '测试内容oi08',
            totalInstallment: 55808,
            updateTime: 57537,
          },
        ],
        total: 12,
      },
      success: true,
    });
  },
  '/api/loan/contract': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'loanId|+1': 1,
          name: '这是客户名称',
          code: /\d{18}/,
          project: '这是项目名称',
          applyCode: /\d{18}/,
          businessName: '@cname',
          scenes: 1,
          'status|1': [1, 2],
          effectiveDate: 1536587230000,
          invalidDate: 1536688230000,
          'contractTemplate|5': [{
            'fileId|+1': 1,
            fileName: '@ctitle',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }],
        }],
      },
    });
  },
  '/api/loan/contract/detail': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'id|+1': 1,
        customerInfo: {
          customerName: '这是客户名称',
          customerNo: '2123',
          customerType: 1,
          cardType: 1,
          cardNo: '13291373017931237',
          id: 1,
        },
        contractInfo: {
          name: '第三方协议名称',
        },
        projectInfo: {
          applyCode: 'xxxx-123123',
          executor: '@cname',
          projectName: '浙江省触角有限公司2017年9月12日(小微网贷流程)',
          channelName: '中国农业银行杭州西湖支行',
          'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
          channelProductName: '小微网贷',
          projectSource: '政采云精品推荐',
          channelProductCode: 'NHXWWD',
          startTime: 1536587230000,
          channelProductNo: '农行-浙-XD-小微网贷',
          endTime: 1536887230000,
          id: 1,
        },
        applyInfo: {
          time: 1536587230000,
          phoneNo: '159372934729',
          amount: 160000,
          onlineInitiator: '@cname',
          cardNo: '220373472937492747',
          onlinePhoneNo: '1603738429',
          applicant: '@cname',
        },
        estimateInfo: {
          time: 1536587230000,
          result: '通过',
          resultAmount: 160000,
        },
        approveInfo: {
          applyStatus: '已申请',
          contractCode: '5382619',
          finishTime: 1536987230000,
          amount: 1836334,
          result: '通过',
          annualizedRate: '0.07',
          remark: '这是审批意见',
        },
      },
    });
  },
  '/api/loan/customer/personInfos': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          enterpriseName: '这是企业名称',
          cardNo: /\d{18}/,
          legalPerson: '@cname',
          taxID: /\d{18}/,
          registeredCapital: 15000000,
          phoneNo: '15036383933',
          establishedDate: 1536587230000,
        }],
      },
    });
  },
  '/api/loan/customer/personInfo/detail': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        fullName: '这是公司全称',
        usedName: '这是公司曾用名',
        address: '这是公司地址',
        establishedDate: 1536587230000,
        externalPhoneNo: 15022222222,
        email: '123@123.com',
        bank: null,
        account: '622 3729 369 3739 382',
        contactName: '@cname',
        contactPhoneNo: '17273937933',
        enterpriseScale: '中型企业',
        supplierType: 1,
        customerId: 1,
        faxNo: '263-373939',
        isListed: false,
        accountData: {
          applyingInfo: '99笔/999999元',
          totalApplyInfo: '99笔/999999元',
          serviceFeeInfo: '99笔/999999元',
          totalServiceFeeInfo: '99笔/999999元',
          repaymentInfo: '99笔/999999元',
          settledInfo: '99笔/999999元',
          overdueInfo: '99笔/999999元',
        },
      },
    });
  },
  '/api/loan/customer/personInfo/applyRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          applyCode: /\d{18}/,
          applicant: '@cname',
          onlineInitiator: '@cname',
          applyTime: 1536587230000,
          capitalChannel: '中国农业银行',
          productName: '@ctitle',
          productCategory: 1,
          productType: 1,
          applyAmount: 1200000,
          approveAmount: 150000,
          annualizedRate: 3.7,
          approveTime: 1586587230000,
          'applyStatus|1': [1, 2],
        }],
      },
    });
  },
  '/api/loan/customer/personInfo/quotaRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          contractCode: '12321312312',
          capitalChannel: '中国农业银行',
          productName: '这是产品名称',
          'quotaType|1': [1, 2],
          quota: 100000,
          availableQuota: 90000,
          annualizedRate: 2.3,
          'duration|1': [6, 12],
          startEndTime: '起止时间',
          'rateType|1': [1, 2],
          floatRate: '11',
          'status|1': [0, 1],
        }],
      },
    });
  },
  '/api/loan/customer/personInfo/loanRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          code: '212333',
          contractCode: '12321312312',
          capitalChannel: '中国农业银行',
          productName: '这是产品名称',
          amount: 100000,
          restAmount: 90000,
          annualizedRate: 2.3,
          'totalPeriod|1': [6, 12],
          'restPeriod|1': [0, 1, 2, 5],
          'repaymentType|1': [1, 2, 3, 4, 5],
          repaymentDate: 11,
          repaymentAccount: '中国农业银行 622 3918 6382 3792 239',
          duration: '11',
          startEndTime: '起止时间',
          'status|1': [1, 6, 3, 4, 5],
        }],
      },
    });
  },
  '/api/loan/customer/personInfo/repaymentPlans': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          loanCode: '212333',
          customerName: '@cname',
          loanInstitution: '中国农业银行',
          productName: '这是产品名称',
          restAmount: 90000,
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          shouldRepaymentInfo: {
            date: 1536587230000,
            principal: 120000,
            interest: 2200,
            totalAmount: 122200,
            penalty: 0,
            overdueAmount: null,
            overdueInterest: null,
          },
          'currentPeriod|1': [1, 2, 3, 4, 5, 6, 8, 10, 11, 12],
          repaymentAccount: '中国农业银行 622 3918 6382 3792 239',
          'repaymentStatus|1': [1, 2],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/customer/personInfo/repaymentHistories': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          loanCode: '212333',
          customerName: '这是客户名称这是客户名称这是客户名称这是客户名称',
          loanInstitution: '中国农业银行',
          productName: '这是产品名称',
          restAmount: 90000,
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          shouldRepaymentInfo: {
            date: 1536587230000,
            principal: 120000,
            interest: 2200,
            totalAmount: 122200,
            penalty: null,
            overdueAmount: null,
            overdueInterest: null,
          },
          realRepaymentInfo: {
            principal: 10000,
            interest: 100,
            totalAmount: 10100,
            date: 1536587230000,
            account: '中国农业银行622 3918 6382 3792 239',
          },
          'period|1': [0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12],
          'status|1': [1, 2, 3, 4, 5],
          'repayType|1': [1, 2],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/customer/personInfo/capitalFlow': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          customerName: '@cname',
          tradeTime: 1536587230000,
          'tradeType|1': [1, 2, 3],
          tradeAmount: 10000,
          tradeChannel: '中国农业银行',
          tradeAccount: '中国农业银行 622 3918 6382 3792 239',
          remark: '这是备注',
          'bankRemark|1': [1, 2],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/org/list': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|10': [{
          orgName: '@ctitle',
          'id|+1': 1,
        }],
      },
    });
  },
  '/api/loan/riskMgmt/curStatusRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          projectName: '这是项目名称',
          'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
          executor: '@cname',
          assignmentTime: 1536587230000,
          expireTime: null,
          startTime: 1536587230000,
          endTime: 1536587930000,
          consumingTime: '1天8小时12分',
        }],
      },
    });
  },
  '/api/loan/riskMgmt/statusRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          projectName: '这是项目名称',
          'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
          executor: '@cname',
          assignmentTime: 1536587230000,
          expireTime: null,
          startTime: 1536587230000,
          endTime: 1536587930000,
          consumingTime: '1天8小时12分',
        }],
      },
    });
  },
  '/api/loan/riskMgmt/curStatusRecord/detail': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        data: {
          'id|+1': 1,
          customerInfo: {
            customerName: '这是客户名称',
            customerNo: '2123',
            id: 1,
            customerType: 1,
            cardType: 1,
            cardNo: '13291373017931237',
          },
          contractInfo: {
            name: '第三方协议名称',
          },
          projectInfo: {
            applyCode: 'xxxx-123123',
            executor: '@cname',
            projectName: '浙江省触角有限公司2017年9月12日(小微网贷流程)',
            channelName: '中国农业银行杭州西湖支行',
            'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
            channelProductName: '小微网贷',
            projectSource: '政采云精品推荐',
            channelProductCode: 'NHXWWD',
            startTime: 1536587230000,
            channelProductNo: '农行-浙-XD-小微网贷',
            endTime: 1536887230000,
            id: 1,
          },
          applyInfo: {
            time: 1536587230000,
            phoneNo: '159372934729',
            amount: 160000,
            onlineInitiator: '@cname',
            cardNo: '220373472937492747',
            onlinePhoneNo: '1603738429',
            applicant: '@cname',
          },
          estimateInfo: {
            time: 1536587230000,
            result: '通过',
            resultAmount: 160000,
          },
          approveInfo: {
            applyStatus: '已申请',
            contractCode: '5382619',
            finishTime: 1536987230000,
            amount: 1836334,
            result: '通过',
            annualizedRate: '0.07',
            remark: '这是审批意见',
          },
        },
      },
    });
  },
  '/api/loan/riskMgmt/statusRecord/detail': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        data: {
          'id|+1': 1,
          customerInfo: {
            customerName: '这是客户名称',
            customerNo: '2123',
            customerType: 1,
            cardType: 1,
            cardNo: '13291373017931237',
            id: 1,
          },
          contractInfo: {
            name: '第三方协议名称',
          },
          projectInfo: {
            applyCode: 'xxxx-123123',
            executor: '@cname',
            projectName: '浙江省触角有限公司2017年9月12日(小微网贷流程)',
            channelName: '中国农业银行杭州西湖支行',
            'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
            channelProductName: '小微网贷',
            projectSource: '政采云精品推荐',
            channelProductCode: 'NHXWWD',
            startTime: 1536587230000,
            channelProductNo: '农行-浙-XD-小微网贷',
            endTime: 1536887230000,
            id: 1,
          },
          applyInfo: {
            time: 1536587230000,
            phoneNo: '159372934729',
            amount: 160000,
            onlineInitiator: '@cname',
            cardNo: '220373472937492747',
            onlinePhoneNo: '1603738429',
            applicant: '@cname',
          },
          estimateInfo: {
            time: 1536587230000,
            result: '通过',
            resultAmount: 160000,
          },
          approveInfo: {
            applyStatus: '已申请',
            contractCode: '5382619',
            finishTime: 1536987230000,
            amount: 1836334,
            result: '通过',
            annualizedRate: '0.07',
            remark: '这是审批意见',
          },
        },
      },
    });
  },

  '/api/loan/channel/list': () => {
    return Mock.mock({
      error: '测试内容4ll5',
      result: {
        'data|15': [
          {
            'id|+1': 1,
            channelCode: '2',
            channelName: '测试内容imb4',
            contactName: '测试内容l78m',
            contactNum: '测试内容c8b2',
            createTime: 1536587230000,
            customerNum: 78874,
            loanAcceptResult: {
              loanAccept: 1000000000000,
              loanAcceptNum: 0,
              loanAcceptUrl: '测试内容8i2p',
            },
            loanAmountResult: {
              loanAmount: 1000000000000,
              loanAmountNum: 0,
              loanAmountUrl: '测试内容577p',
            },
            loanCheckInResult: {
              loanCheckIn: 1000000000000,
              loanCheckInNum: 14240,
              loanCheckInUrl: '测试内容5910',
            },
            loanOverdueResult: {
              loanOverdue: 1000000000000,
              loanOverdueNum: 20471,
              loanOverdueUrl: '测试内容oem1',
            },
            productNumResult: {
              productNum: 1000000000000,
              productNumUrl: 1,
            },
            repaymentResult: {
              repaymentAmount: 1000000000000,
              repaymentNum: 58813,
              repaymentUrl: '测试内容2921',
            },
            'status|1': [0, 1],
          },
        ],
      },
      success: true,
    });
  },
  '/api/loan/channel/status': () => {
    return randomSuccess();
  },
  '/api/loan/funds/channel/close': () => {
    return randomSuccess();
  },
  '/api/loan/action/list': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          supplierName: '浙江省xxx公司',
          supplierId: 12123,
          certificateNo: '12312323123123',
          actionName: '@ctitle',
          'actionType|1': [1, 2, 3, 4, 5],
          createTime: 1536587230000,
          operatorName: '@cname',
          operatorId: 12,
          operatorAccount: 'uweeywiqye12312',
          'status|1': [0, 1],
          // processStatus: 1,
          'loanStatus|1': [0, 1],
        }],
      },
    });
  },
  '/api/loan/action/deal/list': () => {
    return Mock.mock({
      error: '测试内容djwh',
      result: {
        'data|12': [{
          actionName: '测试内容c6so',
          actionType: '测试内容x1cp',
          certificateNo: '测试内容2412',
          createTime: 1536587230000,
          'id|+1': 1,
          loanStatus: 56587,
          operatorAccount: '测试内容4i5h',
          operatorId: 65466,
          operatorName: '测试内容r1gu',
          remark: '测试内容t34i',
          'status|1': [0, 1],
          supplierId: 36047,
          supplierName: '测试内容7v91',
          updateTime: 1536587230000,
        }],
        total: 12,
      },
      success: true,
    });
  },
  '/api/loan/action/deal/edit': () => {
    return randomSuccess();
  },
  '/api/loan/agreement/info': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        data: '这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容这是协议内容',
      },
    });
  },

};

