import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import config from './config';

import withContext from "./Context";

const CoursesWithContext = withContext(Courses);

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <p>Test...</p>
                    </header>
                    <Switch>
                        <Redirect exact from="/" to="/courses"/>
                        <Route path="/courses" component={CoursesWithContext}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
