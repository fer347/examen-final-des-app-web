
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import productsData from '../data/products.json'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products = ref<Product[]>([])

const newProduct = ref({
  name: '',
  price: '',
  image: ''
})

const editMode = ref(false)
const editId = ref<number | null>(null)

const saveProducts = () => {
  localStorage.setItem(
    'products',
    JSON.stringify(products.value)
  )
}

const deleteProduct = (id: number) => {
  products.value = products.value.filter(
    product => product.id !== id
  )

  saveProducts()
}

const addProduct = () => {

  if (
    !newProduct.value.name ||
    !newProduct.value.price ||
    !newProduct.value.image
  ) {
    return
  }

  if (editMode.value && editId.value !== null) {

    const index = products.value.findIndex(
      product => product.id === editId.value
    )

    if (index !== -1) {

      products.value[index] = {
        id: editId.value,
        name: newProduct.value.name,
        price: Number(newProduct.value.price),
        image: newProduct.value.image
      }

    }

    editMode.value = false
    editId.value = null

  } else {

    products.value.push({
      id: Date.now(),
      name: newProduct.value.name,
      price: Number(newProduct.value.price),
      image: newProduct.value.image
    })

  }

  saveProducts()

  newProduct.value = {
    name: '',
    price: '',
    image: ''
  }
}

const editProduct = (product: Product) => {

  newProduct.value = {
    name: product.name,
    price: String(product.price),
    image: product.image
  }

  editMode.value = true
  editId.value = product.id
}

onMounted(() => {

  const savedProducts =
    localStorage.getItem('products')

  if (savedProducts) {

    products.value = JSON.parse(savedProducts)

  } else {

    products.value = productsData

    saveProducts()
  }

})
</script>

<template>

  <div>

    <div
      class="d-flex justify-content-between align-items-center mb-4"
    >

      <h1 class="fw-bold">
        Colección Urbana 👕
      </h1>

    </div>

    <!-- FORMULARIO -->

    <div class="card shadow border-0 p-4 mb-5">

      <h3 class="mb-4">

        {{ editMode
          ? 'Editar Producto ✏️'
          : 'Nuevo Producto ➕'
        }}

      </h3>

      <div class="row">

        <div class="col-md-4 mb-3">

          <input
            v-model="newProduct.name"
            type="text"
            class="form-control"
            placeholder="Nombre del producto"
          />

        </div>

        <div class="col-md-4 mb-3">

          <input
            v-model="newProduct.price"
            type="number"
            class="form-control"
            placeholder="Precio"
          />

        </div>

        <div class="col-md-4 mb-3">

          <input
            v-model="newProduct.image"
            type="text"
            class="form-control"
            placeholder="URL de imagen"
          />

        </div>

      </div>

      <button
        class="btn btn-dark"
        @click="addProduct"
      >

        <i
          class="bi"
          :class="
            editMode
            ? 'bi-pencil-square'
            : 'bi-plus-circle'
          "
        ></i>

        {{ editMode
          ? 'Actualizar Producto'
          : 'Agregar Producto'
        }}

      </button>

    </div>

    <!-- PRODUCTOS -->

    <div class="row">

      <div
        class="col-md-4 mb-4"
        v-for="product in products"
        :key="product.id"
      >

        <div class="card border-0 shadow-lg h-100">

          <img
            :src="product.image"
            class="card-img-top"
            style="height: 300px; object-fit: cover;"
          />

          <div class="card-body">

            <h5 class="card-title fw-bold">
              {{ product.name }}
            </h5>

            <p class="fs-4 text-dark fw-bold">
              ${{ product.price }}
            </p>

            <div class="d-flex gap-2">

              <button
                class="btn btn-outline-dark w-100"
                @click="editProduct(product)"
              >
                <i class="bi bi-pencil-square"></i>
                Editar
              </button>

              <button
                class="btn btn-danger w-100"
                @click="deleteProduct(product.id)"
              >
                <i class="bi bi-trash"></i>
                Eliminar
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>
