

<template>
  <div class="container-fluid">

    <div
      class="d-flex justify-content-between align-items-center mb-4"
    >
      <h2>
        <i class="bi bi-bag-fill"></i>
        Productos
      </h2>

      <button
         v-if="isAdmin"
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
      >
        <i class="bi bi-plus-circle"></i>
        Nuevo Producto
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
      <table
        class="table table-bordered table-hover"
      >
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th v-if="isAdmin">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
          >
            <td>{{ product.id }}</td>


            <td>
              <img
                :src="product.image"
                width="80"
              />
            </td>

            <td>{{ product.name }}</td>

            <td>
              ${{ product.price }}

            </td>

             <td v-if="isAdmin">
  <button
    class="btn btn-warning btn-sm me-2"
    data-bs-toggle="modal"
    data-bs-target="#editModal"
    @click="openEditModal(product)"
  >
    <i class="bi bi-pencil-square"></i>
  </button>

  <button
    class="btn btn-danger btn-sm"
    data-bs-toggle="modal"
    data-bs-target="#deleteModal"
    @click="openDeleteModal(product)"
  >
    <i class="bi bi-trash"></i>
  </button>
</td>
</tr>

        </tbody>

      </table>
    </div>

    <!-- MODAL CREAR -->

    <div
      class="modal fade"
      id="createModal"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>
              Crear Producto
            </h5>
          </div>

          <div class="modal-body">

            <input
              v-model="productForm.name"
              class="form-control mb-3"
              placeholder="Nombre"
            />

            <input
              v-model="productForm.price"
              type="number"
              class="form-control mb-3"
              placeholder="Precio"
            />

            <input
              v-model="productForm.image"
              class="form-control"
              placeholder="URL Imagen"
            />

          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="saveProduct"
            >
              Guardar
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL EDITAR -->

    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>
              Editar Producto
            </h5>
          </div>

          <div
            class="modal-body"
            v-if="selectedProduct"
          >

            <input
              v-model="selectedProduct.name"
              class="form-control mb-3"
            />

            <input
              v-model="selectedProduct.price"
              type="number"
              class="form-control mb-3"
            />

            <input
              v-model="selectedProduct.image"
              class="form-control"
            />

          </div>

          <div class="modal-footer">

            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button

              class="btn btn-warning"
              data-bs-dismiss="modal"
              @click="updateCurrentProduct"
            >
              Actualizar
            </button>

          </div>

        </div>
      </div>
    </div>

    <!-- MODAL ELIMINAR -->

    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>
              Confirmar eliminación
            </h5>
          </div>

          <div class="modal-body">
            ¿Desea eliminar este producto?
          </div>

          <div class="modal-footer">

            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button

              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="removeProduct"
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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product
} from '../services/productService.ts'
const currentUser = JSON.parse(
  localStorage.getItem('user') || '{}'
)

console.log('Usuario logueado:', currentUser)

const isAdmin =
  currentUser.role === 'admin'

const products = ref<Product[]>([])

const alertMessage = ref('')
const alertType = ref('success')

const productForm = ref<Product>({
  name: '',
  price: 0,
  image: ''
})

const selectedProduct = ref<Product | null>(null)

const loadProducts = async () => {
  products.value = await getProducts()
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

const saveProduct = async () => {
  if (
    !productForm.value.name ||
    !productForm.value.price ||
    !productForm.value.image
  ) {
    showAlert(
      'Todos los campos son obligatorios',
      'danger'
    )
    return
  }

  await createProduct(productForm.value)

  showAlert(
    'Producto creado correctamente',
    'success'
  )

  productForm.value = {
    name: '',
    price: 0,
    image: ''
  }

  await loadProducts()
}

const openEditModal = (
  product: Product
) => {
  selectedProduct.value = { ...product }
}

const updateCurrentProduct = async () => {
  console.log('EDITAR:', selectedProduct.value)

  if (!selectedProduct.value?.id) {
    console.log('No hay ID')
    return
  }

  await updateProduct(
    selectedProduct.value.id,
    selectedProduct.value
  )

  await loadProducts()
}

const openDeleteModal = (
  product: Product
) => {
  console.log(product)

  selectedProduct.value = product
}
const removeProduct = async () => {
  console.log('ELIMINAR:', selectedProduct.value)

  if (!selectedProduct.value?.id) {
    console.log('No hay ID')
    return
  }

  await deleteProduct(
    selectedProduct.value.id
  )

  await loadProducts()
}

onMounted(() => {
  loadProducts()
})
</script>
