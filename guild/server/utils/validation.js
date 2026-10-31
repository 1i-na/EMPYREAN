// validate discord username
export function isValidUsername(value) {
  if (typeof value !== "string") return null;

  const username = value.trim().toLowerCase();
  const validFormat =
    /^[a-z0-9._]{2,32}$/.test(username) &&
    !username.includes("..");

  return validFormat ? username : null;
}

// validate password
export function isValidPassword(value) {
  return (
    typeof value === "string" &&
    value.length >= 7 &&
    !/\s/.test(value)
  );
}