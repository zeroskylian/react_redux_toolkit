import React, { useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import classnames from 'classnames';
import { selectUserEntities } from '../../features/users/usersSlice';
import styles from './NotificationsList.module.css';
import {
  selectAllNotifications,
  allNotificationsRead,
} from '../../features/notifications/notificationsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';

export default function NotificationList() {
  const notifications = useAppSelector(selectAllNotifications);
  const usersById = useAppSelector(selectUserEntities);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allNotificationsRead());
  });
  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = usersById[notification.user];

    const notificationClassname = classnames(styles.notification, {
      [styles.new]: notification.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user?.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className={styles.notificationsList}>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
}
