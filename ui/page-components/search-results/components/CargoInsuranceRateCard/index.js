import { Flex } from '@cogoport/front/components';
import { useState } from 'react';
import { isEmpty, startCase } from '@cogoport/utils';
import {
	AnimatedContainer,
	Card,
	Circle,
	CogoAssured,
	Container,
	Line,
	LineVrt,
	Location,
	RouteContainer,
} from './styles';
import Quotation from '../RateCard/Quotation';
import QuotationDetails from '../RateCard/QuotationDetails';

const CargoInsuranceRateCard = (props) => {
	const [open, setOpen] = useState(false);
	const [viewSchedules, setViewSchedules] = useState(false);

	const {
		data = {},
		setState = () => {},
		state,
		details = {},
		refetch = () => {},
		enquiry_page = false,
		results_type = '',
		searchData = {},
		id,
	} = props;

	const {
		origin_country = '',
		destination_country = '',
		risk_coverage = '',
	} = details || {};

	return (
		<Container id={id}>
			<CogoAssured>{startCase(risk_coverage)}</CogoAssured>

			<Card>
				<Flex justifyContent="center" alignItems="center" flex={1}>
					<RouteContainer>
						<Flex display="block" style={{ width: '100%' }}>
							<Flex style={{ width: '100%' }}>
								<Circle
									className={!isEmpty(origin_country) ? 'inactive' : null}
								/>

								<Line
									className={!isEmpty(origin_country) ? 'inactive' : null}
									style={{ width: '100%' }}
								/>
							</Flex>
						</Flex>

						<Flex display="column" alignItems="center">
							<Flex>
								<Line
									className={!isEmpty(origin_country) ? 'inactive' : null}
									style={{ width: '30px' }}
								/>

								<Circle className="main" />

								<Line
									className={!isEmpty(origin_country) ? 'main' : null}
									style={{ width: '30px' }}
								/>
							</Flex>

							<Location className="main">
								{origin_country?.display_name || origin_country?.name || '-'}
							</Location>
						</Flex>

						<Flex direction="column" alignItems="center">
							<Flex>
								<Line
									className={!isEmpty(origin_country) ? 'main' : null}
									style={{ width: '30px' }}
								/>
								<Circle className="main" />

								<Line
									className={!isEmpty(origin_country) ? 'inactive' : null}
									style={{ width: '30px' }}
								/>
							</Flex>

							<Location className="main">
								{destination_country?.display_name ||
									destination_country?.name ||
									'-'}
							</Location>
						</Flex>

						<Flex display="block" style={{ width: '100%' }}>
							<Flex style={{ width: '100%' }}>
								<Line
									className={!isEmpty(origin_country) ? 'inactive' : null}
									style={{ width: '100%' }}
								/>

								<Circle
									className={!isEmpty(origin_country) ? 'inactive' : null}
								/>
							</Flex>
						</Flex>
					</RouteContainer>
				</Flex>

				<LineVrt />

				<Quotation
					data={data}
					state={state}
					setState={setState}
					setOpen={setOpen}
					open={open}
					refetch={refetch}
					enquiry_page={enquiry_page}
					details={details}
					results_type={results_type}
					spot_search_id={details?.id}
					id={id}
					viewSchedules={viewSchedules}
					setViewSchedules={setViewSchedules}
					isConfirmed={false}
				/>
			</Card>

			{open && (
				<AnimatedContainer type={open ? 'enter' : 'exit'}>
					<QuotationDetails
						searchData={searchData}
						details={details}
						data={data}
						id={id}
						isConfirmed={false}
					/>
				</AnimatedContainer>
			)}
		</Container>
	);
};

export default CargoInsuranceRateCard;
