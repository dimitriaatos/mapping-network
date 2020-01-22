import { Speed } from "./classes";

const plural = string => `${string}s`,
singular = string => string.substring(0, string.length - 1)

const clip = (value, range = [0, 1]) => value > range[1] ? range[1] : value < range[0] ? range[0] : value,
other = values => type => type === values[0] ? values[1] : type === values[1] ? values[0] : console.error('wrong type'),
otherIO = other(['inputs', 'outputs']),
otherType = other(['parameters', 'controls']),
isObject = item => (item && typeof item === 'object' && !Array.isArray(item)),
deepMerge = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

const oneLevelDownSpread = obj => {
  return Object.keys(obj).reduce((accum, key) => {
    const current = obj[key]
    accum[key] = Array.isArray(current) ? [...current] : current
    return accum
  }, {})
}

const addSpeed = obj => (
  Object.keys(obj).reduce((accum, key) => {
    if (key === 'controls') {
      accum[key] = obj[key].map(item => {
        item.speed = new Speed(item.speed)
        return item
      })
    } else {
      accum[key] = obj[key]
    }
    return accum
  }, {})
)

export { plural, singular, clip, otherIO, otherType, deepMerge, oneLevelDownSpread, addSpeed }