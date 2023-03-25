import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/front/utils';
import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';

import { getFormattedData } from '../../utils/getFormattedData';

import controls from './controls';
import styles from './styles.module.css';

function PerPackage({ setLoadData, loadData, setShowPopover }, ref) {
	const { fields, handleSubmit, formState, setValues } = useFormCogo(controls);

	const formattedPackageData = getFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.sub_active_tab === 'per_package'
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
				<Layout
					controls={controls}
					fields={fields}
					errors={formState.errors}
					theme="admin"
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

export default forwardRef(PerPackage);
