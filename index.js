import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'
import Alert from './react/alert.js'
import Toast from './react/toast.js'
import CircleLoading from './react/circle-loading.js'
import BannerGroup from './react/banner-group.js'
import SVGCircleProgress from './react/svg-circle-progress.js'
import Nav from './react/nav.js'

const LOADING_ELEMENT_ID = '_id_react_component_global_loading'

let createTemporaryDOMNode = function (id) {
    let node = document.getElementById(id)
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node
}

let showLoading = function (theme, auto_disappear = false, block = false) {
    let node = createTemporaryDOMNode(LOADING_ELEMENT_ID)
    render(<CircleLoading theme={theme} block={block} unMountHandler={
        () => node.parentNode.removeChild(node)} />, node);

    auto_disappear &&
        setTimeout(() => unmountComponentAtNode(node), 6900);
}

let hideLoading = () => {
    let node = document.getElementById(LOADING_ELEMENT_ID)
    node && unmountComponentAtNode(node)
}

let showAlert = function (title, options) {
    options = options || {};
    let id = '_id_react_component_global_alert',
        node = createTemporaryDOMNode(id);

    return new Promise((resolve, _) => {
        render(<Alert
            text={title}
            confirm_text={'确认'}
            mountedNode={node}
            unMountAlert={() => {
                node.parentNode.removeChild(node)
                resolve()
            }}
        />, node)
    })
}

let showToast = function (text) {
    let id = '_id_react_component_global_toast',
        node = createTemporaryDOMNode(id);

    return new Promise((resolve, _) => {
        render(<Toast
            text={text}
            mountedNode={node}
            unMountToast={() => {
                node.parentNode.removeChild(node)
                resolve()
            }}
        />, node)
    })
}


export {
    createTemporaryDOMNode
    , showAlert
    , showLoading
    , hideLoading
    , showToast
    , CircleLoading
    , BannerGroup
    , Nav
    , SVGCircleProgress
}
