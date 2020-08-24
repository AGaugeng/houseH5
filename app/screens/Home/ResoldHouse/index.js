/**
 * 二手房
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
  Content,
  Left,
  Icon,
  List,
  Button,
  Right,
  ListItem,
  Input,
  Spinner,
  Text
} from "native-base"
import { Image, TouchableOpacity, Modal } from "react-native"
import styles from "./styles"
import View from "../../../tool/View"
import { scaleSize, deviceHeight, deviceWidth, } from "../../ScreenUtil"
import HouseList from "../houseList"
import MyModal from "../selectModal"
import { Grid, Col } from "react-native-easy-grid"
import {
  searchResoldHouse, getHousePrice, getHouseType, getHouseOrientation, getHouseAge, getHouseFloor, getHouseArea, getHouseUseRights, getHouseLayout, getHouseLabel, getHouseEquipment,
  UpdateSelectPrice, UpdateSelectType, UpdateSelectOrientation, UpdateSelectArea, UpdateSelectFloor, UpdateSelectAge, UpdateSelectUseRights, UpdateSelectLayout, UpdateSelectLabel, UpdateSelectEquipment
} from '../../../actions/house'
import { getAreaBrother, getAreaChild, getAreaChildV2, UpdateAreaChild, UpdateAreaChildV2 } from '../../../actions/location'
import { Config } from '../../../network'
import Toast from '../../../tool/toast'
class Counter extends Component {
  static propTypes = {
    getAreaBrother: PropTypes.func.isRequired,
    searchResoldHouse: PropTypes.func.isRequired,
    getHousePrice: PropTypes.func.isRequired,
    getHouseType: PropTypes.func.isRequired,
    getHouseOrientation: PropTypes.func.isRequired,
    getHouseAge: PropTypes.func.isRequired,
    getHouseFloor: PropTypes.func.isRequired,
    getHouseArea: PropTypes.func.isRequired,
    getHouseUseRights: PropTypes.func.isRequired,
    getHouseLayout: PropTypes.func.isRequired,
    getHouseLabel: PropTypes.func.isRequired,
    getHouseEquipment: PropTypes.func.isRequired,

    getSelectPrice: PropTypes.func.isRequired,
    getSelectType: PropTypes.func.isRequired,
    getSelectOrientation: PropTypes.func.isRequired,
    getSelectAge: PropTypes.func.isRequired,
    getSelectFloor: PropTypes.func.isRequired,
    getSelectArea: PropTypes.func.isRequired,
    getSelectUseRights: PropTypes.func.isRequired,
    getSelectLayout: PropTypes.func.isRequired,
    getSelectLabel: PropTypes.func.isRequired,
    getSelectEquipment: PropTypes.func.isRequired,

    price: PropTypes.array.isRequired,
    housetype: PropTypes.array.isRequired,
    orientation: PropTypes.array.isRequired,
    acreage: PropTypes.array.isRequired,
    floor: PropTypes.array.isRequired,
    age: PropTypes.array.isRequired,
    userights: PropTypes.array.isRequired,
    layout: PropTypes.array.isRequired,
    label: PropTypes.array.isRequired,
    equipment: PropTypes.array.isRequired,
    //select
    selectprice: PropTypes.number.isRequired,
    selecthousetype: PropTypes.number.isRequired,
    selectorientation: PropTypes.number.isRequired,
    selectacreage: PropTypes.number.isRequired,
    selectfloor: PropTypes.number.isRequired,
    selectage: PropTypes.number.isRequired,
    selectuserights: PropTypes.number.isRequired,
    selectlayout: PropTypes.number.isRequired,
    selectlabel: PropTypes.number.isRequired,
    selectequipment: PropTypes.number.isRequired,

    userinfo: PropTypes.array.isRequired,
    location: PropTypes.array.isRequired,
    area: PropTypes.object.isRequired,
    resoldhouse: PropTypes.array.isRequired,
  }
  static defaultProps = {
    userinfo: {},
    location: {},
    area: {},
    price: [],
    housetype: [],
    orientation: [],
    acreage: [],
    floor: [],
    age: [],
    userights: [],
    layout: [],
    label: [],
    equipment: [],

    selectprice: [],
    selecthousetype: [],
    selectorientation: [],
    selectacreage: [],
    selectfloor: [],
    selectage: [],
    selectuserights: [],
    selectlayout: [],
    selectlabel: [],
    selectequipment: [],
    resoldhouse: []
  }
  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state || 1

    this.state = {
      modalVisible: false,
      isArea: false,
      isPrice: false,
      isType: false,
      isMore: false,
      isActive: 1,
      keyword: '',
      page: params.page,
      limit: 20,
      reached: false,
      refreshing: false,
      city: '',
      town: ''
    }
    this._onEndReached = this._onEndReached.bind(this)
    // this._onRefresh = this._onRefresh.bind(this)
  }
  _onEndReached = () => {

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

  }

  searchResoldHouse() {
    let oldLen = this.props.resoldhouse.length
    this.props.searchResoldHouse([
      { name: 'province', data: this.props.area.province_name },
      { name: 'city', data: this.state.city },
      { name: 'town', data: this.state.town },
      { name: 'keyword', data: this.state.keyword },
      { name: 'page', data: this.state.page },
      { name: 'limit', data: this.state.limit },
    ], this.state.page, () => {
      let newLen = this.props.resoldhouse.length
      if (oldLen === newLen) {
        Toast.warning("没有更多的房源了!")
        this.setState({ refreshing: false })
      } else {
        this.setState({ refreshing: false })
      }
    })
  }

  componentWillMount() {
    this.props.getHouseEquipment()
    this.props.getHousePrice()
    this.props.getHouseType()
    this.props.getHouseOrientation()
    this.props.getHouseAge()
    this.props.getHouseFloor()
    this.props.getHouseArea()
    this.props.getHouseUseRights()
    this.props.getHouseLayout()
    setTimeout(() => {
      const area = this.props.area
      this.props.getAreaBrother([
        { name: 'province', data: !!area.province_name ? area.province_name : '北京市' },
        { name: 'city', data: !!area.city_name ? area.city_name : '市辖区' },
        { name: 'town', data: !!area.town_name ? area.town_name : '东城区' }
      ])

    }, 200)
    // this.props.getHouseLabel([{ name: 'type', data: 'secondhand' }])
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  HouseList = (item) => {
    const user = this.props.token
    const file = !!item.images ? item.images.split(',')[0] : ''
    return (

      <HouseList
        title={item.title + ' ' + item.decoration + ' ' + item.room_num + '室' + item.hall_num + '厅'}
        houseList={() => {
          this.props.navigation.navigate("ResoldHouseDetail", { h_id: item.id })
        }}
        grade={item.area + '平/' + item.direction + '/' + item.floor}
        type={item.elevator === '0' ? '电梯' : ''}
        time={!!item.tag ? item.tag.split(",") : ''}
        action={item.action}
        position={Math.round(item.price * 100 / 10000) / 100}
        distance={item.amountm + (item.type === 'rentinghouse' ? '元/月' : '元/平')}//Math.round()四舍五入
        imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
      />
    )
  }
  tab = (item) => {
    return (
      <View style={{ width: deviceWidth / 5 }}>
        {/* <Text style={styles.hospitalTitle}>{item.title}</Text> */}
        <Button transparent onPress={() => this.props.UpdateSelectPrice(item.id)} small info={this.props.selectprice === item.id} style={{ backgroundColor: '#f4f4f4', width: scaleSize(200), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(30) }}>
          <Text style={{ color: '#000', width: scaleSize(300), fontSize: 12, lineHeight: scaleSize(64) }}>{item.title ? item.title : item.name}</Text>
        </Button>
      </View>
    )
  }

  render() {
    const address = this.props.areabrother
    return (
      <Container style={styles.container}>
        <Header style={{ marginTop: typeof plus === 'object' ? scaleSize(56) : scaleSize(18), height: scaleSize(80) }}>
          {/* <View > */}
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={{ color: '#333' }} name="ios-arrow-back" />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <Icon style={{ color: '#666', fontSize: 24, marginLeft: scaleSize(36) }} type="Ionicons" name="ios-search" />
            <Input
              keyboardType="web-search"
              placeholder="搜索您想要的房源"
              underlineColorAndroid="transparent"
              style={styles.inputText}
              onChangeText={keyword => this.setState({ keyword })}
              onBlur={() => {
                this.props.searchResoldHouse([
                  { name: 'keyword', data: this.state.keyword },
                  { name: 'page', data: this.state.page },
                  { name: 'limit', data: this.state.limit },
                ])
              }}
            />
          </View>
          <TouchableOpacity
            underlayColor="transparent"
          >
            <Icon style={{ paddingTop: scaleSize(10), color: '#eee', fontSize: 18 }} type="FontAwesome" name="commenting" />
          </TouchableOpacity>
          {/* </View> */}
        </Header>
        <ListItem last icon style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(2), justifyContent: 'space-around' }}>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => { this.setState({ modalVisible: true, isArea: true, isPrice: false, isMore: false, isType: false }) }}
          >
            <Left >
              <Text style={{
                marginRight: scaleSize(10),
                color: '#666',
                fontSize: 14
              }}>区域</Text>
              <Icon style={{ color: '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
            </Left>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => { this.setState({ modalVisible: true, isArea: false, isPrice: true, isMore: false, isType: false }) }}
          >
            <Left>
              <Text style={{
                color: '#666',
                marginRight: scaleSize(10),
                fontSize: 14
              }}>价格</Text>
              <Icon style={{ color: '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
            </Left>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => { this.setState({ modalVisible: true, isArea: false, isPrice: false, isMore: false, isType: true }) }}
          >
            <Left>
              <Text style={{
                color: '#666',
                marginRight: scaleSize(10),
                fontSize: 14
              }}>房型</Text>
              <Icon style={{ color: '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
            </Left>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => { this.setState({ modalVisible: true, isArea: false, isPrice: false, isMore: true, isType: false }) }}
          >
            <Left>
              <Text style={{
                color: '#666',
                marginRight: scaleSize(10),
                fontSize: 14
              }}>更多</Text>
              <Icon style={{ color: '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
            </Left>
          </TouchableOpacity>
        </ListItem>
        <Content>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <MyModal HEIGHT={this.state.isArea ? deviceHeight : this.state.isPrice ? deviceHeight / 2 : this.state.isType ? deviceHeight / 2 : deviceHeight * 1.1}>
              <Header style={{ marginTop: typeof plus === 'object' ? scaleSize(55) : scaleSize(16), borderBottomColor: '#fff', backgroundColor: '#fff', height: scaleSize(81), paddingTop: scaleSize(0) }}>
                {/* <View > */}
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Icon style={{ color: '#333' }} name="ios-arrow-back" />
                </TouchableOpacity>

                <View style={styles.searchBox}>
                  <Icon style={{ color: '#666', fontSize: 24, marginLeft: scaleSize(36) }} type="Ionicons" name="ios-search" />
                  <Input
                    keyboardType="web-search"
                    placeholder="搜索您想要的房源"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={keyword => this.setState({ keyword })}
                    onBlur={() => {
                      this.props.searchResoldHouse([
                        { name: 'keyword', data: this.state.keyword },
                        { name: 'page', data: this.state.page },
                        { name: 'limit', data: this.state.limit },
                      ])
                    }}
                  />
                </View>
                <TouchableOpacity
                  underlayColor="transparent"
                >
                  <Icon style={{ paddingTop: scaleSize(10), color: '#eee', fontSize: 18 }} type="FontAwesome" name="commenting" />
                </TouchableOpacity>
                {/* </View> */}
              </Header>
              <ListItem last icon style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(2), justifyContent: 'space-around' }}>
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => { this.setState({ isArea: true, isPrice: false, isMore: false, isType: false }) }}
                >
                  <Left >
                    <Text style={{
                      marginRight: scaleSize(10),
                      color: this.state.isArea ? '#e64e37' : '#666',
                      fontSize: 14
                    }}>区域</Text>
                    <Icon style={{ color: this.state.isArea ? '#e64e37' : '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />

                  </Left>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => { this.setState({ isArea: false, isPrice: true, isMore: false, isType: false }) }}
                >
                  <Left >
                    <Text style={{
                      color: this.state.isPrice ? '#e64e37' : '#666',
                      marginRight: scaleSize(10),
                      fontSize: 14
                    }}>价格</Text>
                    <Icon style={{ color: this.state.isPrice ? '#e64e37' : '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
                  </Left>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => { this.setState({ isArea: false, isPrice: false, isMore: false, isType: true }) }}
                >
                  <Left>
                    <Text style={{
                      color: this.state.isType ? '#e64e37' : '#666',
                      marginRight: scaleSize(10),
                      fontSize: 14
                    }}>房型</Text>
                    <Icon style={{ color: this.state.isType ? '#e64e37' : '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
                  </Left>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => { this.setState({ isArea: false, isPrice: false, isMore: true, isType: false }) }}
                >
                  <Left>
                    <Text style={{
                      color: this.state.isMore ? '#e64e37' : '#666',
                      marginRight: scaleSize(10),
                      fontSize: 14
                    }}>更多</Text>
                    <Icon style={{ color: this.state.isMore ? '#e64e37' : '#666', fontSize: 15 }} type="FontAwesome" name="caret-down" />
                  </Left>
                </TouchableOpacity>
              </ListItem>
              {this.state.isArea ?
                // <View vcenter hcenter xlp>

                //   <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} />
                //   <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>{address.province_name + address.city_name + address.town_name}</Text>
                // </View>
                <Grid >
                  <Col style={{ backgroundColor: '#f4f4f4' }}>
                    <TouchableOpacity onPress={() => {
                      this.props.searchResoldHouse()
                      this.setModalVisible(!this.state.modalVisible)
                    }}>
                      <View style={{ backgroundColor: '#fff', marginTop: scaleSize(3) }}>
                        <Text style={{ paddingLeft: scaleSize(36), color: '#000', fontSize: 14, marginTop: scaleSize(30) }}>不限</Text>
                      </View>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{ width: scaleSize(300), flexDirection: 'row', flexWrap: 'wrap', }}>

                    {address[1].map((item, index) =>

                      < TouchableOpacity style={{}}
                        onPress={() => {
                          this.setState({ city: item.name, })
                          this.props.getAreaChildV2([{ name: 'id', data: item.id }])
                          setTimeout(() => {
                            this.searchResoldHouse()
                          }, 200)
                        }}>
                        <Text style={{ paddingLeft: scaleSize(36), color: (item.name === this.state.city) ? '#e64e37' : '#000', fontSize: 14, marginTop: scaleSize(30) }}>{item.name}</Text>
                      </TouchableOpacity>

                    )}

                  </Col>
                  {this.props.areachildv2.length > 0 && <Col style={{ width: scaleSize(300), flexDirection: 'row', flexWrap: 'wrap', }}>
                    {this.props.areachildv2.map((item, index) =>
                      <TouchableOpacity style={{ flexWrap: 'wrap' }}
                        onPress={() => {
                          this.setState({ town: item.name })
                          setTimeout(() => {
                            this.searchResoldHouse()
                          }, 200)
                          this.setModalVisible(!this.state.modalVisible)
                        }}>
                        <Text style={{ paddingLeft: scaleSize(36), color: '#000', fontSize: 14, marginTop: scaleSize(30) }}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  </Col>}
                </Grid>
                :
                this.state.isPrice ?
                  <View>
                    {this.props.price.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter mdpt>
                      {this.props.price.map((item, index) =>
                        <Button small key={index} style={{ margin: scaleSize(10), backgroundColor: this.props.selectprice === index ? '#e64e37' : '#f4f4f4' }}
                          onPress={() => this.props.UpdateSelectPrice(index)}
                        >
                          <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                        </Button>
                      )}
                    </View>}
                    <Grid style={{ alignSelf: 'center', marginTop: scaleSize(50) }}>

                      <Col>
                        <Button style={{ justifyContent: 'center', marginRight: scaleSize(33), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#F4F4F4' }}
                          onPress={() => {
                            this.props.searchResoldHouse()
                            this.setModalVisible(!this.state.modalVisible)
                          }}>

                          <Text style={{ color: '#999' }}>不限</Text>
                        </Button>
                      </Col>
                      <Col>
                        <Button style={{ justifyContent: 'center', marginLeft: scaleSize(34), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#e64e37' }}
                          onPress={() => {
                            this.props.searchResoldHouse([
                              { name: 'price', data: this.props.price[this.props.selectprice].min + ',' + this.props.price[this.props.selectprice].max },
                              { name: 'page', data: this.state.page },
                              { name: 'limit', data: this.state.limit },

                            ])
                            this.setModalVisible(!this.state.modalVisible)
                          }}>

                          <Text style={{ color: '#fff' }}>确认</Text>
                        </Button>
                      </Col>

                    </Grid>
                  </View>
                  : this.state.isType ?
                    <View>
                      {/* <List
                        contentContainerStyle={styles.tab}
                        dataArray={this.props.layout}
                        renderRow={this.tab}
                        keyExtractor={(item, index) => index.toString()}
                      /> */}
                      {this.props.layout.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter lgpt>
                        {this.props.layout.map((item, index) =>
                          <Button small key={index} style={{ margin: scaleSize(10), backgroundColor: this.props.selectlayout === index ? '#e64e37' : '#f4f4f4' }}
                            onPress={() => this.props.UpdateSelectLayout(index)}
                          >
                            <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                          </Button>
                        )}
                      </View>}
                      <Grid style={{ alignSelf: 'center', marginTop: scaleSize(80) }}>

                        <Col>
                          <Button style={{ justifyContent: 'center', marginRight: scaleSize(33), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#F4F4F4' }}
                            onPress={() => {
                              this.props.searchResoldHouse()
                              this.setModalVisible(!this.state.modalVisible)
                            }}>

                            <Text style={{ color: '#999' }}>不限</Text>
                          </Button>
                        </Col>
                        <Col>
                          <Button style={{ justifyContent: 'center', marginLeft: scaleSize(34), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#e64e37' }}
                            onPress={() => {

                              this.props.searchResoldHouse([
                                { name: 'room_num', data: this.props.layout[this.props.selectlayout].room_num },
                                { name: 'page', data: this.state.page },
                                { name: 'limit', data: this.state.limit },
                              ])
                              this.setModalVisible(!this.state.modalVisible)
                            }}>

                            <Text style={{ color: '#fff' }}>确认</Text>
                          </Button>
                        </Col>

                      </Grid>
                    </View> :
                    <View>
                      <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                          <Text style={{
                            color: '#000',
                            marginLeft: scaleSize(14),
                            fontSize: 16
                          }}>建筑面积</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                      </ListItem>
                      {/* <List
                        contentContainerStyle={styles.tab}
                        dataArray={this.props.acreage}
                        renderRow={this.tab}
                        keyExtractor={(item, index) => index.toString()}
                      /> */}
                      {this.props.acreage.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter >
                        {this.props.acreage.map((item, index) =>
                          <Button small key={index} style={{ margin: scaleSize(10), backgroundColor: this.props.selectacreage === index ? '#e64e37' : '#f4f4f4' }}
                            onPress={() => this.props.UpdateSelectArea(index)}
                          >
                            <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                          </Button>
                        )}
                      </View>}
                      <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                          <Text style={{
                            color: '#000',
                            marginLeft: scaleSize(14),
                            fontSize: 16
                          }}>朝向</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                      </ListItem>
                      {/* <List
                        contentContainerStyle={styles.tab}
                        dataArray={this.props.orientation}
                        renderRow={this.tab}
                        keyExtractor={(item, index) => index.toString()}
                      /> */}
                      {this.props.orientation.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter >
                        {this.props.orientation.map((item, index) =>
                          <Button small key={index} style={{ margin: scaleSize(10), backgroundColor: this.props.selectorientation === index ? '#e64e37' : '#f4f4f4' }}
                            onPress={() => this.props.UpdateSelectOrientation(index)}
                          >
                            <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                          </Button>
                        )}
                      </View>}
                      <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                          <Text style={{
                            color: '#000',

                            marginLeft: scaleSize(14),
                            fontSize: 16
                          }}>楼层</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                      </ListItem>
                      {/* <List
                        contentContainerStyle={styles.tab}
                        dataArray={this.props.floor}
                        renderRow={this.tab}
                        keyExtractor={(item, index) => index.toString()}
                      /> */}
                      {this.props.floor.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter >
                        {this.props.floor.map((item, index) =>
                          <Button small key={index} style={{ margin: scaleSize(10), backgroundColor: this.props.selectfloor === index ? '#e64e37' : '#f4f4f4' }}
                            onPress={() => this.props.UpdateSelectFloor(index)}
                          >
                            <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                          </Button>
                        )}
                      </View>}
                      <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                          <Text style={{
                            color: '#000',
                            marginLeft: scaleSize(14),
                            fontSize: 16
                          }}>装修</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

                        </Right>
                      </ListItem>
                      {/* <List
                        contentContainerStyle={styles.tab}
                        dataArray={this.props.housetype}
                        renderRow={this.tab}
                        keyExtractor={(item, index) => index.toString()}
                      /> */}
                      {this.props.housetype.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter >
                        {this.props.housetype.map((item, index) =>
                          <Button small key={index} style={{ margin: scaleSize(20), backgroundColor: this.props.selecthousetype === index ? '#e64e37' : '#f4f4f4' }}
                            onPress={() => this.props.UpdateSelectType(index)}
                          >
                            <Text style={{ color: '#000', fontSize: 12 }}>{item.title ? item.title : item.name}</Text>
                          </Button>
                        )}
                      </View>}
                      <Grid style={{ alignSelf: 'center', marginTop: scaleSize(40) }}>

                        <Col>
                          <Button style={{ justifyContent: 'center', marginRight: scaleSize(33), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#F4F4F4' }}
                            onPress={() => {
                              this.props.searchResoldHouse()
                              this.setModalVisible(!this.state.modalVisible)
                            }}>

                            <Text style={{ color: '#999' }}>清空</Text>
                          </Button>
                        </Col>
                        <Col>
                          <Button style={{ justifyContent: 'center', marginLeft: scaleSize(34), width: scaleSize(306), height: scaleSize(80), borderRadius: scaleSize(40), backgroundColor: '#e64e37' }}
                            onPress={() => {

                              this.props.searchResoldHouse([
                                { name: 'area', data: this.props.acreage[this.props.selectacreage].min + ',' + this.props.acreage[this.props.selectacreage].max },
                                { name: 'direction', data: this.props.orientation[this.props.selectorientation].value },
                                { name: 'floor', data: this.props.floor[this.props.selectfloor].value },
                                { name: 'decoration', data: this.props.housetype[this.props.selecthousetype].name },
                                { name: 'page', data: this.state.page },
                                { name: 'limit', data: this.state.limit },

                              ])
                              this.setModalVisible(!this.state.modalVisible)
                            }}>

                            <Text style={{ color: '#fff' }}>确认</Text>
                          </Button>
                        </Col>

                      </Grid>
                    </View>

              }
            </MyModal>
          </Modal>
          {this.props.resoldhouse.length === 0 ?
            <View vcenter hcenter xlp>

              <Image
                source={require("../../../assets/loading/LOGO@2x.png")}
                style={{ width: scaleSize(180), alignSelf: 'center', height: scaleSize(180) }}
              />
              <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>未搜索到房源</Text>
              {/* <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} /> */}

            </View> :
            <List
              contentContainerStyle={styles.sectionNear}
              dataArray={this.props.resoldhouse}
              renderRow={this.HouseList}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              keyExtractor={(item, index) => index.toString()}
            />

          }
          {this.state.refreshing ? <Spinner color="#e64e37" /> :
            <TouchableOpacity onPress={
              this._onEndReached
            } >
              <View hcenter smpt lgpb >
                <Text style={{
                  color: '#999',

                  fontSize: 14
                }}>{this.props.resoldhouse.length > 19 ? '点击加载更多...' : ''}</Text>

              </View>
            </TouchableOpacity>


          }
        </Content>
      </Container >
    );
  }
}


const mapStateToProps = state => ({
  // userinfo: state.user.info,
  token: state.user.token,
  area: state.location.area,
  house: state.house,
  price: state.house.price,
  housetype: state.house.housetype,
  orientation: state.house.orientation,
  acreage: state.house.acreage,
  floor: state.house.floor,
  age: state.house.age,
  userights: state.house.userights,
  layout: state.house.layout,
  label: state.house.label,
  equipment: state.house.equipment,

  selectprice: state.house.selectprice,
  selecthousetype: state.house.selecthousetype,
  selectorientation: state.house.selectorientation,
  selectacreage: state.house.selectacreage,
  selectfloor: state.house.selectfloor,
  selectage: state.house.selectage,
  selectuserights: state.house.selectuserights,
  selectlayout: state.house.selectlayout,
  selectlabel: state.house.selectlabel,
  selectequipment: state.house.selectequipment,
  resoldhouse: state.house.resoldhouse,
  areabrother: state.location.areabrother,
  areachildv2: state.location.areachildv2,
})

export default connect(mapStateToProps, {
  searchResoldHouse, getAreaBrother,
  getAreaChild, getAreaChildV2, UpdateAreaChild, UpdateAreaChildV2,
  getHousePrice, getHouseType, getHouseOrientation, getHouseAge, getHouseFloor, getHouseArea, getHouseUseRights, getHouseLayout, getHouseLabel, getHouseEquipment,
  UpdateSelectPrice, UpdateSelectType, UpdateSelectOrientation, UpdateSelectArea, UpdateSelectFloor, UpdateSelectAge, UpdateSelectUseRights, UpdateSelectLayout, UpdateSelectLabel, UpdateSelectEquipment
})(Counter)
