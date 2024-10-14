import path from 'path';
import { createWriteStream, createReadStream } from 'fs';
import isExists from '../utils/exist-checker.js';
import errors from '../data/error-messages.js';
import { lstat } from 'fs/promises';

async function cp(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 2) {
      throw new Error(errors.invalidInputMessage);
    }

    const [source, dest] = commandArguments;

    const sourcePath = path.resolve(currentPath, source);
    const targetPath = path.resolve(currentPath, dest);

    let destPath = targetPath;

    const sourceName = path.basename(sourcePath);
    const destName = path.basename(destPath);

    const isSourcePathExists = await isExists(sourcePath);

    if (!isSourcePathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    const sourceStat = await lstat(sourcePath);
    const isSourceFile = sourceStat.isFile();

    if (!isSourceFile) {
      throw new Error(errors.invalidInputMessage);
    }


    const isTargetPathExists = await isExists(targetPath);

    if (isTargetPathExists) {
      const targetStat = await lstat(targetPath);
      const isTargetPathDirectory = targetStat.isDirectory();
      const isTargetPathFile = targetStat.isFile();

      if (isTargetPathFile) {
        throw new Error(errors.invalidInputMessage);
      }

      if (isTargetPathDirectory) {
        destPath = path.resolve(targetPath, sourceName);

        const isDestPathExists = await isExists(destPath);

        if (isDestPathExists) {
          throw new Error(errors.invalidInputMessage);
        }
      } else {
        throw new Error(errors.invalidInputMessage);
      }

    }


    const destRootPath = path.parse(targetPath).dir;
    const isDestRootPathExists = await isExists(destRootPath);

    if (!isDestRootPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    if (!isTargetPathExists && isDestRootPathExists) {
      const destRootStat = await lstat(destRootPath);
      const isDestRootPathDirectory = destRootStat.isDirectory();

      if (isDestRootPathDirectory) {
        destPath = path.resolve(destRootPath, destName);
      } else {
        throw new Error(errors.invalidInputMessage);
      }

    }


    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);

    await new Promise((resolve, reject) => {
      readStream
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject)
    });

    return true;
  } catch (error) {
    process.stderr.write(error.message);
    return false;
  }
};

export default cp;
