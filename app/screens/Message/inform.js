/**
 * 1.就诊记录 -- 全部
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Header, Left, Button, Body, Container, Title, Right, List, Spinner, Icon, Content } from "native-base"
// import styles from "./styles"
import { getMessagesContent, getMessagesData } from '../../actions/message'
import {
    scaleSize,
    deviceWidth,
    deviceHeight,
    toDate
} from "../ScreenUtil"
import styles from "./styles"
class Counter extends Component {
    static propTypes = {
        getMessagesData: PropTypes.func.isRequired,
        getMessagesContent: PropTypes.func.isRequired,
        inform: PropTypes.array.isRequired
    }
    static defaultProps = {
        inform: [],

    }
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 20,
            status: 0,
            refreshing: false
        }
    }
    _onEndReached = (info) => {

        if (this.props.inform.length === 0) {
            this.setState({ refreshing: true })
            this.setState({ page: 1 })
            this.setState({ limit: 20 })
            setTimeout(() => {
                this.getMessagesData()
            }, 200)
        } else {
            this.setState({ refreshing: true })
            this.setState({ page: this.state.page + 1 })
            this.setState({ limit: this.state.limit })
            setTimeout(() => {
                this.getMessagesData()
            }, 200)
        }

    }
    detail = (item) => {
        let obj = JSON.parse(window.atob(item.url))//转成对象
        // console.log(obj)
        return (

            <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                    if (item.status === '0') {
                        this.props.getMessagesContent([{
                            name: 'id', data: item.id
                        }], () => {
                            this.props.navigation.navigate(obj.url, { h_id: obj.house_id })
                            this.getMessagesData()
                        })
                    } else {
                        this.props.navigation.navigate(obj.url, { h_id: obj.house_id })
                    }


                }}
            >

                <Text style={{ alignSelf: 'center', marginTop: scaleSize(36), marginBottom: scaleSize(36) }}>{item.add_time}</Text>
                <View style={styles.pay}>
                    <Image
                        source={require("../../assets/message/noti@3x.png")}
                        style={{ width: scaleSize(80), height: scaleSize(80) }}
                    />
                    <View style={styles.hospital}>
                        <View style={styles.spaceBetween}>
                            <Text style={{
                                color: item.status === '1' ? "#333" : 'orange',
                                fontSize: 14
                            }}>{item.status === '1' ? '已读' : '未读'}</Text>

                        </View>
                        <View style={[styles.spaceBetween, { marginTop: scaleSize(20), width: deviceWidth * 0.6, paddingRight: scaleSize(24) }]}>
                            <Text style={styles.grade} >{item.content}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    componentWillMount() {
        this.getMessagesData()
    }

    // _decode(url) {
    //     window.btoa('{"aaa":"bbb"}');
    //     window.atob("eyJhYWEiOiJiYmIifQ==");
    //     let obj = JSON.parse(window.atob("eyJhYWEiOiJiYmIifQ=="));
    //     let json = JSON.stringify(obj)
    //     console.log(json)
    // }
    getMessagesData() {
        this.props.getMessagesData(
            [
                { name: 'page', data: this.state.page },
                { name: 'limit', data: this.state.limit },
                { name: 'status', data: this.state.status },
            ], this.state.page, () => this.setState({ refreshing: false })
        )
    }
    render() {
        // console.log(this.props.inform)
        return (
            <Container>
                <Header  >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>通知消息</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={styles.paySection}>
                    {this.props.inform.length === 0 ?
                        <View style={styles.nocollet}>
                            <ImageBackground source={require("../../assets/message/noMsg@2x.png")} style={{
                                width: scaleSize(102),
                                height: scaleSize(117),
                                marginTop: deviceHeight / 4,
                                alignSelf: 'center',
                            }} />
                            <Text style={{ alignSelf: 'center', marginTop: scaleSize(36) }}>您还没有消息噢~！</Text>
                        </View>
                        :
                        <View>
                            <List
                                contentContainerStyle={{ marginBottom: scaleSize(36) }}
                                dataArray={this.props.inform}
                                renderRow={this.detail}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            {this.state.refreshing ? <Spinner color="#e64e37" /> :
                                <TouchableOpacity onPress={
                                    this._onEndReached
                                } >
                                    <View style={{ alignSelf: 'center', marginTop: scaleSize(20), marginBottom: scaleSize(40) }}>
                                        <Text style={{
                                            color: this.state.isRental ? '#333' : '#999',

                                            fontSize: 14
                                        }}>点击加载更多...</Text>

                                    </View>
                                </TouchableOpacity>


                            }
                        </View>


                    }
                </Content>
            </Container>

        )
    }

}



const mapStateToProps = state => ({
    inform: state.message.messages,
})

export default connect(mapStateToProps, { getMessagesContent, getMessagesData })(Counter)