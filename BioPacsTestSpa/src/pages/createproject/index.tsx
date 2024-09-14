
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectsapi';

const CreateProject = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [imageType, setImageType] = useState(0);
    const [canSave, setCanSave] = useState(false);

    const formValidate = () => {
        setCanSave(false);
        if (!name) {
            setMessage('Project name is required');
        } else if (!enabled) {
            setMessage('Project enabled is required');
        } else {
            setCanSave(true);
            setMessage('');
        }
    };

    useEffect(() => formValidate());

    return (
        <Container>
            <Row className="justify-content-center">
                <Stack gap={2}>

                    <Form onSubmit={async (e) => {
                        e.preventDefault();

                        const response = await createProject({ name: name, isEnabled: enabled, acceptNewVisits: accepting, imageType: imageType });
                        if (response.data?.ok === true) {
                            navigate(`/view/${response.data.result.projectId}`)
                        } else {
                            setMessage('Unexpected error');
                        }
                    }}>

                        <Form.Group className="form-outline mb-4" controlId="formGroupName">
                            <Form.Label>Project name</Form.Label>
                            <Form.Control type="name" placeholder="" onChange={(x) => { setName(x.target.value); formValidate(); }}
                            value={name} />
                        </Form.Group>

                        <Form.Group className="form-outline mb-4" controlId="formGroupEnabled">
                            <Form.Label>Project enabled</Form.Label>
                            <Form.Check onChange={(x) => { setEnabled(x.target.checked); formValidate(); }} checked={enabled} />
                        </Form.Group>

                        <Form.Group className="form-outline mb-4" controlId="formGroupAccepting">
                            <Form.Label>Accepting for visits</Form.Label>
                            <Form.Check onChange={(x) =>
                            {
                                setAccepting(x.target.checked);
                                setImageType(1);
                                formValidate();
                            }} checked={accepting} />
                        </Form.Group>

                        <Form.Group className="form-outline mb-4" controlId="formGroupAccepting">
                            <Form.Label>Supported image types</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={imageType}
                                disabled={!accepting}
                                onChange={(x) => { setImageType(+x.target.value); formValidate(); }}>

                                <option value="0"></option>
                                <option value="1">Jpg</option>
                                <option value="2">DICOM</option>
                            </Form.Select>
                        </Form.Group>                        

                        <p>{message}</p>
                        <Button variant="primary" type="submit" disabled={!canSave}>
                            Save
                        </Button>
                    </Form>

                </Stack>
            </Row>
        </Container>


    );
};

export default CreateProject;

