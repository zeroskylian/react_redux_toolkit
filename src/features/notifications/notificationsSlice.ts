import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { AppState } from '../../app/store';

type NotificationItem = {
  id: string;
  message: string;
  date: string;
  read: boolean;
  isNew: boolean;
  user: string;
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as AppState);
    const [latestNotification] = allNotifications;
    console.log((new Date()).toTimeString())
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const notificationsAdapter = createEntityAdapter<NotificationItem>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
} = notificationsAdapter.getSelectors<AppState>((state) => state.notifications);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          notification.read = true;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          notification.isNew = !notification.read;
        }
      });

      notificationsAdapter.upsertMany(state, action);
    });
  },
});

export default notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;
