import * as child_process from 'child_process';

export const execCommand = async (
  childProcess: child_process.ChildProcess,
): Promise<{ stdout: string; stderr: string; code: number }> => {
  return new Promise((resolve, reject) => {
    let stdout = '';
    childProcess.stdout?.on('data', data => {
      stdout = stdout + data.toString();
    });

    let stderr = '';
    childProcess.stderr?.on('data', data => {
      stderr = stderr + data.toString();
    });

    childProcess.on('close', code => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(stderr.trim()));
      }
    });

    childProcess.on('error', err => {
      reject(err);
    });
  });
};