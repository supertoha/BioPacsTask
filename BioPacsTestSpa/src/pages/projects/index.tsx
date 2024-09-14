import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { BaseResponse, ImageType, Project } from "../../types";
import { getProjects } from "../../services/projectsapi";
import { useNavigate } from "react-router-dom";
import { isAuthorized } from '../../services/authenticator';

const Projects = () => {

    const [data, setData] = useState<BaseResponse<Project[]> | undefined>(undefined);
    const [authorized, setAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const effect = async () =>
        {
            setIsLoading(true);
            var authResult = await isAuthorized();
            const authorizedStatus = authResult?.data === true;
            setAuthorized(authorizedStatus);
            if (authorizedStatus) {
                const response = await getProjects()
                setData(response.data);
            }
            setIsLoading(false);
        }
        effect();
    }, []);

    return (
        <>
            {isLoading && <Spinner animation="grow" />}
            {!isLoading && !authorized && <h2> Unauthorized Access. Please, <a href='/'>login</a></h2>}
            {authorized &&
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>  
                            <th>Project name</th>
                            <th>Accepting new visits</th>
                            <th>Supported image type</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.result.map((project) => (
                            <tr key={project.id} onDoubleClick={() => navigate(`/view/${project.id}`)}>
                                <td>{project.name}</td>
                                <td>{project.acceptNewVisits ? 'YES' : ''}</td>
                                <td>{project.imageType === ImageType.None ? '' : ImageType[project.imageType]}</td>
                            </tr>
                        ))}

                        {data?.result?.length === 0 && <tr>
                            <td colSpan={3}>Empty</td>
                        </tr>
                        }

                    </tbody>
                </Table>
            }

        </>
    )
};

export default Projects;


