// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';

import { getFormattedData } from '../../utils/getFormattedData';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function PerPackage({ setLoadData, loadData, setShowPopover }, ref) {
	const { handleSubmit, formState, setValue, control } = useForm();

	const formattedPackageData = getFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.sub_active_tab === 'per_package'
      && formattedPackageData?.length
		) {
			setValue('packages', formattedPackageData);
		}
	}, []);

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
			sub_active_tab      : 'per_package',
			per_package_details : data,
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
					errors={formState.errors}
					control={control}
					showButtons
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={onCancel}
					style={{ marginRight: '8px' }}
				>
					CANCEL
				</Button>
				<Button size="md" onClick={handleSubmit(handleData)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(PerPackage);
