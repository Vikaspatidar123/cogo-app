import { Loader, Input } from '@cogoport/components';
import React, { forwardRef } from 'react';

import styles from './styles.module.css';

const AnimatedCheckbox = forwardRef(
	(
		{
			loading = false,
			style,
			checked = false,
			disabled = false,
			onChange = () => {},
			...rest
		},
		ref,
	) => {
		const derivedClasses = [];
		if (checked) {
			derivedClasses.push('checked');
		}
		if (disabled) {
			derivedClasses.push('disabled');
		}
		if (loading) {
			derivedClasses.push('loading');
		}

		return (
			<div
				className={styles.container
					&& 'ui-core-checkbox-root'}
			>
				{loading ? (
					<Loader themeType="primary" />
				) : (
					<Input
						ref={ref}
						onChange={(e) => onChange(e.target.checked)}
						type="checkbox"
						checked={checked}
						disabled={disabled}
						className="ui-core-checkbox-control"
						{...rest}
					/>
				)}
			</div>
		);
	},
);

export default AnimatedCheckbox;
