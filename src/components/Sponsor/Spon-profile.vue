<!-- src/components/Sponsor/SponsorProfile.vue -->
<template>
    <div class="container mt-5">
      <h1 class="title">Sponsor Profile</h1>
      <div class="profile-info">
        <h2>Profile Information</h2>
        <form @submit.prevent="handleProfileUpdate">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="profile.username"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="profile.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="company_name">Company Name</label>
            <input
              type="text"
              class="form-control"
              id="company_name"
              v-model="profile.company_name"
              required
            />
          </div>
          <div class="form-group">
            <label for="industry">Industry</label>
            <input
              type="text"
              class="form-control"
              id="industry"
              v-model="profile.industry"
              required
            />
          </div>
          <div class="form-group">
            <label for="budget">Budget</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="budget"
              v-model="profile.budget"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profile: {
          username: '',
          email: '',
          company_name: '',
          industry: '',
          budget: 0.0,
        },
      };
    },
    async created() {
      try {
        const response = await this.$axios.get('/sponsor/profile');
        this.profile = response.data;
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    },
    methods: {
      async handleProfileUpdate() {
        try {
          await this.$axios.post('/sponsor/profile', this.profile);
          alert("Profile updated successfully.");
        } catch (error) {
          console.error('Failed to update profile:', error);
        }
      },
    },
  };
  </script>
  
  <style src="@/assets/profile.css"></style>
  