/**
 * 客户信息
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, Linking, TouchableOpacity } from "react-native"
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
import View from "../../View"
import { Grid, Col } from "react-native-easy-grid"
import { getClientInfo, getClientViewLog } from '../../../actions/client'
import { scaleSize, deviceWidth } from "../../ScreenUtil"

class Counter extends Component {

    static propTypes = {
        getClientInfo: PropTypes.func.isRequired,
        getClientViewLog: PropTypes.func.isRequired,
        clientinfo: PropTypes.object.isRequired,
        viewlog: PropTypes.object.isRequired,
    }
    static defaultProps = {
        clientinfo: {},
        viewlog: []

    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state
        this.state = {
            params: params,


        }
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

    want = (item) => {
        return (
            <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Left>
                    <Text style={{
                        color: '#000',
                        fontSize: 14
                    }}>{item.title}</Text>
                </Left>
                <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                    <Text style={{
                        color: '#000',
                        fontSize: 14
                    }}>{item.content}</Text>
                    <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
                </Right>
            </ListItem>
        )
    }
    componentWillMount() {
        this.props.getClientInfo([
            { name: 'client_id', data: this.state.params.client_id },
        ])

        this.props.getClientViewLog([
            { name: 'page', data: 1 },
            { name: 'client_id', data: this.state.params.client_id },
        ])

    }

    render() {
        const item = this.props.clientinfo
        const datas = [
            {
                title: "选择类型",
                content: item.purpose_type === 'sell' ? '求购' : '求租'
            },
            {
                title: "所在城市",
                content: item.purpose_city
            },
            {
                title: "区域",
                content: item.purpose_town
            },
            {
                title: "小区",
                content: item.purpose_zone
            },
            {
                title: "户型",
                content: !!item.purpose_room_num ? (item.purpose_room_num + '室' + item.purpose_hall_num + '厅' + item.purpose_bathroom_num + '卫') : ''
            },
            {
                title: "面积",
                content: !!item.purpose_floor_area ? item.purpose_floor_area : ''
            },
            {
                title: "其他",
                content: !!item.purpose_other ? item.purpose_other : ''
            }
        ];
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>客户信息</Title>
                    </Body>

                    <Right >
                        <Button transparent onPress={() => this.props.navigation.navigate('PassengerEdit', { ...item })}>
                            <Text style={{
                                color: '#666',
                                fontSize: 14
                            }}>编辑</Text>
                        </Button>
                    </Right >

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
                            }}>基本信息</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                    </ListItem>
                    <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>客户称呼</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>{item.name}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>性别</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>{item.gender}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>联系手机</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>{item.mobile}</Text>
                        </Right>
                    </ListItem>
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
                    <List
                        contentContainerStyle={styles.sectionNear}
                        dataArray={datas}
                        renderRow={this.want}
                        keyExtractor={(item, index) => index.toString()}
                    />

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
                            }}>看房记录</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                    </ListItem>
                    {this.props.viewlog.length === 0 ?
                        <Text style={{ alignSelf: 'center' }}>没有记录</Text>
                        :
                        <List
                            style={{ marginLeft: scaleSize(36) }}
                            dataArray={this.props.viewlog}
                            keyExtractor={(item, index) => index.toString()}
                            renderRow={data =>
                                <ListItem onPress={() => this.props.navigation.navigate('PassengerView', { id: data.id })} icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Left>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 14
                                        }}>{data.view_time}</Text>
                                    </Left>
                                    <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 14
                                        }}>{data.title}</Text>
                                    </Right>
                                </ListItem>}

                        />
                    }
                    <Grid style={{ marginTop: scaleSize(129), marginBottom: scaleSize(82), marginLeft: deviceWidth / 2 - scaleSize(678) / 2 }}>
                        <Col>
                            <TouchableOpacity transparent onPress={() => {
                                let url = "tel: " + item.mobile//调用拨号
                                Linking.canOpenURL(url).then(supported => {
                                    if (supported) {
                                        Linking.openURL(url);
                                    }
                                })
                            }} >
                                <button className="mine" style={{ width: scaleSize(290), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                                    <Text style={{ color: '#fff', fontSize: 14 }}>联系经济人</Text>
                                </button>
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity transparent onPress={() => {
                                this.props.navigation.navigate('PassengerFollow', item)
                            }} >
                                <button className="mine" style={{ width: scaleSize(290), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                                    <Text style={{ color: '#fff', fontSize: 14 }}>跟客维护</Text>
                                </button>
                            </TouchableOpacity>
                        </Col>
                    </Grid>

                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    clientinfo: state.client.clientinfo,
    viewlog: state.client.viewlog,
})

export default connect(mapStateToProps, { getClientInfo, getClientViewLog })(Counter)
