const messages = {
  getInitialMessage: (name) => `Welcome to the File Manager, ${name}!`,
  getFinishMessage: (name) => `\nThank you for using File Manager, ${name}, goodbye!`,
  getCurrentDirectoryMessage: (currentPath) => `\nYou are currently in ${currentPath}\n`,
};

export default messages;
