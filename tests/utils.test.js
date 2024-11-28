const { filterStarredRepos, sortByLastUpdated, getStars } = require('../src/utils.js');

describe('Repository Utility Functions', () => {
  const sampleRepos = [
    { name: 'Repo1', stargazers_count: 10, updated_at: '2024-11-10T12:00:00Z' },
    { name: 'Repo2', stargazers_count: 3, updated_at: '2024-11-08T12:00:00Z' },
    { name: 'Repo3', stargazers_count: 7, updated_at: '2024-11-09T12:00:00Z' },
    { name: 'Repo4', stargazers_count: 15, updated_at: '2024-11-07T12:00:00Z' },
    { name: 'Repo5', stargazers_count: 4, updated_at: '2024-11-06T12:00:00Z' },
  ];

  describe('filterStarredRepos', () => {
    it('should filter repositories with more than 5 stars', () => {
      const result = filterStarredRepos(sampleRepos);
      expect(result).toEqual([
        { name: 'Repo1', stargazers_count: 10, updated_at: '2024-11-10T12:00:00Z' },
        { name: 'Repo3', stargazers_count: 7, updated_at: '2024-11-09T12:00:00Z' },
        { name: 'Repo4', stargazers_count: 15, updated_at: '2024-11-07T12:00:00Z' },
      ]);
    });

    it('should return an empty array if no repositories have more than 5 stars', () => {
      const repos = [
        { name: 'Repo1', stargazers_count: 3 },
        { name: 'Repo2', stargazers_count: 2 },
      ];
      expect(filterStarredRepos(repos)).toEqual([]);
    });
  });

  describe('sortByLastUpdated', () => {
    it('should sort repositories by last updated in descending order', () => {
      const result = sortByLastUpdated(sampleRepos, 3);
      expect(result).toEqual([
        { name: 'Repo1', stargazers_count: 10, updated_at: '2024-11-10T12:00:00Z' },
        { name: 'Repo3', stargazers_count: 7, updated_at: '2024-11-09T12:00:00Z' },
        { name: 'Repo2', stargazers_count: 3, updated_at: '2024-11-08T12:00:00Z' },
      ]);
    });

    it('should limit the result to the specified count', () => {
      const result = sortByLastUpdated(sampleRepos, 2);
      expect(result.length).toBe(2);
    });
  });

  describe('getStars', () => {
    it('should return the total number of stars across all repositories', () => {
      const result = getStars(sampleRepos);
      expect(result).toBe(39);
    });

    it('should return 0 if the repositories array is empty', () => {
      expect(getStars([])).toBe(0);
    });
  });
});
