import { createRouter, createWebHistory } from 'vue-router';
import Contacts from '../components/Contacts.vue';
import AddContact from '../components/AddContact.vue';
import EditContact from '../components/EditContact.vue';
import DeleteContact from '../components/DeleteContact.vue';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import axios from 'axios';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contacts', name: 'Contacts', component: Contacts, meta: { requiresAuth: true } },
  { path: '/contacts/add', name: 'AddContact', component: AddContact, meta: { requiresAuth: true } },
  { path: '/contacts/edit/:id', name: 'EditContact', component: EditContact, props: true, meta: { requiresAuth: true } },
  { path: '/contacts/delete/:id', name: 'DeleteContact', component: DeleteContact, props: true, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
  } else {
    next();
  }
});

export default router;
