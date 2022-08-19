const crypto = require('crypto')

export const sha1 = (val: string) => {
  var shasum = crypto.createHash('sha1')
  shasum.update(val)
  return shasum.digest('hex')
}

export const serviceTypes = ['sms_panel', 'buy_link', 'introducer_code', 'discount_code', 'share_link']
export const pageTypes = ['instagram', 'facebook', 'youtube', 'telegram', 'vk']
export const campaignStates = ['done', 'process', 'hold']

export const timeDif = (start: Date, end: Date) => {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
}