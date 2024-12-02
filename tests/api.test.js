import { isResponseValid } from "../src/api";

describe('isResponseValid', () => {
    describe('when a non-empty array of repositories is received', () => {
        it('returns true for valid repositories and properties', () => {
            const repositories = [
                { name: "repo1", stargazers_count: 10, updated_at: "2024-01-01T00:00:00Z" },
                { name: "repo2", stargazers_count: 5, updated_at: "2024-01-02T00:00:00Z" }
            ];
            const properties = ["name", "stargazers_count", "updated_at"];
            expect(isResponseValid(repositories, properties)).toBe(true);
        });

        it('returns false when any property is missing in the repositories', () => {
            const repositories = [
                { name: "repo1", updated_at: "2024-01-01T00:00:00Z" }, // Missing stargazers_count
                { name: "repo2", stargazers_count: 5, updated_at: "2024-01-02T00:00:00Z" }
            ];
            const properties = ["name", "stargazers_count", "updated_at"];
            expect(isResponseValid(repositories, properties)).toBe(false);
        });

        it('returns true when no properties are specified and repositories are valid', () => {
            const repositories = [
                { name: "repo1", stargazers_count: 10, updated_at: "2024-01-01T00:00:00Z" },
                { name: "repo2", stargazers_count: 5, updated_at: "2024-01-02T00:00:00Z" }
            ];
            expect(isResponseValid(repositories)).toBe(true); // Defaults to ["name", "stargazers_count", "updated_at"]
        });

        it('returns true for custom properties when all are valid', () => {
            const repositories = [
                { name: "repo1", stars: 50, forks: 10 },
                { name: "repo2", stars: 30, forks: 5 }
            ];
            const properties = ["name", "stars", "forks"];
            expect(isResponseValid(repositories, properties)).toBe(true);
        });

        it('returns false for custom properties when some are missing', () => {
            const repositories = [
                { name: "repo1", stars: 50 },
                { name: "repo2", stars: 30, forks: 5 }
            ];
            const properties = ["name", "stars", "forks"];
            expect(isResponseValid(repositories, properties)).toBe(false);
        });
    });

    describe('when an empty array is received', () => {
        it('returns false for an empty repositories array', () => {
            const repositories = [];
            const properties = ["name", "stargazers_count", "updated_at"];
            expect(isResponseValid(repositories, properties)).toBe(false);
        });

        it('returns false for an empty repositories array and no properties specified', () => {
            const repositories = [];
            expect(isResponseValid(repositories)).toBe(false);
        });
    });
});