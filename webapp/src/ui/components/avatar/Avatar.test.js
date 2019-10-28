import { render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import Avatar from './Avatar'

describe('Avatar', () => {
    let onloadStub, onerrorStub
    beforeAll(() => {
        Object.defineProperty(Image.prototype, 'onload', {
            set: function(fn) {
                onloadStub = fn
            }
        })
        Object.defineProperty(Image.prototype, 'onerror', {
            set: function(fn) {
                onerrorStub = fn
            }
        })
    })

    it('Should show the fallback', function() {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)

        const fallback = container.querySelector('.avatar-fallback')
        const image = container.querySelector('.avatar')

        expect(fallback).toHaveTextContent('t')
        expect(image).toBeNull()
    })

    it('Should show the image when loaded', () => {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)
        act(onloadStub)

        const fallback = container.querySelector('.avatar-fallback')
        const image = container.querySelector('.avatar')

        expect(fallback).toBeNull()
        expect(image).toHaveAttribute('src', '/images/avatar/1.png')
    })

    it('Should show the fallback when error', () => {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)
        act(onerrorStub)

        const fallback = container.querySelector('.avatar-fallback')
        const image = container.querySelector('.avatar')

        expect(fallback).toHaveTextContent('t')
        expect(image).toBeNull()
    })
})
