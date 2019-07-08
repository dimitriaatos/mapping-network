const midiParse = midiMessage => {
  return {
    type: (midiMessage.data[0] >> 4) - 9,
    index: midiMessage.data[1],
    value: midiMessage.data[2] / 127,
    midiChannel: (midiMessage.data[0] & 15) + 1
  }
}

const midiFormat = midi => {
  return [
    ((midi.type + 9) << 4) | (midi.midiChannel -1),
    midi.index,
    midi.value * 127
  ]
}

const toID = (array) => {
  return (array[0] << 7) | array[1]
}

const fromID = (id) => {
  return [id >> 7, id & 127]
}


export {midiFormat, midiParse, toID, fromID}
