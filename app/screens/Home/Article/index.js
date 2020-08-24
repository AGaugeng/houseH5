/**
 * 5.发现
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
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Header, Container, Spinner, Button, Icon, Left, Text, Right, Content, List, Body, Title } from "native-base";
import { getUserArticle } from "../../../actions/user"
import News from './news'
import View from "../../../tool/View"
import {
  setSpText,
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../ScreenUtil"; //自适配大小
import { Config } from '../../../network'
class Counter extends Component {
  static propTypes = {
    getUserArticle: PropTypes.func.isRequired,
    article: PropTypes.array.isRequired,
  }
  static defaultProps = {
    userinfo: {},
    token: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      keyword: '',
      refreshing: false,
      news: [
        { content: '中国创新药大繁荣真相：道阻且长', router: 'ArticleDetail', news: '中国健康报', mount: '56', imgUrl: require('../../../assets/homebg/bg.png') },
        { content: '这些蔬菜真的可以拯救我们的心脏？科学的数据来了', router: 'ArticleDetail', news: '中国健康报', mount: '56', imgUrl: require('../../../assets/homebg/bg.png') },
        { content: '这些蔬菜真的可以拯救我们的心脏？科学的数据来了', router: 'ArticleDetail', news: '中国健康报', mount: '56', imgUrl: require('../../../assets/homebg/bg.png') },
        { content: '这些蔬菜真的可以拯救我们的心脏？科学的数据来了', router: 'ArticleDetail', news: '中国健康报', mount: '56', imgUrl: require('../../../assets/homebg/bg.png') },
        { content: '这些蔬菜真的可以拯救我们的心脏？科学的数据来了', router: 'ArticleDetail', news: '中国健康报', mount: '56', imgUrl: require('../../../assets/homebg/bg.png') },

      ]
    };
  }
  _onEndReached = () => {

    this.setState({ refreshing: true })
    this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.getUserArticle()
    }, 200)
  }
  componentWillMount() {
    this.getUserArticle()
  }
  getUserArticle() {
    this.props.getUserArticle([
      { name: 'page', data: this.state.page },
      { name: 'limit', data: this.state.limit },
      { name: 'keyword', data: this.state.keyword }
    ], this.state.page, () => this.setState({ refreshing: false }))
  }

  doctorList = (item) => {
    const user = this.props.token
    return (
      <News content={item.title} myNews={() => this.props.navigation.navigate('ArticleDetail', { id: item.id })} news={'内容编号：' + item.id} mount={item.add_time} imgUrl={Config.API_URL + '/api/Public/get_file?file=' + item.image + '&token=' + user.token + '.' + user.uid} />
    )
  }
  render() {
  
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#e64e37" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body >
            <Title >资讯列表</Title>
          </Body>
          <Right />
        </Header>
        {/* <RootStack /> */}

        <View style={styles.searchBox}>
          <Icon style={{ color: '#666', fontSize: 24, marginLeft: scaleSize(36) }} type="Ionicons" name="ios-search" />
          <TextInput
            keyboardType="web-search"
            placeholder="搜索资讯标题"
            underlineColorAndroid="transparent"
            style={styles.inputText}
          />
        </View>
        <Content>
          {this.props.article.length > 0 ?
            <List

              dataArray={this.props.article}
              renderRow={this.doctorList}
              keyExtractor={(item, index) => index.toString()}
            /> :
            <View style={styles.nocollet}>
              <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
              <Text style={styles.text}>您还没有文章噢~！</Text>
            </View>
          }
          {this.state.refreshing ? <Spinner color="#e64e37" /> :
            <TouchableOpacity onPress={
              this._onEndReached
            } >
              <View hcenter mdpb >
                <Text style={{
                  color: '#999',
                  fontSize: 14
                }}>{this.props.article.length > 19 ? '点击加载更多...' : ''}</Text>
              </View>
            </TouchableOpacity>
          }

        </Content>
        
      </Container >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    backgroundColor: "#fff"
  },
  searchBox: {
    height: scaleSize(70),
    flexDirection: "row",
    marginTop: scaleSize(36),
    // flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
    borderRadius: scaleSize(20), // 设置圆角边
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    marginLeft: scaleSize(36),
    marginRight: scaleSize(24)
  },
  searchIcon: {
    marginLeft: scaleSize(12),
    marginRight: scaleSize(12),
    width: scaleSize(32),
    height: scaleSize(32),
    resizeMode: "stretch"
  },
  inputText: {
    flex: 1,
    padding: 0,
    // backgroundColor: 'transparent',
    fontSize: 14,
    outline: 0,
    marginLeft: scaleSize(36)
  },
  hospitalList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: deviceWidth * 0.85,
    marginLeft: scaleSize(36),
    paddingBottom: scaleSize(36),
    borderBottomWidth: 1,
    borderColor: "#fcfcfc"
  }
});


const mapStateToProps = state => ({
  article: state.user.article,
  userinfo: state.user.info,
  token: state.user.token,
})

export default connect(mapStateToProps, { getUserArticle })(Counter)


//getUserArticle