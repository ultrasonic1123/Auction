export function convertToBase64(data) {
  return btoa(
    new Uint8Array(data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );
}
