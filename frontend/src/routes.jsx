import React from 'react';

import {
    BrowserRouter as Router,        //For create component Router
    Route,                          //For route
    Link,                           //For Link to route
    useParams,                      //Hook for capture and use query and uri params
    useLocation                     //Hook for redirect params, substitute for useRouteMatch
} from 'react-router-dom';

import { Routes } from 'react-router'; //Hook substitute for Switch

//Functions of the pages
function Home(){
    return(
        <div>
            <Menu/>
            <h2>Dashboard</h2>
        </div>
    )
}
function Contacts(){
    let {pathname} = useLocation(); //Hook de path
    return(
        <div>
            <Menu/>
            <h2>Lista contatos</h2>
            <ul>
                <li>
                    {/*<Link to={`${url}/1`}>Contato A</Link>*/}
                    <Link to={`${pathname}/1`}>Contato A</Link>
                </li>
                <li>
                    {/*<Link to='/contacs/2'>Contato B</Link>*/}
                    <Link to={`${pathname}/2`}>Contato B</Link>
                </li>
                <li>
                    {/*<Link to='/contacs/3'>Contato C</Link>*/}
                    <Link to={`${pathname}/3`}>Contato C</Link>
                </li>
            </ul>
            {/*<Switch>
                <Route exact path='{path}'></Route>
                <Route path={`${path}/:contactId`}>
                    <Contact />
                </Route>
            </Switch>*/}
            <Routes>
                <Route path=":contactId" element={<Contact />}/>
            </Routes>
        </div>
    );
}


function Contact(){
    let {contactId} = useParams();
    return(
        <div>
            <h3>Contato: {contactId}</h3>
        </div>
    )
}
function Signin(){
    return(
        <div>
            <h2>Login</h2>
        </div>
    )
}
function Signup(){
    return(
        <div>
            <h2>Cadastro</h2>
        </div>
    )
}
function Messages(){
    return(
        <div>
            <h2>Lista de Mensagens</h2>
        </div>
    )
}
function Menu(){
    return(
        <ul>
            <li>
                <Link to="/contacts">Contatos</Link>
            </li>
            <li>
                <Link to="/messages">Lista de mensagens</Link>
            </li>
            <li>
                <Link to="/signin">Sair</Link>
            </li>
        </ul>
    )
}

//Function Routes for redirect pages

export default function AllRoutes(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/contacts/*" element={<Contacts /> } />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    )
}