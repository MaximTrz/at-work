import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import request, { ERequestStatus } from '../../common/request';

import IUser from '../../types/IUser';

export interface IUserState {
  users: IUser[];
  status: ERequestStatus;
}

const initialState: IUserState = {
  users: [],
  status: ERequestStatus.IDLE,
};

export const selectUserById = (state: RootState, userId: number | string) =>
  state.users.users.find((user) => user.id === userId);

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await request.get<IUser[]>('users');
  return response.map((user) => ({
    ...user,
    archive: false,
    visible: true,
    avatar: 'https://http.cat/images/205.jpg',
  }));
});

export const updateUser = createAsyncThunk('user/updateUser', (user: IUser, { getState }) => {
  const { users } = getState() as RootState;
  const existingUser = users.users.find((u) => u.id === user.id);
  if (existingUser) {
    return { ...existingUser, ...user };
  }
  throw new Error('User not found');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      })

      .addCase(updateUser.pending, (_state) => {
        const state = _state;
        state.status = ERequestStatus.LOADING;
      })
      .addCase(updateUser.fulfilled, (_state, action: PayloadAction<IUser>) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.users = state.users.map((u) =>
          u.id !== action.payload.id ? u : { ...u, ...action.payload },
        );
      })
      .addCase(updateUser.rejected, (_state) => {
        const state = _state;
        state.status = ERequestStatus.FAILED;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectStatus = (state: RootState) => state.users.status;

export default userSlice.reducer;
