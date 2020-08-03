import React from 'react';

export default class Header extends React.PureComponent {
    render() {
        const {context} = this.props;
        const userAuth = context.authenticateUser;

        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        {userAuth ? (
                            <React.Fragment>
                                <span>Welcome, [NAME]</span>
                                <a className="signin" href="/users/signout">Sign Out</a>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <a className="signup" href="/users/signup">Sign Up</a>
                                <a className="signin" href="/users/signin">Sign In</a>
                            </React.Fragment>
                        )}
                    </nav>
                </div>
            </div>
        )
    }
};

