import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import AREA_DATA from '../data/area.js'

let createTemporaryDOMNode = function (id) {
    let node = document.getElementById(id)
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node
}

const STYLE = {
    bg: {
        position: 'fixed',
        zIndex: '9999',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'rgba(0, 0, 0, 0.3)',
        fontSize: '24px',
        color: '#333'
    },
    panel: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '670px',
        background: 'white'
    },
    btnConfirm: {
        position: 'absolute',
        display: 'block',
        top: '10px',
        right: '30px',
        border: '1px solid #eee',
        borderRadius: '6px',
        textAlign: 'center',
        lineHeight: '50px',
        height: '50px',
        width: '80px',
        background: 'white'
    },
    selected:{
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        height: '68px',
        lineHeight: '70px',
        paddingLeft: '30px',
        background: '#f8f8f8'
    },
    options: {
        height: '600px',
        overflow: 'scroll'
    },
    selectedArea: {
        display: 'inline-block',
        marginRight: '15px',
        fontWeight: 'bold'
    },
    area: {
        boxSizing: 'border-box',
        borderBottom: '1px solid #f0f0f0',
        lineHeight: '65px',
        marginLeft: '20px',
        paddingLeft: '10px'
    },
    checkedArea: {
        float: 'right',
        color: '#999',
        lineHeight: '65px',
        marginRight: '30px'
    }
}

class AreaSelector extends React.Component {

    constructor(props) {
        super(props)

        let { selected } = this.props

        this.state = {
            // selected: ['北京', '北京', '东城区'],
            // order: 2
            selected: selected,
            order: Math.max(selected.length - 1, 0)
        }
    }

    hideHandler = () => {
        unmountComponentAtNode(this.props.mountedNode)
    }

    componentWillUnmount() {
        let { selected } = this.state,
            data = selected.length ? selected : null
        this.props.unmountHandler(data)
    }

    getAreaOptions = () => {
        let { selected, order } = this.state, options = AREA_DATA.slice(0)

        for (let i = 0; i < order; i++) {
            let names = options.map(x => x.name || x)
            let o = names.indexOf(selected[i])

            let area = options[o] && options[o].area
            if (Array.isArray(area)) options = area
        }

        return options.map(x => x.name || x)
    }

    selectHandler = area => {
        let { selected, order } = this.state
        // 下面两行不像看起来那么简单, 不要轻举妄动
        selected[this.state.order] = area
        selected = selected.slice(0, this.state.order + 1)

        // 判断是否到了最后一级
        let t_a = AREA_DATA.slice(0), t_o = 0, touchend = false

        for (let i = 0; i < selected.length; i++) {
            let names = t_a.map(x => x.name || x),
                t_s = names.indexOf(selected[i])

            if (t_s < 0) break;
            t_a = t_a[t_s].area

            if(!t_a) {
                touchend = true
                break
            }
            t_o++
        }

        this.setState({
            selected: selected,
            order: t_o
        }, ()=>{
            if(this.props.autoConfirm && touchend)
                this.confirmHandler()
        })
    }

    orderHandler = order => {
        this.setState({ order: order })
    }

    confirmHandler = () => {
        // hotfix: 如果不延时, 会报异常!?
        setTimeout(this.hideHandler, 80)
    }

    cancelHandler = (event) => {
        if (event.target == event.currentTarget)
            this.setState({ selected: [] }, this.hideHandler)
    }

    touchMoveHandler = (event) => {
        // event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }

    render() {
        let { selected, order } = this.state

        let selected_item = (area, index) => {
            return <div style={STYLE.selectedArea} key={area + index}
                onClick={() => this.orderHandler(index)}>{area}</div>
        }

        let area = (i, index) => {
            return <div style={STYLE.area} key={i} onClick={
                () => this.selectHandler(i)}>{i}
                {selected[order] == i &&
                    <div style={STYLE.checkedArea}>&#10004;</div>}
            </div>
        }

        let styleConfirm = this.props.autoConfirm ? {display: 'none'} : STYLE.btnConfirm

        return <div style={STYLE.bg} onClick={this.cancelHandler}>
            <div style={STYLE.panel} onTouchMove={this.touchMoveHandler}>
                <a style={styleConfirm} onClick={this.confirmHandler}>确定</a>

                <div style={STYLE.selected}>
                    {selected.map(selected_item)}
                </div>
                <div style={STYLE.options}>
                    {this.getAreaOptions().map(area)}
                </div>
            </div>
        </div>
    }
}

AreaSelector.defaultProps = {
    selected: [],
    autoConfirm: false,
    mountedNode: null, // document node to be mounted
    unmountHandler: () => null // 组件卸载时的回调函数
}

let showAreaSelector = function (area_list = [], autoConfirm = false) {
    let id = '_id_react_component_global_area_selector',
        node = createTemporaryDOMNode(id);

    return new Promise((resolve, reject) => {
        render(<AreaSelector
            selected={area_list}
            autoConfirm={autoConfirm}
            mountedNode={node}
            unmountHandler={data => {
                node.parentNode.removeChild(node)
                data ? resolve(data) : reject()
            }}
        />, node)
    })
}

export {
	showAreaSelector
}

