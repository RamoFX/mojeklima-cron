import cron from 'node-cron'

import { login, checkForNotifications, deleteMarkedAccounts } from './operations.js'
import { info } from './logger.js'



cron.schedule('0 * * * *', () => {
  login().then(token => {
    if (token === null)
      return

    checkForNotifications(token).then(count => {
      if (count === null)
        return

      info('checkForNotifications', `dispatched ${ count } notification(s)`)
    })
  })
})



cron.schedule('30 0 * * *', () => {
  login().then(token => {
    if (token === null) {
      return
    }

    deleteMarkedAccounts(token).then(count => {
      if (count === null)
        return

      info('deleteMarkedAccounts', `removed ${ count } account(s)`)
    })
  })
})
