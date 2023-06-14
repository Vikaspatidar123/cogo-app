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
			const grossFormatKey = Object.keys(grossFormattedData);

			grossFormatKey.forEach((name) => {
				setValue(name, grossFormattedData?.[name]);
			});
			// setValue({ ...grossFormattedData });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
					themeType="secondary"
				>
					CANCEL
				</Button>
				<Button themeType="accent" onClick={handleSubmit(handleData)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(Gross);
