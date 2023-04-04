import { configureStore } from "@reduxjs/toolkit";
import { authReduces } from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReduces,
  },
});

export default store;
