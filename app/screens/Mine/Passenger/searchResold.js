/**
 * 二手房
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
    Content,
    Left,
    Icon,
    List,
    Button,
    Right,
    ListItem,
    Input,
    Text
} from "native-base"
import { Image, TouchableOpacity, Modal } from "react-native"
import styles from "./styles"
import View from "../../../tool/View"
import { scaleSize, deviceHeight, deviceWidth, } from "../../ScreenUtil"
import HouseList from "../houseList"
import MyModal from "../selectModal"
import { Grid, Col } from "react-native-easy-grid"
import {
    searchResoldHouse, getHousePrice, getHouseType, getHouseOrientation, getHouseAge, getHouseFloor, getHouseArea, getHouseUseRights, getHouseLayout, getHouseLabel, getHouseEquipment,
    UpdateSelectPrice, UpdateSelectType, UpdateSelectOrientation, UpdateSelectArea, UpdateSelectFloor, UpdateSelectAge, UpdateSelectUseRights, UpdateSelectLayout, UpdateSelectLabel, UpdateSelectEquipment
} from '../../../actions/house'
import { Config } from '../../../network'
class Counter extends Component {
    static propTypes = {
        searchResoldHouse: PropTypes.func.isRequired,
        getHousePrice: PropTypes.func.isRequired,
        getHouseType: PropTypes.func.isRequired,
        getHouseOrientation: PropTypes.func.isRequired,
        getHouseAge: PropTypes.func.isRequired,
        getHouseFloor: PropTypes.func.isRequired,
        getHouseArea: PropTypes.func.isRequired,
        getHouseUseRights: PropTypes.func.isRequired,
        getHouseLayout: PropTypes.func.isRequired,
        getHouseLabel: PropTypes.func.isRequired,
        getHouseEquipment: PropTypes.func.isRequired,

        getSelectPrice: PropTypes.func.isRequired,
        getSelectType: PropTypes.func.isRequired,
        getSelectOrientation: PropTypes.func.isRequired,
        getSelectAge: PropTypes.func.isRequired,
        getSelectFloor: PropTypes.func.isRequired,
        getSelectArea: PropTypes.func.isRequired,
        getSelectUseRights: PropTypes.func.isRequired,
        getSelectLayout: PropTypes.func.isRequired,
        getSelectLabel: PropTypes.func.isRequired,
        getSelectEquipment: PropTypes.func.isRequired,

        price: PropTypes.array.isRequired,
        housetype: PropTypes.array.isRequired,
        orientation: PropTypes.array.isRequired,
        acreage: PropTypes.array.isRequired,
        floor: PropTypes.array.isRequired,
        age: PropTypes.array.isRequired,
        userights: PropTypes.array.isRequired,
        layout: PropTypes.array.isRequired,
        label: PropTypes.array.isRequired,
        equipment: PropTypes.array.isRequired,
        //select
        selectprice: PropTypes.number.isRequired,
        selecthousetype: PropTypes.number.isRequired,
        selectorientation: PropTypes.number.isRequired,
        selectacreage: PropTypes.number.isRequired,
        selectfloor: PropTypes.number.isRequired,
        selectage: PropTypes.number.isRequired,
        selectuserights: PropTypes.number.isRequired,
        selectlayout: PropTypes.number.isRequired,
        selectlabel: PropTypes.number.isRequired,
        selectequipment: PropTypes.number.isRequired,

        userinfo: PropTypes.array.isRequired,
        location: PropTypes.array.isRequired,
        area: PropTypes.object.isRequired,
        resoldhouse: PropTypes.array.isRequired,
    }
    static defaultProps = {
        userinfo: {},
        location: {},
        area: {},
        price: [],
        housetype: [],
        orientation: [],
        acreage: [],
        floor: [],
        age: [],
        userights: [],
        layout: [],
        label: [],
        equipment: [],

        selectprice: [],
        selecthousetype: [],
        selectorientation: [],
        selectacreage: [],
        selectfloor: [],
        selectage: [],
        selectuserights: [],
        selectlayout: [],
        selectlabel: [],
        selectequipment: [],
        resoldhouse: []
    }
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            isArea: false,
            isPrice: false,
            isType: false,
            isMore: false,
            isActive: 1,
            keyword: ''
        }

    }
    componentWillMount() {
        this.props.getHouseEquipment()
        this.props.getHousePrice()
        this.props.getHouseType()
        this.props.getHouseOrientation()
        this.props.getHouseAge()
        this.props.getHouseFloor()
        this.props.getHouseArea()
        this.props.getHouseUseRights()
        this.props.getHouseLayout()
        // this.props.getHouseLabel([{ name: 'type', data: 'secondhand' }])
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    HouseList = (item) => {
        const user = this.props.token
        const file = !!item.images ? item.images.split(',')[0] : ''
        return (

            <HouseList
                title={item.title + ' ' + item.decoration + ' ' + item.room_num + '室' + item.hall_num + '厅'}
                houseList={() => {
                    this.props.navigation.navigate("ResoldHouseDetail", { h_id: item.id })
                }}
                grade={item.area + '平/' + item.direction + '/' + item.floor}
                type={item.elevator === '0' ? '电梯' : ''}
                time={!!item.tag ? item.tag.split(",") : ''}
                action={item.action}
                position={item.price}
                distance={item.amountm + (item.type === 'rentinghouse' ? '元/月' : '元/平')}//Math.round()四舍五入
                imgUrl={Config.API_URL + '/api/Public/get_file?file=' + file + '&token=' + user.token + '.' + user.uid}
            />
        )
    }
    tab = (item) => {
        return (
            <View style={{ width: deviceWidth / 5 }}>
                {/* <Text style={styles.hospitalTitle}>{item.title}</Text> */}
                <Button transparent onPress={() => this.props.UpdateSelectPrice(item.id)} small info={this.props.selectprice === item.id} style={{ backgroundColor: '#f4f4f4', width: scaleSize(200), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(30) }}>
                    <Text style={{ color: '#000', width: scaleSize(300), fontSize: 12, lineHeight: scaleSize(64) }}>{item.title ? item.title : item.name}</Text>
                </Button>
            </View>
        )
    }

    render() {
        const address = this.props.area
        return (
            <Container style={styles.container}>
                <Header style={{ marginTop: scaleSize(18), height: scaleSize(108) }}>
                    {/* <View > */}
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon style={{ color: '#333' }} name="ios-arrow-back" />
                    </TouchableOpacity>

                    <View style={styles.searchBox}>
                        <Image
                            source={require("../../../assets/home/search@3x.png")}
                            style={styles.searchIcon}
                        />
                        <Input
                            keyboardType="web-search"
                            placeholder="搜索您想要的房源"
                            underlineColorAndroid="transparent"
                            style={styles.inputText}
                            onChangeText={keyword => this.setState({ keyword })}
                            onBlur={() => {
                                this.props.searchResoldHouse([
                                    { name: 'keyword', data: this.state.keyword }
                                ])
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        underlayColor="transparent"
                    >
                        <Image
                            source={require("../../../assets/home/news_normal@3x.png")}
                            style={styles.scanIcon}
                        />
                    </TouchableOpacity>
                    {/* </View> */}
                </Header>
                <Content>
                    {this.props.resoldhouse.length === 0 ?
                        <View vcenter hcenter xlp>

                            <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} />
                            <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>未搜索到房源</Text>
                        </View> :
                        <List
                            contentContainerStyle={styles.sectionNear}
                            dataArray={this.props.resoldhouse}
                            renderRow={this.HouseList}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </Content>
            </Container >
        );
    }
}


const mapStateToProps = state => ({
    resoldhouse: state.house.resoldhouse,
})

export default connect(mapStateToProps, {
    searchResoldHouse,
})(Counter)
