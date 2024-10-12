import path from 'path';
import { createWriteStream, createReadStream } from 'fs';
import isExists from '../utils/exist-checker.js';
import errors from '../data/error-messages.js';

async function cp(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 2) {
      throw new Error(errors.invalidInputMessage);
    }

    const [source, dest] = commandArguments;

    const sourcePath = path.resolve(currentPath, source);
    const destPath = path.resolve(currentPath, dest);

    const isCurrentPathExists = await isExists(sourcePath);
    const isTargetPathExists = await isExists(destPath);

    if (!isCurrentPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    if (isTargetPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);

    await new Promise((resolve, reject) => {
      readStream
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject)
    });

  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default cp;
