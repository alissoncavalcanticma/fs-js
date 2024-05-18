
import React from 'react';

import {Button, Form, Container, Row, Col, FormGroup} from 'react-bootstrap';
import Logo from '../../../assets/logo.png';
import { BoxContext, BoxForm } from './styles';


//Function SignIn
class Signin extends React.Component{

    handleSigin = async(event) => {
        //Evita que seja executada a request para própria Pagina
        event.preventDefault();    
    }

    render(){
        return(
            <Container>
                <Row className="justify-align-content-md-center"> 
                    <Col xs={12} md={5}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp'/>
                        </BoxContent>
                        <BoxForm>
                        <h2>Login</h2>
                        <p>Informe seus dados para autenticar: </p>
                        <Form onSubmit={this.handleSigin}>
                            <Form.Group controlId='emailGroup'>
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu e-mail"/>
                            </Form.Group>
                            <Form.Group controlId="passwordGroup">
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Digite sua senha" />
                            </Form.Group>
                            <Button block variant="secondary" type="submit">
                                Fazer Login
                            </Button>
                        </Form>
                        </BoxForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signin;