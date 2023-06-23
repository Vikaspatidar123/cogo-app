import { Toast, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import AdvancedOptions from './AdvancedOptions';
import Header from './Header';
import PillsInput from './PillsInput';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getControls from '@/ui/page-components/manage-rfq/utils/getControls';
import showElementsFunc from '@/ui/page-components/manage-rfq/utils/show-elements';

const mainServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

function AdditionalServices(props) {
	const {
		mode = '',
		services = {},
		setServices = () => {},
		location = {},
		className = '',
		setShowServices = () => {},
		showServices = false,
		mainValues,
		setAdditionalServices = () => {},
		additionalServiceValues,
		handleIndex,
		handleServices = () => {},
	} = props || {};

	const [currentServices, setCurrentServices] = useState({});
	const [expandServices, setExpandServices] = useState({});
	const { advancedControls } = getControls({
		mode,
		mobile           : false,
		additionalServiceValues,
		location,
		isChannelPartner : false,
	});

	const formProps = useForm();
	const {
		watch,
		handleSubmit,
		formState: { errors },
		control,
	} = formProps;

	const formValues = useMemo(() => ({ ...mainValues, ...watch() }), [mainValues, watch]);

	const showElements = useMemo(
		() => showElementsFunc({
			...formProps,
			advancedControls,
			formValues,
			mode,
			location,
			services: services?.[mode]?.[handleIndex] || {},
		}),
		[advancedControls, formProps, formValues, handleIndex, location, mode, services],
	);

	const handleApply = () => {
		if (
			formValues?.export_transportation_packages
			&& formValues?.export_transportation_packages?.length === 0
		) {
			Toast.error('Packages cannot be empty');
			return;
		}
		let newData = {};
		Object.keys(showElements).forEach((item) => {
			if (showElements[item]) {
				newData = { ...newData, [item]: formValues[item] };
			}
		});
		setAdditionalServices(newData);
		setShowServices(false);
	};

	const activeAdditionalService = Object.keys(
		services?.[mode]?.[handleIndex] || {},
	).filter(
		(item) => services?.[mode]?.[handleIndex][item] === true
			&& !mainServices.includes(item),
	);

	const handleToggle = (e, flag) => {
		if (e) {
			e.preventDefault();
		}
		if (!showServices || isEmpty(activeAdditionalService)) {
			setShowServices(flag || !showServices);
		}
	};

	const renderMainControls = () => (
		<div className={styles.tooltip_container}>
			<Header
				onClose={() => {
					setShowServices(false);
					setServices({ ...currentServices });
				}}
				onSubmit={handleSubmit(handleApply)}
			/>

			{Object.keys(services?.[mode]?.[handleIndex] || {}).length < 2 && (
				<div className={styles.text}>Please select inco-term first to add additional services</div>
			)}

			<AdvancedOptions
				mode={mode}
				services={services}
				setServices={setServices}
				location={location}
				advancedControls={advancedControls}
				showElements={showElements}
				formValues={formValues}
				control={control}
				errors={errors}
				showServices={showServices}
				formProps={formProps}
				handleServices={handleServices}
				handleIndex={handleIndex}
				setExpandServices={setExpandServices}
				expandServices={expandServices}
			/>
		</div>
	);

	const renderPillsInput = (action) => (
		<PillsInput
			mode={mode}
			onFocus={handleToggle}
			onClick={handleToggle}
			name="options"
			value={activeAdditionalService}
			show={setShowServices}
			showCaret
			error=""
			className={className}
			action={action}
		/>
	);

	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				render="left"
				interactive
				content={renderMainControls()}
				visible={showServices}
				onShow={() => {
					setCurrentServices({ ...services });
					setExpandServices({});
					setExpandServices(services?.[mode]?.[handleIndex]);
				}}
				onClickOutside={() => {
					if (isEmpty(activeAdditionalService)) {
						setShowServices(false);
					}
				}}
			>
				{renderPillsInput()}
			</Popover>
		</div>
	);
}

export default AdditionalServices;
