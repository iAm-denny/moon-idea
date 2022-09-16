/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';
import { ReactSortable } from 'react-sortablejs';
import Text from '../../../../../components/Typography/Text';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5]
    }`,
    padding: 3,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: 'pointer',
  },

}));

// eslint-disable-next-line react/prop-types
function LeftSideBar({ currentItems, setCurrentItems }) {
  const { classes } = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setData(currentItems);
  }, [currentItems]);

  const items = data && data.map((item) => (
    <div key={item.id} className={classes.item}>
      <Text size="xs">{item.name}</Text>
    </div>
  ));

  return (
    <ScrollArea style={{ height: '100%' }} scrollbarSize={6} scrollHideDelay={0}>
      <ReactSortable
        sort
        animation={0}
        delayOnTouchStart={false}
        delay={0}
        // eslint-disable-next-line react/prop-types
        list={currentItems.map((x) => ({ ...x, chosen: true }))}
        setList={setCurrentItems}
        dragoverBubble={false}
      >
        {items}
      </ReactSortable>
    </ScrollArea>
  );
}

export default LeftSideBar;
