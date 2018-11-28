import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RoomPreview from '../../src/components/RoomPreview';

const room = {};
const roomMap = [];
const receiveHandleCurrentRoom = jest.fn();

describe('Room Preview', () => {
  test('matches the snapshot', () => {
    const tree = renderer
      .create(
        <RoomPreview
          room={room}
          roomMap={roomMap}
          receiveHandleCurrentRoom={receiveHandleCurrentRoom}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('click calls function', () => {
    const wrapper = shallow(
      <RoomPreview
        room={room}
        roomMap={roomMap}
        receiveHandleCurrentRoom={receiveHandleCurrentRoom}
      />,
    );
    wrapper.find('.room-preview').simulate('click');
    expect(receiveHandleCurrentRoom).toHaveBeenCalled();
  });
});
