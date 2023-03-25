import React, { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);
  let displayNotification = null;

  const activeNotification = notificationCtx.notification;

  if (activeNotification) {
    const { title, message, status } = activeNotification;
    displayNotification = (
      <Notification title={title} message={message} status={status} />
    );
  }

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {displayNotification}
    </Fragment>
  );
}
