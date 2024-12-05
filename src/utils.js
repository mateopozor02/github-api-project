// Function to filter the repos with more than 5 stars
export function filterStarredRepos(repositories) {
  return repositories.filter((repo) => repo.stargazers_count > 5);
}

// Sort repositories by last updated
export function sortByLastUpdated(repositories, count = 5) {
  return repositories
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, count);
}

// Get the total stars across all repositories
export function getStars(repositories) {
  return repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}
