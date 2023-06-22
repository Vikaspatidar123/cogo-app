/* eslint-disable react-hooks/exhaustive-deps */
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

	useEffect(() => {
		if (cargoType) {
			setValue('commodity', '');
		}
	}, [cargoType]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const onSubmit = (values) => {
		if (!cargoDate) {
			setErrorMessage(true);
			return;
		}

		setGoodsDetail((prev) => ({
			...prev,
			cargoDate,
			commodity: values?.commodity,
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
			<FormElement controls={controls} control={control} errors={errors} noScroll />
			<div style={{ display: 'flex' }}>
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={onCancel}
						style={{ marginRight: '8px' }}
					>
						CANCEL
					</Button>

					<Button size="md" themeType="accent" onClick={handleSubmit(onSubmit)}>
						CONFIRM
					</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(GeneralSpecialConsideration);
