import fs from 'fs/promises'
import LS_TYPES from '../data/ls-types.js';
import TABLE_HEAD from '../data/table-head.js';
import errors from '../data/error-messages.js';
import drawTable from '../utils/ui-drawlers/table-drawler.js';

let maxNameLength = TABLE_HEAD.name.length;
let maxIndexLength = TABLE_HEAD.index.length;
const maxTypeLength = LS_TYPES.dir.length;

async function ls(currentPath) {
  try {
    const dirContent = await fs.readdir(currentPath, { withFileTypes: true });

    const indexLenght = dirContent.length.toString().length

    maxIndexLength = indexLenght > maxNameLength
      ? indexLenght
      : maxIndexLength;


    const directories = dirContent
      .filter((item) => item.isDirectory())
      .map((dir) => {
        maxNameLength = dir.name.length > maxNameLength
          ? dir.name.length
          : maxNameLength;

        const dirItem = {
          "name": dir.name,
          "type": LS_TYPES.dir
        }

        return dirItem;
      })
      .sort();

    const files = dirContent
      .filter((item) => item.isFile())
      .map((file) => {
        maxNameLength = file.name.length > maxNameLength
          ? file.name.length
          : maxNameLength;

        const fileItem = {
          "name": file.name,
          "type": LS_TYPES.file
        }

        return fileItem;
      })
      .sort();

    const lsItems = [...directories, ...files];

    drawTable(lsItems, maxIndexLength, maxNameLength, maxTypeLength);
  } catch (error) {
    process.stderr.write(errors.operationFailedMessage);
  }
}

export default ls;
