<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const collapsed = ref(false)

function handleLogout() {
  // ganti dengan logic logout kamu (hapus token, panggil API, dll)
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <Sidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />

    <div class="admin-content" :class="{ 'admin-content--collapsed': collapsed }">
      <Navbar :collapsed="collapsed" @toggle-sidebar="collapsed = !collapsed" @logout="handleLogout" />

      <main class="admin-main">
        <!-- Konten tiap halaman dashboard masuk di sini -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.admin-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 256px;
  transition: margin-left 0.2s ease-in-out;
}

.admin-content--collapsed {
  margin-left: 80px;
}

.admin-main {
  flex: 1;
  padding: 24px;
}

@media (max-width: 640px) {
  .admin-main {
    padding: 16px;
  }
}
</style>
