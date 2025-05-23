# Map My Project - Folder Structure Generator

![Extension Icon](https://1drv.ms/i/c/5f66c1b1a5eba6bc/EWMMNr33DhxPihDLCBNlKL4BilFORaVk5MN5cabT3qJ6Mg?e=8NiSBg) <!-- Add your icon if available -->

A VS Code extension that generates a visual tree structure of your project folders, automatically ignoring common directories like `node_modules`, `.git`, and other development artifacts.

## Features

- Generates a clean, hierarchical folder structure
- Automatically ignores common development directories
- Creates a `folder_structure.txt` file in your project root
- Option to open the generated file immediately
- Customizable through VS Code settings

## Installation

1. Open VS Code
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "Map My Project"
4. Click Install

## Usage

### Basic Usage
1. Open your project folder in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Generate folder structure" and select the command

### Output
Example Output:

project-root/
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   └── Header.js
│   └── App.js
├── public/
│   └── index.html
└── package.json

### Alternative Methods
- Use the keyboard shortcut `Ctrl+Alt+M` (Windows/Linux) or `Cmd+Alt+M` (Mac)

## Configuration

You can customize which folders are ignored by adding this to your VS Code settings (`settings.json`):

```json
{
  "mapMyProject.ignoredFolders": [
    "custom_folder_to_ignore",
    "another_ignored_folder"
  ]
}

```

## Contributing

Contributions are welcome!