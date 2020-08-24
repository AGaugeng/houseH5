/*
 * @Author: Song
 * @Date: 2018-09-29 16:17:34
 * @LastEditors: Song
 * @LastEditTime: 2019-01-02 16:50:27
 * @Description: 合同管理-出租
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ImageBackground, TouchableOpacity } from "react-native"
import { List, Content, Spinner, Text, Header, Left, Button, Icon, Title, Body, Right } from "native-base"
import Doctor from "./house_list"
import { getHouseContract, getHouseContractList } from '../../../actions/house'
import { deviceWidth, deviceHeight } from "../../ScreenUtil";
import { Config } from '../../../network'
import styles from "./styles"
import View from "../../View"
class Counter extends Component {
  static propTypes = {
    getHouseContract: PropTypes.func.isRequired,
    getHouseContractList: PropTypes.func.isRequired,
    userinfo: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
    rentalcontract: PropTypes.array.isRequired,
    token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    token: {},
    // location: {},
    contract: {},
    rentalcontract: []
  }
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: 20,
      refreshing: false,
      modalVisible: false

    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _onEndReached = () => {

    this.setState({ refreshing: true })
    this.setState({ page: this.state.page + 1 })
    this.setState({ limit: this.state.limit })
    setTimeout(() => {
      this.getHouseContractList()
    }, 200)
  }

  getHouseContractList() {
    this.props.getHouseContractList([
      { name: 'type', data: this.props.type },
      { name: 'page', data: this.state.page + 1 },
      { name: 'limit', data: this.state.limit }
    ], this.props.type, this.state.page, () => {
      this.setState({ refreshing: false })
    })
  }
  componentWillMount() {
    this.getHouseContractList()
  }
  render() {

    return (
      <Content style={styles.section}>
        <Modal
          animationType="slide"
          transparent={true}
          style={{ backgroundColor: '#fff' }}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.mian}>
            <View style={styles.container}>
              <Header style={{ backgroundColor: '#e64e37' }}>
                <Left>
                  <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                    <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Title style={{ color: '#fff' }}>合同详情</Title>
                </Body>
                <Right />
              </Header>
              <Content >
                <View>

                  <Text> <div style={{ width: deviceWidth, height: deviceHeight }} dangerouslySetInnerHTML={{ __html: this.props.contract.content }}></div></Text>
                </View>
              </Content>




            </View>
          </View>
          {/* <MyModal>
            <View style={{ marginTop: 10, paddingLeft: 10 }}>
              <Text>
                0
             </Text>
            </View>
          </MyModal> */}
        </Modal>
        {this.props.contractlist.length === 0 ?
          <View style={styles.nocollet}>
            <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
            <Text style={styles.text}>您还没有合同噢~！</Text>
          </View> :
          <List
            // contentContainerStyle={doctorListStyle.section}
            dataArray={this.props.contractlist}
            renderRow={this.doctorList}
            keyExtractor={(item, index) => index.toString()}
          />}
        {this.state.refreshing ? <Spinner color="#e64e37" /> :
          <TouchableOpacity onPress={
            this._onEndReached
          } >
            <View hcenter mdpt mdpb >
              <Text style={{
                color: '#999',
                fontSize: 14
              }}>{this.props.contractlist.length >= this.state.limit * this.state.page ? '点击加载更多...' : ''}</Text>
            </View>
          </TouchableOpacity>
        }
      </Content>
    );
  }
  doctorList = (item) => {
    const user = this.props.token
    const file = !!item.images ? item.images.split(',')[0] : ''
    return (
      <Doctor
        // title={item.title + ' '+item.decoration}
        title={item.take_time}
        imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
        imgSvg={item.imgSvg}
        myNav={() => {
          this.setModalVisible(true)
          this.props.getHouseContract([
            { name: 'house_id', data: item.id }
          ], () => this.props.navigation.goBack())
        }}
        status={item.status}
        date={item.date}
        name={item.title + ' ' + item.decoration}
        // type={item.type}
        time={item.take_time}
        action1={item.action1}
        position={item.amountm + '元/月'}
        distance={item.broker_real_name}
        action='查看合同'
        grade={item.area + '平/' + item.direction + '/' + item.floor}
        code={'合同编号：' + item.id}
      />
    )
  }
}


const mapStateToProps = state => ({
  token: state.user.token,
  contractlist: state.house.rentalcontract,
  contract: state.house.contract,

})

export default connect(mapStateToProps, { getHouseContract, getHouseContractList })(Counter)
