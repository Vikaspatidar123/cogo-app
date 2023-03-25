// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';

import { getGrossFormattedData } from '../../utils/getGrossFormattedData';

import { controls } from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function Gross({ setLoadData, loadData, setShowPopover }, ref) {
	const { handleSubmit, formState, setValue, control } = useForm();

	const grossFormattedData = getGrossFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.active_tab === 'cargo'
			&& loadData.sub_active_tab === 'gross'
			&& !isEmpty(loadData?.gross_details)
		) {
			// setValue({ ...grossFormattedData });
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
			active_tab     : 'cargo',
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

				<FormElement
					controls={controls}
					control={control}
					showButtons
					errors={formState.errors}
					setValue={setValue}
				/>

			</div>

			<div className={styles.button_container}>
				<Button
					onClick={onCancel}
					style={{ marginRight: '8px' }}
				>
					CANCEL
				</Button>
				<Button onClick={handleSubmit(handleData)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(Gross);
