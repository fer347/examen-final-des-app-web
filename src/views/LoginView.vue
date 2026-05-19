<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import users from '../data/users.json'

const username = ref('')
const password = ref('')
const error = ref(false)

const router = useRouter()

const login = () => {
  const user = users.find(
    (u) =>
      u.username === username.value &&
      u.password === password.value
  )

  if (user) {
    router.push('/dashboard/productos')
  } else {
    error.value = true
  }
}
</script>

<template>
  <div class="container mt-5">
    <div
      class="card shadow p-4 mx-auto"
      style="max-width: 400px"
    >
      <h2 class="text-center mb-4">
        Iniciar Sesión
      </h2>

      <div
        v-if="error"
        class="alert alert-danger"
      >
        Credenciales incorrectas
      </div>

      <input
        v-model="username"
        class="form-control mb-3"
        placeholder="Usuario"
      />

      <input
        v-model="password"
        type="password"
        class="form-control mb-3"
        placeholder="Contraseña"
      />

      <button
        class="btn btn-primary w-100"
        @click="login"
      >
        Entrar
      </button>
    </div>
  </div>
</template>