import React, {Component} from 'react';

import NotFound from "../Errors/NotFound";

export default class CourseDetails extends Component {
    state = {
        courseUser: {},
        courseDetail: {}
    }

    async componentDidMount() {
        const {context} = this.props;
        const {id} = this.props.match.params;
        context.data.getCourseDetails(id)
            .then((response) => {
                this.setState({
                    courseUser: response.course.user,
                    courseDetail: response.course
                });
            });
    }

    render() {
        const user = this.state.courseUser;
        const course = this.state.courseDetail;
        // let course;
        // if (this.state.courseDetail) {
        //     course = this.state.courseDetail;
        // } else {
        //     course = <NotFound/>
        // }
        console.log(course);

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href="/">Update Course</a>
                                <a className="button" href="#">Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
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
                                    <h3> {course.estimatedTime} hours</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
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
};
