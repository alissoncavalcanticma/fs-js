
import React from 'react';

import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import Logo from '../../../assets/logo.png';

handleSigin = async(event) => {
    //Evita que seja executada a request para própria Pagina
    event.preventDefault();    

    //Aula: 00:30 seg 
}


//Function SignIn
class Signin extends React.Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <div>
                            <img src={Logo} alt='MailShrimp'/>
                        </div>
                        <h2>Login</h2>
                        <p>Informe seus dados para autenticar: </p>
                        <Form onSubmit={handleSigin}>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signin;