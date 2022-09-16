/* eslint-disable max-len */
import PropTypes, { object } from 'prop-types';
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
  Tabs,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { shapeIcons } from './Shapes/UI/shapeIcons';
import LeftSideBar from './Shapes/UI/LeftSideBar';

function SideBars(props) {
  const {
    children, setselectedShapeItem, selectedShapeItem, currentItems, setCurrentItems,
  } = props;
  const theme = useMantineTheme();
  const isSmallSize = useMediaQuery('(max-width: 768px)');

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={!isSmallSize && (
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 200 }}>
          <LeftSideBar currentItems={currentItems} setCurrentItems={setCurrentItems} />
        </Navbar>

      )}
      aside={!isSmallSize && (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 200 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      )}
      header={!isSmallSize && (
        <Header height={40} p="md" hiddenBreakpoint="sm">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Tabs value={selectedShapeItem} onTabChange={(value) => setselectedShapeItem(value)}>
              <Tabs.List>
                {
                shapeIcons.map((item) => (
                  <Tooltip label={item.name} position="bottom" withinPortal key={item.name}>
                    <Tabs.Tab value={item.component} icon={item.icon} />
                  </Tooltip>
                ))
              }
              </Tabs.List>
            </Tabs>
          </div>
        </Header>
      )}
    >
      {children}
    </AppShell>
  );
}

SideBars.propTypes = {
  children: PropTypes.element.isRequired,
  setselectedShapeItem: PropTypes.func.isRequired,
  selectedShapeItem: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentItems: PropTypes.arrayOf(object).isRequired,
  setCurrentItems: PropTypes.func.isRequired
};

export default SideBars;
