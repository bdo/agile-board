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

    it('Should show the fallback', () => {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)
        expect(container.firstChild.tagName).toBe('DIV')
        expect(container.firstChild).toHaveClass('avatar-fallback')
    })

    it('Should show the image', () => {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)
        act(onloadStub)
        expect(container.firstChild.tagName).toBe('IMG')
        expect(container.firstChild).toHaveClass('avatar')
        expect(container.firstChild).toHaveAttribute('src', '/images/avatar/1.png')
    })

    it('Should show the fallback when error', () => {
        const { container } = render(<Avatar user={{ name: 'toto', id: 1 }} />)
        act(onerrorStub)
        expect(container.firstChild.tagName).toBe('DIV')
        expect(container.firstChild).toHaveClass('avatar-fallback')
    })
})
