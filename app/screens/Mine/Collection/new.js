/*
 * @Author: Song
 * @Date: 2018-10-07 15:43:56
 * @LastEditors: Song
 * @LastEditTime: 2018-12-18 11:01:26
 * @Description: 我的收藏-新房
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, ImageBackground, TouchableOpacity } from "react-native"
import { List, Content, Spinner } from "native-base"
import Collection from "../../Home/houseList"
import styles from "./styles"
import { getNewCollection } from '../../../actions/user'
import { scaleSize } from "../../ScreenUtil";
import { Config } from '../../../network'
import View from '../../../tool/View'
class Counter extends Component {
  static propTypes = {
    getNewCollection: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired,
    token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    collection: [],
    token: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      refreshing: false
    }
  }
  _onEndReached = () => {

    this.setState({ refreshing: true })
    this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.getNewCollection()
    }, 200)
  }
  componentWillMount() {
    this.getNewCollection()

  }
  getNewCollection() {

    this.props.getNewCollection([
      { name: 'type', data: this.props.type },
      { name: 'page', data: this.state.page },
    ], this.state.page, () => this.setState({ refreshing: false }))


  }
  render() {

    return (
      <Content style={styles.section}>
        <View style={{ backgroundColor: '#F4F4F4', width: '100%', height: scaleSize(24) }} />
        {this.props.collection.length === 0 ?
          <View style={styles.nocollet}>
            <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
            <Text style={styles.text}>您还没有收藏噢~！</Text>
          </View>
          : <List
            contentContainerStyle={{ padding: scaleSize(36) }}
            dataArray={this.props.collection}
            renderRow={this.collection}
            keyExtractor={(item, index) => index.toString()}
          />
        }
        {this.state.refreshing ? <Spinner color="#e64e37" /> :
          <TouchableOpacity onPress={
            this._onEndReached
          } >
            <View hcenter mdpb >
              <Text style={{
                color: '#999',
                fontSize: 14
              }}>{this.props.collection.length > 9 ? '点击加载更多...' : ''}</Text>
            </View>
          </TouchableOpacity>
        }
      </Content>
    );
  }
  collection = (item) => {
    const user = this.props.token
    const file = !!item.images ? item.images.split(',')[0] : ''
    return (
      <Collection
        title={item.title}
        houseList={() => {
          this.props.navigation.navigate("NewHouseDetail", item)
        }}
        grade={item.area_min + '-' + item.area_max + 'm²'}
        type={item.elevator === '0' ? '电梯' : ''}
        time={!!item.tag ? item.tag.split(",") : !!item.sales_status ? ['在售'] : ''}
        action={item.action}
        // position={item.price}
        distance={item.amountm + '元/平'}//Math.round()四舍五入
        imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
      />
    );
  };
}

const mapStateToProps = state => ({
  collection: state.user.newcollect,
  token: state.user.token,

})

export default connect(mapStateToProps, { getNewCollection })(Counter)
