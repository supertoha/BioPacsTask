import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectsapi';
import { isAuthorized } from '../../services/authenticator';
import { UnauthorizedLabel } from '../../controls/UnauthorizedLabel';
import Spinner from 'react-bootstrap/Spinner';
import { ProjectEditor } from '../../controls/ProjectEditor';
import { ImageType, ProjectData } from '../../types';

const CreateProject = () => {

    const navigate = useNavigate();

    const [authorized, setAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const effect = async () => {
            setIsLoading(true);
            var authResult = await isAuthorized();
            setAuthorized(authResult?.data === true);
            setIsLoading(false);
        }
        effect();
    }, []);

    return (
        <Container>
            {isLoading && <Spinner animation="grow" />}
            {!authorized && !isLoading && <UnauthorizedLabel/>}
            {authorized && <Row className="justify-content-center">
                <ProjectEditor canEdit={true} project={{ name: '', isEnabled: true, acceptNewVisits: false, imageType: ImageType.None }} onSave={async (project: ProjectData) =>
                {
                    const response = await createProject({ name: project.name, isEnabled: project.isEnabled, acceptNewVisits: project.acceptNewVisits, imageType: project.imageType }); 
                    if (response.data?.ok === true) { 
                        navigate(`/view/${response.data.result.projectId}`) 
                    }

                }} />               
            </Row>}
        </Container>
    );
};

export default CreateProject;

