/**
 * 4.引导页
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, Dimensions, Image, View, FlatList, } from 'react-native'
import { Header, Button, Left, Right, Icon, Body, Title } from 'native-base'
export default class patientPayentDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    render() {
        return (
           
                <View>
                    <View style={doctorListStyle.hospitalList}>
                        <View style={doctorListStyle.content}>
                            <Image source={this.props.imgUrl} style={{ width: 315, height: 239 }} />
                        </View>
                    </View>
                    <View style={doctorListStyle.hospitalList}>
                        <View style={doctorListStyle.row}>
                            <Text style={doctorListStyle.title}>{this.props.title}</Text>
                        </View>
                        <View style={doctorListStyle.row}>
                            <Text style={doctorListStyle.text}>{this.props.text1}</Text>
                            <Text style={doctorListStyle.text}>&nbsp&nbsp</Text>
                            <Text style={doctorListStyle.text}>{this.props.text2}</Text>
                        </View>
                    </View>
                    <View style={doctorListStyle.hospitalList}>
                        <Button transparent  style={[doctorListStyle.bgColor,{backgroundColor:this.props.bgColor}]}>
                            <Text style={doctorListStyle.login}>立即体验</Text>
                        </Button>
                    </View>
                 
                </View>
           
        )
    }

}

const doctorListStyle = StyleSheet.create({
    row: {

        flexDirection: 'row',
        justifyContent: 'center',
    },
    hospitalList: {
        marginTop: 28,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: 18,
        paddingBottom: 17,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        color: '#333',


    },
    text: {
        fontSize: 16,
        color: '#36a7ff',

    },

    content: {
        marginTop: 20,
        borderRadius: 10,
      
    },
    bgColor: {
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.44,
        // backgroundColor: '#fff',

        marginLeft: 88,
    },
    login: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        marginLeft: Dimensions.get('window').width * 0.13,
    },
})