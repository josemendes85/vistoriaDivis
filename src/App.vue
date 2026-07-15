<template>
  <router-view />
  <ToastNotification />
</template>

<script setup>
import ToastNotification from './components/ToastNotification.vue';
</script>

<style>
/* Global style adjustments for the Vue app */
body {
  background-color: #f8f9fa;
}
</style>
