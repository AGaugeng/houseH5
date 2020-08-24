/**
 * 会员编辑
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, ImageBackground } from "react-native"
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Picker,
    Left,
    Right,
    Body,
    Text,
    Spinner,
    Input,
    ListItem,
} from "native-base"
import styles from "./styles"
import View from "../../View"
import { Grid, Col } from "react-native-easy-grid"
import { getAreaBrother, getAreaChild, getAreaChildV2, UpdateAreaChild, UpdateAreaChildV2 } from '../../../actions/location'
import { scaleSize, deviceWidth, toDate } from "../../ScreenUtil"
import { saveMemberInfo, getMemberInfo } from "../../../actions/user"
import DatePicker from 'react-mobile-datepicker';
import Toast from '../../../tool/toast'
class Counter extends Component {
    static propTypes = {
        getMemberInfo: PropTypes.func.isRequired,
        saveMemberInfo: PropTypes.func.isRequired,
        getClientList: PropTypes.func.isRequired,
        getAreaBrother: PropTypes.func.isRequired,
        getAreaChild: PropTypes.func.isRequired,
        getAreaChildV2: PropTypes.func.isRequired,
        getHouseLayout: PropTypes.func.isRequired,
        getHouseArea: PropTypes.func.isRequired,
        clientlist: PropTypes.array.isRequired,
        layout: PropTypes.array.isRequired,
        acreage: PropTypes.array.isRequired,
    }
    static defaultProps = {
        clientlist: [],
        areachild: [],
        areachildv2: [],
        areabrother: [],
        layout: [],
        acreage: []
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            chosenDate: new Date(),
            params: params,
            name: '',
            mobile: 0,
            idcard: 0,
            isMan: true,
            birth_date: '',
            real_name: '',
            id_card: '',
            id_card_img: [],
            gender: '',
            province: '',
            city: '',
            town: '',
            path_a: '',
            path_b: '',
            preview_a: null,
            preview_b: null,
            data_a: null,
            data_b: null,
            path_c: '',
            path_d: '',
            preview_c: null,
            preview_d: null,
            data_c: null,
            data_d: null,
            refreshing: false


        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    server = (item) => {
        return (
            <ImageBackground
                source={item.bgImg} style={styles.bgImg}
            >
                <View row push mdp>
                    <View hstart>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}><Text style={{ fontSize: 12, color: '#fff', marginRight: scaleSize(13) }}>￥</Text>{item.price}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginTop: scaleSize(20) }}>{item.content}</Text>
                    </View >


                    <View hcenter>
                        <Text style={{ fontSize: 14, color: '#fff' }}>{item.title}</Text>
                        <Button onPress={() => {
                            this.props.navigation.navigate(item.route, item)
                        }} style={{ marginTop: scaleSize(20), height: scaleSize(48), backgroundColor: '#fff', borderRadius: scaleSize(24) }}>
                            <Text style={{ color: '#000', fontSize: 14 }}>立即购买</Text>
                        </Button>
                    </View >

                </View>
            </ImageBackground>
        )
    }
    componentWillMount() {
        this.props.getMemberInfo()
        this.props.getAreaBrother([
            { name: 'province', data: '北京市' },
            { name: 'city', data: this.state.city },
            { name: 'town', data: this.props.town }
        ])


    }
    componentDidMount() {
        if (!this.props.userinfo.id_card) {
            Toast.warning("请先填写资料!")
        }
        const member = this.props.member
        // const isMan = member.gender === '男' ? true : false
        // console.log(member)
        setTimeout(() => {
            const isMan = member.gender === '男' ? true : false
            this.setState({ isMan })
        }, 1000);

    }
    changePath_a = (e) => {

        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src, preview, type = file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} width="110px" height="110px" alt='' />

        }
        this.setState({ path_a: file.name, data_a: file, preview_a: preview })
    }
    changePath_b = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src, preview, type = file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} width="110px" height="110px" alt='' />

        }
        this.setState({ path_b: file.name, data_b: file, preview_b: preview })
    }
    changePath_c = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src, preview, type = file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} width="110px" height="110px" alt='' />

        }
        this.setState({ path_c: file.name, data_c: file, preview_c: preview })
    }
    changePath_d = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src, preview, type = file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} width="110px" height="110px" alt='' />

        }
        this.setState({ path_d: file.name, data_d: file, preview_d: preview })
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ birth_date: toDate(time / 1000).slice(0, toDate(time / 1000).indexOf(' ')), isOpen: false });

    }

    saveMemberInfo(params) {

        const {
            province, city, town, birth_date, real_name, id_card, isMan, data_a,
            data_b,
            data_c,
            data_d
        } = this.state

        this.setState({ refreshing: true })
        this.props.saveMemberInfo([
            { name: 'real_name', data: !!real_name ? real_name : params.real_name },
            { name: 'birth_date', data: !!birth_date ? birth_date : params.birth_date },
            { name: 'id_card', data: !!id_card ? id_card : params.id_card },
            { name: 'id_card_img_a', data: data_a },
            { name: 'id_card_img_b', data: data_b },
            { name: 'id_bank_img_a', data: data_c },
            { name: 'id_bank_img_b', data: data_d },
            { name: 'gender', data: isMan ? '男' : '女' },
            { name: 'province', data: !!province ? province : params.province },
            { name: 'city', data: !!city ? city : params.city },
            { name: 'town', data: !!town ? town : params.town },
        ], () => {
            this.props.getMemberInfo()
            setTimeout(() => {
                this.props.navigation.goBack()
                this.setState({ refreshing: false })
            }, 200)

        }, () => {
            this.setState({ refreshing: false })
        })


    }
    render() {



        const dateConfig = {

            'year': {
                format: 'YYYY',
                caption: 'Year',
                step: 1,
            },
            'month': {
                format: 'MM',
                caption: 'Mon',
                step: 1,
            },
            'date': {
                format: 'DD',
                caption: 'Day',
                step: 1,
            },
        }
        // isMan: member.gender === '男' ? true : false,

        const {
            province, city, town, birth_date, path_a, path_b, path_c, path_d, preview_a, preview_b,
            preview_c, preview_d
        } = this.state

        const item = this.props.member


        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>资料修改</Title>
                    </Body>
                    <Right />
                </Header>
                {Object.keys(item).length === 0 ? <Spinner /> :
                    <Content>
                        <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <View style={{
                                    width: scaleSize(6), height: scaleSize(24),
                                    backgroundColor: '#84B7FA',
                                    borderRadius: scaleSize(3),
                                }} />
                                <Text style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    marginLeft: scaleSize(14),
                                    fontSize: 16
                                }}>会员信息</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                            </Right>
                        </ListItem>
                        <View mdpl mdpr row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>姓名</Text>
                            </Left>
                            <Right >
                                <Input
                                    keyboardType="web-search"
                                    placeholder={!!item.real_name ? item.real_name : '请输入姓名'}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(270) }]}
                                    onChangeText={real_name => {
                                        this.setState({ real_name })
                                    }}
                                    placeholderTextColor='#ccc'
                                />

                            </Right>
                        </View>
                        <View mdpl mdpr row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>性别</Text>
                            </Left>
                            <View mdpl row>
                                <View hcenter>
                                    <Button transparent onPress={() => this.setState({ isMan: true })}>
                                        <Text style={{
                                            color: this.state.isMan ? '#000' : '#999',
                                            fontSize: this.state.isMan ? 15 : 12,
                                            fontWeight: this.state.isMan ? 'bold' : 'normal',
                                        }}>男</Text>
                                    </Button>
                                    {this.state.isMan && <View style={{ width: scaleSize(30), marginTop: scaleSize(-15), height: scaleSize(4), backgroundColor: '#e64e37' }} />}
                                </View>
                                <Text style={{ marginTop: scaleSize(25), color: '#ccc' }}>|</Text>
                                <View hcenter>
                                    <Button transparent onPress={() => this.setState({ isMan: false })}>
                                        <Text style={{

                                            color: this.state.isMan ? '#999' : '#000',
                                            fontSize: this.state.isMan ? 12 : 15,
                                            fontWeight: this.state.isMan ? 'normal' : 'bold'
                                        }}>女</Text>
                                        <View />
                                    </Button>
                                    {!this.state.isMan && <View style={{ width: scaleSize(30), marginTop: scaleSize(-15), height: scaleSize(4), backgroundColor: '#e64e37' }} />}
                                </View>
                            </View>
                        </View >
                        <View mdpl mdpr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>身份证号</Text>
                            </Left>
                            <Right >
                                <Input
                                    keyboardType="web-search"
                                    placeholder={!!item.id_card ? item.id_card : '请输入您的身份证号码'}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(330) }]}
                                    onChangeText={id_card => {
                                        this.setState({ id_card })
                                    }}
                                    placeholderTextColor='#ccc'
                                />

                            </Right>
                        </View>

                        <ListItem onPress={this.handleClick} icon style={{ borderBottomColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Left style={{ flexDirection: 'row', borderBottomColor: '#fff' }}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>出生年月</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff' }}>
                                <DatePicker
                                    value={new Date()}
                                    dateConfig={dateConfig}
                                    isOpen={this.state.isOpen}
                                    onSelect={this.handleSelect}
                                    onCancel={this.handleCancel} />
                                <Text style={{
                                    height: 20,
                                    color: '#ccc',
                                    backgroundColor: '#fff',
                                    fontSize: 14
                                }}>{!!birth_date ? birth_date : item.birth_date}</Text>
                                <Icon style={{ fontSize: 20, color: '#ccc', marginBottom: scaleSize(15) }} name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <View mdpr mdpt icon style={{ marginLeft: scaleSize(35), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>所在城市</Text>
                            </Left>
                            <View style={{
                            }}>
                                <Picker
                                    style={{ position: 'absolute', width: scaleSize(150), right: 10, top: 0, opacity: 0 }}
                                    selectedValue={this.state.province}

                                    iosIcon={<Icon name="ios-arrow-down-outline" />}

                                    onValueChange={(province, index) => {
                                        this.setState({ province: province, city: '', town: '' })
                                        if (index) {
                                            this.props.UpdateAreaChild([])
                                            this.props.UpdateAreaChildV2([])

                                            this.props.getAreaChild([{ name: 'id', data: this.props.areabrother[0][index - 1].id }])



                                        }


                                    }}>
                                    {[{ name: '选择省', id: null }, ...this.props.areabrother[0]].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}
                                </Picker>
                                <Text style={{ marginRight: scaleSize(60), color: '#ccc', fontSize: 14 }}>{!!province ? province : item.province}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={this.state.city}
                                    style={{ position: 'absolute', width: scaleSize(150), right: 10, top: 0, opacity: 0 }}
                                    onValueChange={(city, index) => {
                                        this.setState({ city })
                                        if (index) {
                                            this.props.getAreaChildV2([{ name: 'id', data: this.props.areachild[index - 1].id }])
                                        }

                                    }}>
                                    {[{ name: '选择市', id: null }, ...this.props.areachild].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                    )}


                                </Picker>
                                <Text style={{ marginRight: scaleSize(70), color: '#ccc', fontSize: 14 }}>{!!city ? city : item.city}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={this.state.town}
                                    style={{ position: 'absolute', width: scaleSize(150), right: 0, top: 0, opacity: 0 }}
                                    onValueChange={(town, itemIndex) => this.setState({ town })}>
                                    {[{ name: '选择区', id: null }, ...this.props.areachildv2].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!town ? town : item.town}</Text>

                            </View>
                            <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5), }} name="ios-arrow-forward" />
                        </View>


                        <View mdpl mdpr lgpt row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>联系号码</Text>
                            </Left>
                            <Right >

                                <Text style={{
                                    color: '#666',

                                    marginLeft: scaleSize(14),
                                    fontSize: 14
                                }}>{this.props.userinfo.mobile}</Text>
                            </Right>
                        </View>

                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <View style={{
                                    width: scaleSize(6), height: scaleSize(24),
                                    backgroundColor: '#84B7FA',
                                    borderRadius: scaleSize(3),
                                }} />
                                <Text style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    marginLeft: scaleSize(14),
                                    fontSize: 16
                                }}>修改身份证（可不填）</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                            </Right>
                        </ListItem>


                        <div className='row'>
                            <div className='media'>
                                {!preview_a &&
                                    <a href="javascript:;" className="file">
                                        <span>{path_a ? path_a : ''}</span>
                                        <input type='file' accept='image/*' onChange={this.changePath_a} />
                                    </a>
                                }
                                {preview_a}

                            </div>
                            <div className='media'>
                                {!preview_b &&
                                    <a href="javascript:;" className="file">
                                        <span>{path_b ? path_b : ''}</span>
                                        <input type='file' accept='image/*' onChange={this.changePath_b} />
                                    </a>
                                }
                                {preview_b}
                            </div>
                        </div>
                        <Grid style={{ marginTop: scaleSize(40) }}>
                            <Col style={{ alignItems: 'center' }}>

                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                    marginBottom: scaleSize(10)
                                }}>身份证正面</Text>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>

                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                    marginBottom: scaleSize(10)
                                }}>身份证反面</Text>
                            </Col>
                        </Grid>

                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <View style={{
                                    width: scaleSize(6), height: scaleSize(24),
                                    backgroundColor: '#84B7FA',
                                    borderRadius: scaleSize(3),
                                }} />
                                <Text style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    marginLeft: scaleSize(14),
                                    fontSize: 16
                                }}>修改银行卡（可不填）</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                            </Right>
                        </ListItem>


                        <div className='row'>
                            <div className='media'>
                                {!preview_c &&
                                    <a href="javascript:;" className="file">
                                        <span>{path_c ? path_c : ''}</span>
                                        <input type='file' accept='image/*' onChange={this.changePath_c} />
                                    </a>
                                }
                                {preview_c}

                            </div>
                            <div className='media'>
                                {!preview_d &&
                                    <a href="javascript:;" className="file">
                                        <span>{path_d ? path_d : ''}</span>
                                        <input type='file' accept='image/*' onChange={this.changePath_d} />
                                    </a>
                                }
                                {preview_d}
                            </div>
                        </div>
                        <Grid style={{ marginTop: scaleSize(40) }}>
                            <Col style={{ alignItems: 'center' }}>

                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                    marginBottom: scaleSize(10)
                                }}>银行卡正面</Text>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>

                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                    marginBottom: scaleSize(10)
                                }}>银行卡反面</Text>
                            </Col>
                        </Grid>
                        {this.state.refreshing ? <Spinner color="#e64e37" /> : <TouchableOpacity transparent onPress={
                            () => this.saveMemberInfo(item)
                        }
                        >
                            <button className="mine" style={{ width: scaleSize(577), marginTop: scaleSize(20), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginBottom: scaleSize(25), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>确定修改</Text>
                            </button>
                        </TouchableOpacity>}
                    </Content>}
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    areabrother: state.location.areabrother,
    areachild: state.location.areachild,
    areachildv2: state.location.areachildv2,
    userinfo: state.user.info,
    member: state.user.memberinfo
})

export default connect(mapStateToProps, { getMemberInfo, saveMemberInfo, UpdateAreaChildV2, UpdateAreaChild, getAreaChildV2, getAreaBrother, getAreaChild })(Counter)

