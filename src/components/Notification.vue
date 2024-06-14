<template>
  <div v-if="show" :class="['notification', type]">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
  props: {
    message: String,
    type: String,
    duration: {
      type: Number,
      default: 3000 // За замовчуванням відображаємо сповіщення протягом 3 секунд
    }
  },
  data() {
    return {
      show: true
    };
  },
  mounted() {
    // Після монтування компонента запускаємо таймер для автоматичного закриття сповіщення через вказаний час
    setTimeout(() => {
      this.show = false;
    }, this.duration);
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  z-index: 1000;
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}
</style>
