import assert from 'assert'
import * as Components from '../index.js'
import React from 'react'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('all fn in this module', function () {
    describe('', function () {
        before(function () {

        })
        it('should import all components from index', function () {
            assert(!!Components, true)
        })
    })
})