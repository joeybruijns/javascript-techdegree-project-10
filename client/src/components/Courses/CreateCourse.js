import React, {Component} from 'react';

import Form from '../Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userID: '',
        userName: '',
        errors: []
    }

    /**
     * Set state for userID and userName when component loads
     */
    async componentDidMount() {
        const {context} = this.props;
        this.setState(() => {
            return {
                userID: context.authenticatedUser.id,
                userName: `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
            };
        })
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
                <h1>Create Course</h1>
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
                                        value={title}
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
                                        value={description}
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
                                                value={estimatedTime}
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
                                                value={materialsNeeded}
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
     * Submit the new course to the API
     */
    submit = () => {
        const {context} = this.props;
        const userEmail = context.authenticatedUser.emailAddress;
        const userPassword = context.authenticatedUser.password;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userID
        } = this.state;

        // new course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userID
        };

        /**
         * Send a request to the API creating a new course
         * @param{object} course - contains the course to submit
         * @param{string} emailAddress - user email
         * @param{string} password - user password
         */
        context.data.createCourse(course, userEmail, userPassword)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    console.log('Course successfully created!');
                    this.props.history.push(`/`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    /**
     * Cancel course creation and redirect to the home route
     */
    cancel = () => {
        this.props.history.push('/');
    }
}
