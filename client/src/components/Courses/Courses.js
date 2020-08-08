import React, {Component} from 'react';

import CourseComponent from "./CourseComponent";

export default class Courses extends Component {
    state = {
        courses: []
    }

    async componentDidMount() {
        const {context} = this.props;
        context.data.getCourses()
            .then((response) => {
                if (response) {
                    this.setState({courses: response.courses});
                } else {
                    this.props.history.push('/error');
                }
            });
    }

    render() {
        let allCourses;
        if (this.state.courses.length) {
            allCourses = this.state.courses.map((course) =>
                <CourseComponent
                    key={course.id}
                    title={course.title}
                    link={`/courses/${course.id}`}
                />
            );
        } else {
            allCourses = null
        }

        return (
            <div className="bounds">
                {allCourses}
                <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13"
                             className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </a></div>
            </div>
        )
    };
};
