import TABLE_SYMBOLS from "../../data/pseudographic.js";

function drawBottomLine({index, name, type}) {
  return String.fromCharCode(TABLE_SYMBOLS.BOTTOM_LEFT_CORNER)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(index.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.BOTTOM_AND_TOP)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(name.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.BOTTOM_AND_TOP)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(type.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.BOTTOM_RIGHT_CORNER)
  + '\n'
}

export default drawBottomLine;
