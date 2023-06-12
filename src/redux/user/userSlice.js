export const createUser = (payload) => {
  return {
    type: "createUser",
    payload,
  };
};

export const getCurrentUser = (payload) => {
  return {
    type: "getCurrentUser",
    payload,
  };
};
