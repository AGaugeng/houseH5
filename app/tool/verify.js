// 是否电话号码
export const isPhoneNumber = (phoneNumber) => {
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    return reg.test(phoneNumber) ? true : false
}

/* // 密码
export const isPassword = (password) => {
    let reg = /^\d{6,10}$/
    return reg.test(password) ? true : false
} */
// 文本
// if (preg_match('/([\x{4e00}-\x{9fa5}])\1{2,}/u', $remarks) || preg_match('/(.)\1{2,}/u', $remarks) || mb_strlen($remarks) < 15) {
export const isText = (text) => {
    let reg1 = /^([\u4e00-\u9fa5])\1{2,}/u
    let reg2 = /(.)\1{2,}/u
    if (reg1.test(text) || reg2.test(text)) {
        return true;
    } else {
        return false;
    }
}


// export const isText = (text) => {
//     // let reg = /^.*(\w)\\1{2,}.*$|^.*[^\w]{2,}.*$/
//     // 
//     let reg = /([\x{4e00}\-\x{9fa5}])\1{2,}/u
//     // let reg = /(.)\1{2,}/     | /(.)\1{2,}/u

//     return reg.test(text)
// }

export const isPayPassword = (password) => {
    let reg = /^\d{6}$/
    return reg.test(password) ? true : false
}

export const isShiba = (coupon) => {
    let reg = /^shiba:.*$/
    return reg.test(coupon) ? true : false
}
export const isShibaCoupon = (coupon) => {
    let reg = /^shiba:coupon:.*$/
    return reg.test(coupon) ? true : false
}
export const isShibaCouponGroup = (coupon) => {
    let reg = /^shiba:coupongroup:.*$/
    return reg.test(coupon) ? true : false
}

export const isURL = (url) => {
    let reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
    return reg.test(url) ? true : false
}