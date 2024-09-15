import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import Projects from './pages/projects';
import CreateProject from './pages/createproject';
import ViewProject from './pages/viewproject';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="all" element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="view/:id" element={<ViewProject />} />
        </Route>
    ))

function App({}) {

    return (
        <div className="content">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
