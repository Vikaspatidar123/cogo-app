import React from 'react';
import Loader from './Loader';
import { Container, Card } from './styles';

const Loading = ({ count = 3 }) => {
	const list = [...Array(count)].map((v, i) => i + 1);

	return (
		<div>
			{list.map((item) => (
				<Container key={item}>
					<Card>
						<Loader />
					</Card>
				</Container>
			))}
		</div>
	);
};

export default Loading;
