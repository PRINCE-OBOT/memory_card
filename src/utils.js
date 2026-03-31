export const shuffleList = (lists) => {
  const newList = [...lists];
  const newListLen = newList.length;
  for (let i = 0; i < newListLen; i++) {
    const randomIndex = Math.floor(Math.random() * newListLen);

    [newList[i], newList[randomIndex]] = [newList[randomIndex], newList[i]];
  }
  return newList;
};

export const assignNewId = (lists) => {
  return lists.map((list) => {
    list.id = crypto.randomUUID();
    return list;
  });
};

export const closest = (elem, attr = "[data-card-id]") => elem.closest(attr);
