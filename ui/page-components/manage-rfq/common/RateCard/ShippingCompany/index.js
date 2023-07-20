import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const BACKGROUND_COLOR_MAPPING = {
	default                : '#f2f3fb',
	margin_added           : '#f2f3fb',
	approval_pending       : '#fffce6',
	requested_for_approval : '#fffce6',
};

const COLOR_MAPPING = {
	default                : '#8287b7',
	margin_added           : '#8287b7',
	approval_pending       : '#d6b300',
	requested_for_approval : '#d6b300',
};

function ShippingCompany({
	ratesBreakdown,
	shippingLine = {},
	card_state = '',
}) {
	const { validity_end } = ratesBreakdown || {};
	const { logo_url = '', business_name = '' } = shippingLine || {};

	return (
		<div className={styles.container}>
			<div className={styles.shipping_line_info}>
				{logo_url ? <img alt="logo" className={styles.image} src={logo_url} /> : null}
				<div>{business_name}</div>
			</div>

			<div style={{ display: 'flex' }}>
				{card_state && card_state !== 'default' ? (
					<div
						style={{
							color           : COLOR_MAPPING[card_state],
							backgroundColor : BACKGROUND_COLOR_MAPPING[card_state],
						}}
						className={styles.approve_text}
					>
						{startCase(card_state)}
					</div>
				) : null}
			</div>

			<div className={styles.right_container}>
				<div className={styles.validity}>
					<Pill color="blue">
						Validity Till
						{' '}
						{formatDate({
							date       : validity_end,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</Pill>
				</div>
			</div>
		</div>
	);
}

export default ShippingCompany;
