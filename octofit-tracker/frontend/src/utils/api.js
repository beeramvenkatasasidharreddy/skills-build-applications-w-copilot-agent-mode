export function getApiUrl(resource) {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const codespaceMatch = hostname.match(/^(?<name>.+?)-(?:5173|8000)\.app\.github\.dev$/);

  if (codespaceMatch?.groups?.name) {
    return `https://${codespaceMatch.groups.name}-8000.app.github.dev/api/${resource}/`;
  }

  return `/api/${resource}/`;
}
