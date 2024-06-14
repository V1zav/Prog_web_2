<template>
  <div>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Registration</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
    <h1>Edit Contact</h1>
    <form @submit.prevent="editContact">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="editedContact.name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="editedContact.email" required>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedContact: {
        id: null,
        name: '',
        email: ''
      }
    };
  },
  methods: {
    async fetchContact() {
      try {
        const id = this.$route.params.id;
        const response = await this.$axios.get(`/contacts/${id}`);
        this.editedContact = response.data;
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    },
    async editContact() {
      try {
        const id = this.$route.params.id;
        await this.$axios.put(`/contacts/${id}`, this.editedContact);
        this.$router.push('/contacts');
      } catch (error) {
        console.error('Error editing contact:', error);
      }
    }
  },
  mounted() {
    this.fetchContact();
  }
}
</script>

<style scoped src="./NavButtonStyles.css">

</style>
