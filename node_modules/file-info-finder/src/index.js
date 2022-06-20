import axios from 'axios';

const getFileType = (fileType) => {
  return fileType.split('/').pop();
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const getFileDetails = async (url) => {
  try {
    const info = await axios.get(url);
    const { 
      'content-length': contentLength,
      'content-type': contentType,
   } = info.headers;
   const fileType = getFileType(contentType);
   const fileSize = formatBytes(contentLength);
    return { 
      fileSize,
      fileType
    }
  } catch {
    return 'Invalid url entered';
  }
}