import { Modal } from '@cogoport/components';
import React from 'react';

import Form from '../../../FormElement';

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
	setLocation = () => {},
	showElements = {},
	formValues = {},
	errors = {},
	loading = false,
	control,
	setValue,
}) {
	const containerDetailsModes = [
		'fcl_freight',
		'trailer_freight',
		'haulage_freight',
	];
	const freightControls = ['bls_count', 'bl_type'];

	const incoKey = Object.keys(formValues).find((key) => key.includes('inco_term'));
	const head = (
		<Header onClose={onClose} onSubmit={submit} loading={loading}>
			ADVANCED SEARCH
		</Header>
	);
	return (
		<Modal show={show} onClose={onClose} size="xl" className={styles.modal} scroll={false}>
			<div>
				<Modal.Header title={head} />
				<div className={styles.row} style={{ width: '100%' }}>
					<div>
						<Section title="ORIGIN/DESTINATION">
							{show && (
								<SummarySection
									location={location}
									mode={mode}
									setLocation={setLocation}
									fields={[...optionsFields, ...fields]}
									errors={errors}
									control={control}
									setValue={setValue}
								/>
							)}
							<Form
								controls={advancedControls.filter((item) => freightControls.includes(item.name))}
								fields={[...optionsFields, ...fields]}
								showElements={showElements}
								formValues={formValues}
								errors={errors}
								control={control}
							/>
						</Section>
					</div>

					<div>
						<Section
							border
							title={containerDetailsModes.includes(mode) ? 'CONTAINER DETAILS' : 'CARGO DETAILS'}
						>
							<Form
								controls={controls}
								formValues={formValues}
								errors={errors}
								control={control}
							/>
						</Section>
					</div>

					<div className={styles.card}>
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
							control={control}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default AdvancedOptions;
