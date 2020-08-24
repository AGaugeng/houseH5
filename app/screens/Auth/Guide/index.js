/**
 * 1.首页
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react";
import { TouchableHighlight,View, Image } from "react-native";
import Swiper from "react-native-swiper";
import {
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../ScreenUtil"; //自适配大小
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          width: deviceWidth,
          height: deviceHeight
        }}
      >
        {/* showsHorizontalScrollIndicator 当此属性为true的时候，显示一个水平方向的滚动条。 */}
        <Swiper
          height={scaleSize(302)} //组件高度
          width={deviceWidth} //组件宽度
          loop={false}
          //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
          autoplay={true} //自动轮播
          autoplayTimeout={3} //每隔4秒切换
          horizontal={true} //水平方向，为false可设置为竖直方向
          paginationStyle={{ bottom: scaleSize(20) }} //小圆点的位置：距离底部10px
          showsButtons={false} //为false时不显示控制按钮
          showsPagination={true} //为false不显示下方圆点
          dot={
            <View
              style={{
                //未选中的圆点样式
                backgroundColor: "rgba(0,0,0,.2)",
                width: scaleSize(20),
                height: scaleSize(20),
                borderRadius: scaleSize(10),
                marginLeft: scaleSize(10),
                marginRight: scaleSize(10),
                marginTop: scaleSize(20),
                marginBottom: scaleSize(160)
              }}
            />
          }
          activeDot={
            <View
              style={{
                //选中的圆点样式
                backgroundColor: "#007aff",
                width: scaleSize(40),
                height: scaleSize(20),
                borderRadius: scaleSize(10),
                marginLeft: scaleSize(10),
                marginRight: scaleSize(10),
                marginTop: scaleSize(20),
                marginBottom: scaleSize(160)
              }}
            />
          }
        >
          <Image
            source={require("../../../../assets/image/g1.png")}
            style={{
              width: scaleSize(750),
              height: scaleSize(1334)
            }}
          />
          <Image
            source={require("../../../../assets/image/g2.png")}
            style={{
              width: scaleSize(750),
              height: scaleSize(1334)
            }}
          />
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate("CodeLogin")}
          >
            <Image
              source={require("../../../../assets/image/g3.png")}
              style={{
                width: scaleSize(750),
                height: scaleSize(1334)
              }}
            />
          </TouchableHighlight>
        </Swiper>
      </View>
    );
  }
}
