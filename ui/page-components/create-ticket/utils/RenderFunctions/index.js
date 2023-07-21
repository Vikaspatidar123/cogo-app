import { Pill, Tooltip, Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import { Link } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const ItemFunctions = ({
	handleCheckboxSelect = () => {},
	handleBoxSelect = () => {},
	selectedInvoices = {},
	selectedpayments = [],
}) => {
	const newFunctions = {
		handlePrice: (item, field) => (item?.[field.key] ? (
			<div className={styles.title}>
				{formatAmount({
					amount   : item?.[field.key] || 0,
					currency : item?.[field.currencyKey],
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		) : (
			'-'
		)),
		handleUrlLink: (item, field) => (item?.[field.urlKey] ? (
			<div className={styles.wrapper}>
				<Link href={item.pdf_url} target="_blank">
					{item.invoice_number}
				</Link>
				{item?.[field?.tagKey] && (
					<Pill size="sm">{startCase(item?.[field?.tagKey])}</Pill>
				)}
			</div>
		) : (
			<div className={styles.title}>{item.invoice_number || '-'}</div>
		)),
		handleText: (item, field) => (item?.[field.key] ? (
			<div className={styles.wrapper}>
				<div className={styles.title}>{item?.[field.key]}</div>
				{item?.[field?.tagKey] && (
					<Pill size="sm">{startCase(item?.[field?.tagKey])}</Pill>
				)}
			</div>
		) : (
			'-'
		)),
		handleUtilPrice: (item, field) => {
			const amount =				Number(item?.[field.key]) - Number(item?.[field.amountSubtractKey]);

			return item?.[field.key] ? (
				<div className={styles.title}>
					{Number(item?.[field.signFlag]) * -1 < 0 && amount !== 0 && '-'}
					{Number(item?.[field.signFlag]) * -1 > 0 && amount !== 0 && '+'}
					{formatAmount({
						amount   : amount || 0,
						currency : item?.[field.currencyKey],
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			) : (
				'-'
			);
		},
		handleShortFormatPrice: (item, field) => (item?.[field.key] ? (
			<div className={styles.wrapper}>
				<Tooltip
					theme="light"
					content={(
						<div className={styles.title}>
							{formatAmount({
								amount   : item?.[field.key] || 0,
								currency : item?.[field.currencyKey],
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</div>
					)}
					placement="top"
				>
					<div className={`${styles.title} ${styles.show_cursor}`}>
						{formatAmount({
							amount   : item?.[field.key]?.toFixed(0) || 0,
							currency : item?.[field.currencyKey],
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
								compactDisplay        : 'short',
							},
						})}
					</div>
				</Tooltip>
				{item?.[field?.tagKey] && (
					<Pill size="sm">{startCase(item?.[field?.tagKey])}</Pill>
				)}
			</div>
		) : (
			'-'
		)),
		handleStatus: (item, field) => (item?.[field.key] ? (
			<div className={styles.title}>{startCase(item?.[field.key])}</div>
		) : (
			'-'
		)),
		handleDate: (item, field) => (item?.[field.key] ? (
			<div className={styles.title}>
				{formatDate({
					date       : item?.[field.key],
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		) : (
			'-'
		)),
		handleCheckbox: (item, field) => (item?.[field.key] ? (
			<div className={styles.title}>
				<Checkbox
					className="primary lg"
					checked={Object.keys(selectedInvoices || {}).includes(
						item?.[field.key],
					)}
					onChange={() => handleCheckboxSelect(item)}
				/>
			</div>
		) : (
			'-'
		)),
		handleSelect: (item, field) => (item?.[field.key] ? (
			<div className={styles.title}>
				<Checkbox
					className="primary lg"
					checked={(selectedpayments || []).includes(item?.[field.key])}
					onChange={() => handleBoxSelect(item)}
				/>
			</div>
		) : (
			'-'
		)),
	};
	return {
		newFunctions,
	};
};

export default ItemFunctions;
