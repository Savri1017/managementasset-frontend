<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-vue-next'

defineProps({
  collapsed: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle-sidebar', 'logout'])

const route = useRoute()

// Judul halaman diambil dari meta route; fallback ke "Dashboard"
const pageTitle = ref(route.meta?.title ?? 'Dashboard')

const notifications = ref([
  { id: 1, text: 'Laptop Dell XPS-13 jatuh tempo servis besok', time: '10 menit lalu' },
  { id: 2, text: 'Pengajuan peminjaman proyektor menunggu persetujuan', time: '1 jam lalu' },
  { id: 3, text: '3 aset belum dikembalikan sesuai jadwal', time: 'Hari ini' },
])

const showNotifications = ref(false)
const showProfileMenu = ref(false)

function closeMenus() {
  showNotifications.value = false
  showProfileMenu.value = false
}
</script>

<template>
  <header class="navbar" @click="closeMenus">
    <!-- Sidebar toggle -->
    <button type="button" class="icon-btn" @click.stop="emit('toggle-sidebar')">
      <Menu :size="20" />
    </button>

    <!-- Judul halaman -->
    <div class="page-heading">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <p class="page-subtitle">Sistem Manajemen Aset Kantor</p>
    </div>

    <!-- Search -->
    <div class="search-wrap">
      <div class="search-box">
        <Search class="search-icon" :size="16" />
        <input type="text" placeholder="Cari aset, kode, atau lokasi..." class="search-input" />
      </div>
    </div>

    <div class="navbar-actions">
      <!-- Notifikasi -->
      <div class="dropdown">
        <button
          type="button"
          class="icon-btn"
          @click.stop="showNotifications = !showNotifications; showProfileMenu = false"
        >
          <Bell :size="20" />
          <span v-if="notifications.length" class="badge-dot" />
        </button>

        <div v-if="showNotifications" class="dropdown-panel" @click.stop>
          <div class="dropdown-header">
            <p>Notifikasi</p>
          </div>
          <ul class="notification-list">
            <li v-for="n in notifications" :key="n.id" class="notification-item">
              <p class="notification-text">{{ n.text }}</p>
              <p class="notification-time">{{ n.time }}</p>
            </li>
          </ul>
          <div class="dropdown-footer">
            <router-link to="/notifications" class="link-muted">Lihat semua notifikasi</router-link>
          </div>
        </div>
      </div>

      <!-- Profil -->
      <div class="dropdown">
        <button
          type="button"
          class="profile-btn"
          @click.stop="showProfileMenu = !showProfileMenu; showNotifications = false"
        >
          <div class="avatar">A</div>
          <span class="profile-name">Admin</span>
          <ChevronDown class="chevron-icon" :size="16" />
        </button>

        <div v-if="showProfileMenu" class="dropdown-panel profile-panel" @click.stop>
          <div class="profile-info">
            <p class="profile-info-name">Admin Aset</p>
            <p class="profile-info-email">admin@kantor.co.id</p>
          </div>
          <router-link to="/profile" class="menu-item">
            <User :size="16" /> Profil Saya
          </router-link>
          <router-link to="/settings" class="menu-item">
            <Settings :size="16" /> Pengaturan
          </router-link>
          <button type="button" class="menu-item menu-item--danger" @click="emit('logout')">
            <LogOut :size="16" /> Keluar
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 0 24px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.icon-btn:hover {
  background-color: #f1f5f9;
  color: var(--color-text);
}

.page-heading {
  min-width: 0;
}

.page-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-subtitle {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-subtle);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
}

@media (min-width: 640px) {
  .page-subtitle {
    display: block;
  }
}

/* Search */
.search-wrap {
  flex: 1;
  max-width: 420px;
  margin-left: 8px;
  display: none;
}

@media (min-width: 768px) {
  .search-wrap {
    display: block;
  }
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  font-size: 14px;
  color: #334155;
}

.search-input::placeholder {
  color: var(--color-text-subtle);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

/* Actions */
.navbar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdown {
  position: relative;
}

.badge-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-danger);
  box-shadow: 0 0 0 2px var(--color-surface);
}

.dropdown-panel {
  position: absolute;
  right: 0;
  margin-top: 8px;
  width: 320px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.1);
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.dropdown-header p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 280px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f8fafc;
  cursor: pointer;
}

.notification-item:hover {
  background-color: #f8fafc;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-text {
  margin: 0;
  font-size: 14px;
  color: #334155;
}

.notification-time {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--color-text-subtle);
}

.dropdown-footer {
  padding: 8px 16px;
  text-align: center;
}

.link-muted {
  font-size: 12px;
  font-weight: 500;
  color: #0d9488;
  text-decoration: none;
}

.link-muted:hover {
  text-decoration: underline;
}

/* Profile */
.profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 6px;
  border-radius: 6px;
  background: none;
  border: none;
  cursor: pointer;
}

.profile-btn:hover {
  background-color: #f1f5f9;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.profile-name,
.chevron-icon {
  display: none;
  color: var(--color-text-subtle);
}

@media (min-width: 640px) {
  .profile-name {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
  }
  .chevron-icon {
    display: block;
  }
}

.profile-panel {
  width: 208px;
  padding: 4px 0;
}

.profile-info {
  padding: 10px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.profile-info-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-info-email {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-text-subtle);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  font-size: 14px;
  color: #475569;
  text-decoration: none;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f8fafc;
}

.menu-item--danger {
  color: var(--color-danger);
}

.menu-item--danger:hover {
  background-color: var(--color-danger-soft);
}
</style>
