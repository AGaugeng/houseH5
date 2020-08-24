/*
 * @Author: Song
 * @Date: 2018-09-27 10:45:54
 * @LastEditors: Song
 * @LastEditTime: 2018-12-04 11:10:23
 * @Description: IG牛逼
 * * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

import {
    Dimensions,
    PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */

export function setSpText(size: number) {
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size / defaultPixel;
}

Date.prototype.format = function (format) {
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};


var imgUrl = 'http://www.baidu.com/images/share.jpg';  // 分享后展示的一张图片
var lineLink = 'http://www.baidu.com'; // 点击分享后跳转的页面地址
var descContent = "描述信息";  // 分享后的描述信息
var shareTitle = '标题';  // 分享后的标题
var appid = '';  //应用id,如果有可以填，没有就留空


export const shareFriend = () => {
    window.WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function (res) {
        //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
    })

}

export const shareTimeline = () => {
    window.WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function (res) {
        //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉

    });
}

export const shareWeibo = () => {
    window.WeixinJSBridge.invoke('shareWeibo', {
        "content": descContent,
        "url": lineLink,
    }, function (res) {
        //_report('weibo', res.err_msg);
    });

}
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    window.WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        shareFriend();
    });

    // 分享到朋友圈
    window.WeixinJSBridge.on('menu:share:timeline', function (argv) {
        shareTimeline();
    });
    // 分享到微博
    window.WeixinJSBridge.on('menu:share:weibo', function (argv) {
        shareWeibo();
    });
}, false);


export const toDate = (timestamp: Number, format1 = 'yyyy-MM-dd hh:mm:ss') => {
    try {
        if (timestamp > 10000) {
            let date = new Date();
            date.setTime(timestamp * 1000);
            return date.format(format1);//2014-07-10 10:21:12
        } else {
            return ''
        }
    } catch (erro) {
        return ''
    }
    return ''
}

export const isWeixin = () => { //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

export function scaleSize(size: number) {

    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}
