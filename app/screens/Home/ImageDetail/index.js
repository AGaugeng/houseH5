/**
 * 5.图片
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { Header, Container, Card, CardItem, Button, Icon, Left, Text, Right, Content, List, Body, Title } from "native-base";

import View from "../../../tool/View"
import {
    setSpText,
    scaleSize,
    deviceWidth,
    deviceHeight
} from "../../ScreenUtil"; //自适配大小
import { Config } from '../../../network'

class Counter extends Component {
    static propTypes = {
        getUserArticle: PropTypes.func.isRequired,
        article: PropTypes.array.isRequired,
    }
    static defaultProps = {
        userinfo: {},
        token: {}
    }
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            limit: 20,
            keyword: '',
            refreshing: false,
        };
    }

    componentWillMount() {

    }

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

    render() {
        const user = this.props.token
        const { params } = this.props.navigation.state || 0

        const file = !!params.image ? params.image.split(',') : ''

        const dataUrl = this._getImg(file, user)
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: "#fff", borderBottomWidth: scaleSize(1), borderBottomColor: '#E6E6E5' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: '#000' }}>图片列表</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    {typeof dataUrl === 'object' && dataUrl.length > 0 ? dataUrl.map((item, index) =>
                        // <View mdp style={{ alignSelf: 'center' }}>
                        //     <Image source={item.image} style={{ height: 300, flex: 1 }} key={index} />
                        // </View>
                        <Card style={{ marginTop: scaleSize(36), width: deviceWidth - scaleSize(72), alignSelf: 'center', elevation: 3, borderRadius: scaleSize(18) }}>
                            <CardItem cardBody>

                                <Image style={{ height: 300, flex: 1 }} source={item.image} />


                            </CardItem>
                            <CardItem cardBody>

                                <Text style={{
                                    color: '#fff',
                                    fontSize: 15,
                                    position: 'absolute',
                                    right: 30,
                                    top: -36
                                }}>{item.text + '/' + file.length}</Text>

                            </CardItem>
                        </Card>
                    )
                        :
                        <View style={styles.nocollet}>
                            <ImageBackground source={require("../../../assets/mine/collet/no@3x.png")} style={styles.addImg} />
                            <Text style={styles.text}>您还没有上传图片噢~！</Text>
                        </View>}
                </Content>

            </Container >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        backgroundColor: "#fff"
    },
    searchBox: {
        height: scaleSize(70),
        flexDirection: "row",
        marginTop: scaleSize(36),
        // flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: scaleSize(20), // 设置圆角边
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        marginLeft: scaleSize(36),
        marginRight: scaleSize(24)
    },
    searchIcon: {
        marginLeft: scaleSize(12),
        marginRight: scaleSize(12),
        width: scaleSize(32),
        height: scaleSize(32),
        resizeMode: "stretch"
    },
    inputText: {
        flex: 1,
        padding: 0,
        // backgroundColor: 'transparent',
        fontSize: 14,
        outline: 0,
        marginLeft: scaleSize(36)
    },
    hospitalList: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: deviceWidth * 0.85,
        marginLeft: scaleSize(36),
        paddingBottom: scaleSize(36),
        borderBottomWidth: 1,
        borderColor: "#fcfcfc"
    }
});


const mapStateToProps = state => ({
    filecallbacka: state.house.filecallbacka,
    userinfo: state.user.info,
    token: state.user.token,
})

export default connect(mapStateToProps, {})(Counter)


//getUserArticle