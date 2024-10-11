import drawDataLine from "./table-data-line-drawler.js";
import drawBottomLine from "./table-bottom-drawler.js";
import drawHeadLines from "./table-head-drawler.js";

function drawTable(items, maxIndexLength, maxNameLength, maxTypeLength) {
  const indexColumnSize = maxIndexLength;
  const nameColumnSize = maxNameLength + 5;
  const typeColumnSize = maxTypeLength + 2;

  const FIRST_INDEX = 0;
  const LAST_INDEX = items.length - 1;

  items.forEach((item, index) => {
    const lineData = {
      "index": {
        "data": index,
        "size": indexColumnSize,
      },
      "name": {
        "data": item.name,
        "size": nameColumnSize,
      },
      "type": {
        "data": item.type,
        "size": typeColumnSize,
      },
    }

    if (index === FIRST_INDEX && index === LAST_INDEX) {
      process.stdout.write(
        drawHeadLines(lineData)
        + drawDataLine(lineData)
        + drawBottomLine(lineData)
      );
    } else if (index === FIRST_INDEX) {
      process.stdout.write(
        drawHeadLines(lineData)
        + drawDataLine(lineData)
      );
    } else if (index === LAST_INDEX) {
      process.stdout.write(
        drawDataLine(lineData)
        + drawBottomLine(lineData)
      );
    } else {
      process.stdout.write(
        drawDataLine(lineData)
      );
    }

  });
}

export default drawTable;
