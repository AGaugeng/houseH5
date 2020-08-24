import { NavigationActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef
}

function navigate(options) {
    _navigator.navigate(options)
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
}