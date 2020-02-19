import React , {Component} from 'react';
import Page from "./Page"
import StudentList from "./StudentList"
import Modal from "./Modal"
import PageSel from "./Page"
export default class PageTest extends Component{

    state = {
        current: 1,
        total: 0,
        limit: 10,
        panelNumber: 5,
        students: [],
        isLoading: false
    }

    constructor(props) {
        super(props);
        this.fetchStudents();
    }

    async fetchStudents() {
        this.setState({
            isLoading: true
        })
        console.log(this.state.current)
        const resp = await fetch(`http://api.duyiedu.com/api/student/findByPage?appkey=demo13_1545210570249&page=${this.state.current}&size=${this.state.limit}`)
            .then(resp => resp.json())
            .then(resp => resp.data);
        this.setState({
            total: resp.cont,
            students: resp.findByPage,
            isLoading: false
        })
    }

    handleChange = (newPage) => {
        this.setState({
            current: newPage
        },this.fetchStudents)
    }

    render() {
        return <>
            <StudentList allStu = {this.state.students}></StudentList>
            <PageSel handleChange = {this.handleChange} {...this.state}> </PageSel>
            <Modal isLoading = {this.state.isLoading}></Modal>
            </>
    }

}