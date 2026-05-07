const fs = require("fs");
const path = require("path");

const [author, theme, url, deadline] = process.argv.slice(2);

const requireValue = (value, label) => {
  if (!value || !value.trim()) {
    throw new Error(`${label} is required`);
  }
};

requireValue(author, "Author");
requireValue(theme, "Theme");
requireValue(url, "URL");

if (!url.startsWith("https://")) {
  throw new Error("URL must start with https://");
}

const normalizedDeadline = deadline && deadline.trim() ? deadline.trim() : null;

if (normalizedDeadline && !/^\d{4}-\d{2}-\d{2}$/.test(normalizedDeadline)) {
  throw new Error("Deadline must be in YYYY-MM-DD format");
}

const filePath = path.join(__dirname, "../data/forms.json");
const dirPath = path.dirname(filePath);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

let forms = [];
if (fs.existsSync(filePath)) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  forms = raw ? JSON.parse(raw) : [];
}

forms.push({
  author: author.trim(),
  theme: theme.trim(),
  url: url.trim(),
  deadline: normalizedDeadline,
  createdAt: new Date().toISOString()
});

forms.sort((a, b) => {
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  const dateDiff = new Date(a.deadline) - new Date(b.deadline);
  if (dateDiff !== 0) return dateDiff;
  return new Date(a.createdAt) - new Date(b.createdAt);
});

fs.writeFileSync(filePath, JSON.stringify(forms, null, 2));

console.log("Form added successfully");
