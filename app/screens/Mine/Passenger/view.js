/**
 * 看房详情
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity } from "react-native"
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Spinner,
    Left,
    Right,
    Body,
    Text,
    ListItem,
    List
} from "native-base"
import styles from "./styles"
import { scaleSize } from "../../ScreenUtil"
import { getViewLogDetail } from '../../../actions/client'



class Counter extends Component {
    static propTypes = {
        getViewLogDetail: PropTypes.func.isRequired,
        // userinfo: PropTypes.object.isRequired,
        // location: PropTypes.object.isRequired,
        datail: PropTypes.object.isRequired
    }
    static defaultProps = {
        // userinfo: {},
        // location: {},
        datail: {}
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            log_id: params.id,
        }
    }

    componentDidMount() {
        Object.keys(this.props.datail).length === 0 && this.props.getViewLogDetail([
            { name: 'log_id', data: this.state.log_id },
        ])
    }
    componentWillMount() {

        this.props.getViewLogDetail([
            { name: 'log_id', data: this.state.log_id },
        ])
    }


    server = (item) => {
        return (
            <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                }}
            >
                <ListItem style={{ marginBottom: scaleSize(12) }} icon>
                    <Left style={{ borderBottomColor: '#fff' }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>{item.text}</Text>
                    </Left>
                    <Body style={{ borderBottomColor: '#fff' }} />
                    <Right style={{ borderBottomColor: '#fff' }}>
                        <Text style={{ fontSize: 14, color: '#000' }}>{item.content}</Text>
                    </Right>
                </ListItem>
            </TouchableOpacity>
        )
    }

    render() {

        const item = this.props.datail
        const datas = Object.keys(item).length > 0 ? [
            {
                text: "看房时间",
                content: item.view_time
            },
            {
                text: "户型",
                content: item.room_num + "室" + item.hall_num + "厅" + item.bathroom_num + "卫"
            },
            {
                text: "面积",
                content: item.area + "平"
            }
        ] : []
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>看房详情</Title>
                    </Body>
                    <Right />
                </Header>
                {Object.keys(item).length === 0 ? <Spinner /> : <Content>
                    <List
                        contentContainerStyle={styles.sectionNear}
                        dataArray={datas}
                        renderRow={this.server}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <ListItem style={{ marginBottom: scaleSize(12) }} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Text style={{ fontSize: 14, color: '#666' }}>备注</Text>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} />
                        <Right style={{ borderBottomColor: '#fff' }} />
                    </ListItem>
                    <ListItem style={{ marginBottom: scaleSize(12) }} icon>
                        <Left style={{ borderBottomColor: '#fff' }} />
                        <Body style={{ borderBottomColor: '#fff' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>{item.remark}</Text>
                        </Body>
                        <Right style={{ borderBottomColor: '#fff' }} />
                    </ListItem>
                </Content>}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    datail: state.client.datail,
    // location: state.location.location,
    // token: state.user.token,
    // pay: state.balance.data,

})

export default connect(mapStateToProps, { getViewLogDetail })(Counter)
