import React from 'react';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { IcMLocation } from '@cogoport/icons-react';
import {
	Container,
	Heading,
	Communicate,
	ViewResult,
	Deviation,
} from './styles';

const List = ({ rate, onClickResultRow, creatingAlternate }) => {
	return (
		<Container>
			<div style={{ width: '45%' }}>
				<Deviation className="icon-deviation">
					<IcMLocation
						style={{
							width: '30px',
							height: '30px',
							margin: '0 auto',
							display: 'block',
							position: 'absolute',
							top: '10px',
							left: '6px',
						}}
					/>

					<IcMLocation
						style={{
							width: '30px',
							height: '30px',
							margin: '0 auto',
							display: 'block',
							position: 'absolute',
							top: '10px',
							left: '18px',
						}}
					/>
				</Deviation>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Heading>
					{(rate?.origin_port || rate?.origin_airport)?.name} to New{' '}
					{(rate?.destination_port || rate?.destination_airport)?.name}
				</Heading>

				<Communicate>
					Rates starting from:
					<strong style={{ marginLeft: '4px' }}>
						{formatAmount({
							amount: rate.freight_price,
							currency: rate.freight_price_currency,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 0,
							},
						})}
					</strong>
				</Communicate>

				<ViewResult
					onClick={
						!creatingAlternate
							? () =>
									onClickResultRow({
										origin_port_id: rate?.origin_port?.id,
										destination_port_id: rate?.destination_port?.id,
										origin_airport_id: rate?.origin_airport_id,
										destination_airport_id: rate?.destination_airport_id,
									})
							: null
					}
					className={creatingAlternate ? 'disable' : ''}
				>
					{creatingAlternate ? 'Getting results' : 'See results'}
				</ViewResult>
			</div>
		</Container>
	);
};

export default List;
