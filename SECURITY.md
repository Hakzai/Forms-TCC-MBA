# Política de Segurança

## Reporting de Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança, **não abra uma issue pública**. Em vez disso:

1. Envie um email para o mantenedor com detalhes da vulnerabilidade.
2. Aguarde confirmação de recebimento.
3. Evite divulgar publicamente até que um patch esteja disponível.

## Proteções em Vigência

### Branch `main`
- ✅ Requer revisão antes de merge
- ✅ Requer status check (se configurado)
- ✅ Force push desabilitado
- ✅ Dismissal de reviews obsoletos ao novo push

### Branch `forms-data`
- ✅ Apenas actions podem escrever
- ✅ Sem acesso direto para usuários

## Permissões e Acessos

### Admin
- Gerenciam configurações do repositório
- Podem fazer force push em qualquer branch
- Gerenciam colaboradores e teams

### Maintainer
- Revisam e aprovam PRs
- Aplicam labels `aprovado`
- Gerenciam issues

### Triage
- Aplicam labels `aprovado`
- Gerenciam issues (abrir/fechar)
- **Não podem fazer merge**

### Contributor
- Abrem issues
- Comentam em issues/PRs
- **Não podem aplicar labels nem fazer merge**

## Dados Sensíveis

⚠️ **NUNCA commitar:**
- Senhas ou tokens
- Chaves de API
- Informações pessoais
- Dados de respostas de formulários

O repositório armazena **apenas**:
- Nome abreviado do autor
- Tema de pesquisa
- Link público do formulário
- Prazo de submissão

## Logs de Auditoria

Todas as ações são registradas no GitHub:
- Quem abriu a issue
- Quem aplicou a label `aprovado`
- Quem fechou a issue
- Quem mergou para `main`

Verifique regularmente em: `Settings > Audit log`

## Configuração Recomendada no GitHub

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para instruções de setup.
