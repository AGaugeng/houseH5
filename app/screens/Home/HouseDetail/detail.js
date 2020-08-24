/**
 * 房源详情
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, TextInput, View } from "react-native"
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
    Text,
    ListItem,
    List
} from "native-base"
import styles from "./styles"
import { deviceWidth, scaleSize } from "../../ScreenUtil"
import { getDetailHouseInfo, writeViewHouseRecode } from '../../../actions/house'
import { isText } from '../../../tool/verify'
import Toast from '../../../tool/toast'
import { fetchLinking } from '../../../network'
class UselessTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
                editable={true}
                maxLength={200}

                underlineColorAndroid="transparent"
            />
        );
    }
}
class Counter extends Component {
    static propTypes = {
        getDetailHouseInfo: PropTypes.func.isRequired,
        writeViewHouseRecode: PropTypes.func.isRequired,
        detail: PropTypes.object.isRequired,
        recode: PropTypes.object.isRequired,

    }
    static defaultProps = {
        detail: {},
        recode: {}

    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            h_id: params.id,
            remarks: ''
        }
    }
    server = (item) => {
        return (
            <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                }}
            >
                <ListItem style={{ marginBottom: scaleSize(12) }} icon>
                    <Left style={{ borderBottomColor: '#fff' }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>{item.text}</Text>
                    </Left>
                    <Body style={{ borderBottomColor: '#fff' }} />
                    <Right style={{ borderBottomColor: '#fff' }}>
                        <Text style={{ fontSize: 14, color: '#000' }}>{item.content}</Text>
                    </Right>
                </ListItem>
            </TouchableOpacity>
        )
    }
    componentWillMount() {
        // this.props.navigation.navigate('HousePay')
        this.props.getDetailHouseInfo([{
            name: 'h_id', data: this.state.h_id
        }], () => this.props.navigation.navigate('HousePay'))
    }
    render() {
        //  /^.*(\w)\\1{2,}.*$|^.*[^\w]{2,}.*$/   匹配三个以上的连续相同的普通字符或两个以上的标点符号（汉字也算
        // console.log(isText('匹配通字符或两个以上的标,,'))

        const item = this.props.detail
        const datas = [
            {
                text: "小区名",
                content: item.community
            },
            {
                text: "栋数",
                content: item.building
            },
            {
                text: "楼层",
                content: item.floor
            },
            {
                text: "房号",
                content: item.number
            },
            {
                text: "房型",
                content: !!item.room_num ? (item.room_num + '室' + item.hall_num + '厅' + item.bathroom_num + '卫') : ''
            },
            {
                text: "建筑面积",
                content: !!item.area ? (item.area + 'm²') : ''
            },
            {
                text: "售价",
                content: !!item.price ? (Math.round(item.price * 100 / 10000) / 100 + '万') : ''
            }
        ];
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>房源详情</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    {this.props.recode.status !== 0 && <View>
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
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                            </Right>
                        </ListItem>
                        <List
                            contentContainerStyle={styles.sectionNear}
                            dataArray={datas}
                            renderRow={this.server}
                            keyExtractor={(item, index) => index.toString()}
                        />


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
                                }}>业主信息</Text>
                            </Left>
                            <Right style={{ borderBottomColor: '#fff' }} />
                        </ListItem>
                        <ListItem style={{ marginBottom: scaleSize(12) }} icon>
                            <Left style={{ borderBottomColor: '#fff' }}>
                                <Text style={{ fontSize: 14, color: '#666' }}>业主姓名</Text>
                            </Left>
                            <Body style={{ borderBottomColor: '#fff' }} />
                            <Right style={{ borderBottomColor: '#fff' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>{!!item.owner_name ? item.owner_name : ''}</Text>
                            </Right>
                        </ListItem>
                        {!!item.owner_mobile && <ListItem style={{ marginBottom: scaleSize(12) }} icon onPress={() => {
                            fetchLinking("tel: " + item.owner_mobile)
                        }}>
                            <Left style={{ borderBottomColor: '#fff' }}>
                                <Text style={{ fontSize: 14, color: '#666' }}>联系手机</Text>
                            </Left>
                            <Body style={{ borderBottomColor: '#fff' }} />
                            <Right style={{ borderBottomColor: '#fff' }}>
                                {/* <Text style={{ fontSize: 14, color: '#000' }}>{!!item.owner_mobile ? item.owner_mobile : ''}</Text> */}
                                <Text style={{ fontSize: 14, color: '#000' }}>{'***' + item.owner_mobile.slice(3, 7) + '****'}</Text>

                            </Right>
                        </ListItem>}
                    </View>
                    }
                    <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            {/* <View style={{
                                width: scaleSize(6), height: scaleSize(24),
                                backgroundColor: '#84B7FA',
                                borderRadius: scaleSize(3),
                            }} /> */}
                            <Text style={{ color: '#ff0000', fontSize: 20, marginTop: scaleSize(20) }}>*</Text>
                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                marginLeft: scaleSize(14),
                                fontSize: 16
                            }}>备注（必填）</Text>
                        </Left>
                        <Right style={{ borderBottomColor: '#fff' }} />
                    </ListItem>
                    {/* <UselessTextInput
                        keyboardType="web-search"
                        placeholder="请填写客户看房结果备注"
                        underlineColorAndroid="transparent"
                        style={{ width: deviceWidth - scaleSize(72), marginLeft: scaleSize(36), backgroundColor: '#F4F4F4', height: scaleSize(196), borderRadius: scaleSize(16) }}
                    /> */}
                    <View style={styles.inputContainer}>
                        <UselessTextInput
                            style={styles.inputText}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={(Object.keys(item).length > 0 && !!item.detail_recode.remarks) ? item.detail_recode.remarks : '请填写客户看房结果备注'}
                            onChangeText={remarks => this.setState({ remarks })}
                        // value={this.state.text}
                        />
                    </View>
                    <TouchableOpacity transparent onPress={() => {
                        if (!this.state.remarks) {
                            Toast.warning("请您认真填写备注!")

                        } else if (this.state.remarks.length < 15) {
                            Toast.warning("至少十五个字!")
                        }
                        else if (isText(this.state.remarks)) {
                            Toast.warning("请您认真填写！!")
                        }
                        else {
                            this.props.writeViewHouseRecode([
                                { name: 'recode_id', data: this.props.recode.id },
                                { name: 'remarks', data: this.state.remarks }
                            ], () => this.props.navigation.goBack())
                        }
                    }} >
                        <button className="mine" style={{ width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginTop: scaleSize(50), marginBottom: scaleSize(50), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>提交</Text>
                        </button>
                    </TouchableOpacity>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    detail: state.house.detail,
    recode: state.house.recode,
})

export default connect(mapStateToProps, { getDetailHouseInfo, writeViewHouseRecode })(Counter)