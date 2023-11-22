import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/StudentList'
const appkey = "demo13_1545210570249";


async function fetchAllStudents() {
    const stus = await fetch("http://api.duyiedu.com/api/student/findAll?appkey=" + appkey)
        .then(resp => resp.json()).then(resp => resp.data)
    return stus;
}

async function render(){
    ReactDOM.render("请稍等",document.getElementById('root'));
    const allStu = await fetchAllStudents();
    ReactDOM.render(<App allStu={[...allStu]}></App>,document.getElementById('root'));
}
render();
