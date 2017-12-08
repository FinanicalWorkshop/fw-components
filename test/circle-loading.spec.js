import assert from 'assert'
import CircleLoading from '../react/circle-loading.js'
import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<CircleLoading />', function () {
    it('it should export CircleLoading component', () => {
        const wrapper = shallow(<CircleLoading />)
        assert.strictEqual(!!wrapper, true)
    })
    
    it('it should has 2 circle', () => {
        const wrapper = shallow(<CircleLoading />)
        let big = wrapper.find("._style_big_circle").exists()
        let small = wrapper.find("._style_small_circle").exists()
        assert.strictEqual(big, true)
        assert.strictEqual(small, true)
    })

    it('it should has 1 circle', () => {
        const wrapper = shallow(<CircleLoading theme="tiny" />)
        let big = wrapper.find("._style_big_circle").exists()
        let small = wrapper.find("._style_small_circle").exists()
        assert.strictEqual(small, true)
        assert.strictEqual(big, false)
    })
})