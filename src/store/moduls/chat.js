const state = {
  chatList: [],
  currentChat: null,
  loaded: false
};

const getters = {
  CHAT_LIST: state => state.chatList,
  LOADED: state => state.loaded,
  CURRENT_CHAT: state => state.currentChat,
  CURRENT_DIALOG: state =>
    state.chatList && // если есть данные
    state.currentChat !== null && // и выбран диалог
    state.chatList[state.currentChat].dialogData
};

const actions = {
  fetchChatList({ commit }) {
    commit("setLoading");

    // полученные данные с сервера
    const chatList = new Array(12).fill().map(() => ({
      id: 0,
      image: "",
      name: "Владимир путин",
      lastMessageDate: "22:11",
      lastMessage: "последнее сообщение",
      online: true,
      dialogData: JSON.parse(
        JSON.stringify({
          info: {
            image: "",
            online: true,
            name: "Владимир путин",
            lastOnline: "5 минут назад"
          },
          messages: [
            {
              text: "hello",
              self: false
            }
          ]
        })
      )
    }));

    commit("setChatList", chatList);
    commit("cancelLoading");
  },

  sendMessage({ commit }, message) {
    commit("sendMessage", message);
  },

  changeChat({ commit }, chat) {
    commit("setChat", chat);
  }
};

const mutations = {
  setChatList(state, chatList) {
    state.chatList = chatList;
  },

  setLoading(state) {
    state.loaded = false;
  },

  cancelLoading(state) {
    state.loaded = true;
  },

  setChat(state, chatIndex) {
    console.log(chatIndex, "chatIndex");
    state.currentChat = chatIndex;
  },

  sendMessage(state, message) {
    state.chatList[state.currentChat].dialogData.messages.push({
      text: message,
      self: true
    });

    // фейковый ответ
    state.chatList[state.currentChat].dialogData.messages.push({
      text: "hi",
      self: false
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
