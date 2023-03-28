import DatePickerControlled from '@cogo/business-modules/form/components/Controlled/DatePicker';
import InputController from '@cogo/business-modules/form/components/Controlled/InputController';
import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import { addDays } from '@cogo/date';
import getOperatorsConfig from '@cogo/product/rfq/utils/getOperatorsConfig';
import React, { useRef, useEffect } from 'react';

import { getUnit } from '../../../../../../utils/get-unit';

import PortSelect from './PortSelect';
import {
	Container,
	StyledRow,
	StyledCol,
	Label,
	ErrorText,
	InlineLabel,
	Note,
	SubLabel,
} from './styles';

function CreateContractModal({
	fields,
	errors,
	details: portDetails = {},
	watchForm,
	setValue,
}) {
	const startDate = watchForm?.validity_start;
	const { search_type = '' } = portDetails || {};
	const elementRef = useRef(null);

	const scrollToBottom = async () => {
		setTimeout(() => {
			elementRef.current?.scrollIntoView(true);
		}, 5);
	};

	let label;
	let input;
	let error;
	let shippingLabel = 'Shipping';
	let optionsListKey = 'shipping-lines';
	switch (search_type) {
		case 'fcl_freight':
			label = fields.max_containers_count.label;
			input = fields.max_containers_count;
			error =				errors?.max_containers_count?.message
				|| errors?.max_containers_count?.type === 'min';
			break;
		case 'lcl_freight':
			label = fields.max_volume.label;
			input = fields.max_volume;
			error = errors?.max_volume?.message || errors?.max_volume?.type === 'min';
			break;
		case 'air_freight':
			label = fields.max_weight.label;
			input = fields.max_weight;
			error = errors?.max_weight?.message || errors?.max_weight?.type === 'min';
			optionsListKey = 'air-lines';
			shippingLabel = 'Air';
			break;
		default:
			break;
	}
	const { params, updateCache, getCacheOptions } = getOperatorsConfig({
		formValues : watchForm,
		formType   : 'lock_rate',
	});
	useEffect(() => {
		setValue('validity_end', '');
	}, [startDate]);

	return (
		<Container>
			<PortSelect portDetail={portDetails} />
			<Note>Note: Rate will be locked for basic freights only.</Note>
			<StyledRow>
				<StyledCol md={12} lg={6}>
					<Label>{fields.contract_name.label}</Label>
					<InlineLabel>Name</InlineLabel>
					<InputController {...fields.contract_name} />
					<ErrorText>{errors?.contract_name?.message}</ErrorText>
				</StyledCol>
			</StyledRow>

			<StyledRow>
				<StyledCol md={12} lg={6}>
					<Label>
						Validity
						{' '}
						<SubLabel>(Max 30 Days)</SubLabel>
					</Label>
					<InlineLabel>Start Date</InlineLabel>
					<DatePickerControlled
						{...fields.validity_start}
						minDate={new Date()}
						maxDate={addDays(new Date(), 29)}
					/>
					<ErrorText>{errors?.validity_start?.message}</ErrorText>
				</StyledCol>

				<StyledCol md={12} lg={6} className="end-date">
					<InlineLabel>End Date</InlineLabel>
					<DatePickerControlled
						{...fields.validity_end}
						theme="admin"
						minDate={startDate}
						maxDate={addDays(startDate, 29)}
						disabled={!startDate}
					/>
					<ErrorText>{errors?.validity_end?.message}</ErrorText>
				</StyledCol>
			</StyledRow>

			<StyledRow>
				<StyledCol md={12} lg={6}>
					<Label>{label}</Label>
					<InlineLabel>{label}</InlineLabel>
					<InputController {...input} min={50} />
					<ErrorText>{error && `Min ${getUnit(search_type)}  is 50`}</ErrorText>
				</StyledCol>
			</StyledRow>

			{search_type !== 'lcl_freight' && (
				<StyledRow>
					<StyledCol md={12} lg={6}>
						<Label>
							Preferred
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className="shipping-line">(OPTIONAL)</span>
						</Label>
						<InlineLabel>Search</InlineLabel>
						<SelectController
							{...fields.preferred_shipping_line_ids}
							onFocus={async () => {
								await updateCache('preferred_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('preferred_shipping_line_ids')}
							cacheOptions={getCacheOptions('preferred_shipping_line_ids')}
							optionsListKey={optionsListKey}
						/>
						<ErrorText>
							{errors?.preferred_shipping_line_ids?.message}
						</ErrorText>
					</StyledCol>

					<StyledCol md={12} lg={6}>
						<Label>
							Exclude
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className="shipping-line">(OPTIONAL)</span>
						</Label>
						<InlineLabel>Search</InlineLabel>
						<SelectController
							{...fields.exclude_shipping_line_ids}
							onFocus={async () => {
								await updateCache('exclude_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('exclude_shipping_line_ids')}
							cacheOptions={getCacheOptions('exclude_shipping_line_ids')}
							optionsListKey={optionsListKey}
						/>
						<ErrorText>{errors?.exclude_shipping_line_ids?.message}</ErrorText>
					</StyledCol>
				</StyledRow>
			)}
			<div ref={elementRef} />
		</Container>
	);
}

export default CreateContractModal;
