import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Rooms01 from './panels/rooms/Rooms01';
import Rooms02 from "./panels/rooms/Rooms02";
import Rooms03 from "./panels/rooms/Rooms03";
import Rooms04 from "./panels/rooms/Rooms04";
import ClosedDoor from "./panels/сlosed_door";
import Finish from "./panels/Finish";
import './css/Rooms.css';
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";
import {group_id, token, user_id} from "./constant";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner />);
	const [caughtСats, setСaughtСats] = useState(0);
	const [prizes, setPrizes] = useState(0);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
			if (type === 'VKWebAppCallAPIMethodResult') {
				setPopout(null)
				setActivePanel('Finish')
			}
			if (type !== 'VKWebAppCallAPIMethodResult' && type !== 'VKWebAppUpdateConfig'  && type !== 'VKWebAppGetUserInfoResult') {
				console.log(type, data)
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const getRandom = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	const alertResult = (message) => {
		setPopout(<Alert
					actions={[{
						title: 'Хорошо',
						autoclose: true,
						style: 'cancel'
					}]}
					onClose={() => {setPopout(null)}}
				>
					<h2>{message}</h2>
				</Alert>
		);
	}

	const checkPrizes = (cats) => {
		if (cats > 50) {
			if (cats > 800) {
				setPrizes(16)
			} else if (cats < 800)
				setPrizes(Math.floor(cats / 50))
		} else if (cats < 50){
			setPrizes(0)
		}
	}

	const setResult = () => {
		setPopout(<ScreenSpinner />)
		let wellDate = new Date();
		let sendInfo = `Пользователь: https://vk.com/id${fetchedUser.id}, имя: ${fetchedUser.first_name}. Закончил ловить кошек:  ${wellDate.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric'})}. Поймал: ${caughtСats} кошек. Ему отобразился приз №${prizes + 1}`
		for (let i = 0; i < user_id.length; i++) {
			let random_id = Math.floor(1000000000 + Math.random() * (9000000000 + 1 - 1000000000));
			connect.send("VKWebAppCallAPIMethod", {
				"method": "messages.send",
				"request_id": "sendOrder",
				"params": {
					"user_id": user_id[i],
					"v": "5.102",
					"random_id": random_id,
					"peer_id": group_id,
					"message": sendInfo,
					"access_token": token
				}
			});
		}
	}



	const counterCats = () => {
		checkPrizes(caughtСats+ 1)
		setСaughtСats(caughtСats + 1)
		if (caughtСats+1 > 810) {
			setResult()
		}
	}

	const nextPanel = (panel) => {
		setActivePanel(panel)
	}

	return (
		<View activePanel={activePanel} popout={popout} header={false}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Rooms01 id='Rooms01' getRandom={getRandom} setActivePanel={nextPanel} alertResult={alertResult}
					 caughtСats={caughtСats} setСaughtСats={counterCats} setResult={setResult} setPopout={setPopout}/>
			<Rooms02 id='Rooms02' getRandom={getRandom} setActivePanel={nextPanel} alertResult={alertResult}
					 caughtСats={caughtСats} setСaughtСats={counterCats} setResult={setResult} setPopout={setPopout}/>
			<Rooms03 id='Rooms03' getRandom={getRandom} setActivePanel={nextPanel} alertResult={alertResult}
					 caughtСats={caughtСats} setСaughtСats={counterCats} setResult={setResult} setPopout={setPopout}/>
			<Rooms04 id='Rooms04' getRandom={getRandom} setActivePanel={nextPanel} alertResult={alertResult}
					 caughtСats={caughtСats} setСaughtСats={counterCats} setResult={setResult} setPopout={setPopout}/>
			<ClosedDoor id='ClosedDoor' getRandom={getRandom} setActivePanel={nextPanel} go={go} setResult={setResult}  />
			<Finish id='Finish' getRandom={getRandom} caughtСats={caughtСats} prizes={prizes} group_id={group_id}/>
		</View>
	);
}

export default App;

