export default function softMatchParentChildStg(strg1: string, strg2: string) {
  const magic = new RegExp(strg1);
  return magic.test(strg2);
}
