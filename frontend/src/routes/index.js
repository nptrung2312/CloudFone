import Login from '../Login';
import Home from '../component/layout/dashboard/Home';
import Profile from '../component/layout/Profile';
import MainPersonnel from '../component/layout/personnel/MainPersonnel';

const publicRoutes = [
    { path: '/', component: Login }
]

const protectedRoutes = [
    { path: '/home', component: Home },
    { path: '/profile', component: Profile },
    { path: '/personnel', component: MainPersonnel }
];


export { publicRoutes, protectedRoutes }