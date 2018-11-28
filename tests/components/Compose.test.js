import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Compose from '../../src/components/Compose';

const receiveSendMessage = jest.fn();

describe('Compose', () => {
  test('matches the snapshot', () => {
    const tree = renderer.create(<Compose receiveSendMessage={receiveSendMessage} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('form submitted', () => {
    const wrapper = shallow(<Compose receiveSendMessage={receiveSendMessage} />);
    wrapper.find('.conversation-compose').simulate('submit', { preventDefault: () => {} });
    expect(receiveSendMessage).toHaveBeenCalled();
  });
});
