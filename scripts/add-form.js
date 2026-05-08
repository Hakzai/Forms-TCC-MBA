const fs = require("fs");
const path = require("path");

const [author, theme, url, deadline] = process.argv.slice(2);

const requireValue = (value, label) => {
  if (!value || !value.trim()) {
    throw new Error(`${label} is required`);
  }
};

const parseDateString = (value) => {
  if (!value) return null;
  const trimmed = value.trim();
  let match = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }
    return date;
  }

  match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }
    return date;
  }

  return null;
};

requireValue(author, "Author");
requireValue(theme, "Theme");
requireValue(url, "URL");

if (!url.startsWith("https://")) {
  throw new Error("URL must start with https://");
}

const normalizedDeadline = deadline && deadline.trim() ? deadline.trim() : null;

if (normalizedDeadline) {
  const isFormatted = /^\d{2}-\d{2}-\d{4}$/.test(normalizedDeadline);
  const parsed = parseDateString(normalizedDeadline);
  if (!isFormatted || !parsed) {
    throw new Error("Deadline must be in DD-MM-YYYY format");
  }
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
  const aDate = parseDateString(a.deadline);
  const bDate = parseDateString(b.deadline);
  if (!aDate) return 1;
  if (!bDate) return -1;
  const dateDiff = aDate - bDate;
  if (dateDiff !== 0) return dateDiff;
  return new Date(a.createdAt) - new Date(b.createdAt);
});

fs.writeFileSync(filePath, JSON.stringify(forms, null, 2));

console.log("Form added successfully");
