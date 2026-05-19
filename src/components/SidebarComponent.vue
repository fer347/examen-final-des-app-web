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

    </ul>

  </div>
</template>