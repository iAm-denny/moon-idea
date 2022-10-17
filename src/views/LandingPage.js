/* eslint-disable max-len */
import React from 'react';
import { Button, Container, MediaQuery } from '@mantine/core';
import { ReactComponent as LighBulbIcon } from '../assets/icons/light_bulb.svg';
import Text from '../components/Typography/Text';
import Title from '../components/Typography/Title';
import useResponsive from '../utils/responsive';

function LandingPage() {
  const { isSmall } = useResponsive();
  return (
    <Container fluid style={{ marginTop: 100 }}>
      <Container
        fluid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title align="center" order={1}>
          Enhance your{' '}
          <Title
            order={1}
            component="span"
            color="primaryColor"
            style={{ position: 'relative' }}
          >
            Ideas
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <LighBulbIcon
                style={{ position: 'absolute', top: -80, left: 45 }}
              />
            </MediaQuery>
          </Title>{' '}
          to the Moon
        </Title>

        <Text
          size="xl"
          style={{ margin: '20px 0px', width: isSmall ? '100%' : '60%' }}
          align="center"
        >
          Moon connects everyone in the design process so teams can deliver
          better products, faster.
        </Text>

        <Button radius="md" size={isSmall ? 'md' : 'lg'}>
          Get Started
        </Button>
      </Container>
    </Container>
  );
}

export default LandingPage;
