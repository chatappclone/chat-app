import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RoomPreviews from '../../src/components/RoomPreviews';

const roomMap = [];
const rooms = [];
const receiveHandleCurrentRoom = jest.fn();
const receiveNewChatView = jest.fn();

describe('Room Previews', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <RoomPreviews
          roomMap={roomMap}
          rooms={rooms}
          receiveHandleCurrentRoom={receiveHandleCurrentRoom}
          receiveNewChatView={receiveNewChatView}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('click open chat view', () => {
    const wrapper = shallow(
      <RoomPreviews
        roomMap={roomMap}
        rooms={rooms}
        receiveHandleCurrentRoom={receiveHandleCurrentRoom}
        receiveNewChatView={receiveNewChatView}
      />,
    );
    wrapper.find('.zmdi-border-color').simulate('click');
    expect(receiveNewChatView).toHaveBeenCalled();
  });
});
