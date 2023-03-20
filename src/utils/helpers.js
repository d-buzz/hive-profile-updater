import uuid from 'uuid-random'
import { encrypt, decrypt } from 'caesar-shift'
import CryptoJS  from 'crypto-js'
import sha256 from 'crypto-js/sha256'

const randomizer = (min, max) => {
  return Math.random() * (max - min) + min
}

const keygen = (index) => {
  let key = 5 + index
  if(key > 28) {
    key = key - 5
  }

  key = Math.ceil(key)

  return key
}

export const generateSession = (obj) => {
  const date = new Date()
  const lowerlimit = randomizer(1, 12)
  const upperlimit = randomizer(13, 26)
  const index = randomizer(upperlimit, lowerlimit)

  const uid = uuid()
  const key = keygen(index)

  const caesar = encrypt(key, uid)
  const hash = sha256(uid).toString()

  const data = CryptoJS.AES.encrypt(JSON.stringify(obj), hash).toString()
  const id = Math.ceil(date.getTime())

  let token = {
    index: key,
    uid: caesar,
    data,
  }

  token = CryptoJS.AES.encrypt(JSON.stringify(token), `${id}x0`).toString()
  return { id, token }
}

export const readSession = (session) => {
  const { id, token } = session
  const idkey = `${id}x0`

  let sessionDec = CryptoJS.AES.decrypt(token, idkey)
  sessionDec = JSON.parse(sessionDec.toString(CryptoJS.enc.Utf8))

  const { index, uid, data } = sessionDec
  const uuid = decrypt(index, uid)
  const hash = sha256(uuid).toString()

  let dataDec = CryptoJS.AES.decrypt(data, hash)
  dataDec = JSON.parse(dataDec.toString(CryptoJS.enc.Utf8))

  return dataDec
}