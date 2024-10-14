import * as opsys from 'os';
import errors from '../data/error-messages.js';
import convertMHzToGHz from '../utils/MHz-to-GHz-converter.js';

async function os(currentPath, commandArguments) {
  try {
    const argumentsCount = commandArguments.length;

    if (argumentsCount !== 1) {
      throw new Error(errors.invalidInputMessage);
    }

    const [flag] = commandArguments;

    let output = '';

    switch (flag) {
      case '--EOL':
        output = `${JSON.stringify(opsys.EOL)}`;

        process.stdout.write(output + '\n');
        break;
      case '--cpus':
        const cpus = opsys.cpus().map((cpu) => {
          return {
            model: cpu.model,
            clockRate: convertMHzToGHz(cpu.speed)
          }
        });

        output = {
          cpusAmount: opsys.availableParallelism(),
          cpus
        };

        process.stdout.write(JSON.stringify(output, null, 2) + '\n')
        break;
      case '--homedir':
        output = opsys.homedir();

        process.stdout.write(output + '\n');
        break;
      case '--username':
        output = opsys.hostname();

        process.stdout.write(output + '\n');
        break;
      case '--architecture':
        output = opsys.arch();

        process.stdout.write(output + '\n');
        break;
      default:
        throw new Error(errors.invalidInputMessage);
    }

  } catch (error) {
    process.stderr.write(error.message);
  }
};

export default os;