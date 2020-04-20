import React, {Component} from 'react';
import { Route, Switch, Redirect} from "react-router-dom";

// 页面
import CourseList from './CourseList'
import CourseAdd from './CourseAdd'
import CourseTopic from './CourseTopic'
import CourseCategory from './CourseCategory'

class CourseRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/course/list" component={CourseList}/>
                <Route path="/course/add" component={CourseAdd}/>
                <Route path="/course/topic" component={CourseTopic}/>
                <Route path="/course/category" component={CourseCategory}/>
                <Redirect exact form="/course" to="/course/list"/>
            </Switch>
        );
    }
}

export default CourseRouter;