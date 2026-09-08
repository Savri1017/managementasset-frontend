<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  LayoutDashboard,
  Package,
  Tags,
  MapPin,
  ArrowLeftRight,
  Wrench,
  FileText,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-vue-next'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])
const route = useRoute()

const openGroups = ref({
  manajemen: true,
  transaksi: true,
  laporan: true,
})

const toggleGroup = (group) => {
  openGroups.value[group] = !openGroups.value[group]
}

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': props.collapsed }">
    <!-- Logo -->
    <div class="sidebar-brand">
      <div class="brand-icon">
        <Transition name="logo-fade" mode="out-in">
          <!-- Logo saat sidebar terbuka -->
          <img
            v-if="!props.collapsed"
            key="full-logo"
            src="@/assets/logo.png"
            alt="Logo"
            class="brand-logo brand-logo--full"
          />
          <!-- Logo saat sidebar tertutup -->
          <img
            v-else
            key="small-logo"
            src="@/assets/logo2.png"
            alt="Logo"
            class="brand-logo brand-logo--small"
          />
        </Transition>
      </div>
    </div>

    <!-- Navigation -->
    <ScrollArea class="sidebar-scroll">
      <nav class="sidebar-nav">
        
        <!-- ==================== UTAMA ==================== -->
        <div class="nav-section">
          <div class="nav-section-title">
            Utama
          </div>

          <Button
            variant="ghost"
            class="nav-item"
            :class="{ 'nav-item--active': isActive('/dashboard') }"
            @click="$router.push('/dashboard')"
          >
            <LayoutDashboard :size="20" class="nav-icon" />
            <span class="nav-label">Dashboard</span>
          </Button>
        </div>

        <!-- ==================== MANAJEMEN ASET ==================== -->
        <div class="nav-section">
          <button
            class="nav-section-header"
            @click="toggleGroup('manajemen')"
          >
            <span>Manajemen Aset</span>
            <ChevronRight
              :size="16"
              class="chevron-icon"
              :class="{ 'chevron-icon--open': openGroups.manajemen }"
            />
          </button>

          <Transition name="dropdown">
            <div v-show="props.collapsed || openGroups.manajemen" class="nav-group">
              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/assets') }"
                @click="$router.push('/assets')"
              >
                <Package :size="20" class="nav-icon" />
                <span class="nav-label">Data Aset</span>
              </Button>

              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/categories') }"
                @click="$router.push('/categories')"
              >
                <Tags :size="20" class="nav-icon" />
                <span class="nav-label">Kategori Aset</span>
              </Button>

              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/locations') }"
                @click="$router.push('/locations')"
              >
                <MapPin :size="20" class="nav-icon" />
                <span class="nav-label">Lokasi / Ruangan</span>
              </Button>
            </div>
          </Transition>
        </div>

        <!-- ==================== TRANSAKSI ==================== -->
        <div class="nav-section">
          <button
            class="nav-section-header"
            @click="toggleGroup('transaksi')"
          >
            <span>Transaksi</span>
            <ChevronRight
              :size="16"
              class="chevron-icon"
              :class="{ 'chevron-icon--open': openGroups.transaksi }"
            />
          </button>

          <Transition name="dropdown">
            <div v-show="props.collapsed || openGroups.transaksi" class="nav-group">
              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/transactions') }"
                @click="$router.push('/transactions')"
              >
                <ArrowLeftRight :size="20" class="nav-icon" />
                <span class="nav-label">Peminjaman</span>
              </Button>

              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/maintenance') }"
                @click="$router.push('/maintenance')"
              >
                <Wrench :size="20" class="nav-icon" />
                <span class="nav-label">Pemeliharaan</span>
              </Button>
            </div>
          </Transition>
        </div>

        <!-- ==================== LAPORAN & PENGGUNA ==================== -->
        <div class="nav-section">
          <button
            class="nav-section-header"
            @click="toggleGroup('laporan')"
          >
            <span>Laporan & Pengguna</span>
            <ChevronRight
              :size="16"
              class="chevron-icon"
              :class="{ 'chevron-icon--open': openGroups.laporan }"
            />
          </button>

          <Transition name="dropdown">
            <div v-show="props.collapsed || openGroups.laporan" class="nav-group">
              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/reports') }"
                @click="$router.push('/reports')"
              >
                <FileText :size="20" class="nav-icon" />
                <span class="nav-label">Laporan</span>
              </Button>

              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/users') }"
                @click="$router.push('/users')"
              >
                <Users :size="20" class="nav-icon" />
                <span class="nav-label">Pengguna</span>
              </Button>

              <Button
                variant="ghost"
                class="nav-item"
                :class="{ 'nav-item--active': isActive('/settings') }"
                @click="$router.push('/settings')"
              >
                <Settings :size="20" class="nav-icon" />
                <span class="nav-label">Pengaturan</span>
              </Button>
            </div>
          </Transition>
        </div>
        
      </nav>
    </ScrollArea>
  </aside>
</template>

<style scoped>
/* ================================
   SIDEBAR & TRANSISI UTAMA
================================ */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: 256px;
  background-color: var(--color-sidebar-bg);
  color: #f2f5f8;
  overflow: hidden;
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s ease;
}

.sidebar--collapsed {
  width: 80px;
}

/* ================================
   BRAND / LOGO
================================ */
.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.brand-logo {
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}

.brand-logo--full {
  width: 130px;
  height: 32px;
}

.brand-logo--small {
  width: 42px;
  height: 42px;
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.logo-fade-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.logo-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* ================================
   SCROLL & NAVIGATION
================================ */
.sidebar-scroll {
  flex: 1;
  min-height: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Header & Sub-judul Menu (Smooth Fade Out saat Collapsed) */
.nav-section-title,
.nav-section-header {
  white-space: nowrap;
  overflow: hidden;
  max-height: 32px;
  opacity: 1;
  transition: 
    opacity 0.2s ease, 
    max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), 
    padding 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-section-title {
  padding: 0 12px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.55);
}

.nav-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.nav-section-header:hover {
  color: #ffffff;
}

.sidebar--collapsed .nav-section-title,
.sidebar--collapsed .nav-section-header {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  pointer-events: none;
}

/* --- Ikon Chevron Animasi --- */
.chevron-icon {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.chevron-icon--open {
  transform: rotate(90deg);
}

/* ================================
   NAV ITEM & LABEL TRANSITION
================================ */
.nav-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 42px;
  gap: 12px;
  padding: 8px 18px;
  border-radius: 8px;
  color: rgb(255, 255, 255);
  overflow: hidden;
  transition: 
    background-color 0.2s ease, 
    color 0.2s ease, 
    transform 0.2s ease,
    padding 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-icon {
  flex-shrink: 0;
}

/* Animasi teks label menu */
.nav-label {
  white-space: nowrap;
  opacity: 1;
  max-width: 160px;
  overflow: hidden;
  transition: 
    opacity 0.2s ease, 
    max-width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar--collapsed .nav-label {
  opacity: 0;
  max-width: 0;
}

.nav-item:hover {
  background-color: var(--color-sidebar-hover);
  color: #ffffff;
}

.nav-item:active {
  transform: scale(0.98);
}

.nav-item--active {
  background-color: var(--color-accent);
  color: #ffffff;
}

/* ================================
   ANIMASI DROPDOWN (VUE TRANSITION)
================================ */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: max-height 0.35s ease, opacity 0.35s ease, margin 0.35s ease;
  max-height: 250px; 
  opacity: 1;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: -4px;
}

/* ================================
   COLLAPSED STATE
================================ */
.sidebar--collapsed .sidebar-nav {
  padding-left: 12px;
  padding-right: 12px;
}

.sidebar--collapsed .nav-item {
  padding-left: 18px;
  padding-right: 18px;
}
</style>