import { v4 as uuidv4 } from 'uuid'

export const keychainSignIn = (username) => {
  const challenge = { token: uuidv4() }
  const buffer = JSON.stringify(challenge, null, 0)
    return new Promise((resolve) => {
      window.hive_keychain.requestSignBuffer(
        username,
        buffer,
        'Posting',
        response => {
          resolve(response)
        },
      )
    })
}

export const broadcastKeychainOperation = (account, operations, key = 'Posting') => {
  return new Promise((resolve, reject) => {
    window.hive_keychain.requestBroadcast(
      account,
      operations,
      'Posting',
      response => {
        if(!response.success) {
          reject(response.error.code)
        } else {
          resolve(response)
        }
      },
    )
  })
}