const reducer = (state, action) => {
  switch (action.type) {
    case "SENDSMS":
      return {
        ...state,
        msg: [...state.msg, action.payload]
      };
    case "NEWKEY":
      return {
        ...state,
        keys: [
          ...state.keys,
          {
            key: action.payload.key,
            secret: action.payload.secret,
            name: action.payload.name
          }
        ]
      };
    default:
      return state;
  }
};

export default reducer;
