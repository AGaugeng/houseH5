/**
 * 2.附近门店
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Card,
  ListItem,
  Input,
  List,
  Left,
  Right,
  Body,
  Icon
} from "native-base"
import { View, Image } from "react-native"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { scaleSize, deviceWidth } from "../ScreenUtil"
import styles from "./styles"
import { Map, Polygon, Marker } from 'react-amap';
import HouseList from "../Home/houseList"
import { UpdateLocation, getNearByRoom } from '../../actions/location'
import { fetchLinking } from '../../network'

import Toast from '../../tool/toast'
class Counter extends Component {
  static propTypes = {
    UpdateAuthType: PropTypes.func.isRequired,
    getNearByRoom: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    nearbyroom: PropTypes.array.isRequired,
  }
  static defaultProps = {
    location: {},
    nearbyroom: []
  }
  constructor(props) {
    super(props)
    this.state = {

      location: {},
      unLoad: false
    }

  }


  componentWillMount() {

    this.plugins = [
      // 'MapType',
      'Scale',
      'OverView',
      'ControlBar', // v1.1.0 新增
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          // onCreated(ins) {

          // },
        },
      }
    ]
    let onComplete = (data) => {

      this.setState({
        location: { longitude: data.position.getLng(), latitude: data.position.getLat() }
      })
      this.props.UpdateLocation(this.state.location)
      this.props.getNearByRoom(
        [
          { name: 'longitude', data: data.position.getLng() },
          { name: 'latitude', data: data.position.getLat() }
        ])
    }
    let onError = () => {
      // Toast.warning("定位失败!")
      this.setState({
        location: { longitude: 113.20600, latitude: 22.62900 }
      })
      this.props.UpdateLocation(this.state.location)


    }
    this.events = {
      created: (instance) => {
        instance.plugin('AMap.Geolocation', function () {
          let geolocation = new this.AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new this.AMap.Pixel(14, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          instance.addControl(geolocation);
          geolocation.getCurrentPosition();
          this.AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
          this.AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
      }
    };

  }

  HouseList = (item) => {
    const user = this.props.token
    const file = !!item.images ? item.images.split(',')[0] : ''
    // console.log(item)
    return (
      <HouseList
        title={item.title}
        houseList={() => {
          // this.props.navigation.navigate("RentalHouseDetail", { h_id: item.id })
        }}
        grade={'距离您'}
        Register={
          () => {
            fetchLinking("tel: " + item.phone)
          }}

        type={parseInt(item.distance) > 1000 ? Math.round(item.distance * 100 / 1000) / 100 + 'km' : Math.round(item.distance) + 'm'} //Math.round(item.price * 100 / 10000) / 100 
        action={'咨询'}
        position1={item.address}
        // distance={item.distance}
        imgUrl={require("../../assets/homebg/bg@3x.png")}
        imgSvg={require("../../assets/dw/dw@2x.png")}
      // imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
      />
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Title style={{ color: '#000', fontWeight: 'bold' }}>附近门店</Title>
            </Button>
          </Left>
          <Body>

          </Body>
          <Right />
        </Header>
        <View style={{ width: deviceWidth, height: scaleSize(60) }} />

        <View style={styles.imageContainer}>

          <Map amapkey={'86cde10d900c16c31db30941570e84cd'} draggable={true} plugins={this.plugins} events={this.events}>
            <Marker />
            <Polygon />
          </Map>
        </View>
        {/* <script type="text/javascript"></script> */}
        <Card style={{ position: 'absolute', top: typeof plus === 'object' ? scaleSize(150) : scaleSize(165), left: scaleSize(36), flexDirection: "row", width: deviceWidth - scaleSize(72), height: scaleSize(80), borderRadius: scaleSize(16) }}>
          <View style={styles.searchBox}>
            <Icon style={{ color: '#666', fontSize: 18 }} type="Ionicons" name="ios-search" />
            <Input
              keyboardType="web-search"
              placeholder="搜索您想要找的房产店铺名"
              underlineColorAndroid="transparent"
              style={styles.inputText}
              onChangeText={keyword => this.setState({ keyword })}
              onBlur={() => {
                this.props.getNearByRoom(
                  [
                    { name: 'longitude', data: this.props.location.longitude },
                    { name: 'latitude', data: this.props.location.latitude },
                    { name: 'title', data: this.state.keyword },
                  ])
              }}
            />
          </View>
        </Card>
        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Left>
            <Text style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16
            }}>附近门店</Text>
          </Left>
          <Right style={{ borderBottomColor: '#fff', }}>
            <Text style={{
              color: '#999',
              marginRight: scaleSize(21),
              fontSize: 14
            }}></Text>
          </Right>
        </ListItem>
        <Content >
          {this.props.nearbyroom.length !== 0 ?
            <List
              contentContainerStyle={styles.sectionNear}
              dataArray={this.props.nearbyroom}
              renderRow={this.HouseList}
              keyExtractor={(item, index) => index.toString()}
            /> :
            <View vcenter hcenter xlp>

              <Image
                source={require("../../assets/loading/LOGO@2x.png")}
                style={{ width: scaleSize(180), alignSelf: 'center', height: scaleSize(180) }}
              />
              <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>没有门店</Text>
              {/* <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} /> */}

            </View>
          }

        </Content>
      </Container>
    );
  }
}

// export default Anatomy;
const mapStateToProps = state => ({
  userinfo: state.user.info,
  token: state.user.token,
  location: state.location.location,
  nearbyroom: state.location.nearbyroom
})

export default connect(mapStateToProps, { UpdateLocation, getNearByRoom })(Counter)