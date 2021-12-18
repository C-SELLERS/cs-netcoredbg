# cs-netcoredbg

Simple extension for debugging via a remote netcoredbg server. Best used with "Launch" config currently.
"Attach" is possible, adding the "processId" as a hardcoded value to launch configuration should suffice, although no options to select the process on the remote machine exists.


## Dev Setup

- `npm install`
- VSCode Launch -> "Run Extension"


# How To Use:

- Start `netcoredbg` on the remote machine with your dotnet binary and program in the parameters `./netcoredbg --interpreter=vscode --server -- /usr/bin/dotnet /program/program.dll`
    - Be sure to replace paths as appropriate.
    - By default `--server` means port 4711. You may replace this with other values, see samsung/netcoredbg for more options.
- Using the extension create a launch config
    - ```
            "name": "Remote C#",
            "type": "netcoredbg",
            "request":"launch",
            "remote": {
                "ip": "0.0.0.0",
                "port":4711
            }
        ```
- Use the launch config and you should be debugging!***



** NetCoreDbg does not currently support file mapping, so in order to hit breakpoints you need to be certain that the files you are trying to debug locally match the same path as where they were built. This information is built in to the dlls/pdbs. 

You can however add pathMap parameters to your `dotnet build` to hardcode the source path to get around the issue if you are building on another machine. 

This is not an issue if you built and are running NetCoreDbg locally and just attaching via this extension.


# Notes

- I am sharing this repo just to show how to connect to NetCoreDbg in server mode from VSCode with a simple extension. As of right now I don't have any intention to expand or publish this extension. It may be used freely by anyone looking to debug netcoredbg remotely.

- In its current state, this debugger will connect to and work with any DebugAdapter that implements VSCode DAP and is able to communicate over a tcp port. I have used it with both `netcoredbg` and `ptvsd` for C# and Py Debugging respectively.