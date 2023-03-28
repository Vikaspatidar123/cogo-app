import { useSelector } from '@cogo/store';
import { ToolTip } from '@cogoport/front/components/admin';
import { IcACarriageInsurancePaidTo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Loading from '../loading';

import LocationDetails from './LocationDetails';
import {
	Container,
	Line,
	ServiceTypeText,
	ServiceWrap,
	StyledText,
	CommodityDetails,
	Commodity,
	CommodityDescription,
	DescriptionContainer,
	TradeTypeContainer,
	TradeTypeFlexContainer,
} from './styles';

function CargoInsuranceInfo({
	data = {},
	isMobile = false,
	loading = false,
}) {
	const { scope } = useSelector(({ general }) => general);

	const {
		commodity = '',
		cargo_insurance_commodity_description = '',
		trade_type = '',
		transit_mode = '',
	} = data || {};

	if (loading) {
		return <Loading isMobile={isMobile} scope={scope} />;
	}

	return (
		<Container>
			<ServiceWrap>
				<IcACarriageInsurancePaidTo height={30} width={30} />

				<ServiceTypeText>CARGO INSURANCE</ServiceTypeText>
			</ServiceWrap>

			<Line style={isMobile ? { marginBottom: '10px' } : {}} />

			<LocationDetails data={data} />

			<Line style={isMobile ? { marginTop: '10px' } : {}} />

			<CommodityDetails>
				<DescriptionContainer>
					<StyledText>Commodity</StyledText>

					<ToolTip
						theme="light"
						animation="shift-away"
						interactive
						content={commodity}
					>
						<Commodity>{commodity}</Commodity>
					</ToolTip>
				</DescriptionContainer>

				<DescriptionContainer>
					<StyledText>Description</StyledText>

					<ToolTip
						theme="light"
						animation="shift-away"
						interactive
						content={cargo_insurance_commodity_description}
					>
						<CommodityDescription>
							(
							{cargo_insurance_commodity_description}
							)
						</CommodityDescription>
					</ToolTip>
				</DescriptionContainer>
			</CommodityDetails>

			<Line style={isMobile ? { marginTop: '10px' } : {}} />

			<TradeTypeContainer>
				<TradeTypeFlexContainer>
					<StyledText>Trade Type</StyledText>

					<div>{startCase(trade_type) || '-'}</div>
				</TradeTypeFlexContainer>

				<TradeTypeFlexContainer>
					<StyledText>Transit Mode</StyledText>

					<div>{startCase(transit_mode) || '-'}</div>
				</TradeTypeFlexContainer>
			</TradeTypeContainer>
		</Container>
	);
}

export default CargoInsuranceInfo;
