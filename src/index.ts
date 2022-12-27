import { spawn } from 'child_process';
import * as cmd1 from './cmd1.js';
import * as cmd2 from './cmd2.js';

const command = 'ls -la';
const directory = '.';

const exec1 = await cmd1.execCommand(command, directory);

console.log(exec1.code);
console.log(exec1.stdout);
console.log(exec1.stderr);

const proc = spawn(command, {
  shell: true,
  cwd: directory
});

const exec2 = await cmd2.execCommand(proc);

console.log(exec2.code);
console.log(exec2.stdout);
console.log(exec2.stderr);

