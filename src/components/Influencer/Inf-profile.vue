<!-- src/components/Influencer/InfluencerProfile.vue -->
<template>
  <div class="profile-container">
    <h2 class="title">Profile</h2>
    <form @submit.prevent="handleProfileUpdate">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input
          type="text"
          id="category"
          v-model="category"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="niche">Niche</label>
        <select id="niche" v-model="niche" required class="form-control">
          <option disabled value="">Select your niche</option>
          <option v-for="nicheOption in niches" :key="nicheOption" :value="nicheOption">
            {{ nicheOption }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="reach">Follower Count</label>
        <input
          type="number"
          id="reach"
          v-model="reach"
          required
          class="form-control"
        />
      </div>
      <button type="submit" class="btn">Save Profile</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      category: '',
      niche: '',
      reach: '',
      niches: [],  // Initially an empty array, to be populated from the backend
    };
  },
  async created() {
    try {
      // Fetch existing profile information
      const profileResponse = await this.$axios.get('/influencer/profile');
      const { username, email, category, niche, followerCount } = profileResponse.data;
      this.username = username;
      this.email = email;
      this.category = category;
      this.niche = niche;
      this.reach = followerCount;

      // Fetch list of niches from the backend
      const nichesResponse = await this.$axios.get('/niches');
      this.niches = nichesResponse.data;  // Populate the dropdown options
    } catch (error) {
      console.error('Failed to load profile or niches:', error);
    }
  },
  methods: {
    async handleProfileUpdate() {
      try {
        await this.$axios.post('/influencer/profile', {
          username: this.username,
          email: this.email,
          category: this.category,
          niche: this.niche,
          reach: this.reach,
        });
        this.$router.push('/influencer/dashboard');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    },
  },
};
</script>

<style src="@/assets/profile.css"></style>