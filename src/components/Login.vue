<template>
  <div>
    <nav class="nav-links">
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/register" class="nav-link">Registration</router-link>
    </nav>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      
      <button type="submit">Login</button>
    </form>
    <Notification v-if="notification" :message="notification.message" :type="notification.type" />
  </div>
</template>

<script>
import Notification from './Notification.vue';

export default {
  name: 'LoginPage',
  components: {
    Notification
  },
  data() {
    return {
      email: '',
      password: '',
      notification: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.$router.push('/profile');
      } catch (error) {
        console.error('Error logging in:', error);
        this.notification = { message: 'Invalid credentials', type: 'error' };
      }
    }
  }
};
</script>

<style scoped src="./NavButtonStyles.css"></style>
