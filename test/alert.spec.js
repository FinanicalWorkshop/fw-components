import assert from 'assert'
import Alert from '../react/alert.js'
import React from 'react'
import { mount, shallow, render } from 'enzyme'

describe('<Alert />', () => {
    it('it should export Alert component', () => {
        assert(!!Alert, true)
    })
    it('it should calls componentDidMount', () => {
        const wrapper = shallow(<Alert />)
    })
})