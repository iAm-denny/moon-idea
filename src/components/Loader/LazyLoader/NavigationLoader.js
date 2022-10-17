import React, { useState } from 'react';
import { Container, Header, Navbar, Skeleton, Box } from '@mantine/core';

function NavigationLoader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isLargerScreen = window.innerWidth >= 768;

  if (isLoggedIn) {
    if (isLargerScreen) {
      return (
        <Navbar width={{ base: 80 }} p="md" hiddenbreakpoint="sm">
          <Skeleton height={50} radius="sm" width={35} ml={10} />
          <Box mt={25} alignitems="center">
            <Skeleton height={25} radius="lg" width={25} m={15} />
            <Skeleton height={25} radius="lg" width={25} m={15} />
          </Box>
        </Navbar>
      );
    }
    return (
      <Header height={70} p="md">
        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Skeleton height={30} radius="sm" width="30%" />
          <Skeleton height={30} radius="sm" width="30%" />
        </Container>
      </Header>
    );
  }
  return (
    <Header height={60} p="xs">
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Skeleton height={30} radius="sm" width="30%" />
        <Skeleton height={30} radius="sm" width="30%" />
      </Container>
    </Header>
  );
}

export default NavigationLoader;
