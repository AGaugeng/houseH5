import { LOGIN, LOGOUT, WX_REGISTER, WX_BIND, OLD_LOGIN } from '../../actions/actionTypes'
import { NavigationActions } from 'react-navigation/lib/react-navigation.js'
import AppNavigator from '../../screens/Router'

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("Loading")
);

function nav(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                // NavigationActions.back(),
                NavigationActions.navigate({ routeName: 'Welcome' }),
                state
            );
            break;
        case LOGOUT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Logout' }),
                state
            );
            break;
        case WX_REGISTER:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Registration' }),
                state
            );
            break;

        case WX_BIND:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'WxBind' }),
                state
            );
            break;
        case OLD_LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'OldLogin' }),
                state
            );
            break;

        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}
export default nav;
