export default function notAdmin({ next, store }) {
  // если админ залогинен
  if (store.getters["userInformation/getIsAdmin"]) {
    return next();
  }

  return next({
    name: "AdminPanel"
  });
}
