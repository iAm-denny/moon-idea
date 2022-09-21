import React, { useState } from 'react';
import ClientNavigation from './ClientNavigation';
import DefaultNavigation from './Navigation';

const index = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { children } = props;

  if (isLoggedIn && 2 + 1 === 3) {
    return (
      <div>
        {children}
      </div>
    );
  }

  if (isLoggedIn) {
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
