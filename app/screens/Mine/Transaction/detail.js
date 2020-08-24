import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Title,  Button, Left, Right, Body, Icon, Text, Segment } from 'native-base'

import { connect } from 'react-redux'

import List from './buy'

class Counter extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            state: 1,
            house_id: params.house_id
        }
    }
    render() {
      
        return (
            <Container>
                <Header hasSegment style={{ backgroundColor: '#e64e37' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>交易跟进</Title>
                    </Body>
                    <Right />
                </Header>
                <Segment header>
                    <Button first active={this.state.state === 1} onPress={() => this.setState({ state: 1 })}><Text>业主</Text></Button>
                    <Button last active={this.state.state === 2} onPress={() => this.setState({ state: 2 })}><Text>客户</Text></Button>
                </Segment>
                {this.state.state === 1 && <List type='sell' house_id={this.state.house_id} navigation={this.props.navigation} />}
                {this.state.state === 2 && <List type='buy' house_id={this.state.house_id} navigation={this.props.navigation} />}
            </Container>
        )
    }
}
const mapStateToProps = state => ({

})


export default connect(mapStateToProps, {})(Counter)