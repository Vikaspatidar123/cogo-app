import { useState } from 'react';
import { RadioGroup } from '@cogoport/front/components/admin';
import { Text } from '@cogoport/front/components';
import { Container, RadioWrapper } from './styles';
import InvoicingParties from './InvoicingParties';

const COMPONENTS_MAPPING = {
	invoice_to_self: {
		label: 'Invoice to Self',
		component: InvoicingParties,
	},
	invoice_to_trade_partner: {
		label: 'Invoice to Trade Parties',
		component: InvoicingParties,
	},
};

const RADIO_GROUP_OPTIONS = Object.entries(COMPONENTS_MAPPING).map(
	([key, value]) => {
		return { label: value.label, value: key };
	},
);

function AddInvoicingParty({
	organization = {},
	disabledParties = {},
	updateInvoicingParty = () => {},
}) {
	const [activeComponentKey, setActiveComponentKey] = useState(() => {
		return RADIO_GROUP_OPTIONS[0].value;
	});

	const componentProps = {
		invoice_to_self: {
			organization,
			disabledParties,
			updateInvoicingParty,
			bookingType: 'self',
		},
		invoice_to_trade_partner: {
			organization,
			disabledParties,
			updateInvoicingParty,
			bookingType: 'paying_party',
		},
	};

	const ActiveComponent = COMPONENTS_MAPPING[activeComponentKey].component;

	const activeComponentProps = componentProps[activeComponentKey];

	return (
		<Container>
			<Text
				as="div"
				color="#2c3e50"
				size={16}
				bold={500}
				textTransform="uppercase"
				marginBottom={16}
			>
				New Invoicing Party
			</Text>

			<RadioWrapper>
				<RadioGroup
					className="primary lg"
					options={RADIO_GROUP_OPTIONS}
					value={activeComponentKey}
					onChange={setActiveComponentKey}
				/>
			</RadioWrapper>

			<ActiveComponent key={activeComponentKey} {...activeComponentProps} />
		</Container>
	);
}

export default AddInvoicingParty;
