<script setup>
  import {RouterView } from 'vue-router'
  import NavigationBarComponent from '../components/NavigationBarComponent.vue'
</script>

<template>
  <main>
    <div class="container custom-container mt-3">
      <h1 class="text-center">Obfuskator i detektor obfuskacji kodu źródłowego programów w HTML</h1>
      <NavigationBarComponent class="justify-content-center mt-3" />
      <RouterView/>
    </div>
  </main>
</template>

<style>
.custom-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
