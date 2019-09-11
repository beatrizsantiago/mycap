import React from 'react';

import { Bar, TitleCenter, Title } from './styles/HeaderStyled'

export default Header = props => {
	return (
		<Bar>
			<TitleCenter>
				<Title style={{color: '#000'}}>{props.title}</Title>
			</TitleCenter>
		</Bar>
	);
}