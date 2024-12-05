const {
  filterStarredRepos,
  sortByLastUpdated,
  getStars,
} = require("../src/utils.js");

describe("Repository Utility Functions", () => {
  const sampleRepos = [
    { name: "Repo1", stargazers_count: 10, updated_at: "2024-11-10T12:00:00Z" },
    { name: "Repo2", stargazers_count: 3, updated_at: "2024-11-08T12:00:00Z" },
    { name: "Repo3", stargazers_count: 7, updated_at: "2024-11-09T12:00:00Z" },
    { name: "Repo4", stargazers_count: 15, updated_at: "2024-11-07T12:00:00Z" },
    { name: "Repo5", stargazers_count: 4, updated_at: "2024-11-06T12:00:00Z" },
  ];

  describe("filterStarredRepos", () => {
    describe("when a non-empty array is received", () => {
      it("returns the returns the repositories with more than 5 stars", () => {
        const result = filterStarredRepos(sampleRepos);
        expect(result).toEqual([
          {
            name: "Repo1",
            stargazers_count: 10,
            updated_at: "2024-11-10T12:00:00Z",
          },
          {
            name: "Repo3",
            stargazers_count: 7,
            updated_at: "2024-11-09T12:00:00Z",
          },
          {
            name: "Repo4",
            stargazers_count: 15,
            updated_at: "2024-11-07T12:00:00Z",
          },
        ]);
      });

      it("returns an empty array if no repositories have more than 5 stars", () => {
        const repos = [
          { name: "Repo1", stargazers_count: 3 },
          { name: "Repo2", stargazers_count: 2 },
        ];
        expect(filterStarredRepos(repos)).toEqual([]);
      });
    });

    describe("when an empty array is received", () => {
      it("returns an empty array", () => {
        expect(filterStarredRepos([])).toEqual([]);
      });
    });
  });

  describe("sortByLastUpdated", () => {
    describe("when a non-empty array is received", () => {
      it("returns sorted repositories by last updates in descending order", () => {
        const result = sortByLastUpdated(sampleRepos, 3);
        expect(result).toEqual([
          {
            name: "Repo1",
            stargazers_count: 10,
            updated_at: "2024-11-10T12:00:00Z",
          },
          {
            name: "Repo3",
            stargazers_count: 7,
            updated_at: "2024-11-09T12:00:00Z",
          },
          {
            name: "Repo2",
            stargazers_count: 3,
            updated_at: "2024-11-08T12:00:00Z",
          },
        ]);
      });

      it("limits the result to the specified amount", () => {
        const result = sortByLastUpdated(sampleRepos, 2);
        expect(result.length).toBe(2);
      });
    });

    describe("when an empty array is received", () => {
      it("returns an empty array", () => {
        expect(sortByLastUpdated([])).toEqual([]);
      });
    });
  });

  describe("getStars", () => {
    it("returns the total number of stars across all repositories", () => {
      const result = getStars(sampleRepos);
      expect(result).toBe(39);
    });

    it("returns 0 if the repositories array is empty", () => {
      expect(getStars([])).toBe(0);
    });
  });
});
