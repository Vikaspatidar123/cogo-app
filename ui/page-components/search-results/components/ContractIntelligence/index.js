import React from 'react';
import { Card, Title, Item, Dot, Label } from './styles';
import { Intelligence } from '../../constants';

const ContractIntelligence = () => {
	return (
		<Card>
			<Title>Lock price feature</Title>
			{Intelligence.map(({ label, color }) => {
				return (
					<Item>
						<Dot bg={color} />
						<Label>{label}</Label>
					</Item>
				);
			})}
		</Card>
	);
};

export default ContractIntelligence;
