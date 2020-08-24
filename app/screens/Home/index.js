/**
 * 1.首页
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, Image, TouchableOpacity, StatusBar } from "react-native"
import { Container, List, Left, Icon, Right, Spinner, ListItem, Content, Card, Picker, Input, Text } from "native-base"
import { getUserInfo, UpdateLoginState, getUserArticle, getCarouselList } from '../../actions/user'
import { getLocationInfo, getAreaBrother, } from '../../actions/location'
import { searchResoldHouse, searchRentalHouse, searchNewhouse } from '../../actions/house'
import styles from "./styles"
import { scaleSize, deviceWidth } from "../ScreenUtil"
import HouseList from "./houseList"
import { Grid, Col, Row } from "react-native-easy-grid"
import View from "../../tool/View"
import Toast from "../../tool/toast"
import ReactMCarousel from 'react-m-carousel'
import { Config } from '../../network'
const data1 = [
  {
    title: "二手房",
    router: "ResoldHouse",
    imgUrl: require("../../assets/home/esf@3x.png")
  },
  {
    title: "新房",
    router: "NewHouse",
    imgUrl: require("../../assets/home/xf@3x.png")
  },
  {
    title: "租房",
    router: "RentalHouse",
    imgUrl: require("../../assets/home/zf@3x.png")
  },
  {
    title: "录入房源",
    router: "CommissionSale",
    imgUrl: require("../../assets/home/wtcs@3x.png")
  },


]
const data2 = [


  {
    title: "房源管理",
    router: "HouseManage",
    imgUrl: require("../../assets/home/fygl@2x.png")
  },
  {
    title: "客源管理",
    router: "Passenger",
    imgUrl: require("../../assets/home/kygl@2x.png")
  },
  {
    title: "合同管理",
    router: "Contract",
    imgUrl: require("../../assets/home/htgl@2x.png")
  },
  {
    title: "综合信息",
    router: "Attract",
    imgUrl: require("../../assets/home/wtcz@3x.png")
  },

]
class Counter extends Component {
  static propTypes = {
    getCarouselList: PropTypes.func.isRequired,
    getUserArticle: PropTypes.func.isRequired,
    UpdateLoginState: PropTypes.func.isRequired,
    getAreaBrother: PropTypes.func.isRequired,
    getLocationInfo: PropTypes.func.isRequired,
    searchResoldHouse: PropTypes.func.isRequired,
    searchRentalHouse: PropTypes.func.isRequired,
    searchNewhouse: PropTypes.func.isRequired,
    userinfo: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    area: PropTypes.object.isRequired,
    resoldhouse: PropTypes.array.isRequired,
    newhouse: PropTypes.array.isRequired,
    rentalhouse: PropTypes.array.isRequired,
    token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    userinfo: {},
    location: {},
    area: {},
    resoldhouse: [],
    newhouse: [],
    rentalhouse: [],
    token: {},
    islogin: true

  }
  constructor(props) {
    super(props)
    this.state = {
      isNew: false,
      isRental: false,
      isResold: true,
      keyword: '',
      page: 1,
      limit: 20,
      reached: false,
      refreshing: false,
      city: typeof this.props.area.city_name === 'string' ? this.props.area.city_name : '中山市',
      show_city: '',
      _province: '',
      _city: ''
    }

    this._onEndReached = this._onEndReached.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }
  _onEndReached = (info) => {
    if (this.state.isResold) {
      if (this.props.resoldhouse.length === 0) {
        this.setState({ refreshing: true })
        this.setState({ page: 1 })
        this.setState({ limit: 20 })
        setTimeout(() => {
          this.searchResoldHouse()
        }, 200)
      } else {
        this.setState({ refreshing: true })
        this.setState({ page: this.state.page + 1 })
        this.setState({ limit: this.state.limit })
        setTimeout(() => {
          this.searchResoldHouse()
        }, 200)
      }
    } else if (this.state.isRental) {
      if (this.props.rentalhouse.length === 0) {
        this.setState({ refreshing: true })
        this.setState({ page: 1 })
        this.setState({ limit: 20 })
        setTimeout(() => {
          this.searchRentalHouse()
        }, 200)
      } else {
        this.setState({ refreshing: true })
        this.setState({ page: this.state.page + 1 })
        this.setState({ limit: this.state.limit })
        setTimeout(() => {
          this.searchRentalHouse()
        }, 200)
      }
    } else {
      if (this.props.newhouse.length === 0) {
        this.setState({ refreshing: true })
        this.setState({ page: 1 })
        this.setState({ limit: 20 })
        setTimeout(() => {
          this.searchNewhouse()
        }, 200)
      } else {
        this.setState({ refreshing: true })
        this.setState({ page: this.state.page + 1 })
        this.setState({ limit: this.state.limit })
        setTimeout(() => {
          this.searchNewhouse()
        }, 200)
      }
    }
  }
  _onRefresh() {
    this.searchNewhouse()
  }
  nearHouse = (item) => {
    const user = this.props.token
    const file = !!item.images ? item.images.split(',')[0] : ''
    return (
      <HouseList
        title={item.type === 'newhouse' ? item.title : item.title + ' ' + item.decoration + ' ' + item.room_num + '室' + item.hall_num + '厅'}
        houseList={() => {
          if (this.state.isResold) {
            this.props.navigation.navigate("ResoldHouseDetail", { h_id: item.id })
          } else if (this.state.isRental) {
            this.props.navigation.navigate("RentalHouseDetail", { h_id: item.id })
          } else {
            this.props.navigation.navigate("NewHouseDetail", { h_id: item.id })
          }

        }}
        grade={item.type === 'newhouse' ? (item.area_min + '-' + item.area_max + 'm²') : (item.area + '平/' + item.direction + '/' + item.floor)}
        type={item.elevator === '0' ? '电梯' : ''}
        time={!!item.tag ? item.tag.split(",") : !!item.sales_status ? ['在售'] : ''}
        action={item.action}
        position={item.type === "secondhand" ? Math.round(item.price * 100 / 10000) / 100 : ''}
        distance={item.amountm + (item.type === 'rentinghouse' ? '元/月' : '元/平')}//Math.round()四舍五入
        imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
      />
    )
  }
  componentWillMount() {
    this.props.UpdateLoginState(true)
  }
  componentDidMount() {
    this.props.getUserInfo()
    this.props.getCarouselList()
    this.props.getUserArticle([
      { name: 'page', data: 1 },
      { name: 'limit', data: 20 },
      { name: 'keyword', data: '' }
    ])

    this.props.getLocationInfo([
      { name: 'longitude', data: this.props.location.longitude },
      { name: 'latitude', data: this.props.location.latitude }
    ])
    setTimeout(() => {
      const area = this.props.area
      this.props.getAreaBrother([
        { name: 'province', data: !!area.province_name ? area.province_name : '广东省' },
        { name: 'city', data: !!area.city_name ? area.city_name : '中山市' },
        { name: 'town', data: !!area.town_name ? area.town_name : '古镇镇' }
      ])

    }, 200)

    setTimeout(() => {

      if (Object.keys(this.props.area).length === 0) {
        this.props.searchResoldHouse()
        this.props.searchNewhouse()
        this.props.searchRentalHouse()
      } else {
        this.searchResoldHouse()
        this.searchNewhouse()
        this.searchRentalHouse()
      }

    }, 400)
  }

  searchResoldHouse() {
    this.props.searchResoldHouse([
      { name: 'province', data: !!this.state._province ? this.state._province : this.props.area.province_name },
      { name: 'city', data: !!this.state._city ? this.state._city : this.state.city },
      { name: 'town', data: '' },
      { name: 'keyword', data: this.state.keyword },
      { name: 'page', data: this.state.page },
      { name: 'limit', data: this.state.limit },
    ], this.state.page, () => { this.setState({ refreshing: false }) })
  }
  searchNewhouse() {
    this.props.searchNewhouse([
      { name: 'province', data: !!this.state._province ? this.state._province : this.props.area.province_name },
      { name: 'city', data: !!this.state._city ? this.state._city : this.state.city },
      { name: 'town', data: '' },
      { name: 'keyword', data: this.state.keyword },
      { name: 'page', data: this.state.page },
      { name: 'limit', data: this.state.limit },
    ], this.state.page, () => { this.setState({ refreshing: false }) })
  }
  searchRentalHouse() {
    this.props.searchRentalHouse([
      { name: 'province', data: !!this.state._province ? this.state._province : this.props.area.province_name },
      { name: 'city', data: !!this.state._city ? this.state._city : this.state.city },
      { name: 'town', data: '' },
      { name: 'keyword', data: this.state.keyword },
      { name: 'page', data: this.state.page },
      { name: 'limit', data: this.state.limit },
    ], this.state.page, () => { this.setState({ refreshing: false }) })
  }

  _SelectCity() {

    this.props.navigation.navigate('City', {
      callback: (_province, _city, show_city) => {
        this.setState({ _province, _city, show_city })
        setTimeout(() => {
          this.searchResoldHouse()
          this.searchNewhouse()
          this.searchRentalHouse()
        }, 200);
      }

    })

  }
  render() {

    const dataUrl = this.props.carousel
    const dataText = this.props.article

    // console.log(this.state._province, this.state._city, this.state.show_city)
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Content>
          <StatusBar barStyle="light-content" />
          <ReactMCarousel auto={3000} loop={true}>
            {typeof dataUrl === 'object' && dataUrl.length > 0 && dataUrl.map((item, index) =>
              <ImageBackground source={item} style={styles.imageContainer} key={index} />
            )
            }
            {/* <ImageBackground source={require("../../assets/loading/LOGO@2x.png")} style={styles.imageContainer} /> */}
          </ReactMCarousel>

          <Card style={{ position: 'absolute', top: typeof plus === 'object' ? scaleSize(250) : scaleSize(265), left: scaleSize(34), flexDirection: "row", width: deviceWidth - scaleSize(72), height: scaleSize(80), borderRadius: scaleSize(16) }}>
            <View row vcenter>
              <TouchableOpacity onPress={() => this._SelectCity()}>
                {!!this.state.show_city ? <Text style={{ marginLeft: scaleSize(43), color: '#000', fontSize: 14 }}>{this.state.show_city.slice(0, this.state.show_city.indexOf('市'))}</Text> :
                  <Text style={{ marginLeft: scaleSize(43), color: '#000', fontSize: 14 }}>{this.state.city.slice(0, this.state.city.indexOf('市'))}</Text>
                }

              </TouchableOpacity>

              {/* {typeof this.props.areabrother[1] === "object" && this.props.areabrother[1].length > 0 &&
                <Picker
                  mode='dropdown'
                  // supportedOrientations='Portrait'
                  selectedValue={this.state.city}
                  style={{ position: 'absolute', width: scaleSize(150), left: 0, top: 0, opacity: 0 }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ city: itemValue })
                    setTimeout(() => {

                      if (this.state.isNew) {
                        this.searchNewhouse()
                      } else if (this.state.isRental) {
                        this.searchRentalHouse()

                      } else {
                        this.searchResoldHouse()
                      }

                    }, 200)

                  }}>

                  {this.props.areabrother[1].map((item, index) =>
                    <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                  )}
                </Picker>} */}
              {/* <Text style={{ marginLeft: scaleSize(43), color: '#000', fontSize: 14 }}>{this.state.city.slice(0, this.state.city.indexOf('市'))}</Text> */}
              <Icon style={{ color: '#666', marginLeft: scaleSize(10), fontSize: 15 }} type="FontAwesome" name="caret-down" />
            </View>
            <View style={styles.searchBox}>
              <Icon style={{ color: '#666', marginLeft: scaleSize(36), fontSize: 18 }} type="Ionicons" name="ios-search" />
              <Input
                keyboardType="web-search"
                placeholder="搜索您想要的房源"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={keyword => this.setState({ keyword })}
                onBlur={() => {
                  if (this.state.isNew) {
                    this.searchNewhouse()

                  } else if (this.state.isRental) {
                    this.searchRentalHouse()

                  } else {
                    this.searchResoldHouse()

                  }
                }}
              />
            </View>
          </Card>
          <Card style={{ width: deviceWidth - scaleSize(72), height: scaleSize(400), marginLeft: scaleSize(36), marginTop: scaleSize(86), borderRadius: scaleSize(16) }}>
            <Grid >
              <Row style={{ marginTop: scaleSize(33) }}>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center', height: scaleSize(10) }} onPress={() => this.props.navigation.navigate(data1[0].router, { page: this.state.page })}>
                    <Image source={data1[0].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data1[0].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data1[1].router, { page: this.state.page })}>
                    <Image source={data1[1].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data1[1].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data1[2].router, { page: this.state.page })}>
                    <Image source={data1[2].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data1[2].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data1[3].router)}>
                    <Image source={data1[3].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data1[3].title}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row style={{ marginTop: scaleSize(50), marginBottom: scaleSize(50) }}>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data2[0].router)}>
                    <Image source={data2[0].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data2[0].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data2[1].router)}>
                    <Image source={data2[1].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data2[1].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data2[2].router)}>
                    <Image source={data2[2].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data2[2].title}</Text>
                  </TouchableOpacity>
                </Col>
                <Col >
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate(data2[3].router)}>
                    <Image source={data2[3].imgUrl} style={styles.navImg} />
                    <Text style={styles.title}>{data2[3].title}</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </Card>

          {dataText.length > 0 && <View mdpl smpt row vcenter>
            <Icon style={{ color: '#e64e37', fontSize: 15 }} type="FontAwesome" name="volume-up" />
            <ReactMCarousel responsive={6} auto={5000} loop={true}>
              {dataText.length > 0 && dataText.map((item, index) =>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Article')
                }} >
                  <Text style={{
                    color: '#666',
                    fontSize: 12,
                    marginLeft: scaleSize(25)

                  }}>{item.title}</Text>
                </TouchableOpacity>
              )
              }
            </ReactMCarousel>
          </View>}


          <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 16
              }}>热门推荐</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
              <TouchableOpacity onPress={() => this.setState({ isNew: false, isRental: false, isResold: true })}>
                <View hcenter mdpr>
                  <Text style={{
                    color: this.state.isResold ? '#333' : '#999',

                    fontSize: 14
                  }}>二手房</Text>
                  {this.state.isResold && <View style={{ marginTop: scaleSize(5), backgroundColor: '#e64e37', width: scaleSize(34), height: scaleSize(4) }} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isNew: true, isRental: false, isResold: false })}>
                <View hcenter mdpr>
                  <Text style={{
                    color: this.state.isNew ? '#333' : '#999',

                    fontSize: 14
                  }}>新房</Text>
                  {this.state.isNew && <View style={{ marginTop: scaleSize(5), backgroundColor: '#e64e37', width: scaleSize(34), height: scaleSize(4) }} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ isNew: false, isRental: true, isResold: false })}>
                <View hcenter >
                  <Text style={{
                    color: this.state.isRental ? '#333' : '#999',

                    fontSize: 14
                  }}>租房</Text>
                  {this.state.isRental && <View style={{ marginTop: scaleSize(5), backgroundColor: '#e64e37', width: scaleSize(34), height: scaleSize(4) }} />}
                </View>
              </TouchableOpacity>
            </Right>
          </ListItem >

          {(this.state.isNew && this.props.newhouse.length > 0) || (this.state.isResold && this.props.resoldhouse.length > 0) || (this.state.isRental && this.props.rentalhouse.length > 0) ? <List
            contentContainerStyle={styles.sectionNear}
            dataArray={this.state.isResold ? this.props.resoldhouse : this.state.isNew ? this.props.newhouse : this.props.rentalhouse}
            renderRow={this.nearHouse}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          // onEndReached={this._onEndReached}
          // onEndReachedThreshold={0.1}
          /> :
            <View vcenter hcenter xlp>

              <Image
                source={require("../../assets/loading/LOGO@2x.png")}
                style={{ width: scaleSize(180), alignSelf: 'center', height: scaleSize(180) }}
              />
              <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>该地区暂无推荐</Text>
              {/* <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} /> */}

            </View>}
          {this.state.refreshing ? <Spinner color="#e64e37" /> :
            <TouchableOpacity onPress={
              this._onEndReached
            } >
              <View hcenter smpt lgpb >
                {this.state.isNew ?
                  <Text style={{
                    color: '#999',

                    fontSize: 14
                  }}>{this.props.newhouse.length > 19 ? '点击加载更多...' : ''}</Text>
                  : this.state.isRental ?
                    <Text style={{
                      color: '#999',

                      fontSize: 14
                    }}>{this.props.rentalhouse.length > 19 ? '点击加载更多...' : ''}</Text>
                    :
                    <Text style={{
                      color: '#999',

                      fontSize: 14
                    }}>{this.props.resoldhouse.length > 19 ? '点击加载更多...' : ''}</Text>
                }


              </View>
            </TouchableOpacity>


          }
        </Content >
      </Container >
    );
  }
}


const mapStateToProps = state => ({
  article: state.user.article,
  carousel: state.user.carousel,
  userinfo: state.user.info,
  token: state.user.token,
  location: state.location.location,
  area: state.location.area,
  resoldhouse: state.house.resoldhouse,
  rentalhouse: state.house.rentalhouse,
  newhouse: state.house.newhouse,
  areabrother: state.location.areabrother,
  islogin: state.user.islogin
})

export default connect(mapStateToProps, { getCarouselList, getUserArticle, UpdateLoginState, getAreaBrother, getUserInfo, searchRentalHouse, searchNewhouse, searchResoldHouse, getLocationInfo })(Counter)