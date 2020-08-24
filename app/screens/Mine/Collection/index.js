/*
 * @Author: Song
 * @Date: 2018-10-06 18:03:18
 * @LastEditors: Song
 * @LastEditTime: 2018-11-19 17:05:08
 * @Description: 我的收藏
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body
} from "native-base"
import Resold from "./resold"
import New from "./new"
import Rental from "./rental"
class Counter extends Component {
  static propTypes = {
    getMyCollection: PropTypes.func.isRequired,
    collection: PropTypes.array.isRequired,
  }
  static defaultProps = {
    collection: []
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Container>
        <Header hasTabs >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#000' }} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>我的收藏</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading="二手房" >
            <Resold type={'secondhand'} navigation={this.props.navigation} />
          </Tab>
          <Tab heading="新房">
            <New type={'newhouse'} navigation={this.props.navigation} />
          </Tab>
          <Tab heading="租房">
            <Rental type={'rentinghouse'} navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
//@string  secondhand/二手 | newhouse/新房 rentinghouse/租房 ###房源类型
const mapStateToProps = state => ({
  // collection: state.user.collection,

})

export default connect(mapStateToProps, {  })(Counter)