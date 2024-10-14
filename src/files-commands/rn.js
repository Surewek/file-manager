import path from 'path';
import isExists from '../utils/exist-checker.js';
import fs from 'fs/promises'
import errors from '../data/error-messages.js';

async function rn(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 2) {
      throw new Error(errors.invalidInputMessage);
    }

    const [oldName, newName] = commandArguments;
    const oldNamePath = path.resolve(currentPath, oldName);
    const newNamePath = path.resolve(currentPath, newName);

    const isCurrentPathExists = await isExists(oldNamePath);
    const isTargetPathExists = await isExists(newNamePath);

    if (!isCurrentPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    if (isTargetPathExists) {
      throw new Error(errors.invalidInputMessage);
    }

    await fs.rename(oldNamePath, newNamePath);

  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default rn;
