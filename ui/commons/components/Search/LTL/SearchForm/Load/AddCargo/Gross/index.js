import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from 'lodash';
import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';

import { getGrossFormattedData } from '../../utils/getGrossFormattedData';

import { controls } from './controls';
import styles from './styles.module.css';

function Gross({ setLoadData, loadData, setShowPopover }, ref) {
	const { fields, handleSubmit, formState, setValues } = useFormCogo(controls);

	const grossFormattedData = getGrossFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.sub_active_tab === 'gross'
			&& !isEmpty(loadData.gross_details)
		) {
			setValues({ ...grossFormattedData });
		}
	}, [loadData]);

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(loadData);
		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...loadData } }),
				...(isError && { errors: { errorMsg: 'Loads is required' } }),
			}),
		};
	}, [loadData]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const handleData = (data) => {
		setLoadData({
			sub_active_tab : 'gross',
			gross_details  : data,
		});

		setShowPopover(false);
	};

	const onCancel = () => {
		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Layout
					controls={controls}
					fields={fields}
					errors={formState.errors}
					setValues={setLoadData}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					className="secondary sm"
					onClick={onCancel}
					style={{ marginRight: '8px' }}
				>
					CANCEL
				</Button>

				<Button className="primary sm" onClick={handleSubmit(handleData)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(Gross);
