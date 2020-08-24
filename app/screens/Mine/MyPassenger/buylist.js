/**
 * 1.客源管理 -- 求购
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ListView, Modal, TouchableOpacity, Image } from "react-native"
import {
  Content,
  Thumbnail,
  List,
  ListItem,
  Container,
  Text,
  Icon,
  Input,
  Left,
  Right,
  Body
} from "native-base"
import { getMyClientSell, UpdateMyClientSell, delClientInfo } from '../../../actions/client'
import styles from "./styles"
import { scaleSize, deviceWidth } from "../../ScreenUtil"
import MyModal from "../Passenger/middleModal"
import Toast from '../../../tool/toast'
class Counter extends Component {

  static propTypes = {
    delClientInfo: PropTypes.func.isRequired,
    UpdateMyClientSell: PropTypes.func.isRequired,
    getMyClientSell: PropTypes.func.isRequired,
    myselllist: PropTypes.array.isRequired,
  }
  static defaultProps = {
    selllist: []
  }
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      page: 1,
      keyword: '',
      modalVisible: false,
      rowId: ''
    }
  }
  componentWillMount() {
    this.getMyClientSell()
  }

  getMyClientSell() {
    this.props.getMyClientSell([
      { name: 'page', data: this.state.page },
      { name: 'keyword', data: this.state.keyword },
      { name: 'purpose_type', data: this.props.type }
    ])
  }
  delClientInfo(client_id) {
    this.props.delClientInfo([
      { name: 'client_id', data: client_id },
    ], () => { this.getMyClientSell() })
  }


  lastPage() {
    if (this.state.page === 1) {
      Toast.warning("已经是第一页了!")
      setTimeout(() => {
        this.getMyClientSell()
      }, 200)
    } else {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.getMyClientSell()
      }, 200)

    }


  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.getMyClientSell()
    }, 200)
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  deleteRow(rowId) {
    this.delClientInfo(this.props.selllist[parseInt(rowId)].id)

  }
  delete(secId, rowId, rowMap) {
    this.setState({ modalVisible: true, rowId })
  }
  render() {


    return (
      <Container>
        <View style={{ backgroundColor: '#F4F4F4', width: deviceWidth, height: scaleSize(120) }}>
          <View style={{ marginLeft: scaleSize(40), marginTop: scaleSize(20), backgroundColor: '#fff', flexDirection: "row", width: deviceWidth - deviceWidth * 0.096, height: scaleSize(80), borderRadius: scaleSize(16) }}>
            <View style={styles.searchBox}>
              <Icon style={{ color: '#666', fontSize: 18, marginLeft: scaleSize(16) }} type="Ionicons" name="ios-search" />
              <Input
                keyboardType="web-search"
                placeholder="搜索您要找客源关键字"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={keyword => this.setState({ keyword })}
                onBlur={() => this.getMyClientSell()}
              />
            </View>
          </View>
        </View>
        <Content style={styles.section}>
          {typeof this.props.selllist === "object" && this.props.selllist.length > 0 ?
            <View>
              <List
                style={{ marginLeft: scaleSize(36) }}
                dataSource={this.ds.cloneWithRows(this.props.selllist)}
                renderRow={(data, secId, rowId, rowMap) =>
                  <ListItem thumbnail onPress={() =>
                    this.props.navigation.navigate('PassengerDetail', { type: this.props.type, isEdit: true, client_id: data.id })}
                    onLongPress={_ => this.delete(secId, rowId, rowMap)}>
                    <Left>
                      <Thumbnail square size={55} source={data.gender === '先生' ? require("../../../assets/mine/passenger/man@3x.png") : require("../../../assets/mine/passenger/woman@3x.png")} />
                    </Left>
                    <Body style={{ borderBottomColor: "#fff" }}>
                      <Text numberOfLines={1} style={{ fontSize: 14 }}>{data.name + data.gender}</Text>
                      <Text numberOfLines={1} note>
                        {data.mobile}
                      </Text>
                    </Body>
                    <Right style={{ borderBottomColor: "#fff", marginLeft: scaleSize(36), width: scaleSize(350) }}>
                      <Text numberOfLines={1} note>{(data.purpose_type === 'sell' ? '求购' : '求租') + data.purpose_city + data.purpose_town + '/' + data.purpose_room_num + '室' + data.purpose_hall_num + '厅' + data.purpose_bathroom_num + '卫'}</Text>
                    </Right>
                  </ListItem>}
                renderLeftHiddenRow={() => { }}
                renderRightHiddenRow={() => { }}
              // leftOpenValue={75}
              // rightOpenValue={-75}
              />

            </View>
            :
            <View style={{ alignSelf: 'center', marginTop: scaleSize(200) }} >
              <Text note>没有客源，请去添加吧~！</Text>
            </View>
          }


          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <MyModal>
              <View>
                <TouchableOpacity
                  transparent
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon type="Entypo" name="cross" />
                  {/* <Text></Text> */}
                </TouchableOpacity>
              </View>
              <View style={{ alignSelf: 'center' }}>

                <TouchableOpacity
                  transparent
                  onPress={() => {
                    this.deleteRow(this.state.rowId)
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                >
                  <button className='primary upload' >确定删除</button>
                </TouchableOpacity>
              </View>
            </MyModal>
          </Modal>
        </Content >
        <View
          style={{
            width: scaleSize(100),
            height: scaleSize(100),
            marginLeft: deviceWidth / 2 - scaleSize(100) / 2,
          }}
        >
          <TouchableOpacity underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('PassengerAdd', { type: this.props.type })}>
            <Image style={styles.addImg} source={require("../../../assets/mine/passenger/add@3x.png")}></Image>
          </TouchableOpacity>
        </View>
        <div className='row' style={{ alignSelf: 'center', marginBottom: scaleSize(30) }}>
          {this.state.page > 1 && <button className='mine' style={{ width: scaleSize(180), marginTop: scaleSize(30), height: scaleSize(60), borderRadius: scaleSize(6) }} onClick={() => this.lastPage()}><Text style={{ color: '#fff', fontSize: 14 }}>上一页</Text> </button>}
          {this.state.page > 1 && this.props.selllist.length > 9 && <div style={{ width: scaleSize(180), marginTop: scaleSize(30), height: scaleSize(60), borderRadius: scaleSize(6) }} ></div>}
          {typeof this.props.selllist === "object" && this.props.selllist.length > 9 && <button className='mine' style={{ width: scaleSize(180), marginTop: scaleSize(30), height: scaleSize(60), borderRadius: scaleSize(6) }} onClick={() => this.nextPage()}><Text style={{ color: '#fff', fontSize: 14 }}>下一页</Text></button>}
        </div>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  selllist: state.client.myselllist,

})

export default connect(mapStateToProps, { delClientInfo, getMyClientSell, UpdateMyClientSell })(Counter)
