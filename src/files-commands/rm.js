import path from 'path';
import isExists from '../utils/exist-checker.js';
import fs from 'fs/promises'
import errors from '../data/error-messages.js';

async function rm(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [filePathPart] = commandArguments;

    const filePath = path.resolve(currentPath, filePathPart);

    const isSourcePathExists = await isExists(filePath);


    if (!isSourcePathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    const sourceStat = await fs.lstat(filePath);
    const isSourceFile = sourceStat.isFile();

    if (!isSourceFile) {
      throw new Error(errors.invalidInputMessage);
    }

    await fs.rm(filePath);

  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default rm;
