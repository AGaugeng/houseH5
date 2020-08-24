/**
 * 二手房详情
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, Image, TouchableHighlight, TouchableOpacity, View, Linking } from "react-native"
import {
  Container,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Text,
  ListItem,
  Footer,
  DeckSwiper, Card, CardItem,
} from "native-base"
import styles from "./styles"
import { Grid, Col, Row } from "react-native-easy-grid"
import { Map, Marker } from 'react-amap';
import { scaleSize, toDate } from "../../ScreenUtil"
import { getResoldHouseInfo } from '../../../actions/house'
import { addMyCollection, removeMyCollection } from '../../../actions/user'
import { Config, fetchLinking } from '../../../network'
import Toast from '../../../tool/toast'
class Counter extends Component {
  static propTypes = {
    getResoldHouseInfo: PropTypes.func.isRequired,
    addMyCollection: PropTypes.func.isRequired,
    resoldinfo: PropTypes.object.isRequired,
  }
  static defaultProps = {
    resoldinfo: {}

  }
  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state || 0
    this.state = {

      h_id: params.h_id,
      isCollect: false,

    }

  }
  componentWillMount() {
    this.props.getResoldHouseInfo([{
      name: 'h_id', data: this.state.h_id
    }])
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


  }


  toggleTab() {
    const is_my_collection = this.props.resoldinfo.is_my_collection
    setTimeout(() => {
      if (!is_my_collection) {
        this.props.addMyCollection([{ name: 'house_id', data: this.state.h_id }],
          () => {
            this.props.getResoldHouseInfo([{
              name: 'h_id', data: this.state.h_id
            }])
          }
        )
      } else {
        this.props.removeMyCollection([{ name: 'house_id', data: this.state.h_id }],
          () => {
            this.props.getResoldHouseInfo([{
              name: 'h_id', data: this.state.h_id
            }])
          }
        )
      }
    }, 200)

  }
  _getImg(arr, user) {

    let img = []
    if (arr.length > 0) {

      arr.forEach((item, index) => {
        // 如果有孩子
        let file = {}
        file.image = Config.API_URL + '/api/Public/get_file?file=' + item + '&token=' + user.token + '.' + user.uid
        file.name = '房长官'
        file.text = index + 1
        img.push(file);

      })
    } else {
      let file = {}
      file.image = Config.API_URL + '/api/Public/get_file?file=' + arr[0] + '&token=' + user.token + '.' + user.uid
      file.name = '房长官'
      file.text = 1
      img.push(file);
    }
    return img;
  }
  render() {
    const item = this.props.resoldinfo
    const user = this.props.token
    const file = !!item.images ? item.images.split(',') : ''
    const nowTime = new Date() / 1000
    const endTime = new Date(this.props.userinfo.vip_endtime) / 1000
    const invidTime = Math.round(endTime - nowTime)
    return (
      <Container style={styles.container}>

        <Content >
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={this._getImg(file, user)}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem cardBody>

                    <Image style={{ height: 300, flex: 1, marginTop: scaleSize(-8) }} source={item.image} />


                  </CardItem>
                  <CardItem cardBody>

                    <Text style={{
                      color: '#fff',
                      fontSize: 15,
                      position: 'absolute',
                      right: 30,
                      top: -36
                    }}>{item.text + '/' + file.length}</Text>

                  </CardItem>
                </Card>
              }
            />
          </View>
          <View style={{ marginTop: scaleSize(630), flexDirection: "row", flex: 1, justifyContent: 'space-between', padding: 15 }}>
            <Button transparent iconLeft style={{ marginTop: -scaleSize(600) }} onPress={() => {

              this.props.navigation.goBack()
            }
            }>
              <Icon style={{ color: '#d6112d' }} name="arrow-back" />
              <Text style={{
                color: '#d6112d',
                fontWeight: 'bold',
                fontSize: 16
              }}>返回</Text>
            </Button>
          </View>
          <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left style={{ flexDirection: 'row', borderBottomColor: '#fff' }}>
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 16
              }}>{item.title}</Text>
            </Left>
            <Right style={{ borderBottomColor: '#fff' }} />
          </ListItem>
          <Grid style={{ paddingLeft: scaleSize(36) }}>

            <Col >
              <Row>
                <Text style={{
                  color: '#000',
                  fontSize: 18
                }}>售价</Text>
              </Row>
              <Row>
                <Text style={{
                  color: '#d6112d',
                  marginTop: scaleSize(25),
                  fontSize: 14
                }}>{Math.round(item.price * 100 / 10000) / 100 + '万'}</Text>
              </Row>
            </Col>
            <Col style={{ borderLeftColor: '#eee', borderLeftWidth: scaleSize(1), paddingLeft: scaleSize(31) }}>
              <Row>
                <Text style={{
                  color: '#000',
                  fontSize: 18
                }}>房型</Text>
              </Row>
              <Row>
                <Text style={{
                  color: '#d6112d',
                  marginTop: scaleSize(25),
                  fontSize: 14
                }}>{item.room_num}房{item.hall_num}厅</Text>
              </Row>
            </Col>
            <Col style={{ borderLeftColor: '#eee', borderLeftWidth: scaleSize(1), paddingLeft: scaleSize(31) }} >
              <Row>
                <Text style={{
                  color: '#000',
                  fontSize: 18
                }}>建筑面积</Text>
              </Row>
              <Row>
                <Text style={{
                  color: '#d6112d',
                  marginTop: scaleSize(25),
                  fontSize: 14
                }}>{item.area}m²</Text>
              </Row>
            </Col>

          </Grid>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {!!item.tag && item.tag.split(",").map((item, index) =>
              <View style={{ backgroundColor: '#F4F4F4', marginLeft: scaleSize(36), height: scaleSize(36), borderRadius: scaleSize(6), marginTop: scaleSize(54) }}>
                <Text style={{ color: '#6EADFB', fontSize: 14, padding: scaleSize(8), lineHeight: scaleSize(20), alignSelf: 'center' }}>{item}</Text>
              </View>
            )

            }
          </View>
          <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <View style={{
                width: scaleSize(6), height: scaleSize(24),
                backgroundColor: '#84B7FA',
                borderRadius: scaleSize(3),
              }} />
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                marginLeft: scaleSize(14),
                fontSize: 16
              }}>房源信息</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>
          <Grid style={{ paddingLeft: scaleSize(36) }}>

            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>单价：{item.amountm}元/平</Text>
              </Col>
              <Col>
                <Text numberOfLines={1} style={{
                  color: '#666',
                  fontSize: 14,
                  width: scaleSize(320)
                }}>挂牌：{item.time}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>楼层：{item.floor}{!!item.num ? '/' + 18 + '层' : ''}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}>电梯：{item.elevator ? '有' : '无'}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>朝向：{item.direction}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}>年代：{item.construction_time}</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }} >
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>装修：{item.decoration}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}>产权用途：{item.property_use}</Text>
              </Col>
            </Row>

          </Grid>
          <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={() => {
              if (invidTime > 0) {
                this.props.navigation.navigate('HouseDetail', { id: item.id })
              } else {
                Toast.warning("您还不是会员!")
                this.props.navigation.navigate('Member')
              }

            }}

          >
            <Left>
              <View style={{
                width: scaleSize(6), height: scaleSize(24),
                backgroundColor: '#84B7FA',
                borderRadius: scaleSize(3),
              }} />
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                marginLeft: scaleSize(14),
                fontSize: 16
              }}>房源详情</Text>
            </Left>
            <Right style={{ borderBottomColor: '#fff', }}>
              <Text style={{ color: '#e64e37', fontSize: 14 }}>会员查看详情</Text>
              <Icon style={{ fontSize: 18, marginBottom: scaleSize(5) }} name="ios-arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <View style={{
                width: scaleSize(6), height: scaleSize(24),
                backgroundColor: '#84B7FA',
                borderRadius: scaleSize(3),
              }} />
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                marginLeft: scaleSize(14),
                fontSize: 16
              }}>楼盘位置</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>

          <View style={styles.map}>
            <Map amapkey={'86cde10d900c16c31db30941570e84cd'} zoom={15} plugins={this.plugins} center={{ longitude: item.longitude, latitude: item.latitude }} >
              <Marker position={{ longitude: item.longitude, latitude: item.latitude }} />

            </Map>
          </View>

          <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <View style={{
                width: scaleSize(6), height: scaleSize(24),
                backgroundColor: '#84B7FA',
                borderRadius: scaleSize(3),
              }} />
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                marginLeft: scaleSize(14),
                fontSize: 16
              }}>房源介绍</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>
          <Text style={{
            color: '#000',
            marginLeft: scaleSize(36),
            marginBottom: scaleSize(36),
            fontSize: 14
          }}>{item.introduction}</Text>
          <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left>
              <View style={{
                width: scaleSize(6), height: scaleSize(24),
                backgroundColor: '#84B7FA',
                borderRadius: scaleSize(3),
              }} />
              <Text style={{
                color: '#000',
                fontWeight: 'bold',
                marginLeft: scaleSize(14),
                fontSize: 16
              }}>房源动态</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>
          <Grid style={{ paddingLeft: scaleSize(36), marginBottom: scaleSize(140), marginTop: scaleSize(20), }}>

            <Row style={{ alignItems: 'center' }}>
              <Col size={5}>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>看房日期</Text>
              </Col>

              <Col size={4}>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>带看人</Text>
              </Col>
              <Col size={3}>

                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>联系经纪人</Text>

              </Col>
            </Row>

            {typeof item.house_view_log === "object" && item.house_view_log.length > 0 ? item.house_view_log.map((item, index) =>

              < Row style={{ alignItems: 'center' }}>
                <Col size={5}>
                  <Text style={{
                    color: '#000',
                    marginTop: scaleSize(20),
                    fontSize: 14
                  }}>{item.view_time}</Text>
                </Col>
                <Col size={4}>
                  <Text style={{
                    color: '#000',
                    marginTop: scaleSize(20),
                    fontSize: 14
                  }}>{!!item.real_name ? item.real_name : item.username}</Text>
                </Col>
                <Col size={3}>
                  <Button
                    transparent
                    // style={{alignSelf:'center'}}
                    onPress={() => {
                      fetchLinking("tel: " + item.mobile)
                    }}>

                    <img alt='房长官' style={styles.avatar} src={Config.API_URL + '/api/Public/get_user_avatar_img?token=' + user.token + '.' + user.uid + '&uid=' + item.user_id + '&a=' + this.props.counter}></img>
                    <Image source={require("../../../assets/home/dh@3x.png")} resizeMode='cover' style={styles.svg} />

                  </Button>

                </Col>
              </Row>)
              :
              <Col>
                <Text style={{
                  color: '#000',
                  alignSelf: 'center',
                  marginTop: scaleSize(20),
                  fontSize: 14
                }}>没有记录</Text></Col>

            }





          </Grid>

        </Content>
        <View style={{ width: scaleSize(750), height: scaleSize(1), backgroundColor: '#eee' }} />
        <Footer style={{ height: scaleSize(135) }}>
          <Button style={{ marginTop: scaleSize(10), marginRight: scaleSize(60), flexDirection: 'column', backgroundColor: '#fff' }} onPress={() => this.toggleTab()}>

            <Icon style={{ color: '#e64e37', fontSize: 24 }} type="FontAwesome" name={!!item.is_my_collection ? 'star' : 'star-o'} />
            <Text style={{ color: '#999', fontSize: 14 }}>{!!item.is_my_collection ? '已收藏' : '收藏'}</Text>
          </Button>
          <TouchableOpacity transparent
            // onPress={() => this.props.navigation.goBack()}
            onPress={() => {
              fetchLinking("tel: " + item.mobile)
            }}
          >
            <button className='mine' style={{ marginTop: scaleSize(27), flexDirection: 'row', width: scaleSize(482), height: scaleSize(80), borderRadius: scaleSize(40) }}
            >
              <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 14 }}><Icon style={{ color: '#fff', fontSize: 15, marginRight: scaleSize(10) }} type="SimpleLineIcons" name='phone' />联系经纪人</Text>
            </button>

          </TouchableOpacity>
        </Footer>
      </Container >
    );
  }
}

const mapStateToProps = state => ({
  resoldinfo: state.house.resoldinfo,
  token: state.user.token,
  counter: state.counter.counter,
  userinfo: state.user.info,
})

export default connect(mapStateToProps, { getResoldHouseInfo, addMyCollection, removeMyCollection })(Counter)
