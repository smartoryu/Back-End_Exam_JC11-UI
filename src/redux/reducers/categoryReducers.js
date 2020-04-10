const INITIAL_STATE = {
  dataCategory: [],
  sortedCategory: [],
  pagesCount: 0,
  loading: true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "GET_CAT":
      return { ...INITIAL_STATE, dataCategory: payload.data, pagesCount: payload.count, loading: false };
    case "GET_SORTED_CAT":
      return { ...state, dataCategory: payload.data };

    default:
      return state;
  }
};
