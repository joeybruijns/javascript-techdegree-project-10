import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Form from '../Form';

export default class UpdateCourse extends Component {
    state = {
        courseID: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userID: '',
        userName: '',
        errors: []
    }

    async componentDidMount() {
        const {context} = this.props;
        const {id} = this.props.match.params;
        context.data.getCourseDetails(id)
            .then((response) => {

                this.setState(() => {
                    return {
                        courseID: response.course.id,
                        title: response.course.title,
                        description: response.course.description,
                        estimatedTime: response.course.estimatedTime,
                        materialsNeeded: response.course.materialsNeeded,
                        userID: context.authenticatedUser.id,
                        userName: `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
                    }
                });
            });
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userName,
            errors
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={title}
                                        onChange={this.change}
                                        className="input-title course--title--input"
                                        placeholder="Course title..."
                                    /></div>
                                    <p>By {userName}</p>
                                </div>
                                <div className="course--description">
                                    <div><textarea
                                        id="description"
                                        name="description"
                                        defaultValue={description}
                                        onChange={this.change}
                                        className="course--description"
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
                                                defaultValue={estimatedTime}
                                                onChange={this.change}
                                                className="course--time--input"
                                                placeholder="Hours..."
                                            /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                defaultValue={materialsNeeded}
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
        );
    };

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
        const {context} = this.props;
        const userEmail = context.authenticatedUser.emailAddress;
        const userPassword = context.authenticatedUser.password;

        const {
            courseID,
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        // Updated course payload
        const course = {
            courseID,
            title,
            description,
            estimatedTime,
            materialsNeeded
        };

        context.data.updateCourse(courseID, course, userEmail, userPassword)
            .then(errors => {
                if (errors.length) {
                    // this.setState({errors});
                    this.props.history.push('/forbidden');
                } else {
                    console.log('Course successfully updated!');
                    this.props.history.push(`/courses/${courseID}`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        const courseID = this.state.courseID;
        this.props.history.push(`/courses/${courseID}`);
    }
}
