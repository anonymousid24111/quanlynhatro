import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../pages/auth/authSlice";
import adminAlice from "../pages/admin/adminSlice";
import lessorSlice from "../pages/lessor/lessorSlice";
// ...

export const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminAlice,
        lessor: lessorSlice,
        // comments: commentsReducer,
        // users: usersReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
