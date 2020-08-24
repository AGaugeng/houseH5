/**
 * 1.登录-导航
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import { createStackNavigator } from 'react-navigation'
import Loading from "./Loading/index"
import Guide from "./Guide/index"
import Registration from "./Login/registration"
import Login from "./Login/Login"
import RetrievePassword from "./Login/retrievePassword"
export default createStackNavigator(
    {
        Loading,
        Guide,
        Registration,
        Login,
        RetrievePassword
    },
    {
        initialRouteName: 'Loading',
        headerMode: 'none'
    })