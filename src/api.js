// Fetch the data from the API
export async function fetchRepositories(){
    const url = "https://api.github.com/orgs/stackbuilders/repos";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch repos");
        return await response.json();
    } catch (error){
        console.error("Error fetching the repos: ", error); 
    }
} 