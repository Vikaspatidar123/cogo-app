// import usei18n, { replace } from '@cogo/i18n';
import { cl } from '@cogoport/components';
import { IcATruck } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import handleError from '../../../utils/get-form-error';

import styles from './styles.module.css';
import ValueChip from './ValueChip';

import getField from '@/packages/forms/Controlled';

function Item({ formValue, ...rest }) {
	const value = formValue;

	const {
		className = '',
		label,
		showLabel = true,
		showMargin = true,
		subLabel,
		placeholder,
		lowerlabel,
		type,
		...restProps
	} = rest;

	const props = { placeholder };
	const Element = getField(type);

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
		props.prefix = <IcATruck size={1.5} />;
	}

	const errorClass = restProps.error ? 'error' : null;
	return (
		<>
			{errorClass && (
				<div
					className={cl`${styles.search_form_item_error_msg_top}${styles.text}`}
				>
					{handleError(rest, errorClass)}
				</div>
			)}
			<div
				className={cl`${styles[className]} ${styles.container} ${
					styles[errorClass] || ''
				} ${(!showMargin && styles.nomargin) || ''} search_form_item_container`}
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

								{subLabel && <span className="sub-label">{subLabel}</span>}

								{restProps.collapse && value ? (
									<ValueChip
										style={{ maxWidth: '208px', marginLeft: 4 }}
										value={startCase(value || '')}
										name={rest.name}
										onCancel={restProps.setValue ? () => restProps.setValue(rest.name, '') : null}
									/>
								) : null}
							</div>
						)}

						{((!restProps?.collapse || !value) && (
							<Element
								width="100%"
								{...restProps}
								{...props}
								size="sm"
								className={className}
								id={`search_form_${rest.name}`}
							/>
						)) || null}

						{lowerlabel && (
							<div className={styles.lower_label}>{lowerlabel}</div>
						)}
					</>
				)}
				{errorClass && (
					<div
						className={cl`${styles.text} ${styles.error_msg} search_form_item_error_msg_bottom`}
					>
						{handleError(rest, errorClass)}
					</div>
				)}
			</div>
		</>
	);
}

export default Item;
