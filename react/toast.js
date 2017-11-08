import React, { Component } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'

class Toast extends Component {
    static defaultProps = {
        duration: 2000,
        animation: 200
    }

    constructor() {
        super()
        this.state = { opacity: 0 }
    }

    componentDidMount() {
        this.timer = setTimeout(this.hideHandler, this.props.duration)
        this.setState({
            opacity: '1'
        })
    }

    hideHandler = () => {
        this.setState({ opacity: 0 });
        setTimeout(() =>
            unmountComponentAtNode(this.props.mountedNode), this.props.animation)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.props.unMountToast && this.props.unMountToast();
    }

    render() {
        let style = {
            position: "fixed",
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            WebkitTransform: "translate(-50%,-50%)",
            padding: "18px 28px",
            color: "#fff",
            fontSize: "28px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            transition: `opacity ${this.props.animation}ms ease-in-out`,
            opacity: this.state.opacity,
            borderRadius: "5px",
            zIndex: "99"
        }

        return <div style={style}>
            {this.props.text}
        </div>
    }
}

Toast.propTypes = {
    text: PropTypes.string,
    mountedNode: PropTypes.object, // 被挂载的dom 节点
    duration: PropTypes.number, // 显示时间
    animation: PropTypes.number // 消失时的动画时间
}

export default Toast
