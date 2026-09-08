<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
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
        <Boxes :size="20" />
      </div>
      <div v-if="!collapsed" class="brand-text">
        <p class="brand-title">SIMASET</p>
        <p class="brand-subtitle">Manajemen Aset Kantor</p>
      </div>
    </div>

    <!-- Menu -->
    <nav class="sidebar-nav">
      <div v-for="group in menuGroups" :key="group.label" class="nav-group">
        <button
          v-if="!collapsed"
          type="button"
          class="nav-group-toggle"
          @click="toggleGroup(group.label)"
        >
          <span>{{ group.label }}</span>
          <ChevronDown class="chevron" :class="{ 'chevron--closed': !openGroups[group.label] }" />
        </button>

        <div
          class="nav-list-wrapper"
          :class="{ 'nav-list-wrapper--closed': !collapsed && !openGroups[group.label] }"
        >
          <ul class="nav-list">
            <li v-for="item in group.items" :key="item.to">
              <router-link
                :to="item.to"
                class="nav-link"
                :class="{ 'is-active': isActive(item.to) }"
              >
                <span class="nav-link-indicator" />
                <component :is="item.icon" class="nav-icon" :size="18" />
                <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Collapse toggle -->
    <div class="sidebar-footer">
      <button type="button" class="collapse-btn" @click="emit('toggle')">
        <ChevronsLeft class="collapse-icon" :class="{ 'collapse-icon--rotated': collapsed }" :size="18" />
        <span v-if="!collapsed">Ciutkan menu</span>
      </button>
    </div>
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
  color: #cbd5e1;
  transition: width 0.2s ease-in-out;
}

.sidebar--collapsed {
  width: 80px;
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
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
  color: var(--color-text-subtle);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Nav */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-group-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  color: #cbd5e1;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background-color: var(--color-sidebar-hover);
  color: #ffffff;
}

.nav-link.is-active {
  background-color: var(--color-sidebar-hover);
  color: #ffffff;
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
  color: var(--color-text-subtle);
  transition: color 0.15s ease;
}

.nav-link:hover .nav-icon,
.nav-link.is-active .nav-icon {
  color: var(--color-accent);
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Footer */
.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  flex-shrink: 0;
}

.collapse-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-subtle);
  font-size: 14px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.collapse-btn:hover {
  background-color: var(--color-sidebar-hover);
  color: #ffffff;
}

.collapse-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.collapse-icon--rotated {
  transform: rotate(180deg);
}
</style>
