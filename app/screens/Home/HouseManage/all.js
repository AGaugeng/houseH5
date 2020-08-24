/*
 * @Author: Song
 * @Date: 2018-10-24 15:25:52
 * @LastEditors: Song
 * @LastEditTime: 2018-12-30 12:35:32
 * @Description: IG牛逼
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, TouchableOpacity } from "react-native"
import { List, Content, Text, Spinner } from "native-base"
import Doctor from "./house_list"
import { getHouseManage, modifyRelease } from '../../../actions/user'
import { Config } from '../../../network'
import styles from './styles'
import View from "../../View"
class Counter extends Component {
  static propTypes = {
    getHouseManage: PropTypes.func.isRequired,
    all: PropTypes.array.isRequired,
    // token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    all: [],
    // token: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      refreshing: false
    }
  }

  _onEndReached = () => {

    this.setState({ refreshing: true })
    this.setState({ page: this.state.page + 1 })
    this.setState({ limit: this.state.limit })
    setTimeout(() => {
      this.getHouseManage()
    }, 200)
  }

  getHouseManage() {
    this.props.getHouseManage([
      { name: 'status', data: '*' },
      { name: 'limit', data: this.state.limit },
      { name: 'page', data: this.state.page },
      { name: 'release', data: '' },
    ], this.props.type, this.state.page, () => {
      this.setState({ refreshing: false })
    })
  }
  getManageChange() {
    this.props.getHouseManage([
      { name: 'status', data: '*' },
      { name: 'limit', data: 20 },
      { name: 'page', data: 1 },
      { name: 'release', data: '' },
    ], 1) //all
    this.props.getHouseManage([
      { name: 'status', data: 0 },
      { name: 'limit', data: 20 },
      { name: 'page', data: 1 },
      { name: 'release', data: '' },
    ], 2) //pending
    this.props.getHouseManage([
      { name: 'status', data: '*' },
      { name: 'limit', data: 20 },
      { name: 'page', data: 1 },
      { name: 'release', data: 1 },
    ], 3)  //released
    this.props.getHouseManage([
      { name: 'status', data: 10 },
      { name: 'limit', data: 20 },
      { name: 'page', data: 1 },
      { name: 'release', data: '' },
    ], 4)//traded
  }
  componentDidMount() {

    setTimeout(() => {
      this.getHouseManage()
    }, 200)
  }
  render() {

    return (
      <Content style={styles.section}>
        {this.props.all.length === 0 ?
          <View style={styles.nocollet}>
            <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
            <Text style={styles.text}>您还没有添加房源噢~！</Text>
          </View> :
          <List
            // contentContainerStyle={doctorListStyle.section}
            dataArray={this.props.all}
            renderRow={this.doctorList}
            keyExtractor={(item, index) => index.toString()}
          />

        }
        {this.state.refreshing ? <Spinner color="#e64e37" /> :
          <TouchableOpacity onPress={
            this._onEndReached
          } >
            <View hcenter mdpt mdpb >
              <Text style={{
                color: '#999',
                fontSize: 14
              }}>{this.props.all.length >= this.state.limit * this.state.page ? '点击加载更多...' : ''}</Text>
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
        title={item.type === 'rentinghouse' ? '出租' : '出售'}
        imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
        imgSvg={item.type === 'rentinghouse' ? require("../../../assets/home/cz@3x.png") : require("../../../assets/home/cs@3x.png")}
        // myNav={() =>
        //   this.props.navigation.navigate(item.router)
        // }
        _release={() =>
          this.props.modifyRelease([
            { name: 'house_id', data: item.id },
            { name: 'release', data: item.release === '1' ? 0 : 1 },
          ], () => this.getManageChange())
        }
        _change={() => {
          if (item.status === '10') {
            this.props.navigation.navigate('Contract')
          } else if (item.type === 'rentinghouse') {
            this.props.navigation.navigate('CommissionRentalEdit', { id: item.id })
          } else {
            this.props.navigation.navigate('CommissionSaleEdit', { id: item.id })

          }
        }

        }
        status={item.status === '0' ? '待审核' : item.status === '10' ? '已成交' : item.status === '1' ? '已审核' : item.status === '-2' ? '禁用' : '正在交易'}

        name={item.type === 'newhouse' ? item.title : item.title + ' ' + (!!item.decoration ? item.decoration : '') + ' ' + item.room_num + '室' + item.hall_num + '厅' + item.bathroom_num + '卫'}
        type={item.elevator === '1' ? '电梯' : ''}
        time={!!item.tag ? item.tag.split(",") : !!item.sales_status ? ['在售'] : ''
        }
        action1={item.release === '0' ? '发布' : '取消发布'}
        action2={item.status === '10' ? '查看合同' : '修改'}
        position={item.type === 'rentinghouse' ? '' : Math.round(item.price * 100 / 10000) / 100}
        distance={item.amountm + (item.type === 'rentinghouse' ? '元/月' : '元/平')}//Math.round()四舍五入
        grade={item.type === 'newhouse' ? (item.area_min + '-' + item.area_max + 'm²') : (item.area + '平/' + item.direction + '/' + item.floor)}
      />
    );

  };
}


const mapStateToProps = state => ({
  // collection: state.user.newcollect,
  all: state.user.all,
  token: state.user.token,
})

export default connect(mapStateToProps, { getHouseManage, modifyRelease })(Counter)
