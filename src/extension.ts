// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


import { TemplateService } from './services/TemplateService';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "omnia" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('omnia.helloWorld', async () => {

		//https://github.com/dkundel/vscode-new-file/blob/86c2d65a3eb24ffb55e284fd20a3ac58c3828271/src/extension.ts#L14
		//https://github.com/brpaz/vscode-file-templates-ext/blob/master/src/commands/fileFromTemplateCommand.ts

		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Omnia!');



		//const terminal = vscode.window.createTerminal(`Ext Terminal #`);
		//terminal.sendText("echo 'Sent text immediately after creating'");
		// so triggered by a keybinding



		const templates = await TemplateService.getItemTemplates();

		let templateNames: Array<vscode.QuickPickItem> = [];
		templates.forEach(item => {
			templateNames.push({
				label: item.name,
				description: item.description
			});
		});

		let selectedTemplate = await vscode.window.showQuickPick(templateNames);

		const name = await vscode.window.showInputBox({ title: "Enter filename without extension" });
		if (!name) {
			vscode.window.showErrorMessage(`Name is required`);
			return;
		}

		const template = templates.find(item => item.name === selectedTemplate?.label);
		if (!template) {
			vscode.window.showErrorMessage(`Couldnt find template with name ${selectedTemplate}`);
			return;
		}

		let tokens = "";
		for (const token of template.tokens) {

			let tokenValue = await vscode.window.showInputBox({ title: `Enter ${token.name}` });
			if (tokenValue === undefined || tokenValue === "") {
				vscode.window.showErrorMessage(`The token value: ${token.name} is required`);
				break;
			}
			tokens += `${token.name}=${tokenValue}`;
		};

		TemplateService.createFromTemplate(template, name, tokens);

		vscode.window.showInformationMessage(`You selected ${selectedTemplate}`);

	});

	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() { }
