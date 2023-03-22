// import {
// 	ManualCreation,
// 	UploadSheet,
// } from '@cogo/product/rfq/components/CreateRfq';

import ManualCreation from '../components/CreateRfq/ManualCreation';
import ReasonType from '../components/CreateRfq/ReasonType';
import RequestType from '../components/CreateRfq/RequestType';

const getComponent = ({ currentStep, watchRequestType, type }) => {
	if (currentStep === 1) return ReasonType;

	if (currentStep === 2) return RequestType;

	if (
		currentStep === 3
		&& (type === 'manual_entry' || watchRequestType === 'manual_entry')
	) {
		return ManualCreation;
	}

	// if (
	// 	currentStep === 3
	// 	&& (type === 'cogo_format'
	// 		|| type === 'unstructured'
	// 		|| watchRequestType === 'cogo_format'
	// 		|| watchRequestType === 'unstructured')
	// ) {
	// 	return UploadSheet;
	// }

	return ReasonType;
};

export default getComponent;
