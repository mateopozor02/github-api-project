// Fetch the data from the API
export async function fetchRepositories(){
    const url = "https://api.github.com/orgs/stackbuilders/repos";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch repos");
        
        const repositories = await response.json();
        // Validate the fetched repositories
        if (!isResponseValid(repositories)){
            throw new Error("Fetched data does not contain the required properties");
        }

        return repositories; 
    } catch (error){
        console.error("Error fetching the repos: ", error); 
    }
} 

// Property validation function
export function isResponseValid(repositories, properties = ["name", "stargazers_count", "updated_at"]) {
    if (!Array.isArray(repositories) || repositories.length === 0) {
        return false; // Return false if repositories is not a valid array or is empty
    }
    // Check if all properties exist in the first object of the repositories array
    const exampleRepo = repositories[0];

    return properties.every(prop => prop in exampleRepo);
}