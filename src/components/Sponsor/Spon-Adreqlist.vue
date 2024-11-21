<template>
  <div>
    <SponsorHeader />
    <div class="container">
      <h1>Ad Requests</h1>

      <!-- Ongoing Campaign Requests -->
      <section class="requests-section">
        <h2>Ongoing Campaign Requests</h2>
        <div
          v-for="adRequest in adRequests.ongoing"
          :key="adRequest.id"
          class="ad-request-card"
        >
          <h3>Campaign: {{ adRequest.campaign.name }}</h3>
          <p>Influencer: {{ adRequest.influencer.username }}</p>
          <p>Messages: {{ adRequest.messages }}</p>
          <p>Requirements: {{ adRequest.requirements }}</p>
          <p>Payment Amount: {{ adRequest.payment_amount }}</p>
          <p>Status: {{ adRequest.status }}</p>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <!-- Modify Button -->
            <button @click="modifyAdRequest(adRequest)" class="btn btn-modify">
              Modify
            </button>

            <!-- Accept and Reject Buttons -->
            <template v-if="adRequest.latest_sender !== sponsorId">
              <button
                @click="acceptAdRequest(adRequest.id)"
                class="btn btn-accept"
                :disabled="adRequest.latest_sender === sponsorId"
              >
                Accept
              </button>
              <button
                @click="rejectAdRequest(adRequest.id)"
                class="btn btn-reject"
                :disabled="adRequest.latest_sender === sponsorId"
              >
                Reject
              </button>
            </template>

            <!-- Delete Button -->
            <button
              @click="deleteAdRequest(adRequest.id)"
              class="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <!-- Expired Requests -->
      <section class="requests-section">
        <h2>Expired Requests</h2>
        <div
          v-for="adRequest in adRequests.expired"
          :key="adRequest.id"
          class="ad-request-card"
        >
          <h3>Campaign: {{ adRequest.campaign.name }}</h3>
          <p>Influencer: {{ adRequest.influencer.username }}</p>
          <p>Messages: {{ adRequest.messages }}</p>
          <p>Requirements: {{ adRequest.requirements }}</p>
          <p>Payment Amount: {{ adRequest.payment_amount }}</p>
          <p>Status: {{ adRequest.status }}</p>
        </div>
      </section>

      <!-- Flagged Influencer Requests -->
      <section class="requests-section">
        <h2>Flagged Influencer's Requests</h2>
        <div
          v-for="adRequest in adRequests.flagged"
          :key="adRequest.id"
          class="ad-request-card"
        >
          <h3>Campaign: {{ adRequest.campaign.name }}</h3>
          <p>Influencer: {{ adRequest.influencer.username }}</p>
          <p>Messages: {{ adRequest.messages }}</p>
          <p>Requirements: {{ adRequest.requirements }}</p>
          <p>Payment Amount: {{ adRequest.payment_amount }}</p>
          <p>Status: {{ adRequest.status }}</p>
          <p class="flagged-warning">Flagged</p>
        </div>
      </section>
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
      sponsorId: null, // Stores the logged-in sponsor's ID
      adRequests: {
        ongoing: [],
        expired: [],
        flagged: [],
      },
    };
  },
  async created() {
    await this.fetchSponsorId();
    await this.fetchAdRequests();
  },
  methods: {
    async fetchSponsorId() {
      try {
        const response = await this.$axios.get('/get_sponsor_id'); // Adjust this endpoint as needed
        this.sponsorId = response.data.sponsor_id;
      } catch (error) {
        console.error('Error fetching sponsor ID:', error.response || error);
      }
    },
    async fetchAdRequests() {
      try {
        const response = await this.$axios.get('/sponsor/ad_requests');
        this.adRequests = response.data;
      } catch (error) {
        console.error('Error fetching ad requests:', error.response || error);
      }
    },
    modifyAdRequest(adRequest) {
      // Redirect to the Request Ad page for modifying
      this.$router.push({
        name: 'RequestAd',
        params: {
          influencerId: adRequest.influencer.id,
          requestId: adRequest.id, // Pass requestId for modification
        },
      });
    },
    async acceptAdRequest(requestId) {
      try {
        await this.$axios.post(`/ad_request/accept/${requestId}`);
        await this.fetchAdRequests();
      } catch (error) {
        console.error('Error accepting ad request:', error.response || error);
      }
    },
    async rejectAdRequest(requestId) {
      try {
        await this.$axios.post(`/ad_request/reject/${requestId}`);
        await this.fetchAdRequests();
      } catch (error) {
        console.error('Error rejecting ad request:', error.response || error);
      }
    },
    async deleteAdRequest(requestId) {
      try {
        await this.$axios.post(`/ad_request/delete/${requestId}`);
        await this.fetchAdRequests();
      } catch (error) {
        console.error('Error deleting ad request:', error.response || error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
  color: #dfbd69;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.requests-section {
  margin-bottom: 40px;
}

.ad-request-card {
  border: 2px solid #dfbd69;
  border-radius: 10px;
  background-color: #1c1c1c;
  padding: 15px;
  margin: 15px 0;
  text-align: left;
}

.ad-request-card h3 {
  color: #dfbd69;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.ad-request-card p {
  margin: 5px 0;
  color: #f0e68c;
}

.flagged-warning {
  color: #ff4d4f;
  font-weight: bold;
}

.action-buttons {
  margin-top: 10px;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-modify {
  background-color: #6c757d;
  color: #fff;
}

.btn-accept {
  background-color: #28a745;
  color: #fff;
}

.btn-reject {
  background-color: #dc3545;
  color: #fff;
}

.btn-delete {
  background-color: #ffc107;
  color: #000;
}

.btn:hover {
  opacity: 0.8;
}
</style>
