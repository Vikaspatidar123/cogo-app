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
	const { handleSubmit, formState, setValues, control } = useForm({
		defaultValues: {
			packages: [
				{
					package_type   : '',
					packages_count : '',
					package_weight : '',
					handling_type  : '',
				},
			],
		},
	});

	const formattedPackageData = getFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.active_tab === 'cargo'
      && loadData.sub_active_tab === 'per_package'
      && formattedPackageData?.length
		) {
			setValues({
				packages: formattedPackageData,
			});
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
			active_tab          : 'cargo',
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
				<FormElement controls={controls} control={control} showButtons errors={formState.errors} />
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onCancel} style={{ marginRight: '8px' }}>Cancel</Button>
				<Button themeType="accent" onClick={handleSubmit(handleData)}>Confirm</Button>
			</div>
		</div>
	);
}

export default forwardRef(PerPackage);
