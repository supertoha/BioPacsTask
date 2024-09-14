import { useState } from 'react';
import { authentication } from '../../services/projectsapi';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    return (
        <Container>
            <Row className="justify-content-center">
                <Stack gap={2}>

                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        if (!login || !password) {
                            setMessage('Please, fill login and password');
                        }

                        const result = await authentication(login, password);
                        if (result.data?.ok === false) {
                            setMessage('Password or username incorrect');
                        } else {
                            setMessage('');
                            navigate('/create');
                        }
                    }}>

                        <Form.Group className="form-outline mb-4" controlId="formGroupLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="login" placeholder="Admin" onChange={(x) => setLogin(x.target.value)} value={login} />
                        </Form.Group>

                        <Form.Group className="form-outline mb-4" controlId="formGroupPassword">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="password" placeholder="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                        </Form.Group>

                        <p>{message}</p>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>

                </Stack>
            </Row>
        </Container>
        
        
    );
};

export default Login;