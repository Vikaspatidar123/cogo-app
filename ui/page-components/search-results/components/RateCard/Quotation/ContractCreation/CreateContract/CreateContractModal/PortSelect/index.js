import { startCase, upperCase } from '@cogoport/front/utils';
import React from 'react';
import {
	PortArrow,
	PortName,
	TopSection,
	Tag,
	Card,
	CardRow,
	BottomSection,
} from './styles';

const PortSelect = ({ portDetail = {} }) => {
	const {
		origin_port = {},
		destination_port = {},
		container_type,
		container_size,
		commodity,
		origin_airport,
		destination_airport,
		volume,
		weight,
		inco_term,
		trade_type,
	} = portDetail || {};

	return (
		<CardRow>
			<Card>
				<TopSection>
					<PortName>
						{origin_port?.display_name || origin_airport?.display_name || '-'}
					</PortName>
					<PortArrow />
					<PortName>
						{destination_port?.display_name ||
							destination_airport?.display_name ||
							'-'}
					</PortName>
				</TopSection>
				<BottomSection>
					{commodity && <Tag>{startCase(commodity)}</Tag>}
					{container_size && (
						<Tag>
							{container_size} {container_size.includes('HC') ? ' ' : 'FT'}
						</Tag>
					)}
					{container_type && <Tag>{startCase(container_type)}</Tag>}
					{volume && <Tag>VOL: {volume}CBM</Tag>}
					{weight && <Tag>WT: {weight}KGS</Tag>}
					{inco_term && <Tag>{upperCase(inco_term)}</Tag>}
					{trade_type && <Tag>{startCase(trade_type)}</Tag>}
				</BottomSection>
			</Card>
		</CardRow>
	);
};

export default PortSelect;
