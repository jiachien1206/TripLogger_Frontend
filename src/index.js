import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import CreatePost from './pages/CreateEditPost/CreatePost';
import EditPost from './pages/CreateEditPost/EditPost';
import Map from './pages/Map/Map';
import Signup from './pages/User/Signup/Signup';
import Signin from './pages/User/Signin/Signin';
import Footstep from './pages/User/Footstep/Footstep';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="post/:id" element={<Post />} />
                <Route path="edit/:id" element={<EditPost />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="map" element={<Map />} />
                <Route path="user/signup" element={<Signup />} />
                <Route path="user/signin" element={<Signin />} />
                <Route path="user/footstep" element={<Footstep />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
