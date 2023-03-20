import { api } from "@hiveio/hive-js"

export const fetchSingleProfile = (account) => {

  return new Promise((resolve, reject) => {
    const params = [[account]]
    api.call('condenser_api.get_accounts', params, async(err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const generateUpdateAccountOperation = (account, posting_json_metadata, json_metadata='') => {

  return new Promise((resolve) => {
    const op_comment = [[
      'account_update2',
      {
        account,
        json_metadata,
        posting_json_metadata,
      },
    ]]
    resolve(op_comment)
  })
}