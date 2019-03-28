import React from 'react';
import renderer from 'react-test-renderer';
import ChatSpace from '../pages/ChatSpace'


test('Test web rtc', () => {
    let component = renderer.create(
        <ChatSpace chatRoomId={"default"}/>
    )



})
