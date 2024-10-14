import path from 'path';
import isExists from '../utils/exist-checker.js';
import errors from '../data/error-messages.js';

async function cd(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [pathFragment] = commandArguments;

    const targetPath = path.resolve(currentPath, pathFragment);

    const isTargetPathExists = await isExists(targetPath);

    if (!isTargetPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    return targetPath;
  } catch (error) {
    process.stderr.write(error.message);

    return currentPath;
  }
};

export default cd;