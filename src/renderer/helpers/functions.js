const plural = string => `${string}s`,
singular = string => string.substring(0, string.length - 1),
clip = (value, range = [0, 1]) => value > range[1] ? range[1] : value < range[0] ? range[0] : value

export { plural, singular, clip }