/**
 * 0.导航页
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from 'react'
import { Image } from 'react-native'
import { Icon } from 'native-base'
import { TabNavigator } from "react-navigation/lib/react-navigation.js";
//展示的页面
import Home from './Home/'
import Nearby from './Nearby/'
import Message from './Message/'
import Mine from './Mine/'
//Tab
import {
    scaleSize,
} from "./ScreenUtil" //自适配大小
const Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon style={{ paddingTop: scaleSize(10), color: focused ? '#e64e37' : '#eee', fontSize: 24 }} type="Foundation" name="home" />

            ),
        },
    },
    Nearby: {
        screen: Nearby,
        navigationOptions: {
            tabBarLabel: '附近门店',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon style={{ paddingTop: scaleSize(10), color: focused ? '#e64e37' : '#eee', fontSize: 24 }} type="MaterialCommunityIcons" name="store" />
            ),
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon style={{ color: focused ? '#e64e37' : '#eee', fontSize: 20 }} type="FontAwesome" name="commenting" />

            ),
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon style={{ paddingTop: scaleSize(10), color: focused ? '#e64e37' : '#eee', fontSize: 24 }} type="Ionicons" name="md-person" />
            ),
        }
    },

}, {
        //设置TabNavigator的位置
        tabBarPosition: 'bottom',
        //是否在更改标签时显示动画   
        animationEnabled: false,
        //是否允许在标签之间进行滑动 ios  无效
        swipeEnabled: false,
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //设置Tab标签的属性
        tabBarOptions: {
            //Android属性
            upperCaseLabel: false,//是否使标签大写，默认为true
            //共有属性
            showIcon: true,//是否显示图标，默认关闭
            showLabel: true,//是否显示label，默认开启
            activeTintColor: '#e64e37',//label和icon的前景色 活跃状态下（选中）
            inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: { //TabNavigator 的背景颜色
                backgroundColor: 'white',
                height: scaleSize(98),
            },
            indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
                height: 0,
            },
            labelStyle: {//文字的样式
                fontSize: 12,
                marginTop: scaleSize(0),
            },
            iconStyle: {//图标的样式

            }
        },
    })
export default Tab