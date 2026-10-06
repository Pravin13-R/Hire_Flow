const API_URL =  "https://jsonplaceholder.typicode.com";

export const getCandidates = async () => {

    const response = await fetch(
        `${API_URL}/users`
    );

    if (!response.ok) {
        throw new Error (
            "Failed to fetch candidates"
        )
    }

    return response.json();
};


export const getJobs = async () => {
    const response = await fetch (
    `${API_URL}/posts`
    );

    if (!response.ok){
        throw new Error(
            "Failed to fetch jobs"
        );
    }
    return response.json();
};

export const getInterviews = async () => {
    const response = await fetch(
        `${API_URL}/comments`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch interviews"
        );
    }
    return response.json();
};

export const getTeamMembers = async () => {

  const response = await fetch(
    `${API_URL}/users`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch team members"
    );
  }

  return response.json();
};