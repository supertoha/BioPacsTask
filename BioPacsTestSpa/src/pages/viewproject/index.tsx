import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProject, getProject } from '../../services/projectsapi';
import { isAuthorized } from '../../services/authenticator';
import { UnauthorizedLabel } from '../../controls/UnauthorizedLabel';
import Spinner from 'react-bootstrap/Spinner';
import { ProjectEditor } from '../../controls/ProjectEditor';
import { BaseResponse, ImageType, Project, ProjectData } from '../../types';

const ViewProject = () => {

    const navigate = useNavigate();

    const [authorized, setAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<BaseResponse<Project> | undefined>(undefined);
    const location = useLocation();
    const regexp = /view\/(?<id>[\S]*)[/]*/gm;
    const matchResult = regexp.exec(location.pathname);
    const id = matchResult?.groups ? matchResult.groups["id"] : undefined;

    useEffect(() => {
        const effect = async () => {
            setIsLoading(true);
            var authResult = await isAuthorized();
            var isAuth = authResult?.data === true;
            if (isAuth && id) {
                const response = await getProject(id)
                setData(response.data);
            }
            setAuthorized(isAuth);
            setIsLoading(false);
        }
        effect();
    }, [id]);

    return (
        <Container>
            {isLoading && <Spinner animation="grow" />}
            {!authorized && !isLoading && <UnauthorizedLabel />}
            {authorized && data?.result && <Row className="justify-content-center">
                <ProjectEditor canEdit={false} project={{ name: data.result.name, isEnabled: data.result.isEnabled, acceptNewVisits: data.result.acceptNewVisits, imageType: data.result.imageType }} onSave={async (project: ProjectData) => {
                    const response = await createProject({ name: project.name, isEnabled: project.isEnabled, acceptNewVisits: project.acceptNewVisits, imageType: project.imageType });
                    if (response.data?.ok === true) {
                        navigate(`/view/${response.data.result.projectId}`)
                    }

                }} />
            </Row>}
        </Container>
    );
};

export default ViewProject;

