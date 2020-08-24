/**
 * 会员中心
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
import { saveMemberInfo } from "../../../actions/user"
import DatePicker from 'react-mobile-datepicker';
import Toast from '../../../tool/toast'
class Counter extends Component {
    static propTypes = {
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
            isMan: false,
            params: params,
            name: '',
            mobile: 0,
            idcard: 0,
            // city: '',
            // town: '',
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
    }
    changePath_a = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        let src, preview, type = file.type;
        if (/^image\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <img src={src} alt='' />

        } else if (/^video\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay loop controls />

        } else if (/^text\/\S+$/.test(type)) {
            const self = this;
            const reader = new FileReader();
            reader.readAsText(file);
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea value={this.result} readOnly></textarea>
                self.setState({ path_a: file.name, data_a: file, preview_a: preview })
            }
            return;
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
            preview = <img src={src} alt='' />

        } else if (/^video\/\S+$/.test(type)) {

            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay loop controls />

        } else if (/^text\/\S+$/.test(type)) {
            const self = this;
            const reader = new FileReader();
            reader.readAsText(file);
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea value={this.result} readOnly></textarea>
                self.setState({ path_b: file.name, data_b: file, preview_b: preview })
            }
            return;
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
            preview = <img src={src} alt='' />

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
            preview = <img src={src} alt='' />

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

        if (!params.real_name) {
            Toast.warning("请输入名字!")
        } else if (!params.birth_date) {
            Toast.warning("请输入出生日期!")
        } else if (!params.id_card) {
            Toast.warning("请输入身份证号!")
        }
        else if (!params.data_a || !params.data_b) {
            Toast.warning("请提供身份证照片!")
        } else if (!params.data_c || !params.data_d) {
            Toast.warning("请提供银行卡照片!")
        } else if (!params.province && !params.city && !params.town) {
            Toast.warning("请选择所在城市!")
        } else {
            this.setState({ refreshing: true })
            this.props.saveMemberInfo([
                { name: 'real_name', data: params.real_name },
                { name: 'birth_date', data: params.birth_date },
                { name: 'id_card', data: params.id_card },
                { name: 'id_card_img_a', data: params.data_a },
                { name: 'id_card_img_b', data: params.data_b },
                { name: 'id_bank_img_a', data: params.data_c },
                { name: 'id_bank_img_b', data: params.data_d },
                { name: 'gender', data: params.isMan ? '男' : '女' },
                { name: 'province', data: params.province },
                { name: 'city', data: params.city },
                { name: 'town', data: params.town },
            ], () => {

                this.props.navigation.navigate('MemberJoin', { ...params.params })
                this.setState({ refreshing: false })
            }, () => {
                this.setState({ refreshing: false })
            })

        }
    }
    render() {

        const profile = this.state
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

        const item = this.state
        // const { name, path_a, path_b, preview_a, preview_b } = this.state;
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>会员资料</Title>
                    </Body>
                    <Right />
                </Header>
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
                                placeholder="输入您的真实姓名"
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
                                placeholder="请输入真实身份证号码"
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
                            }}>{!!this.state.birth_date ? this.state.birth_date : '请选择出生日期'}</Text>
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
                            <Text style={{ marginRight: scaleSize(60), color: '#ccc', fontSize: 14 }}>{!!this.state.province ? this.state.province : '选择省'}</Text>
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
                            <Text style={{ marginRight: scaleSize(70), color: '#ccc', fontSize: 14 }}>{!!this.state.city ? this.state.city : '选择市'}</Text>
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
                            <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!this.state.town ? this.state.town : '选择区'}</Text>

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
                            }}>上传身份证</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                    </ListItem>

                    {/* <UploadFile /> */}
                    <div className='row'>
                        <div className='media'>
                            {!item.preview_a &&
                                <a href="javascript:;" className="file">
                                    <span>{item.path_a ? item.path_a : ''}</span>
                                    <input type='file' accept='image/*' onChange={this.changePath_a} />
                                </a>
                            }
                            {item.preview_a}

                        </div>
                        <div className='media'>
                            {!item.preview_b &&
                                <a href="javascript:;" className="file">
                                    <span>{item.path_b ? item.path_b : ''}</span>
                                    <input type='file' accept='image/*' onChange={this.changePath_b} />
                                </a>
                            }
                            {item.preview_b}
                        </div>
                    </div>
                    <Grid style={{ marginTop: scaleSize(40) }}>
                        <Col style={{ alignItems: 'center' }}>
                            {/* <Image source={require("../../../assets/mine/vip/add@3x.png")} resizeMode='cover' style={styles.addImg} /> */}
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginBottom: scaleSize(10)
                            }}>身份证正面</Text>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            {/* <Image source={require("../../../assets/mine/vip/add@3x.png")} resizeMode='cover' style={styles.addImg} /> */}
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
                            }}>上传银行卡</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                    </ListItem>

                    {/* <UploadFile /> */}
                    <div className='row'>
                        <div className='media'>
                            {!item.preview_c &&
                                <a href="javascript:;" className="file">
                                    <span>{item.path_c ? item.path_c : ''}</span>
                                    <input type='file' accept='image/*' onChange={this.changePath_c} />
                                </a>
                            }
                            {item.preview_c}

                        </div>
                        <div className='media'>
                            {!item.preview_d &&
                                <a href="javascript:;" className="file">
                                    <span>{item.path_d ? item.path_d : ''}</span>
                                    <input type='file' accept='image/*' onChange={this.changePath_d} />
                                </a>
                            }
                            {item.preview_d}
                        </div>
                    </div>
                    <Grid style={{ marginTop: scaleSize(40) }}>
                        <Col style={{ alignItems: 'center' }}>
                            {/* <Image source={require("../../../assets/mine/vip/add@3x.png")} resizeMode='cover' style={styles.addImg} /> */}
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginBottom: scaleSize(10)
                            }}>银行卡正面</Text>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            {/* <Image source={require("../../../assets/mine/vip/add@3x.png")} resizeMode='cover' style={styles.addImg} /> */}
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginBottom: scaleSize(10)
                            }}>银行卡反面</Text>
                        </Col>
                    </Grid>
                    {this.state.refreshing ? <Spinner color="#e64e37" /> : <TouchableOpacity transparent onPress={
                        () => this.saveMemberInfo(profile)
                    }
                    >
                        <button className="mine" style={{ width: scaleSize(577), marginTop: scaleSize(20), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginBottom: scaleSize(25), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>下一步</Text>
                        </button>
                    </TouchableOpacity>}
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    areabrother: state.location.areabrother,
    areachild: state.location.areachild,
    areachildv2: state.location.areachildv2,
    userinfo: state.user.info,
})

export default connect(mapStateToProps, { saveMemberInfo, UpdateAreaChildV2, UpdateAreaChild, getAreaChildV2, getAreaBrother, getAreaChild })(Counter)

