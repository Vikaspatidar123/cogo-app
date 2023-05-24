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
			loadData.sub_active_tab === 'gross'
      && !isEmpty(loadData.gross_details)
		) {
			Object.keys(grossFormattedData)?.forEach((item) => {
				setValue(item, grossFormattedData?.[item]);
			});
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

				<Button size="md" themeType="accent" onClick={handleSubmit(handleData)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(Gross);
