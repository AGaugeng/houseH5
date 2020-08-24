/**
 * 6.个人资料
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity
} from "react-native"
import {
  Header,
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Title,
  Input,
  ListItem,
  List,
  Icon
} from "native-base"
import MyModal from "./middleModal"
import {
  scaleSize,
  deviceWidth,
} from "../../../ScreenUtil"
import { saveUserInfo } from '../../../../actions/user'
import { Config } from '../../../../network'
import { incrementAction } from '../../../../actions/counter'
import Toast from '../../../../tool/toast'
class Counter extends Component {
  static propTypes = {
    saveUserInfo: PropTypes.func.isRequired,
    userinfo: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired,
  }
  static defaultProps = {
    userinfo: {},
    token: {},
  }
  constructor(props) {
    super(props)
    this.state = {
      nickname: this.props.userinfo.nickname ? this.props.userinfo.nickname : '请填写您的昵称',
      changename: '',
      // gender: this.props.userinfo.gender ? this.props.userinfo.gender : '请填写您的性别',
      mobile: this.props.userinfo.mobile ? this.props.userinfo.mobile : '请填写您的手机号码',
      modalVisible: false,
      change: false,
      isGender: false,
      isName: false,
      isAvatar: false,
      isMan: this.props.userinfo.gender === '男' ? true : false,
      path_a: '',
      path_b: '',
      preview_a: null,
      preview_b: null,
      data_a: null,
      data_b: null
    };

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setMan(visible) {
    this.setState({ isMan: visible });
  }
  saveUserInfo() {
    this.props.saveUserInfo([
      { name: 'nickname', data: this.state.nickname },
      { name: 'gender', data: this.state.isMan ? '男' : '女' },
      { name: 'avatar_img', data: this.state.data_a }
    ], () => {
      setTimeout(() => {
        this.props.incrementAction()
      }, 200)
    })
  }
  upload = () => {
    this.saveUserInfo()
    this.setModalVisible(!this.state.modalVisible);
  }
  changePath_a = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    let src, preview, type = file.type;
    if (/^image\/\S+$/.test(type)) {

      src = URL.createObjectURL(file)
      preview = <img width="110px" height="110px" src={src} alt='' />

    }
    this.setState({ path_a: file.name, data_a: file, preview_a: preview })
  }
  render() {

    const item = this.state
    const detail = [
      {
        title: "头像",
        setting: "",
        imgUrl: "",
        avatar: require("../../../../assets/mine/tx2.jpeg")
      },
      {
        title: "昵称",
        setting: this.state.nickname
      },
      {
        title: "性别",
        setting: this.state.isMan ? '男' : '女'
      },

      {
        title: "手机号码",
        setting: this.state.mobile
      }
    ]
    return (
      <Container
        style={{
          backgroundColor: "#fff",
          height: "100%"
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // alert("Modal has been closed.");
          }}
        >
          {this.state.isAvatar ? <MyModal>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);

                }}
              >
                <Icon type="Entypo" name="cross" />
              </TouchableOpacity>
            </View>
            <div style={{ alignSelf: 'center' }}>
              {!item.preview_a &&
                <a href="javascript:;" className="file">
                  <span>{item.path_a ? item.path_a : ''}</span>
                  <input type='file' accept='image/*' onChange={this.changePath_a} />
                </a>
              }
              {item.preview_a}
            </div>
            <button className='primary upload' onClick={this.upload}>确定修改</button>

          </MyModal> :
            this.state.isName ?
              <MyModal>
                <View style={{ marginbTop: scaleSize(50) }}>
                  <TouchableOpacity
                    transparent
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Icon type="Entypo" name="cross" />

                  </TouchableOpacity>
                  <Input
                    keyboardType="web-search"
                    placeholder="请输入昵称"
                    underlineColorAndroid="transparent"
                    style={{ alignSelf: 'center', fontSize: 14, outline: 'none' }}
                    autoFocus={true}
                    onChangeText={changename => {
                      this.setState({ changename })
                    }}
                  />
                  {/* </TouchableOpacity> */}
                </View>
                <View style={{ alignSelf: 'center' }}>

                  <TouchableOpacity
                    transparent
                    onPress={() => {
                      this.setState({ nickname: this.state.changename })
                      this.setModalVisible(!this.state.modalVisible)
                    }}
                  >
                    <button className='primary upload' >确定修改</button>
                  </TouchableOpacity>
                </View>
              </MyModal>
              :
              <MyModal>
                <TouchableOpacity
                  transparent
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon type="Entypo" name="cross" />

                </TouchableOpacity>
                <List style={{ marginTop: scaleSize(50) }}>
                  <ListItem selected={this.state.isMan} onPress={() => {
                    this.setMan(true)
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                    <Left>
                      <Text>男</Text>
                    </Left>
                    <Right>
                      {this.state.isMan ? <Icon name="check" type="Entypo" />
                        : <Icon style={{ color: '#fff' }} name="check" type="Entypo" />
                      }
                    </Right>
                  </ListItem>
                  <ListItem selected={!this.state.isMan} onPress={() => {
                    this.setMan(false)
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                  >
                    <Left>
                      <Text>女</Text>
                    </Left>
                    <Right>
                      {!this.state.isMan ? <Icon name="check" type="Entypo" />
                        : <Icon style={{ color: '#fff' }} name="check" type="Entypo" />
                      }
                    </Right>
                  </ListItem>

                </List>
              </MyModal>

          }
        </Modal>


        <Header style={{ backgroundColor: "#e64e37" }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>个人资料</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content style={{ backgroundColor: '#f4f4f4' }}>
          <List
            contentContainerStyle={{ backgroundColor: '#fff', marginTop: scaleSize(45) }}
            dataArray={detail}
            renderRow={this.detail}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* < Button transparent onPress={() => this.saveUserInfo()}>
            <Text style={{ color: '#fff' }}>保存</Text>
          </Button> */}

          {(this.state.nickname !== this.props.userinfo.nickname || (this.state.isMan ? '男' : '女') !== this.props.userinfo.gender) &&
            <TouchableOpacity transparent onPress={() => {
              if (!!this.state.nickname) {
                this.saveUserInfo()
              } else {
                Toast.warning("昵称不能为空!")
              }

            }} >
              <button className="mine" style={{ width: scaleSize(377), marginTop: scaleSize(105), marginBottom: scaleSize(46), marginLeft: deviceWidth / 2 - scaleSize(377) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
                <Text style={{ color: '#fff', fontSize: 14 }}>保存</Text>
              </button>
            </TouchableOpacity>
          }
        </Content>
      </Container >
    );
  }
  detail = item => {

    const user = this.props.token
    return (
      <View>


        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => {
            switch (item.title) {
              case "头像":

                this.setState({ modalVisible: true, isAvatar: true, isGender: false, isName: false });
                break;
              case "昵称":
                this.setState({ modalVisible: true, isAvatar: false, isGender: false, isName: true });
                break;
              case "性别":
                this.setState({ modalVisible: true, isAvatar: false, isGender: true, isName: false });
                break;
              case "手机号码":
                ;
                break;
              default: ;
            }
          }}
        >
          <View style={[styles.sign, { marginBottom: item.title === '头像' ? scaleSize(18) : 0, marginTop: item.title === '头像' ? scaleSize(18) : scaleSize(36), borderBottomColor: (item.title === '头像' || item.title === '手机号码') ? '#fff' : "#eff3f6" }]} >
            {
              item.avatar ? <View>
                <Text style={styles.tx}>{item.title}</Text>
              </View> :
                <View>
                  <Text style={styles.welcome}>{item.title}</Text>
                </View>
            }

            {item.avatar ? (

              <img alt='房长官' style={{ width: scaleSize(110), height: scaleSize(110), borderRadius: '50%', }}
                src={Config.API_URL + '/api/Public/get_user_avatar_img?token=' + user.token + '.' + user.uid + '&a=' + this.props.counter}>
              </img>

            ) : (
                // </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: scaleSize(36)
                  }}
                >
                  <Text style={styles.core}>{item.setting}</Text>
                  {item.title !== '手机号码' && <Icon style={{ fontSize: 20, color: '#ccc' }} name="ios-arrow-forward" />}
                </View>
              )}
          </View>
        </TouchableOpacity >
        {item.title === '头像' && < View style={{ width: deviceWidth, height: scaleSize(36), backgroundColor: '#f4f4f4' }} />}
      </View>
    );
  };
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 14,
    color: "#333"
  },
  tx: {
    fontSize: 14,
    color: "#333",
    marginTop: scaleSize(40)
  },
  core: {
    fontSize: 11,
    color: "#cecece",
    paddingRight: scaleSize(30)
  },
  sign: {
    flexDirection: "row",
    marginTop: scaleSize(36),
    width: deviceWidth * 0.9,
    marginLeft: scaleSize(36),
    justifyContent: "space-between",
    borderBottomWidth: scaleSize(2)
  }
});

const mapStateToProps = state => ({
  userinfo: state.user.info,
  location: state.location.location,
  area: state.location.area,
  token: state.user.token,
  counter: state.counter.counter
})

export default connect(mapStateToProps, { saveUserInfo, incrementAction })(Counter)
