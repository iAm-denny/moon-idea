import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ClientNavigation from './ClientNavigation';
import DefaultNavigation from './Navigation';

const index = (props) => {
  const userState = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { children } = props;

  // when view project detail
  if (isLoggedIn && 2 + 1 === 4) {
    return (
      <div>
        {children}
      </div>
    );
  }

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
