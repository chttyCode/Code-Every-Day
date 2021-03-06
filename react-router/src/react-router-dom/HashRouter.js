import React, { Component } from "react";

import RouterContext from '../context'

export default class Router extends Component{
    state={
        location:{
            pathname: window.location.hash.slice(1)|| '/',
            state:null
        }
    }
    componentDidMount(){
        window.addEventListener('hashchange',()=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.hash.slice(1),
                    state:this.locationState
                }
            })
        })
        window.location.hash = window.location.hash.slice(1) || '/'
    }
    render(){
        let that=this
        let value={
            location:that.state.location,
            history:{
                push(to){
                    if(that.block){
                        let allow = window.confirm(that.block(that.state.location))
                        if(!allow)return
                    }
                    if(typeof to === 'object'){
                        let {pathname,state} = to
                        that.locationState=state
                        return window.location.hash=pathname
                    }
                    window.location.hash=to
                },
                block(message){
                    that.block=message
                }
            }
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}