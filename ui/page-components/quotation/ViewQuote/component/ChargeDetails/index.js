import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { CURRENCY_OPTION } from '../../constant/currencyOption';

import styles from './styles.module.css';
import TagContainer from './TagContainer';

import formatAmount from '@/ui/commons/utils/formatAmount';

const CHARGE_MAPPING = {
	productCost         : 'Consignment Total',
	insurance           : 'Insurance',
	dutiesAndTaxes      : 'Duties And taxes',
	basicFreightCharges : 'Basic Freight',
};

function RenderComment({ comments }) {
	return comments && (
		<div className={styles.comment}>
			<h2 className={cl`${styles.title} ${styles.notes_title}`}>Additional Notes:</h2>
			<p className={styles.text}>{comments}</p>
		</div>
	);
}

function ChargeDetails(props) {
	const {
		basicFreightCharges,
		dutiesAndTaxes,
		insurance,
		additionalChargesList,
		quotationAmount,
		comments,
		currency,
		productCost,
		...rest
	} = props;

	const { additionalCharges = [], incotermCharges = [] } = additionalChargesList || {};
	const charges = [...additionalCharges, ...incotermCharges];

	return (
		<div className={styles.container}>
			<div className={styles.comment_container}>
				<div>
					<TagContainer {...rest} />
				</div>
				<div className={styles.comment_web_view}>
					<RenderComment comments={comments} />
				</div>
			</div>
			<div className={styles.charge_container}>
				<h2 className={styles.title}>Charges: </h2>

				{Object.keys(CHARGE_MAPPING).map((charge, index) => (
					<div key={charge} className={cl`${styles.row} ${index % 2 === 0 ? styles.row_bg : ''}`}>
						<p className={styles.text}>{CHARGE_MAPPING[charge]}</p>
						{formatAmount({
							amount  : props?.[charge],
							currency,
							options : CURRENCY_OPTION,
						})}

					</div>
				))}

				{!isEmpty(charges)
					&& charges?.map((charge, index) => (
						<div
							key={`${charge?.name}_${index}`}
							className={cl`${styles.row} ${index % 2 === 0 ? styles.row_bg : ''}`}
						>
							<p className={styles.text}>{charge?.name}</p>
							{formatAmount({
								amount  : charge?.value,
								currency,
								options : CURRENCY_OPTION,
							})}
						</div>
					))}

				<div className={cl`${styles.row} ${styles.total}`}>
					<p>Quotation Total</p>
					<p className={styles.total_amt}>
						{formatAmount({
							amount  : quotationAmount,
							currency,
							options : CURRENCY_OPTION,
						})}
					</p>
				</div>
			</div>
			<div className={styles.comment_mobile_view}>
				<RenderComment comments={comments} />

			</div>
		</div>
	);
}

export default ChargeDetails;
