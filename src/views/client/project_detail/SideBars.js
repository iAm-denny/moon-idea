/* eslint-disable max-len */
import PropTypes, { object } from 'prop-types';
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  MediaQuery,
  useMantineTheme,
  Tabs,
  Tooltip,
} from '@mantine/core';
import { shapeIcons } from './Shapes/UI/shapeIcons';
import LeftSideBar from './Shapes/UI/LeftSideBar';
import useResponsive from '../../../utils/responsive';
import RightSideBar from './Shapes/UI/RightSideBar';

function SideBars(props) {
  const {
    children, selectShapeType, changeSelectShapeTypehandle, currentItems, setCurrentItems,
  } = props;
  const theme = useMantineTheme();
  const { isSmall } = useResponsive();
  return (
    <div style={{
      overflow: 'hidden',
      height: '100vh',
    }}
    >
      <AppShell
        styles={{
          main: {
            background: theme.colors.gray[0],
            padding: 0,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={!isSmall && (
        <Navbar p="md" hiddenbreakpoint="sm" width={{ sm: 200, lg: 200 }}>
          <LeftSideBar currentItems={currentItems} setCurrentItems={setCurrentItems} />
        </Navbar>

        )}
        aside={!isSmall && (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenbreakpoint="sm" width={{ sm: 200, lg: 200 }}>
            <RightSideBar />
          </Aside>
        </MediaQuery>
        )}
        header={!isSmall && (
        <Header height={40} p="md" hiddenbreakpoint="sm">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Tabs value={selectShapeType} onTabChange={(value) => changeSelectShapeTypehandle(value)}>
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
    </div>
  );
}

SideBars.propTypes = {
  children: PropTypes.element.isRequired,
  selectShapeType: PropTypes.string.isRequired,
  changeSelectShapeTypehandle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentItems: PropTypes.arrayOf(object).isRequired,
  setCurrentItems: PropTypes.func.isRequired,
};

export default SideBars;
