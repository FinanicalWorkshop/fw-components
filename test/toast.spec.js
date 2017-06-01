import assert from 'assert'
import React from 'react'
import { mount, shallow, render } from 'enzyme'
import Toast from '../react/toast.js'

describe('<Toast />', function () {
    it('should has a component named Toast', function () {
        assert.strictEqual(!!Toast, true)
        const wrapper = shallow(<Toast />)
        assert.strictEqual(!!wrapper, true)
    })
    
    it('should show tips', function () {
        const wrapper = shallow(<Toast text={'some text'} />)
        let t = wrapper.find('div')
        assert.strictEqual(t.exists(), true)
        assert.strictEqual(t.text(), 'some text')
    })
})