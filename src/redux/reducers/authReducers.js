const INITIAL_STATE = {
  id: 0,
  name: "",
  username: "",
  email: "",
  role: "",
  verified: "",

  register: false,
  login: false,
  logout: false,
  modalAuth: false,

  goodUser: false,

  errorUserLog: false,
  errorPassLog: false,
  textUserLog: "",
  textPassLog: "",

  errorName: false,
  errorUser: false,
  errorPass: false,
  errorEmail: false,
  errorServer: false,

  textName: "",
  textUser: "",
  textPass: "",
  textEmail: "",
  textServer: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ======================================== SUCCESS
    case "LOGIN_SUCCESS":
      return { ...INITIAL_STATE, ...action.payload, login: true };
    case "REG_SUCCESS":
      return { ...INITIAL_STATE, register: true };
    case "GOOD_USER":
      return { ...state, goodUser: true };

    // ======================================== LOGOUT
    case "LOGOUT":
      return { ...INITIAL_STATE, logout: true };
    case "RESET":
      return INITIAL_STATE;

    // ======================================== MODAL AUTH
    case "MODAL_AUTH":
      return { ...state, modalAuth: action.payload };

    // ======================================== ERROR
    case "SERVER_ERROR":
      return {
        ...state,
        errorServer: true,
        textServer: action.payload
      };
    case "WRONG_USERLOG":
      return {
        ...state,
        errorUserLog: true,
        textUserLog: action.payload
      };
    case "WRONG_PASSLOG":
      return {
        ...state,
        errorPassLog: true,
        textPassLog: action.payload
      };
    case "WRONG_USER":
      return {
        ...state,
        errorUser: true,
        textUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...state,
        goodUser: true,
        errorPass: true,
        textPass: action.payload
      };
    case "WRONG_FORM":
      return {
        ...state,
        errorName: true,
        errorUser: true,
        errorPass: true,
        errorEmail: true,
        textName: action.payload,
        textUser: action.payload,
        textPass: action.payload,
        textEmail: action.payload
      };
    default:
      return state;
  }
};
