import readline from 'readline';
import { homedir } from 'os';
import up from './navigation-commands/up.js';
import cd from './navigation-commands/cd.js';
import ls from './navigation-commands/ls.js';
import add from './files-commands/add.js';
import cat from './files-commands/cat.js';
import rn from './files-commands/rn.js';
import cp from './files-commands/cp.js';
import mv from './files-commands/mv.js';
import rm from './files-commands/rm.js';
import os from './os-commands/os.js'
import compress from './archiver-commands/compress.js';
import decompress from './archiver-commands/decompress.js';
import hash from './hash-commands/hash.js';
import messages from "./data/messages.js";
import errors from "./data/error-messages.js";

try {
  let currentPath = homedir();
  let username = '';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: messages.getCurrentDirectoryMessage(currentPath)
  });

  function readCommand() {
    const commandReader = process.stdin;
    commandReader.setEncoding('utf8');

    rl.on('line', async (line) => {
      const [command, ...commandArguments] = line.trim().split(' ');

      switch (command) {
        case 'up':
          currentPath = await up(currentPath);

          rl.setPrompt(messages.getCurrentDirectoryMessage(currentPath));
          rl.prompt()
          break;
        case 'cd':
          currentPath = await cd(currentPath, commandArguments);

          rl.setPrompt(messages.getCurrentDirectoryMessage(currentPath));
          rl.prompt()
          break;
        case 'ls':
          await ls(currentPath);
          rl.prompt()

          break;
        case 'add':
          await add(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'cat':
          await cat(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'rn':
          await rn(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'cp':
          await cp(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'mv':
          await mv(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'rm':
          await rm(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'os':
          await os(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'hash':
          await hash(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'compress':
          await compress(currentPath, commandArguments);
          rl.prompt()

          break;
        case 'decompress':
          await decompress(currentPath, commandArguments);
          rl.prompt()

          break;
        case '.exit':
          rl.close();

          break;

        default:
          process.stderr.write(errors.operationFailedMessage + '\n');
          rl.prompt()
      }

    });

    rl.on('close', () => {
      process.stdout.write(messages.getFinishMessage(username));
    });

  }

  const args = process.argv.slice(2);

  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (usernameArg) {
    username = usernameArg.split('=')[1];
    process.stdout.write(messages.getInitialMessage(username));
    process.stdout.write(messages.getCurrentDirectoryMessage(currentPath));

    readCommand();

  } else {
    console.log(errors.operationFailedMessage)
  }
} catch (error) {
  process.stderr.write(error.message);
}
