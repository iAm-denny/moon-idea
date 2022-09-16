import {
  Box,
  ColorInput, Container, ScrollArea, Tabs,
} from '@mantine/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Text from '../../../../../components/Typography/Text';
import { changeFillShape, changeStrokeShape } from '../../../../../redux/features/shapes/shapeSlice';

function RightSideBar() {
  const { selectShapeValue } = useSelector((state) => state.shape);
  const dispatch = useDispatch();
  return (
    <ScrollArea style={{ height: '100%' }} scrollbarSize={6} scrollHideDelay={0}>
      <Tabs>
        <Tabs.List grow>
          <Tabs.Tab value="design">
            <Text size="xs">Design</Text>
          </Tabs.Tab>
          <Tabs.Tab value="export">
            <Text size="xs">Export</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Container>
        <Box my={15}>
          <ColorInput
            label="Fill"
            value={selectShapeValue?.fill}
            onChange={(value) => dispatch(changeFillShape(value))}
          />
        </Box>
        <Box my={15}>
          <ColorInput
            label="Stroke"
            value={selectShapeValue?.stroke}
            onChange={(value) => dispatch(changeStrokeShape(value))}
          />
        </Box>
      </Container>
    </ScrollArea>
  );
}

export default RightSideBar;
