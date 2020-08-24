/**
 * 地图
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
    Left,
    Right,
    Body,
    Text,
    // View
} from "native-base"
import { TouchableOpacity } from 'react-native'
import {

    UpdateLocation
} from '../../../actions/location'
import styles from "./styles"
import View from "../../View"
import { scaleSize, deviceWidth } from "../../ScreenUtil"
import { Map, Polygon, Marker } from 'react-amap';
// import Toast from '../../../tool/toast'

let _this = {}
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

        }

    }

    componentWillMount() {
        this.plugins = [
            // 'MapType',
            'Scale',
            'OverView',
            'ControlBar', // v1.1.0 新增
            {
                name: 'ToolBar',
                options: {
                    visible: true,  // 不设置该属性默认就是 true
                    // onCreated(ins) {

                    // },
                },
            }
        ]
        let onComplete = (data) => {
            this.setState({
                location: { longitude: data.position.getLng(), latitude: data.position.getLat() }
            })
            this.props.UpdateLocation(this.state.location)
            // this.props.getNearByRoom(
            //   [
            //     { name: 'longitude', data: data.position.getLng() },
            //     { name: 'latitude', data: data.position.getLat() }
            //   ])
        }

        let onError = () => {
            // Toast.warning("定位失败!")
            this.setState({
                location: { longitude: 113.20600, latitude: 22.62900 }
            })
            this.props.UpdateLocation(this.state.location)


        }

        this.events = {
            created: (instance) => {
                instance.plugin(['AMap.Geolocation', 'AMap.Geocoder'], function () {
                    let geolocation = new this.AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new this.AMap.Pixel(14, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

                    });

                    _this.geoCoder = new this.AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    instance.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    this.AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                    this.AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

                });
            },
            click: (mapevt) => {


                let clicked = mapevt.lnglat;
                this.setState({ clicked, currentLocation: 'loading...' });

                _this.geoCoder && _this.geoCoder.getAddress(clicked, (status, result) => {

                    if (status === 'complete') {
                        if (result.regeocode) {
                            this.setState({
                                currentLocation: result.regeocode.formattedAddress || '未知地点'
                            });
                        } else {
                            this.setState({
                                currentLocation: '未知地点'
                            });
                        }
                    } else {
                        this.setState({
                            currentLocation: '未知地点'
                        });
                    }
                })


            },
        };

    }

    callback = (clicked, address) => {
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(clicked, address)
            setTimeout(() => {
                this.props.navigation.goBack()
            }, 200)

        }
    }


    render() {

        const clicked = this.state.clicked

        return (
            <Container >
                <Header style={{ backgroundColor: '#e64e37' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontSize: 14 }}>选择地址</Title>
                    </Body>
                    <Right />

                </Header>

                <Content style={styles.container}>




                    <View style={styles.imageContainer}>
                        <Map amapkey={'86cde10d900c16c31db30941570e84cd'} zoom={15} center={{ longitude: (!!clicked.N ? clicked.N : this.props.location.longitude), latitude: (!!clicked.Q ? clicked.Q : this.props.location.latitude) }} draggable={true} plugins={this.plugins} events={this.events}>
                            <Marker position={{ longitude: (!!clicked.N ? clicked.N : 113), latitude: (!!clicked.Q ? clicked.Q : 22) }} />
                            <div style={{
                                padding: 4,
                                background: '#000',
                                color: '#fff',
                                position: 'absolute',
                                top: 10,
                                left: 10
                            }} className="location">{this.state.currentLocation}</div>
                            <Polygon />
                            {/* <Button onPress={()}> </Button> */}
                        </Map>
                    </View>
                    <TouchableOpacity transparent onPress={() => {
                        // this.setState({
                        //     address: this.state.currentLocation
                        // })
                        // this.props.navigation.goBack()
                        this.callback(clicked, this.state.currentLocation)
                    }} >
                        <button className="mine" style={{ marginTop: scaleSize(115), backgroundColor: '#e64e37', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>确认选择</Text>
                        </button>
                    </TouchableOpacity>



                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location.location,

})
const mapDispatchToProps = {
    UpdateLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)