import './index.css'

import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, Switch } from 'react-router'

import Board from './ui/pages/board/Board'
import Home from './ui/pages/home/Home'
import Project from './ui/pages/project/Project'

const history = createBrowserHistory()

const router = (
    <Router history={history}>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/board/:projectId">
                <Board />
            </Route>
            <Route exact path="/project/:id?">
                <Project />
            </Route>
        </Switch>
    </Router>
)

ReactDOM.render(router, document.getElementById('root'))
