import React, {
	useImperativeHandle,
	forwardRef,
	useCallback,
	useEffect,
} from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { isEmpty } from '@cogoport/front/utils';
import { Container, ButtonContainer } from './styles';
import getControls from './controls';

const GeneralSpecialConsideration = (
	{
		cargoDate,
		setErrorMessage = false,
		setGoodsDetail,
		setShowPopover,
		goodsDetail,
		cargoType,
	},
	ref,
) => {
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
			handleSubmit: () => {
				return {
					hasError: isError,
					...(!isError && { values: { ...goodsDetail } }),
					...(isError && { errors: { errorMsg: 'Goods are required' } }),
				};
			},
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
		<Container>
			<Layout controls={controls} fields={fields} errors={errors} />

			<ButtonContainer>
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
			</ButtonContainer>
		</Container>
	);
};

export default forwardRef(GeneralSpecialConsideration);
