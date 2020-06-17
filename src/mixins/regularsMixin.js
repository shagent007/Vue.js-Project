export default {
  data() {
    return {
      regularEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      regularName: /[а-яА-Яa-zA-Z\s]/gi
    };
  }
};
