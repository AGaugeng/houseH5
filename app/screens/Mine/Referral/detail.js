/**
 * 2.附近门店
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Card,
    Icon,
    List,
    Left,
    Right,
    Body
} from "native-base"
import { View, Image } from "react-native"
import { Grid, Col, Row } from "react-native-easy-grid"
import { scaleSize, deviceWidth, deviceHeight } from "../../ScreenUtil"
import styles from "./styles";
import { getShareList } from '../../../actions/user'
const none = require("../../../assets/mine/none/none@2x.png")
class Counter extends Component {
    static propTypes = {
        getShareList: PropTypes.func.isRequired,
        userinfo: PropTypes.object.isRequired,
        // location: PropTypes.object.isRequired,
        token: PropTypes.object.isRequired
    }
    static defaultProps = {
        userinfo: {},
        // location: {},
        sharelist: {}
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {

        this.props.getShareList()

    }
    ShareList = (item) => {

        return (
            <Row style={{ marginTop: scaleSize(15), marginBottom: scaleSize(33) }}>
                <Col size={5}>
                    <Text style={{ color: '#666', fontSize: 14 }}>{!!item.mobile && (item.mobile.slice(0, 3) + '*****' + item.mobile.slice(8))}</Text>
                </Col>
                <Col size={4}>
                    <Text style={{ color: '#d6112d', fontSize: 14 }}>+{item.referrer_money}</Text>
                </Col>
                <Col size={3}>
                    <Text style={{ color: '#666', fontSize: 14 }}>{!!item.referrer_time ? item.referrer_time.split(' ')[0] : ''}</Text>
                </Col>
            </Row>
        )
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: "#e64e37" }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontWeight: 'bold' }}>我的推荐</Title>
                    </Body>
                    <Right />
                </Header>

                <Content >
                    <View style={{ width: deviceWidth, backgroundColor: "#e64e37", height: scaleSize(172) }} />
                    <Card style={{ position: 'absolute', top: scaleSize(0), left: scaleSize(36), width: deviceWidth - scaleSize(72), height: scaleSize(274), borderRadius: scaleSize(32) }}>
                        <Text style={{
                            color: '#666',
                            alignSelf: 'center',
                            marginTop: scaleSize(76),
                            fontSize: 14
                        }}>累计奖励金（元）</Text>
                        <Text style={{
                            color: '#000',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginTop: scaleSize(30),
                            fontSize: 32
                        }}>{!!this.props.sharelist.award ? this.props.sharelist.award : '0.00'}</Text>
                    </Card>
                    <Grid style={{ marginLeft: scaleSize(45) }}>
                        <Row style={{ marginTop: scaleSize(150), justifyContent: 'space-around' }}>
                            <Col size={5}>
                                <Text style={styles.title}>推荐用户</Text>
                            </Col>
                            <Col size={4} >
                                <Text style={styles.title}>获取奖金</Text>
                            </Col>
                            <Col size={3}>
                                <Text style={styles.title}>邀请日期</Text>
                            </Col>
                        </Row>
                        {this.props.sharelist.list.length === 0 ?
                            <View style={{ marginTop: deviceHeight / 5, alignSelf: "center", alignItems: 'center' }}>
                                <Image source={none} style={styles.noneImg}></Image>
                                <Text style={{ color: '#999', fontSize: 14 }}>暂无推荐明细</Text>
                            </View>
                            :

                            <List
                                contentContainerStyle={styles.sectionNear}
                                dataArray={this.props.sharelist.list}
                                renderRow={this.ShareList}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </Grid>

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    userinfo: state.user.info,
    // location: state.location.location,
    sharelist: state.user.sharelist,
    // pay: state.balance.data,

})

export default connect(mapStateToProps, { getShareList })(Counter)
