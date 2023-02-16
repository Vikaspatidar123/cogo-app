import { shortFormatNumber } from '../../../../utils/getShortFormatNumber';

import {
	Container, Heading, Head, ScrollContent,
} from './styles';

function Charges({
	formData = {},
	isQuotaLeft = false,
	dtCurrency,
	quotaValue = 0,
	gstAmount = 0,
	amount = 0,
	totalAmount = 0,
}) {
	const { freightCharge = '', incotermCharges = [], currency = '' } = formData || {};

	return (
		<ScrollContent>
			<Container>
				<Head>
					<Heading>Charges</Heading>
					{freightCharge > 0 && (
						<div className="service">
							<div className="text">Freight Charge</div>
							<div className="price">
								{shortFormatNumber(freightCharge, currency, true)}
							</div>
						</div>
					)}
					{(incotermCharges || []).map(
						({ name, value }) => value > 0 && (
							<div className="service">
								<div className="text">{name}</div>
								<div className="price">{shortFormatNumber(value, currency, true)}</div>
							</div>
						),
					)}
				</Head>
			</Container>
			<Container>
				<Head>
					<Heading>Summary</Heading>
					{!isQuotaLeft && (
						<>
							<div className="service">
								<div className="text">Services</div>
								<div className="price">{shortFormatNumber(amount, dtCurrency, true)}</div>
							</div>
							<div className="service">
								<div className="text">Conviences Fee</div>
								<div className="price">
									{shortFormatNumber(gstAmount, dtCurrency, true)}
								</div>
							</div>
							<div className="service total">
								<div className="text">Total Amount</div>
								<div className="price">
									{shortFormatNumber(totalAmount, dtCurrency, true)}
								</div>
							</div>
						</>
					)}
					{isQuotaLeft && (
						<>
							<div className="service">
								<div className="text">Available Premium Services Quota</div>
								<div className="price">{quotaValue}</div>
							</div>
							<div className="border" />
							<div className="service">
								<div className="text">Quota deducted</div>
								<div className="price">- 1</div>
							</div>
							<div className="border" />

							<div className="service">
								<div className="total">Remaining Quota</div>
								<div className="price">{quotaValue - 1}</div>
							</div>
						</>
					)}
				</Head>
			</Container>
		</ScrollContent>
	);
}
export default Charges;
