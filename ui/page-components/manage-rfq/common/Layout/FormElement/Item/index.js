import { cl } from '@cogoport/components';
import { IcATruck } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import ValueChip from './ValueChip';

import getField from '@/packages/forms/Controlled';
import handleError from '@/ui/page-components/manage-rfq/helpers/get-form-error';

function Item({ formValue, ...rest }) {
	const value = formValue;

	const Element = getField(rest.type);

	const {
		className = '',
		label,
		showLabel = true,
		showMargin = true,
		subLabel,
		placeholder,
		lowerlabel,
		control,
		...restProps
	} = rest;

	const props = { placeholder: placeholder || '' };

	if (restProps.prefix === 'truck') {
		props.prefix = <IcATruck className={styles.truck_icon} />;
	}

	const errorClass = restProps.error ? 'error' : null;

	return (
		<div className={styles.wrapper}>
			<div className={cl`${styles.container} ${styles[className]}
            ${styles[errorClass]} ${!showMargin && styles.no_margin}`}
			>
				{restProps.type === 'container_type-commodity' ? (
					<Element
						width="100%"
						{...restProps}
						{...props}
						className={styles[className]}
						control={control}
						id={`search_form_${rest.name}`}
					/>
				) : (
					<>
						{label && showLabel && (
							<div className={styles.label}>
								{typeof label === 'string' ? label : label}

								{subLabel && (
									<span className={styles.sub_label}>
										{subLabel}
									</span>
								)}

								{restProps.collapse && value ? (
									<ValueChip
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
								control={control}
								id={`search_form_${rest.name}`}
							/>
						))
							|| null}

						{lowerlabel && <div className={styles.lowerlabel}>{lowerlabel}</div>}
					</>
				)}
			</div>
			{errorClass && (
				<div className={`${styles.text} ${styles.search_form_item_error_msg_top}`}>
					{handleError(rest, errorClass)}
				</div>
			)}
		</div>
	);
}

export default Item;
