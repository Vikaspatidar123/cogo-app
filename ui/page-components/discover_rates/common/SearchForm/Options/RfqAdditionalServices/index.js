import { Popover } from '@cogoport/components';
import React from 'react';

import RFQView from '../AdvancedOptions/RFQView';
import Header from '../MainControls/Header';
import PillInput from '../PillsInput';

const mainServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

function RfqAdditionalService({
	mode = '',
	services = {},
	setServices = () => {},
	location = {},
	advancedControls = [],
	search_type = '',
	className = '',
	index = 0,
	disabledFields = {},
	applyServices = () => {},
	setShowServices = () => {},
	showServices = false,
	optionsFields,
	fields,
	showElements,
	formValues,
	errors,
}) {
	const handleToggle = (e, flag) => {
		if (e) {
			e.preventDefault();
		}
		setShowServices(flag || !showServices);
	};

	const handleApply = () => {
		applyServices();
	};

	const clearFromPrevious = () => {
		const resetServices = services;
		Object.keys(resetServices).forEach((key) => {
			resetServices[key] = false;
		});
		setServices(resetServices);
		handleApply();
	};

	const activeAdditionalService = Object.keys(services).filter(
		(item) => services[item] === true && !mainServices.includes(item),
	);

	const renderMainControls = () => (
		<>
			{search_type === 'rfq' ? (
				<Header
					onClose={() => setShowServices(false)}
					onSubmit={handleApply}
					search_type={search_type}
					index={index}
					clearPreviousValues={clearFromPrevious}
				/>
			) : null}

			{Object.keys(services).length === 1 ? (
				<div style={{ width: '240px' }}>
					Please select inco-term first to add additional services
				</div>
			) : null}

			<RFQView
				mode={mode}
				services={services}
				setServices={setServices}
				location={location}
				advancedControls={advancedControls}
				optionsFields={optionsFields}
				fields={fields}
				showElements={showElements}
				formValues={formValues}
				errors={errors}
				search_type={search_type}
			/>
		</>
	);

	const renderPillsInput = (action) => (
		<PillInput
			onFocus={handleToggle}
			onClick={handleToggle}
			name="options"
			value={activeAdditionalService}
			show={setShowServices}
			showCaret
			error=""
			className={className}
			forAdvance
			action={action}
		/>
	);

	return disabledFields?.additional_services && index !== 0 ? (
		renderPillsInput('disable')
	) : (
		<Popover
			placement="bottom-start"
			interactive
			render={renderMainControls()}
			visible={showServices}
			maxWidth={350}
			onClickOutside={() => setShowServices(false)}
		>
			{renderPillsInput()}
		</Popover>
	);
}

export default RfqAdditionalService;
