import React from 'react'
import { StyleSheet, Dimensions, Text, View, Modal, ActivityIndicator } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height


export default class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            text: 'Loading...'
        }
    }
    static toastInstance

    static show(text = 'Loading...') {
        this.toastInstance.setState({ 'isShow': true, 'text': text })
    }
    static hide() {
        this.toastInstance.setState({ 'isShow': false })
    }



    render() {
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => { /* alert('Modal has been closed.') */ }}
            >
                <View style={[styles.load_box, this.props.loadingStyle]}>
                    <ActivityIndicator animating={true} color={this.props.color || 'white'} size={'large'} style={styles.load_progress} />
                    <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: '#0008',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH / 2 - 50,
        marginTop: SCREEN_HEIGHT / 2 - 50,
        borderRadius: 10
    },
    load_progress: {
        position: 'absolute',
        width: 100,
        height: 90
    },
    load_text: {
        marginTop: 70,
        color: 'white',
    }
})