export const saveJobToLocalStorage = (value: string) => {
  localStorage.setItem("job", value);
};