// import getStaticPath from '@cogo/static';
import { ToolTip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import Button from '../../common/Button';
import { shortFormatNumber } from '../../utils/getShortFormatNumber';

import {
	Container,
	IconContainer,
	HeaderContainer,
	Section,
	Title,
	Line,
	Row,
	Heading,
	DashedLine,
	BtnContainer,
	IconImage,
	TooltipContainer,
} from './styles';

import { useRouter } from '@/packages/next';

function SuccessModal({ tradeEngineResp, isMobile = false }) {
	const {
		lineItem = [],
		resultCurrency = 'INR',
		totalDutiesAndTaxes = 0,
		totalLandedCost = 0,
		freightCharges = 0,
		consignmentValue = 0,
		additionalChargesList = {},
	} = tradeEngineResp || {};

	const { query } = useRouter();
	const { incotermCharges: incotermArr = [] } = additionalChargesList || {};
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const redirectToTax = () => {
		const redirectUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/duties-taxes-calculator`;

		window.open(redirectUrl, '_self');
	};

	const calculateTotalCharge = (arr) => {
		const amount = arr.reduce((acc, curr) => +acc + +curr.value, 0);
		return amount;
	};

	const tooltipContent = () => (
		<TooltipContainer>
			<div className="heading">Breakdown of Total Landed Cost</div>
			<Row>
				<div>Freight Charges</div>
				<div>{shortFormatNumber(freightCharges, resultCurrency, true)}</div>
			</Row>
			<Row>
				<div>Consignment Value</div>
				<div>{shortFormatNumber(consignmentValue, resultCurrency, true)}</div>
			</Row>
			<Row>
				<div>Applicable Charges</div>
				<div>
					{shortFormatNumber(calculateTotalCharge(incotermArr), resultCurrency, true)}
				</div>
			</Row>
			<Row>
				<div>Total Duties and Taxes</div>
				<div>{shortFormatNumber(totalDutiesAndTaxes, resultCurrency, true)}</div>
			</Row>
		</TooltipContainer>
	);
	return (
		<Container>
			<IconContainer>
				<IconImage src={getStaticPath('/images/commons/success.gif')} alt="cogo" />
			</IconContainer>
			<HeaderContainer>
				<div className="title">Congratulations!</div>
				<div className="subTitle">
					Successfully calculated Duties and Taxes.
					<br />
					{' '}
					Below given are the results
				</div>
			</HeaderContainer>
			{(lineItem || []).map(({ landedCost = {}, hsNumber = '' }) => (
				<Section key={hsNumber}>
					<div className="sectionHeading">
						<Title>Duties & Taxes</Title>
						<Line />
					</div>
					{(landedCost?.[0]?.taxSet || []).map(
						({ groupName = '', taxSetResponse = [] }) => (
							<div key={groupName} className="charges">
								<Heading>{groupName}</Heading>
								{(taxSetResponse || []).map(({ name = '', value = 0 }) => (
									<Row key={name}>
										<div>{name}</div>
										<div>{shortFormatNumber(value, resultCurrency, true)}</div>
									</Row>
								))}
								<DashedLine />
								<Row className="total">
									<div>Total</div>
									<div>
										{shortFormatNumber(
											calculateTotalCharge(taxSetResponse),
											resultCurrency,
											true,
										)}
									</div>
								</Row>
							</div>
						),
					)}
				</Section>
			))}
			<Row className="finalTotal dutiesTotal">
				<div>Total Duties and Tax</div>
				<div>{shortFormatNumber(totalDutiesAndTaxes, resultCurrency, !isMobile)}</div>
			</Row>
			<DashedLine className="total" />
			<Row className="finalTotal">
				<div className="flex">
					<div>Total Landed Cost</div>
					<ToolTip
						theme="light-border"
						placement="top"
						content={tooltipContent()}
						interactive
					>
						<div className="iconContainer">
							<IcMInfo width={14} height={14} />
						</div>
					</ToolTip>
				</div>
				<div>{shortFormatNumber(totalLandedCost, resultCurrency, !isMobile)}</div>
			</Row>

			<BtnContainer>
				<Button size="md" onClick={redirectToTax}>
					Calculate More
				</Button>
			</BtnContainer>
		</Container>
	);
}

export default SuccessModal;
