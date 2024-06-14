<template>
  <div>
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Registration</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
    <h1>Contacts Page</h1>
    <div>
      <button @click="sortBy('name')" class="sort-button">Sort by Name</button>
      <button @click="sortBy('email')" class="sort-button">Sort by Email</button>
    </div>
    <input type="text" v-model="searchQuery" placeholder="Search...">
    <ul>
      <li v-for="contact in filteredContacts" :key="contact._id">
        {{ contact.name }} - {{ contact.email }}
        <button @click="editContact(contact._id)" class="edit-button">Edit</button>
        <button @click="deleteContact(contact._id)" class="delete-button">Delete</button>
      </li>
    </ul>
    <router-link to="/contacts/add">
      <button class="add-button">Add Contact</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ContactsPage',
  data() {
    return {
      contacts: [],
      searchQuery: '',
      sortDirection: {}
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchContacts() {
      try {
        const response = await this.$axios.get('/contacts');
        this.contacts = response.data;
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    },
    async deleteContact(id) {
      try {
        await this.$axios.delete(`/contacts/${id}`);
        await this.fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    },
    editContact(id) {
      this.$router.push({ name: 'EditContact', params: { id: id } });
    },
    sortBy(key) {
      if (!this.sortDirection[key]) {
        this.contacts.sort((a, b) => a[key].localeCompare(b[key]));
        this.sortDirection[key] = 'asc';
      } else {
        this.contacts.sort((a, b) => b[key].localeCompare(a[key]));
        this.sortDirection[key] = '';
      }
    }
  },
  mounted() {
    this.fetchContacts();
  }
}
</script>

<style scoped src="./NavButtonStyles.css">
.edit-button,
.delete-button,
.add-button,
.sort-button {
  margin-top: 10px;
}
</style>
