import { Radio, Toggle } from '@cogoport/components';

import { CheckBoxOptions } from '../../../../common/constants';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function SellerAddress({
	insuranceType = [],
	setInsuranceType = () => {},
	uploadType = '',
	setUploadType = () => {},
}) {
	const { query } = useRouter();
	const { sid = false } = query || {};

	const onToggleHandle = () => {
		if (uploadType === 'CORPORATE') {
			setUploadType('INDIVIDUAL');
		} else {
			setUploadType('CORPORATE');
		}
	};

	return (
		<div className={styles.side_wrapper}>
			<div className={styles.billing_details_header}>
				<div className={styles.insurance_buy_div}>
					<div>Buying insurance for:</div>
					{(CheckBoxOptions || []).map((x) => (
						<div className={styles.div_margin_left} key={`${x.value}_${x.label}`}>
							<Radio
								checked={insuranceType.includes(x.value)}
								label={x.label}
								onChange={() => {
									setInsuranceType([x.value]);
								}}
								multiple={false}
							/>
						</div>
					))}
				</div>
			</div>
			<div>
				<Toggle
					size="md"
					name="insurance_type"
					offLabel="INDIVIDUAL"
					onLabel="CORPORATE"
					checked={uploadType === 'CORPORATE'}
					showOnOff
					onChange={() => onToggleHandle()}
					disabled={sid}
				/>
			</div>
		</div>
	);
}

export default SellerAddress;
