import fs from 'fs/promises';

const isExists = async (testPath) => {
  try {
    await fs.access(testPath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      return false;
    };
  }
}

export default isExists;