/*
 * @Author: Song
 * @Date: 2018-10-06 18:03:18
 * @LastEditors: Song
 * @LastEditTime: 2018-12-27 20:10:24
 * @Description: 交易进度
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, TouchableOpacity } from "react-native"
import {
    Header, Container, List, Content, Title, Spinner,
    Button,
    Icon,
    Right,
    Left,
    Body,
    Text
} from "native-base"
import Doctor from "../Contract/house_list"
import { getHouseContractList, getScheduleRecode } from '../../../actions/house'
import { Config } from '../../../network'
import styles from "./styles"
import View from "../../View"
class Counter extends Component {
    static propTypes = {
        getHouseContractList: PropTypes.func.isRequired,
        getScheduleRecode: PropTypes.func.isRequired,
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
            page: 1,
            limit: 10,
            refreshing: false,
        }
    }
    _onEndReached = () => {

        this.setState({ refreshing: true })
        this.setState({ page: this.state.page + 1 })
        this.setState({ limit: this.state.limit })
        setTimeout(() => {
            this.getHouseContractList()
        }, 200)
    }

    getHouseContractList() {

        this.props.getHouseContractList([
            { name: 'type', data: 'secondhand' },
            { name: 'page', data: this.state.page },
            { name: 'limit', data: this.state.limit }
        ], 'secondhand', this.state.page, () => {
            this.setState({ refreshing: false })
        })
        this.props.getHouseContractList([
            { name: 'type', data: 'rentinghouse' },
            { name: 'page', data: this.state.page },
            { name: 'limit', data: this.state.limit }
        ], 'rentinghouse', this.state.page, () => {
            this.setState({ refreshing: false })
        })
    }
    componentWillMount() {
        this.getHouseContractList()

    }
    render() {
        // console.log([...this.props.rentalcontract, ...this.props.sellcontract])
        const dataArr = [...this.props.rentalcontract, ...this.props.sellcontract]
        // console.log(this.props.rentalcontract)
        return (
            <Container>
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>交易进度</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.section}>
                    {dataArr.length === 0 ?
                        <View style={styles.nocollet}>
                            <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
                            <Text style={styles.text}>您还没有交易噢~！</Text>
                        </View> :
                        <List
                            // contentContainerStyle={doctorListStyle.section}
                            dataArray={dataArr}
                            renderRow={this.doctorList}
                            keyExtractor={(item, index) => index.toString()}
                        />}
                    {this.state.refreshing ? <Spinner color="#e64e37" /> :
                        <TouchableOpacity onPress={
                            this._onEndReached
                        } >
                            <View hcenter mdpt mdpb >
                                <Text style={{
                                    color: '#999',
                                    fontSize: 14
                                }}>{dataArr.length > 9 ? '点击加载更多...' : ''}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </Content>
            </Container>
        );
    }
    doctorList = (item) => {

        const user = this.props.token
        const file = !!item.images ? item.images.split(',')[0] : ''
        let status
        switch (parseInt(item.schedule_id)) {
            case 0: status = '没有记录';
                break;
            case 1: status = '签约';
                break;
            case 2: status = '查档';
                break;
            case 3: status = '支付订金';
                break;
            case 4: status = '申请退款';
                break;
            case 5: status = '申请贷款';
                break;
            case 6: status = '过户';
                break;
            case 7: status = '领新政';
                break;
            case 8: status = '办理抵押登记';
                break;
            case 9: status = '交房';
                break;
            default: status = '没有记录';
        }
        return (
            <Doctor
                // title={item.title + ' '+item.decoration}
                title={item.take_time}
                imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
                imgSvg={item.imgSvg}
                myNav={() => this.props.navigation.navigate('TransactionDetail', { house_id: item.id })}
                status={status}
                date={item.date}
                name={item.title + ' ' + item.decoration}
                // type={item.type}
                time={item.take_time}
                action1={item.action1}
                position={item.amountm + (item.type === "secondhand" ? '元/平' : '元/月')}
                distance={item.broker_real_name}
                action='查看进度'
                grade={item.area + '平/' + item.direction + '/' + item.floor}
                code={'合同编号：' + item.id}

            />
        )
    }
}



const mapStateToProps = state => ({
    contractlist: state.house.contractlist,
    token: state.user.token,
    rentalcontract: state.house.rentalcontract,
    sellcontract: state.house.sellcontract,

})

export default connect(mapStateToProps, { getHouseContractList, getScheduleRecode })(Counter)

