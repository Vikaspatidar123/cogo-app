import { Loader, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';
import usePaymentModes from './usePaymentModes';

const STYLE = {
	padding   : '16px 32px',
	borderTop : '1px solid #cddbff',

	display        : 'flex',
	justifyContent : 'space-between',
};

function PaymentModes({
	invoicingParty = {},
	detail = {},
	paymentModes,
	setPaymentModes = () => {},
}) {
	const {
		loading,
		options,
		PAYMENT_TERMS = {},
		PAYMENT_METHODS = {},
		creditDetails = {},
		PAYMENT_MODES = [],
	} = usePaymentModes({
		invoicingParty,
		detail,
		setPaymentModes,
		paymentModes,
	});

	const {
		paymentMode = 'cash',
		paymentTerms = '',
		paymentMethods = '',
	} = paymentModes[invoicingParty.id] || {};

	useEffect(() => {
		const tempPaymentMode = !paymentTerms
			? { paymentTerms: PAYMENT_TERMS?.[paymentMode]?.[0]?.value }
			: {};

		setPaymentModes((pv) => ({
			...pv,
			[invoicingParty.id]: {
				...pv[invoicingParty.id],
				...creditDetails,
				...tempPaymentMode,
				paymentMode,
			},
		}));
	}, [PAYMENT_TERMS, creditDetails, invoicingParty.id, paymentMode, paymentTerms, setPaymentModes]);

	useEffect(() => {
		setPaymentModes((pv) => ({
			...pv,
			[invoicingParty.id]: {
				...pv[invoicingParty.id],
				paymentMethods:
						paymentMethods || PAYMENT_METHODS?.[paymentTerms]?.[0]?.value,
			},
		}));
	}, [JSON.stringify(paymentModes?.[invoicingParty.id]?.paymentTerms)]);

	if (loading) {
		return (
			<div className={styles.spinner_container}>
				<Loader themeType="primary" />
			</div>
		);
	}

	if (isEmpty(options)) {
		return null;
	}

	return (
		<div style={STYLE}>
			{(PAYMENT_MODES || []).map((item) => {
				const {
					span = 1,
					title = '',
					options: paymentModeOptions = [],
					val = '',
					onChange = () => {},
				} = item;

				return (
					<div style={{ display: 'flex', flexDirection: 'column' }} key={item}>
						{!isEmpty(paymentModeOptions) && (
							<>
								<div className={styles.header}>{title}</div>

								<div className={styles.radio_container}>
									<RadioGroup
										className="primary md"
										options={paymentModeOptions}
										value={val}
										onChange={onChange}
									/>
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PaymentModes;
