import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Landing from '../components/Landing-comp.vue';
import Login from '../components/Login-comp.vue';
import Signup from '../components/Signup-comp.vue';
import InfDash from '../components/Influencer/Inf-Dash.vue';
import InfProfile from '../components/Influencer/Inf-profile.vue';
import CampaignList from '../components/Influencer/Inf-Camplist.vue';
import SponsorDash from '../components/Sponsor/Spon-dash.vue';
import SponsorProfile from '../components/Sponsor/Spon-profile.vue';
import SponsorCampaigns from '../components/Sponsor/Spon-camp.vue';
import ViewRequests from '../components/Sponsor/Spon-viewreqs.vue';
import EditCampaign from '../components/Sponsor/Spon-editcamp.vue';
import InfluencerList from '../components/Sponsor/Spon-InfList.vue';
import RequestAd from '../components/Sponsor/Spon-request.vue';
import SponsorAdRequests from '../components/Sponsor/Spon-Adreqlist.vue';
import SponsorPayments from '../components/Sponsor/Spon-Payments.vue';
import InfRequestAd from '../components/Influencer/Inf-adrequest.vue';
import InfAdRequests from '../components/Influencer/Inf-AdReqList.vue';
import InfluencerPaymentsPage from '../components/Influencer/Inf-Payments.vue';
import AdminDash from '../components/Admin/Admin-Dash.vue';
import AdminManageusercamp from '../components/Admin/Admin-Manageusercamp.vue';
import AdminFlaggedusrcamp from '../components/Admin/Admin-Flaggedusrcamp.vue';


const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/influencer/dashboard', name: 'InfDash', component: InfDash, meta: { requiresAuth: true } },
  { path: '/influencer/profile', name: 'InfProfile', component: InfProfile, meta: { requiresAuth: true } },
  { path: '/influencer/campaigns', name: 'CampaignList', component: CampaignList, meta: { requiresAuth: true } },
  { path: '/sponsor/dashboard', name: 'SponsorDash', component: SponsorDash, meta: { requiresAuth: true } },
  { path: '/sponsor/profile', name: 'SponsorProfile', component: SponsorProfile, meta: { requiresAuth: true } },
  { path: '/sponsor/manage-campaigns', name: 'SponsorCampaigns', component: SponsorCampaigns, meta: { requiresAuth: true } },
  { path: '/sponsor/campaign/:campaignId/requests', name: 'ViewRequests', component: ViewRequests, props: true, meta: { requiresAuth: true } },
  { path: '/sponsor/campaign/:campaignId/edit', name: 'EditCampaign',component: EditCampaign,props: true,meta: { requiresAuth: true }, },
  { path: '/sponsor/influencers', name: 'InfluencerList', component: InfluencerList, meta: { requiresAuth: true } },
  { path: '/sponsor/request-ad/:influencerId/:requestId?',name: 'RequestAd',component: RequestAd,props: true,meta: { requiresAuth: true } },
  { path: '/sponsor/ad-requests', name: 'SponsorAdRequests', component: SponsorAdRequests, meta: { requiresAuth: true } },
  { path: '/sponsor/payments',name: 'SponsorPayments',component: SponsorPayments, meta: { requiresAuth: true }, },
  { path: '/influencer/campaign/:campaignId/request',name: 'InfRequestAd',component: InfRequestAd, props: true, meta: { requiresAuth: true } },
  { path: '/influencer/request/modify/:requestId',name: 'ModifyRequestAd',component: InfRequestAd,props: true, meta: { requiresAuth: true } },
  { path: '/influencer/ad-requests',name: 'InfAdRequests', component: InfAdRequests, meta: { requiresAuth: true } },
  { path: '/influencer/payments',name: 'InfluencerPayments',component: InfluencerPaymentsPage,  meta: { requiresAuth: true } },
  { path: '/admin/dashboard',name: 'AdminDashboard',component: AdminDash, meta: { requiresAuth: true, requiresRole: 'admin' }, },
  { path: '/admin/manage-users',name: 'AdminUserCamp',component: AdminManageusercamp, meta: { requiresAuth: true, requiresRole: 'admin' }, },
  { path: '/admin/manage-flaggedusers',name: 'AdminFlagUserCamp',component: AdminFlaggedusrcamp, meta: { requiresAuth: true, requiresRole: 'admin' }, },
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



