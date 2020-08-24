/*
 * @Author: Song
 * @Date: 2018-11-27 19:25:11
 * @LastEditors: Song
 * @LastEditTime: 2019-01-17 11:00:15
 * @Description: 编辑客户
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, TouchableOpacity } from "react-native"
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Picker,
    Form,
    Text,
    Input,
    ListItem,
    Switch
} from "native-base"
import styles from "./styles"
import View from "../../View"
import { saveClientInfo, getMyClientSell, getMyClientRent, getClientSell, getClientRent, getClientInfo } from '../../../actions/client'
import { isPhoneNumber } from '../../../tool/verify'
import { getAreaBrother, getAreaChild, getAreaChildV2, UpdateAreaChild, UpdateAreaChildV2 } from '../../../actions/location'
import { scaleSize, deviceWidth } from "../../ScreenUtil"
import { getHouseLayout, getHouseArea } from '../../../actions/house'
import Toast from '../../../tool/toast'


class Counter extends Component {
    static propTypes = {
        getMyClientSell: PropTypes.func.isRequired,
        getMyClientRent: PropTypes.func.isRequired,
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
            isShare: !!params.is_share ? (params.is_share === '1' ? true : false) : false,
            province: '',
            city: '',
            town: '',
            id: params.id,
            isMan: !!params.gender ? (params.gender === '先生' ? true : false) : false,//   区分添加  与修改
            name: '',
            mobile: '',
            layout: '',
            purpose_zone: '',
            purpose_other: '',
            type: params.type,
            purpose_room_num: '',
            purpose_hall_num: '',
            purpose_bathroom_num: '',
            acreage: ''

        }
    }
    componentWillMount() {

        this.props.getHouseLayout()
        this.props.getHouseArea()
        // this.setState((state, props) => {
        //     const { params } = props.navigation.state || 0
        //     console.log(state, props)
        //     state.isShare = !!params.is_share ? (params.is_share === '1' ? true : false) : true
        //     state.isMan = !!params.gender ? (params.gender === '先生' ? true : false) : true
        // })

    }
    componentDidMount() {
        const { params } = this.props.navigation.state || 0
        this.props.getAreaBrother([
            { name: 'province', data: params.purpose_province },
            { name: 'city', data: params.purpose_city },
            { name: 'town', data: params.purpose_town }
        ])
    }
    saveClientInfo() {
        const {
            isShare, province, city, town, id, isMan, name,
            mobile, purpose_zone, purpose_other, type, purpose_room_num,
            purpose_hall_num, purpose_bathroom_num, acreage
        } = this.state
        const { params } = this.props.navigation.state || 0
        this.props.saveClientInfo([
            { name: 'id', data: params.id },
            { name: 'name', data: !!name ? name : params.name },
            { name: 'gender', data: isMan ? '先生' : '女士' },
            { name: 'mobile', data: !!mobile ? mobile : params.mobile },
            { name: 'purpose_type', data: params.purpose_type },
            { name: 'purpose_province', data: !!province ? province : params.purpose_province },
            { name: 'purpose_city', data: !!city ? city : params.purpose_city },
            { name: 'purpose_town', data: !!town ? town : params.purpose_town },
            { name: 'purpose_zone', data: !!purpose_zone ? purpose_zone : params.purpose_zone },
            { name: 'purpose_room_num', data: !!purpose_room_num ? purpose_room_num : params.purpose_room_num },
            { name: 'purpose_hall_num', data: !!purpose_hall_num ? purpose_hall_num : params.purpose_hall_num },
            { name: 'purpose_bathroom_num', data: !!purpose_bathroom_num ? purpose_bathroom_num : params.purpose_bathroom_num },
            { name: 'purpose_floor_area', data: !!acreage ? acreage : params.purpose_floor_area },
            { name: 'purpose_other', data: !!purpose_other ? purpose_other : params.purpose_other },
            { name: 'is_share', data: isShare ? 1 : 0 }
        ], () => {
            if (!this.state.id && this.state.type === 'sell') {
                this.props.getClientSell([
                    { name: 'page', data: 1 },
                    { name: 'keyword', data: '' },
                    { name: 'purpose_type', data: this.state.type }
                ])
                this.props.getMyClientSell([
                    { name: 'page', data: 1 },
                    { name: 'keyword', data: '' },
                    { name: 'purpose_type', data: this.state.type }
                ])
            } else if (!this.state.id && this.state.type === 'rent') {
                this.props.getClientRent([
                    { name: 'page', data: 1 },
                    { name: 'keyword', data: '' },
                    { name: 'purpose_type', data: this.state.type }
                ])
                this.props.getMyClientRent([
                    { name: 'page', data: 1 },
                    { name: 'keyword', data: '' },
                    { name: 'purpose_type', data: this.state.type }
                ])
            } else {
                this.props.getClientInfo([
                    { name: 'client_id', data: this.state.id },
                ])
            }
            this.props.navigation.goBack()
        })
    }

    _onValueChange(touchID) {
        this.setState({ isShare: touchID })
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
                        }} style={{ width: scaleSize(160), marginTop: scaleSize(20), height: scaleSize(48), backgroundColor: '#fff', borderRadius: scaleSize(24) }}>
                            <Text style={{ color: '#000', fontSize: 8, alignSelf: 'center' }}>立即购买</Text>
                        </Button>
                    </View >

                </View>
            </ImageBackground>
        )
    }

    render() {
        const { params } = this.props.navigation.state
        const {
            isShare, province, city, town, id, isMan, name,
            mobile, layout, purpose_zone, purpose_other, type, purpose_room_num,
            purpose_hall_num, purpose_bathroom_num, acreage
        } = this.state

        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>编辑客户</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
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
                                }}>基本信息</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }} />

                        </ListItem>
                        <View mdpl row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>客户称呼</Text>
                            </Left>
                            <View >
                                <Input
                                    keyboardType="web-search"
                                    placeholder={!!params.name ? params.name : name}
                                    // value={params.name}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(260) }]}
                                    onChangeText={name => {
                                        this.setState({ name })
                                    }}
                                    placeholderTextColor='#999'
                                />
                            </View >
                        </View >
                        <View mdpl style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>选择性别</Text>
                            </Left>
                            <View mdpl row>
                                <View hcenter>
                                    <Button transparent onPress={() => this.setState({ isMan: true })}>
                                        <Text style={{
                                            color: isMan ? '#000' : '#999',
                                            fontSize: isMan ? 15 : 12,
                                            fontWeight: isMan ? 'bold' : 'normal',
                                        }}>先生</Text>
                                    </Button>
                                    {isMan && <View style={{ width: scaleSize(30), marginTop: scaleSize(-15), height: scaleSize(4), backgroundColor: '#e64e37' }} />}
                                </View>
                                <Text style={{ marginTop: scaleSize(25), color: '#ccc' }}>|</Text>
                                <View hcenter>
                                    <Button transparent onPress={() => this.setState({ isMan: false })}>
                                        <Text style={{

                                            color: isMan ? '#999' : '#000',
                                            fontSize: isMan ? 12 : 15,
                                            fontWeight: isMan ? 'normal' : 'bold'
                                        }}>女士</Text>
                                        <View />
                                    </Button>
                                    {!isMan && <View style={{ width: scaleSize(30), marginTop: scaleSize(-15), height: scaleSize(4), backgroundColor: '#e64e37' }} />}
                                </View>
                            </View>
                        </View >
                        <View mdpl row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>联系手机</Text>
                            </Left>
                            <View >
                                <Input
                                    keyboardType="number-pad"
                                    placeholder={!!params.mobile ? params.mobile : mobile}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(320) }]}
                                    onChangeText={mobile => {
                                        this.setState({ mobile })
                                    }}
                                    placeholderTextColor='#999'
                                />


                            </View >
                        </View >

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
                                }}>客户意向</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                            </Right>
                        </ListItem>

                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>选择类型</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                                <Text style={{
                                    color: '#999',
                                    fontSize: 14
                                }}>{params.purpose_type === 'sell' ? '求购' : '求租'}</Text>
                                <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
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
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 10, top: 0, opacity: 0 }}
                                    selectedValue={province}

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
                                <Text note style={{ marginRight: scaleSize(50) }}>{!!province ? province : params.purpose_province}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={city}
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 10, top: 0, opacity: 0 }}
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
                                <Text note style={{ marginRight: scaleSize(50) }}>{!!city ? city : params.purpose_city}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={town}
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 0, top: 0, opacity: 0 }}
                                    onValueChange={(town, itemIndex) => this.setState({ town })}>
                                    {[{ name: '选择区', id: null }, ...this.props.areachildv2].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text note style={{ marginRight: scaleSize(30) }}>{!!town ? town : params.purpose_town}</Text>

                            </View>
                            <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
                        </View>

                        <View mdpr lgpt row push mdpl >
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>户型</Text>
                            </Left>
                            <View row push style={{ alignItems: 'center' }}>

                                <Picker

                                    selectedValue={purpose_room_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 100, top: 0, opacity: 0 }}
                                    onValueChange={(purpose_room_num, index) => {
                                        this.setState({ purpose_room_num })
                                    }}>
                                    {[
                                        // { name: '选择卫', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}
                                </Picker>
                                <Text note style={{
                                    marginRight: scaleSize(50)
                                }}>{!!purpose_room_num ? purpose_room_num : params.purpose_room_num}室</Text>
                                <Picker

                                    selectedValue={purpose_hall_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 55, top: 0, opacity: 0 }}
                                    onValueChange={(purpose_hall_num, index) => {
                                        this.setState({ purpose_hall_num })


                                    }}>
                                    {[
                                        // { name: '选择卫', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text note style={{
                                    marginRight: scaleSize(50)
                                }}>{!!purpose_hall_num ? purpose_hall_num : params.purpose_hall_num}厅</Text>
                                <Picker

                                    selectedValue={purpose_bathroom_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 10, top: 0, opacity: 0 }}
                                    onValueChange={(purpose_bathroom_num, itemIndex) => this.setState({ purpose_bathroom_num })}>
                                    {[
                                        // { name: '未选择', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text note style={{
                                    marginRight: scaleSize(30)
                                }}>{!!purpose_bathroom_num ? purpose_bathroom_num : params.purpose_bathroom_num}卫</Text>
                                <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
                            </View>
                        </View>
                        <View mdpl lgpt row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>面积</Text>
                            </Left>
                            <View >
                                <Picker
                                    selectedValue={this.state.acreage}
                                    style={{ position: 'absolute', width: scaleSize(200), color: '#666', right: 30, top: 0, opacity: 0 }}
                                    onValueChange={(acreage, itemIndex) => this.setState({ acreage })}>
                                    {[{ id: '0', title: '选择面积' }, ...this.props.acreage].map((item, index) =>
                                        <Picker.Item label={item.title} value={item.title} />
                                    )}

                                </Picker>
                                <Text note style={{ marginRight: scaleSize(100) }}>{!!acreage ? acreage : params.purpose_floor_area}</Text>

                            </View>

                        </View>
                        <View mdpl mdpt row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>小区</Text>
                            </Left>
                            <View >

                                <Input
                                    keyboardType="web-search"
                                    placeholder={!!purpose_zone ? purpose_zone : params.purpose_zone}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(320) }]}
                                    onChangeText={purpose_zone => {
                                        this.setState({ purpose_zone })
                                    }}
                                    placeholderTextColor='#999'
                                />
                            </View >

                        </View>
                        <View mdpl row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>其他</Text>
                            </Left>
                            <View >

                                <Input
                                    keyboardType="web-search"
                                    placeholder={!!purpose_other ? purpose_other : params.purpose_other}
                                    underlineColorAndroid="transparent"
                                    style={[styles.inputText, { width: scaleSize(320) }]}
                                    onChangeText={purpose_other => {
                                        this.setState({ purpose_other })
                                    }}
                                    placeholderTextColor='#999'
                                />
                            </View >

                        </View>
                        <View mdpl mdpt row push>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>设置是否分享</Text>
                            </Left>
                            <Switch style={{ marginRight: scaleSize(72) }}
                                onValueChange={touchID => {
                                    this._onValueChange(touchID)
                                }} value={isShare} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            if (isPhoneNumber(!!mobile ? mobile : params.mobile)) {
                                this.saveClientInfo()

                            } else {
                                Toast.warning("请输入正确的手机号码!")
                            }

                        }} >
                            <button className="mine" style={{ width: scaleSize(577), marginTop: scaleSize(105), marginBottom: scaleSize(46), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
                                <Text style={{ color: '#fff', fontSize: 14 }}>保存</Text>
                            </button>
                        </TouchableOpacity>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    clientlist: state.client.list,
    areabrother: state.location.areabrother,
    areachild: state.location.areachild,
    areachildv2: state.location.areachildv2,
    layout: state.house.layout,
    acreage: state.house.acreage,
})

export default connect(mapStateToProps, { getMyClientSell, getMyClientRent, getHouseArea, getClientSell, getClientRent, getClientInfo, UpdateAreaChildV2, UpdateAreaChild, getAreaChildV2, getHouseLayout, saveClientInfo, getAreaBrother, getAreaChild })(Counter)
