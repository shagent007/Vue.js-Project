export default function notAdmin({ next, store }) {
  if (store.getters["userInformation/getIsAdmin"]) {
    return next({
      name: "AdminPanel"
    });
  }

  return next();
}
