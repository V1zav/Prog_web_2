<template>
  <div>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/contacts" class="nav-link">Contacts</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Registration</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
    <h1>Add Contact</h1>
    <form @submit.prevent="addContact">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="newContact.name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="newContact.email" required>
      <button type="submit">Add Contact</button>
    </form>
    <div v-if="addedContact">
      <h2>Added Contact Information:</h2>
      <p>Name: {{ addedContact.name }}</p>
      <p>Email: {{ addedContact.email }}</p>
      <button @click="goToContacts">Go to Contacts</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newContact: {
        name: '',
        email: ''
      },
      addedContact: null
    };
  },
  methods: {
    async addContact() {
      try {
        const response = await this.$axios.post('/contacts', this.newContact);
        this.newContact = { name: '', email: '' };
        this.addedContact = response.data;
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    },
    goToContacts() {
      this.$router.push('/contacts');
    }
  }
}
</script>

<style scoped src="./NavButtonStyles.css">

</style>
