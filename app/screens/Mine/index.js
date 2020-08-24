/**
 * 4.我的
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
  Button,
  Icon,
  ListItem,
  List,
  Text,
  Left,
  Right,
  Body
} from "native-base"
import { View, Image } from "react-native"
import { scaleSize, deviceWidth } from "../ScreenUtil"
import styles from "./styles"
import { getUserInfo, getUserLevel } from '../../actions/user'
import { getLocationInfo } from '../../actions/location'
import { Config } from '../../network'
import { wxShare } from '../../actions/wechat'
class Counter extends Component {
  static propTypes = {
    wxShare: PropTypes.func.isRequired,
    getLocationInfo: PropTypes.func.isRequired,
    userinfo: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired
  }
  static defaultProps = {
    userinfo: {},
    location: {},
    token: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      server: [
        {
          title: "会员中心",
          router: "Member",
          svgUrl: require("../../assets/mine/hy@3x.png")
        },
        {
          title: "我的收藏",
          router: "Collection",
          svgUrl: require("../../assets/mine/sc@3x.png")
        },
        {
          title: "合同管理",
          router: "Contract",
          svgUrl: require("../../assets/mine/ml@3x.png")

        },
        {
          title: "交易进度",
          router: "Transaction",
          svgUrl: require("../../assets/mine/jyjd@3x.png")
        },
        {
          title: "客源管理",
          router: "Passenger",
          svgUrl: require("../../assets/mine/kygl@3x.png")
        },
        {
          title: "推荐人管理",
          router: "Referral",
          svgUrl: require("../../assets/mine/tjrgl@3x.png")
        },
        {
          title: "设置",
          router: "Setting",
          svgUrl: require("../../assets/mine/setting.png")
        },

      ],
    }
  }

  server = (item) => {
    return (

      <ListItem underlayColor="transparent" onPress={() => {
        this.props.navigation.navigate(item.router);
      }} style={{ marginBottom: scaleSize(12) }} icon>
        <Left>
          <Image source={item.svgUrl} style={styles.navImg} />
        </Left>
        <Body style={{ borderBottomColor: '#fff' }}>
          <Text style={{ fontSize: 14, color: '#333' }}>{item.title}</Text>
        </Body>
        <Right style={{ borderBottomColor: '#fff' }}>
          {/* <Text>{item.}</Text> */}
          <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
        </Right>
      </ListItem>

    )
  }

  componentDidMount() {
    this.props.getUserLevel()
    this.props.wxShare()
  }

  render() {
    const item = this.props.token
    const user = this.props.userinfo

    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title />
          </Body>
          <Right />
        </Header>
        <ListItem onPress={() => this.props.navigation.navigate("Profile")} icon style={{ marginTop: scaleSize(25), justifyContent: 'space-between' }}>

          <View>
            <Text style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 20
            }}>{user.nickname ? user.nickname : '房长官'}</Text>
            <Left>
              <Text style={{
                color: '#d6112d',
                fontSize: 14
              }}>{`Lv.${user.level}  `}</Text>
              <Text style={{
                color: '#333',
                fontSize: 14
              }}>{user.level_name}</Text>
            </Left>
          </View>
          <Right style={{ borderBottomColor: '#fff' }}>
            {/* <Image source={{ uri: Config.API_URL + '/api/Public/get_user_avatar_img?token=' + this.props.token.token + '.11' }} style={styles.avatar} /> */}
            <img alt='房长官' style={styles.avatar} src={Config.API_URL + '/api/Public/get_user_avatar_img?token=' + item.token + '.' + item.uid + '&a=' + this.props.counter}></img>
          </Right>
        </ListItem>
        <ListItem icon style={{ backgroundColor: '#FFF8DF', marginLeft: scaleSize(20), width: deviceWidth - scaleSize(40), height: scaleSize(206), borderRadius: scaleSize(16), marginTop: scaleSize(60), justifyContent: 'space-between' }}>

          <View style={{ marginLeft: scaleSize(33) }}>
            <Text style={{
              color: '#e64e37',
              fontSize: 15
            }}>余额</Text>
            <Text style={{
              color: '#e64e37',
              fontWeight: 'bold',
              fontSize: 18
            }}>{user.balance}</Text>
          </View>
          <Right style={{ borderBottomColor: '#FFF8DF', alignSelf: 'center' }}>
            <Button onPress={() => {
              this.props.navigation.navigate('WithdrawDetail')
            }} transparent bordered={true} dark={true} style={{ height: scaleSize(60), borderRadius: scaleSize(30) }}><Text style={{ color: '#999', textAlign: 'center', fontSize: 11 }}>去查看</Text>
            </Button>
          </Right>
        </ListItem>
        <Content>
          <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 16
              }}>我的服务</Text>
            </Left>
            <Right style={{ borderBottomColor: '#fff' }} />

          </ListItem>
          <List
            contentContainerStyle={styles.sectionNear}
            dataArray={this.state.server}
            renderRow={this.server}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userinfo: state.user.info,
  location: state.location.location,
  token: state.user.token,
  pay: state.balance.data,
  counter: state.counter.counter

})

export default connect(mapStateToProps, { wxShare, getUserInfo, getLocationInfo, getUserLevel })(Counter)
