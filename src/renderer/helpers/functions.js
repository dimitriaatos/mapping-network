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
},
maptomat = input => input === 'controls' ? 'columns' : 'rows'

export { plural, singular, clip, otherIO, otherType, deepMerge, maptomat }