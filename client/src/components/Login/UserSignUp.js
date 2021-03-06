import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from '../Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <React.Fragment>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={this.change}
                                        placeholder="First name..."/>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={this.change}
                                        placeholder="Last name..."/>
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email address..."/>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password..."/>
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }

    /**
     * Update the input fields
     * @param event - Listen for changes on the input fields
     */
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /**
     * Submit the new user to the API
     */
    submit = () => {
        const {context} = this.props;
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        // Create a new user account and sign them in to the app
        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push(from);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });

    }

    /**
     * Cancel user signup and redirect to the home route
     */
    cancel = () => {
        this.props.history.push('/');
    }
}