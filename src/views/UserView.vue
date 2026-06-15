<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>
        <i class="bi bi-people-fill"></i>
        Usuarios
      </h2>

      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
      >
        <i class="bi bi-plus-circle"></i>
        Nuevo Usuario
      </button>
    </div>

    <!-- ALERTA -->
    <div
      v-if="alertMessage"
      :class="`alert alert-${alertType}`"
    >
      {{ alertMessage }}
    </div>

    <!-- TABLA -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.password }}</td>
            <td>{{ user.role }}</td>

            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                @click="openEditModal(user)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>

              <button
                class="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                @click="openDeleteModal(user)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- MODAL CREAR -->
    <div class="modal fade" id="createModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>Crear Usuario</h5>
          </div>

          <div class="modal-body">

            <input
              v-model="userForm.username"
              class="form-control mb-3"
              placeholder="Usuario"
            />

            <input
              v-model="userForm.password"
              type="password"
              class="form-control mb-3"
              placeholder="Contraseña"
            />

            <input
              v-model="userForm.role"
              class="form-control"
              placeholder="Rol (admin/user)"
            />

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>

            <button
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="saveUser"
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL EDITAR -->
    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>Editar Usuario</h5>
          </div>

          <div class="modal-body" v-if="selectedUser">

            <input
              v-model="selectedUser.username"
              class="form-control mb-3"
            />

            <input
              v-model="selectedUser.password"
              type="password"
              class="form-control mb-3"
            />

            <input
              v-model="selectedUser.role"
              class="form-control"
            />

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>

            <button
              class="btn btn-warning"
              data-bs-dismiss="modal"
              @click="updateCurrentUser"
            >
              Actualizar
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL ELIMINAR -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>Confirmar eliminación</h5>
          </div>

          <div class="modal-body">
            ¿Desea eliminar este usuario?
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>

            <button
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="removeUser"
            >
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User
} from '../services/userService'

const users = ref<User[]>([])

const alertMessage = ref('')
const alertType = ref('success')

const userForm = ref<User>({
  username: '',
  password: '',
  role: ''
})

const selectedUser = ref<User | null>(null)

const loadUsers = async () => {
  users.value = await getUsers()
}

const showAlert = (
  message: string,
  type: string
) => {
  alertMessage.value = message
  alertType.value = type

  setTimeout(() => {
    alertMessage.value = ''
  }, 3000)
}

const saveUser = async () => {
  if (
    !userForm.value.username ||
    !userForm.value.password ||
    !userForm.value.role
  ) {
    showAlert(
      'Todos los campos son obligatorios',
      'danger'
    )
    return
  }

  await createUser(userForm.value)

  showAlert(
    'Usuario creado correctamente',
    'success'
  )

  userForm.value = {
    username: '',
    password: '',
    role: ''
  }

  await loadUsers()
}

const openEditModal = (
  user: User
) => {
  selectedUser.value = { ...user }
}

const updateCurrentUser = async () => {
  if (!selectedUser.value?.id) return

  await updateUser(
    selectedUser.value.id,
    selectedUser.value
  )

  showAlert(
    'Usuario actualizado correctamente',
    'warning'
  )

  await loadUsers()
}

const openDeleteModal = (
  user: User
) => {
  selectedUser.value = user
}

const removeUser = async () => {
  if (!selectedUser.value?.id) return

  await deleteUser(
    selectedUser.value.id
  )

  showAlert(
    'Usuario eliminado correctamente',
    'danger'
  )

  await loadUsers()
}

onMounted(() => {
  loadUsers()
})
</script>
