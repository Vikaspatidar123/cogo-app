import { Input } from '@cogoport/components';
import React, { forwardRef } from 'react';

import styles from './styles.module.css';

import Spinner from '@/ui/commons/components/Spinner';

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
					<Spinner />
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
