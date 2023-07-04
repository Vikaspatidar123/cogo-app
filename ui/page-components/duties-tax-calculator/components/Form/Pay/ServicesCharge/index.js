import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function ServicesCharge({ formData }) {
	const {
		hsCode, consignmentValue, quantity, currency, productName,
	} = formData || {};

	const { t } = useTranslation(['dutiesTaxesCalculator']);

	function GetProductData() {
		return (
			<div>
				{t('dutiesTaxesCalculator:form_pay_service_charge_product_name')}
				{productName}
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>{t('dutiesTaxesCalculator:form_pay_service_charge_title')}</div>
			<div className={styles.row}>
				<div className={styles.hscode}>
					<div>{hsCode}</div>
					{productName !== '' && (
						<Tooltip placement="right" content={<GetProductData />}>
							<div>
								<IcMInfo />
							</div>
						</Tooltip>
					)}
				</div>
				<div className={styles.quantity}>
					{t('dutiesTaxesCalculator:form_pay_service_charge_quantity')}
					{quantity}
				</div>
				<div>
					{formatAmount({
						amount  : consignmentValue,
						currency,
						options : {
							notation : 'standard',
							style    : 'currency',
						},
					})}

				</div>
			</div>
		</div>
	);
}

export default ServicesCharge;
