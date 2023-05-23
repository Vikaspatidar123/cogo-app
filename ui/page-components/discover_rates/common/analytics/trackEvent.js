/**
 * Analytics function for tracking event along with relevant data
 * @param {string}      	eventName - Name of the event. Eg `Click on Search`, `Made Transaction`
 * @param {Object} 			[eventData] - A serialized JSON of the data that needs to be send along with the event
 */

import { UNDEFINED_ATTRIBUTES } from '@/ui/commons/constants/undefined_attributes';

const trackEvent = (eventName, eventData) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			...UNDEFINED_ATTRIBUTES,
			...eventData,
			_type : 'event',
			event : eventName,
		});
	}
};

export default trackEvent;
