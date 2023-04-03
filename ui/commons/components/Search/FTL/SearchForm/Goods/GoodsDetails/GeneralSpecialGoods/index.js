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
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function GeneralSpecialConsideration(
	{
		cargoDate,
		setErrorMessage = false,
		setGoodsDetail,
		setShowPopover,
		goodsDetail,
		cargoType,
	},
	ref,
) {
	const controls = getControls(cargoType);

	const {
		fields,
		formState = {},
		handleSubmit = () => {},
		setValue,
		control,
	} = useForm();
	const { errors = {} } = formState || {};

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(goodsDetail);
		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...goodsDetail } }),
				...(isError && { errors: { errorMsg: 'Goods are required' } }),
			}),
		};
	}, [goodsDetail]);

	useEffect(() => {
		if (goodsDetail?.commodity) {
			setValue('commodity', goodsDetail?.commodity);
		}
	}, [goodsDetail]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const onSubmit = (values) => {
		if (!cargoDate) {
			setErrorMessage(true);
			return;
		}

		setGoodsDetail((prev) => ({
			...prev,
			cargoDate,
			commodity: values.commodity,
			cargoType,
		}));

		setErrorMessage(false);
		setShowPopover(false);
	};

	const onCancel = () => {
		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<FormElement
				control={control}
				controls={controls}
				showButtons
				errors={errors}
			/>

			<div className={styles.button_container}>
				<Button onClick={onCancel} style={{ marginRight: '8px' }}>
					CANCEL
				</Button>

				<Button onClick={handleSubmit(onSubmit)}>CONFIRM</Button>
			</div>
		</div>
	);
}

export default forwardRef(GeneralSpecialConsideration);
