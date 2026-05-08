const parseDeadline = (deadline) => {
  if (!deadline) return null;
  const trimmed = String(deadline).trim();
  let match = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);
  }

  match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);
  }

  return null;
};

const fallbackConfig = {
  repoUrl: "https://github.com/hakzai/Forms-TCC-MBA",
  dataBranch: "forms-data"
};

const appConfig = window.FORMS_CONFIG || fallbackConfig;
const repoUrl = appConfig.repoUrl;
const dataBranch = appConfig.dataBranch;
const issueUrl = `${repoUrl}/issues/new?template=add-form.yml`;

const setupAddFormLink = () => {
  const link = document.getElementById("add-form-link");
  if (!link) return;

  if (!repoUrl || repoUrl.includes("OWNER/REPO")) {
    link.textContent = "Configurar URL do repositorio";
    link.classList.add("disabled");
    link.setAttribute("aria-disabled", "true");
    return;
  }

  link.href = issueUrl;
};

const isExpired = (deadline) => {
  const date = parseDeadline(deadline);
  if (!date) return false;
  return date < new Date();
};

const renderEmpty = (container) => {
  container.innerHTML = `
    <div class="empty">
      <h2>Sem formularios ainda</h2>
      <p>Use o botao "Adicionar formulario" e aguarde aprovacao.</p>
    </div>
  `;
};

const renderForms = (container, forms) => {
  forms.forEach((form) => {
    const card = document.createElement("article");
    const expired = isExpired(form.deadline);

    card.className = `card${expired ? " expired" : ""}`;
    card.innerHTML = `
      <h2>${form.theme}</h2>
      <div class="card-row">
        <div class="meta">
          <span class="badge">${expired ? "Encerrado" : "Ativo"}</span>
          <p>Autor: ${form.author}</p>
          <p>Prazo: ${form.deadline || "-"}</p>
        </div>
        <div class="actions">
          <a href="${form.url}" target="_blank" rel="noopener">Abrir formulario</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};

const updateStats = (forms) => {
  const total = forms.length;
  const expired = forms.filter((form) => isExpired(form.deadline)).length;
  const active = total - expired;

  document.getElementById("total-count").textContent = total;
  document.getElementById("active-count").textContent = active;
  document.getElementById("expired-count").textContent = expired;
};

const sortForms = (forms) => {
  return [...forms].sort((a, b) => {
    const aExpired = isExpired(a.deadline);
    const bExpired = isExpired(b.deadline);

    if (aExpired !== bExpired) return aExpired ? 1 : -1;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    const aDate = parseDeadline(a.deadline);
    const bDate = parseDeadline(b.deadline);
    if (!aDate) return 1;
    if (!bDate) return -1;
    return aDate - bDate;
  });
};

const loadForms = async () => {
  const container = document.getElementById("forms");
  const cacheBust = Date.now();
  const rawBase = repoUrl.replace("https://github.com/", "https://raw.githubusercontent.com/");
  const dataUrl = `${rawBase}/${dataBranch}/data/forms.json?ts=${cacheBust}`;

  try {
    const response = await fetch(dataUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to load forms");
    }

    const forms = await response.json();
    updateStats(forms);

    if (!forms.length) {
      renderEmpty(container);
      return;
    }

    renderForms(container, sortForms(forms));
  } catch (error) {
    container.innerHTML = `
      <div class="empty">
        <h2>Erro ao carregar</h2>
        <p>Verifique se o arquivo data/forms.json esta publico.</p>
      </div>
    `;
  }
};

setupAddFormLink();
loadForms();
