<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const currentUser = JSON.parse(
  localStorage.getItem('user') || '{}'
)

const isAdmin =
  currentUser.role === 'admin'

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  router.push('/login')
}
</script>

<template>
  <div
    class="bg-dark text-white p-4 shadow"
    style="width: 260px; min-height: 100vh;"
  >
    <h4 class="mb-4">
      Menú
    </h4>

    <ul class="nav flex-column">

      <li class="nav-item mb-3">
        <router-link
          to="/dashboard/productos"
          class="nav-link text-white fs-5"
        >
          <i class="bi bi-bag-fill me-2"></i>
          Productos
        </router-link>
      </li>

      <!-- SOLO ADMIN -->
      <li
        v-if="isAdmin"
        class="nav-item mb-3"
      >
        <router-link
          to="/dashboard/usuarios"
          class="nav-link text-white fs-5"
        >
          <i class="bi bi-people-fill me-2"></i>
          Usuarios
        </router-link>
      </li>

      <li class="nav-item mt-4">
        <button
          class="btn btn-danger w-100"
          @click="logout"
        >
          <i class="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </button>
      </li>

    </ul>
  </div>
</template>
