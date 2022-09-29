import React from 'react';
import {
  Box, ColorInput, Container, ScrollArea, Tabs,
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Text from '../../../../../components/Typography/Text';
import { changeFillShape, changeStrokeShape, makeChangesShape } from '../../../../../redux/features/shapes/shapeSlice';

function RightSideBar() {
  const { selectShapeValue } = useSelector((state) => state.shape);
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <ScrollArea style={{ height: '100%' }} scrollbarSize={6} scrollHideDelay={0}>
      <Tabs>
        <Tabs.List grow>
          <Tabs.Tab value="design">
            <Text size="xs">Inspect</Text>
          </Tabs.Tab>
          <Tabs.Tab value="export">
            <Text size="xs">Export</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {
        selectShapeValue?.data?.fill && (
        <Container>
          <Box my={15}>
            <ColorInput
              label="Fill"
              value={selectShapeValue?.data?.fill}
              onChange={(value) => {
                dispatch(changeFillShape(value));
              }}
              onChangeEnd={(value) => {
                dispatch(makeChangesShape({ fill: value, project_id: params.id }));
              }}
            />
          </Box>
          <Box my={15}>
            <ColorInput
              label="Stroke"
              value={selectShapeValue?.data?.stroke}
                // onChange={(value) => dispatch(changeFillShape(value))}
              onChange={(value) => {
                dispatch(changeStrokeShape(value));
                dispatch(makeChangesShape({ stroke: value }));
              }}
            />
          </Box>
        </Container>
        )
      }
    </ScrollArea>
  );
}

export default RightSideBar;
