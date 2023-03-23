import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import SelectControler from '@cogo/business-modules/form/components/Controlled/ControlledLocation';
import Icon from '@cogo/deprecated_legacy/icons/Icon';
import { useSelector } from '@cogo/store';
import { replace } from '@cogo/i18n';
import { isEmpty } from '@cogoport/front/utils';
import {
	Container,
	Section,
	Arrow,
	Label,
	ArrowSection,
	ErrorMsg,
} from './styles';
import TouchPoints from '../TouchPoint';

const Route = (
	{
		origin = {},
		destination = {},
		location = {},
		setLocation = () => {},
		keywords = [],
		index = 0,
		mobile = false,
		mode = '',
		searchData,
		error: errorMsg,
		typeOfJourney = '',
		extraParams,
	},
	ref,
) => {
	const { showArrow = true } = destination || {};
	const { org_id: app_org_id } = useSelector(({ general }) => ({
		org_id: general.query.org_id,
	}));

	const org_id = extraParams?.id || app_org_id;

	const ftlRef = useRef({});
	const validate = async () => {
		const validateData = await ftlRef.current.TouchPointsRef.handleSubmit();

		return validateData;
	};

	const handleLabel = (locationKey) => {
		const originLabel = (
			<Label>{showArrow ? 'Pickup Point ' : origin?.label}</Label>
		);
		const destinationLabel = (
			<Label>{showArrow ? 'Delivery Point' : destination?.label}</Label>
		);

		if (mobile) {
			if (locationKey === 'origin') {
				return originLabel;
			}
			return destinationLabel;
		}
		if (!mobile && index === 0) {
			if (locationKey === 'origin') {
				return originLabel;
			}
			return destinationLabel;
		}
		return null;
	};

	const imperativeHandle = () => {
		return {
			handleSubmit: async () => {
				const isError = Object.keys(location).length !== 2;
				const ans = await validate();

				return {
					hasError: isError,
					...(!isError && { values: { location, ...ans } }),
					...(isError && {
						errors: {
							errorMsg: {
								origin: isEmpty(location.origin),
								destination: isEmpty(location.destination),
							},
						},
					}),
				};
			},
		};
	};

	useImperativeHandle(ref, imperativeHandle);
	return (
		<Container id="search_form_route_container">
			<Section className={typeOfJourney}>
				{handleLabel('origin')}

				<SelectControler
					id={`search_${origin.name}`}
					{...origin}
					caret={false}
					placeholder={replace(origin.placeholder || '', keywords)}
					noOptionsMessage="Type to search..."
					disabled={index !== 0}
					value={location.origin?.id}
					params={{
						...(origin.params || {}),
						filters: origin?.params?.filters,
						preferences: {
							organization_id: org_id,
							service_type: mode,
						},
					}}
					handleChange={(obj) => {
						setLocation({
							...location,
							origin: { ...(obj || {}), formName: origin.display_name },
						});
					}}
					searchParams={{
						intent: 'rate_search',
						organization_id: org_id,
						service_type: mode,
					}}
				/>
				{errorMsg?.origin ? <ErrorMsg>Origin Port is required</ErrorMsg> : null}
			</Section>

			<ArrowSection>
				{showArrow && (
					<Arrow>
						<Icon type="arrow-search" size={1.1} />
					</Arrow>
				)}

				<TouchPoints
					searchData={searchData}
					validate={validate}
					ref={(r) => {
						ftlRef.current.TouchPointsRef = r;
					}}
					typeOfJourney={typeOfJourney}
					location={location}
				/>
			</ArrowSection>

			<Section className={typeOfJourney}>
				{handleLabel('destination')}
				<SelectControler
					id={`search_${destination.name}`}
					{...destination}
					caret={false}
					optionsListKey="locations_v2"
					noOptionsMessage="Type to search..."
					placeholder={replace(destination.placeholder || '', keywords)}
					value={location.destination?.id}
					handleChange={(obj) => {
						setLocation({
							...location,
							destination: {
								...(obj || {}),
								formName: destination.display_name,
							},
						});
					}}
					params={{
						...(destination.params || {}),
						filters: destination?.params?.filters,
						preferences: {
							organization_id: org_id || org_id,
							service_type: mode,
						},
					}}
					searchParams={{
						intent: 'rate_search',
						organization_id: org_id,
						service_type: mode,
					}}
				/>
				{errorMsg?.destination ? (
					<ErrorMsg>Destination Port is required</ErrorMsg>
				) : null}
			</Section>
		</Container>
	);
};

export default forwardRef(Route);
