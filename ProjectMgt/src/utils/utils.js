// utils.js
export function getInitials(name) {
  if (!name || typeof name !== 'string') return ''; // Check if name is not a string or undefined
  const trimmedName = name.trim(); // Trim any whitespace around the name
  const parts = trimmedName.split(' ');
  const initials = parts.map(part => part[0].toUpperCase()).join('');
  return initials;
}
