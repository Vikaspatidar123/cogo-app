import React from 'react';
import { Button } from '@cogoport/front/components';
import FormElement from '@cogo/app-search/common/FormElement';
import useAddService from '../../../hooks/useAddService';
import { Container, BtnWrap, CancelBtnWrap, Text } from './styles';

const Forms = ({
	search_type = '',
	addService: service = '',
	onClose = () => {},
	services = [],
	refetch = () => {},
	detail,
	data,
}) => {
	const {
		onError,
		addService,
		loading,
		showElements,
		controls,
		errors,
		formProps,
	} = useAddService({
		detail,
		service: { service },
		search_type,
		onAdd: () => {
			refetch();
			onClose();
		},
		services,
		data,
	});
	const { handleSubmit, fields } = formProps || {};

	return (
		<Container>
			<Text>{`Add ${detail[service]?.title}`}</Text>

			<FormElement
				controls={controls}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>

			<BtnWrap>
				<CancelBtnWrap>
					<Button
						onClick={onClose}
						disabled={loading}
						id="search_results_additional_service_add_cancel_btn"
					>
						Cancel
					</Button>
				</CancelBtnWrap>

				<Button
					onClick={handleSubmit(addService, onError)}
					disabled={loading}
					id="search_results_additional_service_add_save_btn"
				>
					Save and proceed
				</Button>
			</BtnWrap>
		</Container>
	);
};

export default Forms;
