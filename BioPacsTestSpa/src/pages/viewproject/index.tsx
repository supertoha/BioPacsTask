import { useEffect, useState } from "react";
import { BaseResponse, Project } from "../../types";
import { getProjects } from "../../services/projectsapi";

const ViewProject = () => {
    const [data, setData] = useState<BaseResponse<Project[]> | undefined>(undefined);
    //const id = matchResult?.groups ? matchResult.groups["id"] : undefined;

    const fetchData = async () => {
        try {
            const response = await getProjects()
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <h2 >
            {data?.ok === true &&
                <>
                    {data?.result.map((project) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </>
            }
            
            ViewProject
        </h2>
    )
};

export default ViewProject;

