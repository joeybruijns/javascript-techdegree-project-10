import React, {Component} from 'react';

import Form from '../Form';

export default class UpdateCourse extends Component {
    state = {
        courseID: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        courseUser: '',
        userID: '',
        userName: '',
        errors: []
    }

    /**
     * Get the right course info from the database when the component loads
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const {context} = this.props;
        const {id} = this.props.match.params;
        context.data.getCourseDetails(id)
            .then((response) => {

                if (response) {
                    if (response.course.user.id !== context.authenticatedUser.id) {
                        this.props.history.push('/forbidden');
                    } else {
                        this.setState(() => {
                            return {
                                courseID: response.course.id,
                                title: response.course.title,
                                description: response.course.description,
                                estimatedTime: response.course.estimatedTime,
                                materialsNeeded: response.course.materialsNeeded,
                                courseUser: response.course.user,
                                userID: context.authenticatedUser.id,
                                userName: `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`
                            }
                        });
                    }
                } else {
                    this.props.history.push('/notfound');
                }
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
     * Submit the updated course to the API
     */
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

        // updated course payload
        const course = {
            courseID,
            title,
            description,
            estimatedTime,
            materialsNeeded
        };

        /**
         * Send request to the API to update a course
         * @param{string} courseID - The ID of the current course
         * @param{object} course - Contains the course to submit
         * @param{string} emailAddress - User email
         * @param{string} password - User password
         */
        context.data.updateCourse(courseID, course, userEmail, userPassword)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors});
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

    /**
     * Cancel updating the course and redirect to the home route
     */
    cancel = () => {
        const courseID = this.state.courseID;
        this.props.history.push(`/courses/${courseID}`);
    }
}
