// displayRepos.test.js
import { displayStarredRepos, displayRecentRepos, displayTotalStars } from '../src/ui.js';
import { filterStarredRepos, sortByLastUpdated, getStars } from '../src/utils.js';

// Mocking utility functions
jest.mock('../src/utils.js');

describe('displayRepos functions', () => {
  let repositories;

  beforeEach(() => {
    // Sample data to test with
    repositories = [
      { name: 'repo1', stargazers_count: 100, updated_at: '2021-06-14T13:35:00Z' },
      { name: 'repo2', stargazers_count: 50, updated_at: '2022-05-14T13:35:00Z' },
      { name: 'repo3', stargazers_count: 150, updated_at: '2023-03-14T13:35:00Z' }
    ];

    // Mocking DOM elements
    document.body.innerHTML = `
      <ul id="starred-repos"></ul>
      <ul id="recent-repos"></ul>
      <div id="total-stars"></div>
    `;
  });

  test('displayStarredRepos adds the repos with more than 5 stars to the DOM', () => {
    // Mock the filterStarredRepos function to return some starred repos
    filterStarredRepos.mockReturnValue([repositories[0], repositories[1], repositories[2]]);
    
    displayStarredRepos(repositories);

    // Test that the DOM is updated correctly
    const listItems = document.querySelectorAll('#starred-repos li');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe('repo1 - Stars 100');
    expect(listItems[1].textContent).toBe('repo2 - Stars 50');
    expect(listItems[2].textContent).toBe('repo3 - Stars 150');
  });

  test('displayRecentRepos adds the recent repos to the DOM', () => {
    // Mock the sortByLastUpdated function to return sorted repos
    sortByLastUpdated.mockReturnValue([repositories[2], repositories[1], repositories[0]]);
    
    displayRecentRepos(repositories);

    // Test that the DOM is updated correctly
    const listItems = document.querySelectorAll('#recent-repos li');
    expect(listItems[0].textContent).toBe('repo3 - Last Updated: 3/14/2023');
    expect(listItems[1].textContent).toBe('repo2 - Last Updated: 5/14/2022');
    expect(listItems[2].textContent).toBe('repo1 - Last Updated: 6/14/2021');
  });

  test('displayTotalStars updates the total stars in the DOM', () => {
    // Mock the getStars function to return a total number of stars
    getStars.mockReturnValue(300);

    displayTotalStars(repositories);

    // Test that the total stars text content is updated
    const totalStarsElement = document.getElementById('total-stars');
    expect(totalStarsElement.innerText).toBe(300);
  });
});
