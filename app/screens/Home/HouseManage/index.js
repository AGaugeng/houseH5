/**
 * 房源管理
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
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
import All from "./all"
import Penging from "./pending"
import Released from "./released"
import Traded from "./traded"
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
              <Icon style={{color:'#000'}} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#000'}}>房源管理</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading="全部" >
            <All type={1} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="待审核">
            <Penging type={2} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="已发布">
            <Released type={3} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="已成交">
            <Traded type={4} navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
//全部  -  status  = *    release 不填 
//待审核 - status = 0   release  不填
//已发布 - status = *  release = 1 
// 已成交  - status = 10  release =不填
const mapStateToProps = state => ({
  // collection: state.user.collection,

})

export default connect(mapStateToProps, {})(Counter)
