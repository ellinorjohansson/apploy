// ls.ts

// Save a job to localStorage under the key "job"
export const saveJobToLocalStorage = (value: string) => {
  localStorage.setItem("job", value);
};