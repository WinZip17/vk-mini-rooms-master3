import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const Home = ({ id, go, fetchedUser}) => (
	<Panel id={id}>
		<Group>
			<Div>
				<h1>
					Здравствуй, {fetchedUser ? fetchedUser.first_name : ""}!
				</h1>
				<p>
					Поймай как можно больше кошек, забежавших в комнаты с натяжными потолками, чтобы получить отличный приз!
				</p>
				<p>
					Правила игры очень просты: видишь кошку - жмёшь кнопку "Поймать кошку". Если кошки в комнате нет, закрываешь дверь. И переходишь в другую комнату. Где так же надо поймать кошку. Чем больше кошек ты наловишь - тем круче будут призы
				</p>
				<Button size="xl" onClick={go} data-to="Rooms01">
					Начать!
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
