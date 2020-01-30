import React, {useEffect, useState} from 'react';
import {Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from "@vkontakte/vkui/dist/es6/components/Button/Button";
import img1 from '../../img/img_room/19.jpg';
import img2 from '../../img/img_room/20.jpg';
import img3 from '../../img/img_room/21.jpg';
import img4 from '../../img/img_room/22.jpg';
import img5 from '../../img/img_room/23.jpg';
import img6 from '../../img/img_room/24.jpg';
import img7 from '../../img/img_room/25.jpg';
import img8 from '../../img/img_room/26.jpg';
import img9 from '../../img/img_room/27.jpg';
import img10 from '../../img/img_room/28.jpg';
import img1cat from '../../img/img_room_cat/19.jpg';
import img2cat from '../../img/img_room_cat/20.jpg';
import img3cat from '../../img/img_room_cat/21.jpg';
import img4cat from '../../img/img_room_cat/22.jpg';
import img5cat from '../../img/img_room_cat/23.jpg';
import img6cat from '../../img/img_room_cat/24.jpg';
import img7cat from '../../img/img_room_cat/25.jpg';
import img8cat from '../../img/img_room_cat/26.jpg';
import img9cat from '../../img/img_room_cat/27.jpg';
import img10cat from '../../img/img_room_cat/28.jpg';
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";

const Rooms03 = (props) => {
	const {getRandom, setActivePanel, setResult, setСaughtСats} = props;
	const rooms = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
	const roomsCat = [img1cat, img2cat, img3cat, img4cat, img5cat, img6cat, img7cat, img8cat, img9cat, img10cat]
	const [doorMumber, setDoorMumber]  = useState(getRandom(0,rooms.length))
	const [showAlert, setShowAlert] = useState(false);
	const [cats, setCats] = useState(false);
	const [message, setMessage] = useState("");
	const [catRan, setCatRan] = useState(false);
	let currentRooms = rooms[doorMumber]
	let currentRoomsCats = roomsCat[doorMumber]

	useEffect(() => {
		if (getRandom(0,2) === 0) {
			setCats(false)
		} else {
			setCats(true)
		}
	}, []);


	const getResultCloseRooms = () => {
		if (!catRan) {
			let random = getRandom(0,2)
			if (random === 1) {
				setActivePanel('ClosedDoor')
			} else {
				if (cats) {
					setActivePanel('ClosedDoor')
				} else {
					setCatRan(true)
					setCats(true)
					setMessage("Пока ты шел к выходу, в комнату забежала кошечка!")
					setShowAlert(true)
				}
			}
		} else {
			setActivePanel('ClosedDoor')
		}
	}

	const catchСat = () => {
		if (cats) {
			setCatRan(true)
			let random = getRandom(0,2)
			setCats(false)
			if (random === 0) {
				setСaughtСats()
				setMessage("Кошка поймана!")
				setShowAlert(true)
			} else {
				setMessage("К сожалению, тебе не удалось поймать кошку!")
				setShowAlert(true)
			}
		} else {
			setMessage("После длительных поисков найти кошку не удалось")
			setShowAlert(true)
		}
	}

	const alert = (<Alert
			actions={[{
				title: 'Хорошо',
				autoclose: true,
				style: 'cancel'
			}]}
			onClose={() => {setShowAlert(false)}}
			className='alert'
		>
			<h2>{message}</h2>
		</Alert>
	)

	return 	<Panel id={props.id}>
		<Group className="rooms">
			{showAlert ? alert : ""}
			{cats ? <img src={currentRoomsCats} alt='rooms' className="img-rooms"/> : <img src={currentRooms} alt='rooms' className="img-rooms"/>}
			<Button className="button-close-rooms" onClick={
				() => {getResultCloseRooms()}
			} >Закрыть дверь комнаты</Button>
			<Button className="button-catch-cat" level="commerce" onClick={catchСat}>Поймать кошку</Button>
			<Button className="button-save-out" level="destructive" onClick={setResult}>Сохранить и выйти</Button>
		</Group>
	</Panel>
};


export default Rooms03;
