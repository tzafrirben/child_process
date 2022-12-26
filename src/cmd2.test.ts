import * as child_process from 'child_process';
import EventEmitter from 'events';
import { Readable } from 'stream';
import { execCommand } from './cmd2';

const mockChildProcess = (): child_process.ChildProcess => {
  const proc = new EventEmitter() as child_process.ChildProcess;
  proc.stdout = <Readable>new EventEmitter();
  proc.stderr = <Readable>new EventEmitter();

  return proc;
};

describe('Test execute commands in a spawn child process', () => { 
  test('execCommand should return command stdout/stderr', async () => {
    // create a "fake" child process 
    const process = mockChildProcess();

    // note that execCommand returns a promise, so this fake child process was
    // not spawned yet
    const cmdExec = execCommand(process);

    // since we control the fake child process, we can emit the data events on
    // stdout/stderr streams
    process.stdout?.emit('data', 'Process stdout');
    process.stderr?.emit('data', 'Process stderr');

    // since we control the fake child process, we can end it
    process.emit('close', 0);

    // "execute" the command: spawn a child process and wait for it to end
    const { stderr, stdout, code } = await cmdExec;

    // validate the command output
    expect(code).toEqual(0);
    expect(stderr).toEqual('Process stderr');
    expect(stdout).toEqual('Process stdout');
  });
});