<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

function handleLogin() {
  // TODO: ganti dengan pemanggilan API login yang sebenarnya
  router.push('/dashboard')
}
</script>

<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="handleLogin">
      <h1 class="login-title">SIMASET</h1>
      <p class="login-subtitle">Masuk untuk mengelola aset kantor</p>

      <label class="field">
        <span class="field-label">Email</span>
        <input v-model="email" type="email" class="field-input" required />
      </label>

      <label class="field">
        <span class="field-label">Kata Sandi</span>
        <input v-model="password" type="password" class="field-input" required />
      </label>

      <button type="submit" class="login-button">Masuk</button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  padding: 16px;
}

.login-card {
  width: 100%;
  max-width: 360px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 32px;
}

.login-title {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.login-subtitle {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.field {
  display: block;
  margin-bottom: 16px;
}

.field-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.field-input {
  width: 100%;
  padding: 9px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  font-size: 14px;
}

.field-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.login-button {
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: var(--color-accent);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.login-button:hover {
  opacity: 0.9;
}
</style>
