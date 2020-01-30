import React from 'react';
import {Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from "@vkontakte/vkui/dist/es6/components/Button/Button";
import img1 from '../img/сlosed_door/01.jpg';
import img2 from '../img/сlosed_door/02.jpg';
import img3 from '../img/сlosed_door/03.jpg';

const ClosedDoor = (props) => {
    const {getRandom, setActivePanel, setResult} = props;
    const rooms = [img1, img2, img3]
    const doorNumber = getRandom(0,rooms.length)
    const roomsArr = ['Rooms01', 'Rooms02', 'Rooms03', 'Rooms04']

    return 	<Panel id={props.id}>
        <Group className="rooms">
            <div className="text-shell"><h4>Ты запер эту комнату, <br/> пора искать следующую</h4></div>
            <img src={rooms[doorNumber]} alt='rooms' className="img-rooms"/>
            <Button className="button-close-rooms" onClick={
                () => {setActivePanel(roomsArr[getRandom(0,3)])}
            } >Искать дальше</Button>
            <Button className="button-save-out" level="destructive" onClick={setResult}>Сохранить и выйти</Button>
        </Group>
    </Panel>

};



export default ClosedDoor;
