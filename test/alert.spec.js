import assert from 'assert'
import Alert from '../react/alert.js'
import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<Alert />', () => {
    it('it should export Alert component', () => {
        assert.strictEqual(!!Alert, true)
        const wrapper = shallow(<Alert />)
        assert.strictEqual(!!wrapper, true)
    })
    it('it should show default tips', () => {
        const wrapper = shallow(<Alert />)
        let a = wrapper.find('a'), t = wrapper.find("._style_alert_text");

        assert.strictEqual(a.exists(), true)
        assert.strictEqual(a.text(), '确定')
        assert.strictEqual(t.text(), '好像出了点问题!?')
    })
    it('it should show specify text', () => {

        const wrapper = shallow(<Alert text="abc" confirmBtnText="def" />)
        let a = wrapper.find('a'), t = wrapper.find("._style_alert_text");

        assert.strictEqual(a.exists(), true)
        assert.strictEqual(a.text(), 'def')
        assert.strictEqual(t.text(), 'abc')

    })
})