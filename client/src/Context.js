import React, {Component} from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const {authenticatedUser} = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    /**
     * Sign a user in if values for email and password match
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<null|undefined>}
     */
    signIn = async (email, password) => {
        const user = await this.data.getUser(email, password);
        if (user !== null) {
            user.email = user.emailAddress;
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        }
        return user;
    }

    /**
     * Sign the user out, set state for authenticatedUser to null ans remove cookies
     */
    signOut = () => {
        this.setState({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context}/>}
            </Context.Consumer>
        );
    }
}

