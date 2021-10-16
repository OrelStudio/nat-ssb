'use strict'

/**
 * Checks if the given ip is internal
 * The ranges and the amount of usable IP's are as follows:
 * 10.0.0.0 - 10.255.255.255 Addresses: 16,777,216
 * 172.16.0.0 - 172.31.255.255 Addresses: 1,048,576
 * 192.168.0.0 - 192.168.255.255 Addresses: 65,536
 * @param {String} ip - the request's ip
 * @returns {Boolean} - if the ip is internal
 */
const isInternal = (ip) => {
  const parts = ip.split('.')
  return (parts[0] === '10' ||
    (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31)) ||
    (parts[0] === '192' && parts[1] === '168')
  )
}

/**
 * Accepts only requests from internal ip (and exceptions if provided)
 * @param {Object} options - custom options for the middleware
 * @param {Array} exceptions - optional array of exceptions public ip addresses that can access
 * @param {Function} callback - optional callback after success or fail
 */
const natSSB = (options = {message: 'Access Denied'}, callback, exceptions = []) => {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const canAccess = isInternal(ip) || exceptions.includes(ip)

    if(canAccess) {
      // callbacks for success
      if(callback) {
        callback()
      }

      next()
    } else {
      // callbacks for fail
      if(callback) {
        callback()
      }

      res.status(401).send(options)
    }
  }
}


module.exports = {
  natSSB,
  isInternal
}
