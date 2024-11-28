import { fetchRepositories } from "./api.js";
import { displayStarredRepos, displayRecentRepos, displayTotalStars } from './ui.js';

document.addEventListener('DOMContentLoaded', init);
const loadBtn = document.getElementById("loadBtn");
loadBtn.addEventListener("click", init); 

async function init() {
    const repositories = await fetchRepositories();
    displayStarredRepos(repositories);
    displayRecentRepos(repositories);
    displayTotalStars(repositories);
}