import { getFileDetails } from './index';

test('should return correct fileSize and fileType', async () => {
  const result = await getFileDetails('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png');
  const { fileSize, fileType } = result;
  expect(fileSize).toEqual('170.68 KB');
  expect(fileType).toEqual('png');
});

test('should return correct fileSize and fileType', async () => {
  const result = await getFileDetails(1);
  expect(result).toEqual('Invalid url entered');
});
