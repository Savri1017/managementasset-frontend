<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutGrid,
  Box,
  Tags,
  MapPin,
  ArrowLeftRight,
  Wrench,
  FileBarChart2,
  Users,
  Settings,
  ChevronDown,
  ChevronsLeft,
  Boxes,
  Target
} from 'lucide-vue-next'

const props = defineProps({
  collapsed: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])

const route = useRoute()

// Struktur menu — sesuaikan `to` dengan nama/path route di router kamu
const menuGroups = [
  {
    label: 'Utama',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: LayoutGrid }],
  },
  {
    label: 'Manajemen Aset',
    items: [
      { label: 'Data Aset', to: '/assets', icon: Box },
      { label: 'Kategori Aset', to: '/categories', icon: Tags },
      { label: 'Lokasi / Ruangan', to: '/locations', icon: MapPin },
    ],
  },
  {
    label: 'Transaksi',
    items: [
      { label: 'Peminjaman & Pengembalian', to: '/transactions', icon: ArrowLeftRight },
      { label: 'Pemeliharaan', to: '/maintenance', icon: Wrench },
    ],
  },
  {
    label: 'Laporan & Pengguna',
    items: [
      { label: 'Laporan', to: '/reports', icon: FileBarChart2 },
      { label: 'Pengguna', to: '/users', icon: Users },
      { label: 'Pengaturan', to: '/settings', icon: Settings },
    ],
  },
]

const openGroups = ref(Object.fromEntries(menuGroups.map((g) => [g.label, true])))

function toggleGroup(label) {
  openGroups.value[label] = !openGroups.value[label]
}

function isActive(to) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <!-- Brand -->
    <div class="sidebar-brand">
      <div class="brand-icon">
        <img src="@/assets/logo.png" alt="Logo" class="w-6 h-6" />
      </div>
    </div>

    <!-- Menu -->
    <ScrollArea class="sidebar-nav">
      <div v-for="group in menuGroups" :key="group.label" class="nav-group">
        <Button
          v-if="!collapsed"
          variant="ghost"
          size="sm"
          class="nav-group-toggle"
          @click="toggleGroup(group.label)"
        >
          <span>{{ group.label }}</span>
          <ChevronDown class="chevron" :class="{ 'chevron--closed': !openGroups[group.label] }" />
        </Button>

        <div
          class="nav-list-wrapper"
          :class="{ 'nav-list-wrapper--closed': !collapsed && !openGroups[group.label] }"
        >
          <ul class="nav-list">
            <li v-for="item in group.items" :key="item.to">
              <Button
                as-child
                variant="ghost"
                class="nav-link"
                :class="{ 'is-active': isActive(item.to) }"
              >
                <router-link :to="item.to">
                  <span class="nav-link-indicator" />
                  <component :is="item.icon" class="nav-icon" :size="18" />
                  <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
                </router-link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  </aside>
</template>

<style scoped>
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
  transition: width 0.2s ease-in-out;
}

.sidebar--collapsed {
  width: 80px;
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 64px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.brand-icon img {
  width: 130px;
  height: 32px;
}

.brand-text {
  min-width: 0;
  line-height: 1.25;
}

.brand-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-sidebar-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
}

.nav-group {
  margin-bottom: 20px;
}

.nav-group:last-child {
  margin-bottom: 0;
}

.nav-group-toggle {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 8px !important;
  height: auto !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  color: var(--color-sidebar-muted) !important;
}

.nav-group-toggle:hover {
  background-color: transparent !important;
  color: #ffffff !important;
}

.chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.15s ease;
}

.chevron--closed {
  transform: rotate(-90deg);
}

/* Accordion pakai grid-template-rows biar transisinya smooth tanpa JS */
.nav-list-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.15s ease;
}

.nav-list-wrapper--closed {
  grid-template-rows: 0fr;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  position: relative !important;
  display: flex !important;
  align-items: center;
  justify-content: flex-start !important;
  gap: 12px;
  width: 100%;
  height: auto !important;
  border-radius: 6px !important;
  padding: 8px 10px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #ffffff !important;
  text-decoration: none;
}

.nav-link:hover {
  background-color: var(--color-sidebar-hover) !important;
  color: #ffffff !important;
}

.nav-link.is-active {
  background-color: var(--color-sidebar-hover) !important;
  color: #ffffff !important;
}

.nav-link-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  border-radius: 0 3px 3px 0;
  background-color: var(--color-accent);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.nav-link.is-active .nav-link-indicator {
  opacity: 1;
}

.nav-icon {
  flex-shrink: 0;
  color: var(--color-sidebar-muted);
  transition: color 0.15s ease;
}

.nav-link:hover .nav-icon,
.nav-link.is-active .nav-icon {
  color: var(--background) !important;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collapse-btn {
  display: flex !important;
  align-items: center;
  justify-content: flex-start !important;
  gap: 12px;
  width: 100%;
  height: auto !important;
  padding: 8px 10px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  color: var(--color-sidebar-muted) !important;
}

.collapse-btn:hover {
  background-color: var(--color-sidebar-hover) !important;
  color: #ffffff !important;
}

.collapse-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.collapse-icon--rotated {
  transform: rotate(180deg);
}
</style>
