import path from 'path';
import fs from 'fs/promises'
import cp from './cp.js';
import errors from '../data/error-messages.js';

async function mv(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 2) {
      throw new Error(errors.invalidInputMessage);
    }

    const [source, dest] = commandArguments;

    const sourcePath = path.resolve(currentPath, source);

    const isCopiedSuccsessfully = await cp(currentPath, commandArguments);

    if (isCopiedSuccsessfully) {
      await fs.unlink(sourcePath);
    }
  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default mv;
