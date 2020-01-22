const dropFile = event => {
  event.preventDefault()
  console.log(event.dataTransfer.items)
}

export { dropFile }