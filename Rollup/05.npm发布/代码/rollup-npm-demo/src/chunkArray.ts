import { chunk } from 'lodash-es';
const chunkArray = <T>(array: T[], size: number) => {
  return chunk(array, size);
}
export default chunkArray;