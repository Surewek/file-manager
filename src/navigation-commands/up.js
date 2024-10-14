import path from 'path';
import errors from '../data/error-messages.js';

async function up(currentPath) {
    try {
        currentPath = path.resolve(currentPath, '..');

        return currentPath;
    } catch (error) {
        process.stderr.write(errors.operationFailedMessage);
    }

};

export default up;