const API_URL =
  'https://6a2dd6be2edd4cb330d16e43.mockapi.io/products'

  export interface Product {
  id?: number
  name: string
  price: number
  image: string
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL)
  return await response.json()
}

export const createProduct = async (
  product: Product
): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })

  return await response.json()
}

export const updateProduct = async (
  id: number,
  product: Product
): Promise<Product> => {

  console.log('UPDATE ID:', id)

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }
  )

  console.log(response.status)

  return await response.json()
}


export const deleteProduct = async (
  id: number
): Promise<void> => {

  console.log('ID ENVIADO:', id)

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'DELETE'
    }
  )

  console.log(response.status)

  const text = await response.text()
  console.log(text)

}
