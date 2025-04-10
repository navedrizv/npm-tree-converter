#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import parseTree from "../lib/parser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputFile = process.argv[2];

if (!inputFile) {
  console.log(
    chalk.red("Please provide the path to the .txt file as an argument.")
  );
  console.log(chalk.yellow("Usage: tree-generator structure.txt"));
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputFile);

if (!fs.existsSync(inputPath)) {
  console.log(chalk.red(`File not found: ${inputPath}`));
  process.exit(1);
}

const treeString = fs.readFileSync(inputPath, "utf-8");
const { rootDir, items } = parseTree(treeString);

if (!rootDir || items.length === 0) {
  console.log(chalk.red("No valid structure found in the file."));
  process.exit(1);
}

const rootPath = path.resolve(process.cwd(), rootDir);

if (!fs.existsSync(rootPath)) {
  fs.mkdirSync(rootPath);
  console.log(chalk.green(`Created root folder: ${rootDir}`));
}

items.forEach(({ path: relPath, isDir }) => {
  const fullPath = path.resolve(rootPath, relPath);

  if (isDir) {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(
        chalk.green(`Created folder: ${path.relative(process.cwd(), fullPath)}`)
      );
    }
  } else {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, "");
      console.log(
        chalk.blue(`Created file: ${path.relative(process.cwd(), fullPath)}`)
      );
    }
  }
});
