import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './pages/Home/Home';
import Signup from './pages/User/Signup/Signup';
import Signin from './pages/User/Signin/Signin';
import Footstep from './pages/User/Footstep/Footstep';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="user/signup" element={<Signup />} />
                <Route path="user/signin" element={<Signin />} />
                <Route path="user/footstep" element={<Footstep />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
