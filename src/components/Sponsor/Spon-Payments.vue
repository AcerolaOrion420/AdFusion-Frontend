<template>
  <div>
    <SponsorHeader />
    <div class="container mt-5">
      <h1>Payments</h1>
      <div v-if="payments.length">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Campaign</th>
              <th scope="col">Influencer</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment.id">
              <td>{{ payment.campaign.name }}</td>
              <td>{{ payment.influencer.username }}</td>
              <td>{{ payment.amount }}</td>
              <td>{{ payment.status }}</td>
              <td>
                <button
                  v-if="payment.status === 'pending'"
                  @click="payPayment(payment.id)"
                  class="btn btn-success"
                >
                  Pay
                </button>
                <span v-else>Paid</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No payments to display.</p>
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
      payments: [], // List of payments
    };
  },
  async created() {
    await this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await this.$axios.get('/sponsor/payments');
        this.payments = response.data.payments;
      } catch (error) {
        console.error('Error fetching payments:', error.response || error);
      }
    },
    async payPayment(paymentId) {
      try {
        await this.$axios.post(`/sponsor/payment/${paymentId}`);
        alert('Payment successfully made');
        await this.fetchPayments(); // Refresh the list
      } catch (error) {
        console.error('Error processing payment:', error.response || error);
        alert('Failed to process payment');
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #000000;
  color: #DFBD69;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1000px;
  margin-top: 80px; /* Push content below the header */
}

h1 {
  color: #DFBD69;
  text-align: center;
  margin-bottom: 30px;
}

.table {
  background-color: #1c1c1c;
  border: 1px solid #444;
  color: #DFBD69;
}

.table th {
  color: #DFBD69;
}

.table td {
  color: #DFBD69;
}

.btn-success {
  background: linear-gradient(90deg, #DFBD69, #926F34);
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-success:hover {
  box-shadow: 0 0 15px rgba(223, 189, 105, 0.6);
}
</style>
