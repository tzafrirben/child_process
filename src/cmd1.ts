import { spawn } from 'child_process';

export const execCommand = async (
  command: string,
  workDir: string
): Promise<{ stdout: string; stderr: string; code: number }> => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, {
      shell: true,
      cwd: workDir
    });

    let stdout = '';
    childProcess.stdout.on('data', data => {
      stdout = stdout + data.toString();
    });

    let stderr = '';
    childProcess.stderr.on('data', data => {
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