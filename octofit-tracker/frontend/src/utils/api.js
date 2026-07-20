export function getApiUrl(resource) {
  const envCodespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const derivedCodespaceName = hostname.includes('-5173.app.github.dev')
    ? hostname.replace(/-5173\.app\.github\.dev$/, '')
    : hostname.includes('-8000.app.github.dev')
      ? hostname.replace(/-8000\.app\.github\.dev$/, '')
      : '';

  const codespaceName = envCodespaceName || derivedCodespaceName;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `http://localhost:8000/api/${resource}/`;

  return baseUrl;
}
