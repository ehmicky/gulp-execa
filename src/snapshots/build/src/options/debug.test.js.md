# Snapshot report for `build/src/options/debug.test.js`

The actual snapshot is saved in `debug.test.js.snap`.

Generated by [AVA](https://avajs.dev).

## 'debug' option | exec {"opts": {"debug": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": false, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": false, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true, "stderr": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true, "stdio": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | exec {"opts": {"debug": true, "stderr": "pipe", "stdio": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 1,
      stderr: `It's not possible to provide \`stdio\` in combination with one of \`stdin\`, \`stdout\`, \`stderr\`␊
          at STACK TRACE`,
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test`,
    }

## 'debug' option | task {"opts": {"debug": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": false, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": false, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true, "stderr": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true, "stdio": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | task {"opts": {"debug": true, "stderr": "pipe", "stdio": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 1,
      stderr: `It's not possible to provide \`stdio\` in combination with one of \`stdin\`, \`stdout\`, \`stderr\`␊
          at STACK TRACE`,
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": false, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": false, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true, "stderr": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true, "stdio": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-buffer {"opts": {"debug": true, "stderr": "pipe", "stdio": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": false, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": false, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true, "stderr": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true, "stdio": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-stream {"opts": {"debug": true, "stderr": "pipe", "stdio": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      test␊
      ␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": false, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true, "echo": false}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": false, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true, "echo": true}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true, "stderr": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true, "stdio": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }

## 'debug' option | stream-save {"opts": {"debug": true, "stderr": "pipe", "stdio": "pipe", "stdout": "pipe"}}

> Snapshot 1

    {
      exitCode: 0,
      stderr: '',
      stdout: `[12:00:00] Starting 'main'...␊
      [12:00:00] [gulp-execa] echo test␊
      [␊
        {␊
          "command": "echo test",␊
          "escapedCommand": "echo test",␊
          "cwd": /path␊
          "durationMs": 1,␊
          "failed": false,␊
          "timedOut": false,␊
          "isCanceled": false,␊
          "isTerminated": false,␊
          "isMaxBuffer": false,␊
          "exitCode": 0,␊
          "stdout": "test",␊
          "stderr": "",␊
          "stdio": [␊
            null,␊
            "test",␊
            ""␊
          ],␊
          "pipedFrom": []␊
        }␊
      ]␊
      [12:00:00] Finished 'main' after 100 ms`,
    }