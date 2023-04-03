import { Input } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { forwardRef } from 'react';

import getChipValue from '../../utils/get-chip-value';

import styles from './styles.module.css';

const PillInput = forwardRef(
	(
		{
			onFocus = () => {},
			onClick = () => {},
			value = {},
			showCaret = true,
			show = false,
			error = null,
			className = '',
			forAdvance = false,
			action = '',
			operatorName = {},
			...rest
		},
		ref,
	) => {
		const modifiedValues = Array.isArray(value)
			? value
			: getChipValue(value, operatorName);

		const handleShowChips = () => {
			if (forAdvance) {
				const remaining_count = modifiedValues.length - 1;
				const text = remaining_count > 1 ? 'Services' : 'Service';

				return (
					<>
						<div className={styles.chip}>
							{startCase((modifiedValues || [])[0]).toUpperCase()}
						</div>
						{remaining_count ? (
							<div style={{ fontSize: '10px', marginLeft: '4px' }}>
								{`+ ${modifiedValues.length - 1} ${text}`}
							</div>
						) : null}
					</>
				);
			}

			return modifiedValues.map((chip) => (
				<div className={styles.chip}>{chip.toUpperCase()}</div>
			));
		};

		return (
			<div ref={ref}>
				<div
					className={styles.container}
					onClick={action !== 'disable' ? onClick : null}
					id="search_form_cargo_details_container"
				>
					<div
						className={`${
            	styles.sub_container
						}search_form_cargo_details_sub_container ${styles[className]} 
					${modifiedValues.length === 0 ? 'placeholder' : ''} 
					${error ? 'error' : ''}
					${show ? 'show' : ''} 
					${action === 'disable' ? 'disable' : ''}`}
					>
						<div className={styles.chip_container}>
							{modifiedValues.length > 0 ? handleShowChips() : null}

							{modifiedValues.length === 0 ? (
								<div className={styles.placeholder}>Select Options</div>
							) : null}

							<Input
								{...rest}
								onFocus={onFocus}
								style={{ display: 'none' }}
								onBlur={onFocus}
								id="search_form_cargo_details_input"
							/>
							<div className={styles.util_div}>
								{showCaret && <IcMArrowDown size={1} color="black" />}
							</div>
						</div>

					</div>
				</div>

				{error && (
					<div className={styles.error} style={{ poistion: 'relative' }}>
						{error}
					</div>
				)}
			</div>
		);
	},
);

export default PillInput;
