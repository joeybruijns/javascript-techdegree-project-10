import React, {Component} from 'react';

const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends Component {
    state = {
        courseUser: {},
        courseDetails: {},
        authenticatedUser: this.props.context.authenticatedUser
    }

    /**
     * Get the right course info from the database when the component loads
     */
    async componentDidMount() {
        const {context} = this.props;
        const {id} = this.props.match.params;
        context.data.getCourseDetails(id)
            .then((response) => {
                if (response) {
                    this.setState({
                        courseUser: response.course.user,
                        courseDetails: response.course
                    });
                } else {
                    this.props.history.push('/notfound');
                }
            })
            .catch(errors => {
                console.log(errors);
                this.props.history.push('/error');
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
                            {<ReactMarkdown source={course.description}/>}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    {course.estimatedTime ?
                                        <h3>{course.estimatedTime} hours</h3>
                                        :
                                        <h3>-</h3>
                                    }
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    {<ReactMarkdown source={course.materialsNeeded}/>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    /**
     * Hide or show the update and delete button, depending if the user is authorized or not
     * @returns {JSX.Element}
     */
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

    /**
     * Delete the course if the user is authorizes to do so
     */
    deleteCourse = () => {
        const {context} = this.props;
        const userEmail = this.state.authenticatedUser.emailAddress;
        const userPassword = this.state.authenticatedUser.password;
        const userID = this.state.authenticatedUser.id;
        const userCourseID = this.state.courseUser.id;
        const courseID = this.state.courseDetails.id;
        const courseName = this.state.courseDetails.title;

        if (userID === userCourseID) {
            context.data.deleteCourse(courseID, userEmail, userPassword)
                .then(response => {
                    if (response) {
                        console.log(`Course: "${courseName}" has been deleted...`);
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
