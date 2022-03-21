import * as vscode from 'vscode';
import fs = require("fs");
import path = require("path");

export class VsCodeService {

    static async getCurrentFolder() {
        await vscode.commands.executeCommand('copyFilePath');
        let currentFolder = await vscode.env.clipboard.readText();  // returns a string

        // see note below for parsing multiple files/folders
        const newUri = await vscode.Uri.file(currentFolder);          // make it a Uri 
        currentFolder = newUri.path.substring(1);
        currentFolder = fs.statSync(currentFolder).isDirectory() ? currentFolder : path.dirname(currentFolder);

        return currentFolder;
    }

}