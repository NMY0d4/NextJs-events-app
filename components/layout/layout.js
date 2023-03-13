import React, { Fragment } from 'react';
import MainHeader from './main-header';

export default function Layout({ children }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
}
