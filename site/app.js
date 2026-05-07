const parseDeadline = (deadline) => {
  if (!deadline) return null;
  return new Date(`${deadline}T23:59:59`);
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
      <p>Use a action "Add Form" no GitHub para registrar o primeiro link.</p>
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
      <div class="meta">
        <span class="badge">${expired ? "Encerrado" : "Ativo"}</span>
        <p>Autor: ${form.author}</p>
        <p>Prazo: ${form.deadline || "-"}</p>
      </div>
      <div class="actions">
        <a href="${form.url}" target="_blank" rel="noopener">Abrir formulario</a>
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
    return new Date(a.deadline) - new Date(b.deadline);
  });
};

const loadForms = async () => {
  const container = document.getElementById("forms");

  try {
    const response = await fetch("../data/forms.json");
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

loadForms();
