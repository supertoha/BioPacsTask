import { ImageType, ProjectData } from "../../types";
import { useState, useEffect } from 'react';
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface EditorProps {
    onSave: (project: ProjectData) => Promise<void>
    canEdit: boolean,
    project: ProjectData
}

export const ProjectEditor = (editorProps: EditorProps) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState(editorProps.project.name);
    const [enabled, setEnabled] = useState(editorProps.project.isEnabled);
    const [accepting, setAccepting] = useState(editorProps.project.acceptNewVisits);
    const [imageType, setImageType] = useState(editorProps.project.imageType);
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

    useEffect(() => {
        formValidate();
    }, [name, enabled, accepting, imageType]);

    return (<Stack gap={2}>

        <Form onSubmit={async (e) => {
            e.preventDefault();
            await editorProps.onSave({ name: name, isEnabled: enabled, acceptNewVisits: accepting, imageType: imageType });
        }}>

            <Form.Group className="form-outline mb-4" controlId="formGroupName">
                <Form.Label>Project name</Form.Label>
                <Form.Control type="name" placeholder="" onChange={(x) => setName(x.target.value)} value={name} disabled={!editorProps.canEdit} />
            </Form.Group>

            <Form.Group className="form-outline mb-4" controlId="formGroupEnabled">
                <Form.Label>Project enabled</Form.Label>
                <Form.Check onChange={(x) => setEnabled(x.target.checked)} checked={enabled} disabled={!editorProps.canEdit} />
            </Form.Group>

            <Form.Group className="form-outline mb-4" controlId="formGroupAccepting">
                <Form.Label>Accepting for visits</Form.Label>
                <Form.Check onChange={(x) => {
                    setAccepting(x.target.checked);
                    if (x.target.checked)
                        setImageType(1);
                }} checked={accepting} disabled={!editorProps.canEdit}/>
            </Form.Group>

            <Form.Group className="form-outline mb-4" controlId="formGroupAccepting">
                <Form.Label>Supported image types</Form.Label>
                <Form.Select aria-label="Default select example"
                    value={imageType}
                    disabled={!accepting || !editorProps.canEdit}
                    onChange={(x) => setImageType(+x.target.value)}>

                    {Object.entries(ImageType).filter(x => Number.isInteger(x[1])).map((_, val) => (<option key={val} value={val}>{(val === 0) ? '' : ImageType[val]}</option>))}

                </Form.Select>
            </Form.Group>

            <p>{message}</p>
            {editorProps.canEdit && <Button variant="primary" type="submit" disabled={!canSave} >
                Save
            </Button>
            }

        </Form>

    </Stack>);
}