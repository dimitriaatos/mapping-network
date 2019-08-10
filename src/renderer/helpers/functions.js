const plural = string => `${string}s`,
singular = string => string.substring(0, string.length - 1),
clip = (value, range = [0, 1]) => value > range[1] ? range[1] : value < range[0] ? range[0] : value,
other = values => type => type === values[0] ? values[1] : type === values[1] ? values[0] : console.error('wrong type'),
otherIO = other(['inputs', 'outputs']),
otherType = other(['parameters', 'controls'])

export { plural, singular, clip, otherIO, otherType }