const API_URL =
  'https://6a2dd6be2edd4cb330d16e43.mockapi.io/users'

export interface User {
  id?: number
  username: string
  password: string
  role: string
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL)
  return await response.json()
}

export const createUser = async (
  user: User
): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  return await response.json()
}

export const updateUser = async (
  id: number,
  user: User
): Promise<User> => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
  )

  return await response.json()
}

export const deleteUser = async (
  id: number
): Promise<void> => {
  await fetch(
    `${API_URL}/${id}`,
    {
      method: 'DELETE'
    }
  )
}
