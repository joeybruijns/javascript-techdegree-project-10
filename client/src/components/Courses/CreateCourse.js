import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Form from '../Form';

export default class CreateCourse extends Component {
    state = {
        authenticatedUser: this.props.context.authenticatedUser, // DELETE??
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: [],
        userID: '',
        userName: '',
        errors: []
    }

    // async componentDidMount() {
    //     const {context} = this.props;
    //     this.setState(() => {
    //         return {
    //             userID: context.authenticatedUser.id,
    //             userName: `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
    //         };
    //     })
    // }

    render() {
        const {
            authenticatedUser,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userName,
            errors
        } = this.state

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/*<div>*/}
                    {/*    <h2 className="validation--errors--label">Validation errors</h2>*/}
                    {/*    <div className="validation-errors">*/}
                    {/*        <ul>*/}
                    {/*            <li>Please provide a value for "Title"</li>*/}
                    {/*            <li>Please provide a value for "Description"</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div><input
                                            id="title"
                                            name="title"
                                            type="text"
                                            // value={title}
                                            onChange={this.change}
                                            placeholder="Course title..."
                                        /></div>
                                        <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div><textarea
                                            id="description"
                                            name="description"
                                            // value={description}
                                            onChange={this.change}
                                            placeholder="Course description..."
                                        /></div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div><input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    // value={estimatedTime}
                                                    onChange={this.change}
                                                    placeholder="Hours..."
                                                /></div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div><textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    // value={materialsNeeded}
                                                    onChange={this.change}
                                                    placeholder="List materials..."
                                                /></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        )
    };


    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
           return (
             [name]: value
           );
        });
    }

    submit = () => {
        const {context} = this.props;
        // const authenticatedUser = context.authenticatedUser;
        const userEmail = context.authenticatedUser.emailAddress;
        const userPassword = context.authenticatedUser.password;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userID
        } = this.state;

        // New course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userID
        };

        context.data.createCourse(course, userEmail, userPassword)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    console.log('Course successfully created!');
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }
};
