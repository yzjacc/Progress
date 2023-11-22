//用于匹配路由，并将匹配的结果放入到上下文中
import React, { Component } from 'react'
import ctx from "./RouterContext";
import matchPath from "./matchPath";

export default class Route extends Component {

    /*
    path：路径规则，可以是字符串，可以是字符串数组
    children：无论是否匹配，都应该渲染的子元素
    render：匹配成功后，渲染函数
    component：匹配成功后，渲染的组件

    以下是调用matchPath方法时的配置
    exact
    strict
    sensitive
    */

    /**
     * 在上下文提供者内部渲染的内容
     * @param {*} ctx 
     */
    renderChildren(ctx) {
        //children有值
        if (this.props.children !== undefined && this.props.children !== null) {
            //无论是否匹配都要渲染
            if (typeof this.props.children === "function") {
                return this.props.children(ctx);
            }
            else {
                return this.props.children;
            }
        }
        //children没有值
        if (!ctx.match) {
            //没有匹配
            return null;
        }
        //匹配了
        //render有值
        if (typeof this.props.render === "function") {
            return this.props.render(ctx);
        }
        //只有component有值
        if (this.props.component) {
            const Component = this.props.component;
            return <Component {...ctx} />
        }
        return null;
    }

    /**
     * 根据指定的location对象，返回match对象
     */
    matchRoute(location) {
        const { exact = false, strict = false, sensitive = false } = this.props;
        return matchPath(this.props.path || "/", location.pathname, {
            exact,
            strict,
            sensitive
        })
    }
    /**
     * 上下文中消费者函数
     */
    consumerFunc = (value) => {
        const ctxValue = {
            history: value.history,
            location: value.location,
            match: this.matchRoute(value.location)
        }
        return <ctx.Provider value={ctxValue}>
            {this.renderChildren(ctxValue)}
        </ctx.Provider>
    }



    render() {
        return <ctx.Consumer>
            {this.consumerFunc}
        </ctx.Consumer>
    }
}
