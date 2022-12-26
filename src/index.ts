import { spawn } from 'child_process';
import * as cmd1 from './cmd1.js';
import * as cmd2 from './cmd2.js';

const exec1 = await cmd1.execCommand('ls -la', '/Users/tzafrirbenami/Documents/work/child_process');

console.log(exec1.code);
console.log(exec1.stdout);
console.log(exec1.stderr);

const proc = spawn('ls -la', {
  shell: true,
  cwd: '/Users/tzafrirbenami/Documents/work/child_process'
});

const exec2 = await cmd2.execCommand(proc);

console.log(exec2.code);
console.log(exec2.stdout);
console.log(exec2.stderr);

