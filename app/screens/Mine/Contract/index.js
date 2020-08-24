/**
 * 合同管理
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
import Sell from "./sell"
import Rental from "./rental"
import { getHouseContractList } from '../../../actions/house'
class Counter extends Component {
  static propTypes = {
    getHouseContractList: PropTypes.func.isRequired,
    // userinfo: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    contractlist: PropTypes.array.isRequired,
  }
  static defaultProps = {
    // userinfo: {},
    // location: {},
    // token: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      contractlist: []
    }
  }
  componentWillMount() {
    this.props.getHouseContractList([
      { name: 'type', data: 'rentinghouse' },
      { name: 'page', data: 1 },
      { name: 'limit', data: 20 }
    ])
    this.props.getHouseContractList([
      { name: 'type', data: 'secondhand' },
      { name: 'page', data: 1 },
      { name: 'limit', data: 20 }
    ])
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
            <Title style={{ color: '#000' }}>合同管理</Title>
          </Body>
          <Right />
        </Header>

        <Tabs>
          <Tab heading="出售" >
            <Sell type='secondhand' navigation={this.props.navigation} />
          </Tab>
          <Tab heading="出租">
            <Rental type='rentinghouse' navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  contractlist: state.house.contractlist,


})

export default connect(mapStateToProps, { getHouseContractList })(Counter)

