import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { RadioGroup } from '@cogoport/components';
import styles from './styles.module.css';
import InvoicingParties from './InvoicingParties';

function AddInvoicingParty({
	organization = {},
	disabledParties = {},
	updateInvoicingParty = () => {},
}) {
	const { t } = useTranslation(['common']);
	const translationKey = 'common:components.addInvoicingParty';

	const COMPONENTS_MAPPING = {
		invoice_to_self: {
			label: t(`${translationKey}.radioGroupOptions.self`),
			component: InvoicingParties,
		},
		invoice_to_trade_partner: {
			label: t(`${translationKey}.radioGroupOptions.tradePartner`),
			component: InvoicingParties,
		},
	};

	const RADIO_GROUP_OPTIONS = Object.entries(COMPONENTS_MAPPING).map(
		([key, value]) => {
			return { label: value.label, value: key };
		},
	);

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
		<div>
			<div className={styles.text}>{t(`${translationKey}.titleText`)}</div>

			<div className={styles.radio_wrapper}>
				<RadioGroup
					className="primary lg"
					options={RADIO_GROUP_OPTIONS}
					value={activeComponentKey}
					onChange={setActiveComponentKey}
				/>
			</div>

			<ActiveComponent key={activeComponentKey} {...activeComponentProps} />
		</div>
	);
}

export default AddInvoicingParty;
