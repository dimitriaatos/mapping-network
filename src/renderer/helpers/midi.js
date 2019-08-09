const midiParse = data => ({
  type: (data[0] >> 4) - 9,
  index: data[1],
  value: data[2] ? data[2] / 127 : undefined,
  channel: (data[0] & 15) + 1,
  name: [
    'Note',
    'Key Presure',
    'Control Change',
    'Program Change',
    'After Touch',
    'Pitch Bend'
  ].splice((data[0] >> 4) - 9)[0],
  shortName: [
    'Note',
    'KP',
    'CC',
    'PC',
    'AT',
    'PB'
  ].splice((data[0] >> 4) - 9)[0],
})

const midiFormat = midi => [
  ((midi.type + 9) << 4) | (midi.midiChannel -1),
  midi.index,
  midi.value * 127
]

const toID = array => (array[0] << 7) | array[1]

const fromID = id => [id >> 7, id & 127]

const makeTitle = midiItem => {
  const parsed = midiParse(fromID(midiItem.id))
  return  {
    short: `${parsed.shortName} ${parsed.index}(${parsed.channel})`,
    long: `${parsed.name}: ${parsed.index}, Channel: ${parsed.channel}`,
  }
}

export {midiFormat, midiParse, toID, fromID, makeTitle}
