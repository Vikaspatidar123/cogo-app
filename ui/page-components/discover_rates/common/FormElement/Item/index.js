// import usei18n, { replace } from '@cogo/i18n';
import { startCase } from '@cogoport/utils';
import React from 'react';

import handleError from '../../../utils/get-form-error';

// import { Grid1, Message } from '@cogo/deprecated_legacy/ui';
import IcTruck from './ic-truck.svg';
import styles from './styles.module.css';
import ValueChip from './ValueChip';

import getField from '@/packages/forms/Controlled';

function Item({ formValue, ...rest }) {
	const value = formValue;
	// const { keywords } = usei18n();

	const Element = getField(rest.type);

	const {
		className = '',
		label,
		showLabel = true,
		showMargin = true,
		subLabel,
		placeholder,
		lowerlabel,
		...restProps
	} = rest;

	const props = { placeholder };

	if (
		(restProps.type === 'select' || restProps.type === 'creatable-select')
		&& !restProps.style
	) {
		props.style = {
			control: {
				fontSize   : '12px',
				lineHeight : '14px',
				color      : 'black',
				minHeight  : '30px',
			},
			indicatorsContainer: { height: '28px' },
		};
	}

	if (restProps.prefix === 'truck') {
		props.prefix = <IcTruck size={1.5} />;
	}

	const errorClass = restProps.error ? 'error' : null;

	return (
		<div>
			{errorClass && (
				<div className={`${styles.search_form_item_error_msg_top}${styles.text}`}>
					{handleError(rest, errorClass)}
				</div>
			)}
			<div
				className={`${styles[className]}${styles.container} ${styles[errorClass] || ''} ${
					(!showMargin && 'no-margin') || ''
				} search_form_item_container`}
			>
				{restProps.type === 'container_type-commodity' ? (
					<Element
						width="100%"
						{...restProps}
						{...props}
						className={className}
						id={`search_form_${rest.name}`}
					/>
				) : (
					<>
						{label && showLabel && (
							<div className={styles.label}>
								{typeof label === 'string' ? label : label}

								{subLabel && (
									<span className="sub-label">
										{subLabel}
									</span>
								)}

								{restProps.collapse && value ? (
									<ValueChip
										style={{ maxWidth: '208px', marginLeft: 4 }}
										value={startCase(value || '')}
										name={rest.name}
										onCancel={
											restProps.onChange
												? () => restProps.onChange(rest.name, '')
												: null
										}
									/>
								) : null}
							</div>
						)}

						{((!restProps?.collapse || !value) && (
							<Element
								width="100%"
								{...restProps}
								{...props}
								className={className}
								id={`search_form_${rest.name}`}
							/>
						))
							|| null}

						{lowerlabel && <div className={styles.lower_label}>{lowerlabel}</div>}
					</>
				)}
				{errorClass && (
					<div className={`${styles.text}error_msg search_form_item_error_msg_bottom`}>
						{handleError(rest, errorClass)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Item;
