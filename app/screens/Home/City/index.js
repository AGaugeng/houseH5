/**
 * 委托出租
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

    Left,
    Right,
    Body,

    // View
} from "native-base"

import {

    UpdateLocation
} from '../../../actions/location'
import styles from "./styles"
// 引入 CitySelect 组件
import CitySelect from 'react-city-select';

// 引入数据
import data from './city.json';
import iconSrc from "../../../assets/dw/dw@2x.png";


class Counter extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }
    static defaultProps = {
        location: {}

    }

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            address: '',
            longitude: '',
            latitude: '',
            count: 0,
            clicked: {},
            currentLocation: '未点击地图选择地址',
            _city: '',
            // 结构化城市列表数据
            citysData: data.indexCitys,
            // 对某项数据定制化配置
            config: {
                pos: {
                    icon: iconSrc, // 游标图标
                    title: '定位城市',
                },
                hot: {
                    title: '热门城市',
                    key: '热门',
                    style: 'grid', // 展示形式（ line || grid）
                }
            }

        }

    }

    componentWillMount() {


    }

    // callback = (_city) => {
    //     if (this.props.navigation.state.params.callback) {
    //         this.props.navigation.state.params.callback(_city)
    //         setTimeout(() => {
    //             this.props.navigation.goBack()
    //         }, 200)

    //     }
    // }
    handleSelectCity(_city) {
        // console.log('选中数据项:', _city);
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(_city.p_name, _city.current_name, _city.name)
            setTimeout(() => {
                this.props.navigation.goBack()
            }, 200)

        }
    }

    render() {

        const citysData = this.state.citysData

        // console.log(this.state.citysData.pos[0].name)
        citysData.pos[0].name = typeof this.props.area.city_name === 'string' ? this.props.area.city_name : '中山市'
        citysData.pos[0].current_name = typeof this.props.area.city_name === 'string' ? this.props.area.city_name : '中山市'
        return (
            <Container >
                <Header style={{ backgroundColor: '#e64e37', height: 50 }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontSize: 14 }}>选择城市</Title>
                    </Body>
                    <Right />

                </Header>

                <div style={styles.container}>
                    <CitySelect
                        // 传入数据
                        data={citysData}
                        // 传入配置
                        config={this.state.config}
                        // 传入回调
                        onSelectItem={this.handleSelectCity.bind(this)}>
                    </CitySelect>

                </div>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location.location,
    area: state.location.area,
})
const mapDispatchToProps = {
    UpdateLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)