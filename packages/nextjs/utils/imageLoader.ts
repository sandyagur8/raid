export const getAssetPath = (filename: string) => {
  // Remove any leading slashes or ../
  const cleanFilename = filename.replace(/^[./]+/, '');
  return `/assets/${cleanFilename}`;
}; 