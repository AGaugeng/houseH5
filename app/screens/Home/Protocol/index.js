import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Body,
    Left,
    Right,
    Icon,
    Text,
    Spinner
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { scaleSize, deviceWidth, deviceHeight } from "../../ScreenUtil"
// import { getRegisterProtocol } from '../../../actions/Auth'
import { connect } from 'react-redux'


class Counter extends Component {

    static propTypes = {
        getRegisterProtocol: PropTypes.func.isRequired,
        protocol: PropTypes.array.isRequired
    }
    static defaultProps = {
        protocol: []
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            type: params.type,
            protocol: ['委托人（出售方）：　　　　　　　　      （简称甲方） ', '委托人（买受方）：　　　　　　              （简称乙方）',
                '受托人（中介方）： 　　　　　　　　　  （简称丙方） ', '　　 根据国家有关法律、法规和本市有关规定，甲、乙、丙三方自愿、平等和协商一致的',
                '基础上，就丙方接受甲、乙方的委托，促成甲、乙方订立房地产买卖合同，并完成其它服务', '事项达成一致，订立本合同。 ',
                '\n', '第一条 标的基本情况及价款 ', '所有权人	 	共有人	 ', '房屋坐落	 	 	丘号', '产权证号	 	建筑面积', '土地证号	 	房屋来源',
                '房屋售价	　　拾 万 仟 佰 拾 元整（￥： 　　　　　　　　）', '其它情况	 ', '\n', '\n', '第二条 委托事项 ', '　1、 甲方委托丙方出售以上房产，并代办①产权转移、③房款拨付、____________等相',
                '关事宜（①产权转移②房屋交付③房款拨付）。 ', '　　2、 乙方委托丙方购买以上房产，并代办①产权房、③房款支付、____________、', '__________、____________等相关事宜（①产权房②房屋交付③房款支付④贷款⑤抵押登记',
                '⑥土地使用证）。 ', '第三条 甲方的义务 ', '　 1、保证出售的房屋权属真实，并符合国家及南京市房屋上市交易的政策法规及有关规', '定，且房屋财产的共有人对出售此房屋无异议。',
                '　 　2、协助乙方办理该房地产的交易过户手续，提供相应证件资料。 ', '　 　3、按房地产买卖契约中约定的交付日期，腾空房屋，并完好保留所应交付给乙方的附', '属设施及原装修。 ',
                '　 　4、在房屋交付前，负责户口迁出，结清水、电、气、有线电视、电话、物管等费用。 ', '　 　5、按本合同约定，按期支付佣金和代办费。 ', '\n', '第四条 乙方的义务 ', '　 　1、 按照房地产买卖契约中约定的房款支付方式及期限，支付定金和房款。 ',
                '　 　2、 根据本合同约定的委托、代办事项，按时支付佣金和代办费用。 ', '　 　3、 根据委托事项，乙方应于办理产权登记手续前将各类资料备齐交予丙方，同时将', '由 丙方代缴的 ①、② （①契税②交易服务费③抵押管理费④他项权证费）等约计人民币 ',
                '____________元交予丙方。丙方将与乙方按实结算，多退少补。 ', '第五条 丙方的义务 ', '　 　1、 认真履行甲、乙方委托的事项，亲自完成甲、乙方委托代办的各项服务。', '　 　2、 丙方派 蒋信用 经纪人负责该房产的居间活动，在委托期限内办理所委托的事项。 ',
                '　 　3、 根据专业知识及工作经验，丙方将所了解的标的情况如实告知委托人，及时将委', '托 事项办理的进展情况向委托人通报。 ', '　 　4、 对委托人个人资料予以保密，未经委托人同意，不得向他人泄露。',
                '　 　5、 处理委托事务取得的财产，应当及时转交委托人。 ',
                '　 　6、 出示国家规定的收费标准及收取相关费用的依据。 ',
                '第六条 房款的支付与转付 ', '甲、乙方商议，按以下第（二）种方式支付房款： ', '（一）根据房地产买卖契约中房款支付的时间及方式，双方自行办理房款的支付。 ', '（二）双方若将房款的转付交于丙方，则丙方将按下列方式进行操作： ',
                '    1、乙方在签定房地产买卖契约之日，将定金人民币____________元交给丙方保存。', '    2、乙方在签定房地产买卖契约及本合同后二个工作日内将全部（首期款/全部房款），', '共计人民币____________元交给丙方保存。 ',
                '    3、甲乙双方在完成②（①交易过户签字后②乙方领取产权证后）二日内，丙方按售房', '款100%，计人民币____________元转付给甲方。 ', '    4、待银行放贷后或乙方补足购房款后，双方完成房屋交接手续，且甲方结清房屋交付',
                '前的水、电、气、有限电视、电话、物管等费后三日内，丙方将余款一次性转付给甲方。', '（三）三方约定： ', '第七条 房屋交付 ', '    1、甲方应在乙方领取产权证后一天内或于_______年_____月______日前腾空房屋，并',
                '书面通知乙方、丙方办理交付的具体时间。 ', '    2、若乙方在接到上述书面通知后，不按期对该房屋办理验收的，则该房屋的毁损、灭', '失的风险由乙方承担。 ', '    3、甲、乙、丙三方共同参加房屋的交付手续。甲方按合同约定移交房屋及附属设施并',
                '保留原装潢，甲、乙方交接钥匙，签署房屋交接单，丙方见证签字。', '保留原装潢，甲、乙方交接钥匙，签署房屋交接单，丙方见证签字。', '（一）丙方完成本合同约定的甲方委托和代办事项，甲方按照下列第1、2种方式计算，向',
                '丙方支付佣金和代办费： ', '    1、按该房地产售房款0.5%，具体数额为人民币￥____________元。 ', '    2、按委托代办事项支付代办费计人民币￥____________元。 ',
                '（二）丙方完成本合同约定的乙方委托事项，乙方按照下列第1、2种方式计算，向丙方支', '付佣金和代办费： ', '    1、按该房地产售房款1.5%，具体数额为人民币￥____________元。 ',
                '    2、代办产权证费￥_______元，代办土地证费_____元，代办抵押贷款和他项权证费_____ ', '元，共计人民币________元。 上述费用，甲、乙方应于____________前支付给丙方。',
                '（三）丙方根据合同约定收取佣金和代办费，未促成合同的可收取相关费用，但不得超过国', '家规定的收费标准。 ', '第九条 违约责任 ', '（一）三方商定，丙方有下列情形之一的应承担违约责任： ',
                '    1、无正当理由不履行合同的； ', '    2、与他人串通，损害甲、乙方利益的； ', '    3、故意隐瞒，提高委托标的利差； ', '    4、其它过失影响甲、乙方交易的。 ', '（二）三方商定，甲、乙方有下列情形之一的应承担违约责任： ',
                '    1、无正当理由不履行合同的； ', '    2、未能按照合同约定提供必要的文件和配合，造成丙方无法履行合同的； ', '    3、相互或与他人串通，损害丙方利益的； ', '    4、未能按合同约定支付佣金和代办费的； ',
                '    5、其他造成丙方无法完成委托事项的行为。 ', '（三）三方商定，上述违约行为方，选择下列第1条约定的金额作为违约金分别支付给各守', '约方。违约方给各守约方造成的其它经济损失，由守约方按照法律、法规的有关规定追偿。',
                '　　 1、约定违约金为____________元，', '　　 2、按标的额的5%，计人民币____________元。 ', ' 第十条 争议解决方式 ', '三方在履行本合同过程中发生争议，由三方协商解决，也可由工商行政管理部门调解；',
                '协商、调解不成的，按本合同约定的下列第1项进行解决： ', '　　 1、由南京仲裁委员会仲裁 ', '　　 2、依法向人民法院提起诉讼 ', ' 第十一条 其他约定 ', '本合同如有内容变更或未尽事项，经三方协商一致后签订补充协议，补充协议应当采',
                '取书面形式，与本合同具有同等法律效力。本合同与补充协议内空格部分填写文字与印刷文', '字具有同等效力。 ', '第十二条 合同生效 ', '本合同自甲、乙双方签字，丙方盖章后生效，本合同一式叁份，甲、乙、丙三方各执', '壹份。 ',
                '　　甲方：     　　　　　　　乙方：     　　　　　　丙方：（签章） ', '　　身份证号码：          身份证号码：              营业执照注册号： ',
                '　　　　　　　　　　　　　　　　　　　　　　　      资质证书编号： ', '　　委托代理人： 　　　　 委托代理人： 　　　       执业经纪人： ', '　　联系电话：　　　　　　联系电话： 　　   　　    执业经纪人资格证书号：',
                '　　住址： 　　　　　　 　住址：                    联系电话：', '　　　　　　　　　　　　　　　　　　　                           年   月   日 ',
                '补充协议：经再次协商，对本合同达成补充协议如下：', '-------------------------------------------', '-----------------------------------------',
                '--------------------------------------------', '--------------------------------------',
                '　甲方： 　　  　乙方：　　　  丙方：（签章）　　　　　', '　　                    二Ｏ  　　年　　月　　日 '

            ],
            rental: ['小区名称：     ', '小区地址：     ', '楼栋号    栋    单元', '楼层    层，共    层', '门牌号         室', '户型', '朝向', '产权证建筑面积      ㎡', '产权证年限    ', '不满2年    满2年     满5年',
                '租金、押金及其他费用', '租金每月人民币           元整（小写：          ）', '押金人民币           元整（小写：          ）', '装修情况', '普通装修   精装修   毛坯',
                '是否有电梯', '有   无', '是否有车位', '有   无', '出租方：       自愿委托自愿出租（位于                                ）真诚独家委托广东房长官网络科技有限公司进行租赁，', '出租方实收押金人民币           元整（小写：          ）、每月实收租金人民币（大',
                '写：￥          元整）（小写：￥           元整）租赁进行出租，出租方以上租金价为实收价（租赁期间', '不含此房每月管理费、电话费、煤气费、清洁费、水电费、网络费、卫生费等杂费等），表示诚意此承诺。',
                '以上确认书内容真实性，该房产买卖委托书，卖方签字，具有同等法律效力。', '\n', '确认签名：'

            ],
            resold: ['小区名称：     ', '小区地址：     ', '楼栋号    栋    单元', '楼层    层，共    层', '门牌号         室', '户型', '朝向', '产权证建筑面积      ㎡', '产权证年限    ', '不满2年    满2年     满5年',
                '是否唯一    ', '唯一住房    不唯一', '装修情况', '普通装修   精装修   毛坯',
                '是否有电梯', '有   无', '是否有车位', '有   无', '卖方：       自愿委托自愿出售（位于                                ）真诚独家委托广东房长官网络科技有限公司', '卖方实收人民币（大写：￥          元整）（小写：￥           元整）成交进行买卖，卖方以',
                '上房价为实收价（不含此房过户税费及银行贷款，中介费），表示诚意此承诺。',
                '以上确认书内容真实性，该房产买卖委托书，卖方签字，具有同等法律效力。', '\n', '确认签名：'

            ]




        }
    }

    // componentWillMount() {
    //     setTimeout(() => {
    //         this.getRegProtocol()
    //     }, 200)

    // }

    // getRegProtocol() {
    //     this.props.getRegisterProtocol()
    // }




    render() {
        const rule = this.state.type === 'resold' ? this.state.resold : this.state.rental
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Header style={{ backgroundColor: '#e64e37' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontSize: 14 }}>{this.state.type === 'resold' ? '售房委托' : '租房委托'}</Title>
                    </Body>
                    <Right />

                </Header>

                <Content >

                    {rule.length > 0 && rule.map((item, index) => {
                        return (
                            <Text key={index} style={{ marginTop: 10, marginLeft: 10, marginRight: 10, color: '#666', fontSize: 14 }}>{item}</Text>
                        )
                    })}

                </Content>
                <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} >
                    <button className="mine" style={{ marginTop: scaleSize(115), backgroundColor: '#e64e37', width: scaleSize(577), alignSelf: 'center', height: scaleSize(80), borderRadius: scaleSize(40), marginBottom: scaleSize(152) }}>
                        <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>同意协议</Text>
                    </button>
                </TouchableOpacity>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    // protocol: state.auth.protocol
})



export default connect(mapStateToProps, {
    // getRegisterProtocol
})(Counter)