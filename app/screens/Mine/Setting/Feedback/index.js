/**
 * 4.意见反馈
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
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import {
  Header,
  Container,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Title
} from "native-base"
import {
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../../ScreenUtil"
import { addOpinion } from '../../../../actions/user'
class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
        editable={true}
        maxLength={200}
        placeholder="请输入您的宝贵意见"
        underlineColorAndroid="transparent"
      />
    )
  }
}
class Counter extends Component {
  static propTypes = {
    addOpinion: PropTypes.func.isRequired,
  }
  static defaultProps = {

  }
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }
  addOpinion() {
    this.props.addOpinion([
      { name: 'content', data: this.state.content }
    ], () => this.props.navigation.goBack())
  }
  render() {

    return (
      <Container
        style={{
          backgroundColor: "#fff",
          height: deviceHeight
        }}
      >
        <Header style={{ backgroundColor: "#e64e37" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>意见反馈</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.hospitalList}>
            <View style={styles.doctor}>
              <Text style={styles.title}>问题意见</Text>
            </View>
            <View style={styles.content}>
              <UselessTextInput
                style={styles.inputText}
                multiline={true}
                numberOfLines={4}
                onChangeText={content => this.setState({ content })}
                value={this.state.text}
              />
            </View>
          </View>
          {/* <View style={styles.hospitalList}>
            <View style={styles.doctor}>
              <Text style={styles.title}>添加图片</Text>
            </View>
            <View style={styles.content1}>
              <Image
                source={require("../../../../assets/home/add@3x.png")}
                style={{
                  width: deviceWidth * 0.2,
                  height: deviceWidth * 0.2,
                  alignContent: "center",
                  // marginTop: scaleSize(28)
                }}
              />
            </View>
          </View> */}
          <View style={styles.hospitalList}>
            <TouchableOpacity transparent onPress={() => this.addOpinion()}>
              <button className="mine" style={{
                borderRadius: scaleSize(60),
                width: deviceWidth * 0.6,
                alignSelf: 'center',
                height: scaleSize(80),
                marginTop: scaleSize(100)
              }}>
                <Text style={styles.login}>提交</Text>
              </button>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  hospitalList: {
    marginTop: scaleSize(36),
    marginLeft: scaleSize(36),
    paddingBottom: scaleSize(36),
  },
  bgColor: {
    borderRadius: scaleSize(60),
    width: deviceWidth * 0.6,
    backgroundColor: "#e64e37",
    marginLeft: scaleSize(120),
    marginTop: scaleSize(100)
  },
  title: {
    fontSize: 15,
    color: "#000",
    lineHeight: scaleSize(40)
  },

  content: {
    width: deviceWidth - scaleSize(72),
    marginTop: scaleSize(40),
    borderRadius: scaleSize(20),
    backgroundColor: "#eff3f6"
  },
  content1: {
    marginTop: scaleSize(40),
    borderRadius: scaleSize(4),
    width: deviceWidth * 0.2,
    height: deviceWidth * 0.2,
    borderWidth: scaleSize(2),
    alignItems: "center",
    // alignContent:'center',
    borderColor: "#eff3f6"
  },
  doctor: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: scaleSize(8),
    borderLeftColor: "#62b9fd",
    paddingLeft: scaleSize(24),
    width: deviceWidth * 0.85
  },
  inputText: {
    height: deviceHeight * 0.2,
    // backgroundColor: 'transparent',
    fontSize: 14,
    textAlignVertical: "top",
    padding: 0,
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
    marginTop: scaleSize(20)
  },
  login: {
    color: "#fff",
    textAlign: "center",
  }
});
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { addOpinion })(Counter)
