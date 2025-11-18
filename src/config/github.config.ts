const githubConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER,
  studnet_repo: import.meta.env.VITE_GITHUB_STUDENT_REPO,
  staff_repo: import.meta.env.VITE_GITHUB_STAFF_REPO,
  counselor_repo: import.meta.env.VITE_GITHUB_COUNSELOR_REPO,
  apiBaseUrl: "https://api.github.com",
};

export default githubConfig;
