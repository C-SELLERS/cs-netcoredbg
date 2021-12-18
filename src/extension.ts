// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	console.log('"cs-netcoredbg" is now active!');

	let factory = new NetCoreDebugServerAdapterDescriptorFactory;
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('netcoredbg', new NetCoreDebugConfigurationProvider));
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('netcoredbg', factory));
}

// this method is called when your extension is deactivated
export function deactivate() {}


export class NetCoreDebugConfigurationProvider implements vscode.DebugConfigurationProvider {

    public async resolveDebugConfigurationWithSubstitutedVariables(folder: vscode.WorkspaceFolder | undefined, debugConfiguration: vscode.DebugConfiguration, token?: vscode.CancellationToken): Promise<vscode.DebugConfiguration>
    {
        return debugConfiguration;
    }
}

class NetCoreDebugServerAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
	
	createDebugAdapterDescriptor(session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
		return new vscode.DebugAdapterServer(session.configuration.remote.port, session.configuration.remote.ip);
	}

	dispose() {}
}