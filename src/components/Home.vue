<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to our Contact Management System!</p>
    <p>Here, you can manage your contacts effortlessly. Use the navigation links at the top to access different pages and functionalities.</p>
    <router-link to="/contacts">
      <button>Get Started</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>

</style>
