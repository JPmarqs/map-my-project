const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Esta função agora será chamada quando o comando for executado
function generateFolderStructure(context) {
    // Verifica se há uma pasta aberta no VS Code
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage('Por favor, abra uma pasta no VS Code primeiro.');
        return;
    }

    const rootDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const outputFile = path.join(rootDir, 'folder_structure.txt');
    
    const IGNORED_DIRS = new Set([
        'node_modules', 'dist', 'build', '.git', 
        '.github', '.vscode', '__pycache__', '.idea',
        'coverage', '.next', 'out', 'cache'
    ]);

    const output = [];
    output.push(`Folder structure for ${rootDir}\n\n`);

    function walk(dir, level = 0) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        const dirs = items
            .filter(d => d.isDirectory())
            .filter(d => !IGNORED_DIRS.has(d.name) && 
                        !d.name.startsWith('.') && 
                        !d.name.startsWith('_'))
            .sort((a, b) => a.name.localeCompare(b.name));
        
        const files = items
            .filter(d => d.isFile())
            .filter(d => !d.name.startsWith('.') && !d.name.startsWith('_'))
            .sort((a, b) => a.name.localeCompare(b.name));

        if (level === 0) {
            output.push(`${path.basename(dir)}/\n`);
        }

        dirs.forEach((dirEntry, dirIndex) => {
            const isLastDir = dirIndex === dirs.length - 1 && files.length === 0;
            const prefix = '│   '.repeat(level) + (isLastDir ? '└── ' : '├── ');
            output.push(`${prefix}${dirEntry.name}/\n`);
            walk(path.join(dir, dirEntry.name), level + 1);
        });

        files.forEach((fileEntry, fileIndex) => {
            const isLastFile = fileIndex === files.length - 1;
            const prefix = '│   '.repeat(level) + (isLastFile ? '└── ' : '├── ');
            output.push(`${prefix}${fileEntry.name}\n`);
        });
    }

    try {
        walk(rootDir);
        fs.writeFileSync(outputFile, output.join(''));
        
        vscode.window.showInformationMessage(
            `Folder structure generated successfully in: ${outputFile}`,
            'Open file'
        ).then(selection => {
            if (selection === 'Open file') {
                const uri = vscode.Uri.file(outputFile);
                vscode.workspace.openTextDocument(uri).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error:  ${error.message}`);
    }
}

function activate(context) {
    const disposable = vscode.commands.registerCommand('map-my-project.generateStructure', () => {
        generateFolderStructure(context);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};