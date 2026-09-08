<script setup>
// App.vue sengaja dibuat sangat sederhana: hanya jadi "wadah" router.
// Halaman login/register tampil polos (tanpa sidebar/navbar),
// sedangkan halaman admin membungkus dirinya sendiri dengan AdminLayout
// lewat nested route di router/index.js. Lihat catatan di bawah.
</script>

<template>
  <router-view />
</template>

<style>
/* App.vue sengaja tidak punya style scoped:
   ini adalah root komponen, jadi style global taruh di style.css saja. */
</style>
