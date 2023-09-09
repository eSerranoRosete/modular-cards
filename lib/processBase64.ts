export function processBase64(base64?: string) {
  if (!base64) return undefined;

  const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;
  if (!base64Regex.test(base64)) {
    return null;
  }

  return {
    base64Content: base64.split(",")[1],
    mediaType: "image/jpg",
    name: "file.jpg",
  };
}
