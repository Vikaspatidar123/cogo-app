import { startCase } from '@cogoport/front/utils';
import {
	FadeIn,
	ServiceContainer,
	ServiceHeader,
	ServiceTitle,
	ServiceMain,
	FreightListContainer,
	FreightItemContainer,
	FreightItemHeader,
	FreightStroke,
	FreightItemHeaderLeft,
	FreightItemHeaderRight,
	FreightTitle,
	FreightItemMain,
} from './styles';
import DownArrowIcon from './icons/arrowIcon.svg';
import FREIGHT_COMPONENT_MAPPING from './components';
import useTradeLanes from './hooks/useTradeLanes';
import KEY_ICON_MAPPING from './icons';
import AnimatedTick from '../AnimatedTick';

const SERVICE_MAPPING = {
	buyServices: {
		key: 'buyServices',
		title: 'Buy Services',
		borderColor: '#cddbff',
	},
	sellServices: {
		key: 'sellServices',
		title: 'Sell Services',
		borderColor: '#b4f3be',
	},
};

const FREIGHT_COLORS_MAPPING = {
	fcl_freight: '#356EFD;',
	lcl_freight: '#66ACF7',
	air_freight: '#EF9B9B',
	ftl_freight: '#81C0AF;',
	haulage_freight: '#81C0AF;',
	fcl_customs: '#81C0AF;',
	lcl_customs: '#81C0AF;',
	air_customs: '#81C0AF;',
	trailer_freight: '#81C0AF;',
	fcl_cfs: '#81C0AF;',
	ltl_freight: '#81C0AF',
};

function TradeLanesCommons(props) {
	const { showServicesForm = {}, setShowServicesForm = () => {} } =
		useTradeLanes(props);

	const { completedServiceForm = {}, isProfile = false } = props;

	const onClickToggleFreightItem =
		({ serviceKey = '', freightKey }) =>
		() => {
			setShowServicesForm({
				...showServicesForm,
				[serviceKey]: {
					...showServicesForm[serviceKey],
					[freightKey]: !showServicesForm[serviceKey][freightKey],
				},
			});
		};

	const renderFreightItem = ({ serviceKey, freightKey }) => {
		const FreightComponent = FREIGHT_COMPONENT_MAPPING[serviceKey][freightKey];

		if (!FreightComponent) {
			return null;
		}

		const KeyIconComponent = KEY_ICON_MAPPING[freightKey];

		return (
			<FreightItemContainer>
				<FreightItemHeader
					onClick={onClickToggleFreightItem({ serviceKey, freightKey })}
				>
					<FreightStroke color={FREIGHT_COLORS_MAPPING[freightKey]} />

					<FreightItemHeaderLeft>
						<KeyIconComponent style={{ width: '24px', height: '24px' }} />

						<FreightTitle>{startCase(freightKey).toUpperCase()}</FreightTitle>
					</FreightItemHeaderLeft>

					<FreightItemHeaderRight>
						{(completedServiceForm[serviceKey] || []).includes(freightKey) ? (
							<AnimatedTick radius={8} style={{ marginRight: 8 }} />
						) : null}

						<DownArrowIcon
							style={{
								transform: showServicesForm[serviceKey][freightKey]
									? 'rotateX(180deg)'
									: undefined,
							}}
						/>
					</FreightItemHeaderRight>
				</FreightItemHeader>

				<FadeIn
					type={showServicesForm[serviceKey][freightKey] ? 'enter' : 'exit'}
				>
					<FreightItemMain>
						<FreightComponent
							props={props}
							serviceType={serviceKey}
							frieghtType={freightKey}
							setShowServicesForm={setShowServicesForm}
						/>
					</FreightItemMain>
				</FadeIn>
			</FreightItemContainer>
		);
	};

	const renderFreightList = ({ serviceKey = '' }) => {
		const freightComponentsInSequenceKeys = Object.keys(
			FREIGHT_COMPONENT_MAPPING[serviceKey],
		);

		return (
			<FreightListContainer>
				{freightComponentsInSequenceKeys.map((freightKey) => {
					if (!(freightKey in showServicesForm[serviceKey])) {
						return null;
					}

					return renderFreightItem({ serviceKey, freightKey });
				})}
			</FreightListContainer>
		);
	};

	const renderServices = () => {
		return ['buyServices', 'sellServices'].map((service) => {
			if (isProfile && service === 'sellServices') {
				return null;
			}

			if (!(service in showServicesForm)) {
				return null;
			}

			const { borderColor = '', title = '' } = SERVICE_MAPPING[service];

			return (
				<ServiceContainer>
					{Object.keys(showServicesForm).length > 1 && (
						<ServiceHeader>
							<ServiceTitle borderColor={borderColor}>{title}</ServiceTitle>
						</ServiceHeader>
					)}

					<ServiceMain>
						{renderFreightList({ serviceKey: service })}
					</ServiceMain>
				</ServiceContainer>
			);
		});
	};

	return <section>{renderServices()}</section>;
}

export default TradeLanesCommons;
