import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'

function getStyles(rotate) {

    let _style_loader = {
        position: 'relative',
        borderTop: '14px solid rgba(255, 255, 255, 0.2)',
        borderRight: '14px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '14px solid rgba(255, 255, 255, 0.2)',
        borderLeft: '14px solid #ffffff',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        top: '50%',
        left: '50%',
        transition: 'all 200ms linear',
        opacity: rotate > 0 ? '1' : '0',
        transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
    }

    let _style_small_loader = {
        position: 'fixed',
        width: '30px',
        height: '30px',
        top: '20px',
        right: '30px',
        opacity: '0.3',
        borderTop: '8px solid rgba(255, 255, 255, 0.2)',
        borderRight: '8px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '8px solid rgba(255, 255, 255, 0.2)',
        borderLeft: '8px solid #e8e8e8',
        borderRadius: '50%',
        transition: 'all 200ms linear',
        transform: `rotate(${rotate}deg)`,
    }

    let _style_bg = {
        zIndex: 99,
        position: 'fixed',
        right: 0,
        bottom: 0,
        borderRadius: '30px',
        width: '160px',
        height: '160px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: 'rgba(0,0,0,0.3)'
    }

    let _style_block = {
        zIndex: 999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(160,160,160,0.1)'
    }

    return {
        block: _style_block,
        bg: _style_bg,
        loader: _style_loader,
        small_loader: _style_small_loader
    }
}

class CircleLoading extends Component {
    static defaultProps = {
        theme: ''
    }

    state = {
        rotate: 0
    }

    componentDidMount = () => {
        this._timer = setInterval(() =>
            this.setState({ rotate: this.state.rotate + 36 }), 200)
    }

    componentWillUnmount = () => {
        clearInterval(this._timer)
        this.props.unMountHandler && this.props.unMountHandler();
    }

    render() {
        let { theme } = this.props;
        let styles = getStyles(this.state.rotate)

        let big_circle = <div className="_style_big_circle" style={styles.bg}>
            <div style={styles.loader}></div>
        </div>;

        let small_circle = <div className="_style_small_circle" style={styles.small_loader}></div>;

        return <div className="_style_block_background" style={theme == 'block' ? styles.block : {}}>
            {theme != 'tiny' && big_circle}
            {small_circle}
        </div>
    }
}

CircleLoading.propTypes = {
    /*
    mini : 标准loading 样式, 
    tiny: 只在右上角有一个小圆圈, 
    block: loading过程中, 覆盖住后面的元素, 使之不能点击

    3种 theme, 之间有一种冲突情况: 不能同时选择 tiny 和 block (设计缺陷?) , 
    因为不会出现这种情况, 所以不重要
     */
    theme: PropTypes.string 
}

export default CircleLoading
