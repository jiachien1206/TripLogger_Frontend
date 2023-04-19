import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import CreatePost from './pages/CreateEditPost/CreatePost';
import EditPost from './pages/CreateEditPost/EditPost';
import Map from './pages/Map/Map';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Search from './pages/Search/Search';
import Continent from './pages/Continent/Continent';
import User from './pages/User/User';

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
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="search" element={<Search />} />
                <Route path="location/:continent" element={<Continent />} />
                <Route path="user" element={<User />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
