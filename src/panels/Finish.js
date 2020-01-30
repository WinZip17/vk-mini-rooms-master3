import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import img1 from '../img/prizes/Слой 77.jpg';
import img2 from '../img/prizes/Слой 78.jpg';
import img3 from '../img/prizes/Слой 79.jpg';
import img4 from '../img/prizes/Слой 80.jpg';
import img5 from '../img/prizes/Слой 81.jpg';
import img6 from '../img/prizes/Слой 82.jpg';
import img7 from '../img/prizes/Слой 83.jpg';
import img8 from '../img/prizes/Слой 84.jpg';
import img9 from '../img/prizes/Слой 85.jpg';
import img10 from '../img/prizes/Слой 86.jpg';
import img11 from '../img/prizes/Слой 87.jpg';
import img12 from '../img/prizes/Слой 88.jpg';
import img13 from '../img/prizes/Слой 89.jpg';
import img14 from '../img/prizes/Слой 90.jpg';
import img15 from '../img/prizes/Слой 91.jpg';
import img16 from '../img/prizes/Слой 92.jpg';
import img17 from '../img/prizes/Слой 94.jpg';

const Finish = (props) => {
	const { id, group_id, prizes } = props

	const prizesArr = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17]

	return <Panel id={id}>
		<Group>
			<Div>
				{prizes === 16 && <h2>Ты поймал максимальное количество кошек!</h2>}
				<img src={prizesArr[prizes]} alt='rooms' className="img-rooms"/>
				<a target="_blank" href={`https://vk.com/public${group_id.substr(1)}`}>Перейти в нашу группу</a>
			</Div>
		</Group>
	</Panel>

}



export default Finish;
