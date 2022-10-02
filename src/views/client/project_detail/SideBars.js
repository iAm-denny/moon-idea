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
  Loader,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { shapeIcons } from './Shapes/UI/shapeIcons';
import LeftSideBar from './Shapes/UI/LeftSideBar';
import useResponsive from '../../../utils/responsive';
import RightSideBar from './Shapes/UI/RightSideBar';
import Text from '../../../components/Typography/Text';

function SideBars(props) {
  const {
    children, selectShapeType, changeSelectShapeTypehandle, currentItems, setCurrentItems,
  } = props;
  const theme = useMantineTheme();
  const { isSmall } = useResponsive();
  const { makeChangesLoader, shapesItem } = useSelector((state) => state.shape);
  const { fetchingShapesLoader } = useSelector((state) => state.shape);

  const lastItem = shapesItem && shapesItem.length > 0 ? shapesItem[shapesItem.length - 1] : '';
  if (fetchingShapesLoader) {
    return (
      <div style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Loader color="gray" />
        <Text size="md">Please wait a momemt :D</Text>
      </div>
    );
  }
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
        // eslint-disable-next-line react/jsx-props-no-multi-spaces
        aside={!isSmall && (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenbreakpoint="sm" width={{ sm: 200, lg: 200 }}>
            <RightSideBar />
          </Aside>
        </MediaQuery>
        )}
        header={!isSmall && (
        <Header height={40} p="md" hiddenbreakpoint="sm">
          <div style={{
            display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between',
          }}
          >
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
            {
              makeChangesLoader ? <Text size="sm" color="gray">Saving a file</Text> : lastItem ? (
                <Text size="sm" color="gray">
                  Saved a file:
                  {' '}
                  {lastItem && moment(lastItem.createdAt).format('DD--MMM-YYYY')}
                </Text>
              ) : null
            }
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
