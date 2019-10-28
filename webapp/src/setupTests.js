import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router'

const history = createMemoryHistory()
global.renderInRouter = component => render(<Router history={history}>{component}</Router>)
