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
import { Container, Content } from "native-base"
import { getScheduleRecode } from '../../../actions/house'
import Timeline from "../../Home/HouseDetail/Timeline"
class Counter extends Component {
    static propTypes = {
        getScheduleRecode: PropTypes.func.isRequired,
        // userinfo: PropTypes.object.isRequired,
        // location: PropTypes.object.isRequired,
        schedule: PropTypes.array.isRequired,
    }
    static defaultProps = {
        // userinfo: {},
        // location: {},
        schedule: []
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
        this.props.getScheduleRecode([{
            name: 'house_id', data: this.props.house_id
        }], () => this.props.navigation.goBack())

    }

    /**
     * @msg: 
     * @param {type} 
     * @return: 
     */

    _getArr(arr) {
        let buy = []
        let sell = []
        let array = []
        if (arr.length > 0) {

            arr.forEach(item => {
                // 如果有孩子

                if (item.type === '1') {
                    buy.push(item);

                } else {
                    sell.push(item);
                    // return sell;
                }
            })
        }

        return [...array, buy, sell];
    }
    render() {




        let sell = [

            { time: '1', title: '交房\n等待办理抵押登记,请耐心等待', lineColor: '#D7D7D5', circleColor: '#e64e37' },
            { time: '2', title: '办理抵押登记\n已领新证', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '3', title: '领新政\n已过户', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '4', title: '过户\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '5', title: '申请贷款\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '6', title: '申请退款\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '7', title: '支付订金\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '8', title: '查档\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '9', title: '签约\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },

        ]
        let buy = [

            { time: '1', title: '交房\n等待办理抵押登记,请耐心等待', lineColor: '#D7D7D5', circleColor: '#e64e37' },
            { time: '2', title: '办理抵押登记\n已领新证', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '3', title: '领新政\n已过户', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '4', title: '过户\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '5', title: '申请贷款\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '6', title: '申请退款\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '7', title: '支付订金\n申请贷款已获批', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '8', title: '查档\n贷款已申请', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },
            { time: '9', title: '签约\n已查档', lineColor: '#D7D7D5', circleColor: '#D7D7D5' },

        ]

        const item = (typeof this.props.schedule === "object" && this.props.schedule.length > 0) && this._getArr(this.props.schedule)
        return (
            <Container>
                <Content style={styles.section}>
                    <View style={{ marginTop: 72, alignSelf: 'center' }}>
                        <Timeline
                            // data={this.props.type === 'sell' ? item[0] : item[1]}
                            data={(typeof this.props.schedule === "object" && this.props.schedule.length > 0) ? (this.props.type === 'sell' ? item[0] : item[1]) : ((this.props.type === 'sell' ? sell : buy))}
                        // data={this.props.schedule}
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
    schedule: state.house.schedule,
})

export default connect(mapStateToProps, { getScheduleRecode })(Counter)

