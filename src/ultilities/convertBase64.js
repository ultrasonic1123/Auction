export function convertToBase64(data) {
  return btoa(String.fromCharCode(...new Uint8Array(data)));
}
