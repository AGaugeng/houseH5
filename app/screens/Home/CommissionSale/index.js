/**
 * 委托出租
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
  Input,
  ListItem,
  Left,
  Right,
  Form,
  Picker,
  CheckBox,
  Body,
  Text,
  // View
} from "native-base"
import {
  TouchableOpacity,
  TextInput,

} from 'react-native'
import {
  getCommunity, getHouseStruct, getHousePrice, addResoldHouse, getHouseType, UpdateSelectLabel, getHouseOrientation, getHouseAge, getHouseFloor, getHouseArea, getHouseUseRights, getHouseLayout, getHouseLabel, getHouseEquipment,
  UpdateSelectPrice, UpdateSelectType, UpdateSelectOrientation, UpdateSelectArea, UpdateSelectFloor, UpdateSelectAge, UpdateSelectUseRights, UpdateSelectLayout, UpdateSelectEquipment,
} from '../../../actions/house'
import {
  getAreaChildV2,
  getAreaBrother,
  getAreaChild,
  UpdateAreaChildV2,
  UpdateAreaChild,
  UpdateLocation
} from '../../../actions/location'
import styles from "./styles"
import View from "../../View"
import { scaleSize, deviceWidth, deviceHeight } from "../../ScreenUtil"
import { Grid, Col } from "react-native-easy-grid"
import DatePicker from 'react-mobile-datepicker';

import Toast from '../../../tool/toast'
import UploadFile from '../../../tool/uploadFile'
class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
        editable={true}
        maxLength={200}
        placeholder="请输入此房源的介绍说明"
        underlineColorAndroid="transparent"
      />
    )
  }
}

class Counter extends Component {
  static propTypes = {
    getCommunity: PropTypes.func.isRequired,
    getHouseStruct: PropTypes.func.isRequired,
    addResoldHouse: PropTypes.func.isRequired,
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
    getAreaChildV2: PropTypes.func.isRequired,
    getAreaBrother: PropTypes.func.isRequired,
    getAreaChild: PropTypes.func.isRequired,

    UpdateAreaChildV2: PropTypes.func.isRequired,
    UpdateAreaChild: PropTypes.func.isRequired,

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
    newhouse: PropTypes.object.isRequired,
    filecallbacka: PropTypes.array.isRequired,
    filecallbackb: PropTypes.array.isRequired,
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
    struct: [],

    community: [],
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
    newhouse: [],
    filecallback: [],
    areabrother: [],
    areachild: [],
    areachildv2: []

  }

  constructor(props) {
    super(props)

    this.state = {

      type: '',
      // area: '',
      // floor: '',
      orian: '',
      layout: '',
      ev: '',
      money: '',
      // time: '',
      isOpen: false,
      time: '',
      isTrue: false,
      overlayActive: false,
      modalVisible: false,

      title: '',
      province: '',
      city: '',
      town: '',
      address: '',
      longitude: '',
      latitude: '',
      price: '',
      amountm: '',
      area: '',
      floor: '',
      room_num: '0',
      hall_num: '0',
      bathroom_num: '0',
      kitchen_num: '0',
      balcony_num: '0',
      direction: '',
      elevator: '',
      tag: '',
      decoration: '',
      introduction: '',
      construction_time: '',
      owner_name: '',
      owner_mobile: '',
      community: '',
      building: '',
      number: '',
      images: '',
      deposit: '',
      equipment: '',
      count: 0,
      clicked: {},
      currentLocation: '未点击地图',
      newArr: [],
      property_use: '',
      struct: '',
      property_age: '',
      tagArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }

  }
  setTag(i) {
    let tagArr = this.state.tagArr
    tagArr[i] = !this.state.tagArr[i]
    this.setState({ tagArr })
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _SelectMap() {

    this.props.navigation.navigate('CommissionMap', {
      callback: (clicked, address) => {
        this.setState({ clicked, address })
      }
    })

  }

  componentWillMount() {
    this.props.getCommunity()
    this.props.getHouseStruct()
    this.props.getHouseEquipment()
    this.props.getHousePrice()
    this.props.getHouseType()
    this.props.getHouseOrientation()
    this.props.getHouseAge()
    this.props.getHouseFloor()
    this.props.getHouseArea()
    this.props.getHouseUseRights()
    this.props.getHouseLayout()
    this.props.getHouseLabel([{ name: 'type', data: 'secondhand' }], 'secondhand')
    this.props.getAreaBrother([
      { name: 'province', data: '北京市' },
      { name: 'city', data: this.state.city },
      { name: 'town', data: this.props.town }
    ])
  }
  // closeOverlay = () => {
  //   this.setState({ overlayActive: false })
  // }
  // showOverlay = () => {
  //   this.setState({ overlayActive: true })
  // }
  parseTime(d) {
    const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    return newDate;
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    this.setState({ construction_time: this.parseTime(time), isOpen: false });

  }

  addResoldHouse() {
    const { title, province, city, town, address, clicked, price, amountm,
      area, floor, room_num, hall_num, bathroom_num, kitchen_num, balcony_num, direction, elevator, decoration,
      introduction, construction_time, owner_name, owner_mobile, community, building, property_age, struct,
      number, tagArr, property_use } = this.state
    let tag = ''
    tagArr.map((item, index) => {
      if (item === true) {
        tag = tag + this.props.label[index].name + ','
      }
    })
    tag = tag.substring(0, tag.length - 1)
    //  console.log(tag)
    const file_id = this.props.filecallbacka.join(',')
    // console.log(file_id)   
    this.props.addResoldHouse([
      { name: 'title', data: title },
      { name: 'province', data: province },
      { name: 'city', data: city },
      { name: 'town', data: town },
      { name: 'address', data: address },
      { name: 'longitude', data: clicked.N },
      { name: 'latitude', data: clicked.Q },
      { name: 'price', data: price },
      { name: 'amountm', data: amountm },
      { name: 'area', data: area },
      { name: 'floor', data: floor },
      { name: 'room_num', data: room_num },
      { name: 'hall_num', data: hall_num },
      { name: 'bathroom_num', data: bathroom_num },
      { name: 'kitchen_num', data: kitchen_num },
      { name: 'balcony_num', data: balcony_num },
      { name: 'property_age', data: property_age },
      { name: 'housetype_struc', data: struct },
      { name: 'direction', data: direction },
      { name: 'elevator', data: elevator },
      { name: 'tag', data: tag },
      { name: 'decoration', data: decoration },
      { name: 'property_use', data: property_use },
      { name: 'introduction', data: introduction },
      { name: 'construction_time', data: construction_time },
      { name: 'owner_name', data: owner_name },
      { name: 'owner_mobile', data: owner_mobile },
      { name: 'community', data: community },
      { name: 'building', data: building },
      { name: 'number', data: number },
      { name: 'images', data: file_id },
      // { name: 'equipment', data: this.props.equipment[this.props.selectequipment].name },
    ], () => this.props.navigation.goBack(), code => {

      switch (code) {

        case -1:
          Toast.warning("请认真填写!");
          break;
        case -2:
          Toast.warning("请输入标题名称!");
          break;
        case -3:
          Toast.warning("请选择省!");
          break;
        case -4:
          Toast.warning("请选择市!");
          break;
        case -5:
          Toast.warning("请选择区!");
          break;
        case -6:
          Toast.warning("请选择详细地址!");
          break;
        case -7:
          Toast.warning("请选择详细地址!");
          break;
        case -8:
          Toast.warning("请选择详细地址!");
          break;
        case -9:
          Toast.warning("请填写售价!");
          break;
        case -10:
          Toast.warning("请填写多少钱一平米!");
          break;
        case -11:
          Toast.warning("请填写建筑面积!");
          break;
        case -12:
          Toast.warning("请填写楼层!");
          break;
        case -13:
          Toast.warning("请输入栋数!");
          break;
        case -14:
          Toast.warning("房间必须是数字!");
          break;
        case -15:
          Toast.warning("请输入厅的数量!");
          break;
        case -16:
          Toast.warning("请输入厅的数量!");
          break;
        case -17:
          Toast.warning("请选择朝向!");
          break;
        case -18:
          Toast.warning("请选择是否有电梯!");
          break;
        case -19:
          Toast.warning("请输入业主姓名!");
          break;
        case -20:
          Toast.warning("请输入业主电话!");
          break;
        case -21:
          Toast.warning("请选择装修类型!");
          break;
        case -22:
          Toast.warning("请选择产权用途!");
          break;
        case -23:
          Toast.warning("请输入简介!");
          break;
        case -24:
          Toast.warning("请输入楼房的建筑时间!");
          break;
        case -30:
          Toast.warning("只有创建者可以修改记录!");
          break;
        default: Toast.warning("添加失败!");
          break;
      }
    })
  }
  tab = (item) => {

    return (
      <View style={styles.spaceBetween}>
        {/* <Text style={styles.hospitalTitle}>{item.title}</Text> */}
        <View style={{ backgroundColor: item.bgColor, width: scaleSize(152), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(8), }}>
          <Text style={{ color: item.color, fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(64) }}>{item.title}</Text>
        </View>
      </View>
    )
  }

  render() {


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
      }
    }

    return (
      <Container >
        <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#000' }} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>委托出售</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('CommissionRental')}>
              <Text style={{ color: '#000', fontSize: 14 }}>租房</Text>
            </Button>
          </Right>
        </Header>

        <Content style={styles.container}>
          <Form>
            <Grid style={{ padding: scaleSize(35) }}>
              <Col size={5} >
                <Col>
                  <Text>售价/万元</Text>
                  <Input
                    keyboardType="number-pad"
                    placeholder="请填写"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={price => {
                      this.setState({ price })
                    }}
                    placeholderTextColor="#ccc"
                  />
                </Col>

                <Col >
                  <Text>房号</Text>
                  <Input
                    keyboardType="number-pad"
                    placeholder="请填写"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={number => {
                      this.setState({ number })
                    }}
                    placeholderTextColor="#ccc"
                  />
                </Col >
                <Col >
                  <Text>电梯</Text>
                  <View>
                    <Picker
                      selectedValue={this.state.elevator}
                      style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 10, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ elevator: itemValue })}>
                      <Picker.Item label="请选择" value='未选择' />
                      <Picker.Item label="有" value={1} />
                      <Picker.Item label="无" value={0} />
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.elevator ? (this.state.elevator === '1' ? '有' : this.state.elevator === '0' ? '无' : '未选择') : '请选择'}</Text>
                  </View>
                </Col >

                <Col >
                  <Text>产权用途</Text>
                  <View>
                    <Picker
                      selectedValue={this.state.property_use}
                      style={{ position: 'absolute', width: scaleSize(200), right: 30, top: 10, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ property_use: itemValue })}>
                      {[{ name: '请选择', value: '未选择' }, ...this.props.userights].map((item, index) =>
                        <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.property_use ? this.state.property_use : '请选择'}</Text>
                  </View>
                </Col >
                {/* <Col >

            
                </Col > */}

              </Col >
              <Col size={5}>
                <Col>
                  <Text>单价/元</Text>
                  <Input
                    keyboardType="number-pad"
                    placeholder="请填写"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={amountm => {
                      this.setState({ amountm })
                    }}
                    placeholderTextColor="#ccc"
                  />
                </Col>

                <Col>
                  <Text>栋数</Text>
                  <Input
                    keyboardType="web-search"
                    placeholder="请填写"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={building => {
                      this.setState({ building })
                    }}
                    placeholderTextColor="#ccc"
                  />
                </Col>




                <Col >
                  <View>
                    <Text>装修</Text>
                    <Picker
                      selectedValue={this.state.decoration}
                      style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ decoration: itemValue })}>
                      {[{ name: '请选择', value: '未选择' }, ...this.props.housetype].map((item, index) =>
                        <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.decoration ? this.state.decoration : '请选择'}</Text>
                  </View>
                </Col >
                <Col >
                  <View>
                    <Text>户型结构</Text>
                    <Picker
                      selectedValue={this.state.struct}
                      style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ struct: itemValue })}>
                      {[{ name: '请选择', value: '未选择' }, ...this.props.struct].map((item, index) =>
                        <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.struct ? this.state.struct : '请选择'}</Text>
                  </View>
                </Col >
              </Col >
              <Col size={3}>
                <Col >
                  <Text>面积/平米</Text>
                  <Input
                    keyboardType="number-pad"
                    placeholder="请填写"
                    underlineColorAndroid="transparent"
                    style={styles.inputText}
                    onChangeText={area => {
                      this.setState({ area })
                    }}
                    placeholderTextColor="#ccc"
                  />
                </Col >

                <Col >
                  <Text>楼层</Text>
                  <View>
                    <Picker
                      // style={{ width: 100 }}
                      mode="none"
                      selectedValue={this.state.floor}
                      style={{ position: 'absolute', width: scaleSize(200), right: 30, top: 10, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ floor: itemValue })}>
                      {[{ title: '请选择', value: '未选择' }, ...this.props.floor].map((item, index) =>
                        <Picker.Item label={item.title} value={item.value} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.floor ? this.state.floor : '请选择'}</Text>
                  </View>
                </Col >
                <Col >
                  <View>
                    <Text>朝向</Text>
                    <Picker
                      selectedValue={this.state.direction}
                      style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ direction: itemValue })}>

                      {[{ title: '请选择', value: '未选择' }, ...this.props.orientation].map((item, index) =>
                        <Picker.Item label={item.title} value={item.value} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.direction ? this.state.direction : '请选择'}</Text>
                  </View>
                </Col >
                <Col >
                  <View>
                    <Text>小区名称</Text>
                    <Picker
                      selectedValue={this.state.community}
                      style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ community: itemValue })
                      }>

                      {['请选择', ...this.props.community].map((item, index) =>
                        <Picker.Item label={item} value={item} /> //为了重置选择，把{ name: '', id: null }push到最前面
                      )}
                    </Picker>
                    <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.community ? this.state.community : '请选择'}</Text>
                  </View>
                </Col >
              </Col >
            </Grid>
            <View style={styles.bg} />

            <ListItem onPress={
              this.handleClick
            } icon style={{ flexDirection: 'row', marginTop: scaleSize(10), justifyContent: 'space-between', alignItems: 'center' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>建筑时间</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                <DatePicker

                  value={new Date()}
                  dateConfig={dateConfig}
                  isOpen={this.state.isOpen}
                  onSelect={this.handleSelect}
                  onCancel={this.handleCancel} />

                <Text style={{
                  height: 20, width: 100,

                  marginTop: scaleSize(20),
                  // marginBottom: scaleSize(10),
                  color: '#ccc',
                  backgroundColor: '#fff',
                  fontSize: 14
                }}>{!!this.state.construction_time ? this.state.construction_time : '请选择时间'}</Text>
                <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={
              () =>
                // this.setModalVisible(true)
                this._SelectMap()
            } icon style={{ flexDirection: 'row', marginTop: scaleSize(10), justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>选择地址</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                <Text numberOfLines={1} style={{ fontSize: 14 }}>{this.state.address}</Text>
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
                <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!this.state.province ? this.state.province : '选择省'}</Text>
              </View>
              <View>
                <Picker

                  selectedValue={this.state.city}
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
                <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!this.state.city ? this.state.city : '选择市'}</Text>
              </View>
              <View>
                <Picker

                  selectedValue={this.state.town}
                  style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 0, top: 0, opacity: 0 }}
                  onValueChange={(town, itemIndex) => this.setState({ town })}>
                  {[{ name: '选择区', id: null }, ...this.props.areachildv2].map((item, index) =>
                    <Picker.Item label={item.name} value={item.name} />
                  )}


                </Picker>
                <Text style={{ marginRight: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!this.state.town ? this.state.town : '选择区'}</Text>

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

                  selectedValue={this.state.room_num}
                  style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 210, top: 0, opacity: 0 }}
                  onValueChange={(room_num, index) => {
                    this.setState({ room_num })
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
                <Text style={{
                  marginRight: scaleSize(85), color: '#ccc', fontSize: 14
                }}>{this.state.room_num}室</Text>
                <Picker

                  selectedValue={this.state.hall_num}
                  style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 160, top: 0, opacity: 0 }}
                  onValueChange={(hall_num, index) => {
                    this.setState({ hall_num })


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
                <Text style={{
                  marginRight: scaleSize(75), color: '#ccc', fontSize: 14
                }}>{this.state.hall_num}厅</Text>
                <Picker

                  selectedValue={this.state.bathroom_num}
                  style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 110, top: 0, opacity: 0 }}
                  onValueChange={(bathroom_num, itemIndex) => this.setState({ bathroom_num })}>
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
                <Text style={{
                  marginRight: scaleSize(60), color: '#ccc', fontSize: 14
                }}>{this.state.bathroom_num}卫</Text>
                <Picker

                  selectedValue={this.state.kitchen_num}
                  style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 60, top: 0, opacity: 0 }}
                  onValueChange={(kitchen_num, itemIndex) => this.setState({ kitchen_num })}>
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
                <Text style={{
                  marginRight: scaleSize(40), color: '#ccc', fontSize: 14
                }}>{this.state.kitchen_num}厨</Text>
                <Picker

                  selectedValue={this.state.balcony_num}
                  style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 10, top: 0, opacity: 0 }}
                  onValueChange={(balcony_num, itemIndex) => this.setState({ balcony_num })}>
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
                <Text style={{
                  marginRight: scaleSize(30), color: '#ccc', fontSize: 14
                }}>{this.state.balcony_num}阳台</Text>
                <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
              </View>
            </View>
            <View row push mdpl mdpt>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>产权年限</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                <Input
                  keyboardType="web-search"
                  placeholder={"请输入产权年限"}
                  underlineColorAndroid="transparent"
                  style={styles.inputText}
                  onChangeText={property_age => {
                    this.setState({ property_age })
                  }}
                  placeholderTextColor="#ccc"
                />

              </Right>
            </View>
            <View mdpl push row mdpt>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>房源标题</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                <Input
                  keyboardType="web-search"
                  placeholder="请输入标题文字"
                  underlineColorAndroid="transparent"
                  style={styles.inputText}
                  onChangeText={title => {
                    this.setState({ title })
                  }}
                  placeholderTextColor="#ccc"
                />

              </Right>
            </View>
            <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>房源介绍</Text>
              </Left>


            </ListItem>
            <View mdpl mdpr>

              <UselessTextInput
                style={styles.intro}
                multiline={true}
                numberOfLines={4}
                onChangeText={introduction => {
                  this.setState({ introduction, count: introduction.length })
                }}
                value={this.state.text}
              />
            </View>
            <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left />
              <Right style={{ borderBottomColor: '#fff' }}>
                <Text style={{
                  color: '#ccc',
                  fontSize: 14
                }}>{this.state.count}/200</Text>
              </Right>
            </ListItem>
            <View style={styles.bg} />
            <View mdpl style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>业主姓名</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                <Input
                  keyboardType="web-search"
                  placeholder="请输入业主姓名"
                  underlineColorAndroid="transparent"
                  style={styles.inputText}
                  onChangeText={owner_name => {
                    this.setState({ owner_name })
                  }}
                  placeholderTextColor="#ccc"
                />

              </Right>
            </View>
            <View mdpl style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>联系手机</Text>
              </Left>
              <Right style={{ flexDirection: 'row', borderBottomColor: '#fff' }}>
                <Input
                  keyboardType="number-pad"
                  placeholder="请输入业主手机号"
                  underlineColorAndroid="transparent"
                  style={styles.inputText}
                  onChangeText={owner_mobile => {
                    this.setState({ owner_mobile })
                  }}
                  placeholderTextColor="#ccc"
                />

              </Right>
            </View>
            <View style={styles.bg} />

            <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>请选择下面标签</Text>
              </Left>
            </ListItem>
            {this.props.label.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter smpt>
              {this.props.label.map((item, index) =>
                <Button style={{ marginRight: scaleSize(15), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(8), backgroundColor: this.state.tagArr[index] === true ? '#e64e37' : '#f4f4f4', }} key={index}
                  onPress={() =>
                    this.setTag(index)
                  }
                // onPress={() => this.props.UpdateSelectLabel(index)}
                >
                  <Text style={{ color: item.color, fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(64) }}>{item.title ? item.title : item.name}</Text>
                </Button>
              )}
            </View>}
            <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left>
                <Text style={{
                  color: '#000',
                  fontSize: 14
                }}>请上传房源图片/视频</Text>
              </Left>
            </ListItem>
            {/* <TouchableOpacity transparent onPress={this.showOverlay}> */}
            <UploadFile />
            {/* <Image source={require("../../../assets/home/add@3x.png")} style={styles.img} /> */}
            {/* </TouchableOpacity> */}
            <ListItem style={{ borderBottomColor: '#fff' }}>

              <CheckBox checked={this.state.isTrue} onPress={() => this.setState({ isTrue: !this.state.isTrue })} />
              <TouchableOpacity transparent onPress={() => {
                this.props.navigation.navigate('Protocol', { type: 'resold' })
              }}>
                <Text style={{ fontSize: 14, marginLeft: scaleSize(25) }}>同意 <Text style={{ color: '#6EADFB', fontSize: 14 }}>《房长官网络科技有限公司委托协议》</Text></Text>
              </TouchableOpacity>
            </ListItem>

          </Form>

          {this.state.isTrue ?
            <TouchableOpacity transparent onPress={() => this.addResoldHouse()} >
              <button className="mine" style={{ marginTop: scaleSize(115), backgroundColor: '#e64e37', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40), marginBottom: scaleSize(152) }}>
                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>确认发布</Text>
              </button>
            </TouchableOpacity>
            :
            <View style={{ marginTop: scaleSize(115), marginBottom: scaleSize(152), backgroundColor: '#eee', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
              <Text style={{ color: '#e64e37', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>需要确认协议</Text>
            </View>
          }

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location.location,
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
  label: state.house.resoldlabel,
  equipment: state.house.equipment,
  areabrother: state.location.areabrother,
  areachild: state.location.areachild,
  areachildv2: state.location.areachildv2,

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
  filecallbacka: state.house.filecallbacka,
  filecallbackb: state.house.filecallbackb,
  struct: state.house.struct,
  community: state.house.community
})
const mapDispatchToProps = {
  getCommunity,
  getHousePrice,
  getHouseType,
  getHouseStruct,
  getHouseOrientation,
  getHouseAge,
  getHouseFloor,
  getHouseArea,
  getHouseUseRights,
  getHouseLayout,
  getHouseLabel,
  getHouseEquipment,
  getAreaChildV2,
  getAreaBrother,
  getAreaChild,
  addResoldHouse,
  UpdateAreaChildV2,
  UpdateAreaChild,
  UpdateSelectPrice,
  UpdateSelectType,
  UpdateSelectOrientation,
  UpdateSelectArea,
  UpdateSelectFloor,
  UpdateSelectAge,
  UpdateSelectUseRights,
  UpdateSelectLayout,
  UpdateSelectLabel,
  UpdateSelectEquipment,
  UpdateLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)