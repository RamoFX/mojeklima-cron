import axios from 'axios'

import { info, error } from './logger.js'



const apiUrl = process.env.API_URL
const systemEmail = process.env.SYSTEM_EMAIL
const systemPassword = process.env.SYSTEM_PASSWORD



export async function base(module, query, selector, headers = {}) {
  try {
    const response = await axios.post(apiUrl, { query }, { headers })

    if (response.data?.errors && response.data?.errors.length > 0) {
      error(module, response.data.errors[0].message)
      return null
    }

    const selected = selector(response.data?.data)

    if ([ undefined, null ].includes(selected)) {
      error(module, 'empty response')
      return null
    }

    info(module, 'request successful')

    return selected
  } catch (e) {
    error(module, e.message)

    return null
  }
}



export async function login() {
  return base(
    'login',
    `
      mutation {
        login(login: {
          email: "${ systemEmail }",
          password: "${ systemPassword }"
        }) {
          token
        }
      }  
    `,
    data => data.login.token
  )
}



export async function checkForNotifications(token) {
  return base(
    'checkForNotifications',
    `
      mutation {
        checkForNotifications
      }
    `,
    data => data.checkForNotifications,
    {
      Authorization: `Bearer ${ token }`
    }
  )
}



export async function deleteMarkedAccounts(token) {
  return base(
    'deleteMarkedAccounts',
    `
      mutation {
        deleteMarkedAccounts
      }
    `,
    data => data.deleteMarkedAccounts,
    {
      Authorization: `Bearer ${ token }`
    }
  )
}
