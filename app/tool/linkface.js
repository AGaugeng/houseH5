import { NativeModules, Platform } from 'react-native'

const { RNKitLinkFace } = NativeModules


export const LinkFaceStart = (outType, Complexity, sequence, order = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Platform.OS === 'android' && order === true ? RNKitLinkFace.startOrder({ outType, Complexity, sequence }) : RNKitLinkFace.start({ outType, Complexity, sequence });
            resolve(result);
        } catch (error) {
            reject(error.message);
        }
    });
}

export const LinkFaceclean = () => {
    RNKitLinkFace.clean();
}
