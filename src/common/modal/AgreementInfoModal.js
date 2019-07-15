import React, { Component } from 'react';
import {
  Modal,
  Button,
} from 'doraemon';
import './index.less';

class AgreementInfoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmTime: props.confirmTime || 10,
    };
  }

  componentDidMount() {
    const { confirm } = this.props;

    if (confirm) {
      this.disableTimer = setInterval(() => {
        const { confirmTime } = this.state;
        if (confirmTime > 0) {
          this.setState({
            confirmTime: confirmTime - 1,
          });
        } else {
          clearInterval(this.disableTimer);
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.disableTimer) {
      clearInterval(this.disableTimer);
    }
  }

  onOk = () => {
    const { onCancel, callback } = this.props;
    if (typeof callback === 'function') {
      callback();
    }
    onCancel();
  }

  getFooter = () => {
    const { confirmTime } = this.state;
    const { onCancel, confirm, confirmText } = this.props;
    const disabled = confirmTime > 0;

    const buttonText = confirmText || '我已阅读并同意';
    if (confirm) {
      return [
        <Button onClick={onCancel} key="cancel">取消</Button>,
        <Button
          onClick={this.onOk}
          type="primary"
          disabled={disabled}
          key="ok"
        >
          {buttonText}
          { disabled ? `(${confirmTime}s)` : '' }
        </Button>,
      ];
    }

    return [
      <Button onClick={this.onOk} type="primary" key="ok">确认</Button>,
    ];
  }

  getContent=() => (
    `<p>
    <p class="MsoNormal" align="right" style="text-align:right;">
      <b>版本生效日期：</b><b>2019</b><b>年</b><b>03</b><b>月</b><b>28</b><b>日</b>
    </p>
    <p class="MsoNormal" align="right" style="text-align:right;">
      <b>&nbsp;</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      欢迎“您”（指政采云平台供应商，以下或称“用户”、“客户”）与“政采云有限公司”（以下简称“政采云”）共同签署本《政采云融资信息服务协议》（以下简称“本协议”）。本协议对您与政采云具有同等法律效力。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>一、接受条款</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、政采云融资信息服务（以下简称“融资信息服务”或“本服务”）由政采云提供。政采云在此特别提醒您，<b>本协议内容包括协议正文、政采云平台法律声明、隐私政策以及所有已经发布或将来可能发布的相应规则、规范、通知、公告等（以下合称</b><b>“</b><b>规则</b><b>”</b><b>）。法律声明、隐私政策及相应规则为协议不可分割的组成部分，与协议正文具有同等法律效力</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、您在点击同意本协议之前，<b>请务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，以及其他以粗体标识的涉及您核心利益的重要条款</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>当您点击同意本协议之类的按钮后，即表示您已充分阅读、理解并接受本协议的全部内容。在阅读本协议的过程中，如您不同意本协议或其中任何内容，您应立即停止使用本服务</b>。
    </p>
    <p class="MsoNormal"  style="text-indent:21.0pt;">
      3、政采云可根据国家法律法规变化及维护交易秩序等需要，<b>不时修改本协议及相关附属规则，变更后的协议、规则（以下简称“变更事项”）一旦在<span class="MsoHyperlink">政采云平台</span>公布即生效，并代替原版的协议、规则</b>。
    </p>
    <p class="MsoNormal"  style="text-indent:21.0pt;">
      <b>您有义务不时关注并阅读最新版的协议、规则。如您对已生效的变更事项不同意的，您应当于变更事项确定的生效之日起停止使用本服务，变更事项对您不产生效力；如您在变更事项生效后仍继续使用本服务，则视为您同意已生效的变更事项</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>二、定义</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、政采云平台：指政采云主办、运营的第三方交易平台，包括政府采购云平台（域名为zcygov.cn）、政采云企业购（域名为zhengcaiyun.cn）网站及客户端。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、融资信息：指政采云平台作为信息服务平台，向您推送的第三方（即政采云合作金融机构，以下简称“金融机构”）贷款产品信息。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、不良信息：指对信息主体信用状况构成负面影响的下列信息：信息主体在借贷、赊购、担保、租赁、保险等活动中未按照合同履行义务的信息，信息主体的违约信息，行政处罚信息，人民法院判决或者裁定信息主体履行义务、强制执行的信息，及国务院征信业监督管理部门规定的其他不良信息。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      4、监管账户：指您使用本服务贷款成功时，您与发放贷款所在金融机构约定的银行还款账户。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>三、服务内容及费用</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、政采云依托平台为您提供包括但不限于如下服务：
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （1）向您推送金融机构贷款产品信息，以及贷款产品的适配服务；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （2）为您在线申请金融机构贷款产品提供技术支持；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （3）为您提供在线查询贷款进度、贷款记录、还款计划、还款记录等功能。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、政采云保留对本服务及其相关功能、软件变更、升级、修改等权利，并进一步保留在服务中开发新的模块、功能和软件的权利。上述所有新的模块、功能、软件服务的提供，除非政采云另有说明，否则仍适用本协议。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、政采云目前向您提供的融资信息服务是免费的，如未来向您收取该项费用的，政采云会以本协议第十三条第1款约定的方式提前通知您，确保您有充分选择的权利。如您选择继续使用服务但未按照平台的规定及时付款的，<b>政采云有权根据您逾期付款的时间暂停或终止向您提供服务，由此给您及</b><b>/</b><b>或您的客户造成损失的，您应当自行承担全部赔偿责任，与政采云无关</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>四、服务使用条件</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、如您要使用政采云融资信息服务，您应具备以下条件：
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （1）系政采云平台正式供应商；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （2）自行配备移动终端和/或网络终端，并确保前述终端的运行稳定与安全。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      您理解并同意：政采云有权根据业务发展需要及国家相关法律法规的要求，对上述服务使用条件进行调整。该等调整，政采云将以本协议第十三条第1款约定的方式通知您。如因此导致您不符合调整后的条件的，政采云有权中止向您提供服务，直至经政采云确认您符合后方可恢复提供服务。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>五、您的权利和义务</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、您有权利享受本协议第三条第1款约定的服务内容，并有权利在接受服务时获得技术支持、业务咨询等服务。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、您在线申请贷款时，应按页面要求如实填写、提供相应资料、信息；同时，为了向您提供融资信息服务，您授权政采云向金融机构提供本协议约定的各项资料、信息。<b>您应确保提供给政采云和</b><b>/</b><b>或金融机构的所有资料、信息合法、真实、准确、完整、有效，违反前述约定造成本服务中止</b><b>/</b><b>终止，或造成金融机构、政采云或您自身损失的，您应承担全部赔偿责任</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      如前述资料、信息有更新的，您应及时更新并通知金融机构和政采云。<b>特别是您与金融机构约定的监管账户变更的，须您自行征得金融机构的同意，且政采云将在收到金融机构同意变更的信息后方在平台实施变更操作</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、您应遵守本服务所适用的法律法规，保证不会利用本服务从事下列任何非法的或违反本协议目的或者侵犯其他第三方权益的行为，否则政采云有权立即单方面终止提供本服务，并不承担任何责任。如因此造成政采云损失的，您应承担全部赔偿责任。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （1）从事违法经营活动；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （2）冒用他人名义使用本服务；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （3）侵害他人商业秘密、商标权、著作权、专利权等合法权益；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （4）从事其他非法的或违反本协议目的或者侵犯其他第三方权益的行为。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      4、您在使用本项服务时，必须同时遵守本协议及平台不时公布的相关附属规则，以及金融机构的相关业务规定。否则因此导致损失或相应责任的，均由您自行承担。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      5、如您使用本服务获取金融机构发放的贷款的，<b>您应严格按照您与金融机构签署的合同约定或金融机构的要求履行还款义务以及其他附随义务，包括但不限于向金融机构披露借款使用情况、财务状况、不良信息（如有）等。违反前述约定造成金融机构、政采云损失的，您应承担全部赔偿责任</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      6、若非政采云原因导致您的银行账户被国家有权机关、金融机构依法查询、冻结、扣划，从而导致本项服务中止/终止，或给您造成损失模政采云不承担任何责任。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>六、政采云的权利和义务</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、政采云应根据本协议约定向您提供相应的服务，并在技术上确保本服务产品功能的正常、稳定运行。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、政采云并非金融机构，<b>其作为信息服务平台提供者，不对金融机构在本平台发布的任何贷款产品、产品描述等信息负责，不对您贷款是否成功以及借款用途等负责，亦不对您的贷款向金融机构提供任何担保</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、政采云不保证为向您提供便利而设置的外部（金融机构）链接的准确性和完整性，同时对于该等外部链接指向的不由政采云实际控制的任何网页上的内容不承担任何责任。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      4、政采云仅为您提供融资信息服务，您与金融机构之间因在平台办理贷款业务发生的任何争议、纠纷，由您与金融机构自行解决，与政采云无关。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      5、<b>政采云有权以事先通知方式中断或终止向您提供本服务，若由此给您造成损失的，政采云对该等损失不承担任何责任</b>。政采云在终止提供本服务后，若发现您之前存在违法或违反本协议目的的使用行为，给政采云造成损失的，政采云仍可据此要求您承担相应赔偿责任并保留通过司法途径予以解决的权利。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>6</b><b>、您授权政采云在您使用本服务期间或政采云终止提供本服务后，有权保留您使用本服务期间所形成的相关信息数据（包括但不限于借款记录、还款记录等）；并授权政采云向其他第三方（含金融机构）提供上述保存信息数据，且该等授权不因为此协议提前终止或届满而终止</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>七、用户（客户）信息的保护及授权</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （一）用户信息保护
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      政采云非常重视对用户信息的保护，在您使用本服务时，<b>您同意政采云有权依照政采云平台隐私政策的相关约定收集、存储、使用、披露您的个人信息和</b><b>/</b><b>或非个人信息</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （二）用户（客户）信息授权
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、您同意并不可撤销地授权：
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （1）<b>政采云向金融机构提供贷款业务所需的各项资料、信息，包括但不限于您在政采云平台的登记信息、经营情况和交易信息等。金融机构仅为贷款业务相关事项的需要而使用、分析前述信息，且金融机构有权将分析结果回传给政采云，以为您提供更好的服务及使用体验</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （2）<b>授权金融机构通过税务系统、工商系统、金融信用信息基础数据库等渠道查询、打印、保存、使用您的企业信用报告、纳税报告和其他信用信息</b>，以供金融机构审核您的授信业务或发放贷款后的风险管理等。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （3）<b>授权金融机构按照国家相关规定通过互联网采集并向金融信用信息基础数据库提供您的基本信息和信贷信息</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      任何第三方因信赖或使用上述信息对您造成不利影响或财产、信用等损失的，政采云和/或金融机构不因此承担任何形式的责任。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （4）<b>授权金融机构向政采云提供您的信贷信息，包括但不仅限于授信审批结果、开户、提款、还款信息</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、<b>授权期限：自本协议生效之日起至本协议约定的贷款业务对应的权利和义务全部履行完毕之日止</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、政采云和金融机构应各自保守因履行本协议所获知的您的信贷信息、在政采云平台的交易信息等，除因履行约定义务的必要或有法律法规规定应披露的之外，不得以任何方式向第三人披露和不正当使用，否则由泄露或不正当使用方承担赔偿责任。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      4、<b>本条款具有独立法律效力，不受本协议成立与否及效力状态变化的影响</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>八、违约责任</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>如因您违反有关法律法规或者本协议、相关规则之规定，政采云有权依照您行为的违约程度采取账户关闭或终止服务等措施；如因您前述行为致使政采云遭受任何损失的，您应对政采云的实际损失进行全额赔偿，包括但不限于政采云自身的直接经济损失、商誉损失，以及政采云向第三方（含金融机构）支付的索赔额（如有）和对外支付的赔偿金、罚金、和解款、律师费、诉讼费等</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>九、责任限制及免除</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>1</b><b>、政采云对于下述原因导致其无法正常提供服务的，政采云不承担相应的责任：</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>（<span>1</span>）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>（<span>2</span>）因电力供应故障、通讯网络故障等公共服务因素或第三人因素（如黑客、病毒、恶意程序攻击等）；</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>（<span>3</span>）在政采云已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与<span>&copy;</span>据安全等因素；</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>（<span>4</span>）在紧急情况下为维护国家安全、其他用户及<span>/</span>或第三方之权益等因素；</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>（<span>5</span>）因用户操作不当或用户的上网设备软硬件出现故障等非政采云因素</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      尽管有前款约定，政采云将采取合理行动积极促使服务恢复正常。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、政采云不对本服务提供任何形式的保证，包括但不限于本服务符合您的需求，本服务不受干扰、及时提供或免于出错等。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、除法律另有规定外，在任何情况下政采云不对使用本服务或功能导致的任何特殊、附带、偶然或间接的损害进行赔偿，即使政采云已被告知可能发生该等损害，包括但不限于商业利润损失、数据或文档丢失产生的损失、人身伤害、隐私泄漏、因未能履行包括诚信或合理谨慎在内的任何责任或其他损失。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      4、除本协议另有约定外，<b>在任何情况下，您同意政采云对本协议所承担的赔偿责任总额不超过因履行本协议向您收取的服务费用总额</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>十、廉政条款</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      您应严格遵守国家有关禁止商业贿赂行为的法律、法规以及政采云平台公布的有关商业道德/廉政建设的规定。如您违反前述规定的，<b>政采云有权依据平台相应规则对您进行处理，并有权终止与您的所有合作，收取相当于您行贿金额</b><b>10</b><b>倍的违约金</b>；构成犯罪的，由司法机关依法追究您的刑事责任；尚不构成犯罪的，由行政主管部门依法追究您的相应责任。
    </p>
    <p class="MsoNormal" style="margin-left:21.1pt;">
      <b>十一、法律适用及争议解决</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>1</b><b>、本协议之订立、解释、修订、补充、执行与争议解决，均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及</b><b>/</b><b>或行业惯例</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>2</b><b>、因本协议引起的或履行本协议所发生的任何争议，双方应友好协商。协商不成时，任何一方均可向政采云所在地人民法院提起诉讼</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>十二、协议生效与终止</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      <b>1</b><b>、本协议自您点击同意</b><b>/</b><b>确认之类的按钮后生效。</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、本协议在符合以下任意一项情形时终止：
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （1）您主动终止使用本服务的；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （2）您违反相关法律法规或本协议项下的任何约定，政采云有权立刻终止本协议，并按有关规则对您进行处理；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （3）按照法律规定或行政主管部门的要求终止；
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （4）<b>政采云可提前</b><b>15</b><b>天以书面通知的方式终止本协议而无须承担违约责任；</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      （5）<b>本协议规定的其他协议终止条件发生或实现，导致本协议终止</b>。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      3、无论本协议因何原因终止，在协议终止前的行为所导致的任何赔偿和责任，您必须完全且独立地承担责任。同时，政采云没有义务为您保留账户中或与之相关的任何信息，或向您或第三方转发任何您未曾阅读或发送过的信息，<b>亦不就终止服务而对您或任何第三方承担任何责任</b>。
    </p>
    <p class="MsoNormal" style="margin-left:21.1pt;">
      <b>十三、其他</b>
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      1、通知：您同意政采云通过下列任一种方式向您发送通知：（1）公告；（2）站内信、客户端推送的消息；（3）根据您预留的联系方式发送的电子邮件、短信、函件等。政采云以前述约定的电子方式发出的书面通知，在发送成功后即视为送达；以纸质载体发出的函件等书面通知，<b>在政采云交邮后的第五个自然日</b>即视为送达。
    </p>
    <p class="MsoNormal" style="text-indent:21.0pt;">
      2、本协议未约定部分依照《政府采购供应商注册协议》及相关附属规则、《政采云企业购供应商入驻协议》及相关附属规则（按发生交易时您所在的平台确定协议、规则版本，下同）执行；如本协议与《政府采购供应商注册协议》及相关附属规则、《政采云企业购供应商入驻协议》及相关附属规则相冲突的，以本协议约定为准。
    </p>
  </p>
  <p>
    <br />
  </p>`
  )

  render() {
    const { visible, onCancel } = this.props;

    return (
      <Modal
        visible={visible}
        width={988}
        title="政采云融资信息服务协议"
        className="agreement-info-modal"
        onCancel={onCancel}
        footer={this.getFooter()}
      >
        <div className="agreement-info" >
          <div dangerouslySetInnerHTML={{ __html: this.getContent() }} />
        </div>
      </Modal>
    );
  }
}

export default AgreementInfoModal;

