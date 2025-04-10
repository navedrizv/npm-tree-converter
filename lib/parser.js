export default function parseTree(tree) {
  const lines = tree.trim().split("\n");
  const stack = [];
  const result = [];

  let rootDir = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines or lines that are just '│' or junk
    if (!trimmed || trimmed === "│") continue;

    const level = (line.match(/^[\s│]*/)[0].match(/(  |│)/g) || []).length;
    const cleaned = line.replace(/^[\s│]*[├└]──\s/, "").trim();
    const isDir = cleaned.endsWith("/");
    const name = isDir ? cleaned.slice(0, -1) : cleaned;

    // First line = root folder
    if (level === 0 && isDir && !rootDir) {
      rootDir = name;
      stack.push({ level: 0, path: "" });
      continue;
    }

    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    const parentPath = stack.length ? stack[stack.length - 1].path : "";
    const relPath = pathJoin(parentPath, name);

    result.push({ path: relPath, isDir });

    if (isDir) {
      stack.push({ level, path: relPath });
    }
  }

  return { rootDir, items: result };
}

function pathJoin(...segments) {
  return segments.filter(Boolean).join("/");
}
