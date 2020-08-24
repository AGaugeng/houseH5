/**
 * 新房详情
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, TouchableOpacity } from "react-native"
import {
  Container,
  Content,
  Button,
  Icon,
  Left,
  DeckSwiper,
  Card,
  CardItem,
  Right,
  Text,
  ListItem,
  Footer
} from "native-base"
import styles from "./styles"
// import Timeline from "./Timeline"
import { Grid, Col, Row } from "react-native-easy-grid"
import { Map, Marker } from 'react-amap';
import { scaleSize } from "../../ScreenUtil"
import { getNewHouseInfo } from '../../../actions/house'
import { addMyCollection, removeMyCollection } from '../../../actions/user'
import { Config, fetchLinking } from '../../../network'

class Counter extends Component {
  static propTypes = {
    removeMyCollection: PropTypes.func.isRequired,
    getNewHouseInfo: PropTypes.func.isRequired,
    addMyCollection: PropTypes.func.isRequired,
    newinfo: PropTypes.object.isRequired,

  }
  static defaultProps = {
    newinfo: {}

  }
  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state || 0
    this.state = {
      newhouse: params,
      position: '',
      h_id: params.h_id,
      isCollect: false
    }
  }
  componentWillMount() {
    this.props.getNewHouseInfo([{
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
    const is_my_collection = this.props.newinfo.is_my_collection
    setTimeout(() => {
      if (!is_my_collection) {
        this.props.addMyCollection([{ name: 'house_id', data: this.state.h_id }],
          () => {
            this.props.getNewHouseInfo([{
              name: 'h_id', data: this.state.h_id
            }])
          }
        )
      } else {
        this.props.removeMyCollection([{ name: 'house_id', data: this.state.h_id }],
          () => {
            this.props.getNewHouseInfo([{
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

    // let data = [

    //   { time: '2018-09-29', title: '远洋世家毛坯价23000-28000元/m', lineColor: '#EEEEEE', circleColor: '#EEEEEE' },
    //   { time: '2018-08-28', title: '远洋世家毛坯价23000-28000元/m', lineColor: '#EEEEEE', circleColor: '#EEEEEE' },
    //   { time: '2018-07-27', title: '远洋世家毛坯价23000-28000元/m', lineColor: '#EEEEEE', circleColor: '#EEEEEE' },
    // ]

    const item = this.props.newinfo
    const user = this.props.token
    const file = !!item.images ? item.images.split(',') : ''
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={this._getImg(file, user)}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem cardBody>
                    <Image style={{ height: 300, flex: 1,marginTop:scaleSize(-8) }} source={item.image} />
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
            <Button transparent iconLeft style={{ marginTop: -scaleSize(600) }} onPress={() => this.props.navigation.goBack()}>
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
              }}>
                {item.title}
              </Text>
              <View style={{ backgroundColor: '#F4F4F4', marginLeft: scaleSize(36), borderRadius: scaleSize(6), height: scaleSize(36) }}>
                <Text style={{ color: !!item.sales_status ? '#6EADFB' : '#d6112d', fontSize: 14, padding: scaleSize(8), lineHeight: scaleSize(20), alignSelf: 'center' }}>{!!item.sales_status ? '在售' : '待售'}</Text>
              </View>
            </Left>
            <Right style={{ borderBottomColor: '#fff' }} />
          </ListItem>

          <Grid style={{ paddingLeft: scaleSize(36) }}>
            <Col >
              <Text style={{
                color: '#d6112d',
                fontSize: 14
              }}>{item.amountm}元/平</Text>
            </Col>
            <Col>
              <Text style={{
                color: '#666',
                fontSize: 14
              }}>{item.area_min}-{item.area_max}m²</Text>

            </Col>

          </Grid>
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
              }}>楼盘信息</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>
          <Grid style={{ paddingLeft: scaleSize(36) }}>

            <Row style={{ marginTop: scaleSize(36) }}>
              <Col size={3}>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>{`开  发 商`}：{item.developer}</Text>
              </Col>
              <Col size={1}>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>开盘时间：{item.open_date}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>入住时间：{item.use_date}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }} >
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>产权用途：{item.property_use}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }} >
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>楼盘地址：{item.address}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
          </Grid>
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
              }}>户型介绍</Text>
            </Left>
            <Right style={{ borderBottomColor: '#fff', }}>
              {/* <Text style={{ color: '#e64e37', fontSize: 14 }}>查看全部</Text>
              <Icon style={{ fontSize: 18, marginBottom: scaleSize(5) }} name="ios-arrow-forward" /> */}
            </Right>
          </ListItem>
          <Text style={{
            color: '#000',
            marginLeft: scaleSize(36),
            marginBottom: scaleSize(36),
            fontSize: 14
          }}>{item.introduction}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {typeof item.house_type === "object" && item.house_type.length > 0 && item.house_type.map((item, index) => <View style={{ margin: scaleSize(36) }}>
              <Image source={Config.API_URL + '/api/Public/get_file?file=' + item.image + '&token=' + user.token + '.' + user.uid} resizeMode='cover' style={styles.houseImg} />
              <Text style={{
                marginTop: scaleSize(18),
                color: '#000',
                alignSelf: 'center',
                fontSize: 14
              }}>{item.room_num + '室' + item.hall_num + '厅' + item.bathroom_num + '卫'}</Text>
            </View>
            )}

          </View>
          {/* <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
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
              }}>楼盘动态</Text>
            </Left>
            <Right style={{ borderBottomColor: '#fff', }}>
              <Text style={{ color: '#e64e37', fontSize: 14 }}>查看全部</Text>
              <Icon style={{ fontSize: 18, marginBottom: scaleSize(5) }} name="ios-arrow-forward" />
            </Right>
          </ListItem>
          <View style={{ marginTop: scaleSize(36), alignSelf: 'center' }}>
            <Timeline
              data={data}
            />
          </View> */}
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
          <View style={styles.map} >
            <Map amapkey={'86cde10d900c16c31db30941570e84cd'} zoom={15} center={{ longitude: item.longitude, latitude: item.latitude }} plugins={this.plugins} >
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
              }}>物业信息</Text>
            </Left>
            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>

            </Right>
          </ListItem>
          <Grid style={{ marginBottom: scaleSize(140), paddingLeft: scaleSize(36) }}>

            <Row style={{ marginTop: scaleSize(36) }}>
              <Col size={3}>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>物业费：{item.property_costs}/月</Text>
              </Col>
              <Col size={1}>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>绿化率：{item.greening_rate}%</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            <Row style={{ marginTop: scaleSize(36) }}>
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>车位：{item.parking_num}</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row>
            {/* <Row style={{ marginTop: scaleSize(36) }} >
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>容积率：2.6</Text>
              </Col>
              <Col>
                <Text style={{
                  color: '#666',

                  fontSize: 14
                }}></Text>
              </Col>
            </Row> */}
            <Row style={{ marginTop: scaleSize(36) }} >
              <Col>
                <Text style={{
                  color: '#666',
                  fontSize: 14
                }}>物业公司：{item.property_business}</Text>
              </Col>

            </Row>
          </Grid>


        </Content>
        <View style={{ width: scaleSize(750), height: scaleSize(1), backgroundColor: '#eee' }} />
        <Footer style={{ height: scaleSize(135) }}>
          <Button style={{ marginTop: scaleSize(10), marginRight: scaleSize(60), flexDirection: 'column', backgroundColor: '#fff' }} onPress={() => this.toggleTab()}>
            <Icon style={{ color: '#e64e37', fontSize: 24 }} type="FontAwesome" name={!!item.is_my_collection ? 'star' : 'star-o'} />
            <Text style={{ color: '#999', fontSize: 14 }}>{!!item.is_my_collection ? '已收藏' : '收藏'}</Text>
          </Button>
          <TouchableOpacity transparent onPress={() => {
            fetchLinking("tel: " + item.mobile)
          }}>
            <button className='mine' style={{ marginTop: scaleSize(27), flexDirection: 'row', width: scaleSize(482), height: scaleSize(80), borderRadius: scaleSize(40) }}
            >
              <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 14 }}><Icon style={{ color: '#fff', fontSize: 15, marginRight: scaleSize(10) }} type="SimpleLineIcons" name='phone' />联系经纪人</Text>
            </button>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  newinfo: state.house.newinfo,
  token: state.user.token,
})

export default connect(mapStateToProps, { getNewHouseInfo, removeMyCollection, addMyCollection })(Counter)
