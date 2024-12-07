export const getAssetPath = (filename: string) => {
  const cleanFilename = filename.replace(/^[./]+/, '');
  return `/assets/${cleanFilename}`;
}; 
