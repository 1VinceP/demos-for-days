import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import StripeDemo from './components/StripeDemo';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/stripe' component={StripeDemo} />
    </Switch>
)