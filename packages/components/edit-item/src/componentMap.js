export const componentMap = new Map();

export function setEditComponent(mapList = []) {
  mapList.forEach((item) => {
    componentMap.set(item[0], item[1]);
  });
}
