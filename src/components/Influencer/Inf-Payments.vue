<template>
  <div class="container">
    <h1 class="title">Payments</h1>
    
    <!-- Pending Payments Section -->
    <div v-if="payments.pending_payments.length">
      <h2>Pending Payments</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments.pending_payments" :key="payment.id">
            <td>{{ payment.campaign.name }}</td>
            <td>${{ payment.amount }}</td>
            <td>{{ payment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No pending payments to display.</p>

    <!-- Paid Payments Section -->
    <div v-if="payments.paid_payments.length">
      <h2>Paid Payments</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments.paid_payments" :key="payment.id">
            <td>{{ payment.campaign.name }}</td>
            <td>${{ payment.amount }}</td>
            <td>{{ payment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No paid payments to display.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payments: {
        pending_payments: [],
        paid_payments: []
      }
    };
  },
  async created() {
    await this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await this.$axios.get('/influencer/payments');
        this.payments = response.data; // Expecting { pending_payments, paid_payments }
      } catch (error) {
        console.error('Error fetching payments:', error.response || error);
        alert('Failed to load payments.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
  color: #dfbd69;
  background-color: #111;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #dfbd69;
}

.title {
  font-size: 36px;
  margin-bottom: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  color: #dfbd69;
}

.table th, .table td {
  padding: 12px;
  border: 1px solid #444;
  text-align: center;
}

.table th {
  background-color: #333;
  font-weight: bold;
}

.table td {
  background-color: #222;
}

h2 {
  margin-top: 20px;
  color: #dfbd69;
  text-align: left;
}
</style>
