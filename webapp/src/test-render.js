import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'
import { Router } from 'react-router'

const history = createMemoryHistory()
export const renderInRouter = (component, options) => render(<Router history={history}>{component}</Router>, options)
export const renderInDnd = (component, options) => render(<DndProvider backend={HTML5Backend}>{component}</DndProvider>, options)
export const renderInRouterAndDnd = (component, options) =>
    render(
        <Router history={history}>
            <DndProvider backend={HTML5Backend}>{component}</DndProvider>
        </Router>,
        options
    )
