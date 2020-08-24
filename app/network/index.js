import {
    Linking
    /* AsyncStorage */
} from 'react-native'
// import Config from 'react-native-config'
import Toast from '../tool/toast' 
export const Config = {
    API_URL: 'https://www.fzguan.com',
    // API_URL: 'http://fang.ofan.cn',
    // API_URL: 'http://fang.xuai.cn',
    AUTHORIZATION: 'b0bbf5d37c9fc25b27c644f2e49fe0de'
}

export const fetchPost = (url, body, headers = {}) => {
    return new Promise((fulfill, reject) => {
        let apiurl = Config.API_URL + url
        headers['Authorization'] = Config.AUTHORIZATION
        // headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // headers['Platform'] = Platform.OS
        return fetch(apiurl, {
            method: 'POST',
            headers: headers,
            body: body ? JSON.stringify(body) : '',
            timeout: 5,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                fulfill(responseJson)
            })
            .catch((error) => {
                Toast.warning("服务器超时!")
                reject()
            })
    })
}

export const FormDataPost = (url, data, headers = {}) => {
    return new Promise((fulfill, reject) => {
        let apiurl = Config.API_URL + url
        let formData = new FormData()
        for (let x in data) {
            formData.append(data[x].name, data[x].data)
        }

        headers['Authorization'] = Config.AUTHORIZATION
        // headers['Content-Type'] = 'multipart/form-data'
        return fetch(apiurl, {
            method: 'POST',
            headers: headers,
            body: formData,
            timeout: 30
        })
            .then((response) => response.json())
            .then((responseJson) => {
                fulfill(responseJson)
            })
            .catch((error) => {
                Toast.warning("服务器超时!")
                reject()
            })
    })
}

export const fetchLinking = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url)
        } else {
            return Linking.openURL(url)
        }
    }).catch(err => console.error('An error occurred', err))
}
