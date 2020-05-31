export const camelize = (string: string) => {
  string = string
    // Remove any non-word chars and upcase the next word char if present
    .replace(/[\W_]+(\w)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};
