# Guia de Contribuição

## Como Contribuir

### 1. Adicionar um Formulário

1. Abra a issue template: [Adicionar formulário](../../issues/new?template=add-form.yml)
2. Preencha os campos obrigatórios:
   - **Autor**: Seu nome (ex: Maria S.)
   - **Tema**: Tema do seu TCC (ex: IA aplicada em sistemas distribuídos)
   - **Link do formulário**: URL do Google Forms (ex: https://forms.gle/...)
   - **Prazo** (opcional): Data limite (DD-MM-YYYY)

3. Aguarde um moderador aplicar o label `aprovado`
4. A issue será fechada automaticamente após publicação

### 2. Gerenciar a Aprovação

Se você é **moderador** (tem acesso Triage ou Maintain):

1. Abra a [aba Issues](../../issues)
2. Revise a nova issue
3. Aplique o label **`aprovado`** para publicar
4. O workflow rodará automaticamente

### Configuração de Colaboradores

#### Adicionar um Moderador (Triage)

1. Vá para `Settings > Collaborators and teams`
2. Clique em `Add people`
3. Digite o username do GitHub
4. Selecione role **`Triage`**
5. Confirme

**O que um Triage pode fazer:**
- ✅ Aplicar labels
- ✅ Abrir/fechar issues
- ✅ Comentar
- ❌ Fazer merge
- ❌ Acessar configurações

#### Adicionar um Revisor (Maintain)

1. Vá para `Settings > Collaborators and teams`
2. Clique em `Add people`
3. Digite o username do GitHub
4. Selecione role **`Maintain`**
5. Confirme

**O que um Maintain pode fazer:**
- ✅ Tudo que Triage faz
- ✅ Fazer merge em PRs
- ✅ Editar wiki
- ❌ Acessar configurações

### Configurar Branch Protection (Main)

1. Vá para `Settings > Branches`
2. Clique em `Add rule` ou edite `main`
3. Ative:
   - ✅ **Require a pull request before merging**
   - ✅ **Require reviews from Code Owners**
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ **Restrict who can push to matching branches** → Selecione admin apenas

### Configurar Branch Protection (Forms-Data)

1. Vá para `Settings > Branches`
2. Clique em `Add rule` para branch `forms-data`
3. Ative:
   - ✅ **Require a pull request before merging**
   - ✅ **Restrict who can push to matching branches** → Desabilite para permitir apenas a action

### Equipes (Opcional)

Pode criar uma equipe de moderadores:

1. `Settings > Teams`
2. `New team` → `forms-reviewers`
3. Adicione membros
4. Dê permissão **`Triage`** para a equipe

Depois na regra de branch, você pode exigir aprovação de um membro da equipe.

## Boas Práticas

- ✅ Revisar sempre se o link é válido (Google Forms)
- ✅ Fechar issues duplicadas
- ✅ Comentar na issue quando a publicação acontecer
- ✅ Verificar regularmente o `Audit log`

## Perguntas?

Abra uma [issue](../../issues) ou entre em contato com um admin.
