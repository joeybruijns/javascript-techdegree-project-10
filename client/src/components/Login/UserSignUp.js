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
                                        onChange={this.change}
                                        placeholder="First name..."/>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={this.change}
                                        placeholder="Last name..."/>
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        onChange={this.change}
                                        placeholder="Email address..."/>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.change}
                                        placeholder="Password..."/>
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="users/signin">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        // Create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/courses'); // TODO: adjust path
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });

    }

    cancel = () => {
        this.props.history.push('/');
    }
}