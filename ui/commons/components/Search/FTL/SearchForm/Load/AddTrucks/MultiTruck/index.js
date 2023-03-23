import React, {
	useImperativeHandle,
	forwardRef,
	useCallback,
	useEffect,
} from 'react';
import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/front/utils';
import { Container, Wrapper, ButtonContainer } from './styles';
import getControls from './controls';

function Multitruck({ setLoadData, loadData, setShowPopover, location }, ref) {
	const controls = getControls(location);
	const {
		fields,
		formState: { errors },
		handleSubmit,
		setValues,
	} = useFormCogo(controls);

	useEffect(() => {
		if (loadData.active_tab === 'truck' && loadData.truck_details?.length) {
			setValues({
				trucks: loadData.truck_details,
			});
		}
	}, [loadData]);

	const imperativeHandle = useCallback(() => {
		const isError = isEmpty(loadData);
		return {
			handleSubmit: () => {
				return {
					hasError: isError,
					...(!isError && { values: { ...loadData } }),
					...(isError && { errors: { errorMsg: 'Loads are required' } }),
				};
			},
		};
	}, [loadData]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	const handleData = (data) => {
		setLoadData({
			active_tab: 'truck',
			truck_details: data?.trucks,
		});
		setShowPopover(false);
	};

	const onCancel = () => {
		setShowPopover(false);
	};

	return (
		<Container>
			<Wrapper>
				<Layout controls={controls} fields={fields} errors={errors} />
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
}

export default forwardRef(Multitruck);
