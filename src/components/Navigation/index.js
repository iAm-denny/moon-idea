import React from 'react';
import { useSelector } from 'react-redux';
import ClientNavigation from './ClientNavigation';
import DefaultNavigation from './Navigation';

const index = (props) => {
  const userState = useSelector((state) => state.user);

  const { children } = props;

  // when logged in
  if (userState?.user?.accessToken) {
    return (
      <ClientNavigation>
        {children}
      </ClientNavigation>
    );
  }

  return (
    <DefaultNavigation>
      {children}
    </DefaultNavigation>
  );
};

export default index;
