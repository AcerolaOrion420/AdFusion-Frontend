import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Landing from '../components/Landing-comp.vue';
import Login from '../components/Login-comp.vue';
import Signup from '../components/Signup-comp.vue';
import InfDash from '../components/Influencer/Inf-Dash.vue';
import InfProfile from '../components/Influencer/Inf-profile.vue';
import SponsorDash from '../components/Sponsor/Spon-dash.vue';
import SponsorProfile from '../components/Sponsor/Spon-profile.vue';
import SponsorCampaigns from '../components/Sponsor/Spon-camp.vue';
import ViewRequests from '../components/Sponsor/Spon-viewreqs.vue';
import EditCampaign from '../components/Sponsor/Spon-editcamp.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/influencer/dashboard', name: 'InfDash', component: InfDash, meta: { requiresAuth: true } },
  { path: '/influencer/profile', name: 'InfProfile', component: InfProfile, meta: { requiresAuth: true } },
  { path: '/sponsor/dashboard', name: 'SponsorDash', component: SponsorDash, meta: { requiresAuth: true } },
  { path: '/sponsor/profile', name: 'SponsorProfile', component: SponsorProfile, meta: { requiresAuth: true } },
  { path: '/sponsor/manage-campaigns', name: 'SponsorCampaigns', component: SponsorCampaigns, meta: { requiresAuth: true } },
  { path: '/sponsor/campaign/:campaignId/requests', name: 'ViewRequests', component: ViewRequests, props: true, meta: { requiresAuth: true } },
  { path: '/sponsor/campaign/:campaignId/edit', name: 'EditCampaign',component: EditCampaign,props: true,meta: { requiresAuth: true }, },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('auth_token');

  if (requiresAuth) {
    if (token) {
      try {
        // Validate the token with the backend
        const response = await axios.post('http://localhost:5000/validate_token', { token });
        if (response.status === 200 && response.data.valid) {
          next(); // Token is valid, allow access
        } else {
          throw new Error('Token invalid');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('auth_token'); // Clear invalid token
        next({ name: 'Login' }); // Redirect to login
      }
    } else {
      console.error('No token found. Redirecting to login.');
      next({ name: 'Login' }); // Redirect to login
    }
  } else {
    next(); // Route does not require authentication, proceed
  }
});


export default router;



