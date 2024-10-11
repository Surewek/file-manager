import TABLE_SYMBOLS from "../../data/pseudographic.js";
import TABLE_HEAD from "../../data/table-head.js";

function drawHeadLines({index, name, type}) {
  return String.fromCharCode(TABLE_SYMBOLS.TOP_LEFT_CORNER)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(index.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.TOP_AND_BOTTOM)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(name.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.TOP_AND_BOTTOM)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(type.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.TOP_RIGHT_CORNER)
  + '\n' // First table head pseudographic line
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + TABLE_HEAD.index.padStart(index.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + TABLE_HEAD.name.padStart(name.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + TABLE_HEAD.type.padStart(type.size, ' ')
  + String
    .fromCharCode(TABLE_SYMBOLS.VERTICAL)
  + '\n'
  + String.fromCharCode(TABLE_SYMBOLS.LEFT_AND_RIGHT)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(index.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.CROSS)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(name.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.CROSS)
  + String
    .fromCharCode(TABLE_SYMBOLS.HORIZONTAL)
    .padStart(type.size, String
      .fromCharCode(TABLE_SYMBOLS.HORIZONTAL))
  + String
    .fromCharCode(TABLE_SYMBOLS.RIGHT_AND_LEFT)
  + '\n'
}

export default drawHeadLines;
