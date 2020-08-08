import React from 'react';

const CourseComponent = ({title, link}) => {
    return (
        <div className="bounds">
            <div className="grid-33">
                <a className="course--module course--link" href={link}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{title}</h3>
                </a>
            </div>
        </div>
    )
}

export default CourseComponent;
