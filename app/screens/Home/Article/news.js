/**
 * 5.发现
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import { setSpText, scaleSize, deviceWidth } from "../../ScreenUtil"//自适配大小
export default class component extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.myNews()

                }}
            >
                <View style={styles.hospitalList}>
                    <View style={styles.hospital}>
                        <Text style={styles.hospitalTitle}>{this.props.content}</Text>
                        <View style={styles.row}>
                            <Text style={styles.grade}>{this.props.news}</Text>
                            <Text>&nbsp;&nbsp;</Text>
                            <Text style={styles.grade}>{this.props.mount}</Text>
                        </View>
                    </View>
                    <View style={styles.Image}>
                        <Image source={this.props.imgUrl} style={styles.image} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },

    image: {
        width: scaleSize(216),
        height: scaleSize(160),
        borderRadius: scaleSize(10)
    },

    hospitalList: {
        flexDirection: 'row',
        marginTop: scaleSize(36),
        justifyContent: 'space-between',
        paddingRight: scaleSize(36),
        paddingLeft: scaleSize(36),
        // width: deviceWidth * 0.9,
        paddingBottom: scaleSize(36),
        borderBottomWidth: 1,
        borderColor: '#eff3f6'
    },
    hospitalTitle: {
        color: '#666',
        fontSize: 14
    },
    grade: {
        marginTop: scaleSize(60),
        fontSize: 13,
        color: '#999'
    },

    hospital: {

        // paddingRight: scaleSize(8),
        width: scaleSize(470)
    },

})
