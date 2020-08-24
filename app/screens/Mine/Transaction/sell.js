/**
 * 1.就诊记录 -- 全部
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View } from "react-native"
import {
    Header, Container, Content, Title,
    Button,
    Icon,
    Right,
    Left,
    Body
} from "native-base"
import { getHouseContractList } from '../../../actions/house'
import Timeline from "../../Home/HouseDetail/Timeline"
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
        }
    }
    render() {
        let data = [

            { time: '28\n09月', title: '交房\n等待办理抵押登记,请耐心等待', lineColor: '#D7D7D5', circleColor: '#e64e37' },
            { time: '28\n09月', title: '办理抵押登记\n已领新证', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '领新政\n已过户', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '过户\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '申请贷款\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '申请退款\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '支付订金\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '查档\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '28\n09月', title: '签约\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },

        ]


        return (
            <Container>
                <Header style={{ borderBottomColor: '#f4f4f4', borderBottomWidth: 1 }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>交易跟进</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.section}>
                    <View style={{ marginTop: 72, alignSelf: 'center' }}>
                        <Timeline
                            data={data}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        height: '100%'
    },
});

const mapStateToProps = state => ({
    contractlist: state.house.contractlist,
    token: state.user.token,
    rentalcontract: state.house.rentalcontract,
    sellcontract: state.house.sellcontract,

})

export default connect(mapStateToProps, { getHouseContractList })(Counter)

