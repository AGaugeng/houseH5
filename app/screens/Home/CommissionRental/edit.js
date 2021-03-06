/**
 * 委托出租-修改
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
    Content,
    Button,
    Icon,
    Input,
    ListItem,
    Left,
    Right,
    Form,
    Spinner,
    Picker,
    CheckBox,
    Body,
    Text,
} from "native-base"
import {
    TouchableOpacity,
    TextInput,
    ImageBackground
} from 'react-native'
import {
    getCommunity,
    getHouseStruct, getHouseInfo, getHousePrice, addRentalHouse, editRentalHouse, getHouseType, UpdateSelectLabel, getHouseOrientation, getHouseAge, getHouseFloor, getHouseArea, getHouseUseRights, getHouseLayout, getHouseLabel, getHouseEquipment,
    UpdateSelectPrice, UpdateSelectType, UpdateSelectOrientation, UpdateSelectArea, UpdateSelectFloor, UpdateSelectAge, UpdateSelectUseRights, UpdateSelectLayout, UpdateSelectEquipment,
} from '../../../actions/house'
import {
    getAreaChildV2,
    getAreaBrother,
    getAreaChild,
    UpdateAreaChildV2,
    UpdateAreaChild,
    UpdateLocation
} from '../../../actions/location'
import { getHouseManage } from '../../../actions/user'
import styles from "./styles"
import View from "../../View"
import { scaleSize, deviceWidth } from "../../ScreenUtil"
import { Grid, Col } from "react-native-easy-grid"
import DatePicker from 'react-mobile-datepicker';
import ReactMCarousel from 'react-m-carousel'
import { Config } from '../../../network'
import UploadFile from '../../../tool/uploadFile'
class UselessTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
                editable={true}
                maxLength={200}

                underlineColorAndroid="transparent"
            />
        )
    }
}

class Counter extends Component {
    static propTypes = {
        getCommunity: PropTypes.func.isRequired,
        getHouseStruct: PropTypes.func.isRequired,
        getHouseManage: PropTypes.func.isRequired,
        getHouseInfo: PropTypes.func.isRequired,
        editRentalHouse: PropTypes.func.isRequired,
        addRentalHouse: PropTypes.func.isRequired,
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
        getAreaChildV2: PropTypes.func.isRequired,
        getAreaBrother: PropTypes.func.isRequired,
        getAreaChild: PropTypes.func.isRequired,

        UpdateAreaChildV2: PropTypes.func.isRequired,
        UpdateAreaChild: PropTypes.func.isRequired,

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
        newhouse: PropTypes.object.isRequired,
        filecallbacka: PropTypes.array.isRequireda,
        filecallbackb: PropTypes.array.isRequiredb,
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
        newhouse: [],
        filecallback: [],
        areabrother: [],
        areachild: [],
        areachildv2: []

    }

    constructor(props) {
        super(props)
        const item = this.props.houseinfo

        this.state = {
            type: '',
            // area: '',
            // floor: '',
            item: item,
            id: '',
            uid: item.uid,
            orian: '',
            layout: '',
            ev: '',
            money: '',
            // time: '',
            isOpen: false,
            time: '',
            isTrue: false,
            overlayActive: false,
            modalVisible: false,

            title: '',
            province: '',
            city: '',
            town: '',
            address: '',
            longitude: '',
            latitude: '',
            price: '',
            amountm: '',
            area: '',
            floor: '',
            room_num: '',
            hall_num: '',
            bathroom_num: '',
            kitchen_num: '',
            balcony_num: '',
            direction: '',
            elevator: '',
            tag: '',
            decoration: '',
            introduction: '',
            construction_time: '',
            owner_name: '',
            owner_mobile: '',
            community: '',
            building: '',
            number: '',
            images: '',
            deposit: '',
            equipment: '',
            count: 0,
            struct: '',
            clicked: {
                N: '',
                Q: ''
            },
            currentLocation: '未点击地图',
            newArr: [],
            equipArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            tagArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        }

    }

    setEquip(i) {
        let equipArr = this.state.equipArr
        equipArr[i] = !this.state.equipArr[i]
        this.setState({ equipArr })
    }
    setTag(i) {
        let tagArr = this.state.tagArr
        tagArr[i] = !this.state.tagArr[i]
        this.setState({ tagArr })
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    // componentDidMount() {
    //     Object.keys(this.props.houseinfo).length === 0 && this.props.navigation.goBack()
    // }
    _SelectMap() {

        this.props.navigation.navigate('CommissionMap', {
            callback: (clicked, address) => {
                this.setState({ clicked, address })
            }
        })

    }
    componentDidMount() {
        setTimeout(() => {
            const houseinfo = this.props.houseinfo
            if (Object.keys(houseinfo).length > 0) {
                houseinfo.tag.split(',')//循环已有标签
                    .map((item1, index1) => {

                        this.props.label.map((item2, index2) => {

                            if (item1 === item2.value) {
                                this.setTag(index2)
                            }
                        })
                    })
                houseinfo.equipment.split(',') //循环已有标签
                    .map((item1, index1) => {

                        this.props.equipment.map((item2, index2) => {

                            if (item1 === item2.value) {
                                this.setEquip(index2)

                            }
                        })
                    })
            }

        }, 2500)

    }

    componentWillMount() {


        const { params } = this.props.navigation.state || 0

        this.props.getHouseInfo([{ name: 'house_id', data: params.id }], 'rentinghouse')
        this.props.getCommunity()
        this.props.getHouseStruct()
        this.props.getHouseEquipment()
        this.props.getHousePrice()
        this.props.getHouseType()
        this.props.getHouseOrientation()
        this.props.getHouseAge()
        this.props.getHouseFloor()
        this.props.getHouseArea()
        this.props.getHouseUseRights()
        this.props.getHouseLayout()
        this.props.getHouseLabel([{ name: 'type', data: 'rentinghouse' }], 'rentinghouse')
        this.props.getAreaBrother([
            { name: 'province', data: '北京市' },
            { name: 'city', data: this.state.city },
            { name: 'town', data: this.props.town }
        ])

    }
    // closeOverlay = () => {
    //   this.setState({ overlayActive: false })
    // }
    // showOverlay = () => {
    //   this.setState({ overlayActive: true })
    // }
    _getImg(arr, user) {

        let img = []
        if (arr.length > 0) {

            arr.forEach((item, index) => {
                // 如果有孩子
                let file = {}
                file.image = Config.API_URL + '/api/Public/get_file?file=' + item + '&token=' + user.token + '.' + user.uid
                file.name = '房长官'
                file.text = index + 1
                img.push(file);

            })
        } else {
            let file = {}
            file.image = Config.API_URL + '/api/Public/get_file?file=' + arr[0] + '&token=' + user.token + '.' + user.uid
            file.name = '房长官'
            file.text = 1
            img.push(file);
        }
        return img;
    }
    parseTime(d) {
        const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        return newDate;
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ construction_time: this.parseTime(time), isOpen: false });

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
        arr.forEach(item => {
            // 如果有孩子

            if (item === true) {
                buy.push(item);

            } else {
                sell.push(item);
                // return sell;
            }
        })
        return [...array, buy, sell];
    }
    editRentalHouse() {
        const { title, province, city, town, address, clicked, images, amountm, kitchen_num, balcony_num, struct,
            area, floor, room_num, hall_num, bathroom_num, direction, elevator, decoration,
            introduction, construction_time, owner_name, owner_mobile, community, building,
            number, tagArr, deposit, equipArr } = this.state
        const item = this.props.houseinfo
        let equipment = ''
        let tag = ''
        equipArr.map((item, index) => {
            if (item === true) {
                equipment = equipment + this.props.equipment[index].name + ','
            }
        })

        equipment = equipment.substring(0, equipment.length - 1)
        tagArr.map((item, index) => {
            if (item === true) {
                tag = tag + this.props.label[index].name + ','
            }
        })
        tag = tag.substring(0, tag.length - 1)


        const newFile = this.props.filecallbacka.length > 0 ? this.props.filecallbacka.join(',') : ''
        let file_id
       
        if (item.images.length === 0) {
            file_id = newFile
        } else {
            file_id = item.images + (newFile.length > 0 ? ',' + newFile : '')
        }
        this.props.editRentalHouse([
            { name: 'title', data: title ? title : item.title },
            { name: 'province', data: province ? province : item.province },
            { name: 'city', data: city ? city : item.city },
            { name: 'town', data: town ? town : item.town },
            { name: 'address', data: address ? address : item.address },
            { name: 'longitude', data: clicked.N ? clicked.N : item.longitude },
            { name: 'latitude', data: clicked.Q ? clicked.Q : item.latitude },
            { name: 'price', data: amountm ? amountm : item.amountm },
            { name: 'amountm', data: amountm ? amountm : item.amountm },
            { name: 'area', data: area ? area : item.area },
            { name: 'floor', data: floor ? floor : item.floor },
            { name: 'room_num', data: room_num ? room_num : item.room_num },
            { name: 'hall_num', data: hall_num ? hall_num : item.hall_num },
            { name: 'bathroom_num', data: bathroom_num ? bathroom_num : item.bathroom_num },
            { name: 'kitchen_num', data: kitchen_num ? kitchen_num : item.kitchen_num },
            { name: 'balcony_num', data: balcony_num ? balcony_num : item.balcony_num },
            { name: 'direction', data: direction ? direction : item.direction },
            { name: 'elevator', data: elevator ? elevator : item.elevator },
            { name: 'tag', data: tag },
            { name: 'decoration', data: decoration ? decoration : item.decoration },
            { name: 'introduction', data: introduction ? introduction : item.introduction },
            { name: 'construction_time', data: construction_time ? construction_time : item.construction_time },
            { name: 'owner_name', data: owner_name ? owner_name : item.owner_name },
            { name: 'owner_mobile', data: owner_mobile ? owner_mobile : item.owner_mobile },
            { name: 'community', data: community ? community : item.community },
            { name: 'building', data: building ? building : item.building },
            { name: 'number', data: number ? number : item.number },
            { name: 'images', data: file_id },
            { name: 'id', data: item.id },//房源ID
            { name: 'uid', data: item.uid },//用户ID
            { name: 'deposit', data: deposit ? deposit : item.deposit },
            { name: 'equipment', data: equipment },
            { name: 'housetype_struc', data: struct ? struct : item.housetype_struc },
        ], () => this.props.navigation.goBack(), () => this.getHouseManage())
    }

    getHouseManage() {
        this.props.getHouseManage([
            { name: 'status', data: '*' },
            { name: 'limit', data: 20 },
            { name: 'page', data: 1 },
            { name: 'release', data: '' },
        ], 1) //all
        this.props.getHouseManage([
            { name: 'status', data: 0 },
            { name: 'limit', data: 20 },
            { name: 'page', data: 1 },
            { name: 'release', data: '' },
        ], 2) //pending
        this.props.getHouseManage([
            { name: 'status', data: '*' },
            { name: 'limit', data: 20 },
            { name: 'page', data: 1 },
            { name: 'release', data: 1 },
        ], 3)  //released
        this.props.getHouseManage([
            { name: 'status', data: 10 },
            { name: 'limit', data: 20 },
            { name: 'page', data: 1 },
            { name: 'release', data: '' },
        ], 4)//traded
    }
    tab = (item) => {

        return (
            <View style={styles.spaceBetween}>
                {/* <Text style={styles.hospitalTitle}>{item.title}</Text> */}
                <View style={{ backgroundColor: item.bgColor, width: scaleSize(152), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(8), }}>
                    <Text style={{ color: item.color, fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(64) }}>{item.title}</Text>
                </View>
            </View>
        )
    }

    render() {

        const {
            province, city, town, address, kitchen_num, balcony_num, struct,
            floor, room_num, hall_num, bathroom_num, community,
            direction, elevator, decoration,
            construction_time
        } = this.state
        const item = this.props.houseinfo
        const user = this.props.token
        const file = !!item.images ? item.images.split(',') : ''
        const dataUrl = this._getImg(file, user)
        const dateConfig = {

            'year': {
                format: 'YYYY',
                caption: 'Year',
                step: 1,
            },
            'month': {
                format: 'MM',
                caption: 'Mon',
                step: 1,
            },
            'date': {
                format: 'DD',
                caption: 'Day',
                step: 1,
            }

        }

        return (
            <Container >
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>租房修改</Title>
                    </Body>
                    <Right />

                </Header>


                {Object.keys(this.props.houseinfo).length === 0 ? <Spinner /> : <Content style={styles.container}>
                    <Form>
                        <Grid style={{ padding: scaleSize(35) }}>
                            <Col size={5} >
                                <Col>
                                    <Text>租金/元</Text>
                                    <Input
                                        keyboardType="number-pad"
                                        placeholder={item.amountm}
                                        underlineColorAndroid="transparent"
                                        style={styles.inputText}
                                        onChangeText={amountm => {
                                            this.setState({ amountm })
                                        }}
                                        placeholderTextColor="#ccc"
                                    />
                                </Col>
                                <Col >
                                    <Text>楼层</Text>
                                    <View>
                                        <Picker
                                            // style={{ width: 100 }}
                                            mode="none"
                                            selectedValue={this.state.floor}
                                            style={{ position: 'absolute', width: scaleSize(200), right: 30, top: 10, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ floor: itemValue })}>
                                            {[{ title: '请选择', value: '未选择' }, ...this.props.floor].map((item, index) =>
                                                <Picker.Item label={item.title} value={item.value} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                            )}
                                        </Picker>
                                        <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{floor ? floor : item.floor}</Text>
                                    </View>
                                </Col >
                                <Col >
                                    <Text>电梯</Text>
                                    <View>
                                        <Picker
                                            selectedValue={this.state.elevator}
                                            style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 10, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ elevator: itemValue })}>
                                            <Picker.Item label="请选择" value='未选择' />
                                            <Picker.Item label="有" value={'1'} />
                                            <Picker.Item label="无" value={'0'} />
                                        </Picker>
                                        {elevator ? <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{elevator ? (elevator === '1' ? '有' : elevator === '0' ? '无' : '未选择') : '请选择'}</Text>
                                            : <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!item.elevator ? (item.elevator === '1' ? '有' : item.elevator === '0' ? '无' : '未选择') : '请选择'}</Text>
                                        }
                                    </View>
                                </Col >
                                <Col>
                                    <Text>栋数</Text>
                                    <Input
                                        keyboardType="web-search"
                                        placeholder={item.building}
                                        underlineColorAndroid="transparent"
                                        style={styles.inputText}
                                        onChangeText={building => {
                                            this.setState({ building })
                                        }}
                                        placeholderTextColor="#ccc"
                                    />
                                </Col>
                            </Col >
                            <Col size={5}>
                                <Col >
                                    <Text>押金缴付</Text>
                                    <Input
                                        keyboardType="number-pad"
                                        placeholder={item.deposit}
                                        underlineColorAndroid="transparent"
                                        style={styles.inputText}
                                        onChangeText={deposit => {
                                            this.setState({ deposit })
                                        }}
                                        placeholderTextColor="#ccc"
                                    />
                                </Col >
                                <Col >
                                    <View>
                                        <Text>朝向</Text>
                                        <Picker
                                            selectedValue={this.state.direction}
                                            style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ direction: itemValue })}>

                                            {[{ title: '请选择', value: '未选择' }, ...this.props.orientation].map((item, index) =>
                                                <Picker.Item label={item.title} value={item.value} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                            )}
                                        </Picker>
                                        <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!direction ? direction : item.direction}</Text>
                                    </View>
                                </Col >
                                <Col >
                                    <View>
                                        <Text>装修</Text>
                                        <Picker
                                            selectedValue={this.state.decoration}
                                            style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ decoration: itemValue })}>
                                            {[{ name: '请选择', value: '未选择' }, ...this.props.housetype].map((item, index) =>
                                                <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                            )}
                                        </Picker>
                                        <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!decoration ? decoration : item.decoration}</Text>
                                    </View>
                                </Col >
                                <Col >
                                    <Text>房号</Text>
                                    <Input
                                        keyboardType="number-pad"
                                        placeholder={item.number}
                                        underlineColorAndroid="transparent"
                                        style={styles.inputText}
                                        onChangeText={number => {
                                            this.setState({ number })
                                        }}
                                        placeholderTextColor="#ccc"
                                    />
                                </Col >
                            </Col >
                            <Col size={3}>

                                <Col >

                                    <Text>建筑时间</Text>

                                    {/* <Button transparent ></Button> */}
                                    <DatePicker

                                        value={new Date()}
                                        dateConfig={dateConfig}
                                        isOpen={this.state.isOpen}
                                        onSelect={this.handleSelect}
                                        onCancel={this.handleCancel} />
                                    <TouchableOpacity transparent onPress={this.handleClick}>
                                        <Text style={{
                                            height: 20, width: 100,

                                            marginTop: scaleSize(30),
                                            // marginBottom: scaleSize(10),
                                            color: '#ccc',
                                            backgroundColor: '#fff',
                                            fontSize: 14
                                        }}>{!!construction_time ? construction_time : item.construction_time}</Text>
                                    </TouchableOpacity>
                                </Col >

                                <Col >
                                    <Text>建筑面积</Text>
                                    {/* <Picker
                    selectedValue={this.state.area}
                    style={styles.text}
                    onValueChange={(itemValue, itemIndex) => this.setState({ area: itemValue })}>
                    {[{ title: '请选择', value: '未选择' }, ...this.props.acreage].map((item, index) =>
                      <Picker.Item label={item.title} value={item.title} /> //为了重置选择，把{ name: '', id: null }push到最前面
                    )}
                  </Picker> */}
                                    <Input
                                        keyboardType="number-pad"
                                        placeholder={item.area}
                                        underlineColorAndroid="transparent"
                                        style={styles.inputText}
                                        onChangeText={area => {
                                            this.setState({ area })
                                        }}
                                        placeholderTextColor="#ccc"
                                    />
                                </Col >

                                <Col >
                                    <View>
                                        <Text>小区名称</Text>
                                        <Picker
                                            selectedValue={this.state.community}
                                            style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ community: itemValue })
                                            }>

                                            {['请选择', ...this.props.community].map((item, index) =>
                                                <Picker.Item label={item} value={item} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                            )}
                                        </Picker>
                                        <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!community ? community : item.community}</Text>
                                    </View>
                                </Col >
                                <Col >
                                    <View>
                                        <Text>户型结构</Text>
                                        <Picker
                                            selectedValue={this.state.struct}
                                            style={{ position: 'absolute', width: scaleSize(200), left: 0, top: 30, opacity: 0 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ struct: itemValue })}>
                                            {[{ name: '请选择', value: '未选择' }, ...this.props.struct].map((item, index) =>
                                                <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                            )}
                                        </Picker>
                                        <Text style={{ marginTop: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!struct ? struct : item.housetype_struc}</Text>
                                    </View>
                                </Col >
                            </Col >
                        </Grid>
                        <View style={styles.bg} />
                        <ListItem onPress={
                            () =>
                                // this.setModalVisible(true)
                                this._SelectMap()

                        } icon style={{ flexDirection: 'row', marginTop: scaleSize(10), justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>选择地址</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                                <Text numberOfLines={1} style={{ fontSize: 14 }}>{address ? address : item.address}</Text>
                                <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
                            </Right>
                        </ListItem>


                        <View mdpr mdpt icon style={{ marginLeft: scaleSize(35), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>所在城市</Text>
                            </Left>
                            <View style={{
                            }}>
                                <Picker
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 10, top: 0, opacity: 0 }}
                                    selectedValue={this.state.province}
                                    mode='dropdown'
                                    supportedOrientations='Portrait'
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}

                                    onValueChange={(province, index) => {
                                        this.setState({ province: province, city: '', town: '' })
                                        if (index) {
                                            this.props.UpdateAreaChild([])
                                            this.props.UpdateAreaChildV2([])

                                            this.props.getAreaChild([{ name: 'id', data: this.props.areabrother[0][index - 1].id }])



                                        }


                                    }}>
                                    {[{ name: '选择省', id: null }, ...this.props.areabrother[0]].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}
                                </Picker>
                                <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!province ? province : item.province}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={this.state.city}
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 10, top: 0, opacity: 0 }}
                                    onValueChange={(city, index) => {
                                        this.setState({ city })
                                        if (index) {
                                            this.props.getAreaChildV2([{ name: 'id', data: this.props.areachild[index - 1].id }])
                                        }

                                    }}>
                                    {[{ name: '选择市', id: null }, ...this.props.areachild].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                    )}


                                </Picker>
                                <Text style={{ marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{!!city ? city : item.city}</Text>
                            </View>
                            <View>
                                <Picker

                                    selectedValue={this.state.town}
                                    style={{ position: 'absolute', width: scaleSize(150), color: '#666', right: 0, top: 0, opacity: 0 }}
                                    onValueChange={(town, itemIndex) => this.setState({ town })}>
                                    {[{ name: '选择区', id: null }, ...this.props.areachildv2].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{ marginRight: scaleSize(30), color: '#ccc', fontSize: 14 }}>{!!town ? town : item.town}</Text>

                            </View>
                            <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
                        </View>


                        <View mdpr lgpt row push mdpl >
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>户型</Text>
                            </Left>
                            <View row push style={{ alignItems: 'center' }}>

                                <Picker

                                    selectedValue={this.state.room_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 210, top: 0, opacity: 0 }}
                                    onValueChange={(room_num, index) => {
                                        this.setState({ room_num })
                                    }}>
                                    {[
                                        // { name: '选择卫', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}
                                </Picker>
                                <Text style={{
                                    marginRight: scaleSize(85), color: '#ccc', fontSize: 14
                                }}>{room_num ? room_num : item.room_num}室</Text>
                                <Picker

                                    selectedValue={this.state.hall_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 160, top: 0, opacity: 0 }}
                                    onValueChange={(hall_num, index) => {
                                        this.setState({ hall_num })


                                    }}>
                                    {[
                                        // { name: '选择卫', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{
                                    marginRight: scaleSize(75), color: '#ccc', fontSize: 14
                                }}>{hall_num ? hall_num : item.hall_num}厅</Text>
                                <Picker

                                    selectedValue={this.state.bathroom_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 110, top: 0, opacity: 0 }}
                                    onValueChange={(bathroom_num, itemIndex) => this.setState({ bathroom_num })}>
                                    {[
                                        // { name: '未选择', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{
                                    marginRight: scaleSize(60), color: '#ccc', fontSize: 14
                                }}>{bathroom_num ? bathroom_num : item.bathroom_num}卫</Text>
                                <Picker

                                    selectedValue={this.state.kitchen_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 60, top: 0, opacity: 0 }}
                                    onValueChange={(kitchen_num, itemIndex) => this.setState({ kitchen_num })}>
                                    {[
                                        // { name: '未选择', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{
                                    marginRight: scaleSize(40), color: '#ccc', fontSize: 14
                                }}>{kitchen_num ? kitchen_num : item.kitchen_num}厨</Text>
                                <Picker

                                    selectedValue={this.state.balcony_num}
                                    style={{ position: 'absolute', width: scaleSize(100), color: '#666', right: 10, top: 0, opacity: 0 }}
                                    onValueChange={(balcony_num, itemIndex) => this.setState({ balcony_num })}>
                                    {[
                                        // { name: '未选择', id: null },
                                        { name: '0', id: '11', },
                                        { name: '1', id: '21', },
                                        { name: '2', id: '31', },
                                        { name: '3', id: '41', },
                                        { name: '4', id: '51', },
                                        { name: '5', id: '61', },
                                        { name: '6', id: '71', },
                                        { name: '7', id: '81', },
                                        { name: '8', id: '91', },
                                        { name: '9', id: '12' },
                                    ].map((item, index) =>
                                        <Picker.Item label={item.name} value={item.name} />
                                    )}


                                </Picker>
                                <Text style={{
                                    marginRight: scaleSize(30), color: '#ccc', fontSize: 14
                                }}>{balcony_num ? balcony_num : item.balcony_num}阳台</Text>
                                <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
                            </View>
                        </View>


                        <View mdpl push row>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>房源标题</Text>
                            </Left>
                            {/* <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}> */}
                            <Input
                                keyboardType="web-search"
                                placeholder={item.title}
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={title => {
                                    this.setState({ title })
                                }}
                                placeholderTextColor="#ccc"
                            />

                            {/* </Right> */}
                        </View>
                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>房源介绍</Text>
                            </Left>


                        </ListItem>
                        <View mdpl mdpr>

                            <UselessTextInput
                                style={styles.intro}
                                multiline={true}
                                numberOfLines={4}
                                placeholder={item.introduction}
                                onChangeText={introduction => {
                                    this.setState({ introduction, count: introduction.length })

                                }}
                                value={item.text}
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left />
                            <Right style={{ borderBottomColor: '#fff' }}>
                                <Text style={{
                                    color: '#999',
                                    fontSize: 14
                                }}>{this.state.count}/200</Text>
                            </Right>
                        </ListItem>
                        <View style={styles.bg} />
                        <View mdpl style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>业主姓名</Text>
                            </Left>
                            {/* <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}> */}
                            <Input
                                keyboardType="web-search"
                                placeholder={item.owner_name}
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={owner_name => {
                                    this.setState({ owner_name })
                                }}
                                placeholderTextColor="#ccc"
                            />

                            {/* </Right> */}
                        </View>
                        <View mdpl style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>联系手机</Text>
                            </Left>
                            {/* <Right style={{ flexDirection: 'row', borderBottomColor: '#fff' }}> */}
                            <Input
                                keyboardType="number-pad"
                                placeholder={item.owner_mobile}
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={owner_mobile => {
                                    this.setState({ owner_mobile })
                                }}
                                placeholderTextColor="#ccc"
                            />

                            {/* </Right> */}
                        </View>
                        <View style={styles.bg} />
                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>请选择房屋配置</Text>
                            </Left>
                        </ListItem>
                        {/* <List
              contentContainerStyle={styles.tab}
              dataArray={this.state.tab}
              renderRow={this.tab}
              keyExtractor={(item, index) => index.toString()}
            /> */}
                        {this.props.equipment.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter smpt>
                            {this.props.equipment.map((item, index) =>
                                <Button style={{ marginRight: scaleSize(15), height: scaleSize(64), backgroundColor: this.state.equipArr[index] === true ? '#e64e37' : '#f4f4f4', borderRadius: scaleSize(8), marginTop: scaleSize(8) }} key={index}
                                    onPress={() =>
                                        this.setEquip(index)
                                    }
                                // onPress={() => this.props.UpdateSelectEquipment(index)}
                                >
                                    <Text style={{ color: item.color, fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(64) }}>{item.name}</Text>
                                </Button>
                            )}
                        </View>}
                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>请选择下面标签</Text>
                            </Left>
                        </ListItem>
                        {this.props.label.length !== 0 && <View style={{ flexWrap: 'wrap' }} row vcenter hcenter smpt>
                            {this.props.label.map((item, index) =>
                                <Button style={{ marginRight: scaleSize(15), height: scaleSize(64), borderRadius: scaleSize(8), marginTop: scaleSize(8), backgroundColor: this.state.tagArr[index] === true ? '#e64e37' : '#f4f4f4', }} key={index}
                                    onPress={() =>
                                        this.setTag(index)
                                    }
                                // onPress={() => this.props.UpdateSelectLabel(index)}

                                >
                                    <Text style={{ color: item.color, fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(64) }}>{item.title ? item.title : item.name}</Text>
                                </Button>
                            )}
                        </View>}
                        <ListItem onPress={() => this.props.navigation.navigate('ImageDetail', { image: item.images })} icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>查看已添加图片</Text>
                            </Left>
                            <Right style={{ flexDirection: 'row', borderBottomColor: '#fff', }}>
                                {/* <Text numberOfLines={1} style={{ fontSize: 14 }}>{address ? address : item.address}</Text> */}
                                <Icon style={{ fontSize: 20 }} name="ios-arrow-forward" />
                            </Right>
                        </ListItem>

                        <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Left>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 14
                                }}>新增房源图片/视频</Text>
                            </Left>
                        </ListItem>
                        {/* <TouchableOpacity transparent onPress={this.showOverlay}> */}
                        <UploadFile />
                        {/* <Image source={require("../../../assets/home/add@3x.png")} style={styles.img} /> */}
                        {/* </TouchableOpacity> */}
                        <ListItem style={{ borderBottomColor: '#fff' }}>

                            <CheckBox checked={this.state.isTrue} onPress={() => this.setState({ isTrue: !this.state.isTrue })} />
                            <Body >
                                <TouchableOpacity transparent onPress={() => {
                                    this.props.navigation.navigate('Protocol', { type: 'rental' })
                                }}>
                                    <Text style={{ fontSize: 14, marginLeft: scaleSize(25) }}>同意 <Text style={{ color: '#6EADFB', fontSize: 14 }}>《房长官网络科技有限公司委托协议》</Text></Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>

                    </Form>

                    {this.state.isTrue ?
                        <TouchableOpacity transparent onPress={() => this.editRentalHouse()} >
                            <button className="mine" style={{ marginTop: scaleSize(115), backgroundColor: '#e64e37', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40), marginBottom: scaleSize(152) }}>
                                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>确认修改</Text>
                            </button>
                        </TouchableOpacity>
                        :
                        <View style={{ marginTop: scaleSize(115), marginBottom: scaleSize(152), backgroundColor: '#eee', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#e64e37', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>需要确认协议</Text>
                        </View>
                    }

                </Content>}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    location: state.location.location,
    area: state.location.area,
    house: state.house,
    price: state.house.price,
    housetype: state.house.housetype,
    orientation: state.house.orientation,
    acreage: state.house.acreage,
    floor: state.house.floor,
    age: state.house.age,
    userights: state.house.userights,
    layout: state.house.layout,
    label: state.house.rentallabel,
    equipment: state.house.equipment,
    areabrother: state.location.areabrother,
    areachild: state.location.areachild,
    areachildv2: state.location.areachildv2,

    selectprice: state.house.selectprice,
    selecthousetype: state.house.selecthousetype,
    selectorientation: state.house.selectorientation,
    selectacreage: state.house.selectacreage,
    selectfloor: state.house.selectfloor,
    selectage: state.house.selectage,
    selectuserights: state.house.selectuserights,
    selectlayout: state.house.selectlayout,
    selectlabel: state.house.selectlabel,
    selectequipment: state.house.selectequipment,
    filecallbacka: state.house.filecallbacka,
    filecallbackb: state.house.filecallbackb,

    houseinfo: state.house.rentchange,
    userinfo: state.user.info,
    community: state.house.community,
    struct: state.house.struct,
})
const mapDispatchToProps = {
    getCommunity,
    getHouseStruct,
    getHouseManage,
    getHouseInfo,
    getHousePrice,
    getHouseType,
    getHouseOrientation,
    getHouseAge,
    getHouseFloor,
    getHouseArea,
    getHouseUseRights,
    getHouseLayout,
    getHouseLabel,
    getHouseEquipment,
    getAreaChildV2,
    getAreaBrother,
    getAreaChild,
    addRentalHouse,

    editRentalHouse,

    UpdateAreaChildV2,
    UpdateAreaChild,
    UpdateSelectPrice,
    UpdateSelectType,
    UpdateSelectOrientation,
    UpdateSelectArea,
    UpdateSelectFloor,
    UpdateSelectAge,
    UpdateSelectUseRights,
    UpdateSelectLayout,
    UpdateSelectLabel,
    UpdateSelectEquipment,
    UpdateLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)