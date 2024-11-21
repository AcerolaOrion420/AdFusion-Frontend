<template>
  <div>
    <SponsorHeader />
    <div class="view-requests-container">
      <h1 class="title">Ad Requests for {{ campaignName }}</h1>

      <div class="tabs">
        <button 
          v-for="status in statuses" 
          :key="status" 
          :class="{ active: activeTab === status }"
          @click="activeTab = status"
        >
          {{ status }}
        </button>
      </div>

      <div v-if="requests[activeTab].length === 0" class="no-requests">
        No {{ activeTab.toLowerCase() }} requests.
      </div>

      <table v-if="requests[activeTab].length > 0" class="table">
        <thead>
          <tr>
            <th>Influencer</th>
            <th>Messages</th>
            <th>Requirements</th>
            <th>Payment Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests[activeTab]" :key="request.id">
            <td>{{ request.influencer_name }}</td>
            <td>{{ request.messages }}</td>
            <td>{{ request.requirements }}</td>
            <td>${{ request.payment_amount }}</td>
            <td>
              <button v-if="activeTab === 'Pending'" @click="acceptRequest(request.id)" class="btn-action btn-accept">Accept</button>
              <button v-if="activeTab === 'Pending'" @click="rejectRequest(request.id)" class="btn-action btn-reject">Reject</button>
              <button v-if="activeTab !== 'Pending'" @click="deleteRequest(request.id)" class="btn-action btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SponsorHeader from './Spon-header.vue';

export default {
  components: {
    SponsorHeader,
  },
  data() {
    return {
      campaignName: '',
      requests: {
        Pending: [],
        Accepted: [],
        Rejected: []
      },
      activeTab: 'Pending',
      statuses: ['Pending', 'Accepted', 'Rejected']
    };
  },
  async created() {
    await this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const campaignId = this.$route.params.campaignId;
        const response = await this.$axios.get(`/campaign/${campaignId}/requests`);
        
        // Ensure `ad_requests` exists and is iterable
        if (Array.isArray(response.data.ad_requests)) {
          this.requests.Pending = response.data.ad_requests.filter(req => req.status === 'Pending');
          this.requests.Accepted = response.data.ad_requests.filter(req => req.status === 'Accepted');
          this.requests.Rejected = response.data.ad_requests.filter(req => req.status === 'Rejected');
          this.campaignName = response.data.campaign.name;
        } else {
          throw new Error("Unexpected response structure: ad_requests is not an array.");
        }
      } catch (error) {
        console.error("Error fetching ad requests:", error);
        alert("Failed to load ad requests. Please try again.");
      }
    },
    async acceptRequest(requestId) {
      await this.$axios.post(`/ad_request/accept/${requestId}`);
      this.fetchRequests(); // Refresh after action
    },
    async rejectRequest(requestId) {
      await this.$axios.post(`/ad_request/reject/${requestId}`);
      this.fetchRequests();
    },
    async deleteRequest(requestId) {
      if (confirm("Are you sure you want to delete this request?")) {
        await this.$axios.delete(`/ad_request/delete/${requestId}`);
        this.fetchRequests();
      }
    }
  }
};
</script>

<style scoped>
.view-requests-container {
  max-width: 1200px;
  margin: 80px auto; /* Push content below the header */
  padding: 20px;
  background-color: #111;
  border: 2px solid #dfbd69;
  border-radius: 15px;
}

.title {
  color: #dfbd69;
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  background-color: #333;
  color: #dfbd69;
  border: 2px solid #dfbd69;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.tabs button.active {
  background-color: #dfbd69;
  color: #111;
}

.table {
  width: 100%;
  color: #dfbd69;
}

.table th, .table td {
  padding: 12px;
  border: 1px solid #dfbd69;
}

.btn-action {
  background: #dfbd69;
  color: #111;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-accept {
  background-color: #28a745;
}

.btn-reject {
  background-color: #dc3545;
}

.btn-danger {
  background-color: #cc0000;
}

.no-requests {
  color: #dfbd69;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
</style>
