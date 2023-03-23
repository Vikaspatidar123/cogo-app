import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { isEmpty } from 'lodash';
import { Container, Wrapper, ButtonContainer } from './styles';
import { controls } from './controls';
import { getGrossFormattedData } from '../../utils/getGrossFormattedData';

const Gross = ({ setLoadData, loadData, setShowPopover }, ref) => {
	const { fields, handleSubmit, formState, setValues } = useFormCogo(controls);

	const grossFormattedData = getGrossFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.sub_active_tab === 'gross' &&
			!isEmpty(loadData.gross_details)
		) {
			setValues({ ...grossFormattedData });
		}
	}, [loadData]);

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(loadData);
		return {
			handleSubmit: () => {
				return {
					hasError: isError,
					...(!isError && { values: { ...loadData } }),
					...(isError && { errors: { errorMsg: 'Loads is required' } }),
				};
			},
		};
	}, [loadData]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const handleData = (data) => {
		setLoadData({
			sub_active_tab: 'gross',
			gross_details: data,
		});

		setShowPopover(false);
	};

	const onCancel = () => {
		setShowPopover(false);
	};

	return (
		<Container>
			<Wrapper>
				<Layout
					controls={controls}
					fields={fields}
					errors={formState.errors}
					setValues={setLoadData}
				/>
			</Wrapper>

			<ButtonContainer>
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
			</ButtonContainer>
		</Container>
	);
};

export default forwardRef(Gross);
