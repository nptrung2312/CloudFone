import Login from '../Login';
import Home from '../Home';
import Profile from '../component/layout/Profile';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/profile', component: Profile },
]

export { publicRoutes }