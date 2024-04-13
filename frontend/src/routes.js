import React from 'react';
import {BrowserRouter as Router, Switch /*Routes as Switch*/, Route, Link} from 'react-router-dom';
//Switch dependy is deprecated, using alias for the Router dependecy

function Home(){
    return(
        <div>
            <h2>Início</h2>
        </div>
    )
}

export default function Routes(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}