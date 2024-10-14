import TABLE_SYMBOLS from "../../data/pseudographic.js";


function drawDataLine({index, name, type}) {
  return String.fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + index.data.toString()
    .padStart(index.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + name.data.padStart(name.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + type.data.padStart(type.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + '\n'
}

export default drawDataLine;
