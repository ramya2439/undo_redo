export const createCommandManager = () => {
  let commands = [];
  let index = -1;

  const execute = (command) => {
    if (index < commands.length - 1) {
      commands = commands.slice(0, index + 1);
    }

    command.redo();
    commands.push(command);
    index++;
  };

  const undo = () => {
    if (index < 0) return;
    const command = commands[index];
    command.undo();
    index--;
  };

  const redo = () => {
    if (index >= commands.length - 1) return;
    const command = commands[index + 1];
    command.redo();
    index++;
  };

  return { execute, undo, redo };
};
