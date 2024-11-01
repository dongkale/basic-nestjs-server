export function findKeyValueByValue(obj, targetValue) {
  for (const key in obj) {
    if (obj[key] === targetValue) {
      return { key: key, value: obj[key] };
    }
  }
  return {}; // targetValue가 obj에 없는 경우
}

export function getFindValuefromMap(map, searchValue) {
  const result = Array.from(map.entries()).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([key, value]) => value === searchValue,
  );

  // 결과를 객체로 변환하여 반환, 결과가 없을 경우 빈 객체 반환
  return result ? { key: result[0], value: result[1] } : {};
}

// export function isEmptyObject(param): boolean {
//   return Object.keys(param).length === 0;
// }

export function isEmptyObject(obj) {
  // return !obj || !Object.keys(obj).some((x) => obj[x] !== void 0);
  return !obj || !Object.values(obj).some((x) => x !== void 0);
}

export function isValidObject(obj): boolean {
  return !isEmptyObject(obj);
}
