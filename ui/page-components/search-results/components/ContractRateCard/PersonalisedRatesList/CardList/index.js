import Grid from '@cogoport/front/components/Grid';
import { useState } from 'react';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import PortsInfo from '../PortsInfo';
import {
	Container,
	Gradient,
	Wave,
	Footer,
	CustomText,
	Details,
	MainContainer,
	PortsContainer,
	StyledHr,
	ToggleIcon,
	Insidecontainer,
} from './styles';
import ContainerInfo from '../ContainerInfo';
import CostBreakdown from '../CostBreakdown';
import TouchPoints from '../TouchPoints';
import BookNow from '../BookNow';

const { Row, Col } = Grid;

const CardList = ({ data = {}, details }) => {
	const {
		origin_location = {},
		line_items = [],
		destination_location = {},
		trip_type = '',
		total_price = 0,
		touch_points = {},
		total_price_currency = '',
		service_type = '',
		contract_reference_id = '',
		transit_time = '',
	} = data || {};

	const [showTable, setshowTable] = useState(false);

	const styles = { borderRight: '1px solid #AAB9D6' };

	const perTruck = formatAmount({
		amount: total_price,
		currency: total_price_currency,
		options: {
			style: 'currency',
			currencyDisplay: 'code',
			maximumFractionDigits: 0,
		},
	});

	return (
		<Container>
			<Gradient>
				<Wave>Contract ID: {contract_reference_id}</Wave>
			</Gradient>

			<Row>
				<Col md={9}>
					<MainContainer>
						<Row>
							<Col md={9} style={styles}>
								<PortsContainer>
									<PortsInfo
										originPort={origin_location}
										destinationPort={destination_location}
										trip={trip_type}
										separator={
											<img
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/union-2.svg"
												alt="union-icon"
												className="ports-direction-svg"
											/>
										}
									/>
								</PortsContainer>
							</Col>

							<TouchPoints
								touch_points={touch_points}
								service_type={service_type}
								transit_time={transit_time}
							/>

							<Col md={12}>
								<StyledHr />

								<ContainerInfo data={data} source="list_item" />
							</Col>
						</Row>
					</MainContainer>
				</Col>

				<BookNow
					perTruck={perTruck}
					service_type={service_type}
					data={data}
					spot_search_id={details?.id}
				/>
			</Row>
			<div />

			<Insidecontainer className="accordion" aria-expanded={showTable}>
				<CostBreakdown
					line_items={line_items}
					total_price={total_price}
					total_price_currency={total_price_currency}
				/>
			</Insidecontainer>

			<Footer>
				<Details onClick={() => setshowTable(!showTable)}>
					View Details
					<ToggleIcon toggleDropdown={showTable} />
				</Details>

				<CustomText>
					Incidentals, Surcharges, any additional charges will apply as per
					contract terms
				</CustomText>
			</Footer>
		</Container>
	);
};

export default CardList;
