<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view /> <!-- Displays the component for the current route -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  background-color: #1c1c1c;
  color: #f5f5f5;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
