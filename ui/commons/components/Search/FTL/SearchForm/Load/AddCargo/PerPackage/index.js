import React, {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
} from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '@cogo/business-modules/form/Layout';

import { Button } from '@cogoport/front/components/admin';
import { isEmpty } from '@cogoport/front/utils';
import controls from './controls';
import { getFormattedData } from '../../utils/getFormattedData';
import { Container, Wrapper, ButtonContainer } from './styles';

const PerPackage = ({ setLoadData, loadData, setShowPopover }, ref) => {
	const { fields, handleSubmit, formState, setValues } = useFormCogo(controls);

	const formattedPackageData = getFormattedData(loadData);

	useEffect(() => {
		if (
			loadData.active_tab === 'cargo' &&
			loadData.sub_active_tab === 'per_package' &&
			formattedPackageData?.length
		) {
			setValues({
				packages: formattedPackageData,
			});
		}
	}, []);

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
			active_tab: 'cargo',
			sub_active_tab: 'per_package',
			per_package_details: data,
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
					theme="admin"
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

export default forwardRef(PerPackage);
