const fs = require("fs");
const path = require("path");

const formsPath = path.join(__dirname, "../data/forms.json");
const readmePath = path.join(__dirname, "../README.md");

const raw = fs.existsSync(formsPath) ? fs.readFileSync(formsPath, "utf8").trim() : "[]";
const forms = raw ? JSON.parse(raw) : [];

const tableRows = forms.length
  ? forms
      .map(
        (form) =>
          `| ${form.author} | ${form.theme} | [Open Form](${form.url}) | ${form.deadline || "-"} |`
      )
      .join("\n")
  : "| - | - | - | - |";

const content = `# FormsTCC

Repositorio para agregar links de formularios de TCC do MBA de Engenharia de Software.

Este README e gerado automaticamente a partir de data/forms.json.

## Como adicionar um formulario

Use a action "Add Form" na aba GitHub Actions e preencha os campos solicitados.

## Formularios ativos

| Autor | Tema | Formulario | Prazo |
|---|---|---|---|
${tableRows}
`;

fs.writeFileSync(readmePath, content);

console.log("README generated successfully");
