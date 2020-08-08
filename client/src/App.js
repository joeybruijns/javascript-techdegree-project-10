import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Header from "./components/Header";
import Courses from "./components/Courses/Courses";
import CourseDetails from "./components/Courses/CourseDetails";
import CreateCourse from "./components/Courses/CreateCourse";
import UpdateCourse from "./components/Courses/UpdateCourse";
import UserSignUp from "./components/Login/UserSignUp";
import UserSignIn from "./components/Login/UserSignIn";
import UserSignOut from "./components/Login/UserSignOut";
import Error from "./components/Errors/Error";
import Forbidden from "./components/Errors/Forbidden";
import NotFound from "./components/Errors/NotFound";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <HeaderWithContext/>
                    <Switch>
                        <Redirect exact from="/" to="/courses"/>
                        <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
                        <Route path="/courses/:id" component={CourseDetailsWithContext}/>
                        <Route path="/courses" component={CoursesWithContext}/>
                        <Route path="/signin" component={UserSignInWithContext}/>
                        <Route path="/signup" component={UserSignUpWithContext}/>
                        <Route path="/signout" component={UserSignOutWithContext}/>
                        <Route path="/error" component={Error}/>
                        <Route path="/forbidden" component={Forbidden}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
