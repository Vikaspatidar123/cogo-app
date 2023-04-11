// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, {
	useImperativeHandle,
	forwardRef,
	useCallback,
	useEffect,
} from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function Multitruck({ setLoadData, loadData, setShowPopover, location }, ref) {
	const controls = getControls(location);
	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm();

	console.log(controls, 'controlscontrolscontrols');

	useEffect(() => {
		if (loadData.active_tab === 'truck' && loadData.truck_details?.length) {
			setValue('trucks', loadData.truck_details);
		}
	}, [loadData]);

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(loadData);
		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...loadData } }),
				...(isError && { errors: { errorMsg: 'Loads are required' } }),
			}),
		};
	}, [loadData]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const handleData = (data) => {
		setLoadData({
			active_tab    : 'truck',
			truck_details : data?.trucks,
		});
		setShowPopover(false);
	};

	const onCancel = () => {
		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<FormElement control={control} controls={controls} showButtons />
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onCancel} style={{ marginRight: '8px' }}>
					CANCEL
				</Button>
				<Button themeType="accent" onClick={handleSubmit(handleData)}>Confirm</Button>
			</div>
		</div>
	);
}

export default forwardRef(Multitruck);
