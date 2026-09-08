<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
</script>

<template>
  <header class="navbar">
    <!-- Sidebar toggle -->
    <Button variant="ghost" size="icon" class="icon-btn" @click="emit('toggle-sidebar')">
      <Menu :size="20" />
    </Button>

    <!-- Judul halaman -->
    <div class="page-heading">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <p class="page-subtitle">Sistem Manajemen Aset Kantor</p>
    </div>

    <!-- Search -->
    <div class="search-wrap">
      <div class="search-box">
        <Search class="search-icon" :size="16" />
        <Input type="text" placeholder="Cari aset, kode, atau lokasi..." class="search-input" />
      </div>
    </div>

    <div class="navbar-actions">
      <!-- Notifikasi -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="icon-btn">
            <Bell :size="20" />
            <Badge v-if="notifications.length" class="badge-dot" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="dropdown-panel notification-panel">
          <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            v-for="n in notifications"
            :key="n.id"
            class="notification-item"
          >
            <div>
              <p class="notification-text">{{ n.text }}</p>
              <p class="notification-time">{{ n.time }}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child class="dropdown-footer-link">
            <router-link to="/notifications">Lihat semua notifikasi</router-link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="navbar-separator" />

      <!-- Profil -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="profile-btn">
            <Avatar class="avatar">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span class="profile-name">Admin</span>
            <ChevronDown class="chevron-icon" :size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="dropdown-panel">
          <DropdownMenuLabel>
            <p class="profile-info-name">Admin Aset</p>
            <p class="profile-info-email">admin@kantor.co.id</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child>
            <router-link to="/profile" class="menu-item">
              <User :size="16" /> Profil Saya
            </router-link>
          </DropdownMenuItem>
          <DropdownMenuItem as-child>
            <router-link to="/settings" class="menu-item">
              <Settings :size="16" /> Pengaturan
            </router-link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="menu-item menu-item--danger" @click="emit('logout')">
            <LogOut :size="16" /> Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

/* Button ghost/icon dari shadcn sudah pas untuk tombol ikon di navbar terang,
   jadi override di sini cuma sedikit penyesuaian warna. */
.icon-btn {
  position: relative;
  flex-shrink: 0;
  color: var(--color-text-muted) !important;
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
  z-index: 1;
}

.search-input {
  padding-left: 36px;
  background-color: var(--color-bg);
}

/* Actions */
.navbar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar-separator {
  height: 24px;
}

.badge-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  min-width: 0;
  padding: 0;
  border-radius: 50%;
  background-color: var(--color-danger) !important;
  box-shadow: 0 0 0 2px var(--color-surface);
}

/* Dropdown panels */
.dropdown-panel {
  width: 288px;
}

.notification-panel {
  padding: 4px 0;
}

.notification-item {
  padding: 10px 12px !important;
  cursor: pointer;
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

.dropdown-footer-link {
  justify-content: center !important;
  font-size: 12px !important;
  font-weight: 500;
  color: #0d9488 !important;
}

/* Profile */
.profile-btn {
  display: flex !important;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px 6px !important;
  height: auto !important;
}

.avatar {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
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
  font-weight: 400;
  color: var(--color-text-subtle);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  color: #475569;
  text-decoration: none;
}

.menu-item--danger {
  color: var(--color-danger) !important;
}
</style>
