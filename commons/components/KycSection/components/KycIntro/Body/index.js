import { useSelector } from '@cogoport/front/store';
import {
	BottomText,
	Container,
	Content,
	Heading,
	SubText,
	TextContainer,
} from './styles';
import SearchRate from '../../../icons/search-rates-icon.svg';
import TrackContainer from '../../../icons/track-container.svg';
import ShippingSchedules from '../../../icons/shipping-schedules.svg';
import SendQuotation from '../../../icons/send-quotation.svg';
import RateTrends from '../../../icons/rate-trends.svg';

function Body() {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const BENEFITS_MAPPING = [
		{
			key: 'search_freight_rates',
			icon: (
				<SearchRate
					style={{
						width: isMobile ? 100 : 250,
						height: isMobile ? 100 : 250,
						marginBottom: isMobile ? 0 : 24,
					}}
				/>
			),
			bottomText: 'Search Freight Rates',
			subText: 'Search rates across FCL, LCL, Air and Haulage in one place.',
		},
		{
			key: 'track_containers',
			icon: (
				<TrackContainer
					style={{
						width: isMobile ? 100 : 250,
						height: isMobile ? 100 : 250,
						marginBottom: isMobile ? 0 : 24,
					}}
				/>
			),
			bottomText: 'Track your Containers',
			subText: 'Easily track containers across all major shipping lines.',
		},
		{
			key: 'shipping_schedules',
			icon: (
				<ShippingSchedules
					style={{
						width: isMobile ? 100 : 250,
						height: isMobile ? 100 : 250,
						marginBottom: isMobile ? 0 : 24,
					}}
				/>
			),
			bottomText: 'See Shipping Schedules',
			subText:
				'Plan an upcoming shipment using comprehensive shipping schedules.',
		},
		{
			key: 'send_quotation',
			icon: (
				<SendQuotation
					style={{
						width: isMobile ? 100 : 250,
						height: isMobile ? 100 : 250,
						marginBottom: isMobile ? 0 : 24,
					}}
				/>
			),
			bottomText: 'Send quotation to Customers',
			subText:
				'Send quotation to your customers with professional looking templates.',
		},
		{
			key: 'freight_rate_trends',
			icon: (
				<RateTrends
					style={{
						width: isMobile ? 100 : 250,
						height: isMobile ? 100 : 250,
						marginBottom: isMobile ? 0 : 24,
					}}
				/>
			),
			bottomText: 'View Freight Rate Trends',
			subText:
				'Get an idea of how much it costs to ship cargo on your choosen port pair.',
		},
	];

	return (
		<div>
			<Heading>Benefits of completing KYC</Heading>

			<Content>
				{BENEFITS_MAPPING.map((benefit) => (
					<Container>
						{benefit.icon}

						<TextContainer>
							<BottomText>{benefit.bottomText}</BottomText>

							<SubText>{benefit.subText}</SubText>
						</TextContainer>
					</Container>
				))}
			</Content>
		</div>
	);
}

export default Body;
