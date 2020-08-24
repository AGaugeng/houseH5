/**
 * 跟客维护
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, TextInput } from "react-native"
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
    Picker,
    Text,
    ListItem
} from "native-base"
import styles from "./styles"
import View from "../../View"
import { addClientViewLog, geSeeList, getClientInfo, getClientViewLog } from '../../../actions/client'
import { scaleSize, deviceWidth, toDate } from "../../ScreenUtil"
import DatePicker from 'react-mobile-datepicker';
import { isText } from '../../../tool/verify'
import Toast from '../../../tool/toast'
class UselessTextInput extends Component {
    render() {
        return (
            <TextInput
                {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
                editable={true}
                maxLength={200}
                placeholder="请填写看房备注"
                underlineColorAndroid="transparent"
            />
        );
    }
}
class Counter extends Component {
    static propTypes = {
        addClientViewLog: PropTypes.func.isRequired,
        geSeeList: PropTypes.func.isRequired,
        getClientInfo: PropTypes.func.isRequired,
        getClientViewLog: PropTypes.func.isRequired,
    }
    static defaultProps = {
        seelist: []
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0

        this.state = {
            view_time: '',
            client_id: params.id,
            remark: '',
            purpose_zone: params.title,
            id: '',
            index: -1,
            title: '未选择'
        }
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ view_time: toDate(time / 1000), isOpen: false });

    }
    addClientViewLog() {
        this.props.addClientViewLog([
            { name: 'view_time', data: this.state.view_time },
            { name: 'client_id', data: this.state.client_id },
            { name: 'house_id', data: this.state.id },
            { name: 'remark', data: this.state.remark }
        ], () => {
            this.props.getClientInfo([
                { name: 'client_id', data: this.state.client_id },
            ])

            this.props.getClientViewLog([
                { name: 'page', data: 1 },
                { name: 'client_id', data: this.state.client_id },
            ])
            this.props.navigation.goBack()
        })
    }

    componentWillMount() {
        this.props.geSeeList([
            { name: 'page', data: 1 },
            { name: 'limit', data: 20 },
            { name: 'status', data: '*' },
            { name: 'release', data: '' }
        ])
    }
    //全部  -  status  = *    release 不填 
    //待审核 - status = 0   release  不填
    //已发布 - status = *  release = 1 
    // 已成交  - status = 10  release =不填
    render() {
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
            },
            'hour': {
                format: 'hh',
                caption: 'Hour',
                step: 1,
            },
            'minute': {
                format: 'mm',
                caption: 'Min',
                step: 1,
            },
        }
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>跟客维护</Title>
                    </Body>

                    <Right >
                        <Button transparent >
                            {/* <Text style={{
                                color: '#666',
                                fontSize: 14
                            }}>保存</Text> */}
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <ListItem icon onPress={this.handleClick} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>看房时间</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#fff', }}>
                            <DatePicker

                                value={new Date()}
                                dateConfig={dateConfig}
                                isOpen={this.state.isOpen}
                                onSelect={this.handleSelect}
                                onCancel={this.handleCancel} />

                            <Text style={{
                                height: 20, width: 140,

                                // marginTop: scaleSize(38),
                                // marginBottom: scaleSize(10),
                                color: '#ccc',
                                backgroundColor: '#fff',
                                fontSize: 14
                            }}>{!!this.state.view_time ? this.state.view_time : '请选择时间'}</Text>

                            <Icon style={{ fontSize: 20, marginBottom: scaleSize(15) }} name="ios-arrow-forward" />
                        </Right>
                    </ListItem>
                    <View row push mdp>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>小区房源</Text>
                        </Left>
                        <View row push>
                            <Picker
                                // style={{ width: 100 }}
                                mode="none"
                                selectedValue={this.state.id}
                                style={{ position: 'absolute', width: scaleSize(200), right: 20, top: 0, opacity: 0 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ id: itemValue, index: itemIndex - 1 })
                                }
                                }>
                                {[{ title: '请选择', id: '未选择' }, ...this.props.seelist].map((item, index) =>
                                    <Picker.Item label={item.title} value={item.id} /> //为了重置选择，把{ name: '', id: null }push到最前面
                                )}
                            </Picker>
                            <Text style={{ marginTop: scaleSize(10), marginRight: scaleSize(50), color: '#ccc', fontSize: 14 }}>{this.state.index === -1 ? this.state.title : this.props.seelist[this.state.index].title}</Text>
                            <Icon style={{ fontSize: 20, color: '#ccc' }} name="ios-arrow-forward" />
                        </View>
                    </View>
                    <ListItem icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontSize: 14
                            }}>备注</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff' }} />
                    </ListItem>
                    <View style={styles.inputContainer}>
                        <UselessTextInput
                            style={styles.Remark}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={remark => this.setState({ remark })}
                        // value={this.state.text}
                        />
                    </View>
                    <View style={{ marginTop: scaleSize(115), marginBottom: scaleSize(152) }}>
                        <TouchableOpacity transparent onPress={() => {
                            if (!this.state.view_time) {
                                Toast.warning("请输入看房时间!")

                            } else if (!this.state.id) {
                                Toast.warning("请选择小区房源!")
                            } else if (!this.state.remark) {
                                Toast.warning("请输入看房备注!")
                            } else if (isText(this.state.remark)) {
                                Toast.warning("请认真填写看房备注!")
                            } else if (this.state.remark.length < 15) {
                                Toast.warning("至少十五个字!")
                            } else {

                                this.addClientViewLog()

                            }
                        }} >
                            <button className="mine" style={{ backgroundColor: '#e64e37', width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, height: scaleSize(80), borderRadius: scaleSize(40) }}>
                                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', lineHeight: scaleSize(80) }}>保存</Text>
                            </button>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    seelist: state.client.seelist,

})

export default connect(mapStateToProps, { addClientViewLog, geSeeList, getClientInfo, getClientViewLog })(Counter)
