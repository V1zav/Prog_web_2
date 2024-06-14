<template>
    <nav class="nav-links">
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/contacts" class="nav-link">Contacts</router-link>
    </nav>
  <div>
    <h1>Profile</h1>
    <p><strong>Username:</strong> {{ user.username }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
name: 'ProfilePage',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped src="./NavButtonStyles.css"></style>
