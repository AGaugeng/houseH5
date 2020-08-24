/**
 * 客源管理
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, Image } from "react-native"
import {
    Container,
    Header,
    Title,
    Tabs,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
    ListItem,
    Tab
} from "native-base"
import styles from "./styles"
import { getClientSell } from '../../../actions/client'
import { scaleSize } from "../../ScreenUtil"
import BuyList from "./buylist"
import RentalList from "./rentallist"
import { getAreaBrother } from '../../../actions/location'
const bgImg = require("../../../assets/mine/passenger/mine@3x.png")

class Counter extends Component {
    // eslint-disable-line
    // 
    static propTypes = {
        getClientSell: PropTypes.func.isRequired,
        getAreaBrother: PropTypes.func.isRequired,
        selllist: PropTypes.array.isRequired,
    }
    static defaultProps = {
        selllist: []
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            nearHouse: params,
            page: 1,
            keyword: '',
            type1: '求购',
            type2: '求租'

        }
    }
    componentWillMount() {
        this.props.getClientSell([
            { name: 'page', data: this.state.page },
            { name: 'keyword', data: this.state.keyword },
            { name: 'purpose_type', data: this.state.type }
        ])
        this.props.getAreaBrother([
            { name: 'province', data: '广东省' },
            { name: 'city', data: '中山市' },
            { name: 'town', data: '古镇镇' }
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
        return (
            <Container style={styles.container}>
                <Header hasTabs >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>客源管理</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity
                            underlayColor="transparent"
                            onPress={() => {
                                this.props.navigation.navigate('MyPassenger')
                            }}
                        >
                            <Icon style={{ color: '#e64e37', fontSize: 24 }} type="Ionicons" name="md-person" />
                     
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Tabs>
                    <Tab heading="求购" style={{ borderBottomWidth: scaleSize(0) }} >
                        <BuyList type='sell' navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="求租" >
                        <RentalList type='rent' navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    selllist: state.client.selllist,

})

export default connect(mapStateToProps, { getClientSell, getAreaBrother })(Counter)
