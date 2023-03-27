import { ToolTip } from '@cogoport/front/components/admin';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { Rate, TooltipContainer, InfoIcon, Flex } from './styles';

const tooltipContent = () => {
	return (
		<TooltipContainer>
			<div>Inclusive of Taxes</div>
		</TooltipContainer>
	);
};

const PremiumRate = (props) => {
	const { rateData = {} } = props;

	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
	} = rateData || {};

	return (
		<>
			<div>
				<Rate>
					<Flex>
						Premium:
						<ToolTip theme="light" placement="top" content={tooltipContent()}>
							<sup>
								<InfoIcon />
							</sup>
						</ToolTip>
					</Flex>

					<div>
						{formatAmount({
							amount: netPremium,
							currency: GLOBAL_CONSTANTS.currency_code.INR,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 2,
							},
						})}
					</div>
				</Rate>

				<Rate>
					<div>Platform Charges:</div>
					<div>
						{formatAmount({
							amount: platformCharges,
							currency: GLOBAL_CONSTANTS.currency_code.INR,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 2,
							},
						})}
					</div>
				</Rate>

				<Rate className="final">
					<div>Convenience Fee:</div>
					<div>
						{formatAmount({
							amount: convenienceFee,
							currency: GLOBAL_CONSTANTS.currency_code.INR,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 2,
							},
						})}
					</div>
				</Rate>

				<Rate>
					<div>Amount Payable:</div>
					<div>
						{formatAmount({
							amount: totalApplicableCharges,
							currency: GLOBAL_CONSTANTS.currency_code.INR,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 2,
							},
						})}
					</div>
				</Rate>
			</div>
		</>
	);
};
export default PremiumRate;
