const absolute = (row, c, value) => {
  value = row.length < 2 ? 1 : value
  const oldValue = row.splice(c, 1)[0]
  if (oldValue == 1) {
    for (let i = 0; i < row.length; i++) {
      row.fill((1 - value)/row.length)
    }
  } else {
    for (let i = 0; i < row.length; i++) {
      row[i] = (row[i] / (1 - oldValue)) * (1 - value)
    }
  }
  row.splice(c, 0, value)
  return row
}

const matrix = {
  controls: {
    add: (matrix, columns) => {
      matrix.forEach((row, i) => {
        matrix[i].push(columns === 0 ? 1 : 0)
      })
      columns += 1
      return [[...matrix], columns]
    },

    delete: (matrix, columns, index) => {
      if (matrix.length > 0) {
        matrix.forEach((row, i) => {
          matrix[i].splice(index, 1)
        })
        columns -= 1
      }
      return [[...matrix], columns]
    },

    get: (matrix, index) => {
      let column = []
      for (let i = 0; i < matrix.length; i++) {
        column[i] = matrix[i][index]
      }
      return column
    },
  },

  parameters: {
    add: (matrix, columns, autoFill) => {
      const index = matrix.push(new Array(columns).fill(0))
      if (autoFill) matrix[index - 1][columns <= matrix.length ? columns - 1 : matrix.length -1] = 1
      return [[...matrix], columns]
    },
    delete: (matrix, columns, index) => {
      if (matrix.length > 0) matrix.splice(index, 1)
      return [[...matrix], columns]
    },
    get: (matrix, index) => {
      return matrix[index]
    }
  },

  output: {
    add: (values, r) => {
      let outputValue = 0
      for (let i = 0; i < values[r].length; i++) {
        outputValue += values[r][i]
      }
      return outputValue
    },
    
  },

  edit(weights, r, c, value){
    return [...absolute(weights[r], c, value)]
  }
}

export default matrix