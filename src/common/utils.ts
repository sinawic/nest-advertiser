const crypto = require('crypto')

export const sha1 = (val: string) => {
  var shasum = crypto.createHash('sha1')
  shasum.update(val)
  return shasum.digest('hex')
}