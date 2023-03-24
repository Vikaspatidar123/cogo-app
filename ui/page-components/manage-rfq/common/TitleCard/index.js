import { IcMPortArrow } from '@cogoport/icons-react';

import getInfo from '../../helpers/getInfo';
import AdditionalServices from '../AdditionalServices';

import LoadingCard from './LoadingCard';
import LocationData from './LocationData';
import RenderTags from './RenderTags';
import {
	Container,
	Index,
	PortContainer,
	IndexContainer,
	Header,
	ExtraServices,
} from './styles';

function Title({
	activePortPair,
	detail,
	portPairloading,
	searchParams = {},
}) {
	const { search_type } = searchParams || '';
	const containerSearchParam =		(searchParams || {})[`${search_type}_services_attributes`] || [];
	const tagData = getInfo(containerSearchParam[0] || {});

	return portPairloading ? (
		<LoadingCard />
	) : (
		<Container>
			<Header>
				<PortContainer>
					<IndexContainer>
						<Index>{activePortPair + 1}</Index>
					</IndexContainer>
					<LocationData
						locationData={detail?.origin_port || detail?.origin_airport}
					/>
					<IcMPortArrow className="anchor-icon" />
					<LocationData
						locationData={
							detail?.destination_port || detail?.destination_airport
						}
					/>
				</PortContainer>
				<RenderTags tagData={tagData} />
			</Header>
			<ExtraServices>
				<AdditionalServices
					serviceDetails={detail?.service_details}
					type="titlecard"
				/>
			</ExtraServices>
		</Container>
	);
}

export default Title;
