import path from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import isExists from '../utils/exist-checker.js'
import errors from '../data/error-messages.js';
import fs from 'fs/promises';

async function hash(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [pathFragment] = commandArguments;

    const filePath = path.resolve(currentPath, pathFragment);

    const isSourcePathExists = await isExists(filePath);


    if (!isSourcePathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    const sourceStat = await fs.lstat(filePath);
    const isSourceFile = sourceStat.isFile();

    if (!isSourceFile) {
      throw new Error(errors.invalidInputMessage);
    }

    async function getHash(filePath) {
      return await new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const input = createReadStream(filePath);

        input.on('error', (err) => {
          reject(err);
        });

        input.on('data', (chunk) => {
          hash.update(chunk);
        });

        input.on('end', () => {
          resolve(hash.digest('hex'));
        });
      });
    }

    const fileHash = await getHash(filePath);

    process.stdout.write(fileHash + '\n');
  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default hash;