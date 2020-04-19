export const filterMenus = (
  menus: Array<any>,
  currentUserData: any,
): Array<any> => {
  return menus
    .map((m) => {
      return { ...m };
    })
    .filter((m) => {
      if (m.children) {
        m.children = filterMenus(m.children, currentUserData);
        return m.children.length > 0;
      }

      if (m.ac) {
        return m.ac(currentUserData);
      } else {
        return true;
      }
    })
    .map((m) => {
      const { ac, ...rest } = m;
      return rest;
    });
};
