<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Boxes,
  ArrowRight,
  Target,
  Network,
} from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) return

  isLoading.value = true

  try {
    // TODO:
    // Ganti bagian ini dengan API login yang sebenarnya.
    // Untuk sementara tetap diarahkan ke dashboard.
    await new Promise((resolve) => setTimeout(resolve, 500))

    router.push('/dashboard')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <!-- Background decoration -->
    <div class="background-shape background-shape--one"></div>
    <div class="background-shape background-shape--two"></div>

    <div class="login-container">
      <!-- LEFT / BRAND -->
      <section class="brand-panel">
        <div class="brand-panel__content">
          <h1 class="brand-title">
            Kelola aset kantor
            <span>lebih mudah</span>
          </h1>

          <p class="brand-description">
            Pantau aset, lokasi, peminjaman, pemeliharaan, dan pengguna
            dalam satu sistem yang sederhana dan terorganisir.
          </p>

          <div class="brand-points">
            <div class="brand-point">
              <div class="point-icon">
                <ShieldCheck :size="17" />
              </div>
              <div>
                <strong>Terorganisir</strong>
                <span>Semua data aset tersusun rapi</span>
              </div>
            </div>
            <div class="brand-point">
              <div class="point-icon">
                <Boxes :size="17" />
              </div>
              <div>
                <strong>Terpusat</strong>
                <span>Kelola seluruh aset dari satu tempat</span>
              </div>
            </div>
            <div class="brand-point">
              <div class="point-icon">
                <Network :size="17" />
              </div>
              <div>
                <strong>Efisien</strong>
                <span>Proses peminjaman dan pemeliharaan lebih cepat</span>
              </div>
          </div>
          </div>
        </div>
      </section>

      <!-- RIGHT / LOGIN -->
      <section class="login-panel">
        <div class="login-card">
          <div class="login-heading">
            <div class="brand-logo brand-logo--small">
              <img src="/src/assets/energeek2.png" alt="Logo">
            </div>

            <h2>Masuk ke akun Anda</h2>

            <p>
              Masukkan email dan kata sandi untuk melanjutkan.
            </p>
          </div>

          <form class="login-form" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="form-field">
              <label for="email">Email</label>

              <div class="input-wrapper">
                <Mail class="input-icon" :size="18" />

                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="nama@perusahaan.com"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="form-field">
              <div class="field-header">
                <label for="password">Kata Sandi</label>
              </div>

              <div class="input-wrapper">
                <LockKeyhole class="input-icon" :size="18" />

                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi"
                  autocomplete="current-password"
                  required
                />

                <button
                  type="button"
                  class="password-toggle"
                  :aria-label="
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  "
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="login-button"
              :disabled="isLoading"
            >
              <span>
                {{ isLoading ? 'Memproses...' : 'Masuk' }}
              </span>

              <ArrowRight
                v-if="!isLoading"
                :size="18"
                stroke-width="2.2"
              />

              <span v-else class="loading-spinner"></span>
            </button>
          </form>

          <div class="login-footer">
            <span class="footer-line"></span>
            <span>ENERGEEK</span>
            <span class="footer-line"></span>
          </div>

          <p class="security-text">
            <ShieldCheck :size="14" />
            Akses sistem dilindungi dan hanya untuk pengguna terdaftar.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  overflow: hidden;
  background:
    radial-gradient(
      circle at top left,
      rgba(226, 77, 61, 0.12),
      transparent 34%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(209, 22, 11, 0.1),
      transparent 32%
    ),
    #fff9f8;
}

.login-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  width: min(1080px, 100%);
  min-height: 680px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(253, 225, 220, 0.95);
  border-radius: 28px;
  box-shadow:
    0 25px 70px rgba(150, 3, 0, 0.12),
    0 10px 30px rgba(15, 23, 42, 0.06);
}

/* =========================================================
   BACKGROUND
   ========================================================= */

.background-shape {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(4px);
}

.background-shape--one {
  width: 320px;
  height: 320px;
  top: -100px;
  right: -90px;
  background: rgba(239, 125, 108, 0.14);
}

.background-shape--two {
  width: 240px;
  height: 240px;
  bottom: -80px;
  left: -70px;
  background: rgba(209, 22, 11, 0.09);
}

/* =========================================================
   BRAND PANEL
   ========================================================= */

.brand-panel {
  position: relative;
  display: flex;
  align-items: center;
  padding: 64px;
  overflow: hidden;
  background:
    linear-gradient(
      145deg,
      #d1160b 0%,
      #e24d3d 45%,
      #ef7d6c 100%
    );
  color: #ffffff;
}

.brand-panel::before {
  content: '';
  position: absolute;
  width: 360px;
  height: 360px;
  right: -150px;
  top: -120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.brand-panel::after {
  content: '';
  position: absolute;
  width: 260px;
  height: 260px;
  left: -140px;
  bottom: -110px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.brand-panel__content {
  position: relative;
  z-index: 2;
  max-width: 470px;
}

.brand-title {
  margin: 0;
  font-size: clamp(38px, 4vw, 54px);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 750;
}

.brand-title span {
  display: block;
  color: #fde1dc;
}

.brand-description {
  max-width: 430px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  line-height: 1.8;
}

.brand-points {
  display: grid;
  gap: 14px;
  margin-top: 42px;
}

.brand-point {
  display: flex;
  align-items: center;
  gap: 14px;
}

.point-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.1);
}

.brand-point strong,
.brand-point span {
  display: block;
}

.brand-point strong {
  margin-bottom: 2px;
  font-size: 13px;
}

.brand-point span {
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
}

/* =========================================================
   LOGIN PANEL
   ========================================================= */

.login-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px;
  background: #ffffff;
}

.login-card {
  width: 100%;
  max-width: 420px;
}

.brand-logo {
  margin-bottom: 30px;
  width: 9rem;
}

.mobile-logo {
  display: none;
}

.login-heading {
  margin-bottom: 34px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #d1160b;
  font-size: 13px;
  font-weight: 700;
}

.login-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: 32px;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 750;
}

.login-heading > p:last-child {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

/* =========================================================
   FORM
   ========================================================= */

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-field label,
.field-header label {
  color: #1e293b;
  font-size: 13px;
  font-weight: 650;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-wrapper input {
  width: 100%;
  height: 50px;
  padding: 0 46px;
  border: 1px solid #fde1dc;
  border-radius: 12px;
  outline: none;
  background: #fff9f8;
  color: #0f172a;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #94a3b8;
}

.input-wrapper input:hover {
  border-color: #fccbc3;
}

.input-wrapper input:focus {
  border-color: #ef7d6c;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(226, 77, 61, 0.12);
}

.input-wrapper:focus-within .input-icon {
  color: #d1160b;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  transform: translateY(-50%);
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #94a3b8;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.password-toggle:hover {
  color: #d1160b;
  background: #fff2f0;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: -2px;
}

.remember-me {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #64748b !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  cursor: pointer;
}

.remember-me input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #fccbc3;
  border-radius: 5px;
  background: #ffffff;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.remember-me input:checked + .custom-checkbox {
  border-color: #d1160b;
  background: #d1160b;
  box-shadow: inset 0 0 0 3px #ffffff;
}

.forgot-button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #d1160b;
  font-size: 12px;
  font-weight: 650;
}

.forgot-button:hover {
  color: #b60400;
  text-decoration: underline;
}

/* =========================================================
   LOGIN BUTTON
   ========================================================= */

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 50px;
  margin-top: 4px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #d1160b 0%,
      #e24d3d 100%
    );
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
 
}

.login-button:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================================
   FOOTER
   ========================================================= */

.login-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 34px;
  color: #94a3b8;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.footer-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.security-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 18px 0 0;
  color: #94a3b8;
  font-size: 11px;
  text-align: center;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .login-page {
    padding: 20px;
  }

  .login-container {
    grid-template-columns: 1fr;
    max-width: 560px;
    min-height: auto;
  }

  .brand-panel {
    display: none;
  }

  .login-panel {
    min-height: 680px;
    padding: 48px 40px;
  }

  .mobile-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;
    color: #0f172a;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .brand-logo--small {
    margin: 20px 0 30px;
    border: 0;
  }
}

@media (max-width: 520px) {
  .login-page {
    padding: 12px;
  }

  .login-container {
    border-radius: 22px;
  }

  .login-panel {
    min-height: calc(100vh - 24px);
    padding: 32px 22px;
  }

  .mobile-logo {
    margin-bottom: 30px;
  }

  .login-heading h2 {
    font-size: 28px;
  }

  .form-options {
    align-items: flex-start;
    flex-direction: column;
  }

  .security-text {
    line-height: 1.6;
  }
}
</style>
```
