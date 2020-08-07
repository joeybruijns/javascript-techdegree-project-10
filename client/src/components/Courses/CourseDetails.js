import React, {Component} from 'react';

import NotFound from "../Errors/NotFound";

export default class CourseDetails extends Component {
    state = {
        courseUser: {},
        courseDetails: {},
        authenticatedUser: this.props.context.authenticatedUser
    }

    async componentDidMount() {
        const {context} = this.props;
        const {id} = this.props.match.params;
        context.data.getCourseDetails(id)
            .then((response) => {
                this.setState({
                    courseUser: response.course.user,
                    courseDetails: response.course
                });
            });
    }

    render() {
        const user = this.state.courseUser;
        const course = this.state.courseDetails;

        return (
            <div>
                {this.authenticationLevel()}
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {user.firstName} {user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{course.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3> {course.estimatedTime} hours</h3> {/*TODO: fix displaying for 0 hours*/}
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4> {/*TODO: fix rendering*/}
                                    <ul>
                                        {/*{course.materialsNeeded.map((item, i) => <li key={i}>{item}</li>)}*/}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    // hide or show the edit/delete button, depends if the user is authorized
    authenticationLevel = () => {
        const userAuth = this.props.context.authenticatedUser;

        if (userAuth && this.state.courseUser.id === userAuth.id) {
            return (
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href={this.props.location.pathname + '/update'}>Update Course</a>
                                <a className="button" href="#" onClick={this.deleteCourse}>Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
            );
        }
    }

    deleteCourse = (event) => {
        event.preventDefault();

        const {context} = this.props;
        const userEmail = this.state.authenticatedUser.emailAddress;
        const userPassword = this.state.authenticatedUser.password;
        const userID = this.state.authenticatedUser.id;
        const userCourseID = this.state.courseUser.id;
        const courseID = this.state.courseDetails.id;

        if (userID === userCourseID) {
            context.data.deleteCourse(courseID, userEmail, userPassword)
                .then(response => {
                    if (response) {
                        console.log(response);
                        this.props.history.push('/');
                    } else {
                        this.props.history.push('/forbidden');
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.props.history.push('/error');
                });
        } else {
            this.props.history.push('/forbidden');
        }
    }
}
