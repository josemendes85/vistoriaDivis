<template>
  <router-view />
  <ToastNotification />
</template>

<script setup>
import ToastNotification from '@/shared/components/ToastNotification.vue';
</script>

<style>
/* Global style adjustments for the Vue app */
body {
  background-color: var(--app-bg);
}
</style>
