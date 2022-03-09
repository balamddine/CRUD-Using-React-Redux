import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';
// in React router we don't an <a href='' /> tag instead we use a <link to='' /> tag

const App = () => {
    return (
        <div className='ui container'>

            <Router history={history}>
                <div>
                    {/* we can't use a link element outside a router */
                        /* if we don't use switch from react router dom 
                        the create and the show pages will be displayed 
                        on the page because of the same path */
                    }
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />
                    </Switch>

                </div>
            </Router>
        </div>
    );
}

export default App;