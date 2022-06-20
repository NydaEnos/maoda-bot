# file-info-finder

# Description
This package will take a remote file url and return the size and file type

# Example
    import { getFileDetails } from  'file-info-finder';

    const response = await getFileDetails('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png');

    const { fileSize, fileType } = response;

# License
MIT License