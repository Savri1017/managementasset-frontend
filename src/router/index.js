import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },

  // Semua halaman admin dibungkus AdminLayout (ada sidebar + navbar)
  {
    path: '/',
    component: () => import('../layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'assets',
        name: 'assets',
        component: () => import('../pages/assets/AssetList.vue'),
        meta: { title: 'Data Aset' },
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../pages/assets/CategoryList.vue'),
        meta: { title: 'Kategori Aset' },
      },
      {
        path: 'locations',
        name: 'locations',
        component: () => import('../pages/assets/LocationList.vue'),
        meta: { title: 'Lokasi / Ruangan' },
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('../pages/transactions/TransactionList.vue'),
        meta: { title: 'Peminjaman & Pengembalian' },
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: () => import('../pages/transactions/MaintenanceList.vue'),
        meta: { title: 'Pemeliharaan' },
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../pages/Reports.vue'),
        meta: { title: 'Laporan' },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../pages/Users.vue'),
        meta: { title: 'Pengguna' },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../pages/Settings.vue'),
        meta: { title: 'Pengaturan' },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../pages/Profile.vue'),
        meta: { title: 'Profil Saya' },
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('../pages/Notifications.vue'),
        meta: { title: 'Notifikasi' },
      },
    ],
  },

  // Fallback untuk path yang tidak ditemukan
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
