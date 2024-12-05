import { filterStarredRepos, sortByLastUpdated, getStars } from "./utils.js";

// Function to display in the html
export function displayStarredRepos(repositories) {
  const list = document.getElementById("starred-repos");
  // Clear the previous list
  list.innerHTML = "";
  // Get the starred repos
  const starredRepos = filterStarredRepos(repositories);
  // Add the repos to the list element
  starredRepos.forEach((repo) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${repo.name} - Stars ${repo.stargazers_count}`;
    list.appendChild(listItem);
  });
}

export function displayRecentRepos(repositories) {
  const recentRepos = sortByLastUpdated(repositories);
  const list = document.getElementById("recent-repos");
  list.innerHTML = "";

  recentRepos.forEach((repo) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${repo.name} - Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;
    list.appendChild(listItem);
  });
}

export function displayTotalStars(repositories) {
  const starElement = document.getElementById("total-stars");
  starElement.innerText = getStars(repositories);
}
