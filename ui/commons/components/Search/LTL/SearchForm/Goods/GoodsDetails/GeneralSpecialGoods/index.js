// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
// import { useFormCogo } from '@cogoport/front/hooks';
// import { isEmpty } from '@cogoport/front/utils';
import React, {
	useImperativeHandle,
	forwardRef,
	useCallback,
	useEffect,
} from 'react';

import getControls from './controls';
// import { Container, ButtonContainer } from './styles';
import styles from './styles.module.css';

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
		setValues,
	} = useFormCogo(controls);

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
			setValues({
				commodity: goodsDetail?.commodity,
			});
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
		<div className={styles.containe} r>
			{/* <Layout controls={controls} fields={fields} errors={errors} /> */}
			<div style={{ display: 'flex' }}>
				<div className={styles.button_container}>
					<Button
						className="secondary sm"
						onClick={onCancel}
						style={{ marginRight: '8px' }}
					>
						CANCEL
					</Button>

					<Button className="primary sm" onClick={handleSubmit(onSubmit)}>
						CONFIRM
					</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(GeneralSpecialConsideration);
