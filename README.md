# 📁 tree-generator-cli

A simple CLI tool to generate folders and files from a text-based tree structure.

## ✨ Features

- Convert a `tree`-style input into real folders/files
- Easily mock project structures
- CLI-friendly with single command

## 📦 Installation

```bash
npm install -g tree-generator-cli
```

## 📦 Usage

You can use `tree-generator-cli` to generate folder and file structures from a plain-text `.txt` tree diagram.

### 1. 📄 Create a `.txt` file with your desired structure

For example, create a file called `structure.txt`:

```
./my-project/
├── public/
│ └── index.html
├── src/
│ ├── App.js
│ ├── utils/
│ │ └── helper.js
└── README.md
```

---

### 2. 🚀 Run the command

In the terminal, run:

```bash
npx tree-generator structure.txt
```

or if installed globally:

```
tree-generator structure.txt
```

🧱 Output:
This will create the folders and files as described in structure.txt in your current working directory.

```
./my-project/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── utils/
│   │   └── helper.js
└── README.md
```

## 📝 Notes

Only supported characters are typical line-drawing characters like ├──, └──, and │
Blank folders will be created as empty
Files will be created empty by default
Everything is generated relative to your current terminal path

## 🧑‍💻 Contributing

Pull requests are welcome! Feel free to fork the repo and submit your ideas or fixes.

```
git clone git@github.com:navedrizv/npm-tree-converter.git
cd tree-generator
npm install
```
