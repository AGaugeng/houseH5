import {
    StackNavigator,
} from "react-navigation/lib/react-navigation.js"
import ResoldHouseDetail from "./Home/HouseDetail/"
import NewHouseDetail from "./Home/HouseDetail/new"
import RentalHouseDetail from "./Home/HouseDetail/rental"
import HouseDetail from "./Home/HouseDetail/detail"
import HousePay from "./Home/HouseDetail/housepay"
import Protocol from "./Home/Protocol/"
import Attract from "./Home/Attract/"

import City from "./Home/City/"

import Member from "./Mine/Member/"

import Article from "./Home/Article/"
import ImageDetail from "./Home/ImageDetail"
import ArticleDetail from "./Home/Article/ConsultDetail/"

import MemberProfile from "./Mine/Member/profile"
import MemberProfileEdit from "./Mine/Member/edit"
import MemberJoin from "./Mine/Member/join"
import Collection from "./Mine/Collection"
import Contract from "./Mine/Contract"
import Passenger from "./Mine/Passenger"
import PassengerDetail from "./Mine/Passenger/detail"
import PassengerAdd from "./Mine/Passenger/add"
import PassengerView from "./Mine/Passenger/view"
import PassengerFollow from "./Mine/Passenger/follow"
import MyPassenger from "./Mine/MyPassenger"
import PassengerEdit from "./Mine/Passenger/edit"
// import MyPassengerAdd from "./Mine/MyPassenger/add"
// import MyPassengerView from "./Mine/MyPassenger/view"
// import MyPassengerFollow from "./Mine/MyPassenger/follow"
import Referral from "./Mine/Referral"
import MyReferral from "./Mine/Referral/detail"
import WithdrawDetail from "./Mine/Withdraw/"
import Withdraw from "./Mine/Withdraw/withdraw"
import Transaction from "./Mine/Transaction"
import TransactionDetail from "./Mine/Transaction/detail"
import Setting from "./Mine/Setting/"
import Feedback from "./Mine/Setting/Feedback/"
import Profile from "./Mine/Setting/Profile/"
import ChangeMobile from "./Mine/Setting/ChangeMobile"
import ChangePassword from "./Mine/Setting/ChangePassword/"
import PayPassword from "./Mine/Setting/PayPassword/"
import ResoldHouse from "./Home/ResoldHouse/"
import NewHouse from "./Home/NewHouse/"
import RentalHouse from "./Home/RentalHouse/"
import CommissionSale from "./Home/CommissionSale/"
import CommissionRental from "./Home/CommissionRental/"
import CommissionSaleEdit from "./Home/CommissionSale/edit"
import CommissionRentalEdit from "./Home/CommissionRental/edit"
import CommissionMap from "./Home/CommissionRental/map"

import HouseManage from "./Home/HouseManage"
import Home from "./BottomTab"
import PayMsg from "./Message/pay"
import InformMsg from "./Message/inform"
/* login*/
import Loading from "./Auth/Loading/index"
import Logout from "./Auth/Logout/index"

import Welcome from "./Auth/Welcome/index"
// import Guide from "./Auth/Guide/index"
import Registration from "./Auth/Login/registration"
import AppRegistr from "./Auth/Login/appRegistr"
import OldLogin from "./Auth/Login/"
// import Login from "./Auth/Login/wechat"
import Login from "./Auth/Login/wxLogin"
import WxBind from "./Auth/Login/wxbind"
import RetrievePassword from "./Auth/Login/retrievePassword"

import RegProtocol from "./Auth/Login/protocol"
/* login*/
// import Auth from "./AuthRouter"

const MainScreen = StackNavigator(
    {
        Home: { screen: Home },
        /* 登录*/
        Loading: { screen: Loading },
        Logout: { screen: Logout },

        Welcome: { screen: Welcome },
        Registration: { screen: Registration },
        AppRegistr: { screen: AppRegistr },
        OldLogin: { screen: OldLogin },
        // WxLoad: { screen: WxLoad },
        Login: { screen: Login },
        WxBind: { screen: WxBind },

        RegProtocol: { screen: RegProtocol },
        RetrievePassword: { screen: RetrievePassword },
        /* 首页导航*/
        ResoldHouse: { screen: ResoldHouse },
        NewHouse: { screen: NewHouse },
        RentalHouse: { screen: RentalHouse },
        CommissionSale: { screen: CommissionSale },
        CommissionRental: { screen: CommissionRental },
        CommissionSaleEdit: { screen: CommissionSaleEdit },
        CommissionRentalEdit: { screen: CommissionRentalEdit },
        CommissionMap: { screen: CommissionMap },
        ImageDetail: { screen: ImageDetail },
        Article: { screen: Article },
        ArticleDetail: { screen: ArticleDetail },

        HouseManage: { screen: HouseManage },
        HousePay: { screen: HousePay },
        Attract: { screen: Attract },
        City: { screen: City },
        Protocol: { screen: Protocol },
        /* 首页导航*/
        /* 我的导航*/
        Member: { screen: Member },
        MemberProfile: { screen: MemberProfile },
        MemberProfileEdit: { screen: MemberProfileEdit },
        MemberJoin: { screen: MemberJoin },
        Collection: { screen: Collection },
        Contract: { screen: Contract },
        Passenger: { screen: Passenger },
        PassengerDetail: { screen: PassengerDetail },
        PassengerAdd: { screen: PassengerAdd },
        PassengerEdit: { screen: PassengerEdit },
        PassengerView: { screen: PassengerView },
        PassengerFollow: { screen: PassengerFollow },
        MyPassenger: { screen: MyPassenger },
        // MyPassengerDetail: { screen: MyPassengerDetail },
        // MyPassengerAdd: { screen: MyPassengerAdd },
        // MyPassengerView: { screen: MyPassengerView },
        // MyPassengerFollow: { screen: MyPassengerFollow },

        Referral: { screen: Referral },
        MyReferral: { screen: MyReferral },
        WithdrawDetail: { screen: WithdrawDetail },
        Withdraw: { screen: Withdraw },
        Transaction: { screen: Transaction },
        TransactionDetail: { screen: TransactionDetail },
        Setting: { screen: Setting },
        Feedback: { screen: Feedback },
        Profile: { screen: Profile },
        ChangePassword: { screen: ChangePassword },
        PayPassword: { screen: PayPassword },
        ChangeMobile: { screen: ChangeMobile },

        /* 我的导航*/
        /* 详情*/
        NewHouseDetail: { screen: NewHouseDetail },
        RentalHouseDetail: { screen: RentalHouseDetail },
        ResoldHouseDetail: { screen: ResoldHouseDetail },
        HouseDetail: { screen: HouseDetail },
        InformMsg: { screen: InformMsg },
        PayMsg: { screen: PayMsg },
        /* 详情*/

    },
    {
        initialRouteName: "Auth",
        headerMode: "none"
    }
)

//  () => (
//   <Root>
//     <AppNavigator />
//   </Root>
// )
export default MainScreen;