import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import app from "./App"
export const {apply}  =  app;

function News(props) {
    console.log(props.match)
    return <div>
        <p>显示{props.match.params.year}年{props.match.params.month}月{props.match.params.day}日的新闻</p>
    </div>
}

export default function NotFound() {
    console.log(app)
    return <h1>找不到页面</h1>
}

