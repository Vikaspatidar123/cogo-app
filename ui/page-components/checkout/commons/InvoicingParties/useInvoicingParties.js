import { Toast } from '@cogoport/components';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const formatSavedServicesInvoiceTo = ({ services = [] }) => {
	const TRADE_TYPE_MAPPING = {
		export : 'origin',
		import : 'destination',
	};
	return (services || []).map((service) => {
		const id = getByKey(service, 'id');
		const tradeType = getByKey(service, 'trade_type');

		let serviceName = getByKey(service, 'service_name')
            || getByKey(service, 'service_type');
		if (tradeType in TRADE_TYPE_MAPPING) {
			serviceName = `${TRADE_TYPE_MAPPING[tradeType]}_${serviceName}`;
		}

		return {
			label      : startCase(serviceName),
			service_id : id,
			service    : serviceName,
		};
	});
};

const formatServices = ({ savedServicesInvoiceTo, invoicingPartyServices }) => {
	const serviceIdHash = {};
	savedServicesInvoiceTo.forEach((invoiceService) => {
		serviceIdHash[invoiceService.service_id] = invoiceService;
	});

	return invoicingPartyServices.map((invoicingPartyService) => {
		const { service_id } = invoicingPartyService;

		return {
			...invoicingPartyService,
			label: getByKey(serviceIdHash, `[${service_id}].label`) || '',
		};
	});
};

const updateServicesInInvoicingParty = ({
	savedServicesInvoiceToHash,
	invoicingParty,
	serviceId,
	action = '',
}) => {
	if (action === 'insert') {
		return {
			...invoicingParty,
			services: [
				...invoicingParty.services,
				savedServicesInvoiceToHash[serviceId],
			],
		};
	}

	if (action === 'filter') {
		return {
			...invoicingParty,
			services: invoicingParty.services.filter(
				(service) => service.service_id !== serviceId,
			),
		};
	}

	return invoicingParty;
};

const useInvoicingParties = (props) => {
	const geo = getGeoConstants();

	const { detail, invoice, refetchGetCheckout } = props;

	const savedInvoicingParties = getByKey(invoice, 'billing_addresses') || [];

	const services = getByKey(detail, 'services') || {};
	const savedServicesInvoiceTo = formatSavedServicesInvoiceTo({
		services: Object.values(services),
	});

	const savedServicesInvoiceToHash = {};
	savedServicesInvoiceTo.forEach((service) => {
		savedServicesInvoiceToHash[service.service_id] = service;
	});

	const [invoicingParties, setInvoicingParties] = useState(() => savedInvoicingParties.map((savedInvoicingParty) => ({
		...savedInvoicingParty,
		services: formatServices({
			savedServicesInvoiceTo,
			invoicingPartyServices:
                    getByKey(savedInvoicingParty, 'services') || [],
		}),
		state: {
			isSaved           : true,
			toDelete          : false,
			showHiddenContent : false,
		},
	})));

	const [showAddInvoicingPartyModal, setShowAddInvoicingPartyModal] = useState(false);

	const [paymentModes, setPaymentModes] = useState(() => {
		let mode = {};
		savedInvoicingParties.forEach((savedInvoicingParty) => {
			const {
				payment_mode = '',
				payment_term = '',
				payment_method = '',
			} = savedInvoicingParty?.payment_mode_details || {};

			const { credit_option = {} } = savedInvoicingParty;

			mode = {
				...mode,
				[savedInvoicingParty?.id || savedInvoicingParty.length]: {
					credit_days    : credit_option?.selected_credit_days || 0,
					interest       : credit_option?.interest_percent || 0,
					paymentMode    : payment_mode || 'cash',
					paymentTerms   : payment_term,
					paymentMethods : payment_method,
				},
			};
		});
		return mode;
	});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_checkout',
			method : 'post',
		},
		{ manual: true },
	);

	const getPayload = ({ newInvoicingPartiesState }) => {
		const invoicingPartiesPayload = [];
		newInvoicingPartiesState.forEach((invoicingParty) => {
			const {
				id,
				invoice_currency: invoiceCurrency,
				services: invoicePartyServices,
				state: { isSaved, toDelete },
				...billingAddress
			} = invoicingParty;

			const formattedServices = invoicePartyServices.map((service) => ({
				service_id : service.service_id,
				service    : service.service,
			}));

			if (!isSaved && isEmpty(formattedServices)) {
				return;
			}

			const creditMode = paymentModes?.[id];
			const isCreditDataRequired = creditMode?.paymentMode === 'credit';

			const {
				paymentMode,
				paymentTerms,
				paymentMethods,
				interest,
				credit_days,
			} = paymentModes[id] || {};

			const newInvoicingParty = {
				...(isSaved && { id }),
				selected_credit_days : credit_days,
				billing_address      : {
					...billingAddress,
					invoice_currency : invoiceCurrency,
					services         : toDelete ? [] : formattedServices,
					credit_option    : isCreditDataRequired
						? {
							interest_percent     : interest,
							selected_credit_days : credit_days,
							credit_source        : paymentTerms,
						}
						: undefined,
					payment_mode         : paymentMode,
					payment_mode_details : {
						payment_mode   : paymentMode,
						payment_term   : paymentTerms,
						payment_method : paymentMethods,
					},
				},
				credit_option: isCreditDataRequired
					? {
						interest_percent     : interest,
						selected_credit_days : credit_days,
						credit_source        : paymentTerms,
					}
					: undefined,
				payment_mode     : paymentMode,
				invoice_currency : invoiceCurrency,
				is_deleted:
                    toDelete
                    || (isSaved && isEmpty(formattedServices))
                    || false,
				payment_mode_details: {
					payment_mode   : paymentMode,
					payment_term   : paymentTerms,
					payment_method : paymentMethods,
				},
			};

			invoicingPartiesPayload.push(newInvoicingParty);
		});

		return {
			id                  : detail.id,
			invoices_attributes : invoicingPartiesPayload,
		};
	};

	const onSelectInvoicingParty = ({ selectedInvoicingParty }) => {
		setInvoicingParties((prevInvoicingParties) => {
			if (isEmpty(prevInvoicingParties)) {
				const invoicingParty = {
					...selectedInvoicingParty,
					invoice_currency:
                        selectedInvoicingParty.invoice_currency
                        || geo.country.currency.code,
					services : savedServicesInvoiceTo,
					state    : {
						isSaved           : false,
						toDelete          : false,
						showHiddenContent : true,
					},
				};

				return [invoicingParty];
			}

			let updatedInvoicingParties = [];

			let isInvoicingPartyAlreadyPresent = false;
			let alreadyPresentInvoicingParty = {};

			prevInvoicingParties.forEach((invoicingParty) => {
				let newInvoicingParty = invoicingParty;

				isInvoicingPartyAlreadyPresent = invoicingParty.id === selectedInvoicingParty.id;

				if (isInvoicingPartyAlreadyPresent) {
					alreadyPresentInvoicingParty = newInvoicingParty;
					newInvoicingParty = {};
				}

				if (isEmpty(newInvoicingParty)) {
					return;
				}

				updatedInvoicingParties = [
					...updatedInvoicingParties,
					newInvoicingParty,
				];
			});

			const updatedSelectedInvoicingParty = {
				invoice_currency : GLOBAL_CONSTANTS.currency_code.INR,
				...selectedInvoicingParty,
				id               : selectedInvoicingParty?.id || prevInvoicingParties.length,
				services         : [],
				state            : {
					isSaved: false,
					...(isInvoicingPartyAlreadyPresent
                        && alreadyPresentInvoicingParty.state),
					toDelete          : false,
					showHiddenContent : true,
				},
			};

			setPaymentModes((pv) => ({
				...pv,
				[updatedSelectedInvoicingParty?.id]: {
					credit_days : 0,
					interest    : 0,
					paymentMode : 'cash',
				},
			}));

			return [...updatedInvoicingParties, updatedSelectedInvoicingParty];
		});
	};

	const setShowHiddenContent = ({ id, action }) => {
		setInvoicingParties((prevInvoicingParties) => prevInvoicingParties.map((invoicingParty) => {
			if (invoicingParty.id !== id) {
				return invoicingParty;
			}

			const showHiddenContentActionMapping = {
				true   : true,
				false  : false,
				toggle : !(
					getByKey(invoicingParty, 'state.showHiddenContent')
                        || false
				),
			};

			const updatedInvoicingParty = {
				...invoicingParty,
				state: {
					...invoicingParty.state,
					showHiddenContent:
                            showHiddenContentActionMapping[action] || false,
				},
			};

			return updatedInvoicingParty;
		}));
	};

	const saveInvoicingParties = async ({ newInvoicingPartiesState }) => {
		try {
			const payload = getPayload({ newInvoicingPartiesState });

			await trigger({
				data: payload,
			});

			Toast.success('Invoicing Party saved successfully');

			(invoicingParties || []).forEach((invoicingParty) => {
				setShowHiddenContent({
					id     : invoicingParty?.id,
					action : 'false',
				});
			});

			refetchGetCheckout?.();
		} catch (error) {
			if (error?.response?.data?.credit) {
				showErrorsInToast(error?.data?.credit, {
					autoClose       : 7000,
					hideProgressBar : false,
					closeOnClick    : true,
					pauseOnHover    : true,
				});
			} else if (error?.response?.data?.payment_mode) {
				showErrorsInToast(error?.data?.payment_mode, {
					autoClose       : 7000,
					hideProgressBar : false,
					closeOnClick    : true,
					pauseOnHover    : true,
				});
			}
		}
	};

	const onChangeInvoicingPartyCurrency = ({ id, invoiceCurrency }) => {
		setInvoicingParties((prevInvoicingParties) => prevInvoicingParties.map((invoicingParty) => ({
			...invoicingParty,
			...(invoicingParty.id === id && {
				invoice_currency: invoiceCurrency,
			}),
		})));
	};

	const onChangeInvoicingPartyServices = ({
		invoicingParty: changedInvoicingParty,
		serviceId,
	}) => {
		setInvoicingParties((prevInvoicingParties) => {
			const isServicePresentInChangedInvoicingParty = changedInvoicingParty.services.some(
				(service) => service.service_id === serviceId,
			);
			const changedInvoicingPartyIndex = prevInvoicingParties.findIndex(
				(invoicingParty) => invoicingParty.id === changedInvoicingParty.id,
			);
			const updateInvoicingPartyIndex = changedInvoicingPartyIndex === 0 ? 1 : 0;
			return prevInvoicingParties.map((invoicingParty, index) => {
				let newInvoicingParty = updateServicesInInvoicingParty({
					savedServicesInvoiceToHash,
					invoicingParty,
					serviceId,
					action: 'filter',
				});

				if (
					(index === changedInvoicingPartyIndex
                        && !isServicePresentInChangedInvoicingParty)
                    || (index === updateInvoicingPartyIndex
                        && isServicePresentInChangedInvoicingParty)
				) {
					newInvoicingParty = updateServicesInInvoicingParty({
						savedServicesInvoiceToHash,
						invoicingParty : newInvoicingParty,
						serviceId,
						action         : 'insert',
					});
				}

				return newInvoicingParty;
			});
		});
	};

	const deleteInvoicingParty = ({
		invoicingParty: invoicingPartyToDelete,
	}) => {
		const invoicingPartyToDeleteServices = invoicingPartyToDelete.services;

		let updatedInvoicingPartyToDelete = invoicingPartyToDelete;
		let updatedInvoicingParties = [];

		invoicingParties.forEach((invoicingParty) => {
			const isDeletedInvoicingParty = invoicingParty.id === invoicingPartyToDelete.id;

			if (isDeletedInvoicingParty) {
				updatedInvoicingPartyToDelete = {
					...updatedInvoicingPartyToDelete,
					services : [],
					state    : {
						...updatedInvoicingPartyToDelete.state,
						toDelete: true,
					},
				};

				return;
			}

			updatedInvoicingParties = [
				...updatedInvoicingParties,
				invoicingParty,
			];
		});

		updatedInvoicingParties[0] = {
			...updatedInvoicingParties[0],
			services: [
				...updatedInvoicingParties[0].services,
				...invoicingPartyToDeleteServices,
			],
		};

		if (!invoicingPartyToDelete.state.isSaved) {
			setInvoicingParties(updatedInvoicingParties);

			return;
		}

		updatedInvoicingParties = updatedInvoicingParties.filter(
			(invoicingParty) => !isEmpty(invoicingParty.services),
		);

		updatedInvoicingParties = [
			...updatedInvoicingParties,
			updatedInvoicingPartyToDelete,
		];

		saveInvoicingParties({
			newInvoicingPartiesState: updatedInvoicingParties,
		});
	};

	const saveInvoicingPartiesServicesAndInvoiceCurrency = () => {
		saveInvoicingParties({
			newInvoicingPartiesState: invoicingParties,
		});
	};

	const filteredInvoicingParties = invoicingParties.filter(
		(invoicingParty) => !invoicingParty.state.toDelete,
	);

	return {
		savedServicesInvoiceTo,
		invoicingParties: filteredInvoicingParties,
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		onSelectInvoicingParty,
		setShowHiddenContent,
		onChangeInvoicingPartyCurrency,
		onChangeInvoicingPartyServices,
		deleteInvoicingParty,
		saveInvoicingPartiesServicesAndInvoiceCurrency,
		loading,
		paymentModes,
		setPaymentModes,
	};
};

export default useInvoicingParties;
