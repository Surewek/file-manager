import path from 'path';
import isExists from '../utils/exist-checker.js';
import fs from 'fs/promises';
import messages from '../data/messages.js';
import errors from '../data/error-messages.js';

async function add(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [fileName] = commandArguments;
    const targetPath = path.resolve(currentPath, fileName);
    const isTargetPathExists = await isExists(targetPath);

    if (isTargetPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    await fs.writeFile(targetPath, '');

    process.stdout.write(messages.getCurrentDirectoryMessage(currentPath));
  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default add;
