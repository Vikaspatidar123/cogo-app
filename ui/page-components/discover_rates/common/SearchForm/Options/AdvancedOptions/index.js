import { Modal } from '@cogoport/components';
import React from 'react';
// import Form from '../../../FormElement';

import Header from './Header';
import Section from './Section';
import Services from './Services';
import styles from './styles.module.css';
import SummarySection from './SummarySection';
// import NoServicesSelected from './Services/NoServiceSelected';

function AdvancedOptions({
	show = false,
	onClose = () => {},
	controls = [],
	mode = '',
	location = {},
	fields = {},
	advancedControls = [],
	submit = () => {},
	optionsFields = {},
	services = {},
	setServices = () => {},
	mobile = false,
	setLocation = () => {},
	showElements = {},
	formValues = {},
	errors = {},
	loading = false,
}) {
	const containerDetailsModes = [
		'fcl_freight',
		'trailer_freight',
		'haulage_freight',
	];
	const freightControls = ['bls_count', 'bl_type'];

	const incoKey = Object.keys(formValues).find((key) => key.includes('inco_term'));

	return (
	// <UICustomTheme theme={CUSTOM_THEME}>
		<Modal
			show={show}
			closable={false}
			themeType="very-large"
			fullscreen={mobile}
		>
			<div>
				<Header onClose={onClose} onSubmit={submit} loading={loading}>
					ADVANCED SEARCH
				</Header>

				<div className={styles.row} style={{ width: '100%' }}>
					<div>
						<Section title="ORIGIN/DESTINATION">
							{show && (
								<SummarySection
									location={location}
									mode={mode}
									setLocation={setLocation}
									fields={{ ...optionsFields, ...fields }}
									errors={errors}
								/>
							)}

							{/* <Form
								controls={advancedControls.filter((control) => freightControls.includes(control.name))}
								fields={{ ...optionsFields, ...fields }}
								showElements={showElements}
								formValues={formValues}
								errors={errors}
							/> */}
							Form hear
						</Section>
					</div>

					<div>
						<Section
							border
							title={
									containerDetailsModes.includes(mode)
										? 'CONTAINER DETAILS'
										: 'CARGO DETAILS'
								}
						>
							{/* <Form
								controls={controls}
								fields={{ ...optionsFields, ...fields }}
								formValues={formValues}
								errors={errors}
							/> */}
							Form hear
						</Section>
					</div>

					<div>
						<Services
							mode={mode}
							incoTerm={formValues?.[incoKey]}
							services={services}
							setServices={setServices}
							location={location}
							advancedControls={advancedControls}
							optionsFields={optionsFields}
							fields={fields}
							showElements={showElements}
							formValues={formValues}
							errors={errors}
						/>
					</div>
				</div>
			</div>
		</Modal>
	// </UICustomTheme>
	);
}

export default AdvancedOptions;
