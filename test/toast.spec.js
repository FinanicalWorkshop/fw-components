import assert from 'assert'
import React from 'react'
import Toast from '../react/toast.js'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

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