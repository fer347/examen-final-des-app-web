<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: string
  username: string
  password: string
  role: string
}

const username = ref('')
const password = ref('')
const error = ref(false)

const router = useRouter()

const login = async () => {
  error.value = false

  try {
    const response = await fetch(
      'https://6a2dd6be2edd4cb330d16e43.mockapi.io/users'
    )

    const users: User[] = await response.json()

    const user = users.find(
      (u) =>
        u.username === username.value &&
        u.password === password.value
    )

    if (user) {
      localStorage.setItem('token', 'token_simulado')

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )

      router.push('/dashboard/productos')
    } else {
      error.value = true
    }
  } catch (err) {
    console.error(err)
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
