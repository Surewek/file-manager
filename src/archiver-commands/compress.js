import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import isExists from '../utils/exist-checker.js';
import errors from '../data/error-messages.js';
import { lstat } from 'fs/promises';

async function compress(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 2) {
      throw new Error(errors.invalidInputMessage);
    }

    const [source, dest] = commandArguments;

    const sourcePath = path.resolve(currentPath, source);
    const targetPath = path.resolve(currentPath, dest);

    let destPath = targetPath;

    const destExt = path.extname(destPath);

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
      throw new Error(errors.invalidInputMessage);
    }

    if(destExt !== '.br') {
      let destObj = path.parse(targetPath);

      destObj.ext = '.br';
      delete destObj.base;

      destPath = path.format(destObj);

      const isDestPathExists = await isExists(destPath);

      if (isDestPathExists) {
        throw new Error(errors.invalidInputMessage);
      }
    }

    const brotli = createBrotliCompress();

    const sourceStream = createReadStream(sourcePath);
    const destStream = createWriteStream(destPath);

    sourceStream
      .pipe(brotli)
      .pipe(destStream)
  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default compress;