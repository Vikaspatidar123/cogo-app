import {
	Modes,
	FCLControls,
	FCLServices,
	FCLControlsAdvaced,
	QuickSearchControls,
	LCLControls,
	LCLQuickSearchControls,
	LCLControlsAdvaced,
	FCLSort,
	LCLSort,
	AirSort,
	AirControls,
	AirQuickSearchControls,
	AirControlsAdvaced,
	TrailerControls,
	TrailerQuickSearchControls,
	FTLControls,
	FTLQuickSearchControls,
	LTLControls,
	LTLQuickSearchControls,
	LCLCustomsControls,
	LCLCustomsQuickSearchControls,
	FCLCustomsControls,
	FCLCustomsQuickSearchControls,
	AirCustomsControls,
	AirCustomsQuickSearchControls,
	FCLHaulageControls,
	FCLHaulageQuickSearchControls,
	FCLLocalsControls,
	LCLLocalsControls,
	AIRLocalsControls,
} from '../../configurations';

const getConfiguration = (
	type,
	mode,
	isChannelPartner = false,
	setOperatorName = () => {},
	is_org_pass_through,
) => {
	if (type === 'modes') {
		return Modes;
	}

	const configs = {
		fcl_freight_controls                    : FCLControls(),
		fcl_freight_services                    : FCLServices,
		'fcl_freight_advanced-controls'         : FCLControlsAdvaced(),
		fcl_freight_sort                        : FCLSort,
		'fcl_freight_controls-quick-search'     : QuickSearchControls,
		lcl_freight_controls                    : LCLControls,
		'lcl_freight_advanced-controls'         : LCLControlsAdvaced(isChannelPartner),
		'lcl_freight_controls-quick-search'     : LCLQuickSearchControls,
		lcl_freight_sort                        : LCLSort,
		air_freight_sort                        : AirSort,
		air_freight_controls                    : AirControls,
		'air_freight_advanced-controls'         : AirControlsAdvaced(),
		'air_freight_controls-quick-search'     : AirQuickSearchControls,
		trailer_freight_controls                : TrailerControls,
		'trailer_freight_controls-quick-search' : TrailerQuickSearchControls,
		ftl_freight_controls                    : FTLControls,
		'ftl_freight_advanced-controls'         : [],
		'ftl_freight_controls-quick-search'     : FTLQuickSearchControls,
		ltl_freight_controls                    : LTLControls,
		'ltl_freight_controls-quick-search'     : LTLQuickSearchControls,
		lcl_customs_controls                    : LCLCustomsControls(),
		'lcl_customs_controls-quick-search'     : LCLCustomsQuickSearchControls,
		fcl_customs_controls                    : FCLCustomsControls(),
		'fcl_customs_controls-quick-search'     : FCLCustomsQuickSearchControls,
		air_customs_controls                    : AirCustomsControls(),
		'air_customs_controls-quick-search'     : AirCustomsQuickSearchControls,
		haulage_freight_controls                : FCLHaulageControls,
		'haulage_freight_controls-quick-search' : FCLHaulageQuickSearchControls,
		fcl_freight_local_controls              : FCLLocalsControls(
			setOperatorName,
			is_org_pass_through,
		),
		lcl_freight_local_controls : LCLLocalsControls(setOperatorName),
		air_freight_local_controls : AIRLocalsControls(setOperatorName),
	};

	return configs[`${mode}_${type}`] || [];
};

export default getConfiguration;
