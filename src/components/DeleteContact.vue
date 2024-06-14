<template>
  <div>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Registration</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
    <h1>Delete Contact</h1>
    <p v-if="contact">Are you sure you want to delete this contact?</p>
    <p v-if="contact">{{ contact.name }} - {{ contact.email }}</p>
    <button @click="deleteContact">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['contact'],
  methods: {
    async deleteContact() {
      try {
        await this.$axios.delete(`/contacts/${this.contact.id}`);
        this.$router.push('/contacts');
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }
}
</script>

<style scoped src="./NavButtonStyles.css">

</style>
