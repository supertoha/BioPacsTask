import { useLocation } from "react-router-dom";

const ViewProject = () => {
    const location = useLocation();
    const regexp = /view\/(?<id>[\S]*)[/]*/gm;
    const matchResult = regexp.exec(location.pathname);
    const id = matchResult?.groups ? matchResult.groups["id"] : undefined;

    return (
        <h2 >
            <>
                {id}
            </>           
            
            ViewProject
        </h2>
    )
};

export default ViewProject;


