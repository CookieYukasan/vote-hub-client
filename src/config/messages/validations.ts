export function getMaxLenMessage(maxLen: number) {
  const message = `Must not be longer than ${maxLen} characters.`;

  return { message };
}

export function getMinLenMessage(minLen: number) {
  const message = `Must be at least ${minLen} characters.`;

  return { message };
}

export function getRequiredMessage(fieldName?: string) {
  const message = fieldName
    ? `${fieldName} is required.`
    : "This field is required.";

  return message;
}
