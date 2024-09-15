import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../../services/authenticator';

const Login = () => {
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
                <Stack gap={2}>

                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        if (!login || !password) {
                            setMessage('Please, fill login and password');
                            return;
                        }

                        try {
                            const result = await authentication(login, password);

                            if (result.data?.ok === false) {
                                setMessage('Password or username incorrect');
                            } else {
                                localStorage.setItem('bearer', result.data.result.accessToken)
                                setMessage('');
                                navigate('/create');
                            }
                        } catch {
                            setMessage('Unexpected server error');
                        }
                    }}>

                        <Form.Group className="form-outline mb-4" controlId="formGroupLogin" >
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="login" placeholder="Admin" onChange={(x) => setLogin(x.target.value)} value={login} />
                        </Form.Group>

                        <Form.Group className="form-outline mb-4" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                        </Form.Group>

                        <span className="validation_message">{message}</span>

                        <Button variant="primary" type="submit" className="me-2">
                            Login
                        </Button>

                        <Button variant="light" onClick={(e) =>
                        {
                            e.preventDefault();
                            setLogin('');
                            setPassword('');
                            setMessage('');
                        }}>
                            Cancel
                        </Button>

                    </Form>

                </Stack>
            </Card.Body>
        </Card>
    );
};

export default Login;