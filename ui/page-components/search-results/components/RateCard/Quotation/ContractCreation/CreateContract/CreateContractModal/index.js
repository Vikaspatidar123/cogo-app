/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { addDays } from '@cogoport/utils';
import React, { useRef, useEffect } from 'react';

import { getUnit } from '../../../../../../utils/get-unit';

import PortSelect from './PortSelect';
import styles from './styles.module.css';

import { DatepickerController, InputController, AsyncSelectController } from '@/packages/forms';
import getOperatorsConfig from '@/ui/page-components/search-results/utils/getOperatorsConfig';

function CreateContractModal({
	fields,
	errors,
	details: portDetails = {},
	watchForm,
	setValue,
}) {
	const startDate = watchForm?.validity_start;
	const { search_type = '' } = portDetails || {};
	const elementRef = useRef(null);

	const scrollToBottom = async () => {
		setTimeout(() => {
			elementRef.current?.scrollIntoView(true);
		}, 5);
	};

	let label;
	let input;
	let error;
	let shippingLabel = 'Shipping';
	let optionsListKey = 'shipping-lines';
	switch (search_type) {
		case 'fcl_freight':
			label = fields.max_containers_count.label;
			input = fields.max_containers_count;
			error =				errors?.max_containers_count?.message
				|| errors?.max_containers_count?.type === 'min';
			break;
		case 'lcl_freight':
			label = fields.max_volume.label;
			input = fields.max_volume;
			error = errors?.max_volume?.message || errors?.max_volume?.type === 'min';
			break;
		case 'air_freight':
			label = fields.max_weight.label;
			input = fields.max_weight;
			error = errors?.max_weight?.message || errors?.max_weight?.type === 'min';
			optionsListKey = 'air-lines';
			shippingLabel = 'Air';
			break;
		default:
			break;
	}
	const { params, updateCache, getCacheOptions } = getOperatorsConfig({
		formValues : watchForm,
		formType   : 'lock_rate',
	});
	useEffect(() => {
		setValue('validity_end', '');
	}, [startDate]);

	return (
		<div className={styles.container}>
			<PortSelect portDetail={portDetails} />
			<div className={styles.note}>Note: Rate will be locked for basic freights only.</div>
			<div className={styles.styled_row}>
				<div className={styles.styled_col}>
					<div className={styles.label}>{fields.contract_name.label}</div>
					<div className={styles.inline_label}>Name</div>
					<InputController {...fields.contract_name} />
					<div className={styles.error_text}>{errors?.contract_name?.message}</div>
				</div>
			</div>

			<div className={styles.styled_row}>
				<div className={styles.styled_col}>
					<div className={styles.label}>
						Validity
						<div className={styles.sub_label}>(Max 30 Days)</div>
					</div>
					<div className={styles.inline_label}>Start Date</div>
					<DatepickerController
						{...fields.validity_start}
						minDate={new Date()}
						maxDate={addDays(new Date(), 29)}
					/>
					<div className={styles.error_text}>{errors?.validity_start?.message}</div>
				</div>

				<div className={cl`${styles.styled_col} ${styles.end_date}`}>

					<div className={`${styles.inline_label} ${styles.inline_date}`}>End Date</div>
					<DatepickerController
						{...fields.validity_end}
						theme="admin"
						minDate={startDate}
						maxDate={addDays(startDate, 29)}
						disabled={!startDate}
					/>
					<div className={styles.error_text}>{errors?.validity_end?.message}</div>
				</div>
			</div>

			<div className={styles.styled_row}>
				<div className={styles.styled_col}>
					<div className={styles.label}>{label}</div>
					<div className={styles.inline_label}>{label}</div>
					<InputController {...input} min={50} />
					<div className={styles.error_text}>{error && `Min ${getUnit(search_type)}  is 50`}</div>
				</div>
			</div>

			{search_type !== 'lcl_freight' && (
				<div className={styles.styled_row}>
					<div className={styles.styled_col}>
						<div className={styles.label}>
							Preferred
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className={styles.shipping_line}>(OPTIONAL)</span>
						</div>
						<div className={styles.inline_label}>Search</div>
						<AsyncSelectController
							{...fields.preferred_shipping_line_ids}
							onFocus={async () => {
								await updateCache('preferred_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('preferred_shipping_line_ids')}
							cacheOptions={getCacheOptions('preferred_shipping_line_ids')}
							asyncKey={optionsListKey}
						/>
						<div className={styles.error_text}>
							{errors?.preferred_shipping_line_ids?.message}
						</div>
					</div>

					<div className={styles.styled_col}>
						<div className={styles.label}>
							Exclude
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className={styles.shipping_line}>(OPTIONAL)</span>
						</div>
						<div className={styles.inline_label}>Search</div>
						<AsyncSelectController
							{...fields.exclude_shipping_line_ids}
							onFocus={async () => {
								await updateCache('exclude_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('exclude_shipping_line_ids')}
							cacheOptions={getCacheOptions('exclude_shipping_line_ids')}
							asyncKey={optionsListKey}
						/>
						<div className={styles.error_text}>{errors?.exclude_shipping_line_ids?.message}</div>
					</div>
				</div>
			)}
			<div ref={elementRef} />
		</div>
	);
}

export default CreateContractModal;
