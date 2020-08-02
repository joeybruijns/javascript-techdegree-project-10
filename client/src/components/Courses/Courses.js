import React, {Component} from 'react';

import CourseComponent from "./CourseComponent";
import NotFound from "../Errors/NotFound";

export default class Courses extends Component {
    state = {
        courses: []
    }

    async componentDidMount() {
        const {context} = this.props;
        context.data.getCourses()
            .then((response) => {
                this.setState({courses: response.courses});
            });
    }

    render() {
        let allCourses;
        if (this.state.courses.length > 0) {
            allCourses = this.state.courses.map((course) =>
                <CourseComponent
                    key={course.id}
                    title={course.title}
                    link={`/courses/${course.id}`}
                />
            );
        } else {
            allCourses = <NotFound />
        }

        return (
            <div className="bounds">
                {allCourses}
            </div>
        )
    };
};
