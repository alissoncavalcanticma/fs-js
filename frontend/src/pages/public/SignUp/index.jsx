import React from "react";
import {Container, Form, Row, Col, Alert, FormGroup, FormLabel} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { BoxContent, BoxForm } from './styles'; 

import Logo from '../../../assets/logo.png';

import api from "../../../services/api";

class SignUp extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        domain: '',
        error: '',
        isLoading: false,
    };

    handleSignUp = async(event) => {
        event.preventDefault();
        const {name, email, password, domain, isLoading} = this.state;

        if(!name || !email || !password || !domain){
            this.setState({error: "Informe todos os campos para se cadastrar!"})
        }else{
            //Apaga objeto de erro
            this.setState({error: ""})

            //Chamada de endpoint POST /accounts para cadastrar
            try {
                await api.post('accounts', {
                    name, email, password, domain
                });
                // eslint-disable-next-line react/prop-types
                this.props.history.push("/signin");
            } catch (error) {
                console.log(error);
                this.setState({error: "Ocorreru um erro ao logar."})
            }
        }
    }

    renderError = () => {
        return (
            <Alert variant="danger">
                {
                    this.state.error
                }
            </Alert>
        )
    }

    render(){
        return(
            <Container>
                <Row className="justify-content-md-center"> 
                    <Col xs={12} md={7}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp'/>
                        </BoxContent>
                        <BoxForm>
                            <h2>Cadastro</h2>
                            <p>Preencha com seus dados!</p>
                            <Form onSubmit={this.handleSignUp}>
                                {this.state.error && this.renderError()}
                                <FormGroup controlId="nomeGroup">
                                    <FormLabel>Nome:</FormLabel>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Digite seu nome"
                                        onChange={e => this.setState({name: e.target.value})}
                                        />
                                </FormGroup>
                                <FormGroup controlId="emailGroup">
                                    <FormLabel>E-mail:</FormLabel>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Digite seu e-mail"
                                        onChange={e => this.setState({email: e.target.value})}
                                        />
                                </FormGroup>
                                <FormGroup controlId="dominioGroup">
                                    <FormLabel>Domínio:</FormLabel>
                                    <Form.Control 
                                        type="url" 
                                        placeholder="Digite seu domínio"
                                        onChange={e => this.setState({domain: e.target.value})}
                                        />
                                </FormGroup>
                                <FormGroup controlId="senhaGroup">
                                    <FormLabel>Senha:</FormLabel>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Digite sua senha"
                                        onChange={e => this.setState({password: e.target.value})}
                                        />
                                </FormGroup>
                                <br />
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Realizar cadastro
                                    </Button>
                                </div>
                            </Form>
                            <BoxContent>
                                <Link className="button" to="/signin">Voltar para o login</Link>
                            </BoxContent>
                        </BoxForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SignUp;