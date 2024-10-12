import path from 'path';
import isExists from '../utils/exist-checker.js';
import { createReadStream } from 'fs';
import readline from 'readline';
import errors from '../data/error-messages.js';
import messages from '../data/messages.js';

async function cat(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [fileName] = commandArguments;
    const targetPath = path.resolve(currentPath, fileName);

    const isTargetPathExists = await isExists(targetPath);

    if (!isTargetPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    const rl = readline.createInterface({
      input: createReadStream(targetPath),
      output: process.stdout
    });

    rl.on('line', line => line);

    rl.on('close', async () => {
      process.stdout.write(messages.getCurrentDirectoryMessage(currentPath));
    });

  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default cat;
