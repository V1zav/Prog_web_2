<template>
    <nav class="nav-links">
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
    </nav>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      
      <button type="submit">Register</button>
    </form>
    <Notification v-if="notification" :message="notification.message" :type="notification.type" />
  </div>
</template>

<script>
import Notification from './Notification.vue';

export default {
  name: 'RegisterPage',
  components: {
    Notification
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
      notification: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.message = response.data.message;
        this.notification = { message: 'Registration successful', type: 'success' };
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data.message) {
          this.message = error.response.data.message;
          this.notification = { message: this.message, type: 'error' };
        } else {
          console.error('Error registering:', error);
          this.notification = { message: 'Error registering. Please try again later.', type: 'error' };
        }
      }
    }
  }
};
</script>


<style scoped src="./NavButtonStyles.css"></style>
