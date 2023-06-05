import { isEmpty } from '@cogoport/utils';

import LoadingState from './commons/LoadingState';
import AIR from './components/AIR';
import AirCustoms from './components/AirCustoms';
import FCL from './components/FCL';
import FclCustoms from './components/FclCustoms';
import FCLLocals from './components/FCLLocals';
import FTL from './components/FTL';
import HAULAGE from './components/HAULAGE';
import LCL from './components/LCL';
import LclCustoms from './components/LclCustoms';
import LTL from './components/LTL';
import TRAILER from './components/TRAILER';
import useGetCheckout from './hooks/getCheckout';
import useGetOrganization from './hooks/useGetOrganization';

const COMPONENT_MAPPING = {
	fcl_freight       : FCL,
	lcl_freight       : LCL,
	air_freight       : AIR,
	ftl_freight       : FTL,
	ltl_freight       : LTL,
	trailer_freight   : TRAILER,
	haulage_freight   : HAULAGE,
	fcl_freight_local : FCLLocals,
	fcl_customs       : FclCustoms,
	lcl_customs       : LclCustoms,
	air_customs       : AirCustoms,
};

function NewCheckout() {
	const {
		rate,
		summary,
		detail,
		cogopoint_data,
		invoice,
		refetch,
		loading,
		currencyConversions,
	} = useGetCheckout();

	const { importer_exporter_id: organizationId } = detail;

	const { data: organization } = useGetOrganization({
		organizationId,
	});

	const { primary_service = '' } = detail;

	const ServiceComponent = COMPONENT_MAPPING[primary_service];

	const common_component_props = {
		summary,
		rate,
		refetch,
		invoice,
		organization,
		detail,
		cogopoint_data,
		getCheckoutLoading: loading,
		currencyConversions,
	};

	if (isEmpty(summary)) {
		return <LoadingState />;
	}

	return <ServiceComponent {...common_component_props} />;
}
export default NewCheckout;
