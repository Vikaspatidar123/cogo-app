import { isEmpty } from '@cogoport/utils';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';

import LoadDetails from './LoadDetails';
import styles from './styles.module.css';

function Load(props, ref) {
	const {
		formError = {},
		setShowPopover = () => {},
		setShowFilledValues,
		showFilledValues,
		getCargoReadyDate = '',
		getCommodity = '',
		getCommoditySubtype = '',
	} = props;

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(showFilledValues);

		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...showFilledValues } }),
				...(isError && { errors: { errorMessage: 'Load is required' } }),
			}),
		};
	}, [showFilledValues]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<LoadDetails
				setShowPopover={setShowPopover}
				showFilledValues={showFilledValues}
				setShowFilledValues={setShowFilledValues}
				getCargoReadyDate={getCargoReadyDate}
				getCommodity={getCommodity}
				getCommoditySubtype={getCommoditySubtype}
			/>

			{formError?.load ? (
				<div className={styles.error_message_container}>Load is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(Load);
