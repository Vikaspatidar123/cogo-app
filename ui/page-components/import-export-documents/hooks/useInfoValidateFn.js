import { Toast, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const MAPPING = {
	ocean : 'SEA',
	air   : 'AIR',
};
// eslint-disable-next-line max-len
const TOOLTIP_CONTENT =	'HS codes can provide greater transparency and clarity on the required documentation for the combination of your cargo and destination countries';

const useInfoValidateFn = ({
	verifySixDigitHs,
	watchHsCode,
	isQuotaLeft = false,
	setShowValidate,
	transportDetails,
	setTransportDetails,
	refetchDraft,
	isUserSubscribed = false,
	setPaymentOptionsModal,
	checkPaymentStatus,
	setValue,
	billId = '',
	push,
	getValues,
	selectedData,
	watchExport = '',
	watchImport = '',
	setShowPendingModal,
	styles,
}) => {
	const { hsCode = '', name: productName = '', description = '' } = selectedData || {};

	const setValues = useCallback((valObject = {}) => {
		Object.keys(valObject).forEach((key) => {
			setValue(key, valObject?.[key]);
		});
	}, [setValue]);

	useEffect(() => {
		if (!isEmpty(hsCode)) {
			setValue('hsCode', hsCode);
			setTransportDetails((prev) => ({
				...prev,
				hsCode,
			}));
		}
		if (!isEmpty(productName)) {
			setValue('productName', productName);
		} else if (!isEmpty(description)) {
			setValue('productName', description);
		}
	}, [selectedData]);

	useEffect(() => {
		if (watchExport && watchImport && watchExport === watchImport) {
			Toast.error('Same country is selected for import and export.');
		}
	}, [watchExport, watchImport]);

	const prefillData = useCallback(() => {
		if (typeof window === 'undefined') return;
		const localStorageFormData = JSON.parse(localStorage.getItem('transportDetails'));
		if (localStorageFormData) {
			const {
				exportCountry = {},
				importCountry = {},
				transportMode,
				hsCode: localStorageHscode,
				manufacturingCountry = {},
				productName: localStorageName = '',
			} = localStorageFormData || {};

			const obj = {
				exportCountry        : exportCountry?.id,
				importCountry        : importCountry?.id,
				transportMode,
				hsCode               : localStorageHscode,
				manufacturingCountry : manufacturingCountry?.id || '',
				productName          : localStorageName,
			};
			setValues(obj);
			setTransportDetails(localStorageFormData);
			localStorage.removeItem('transportDetails');
		}
	}, [setTransportDetails, setValues]);

	useEffect(() => {
		prefillData();
	}, [prefillData]);

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		}
	}, [billId]);

	const getPayloadData = (data) => {
		const header = {
			originCountryCode      : transportDetails?.exportCountry?.country_code,
			destinationCountryCode : transportDetails?.importCountry?.country_code,
			modeOfTransport        : MAPPING?.[data?.transportMode],
			tradeEngineInputId     : transportDetails?.tradeEngineInputId,
		};
		const lineItem = [
			{
				originCN: '',
				manufactureOrigin:
					transportDetails?.manufacturingCountry?.country_code
					|| transportDetails?.exportCountry?.country_code,
				originHs      : '',
				destinationHs : data?.hsCode,
				productName   : data?.productName,
			},
		];
		return {
			header,
			lineItem,
		};
	};

	const renderLabel = (name, label) => {
		if (name === 'hsCode') {
			return (
				<div className={styles.label_container}>
					{label}
					<Tooltip
						content={TOOLTIP_CONTENT}
						placement="right-start"
						animation="shift-toward"
					>
						<div>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
			);
		}
		return <p>{label}</p>;
	};

	const getKey = (name) => {
		if (['exportCountry', 'importCountry', 'manufacturingCountry'].includes(name)) { return getValues(name); }

		return name;
	};

	const buildData = () => {
		const {
			manufacturingCountry = '',
			exportCountry = {},
			importCountry = {},
			transportMode,
			hsCode: storeHscode,
		} = transportDetails || {};

		const exportCountryObj = {
			id            : exportCountry?.id,
			name          : exportCountry?.name,
			country_code  : exportCountry?.country_code,
			flag_icon_url : exportCountry?.flag_icon_url,
			latitude      : exportCountry?.latitude,
			longitude     : exportCountry?.longitude,
		};
		const importCountryObj = {
			id            : importCountry?.id,
			name          : importCountry?.name,
			country_code  : importCountry?.country_code,
			flag_icon_url : importCountry?.flag_icon_url,
			latitude      : importCountry?.latitude,
			longitude     : importCountry?.longitude,
		};
		const manufacturing = {
			id            : manufacturingCountry?.id,
			name          : manufacturingCountry?.name,
			country_code  : manufacturingCountry?.country_code,
			flag_icon_url : manufacturingCountry?.flag_icon_url,
		};
		return {
			exportCountry        : exportCountryObj,
			importCountry        : importCountryObj,
			manufacturingCountry : manufacturing,
			transportMode,
			hsCode               : storeHscode,
		};
	};

	const validateSubmitHandler = async (data) => {
		const { header, lineItem } = getPayloadData(data);

		const resp = await refetchDraft({ header, lineItem, hsCode: data?.hsCode });

		if (resp) {
			if (!billId) {
				const localStorageData = buildData({ name: data?.productName, id: resp });
				console.log(localStorageData, 'localStorageData');
				localStorage.setItem('transportDetails', JSON.stringify({ ...localStorageData }));
				push(
					'/saas/premium-services/import-export-doc/[trade_engine_id]',
					`/saas/premium-services/import-export-doc/${resp}`,
				);
			} else {
				push(`/saas/premium-services/import-export-doc/${resp}/result?billId=${billId}`);
			}
		}
	};

	const changeHandler = (name, value) => {
		if (name === 'transportMode') {
			setTransportDetails((prev) => ({
				...prev,
				transportMode: value?.value,
			}));
		} else {
			setTransportDetails((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const withHsHandler = (data) => {
		if (isQuotaLeft && isUserSubscribed) {
			validateSubmitHandler(data);
		} else {
			setPaymentOptionsModal(true);
		}
	};

	const submitHandler = async (data) => {
		const { hsCode: formHsCode } = data || {};

		if (formHsCode) {
			const resp = await verifySixDigitHs({ hsCode: watchHsCode });
			if (resp) {
				if (isQuotaLeft && isUserSubscribed) {
					setShowValidate(true);
				} else {
					setPaymentOptionsModal(true);
				}
			}
		} else {
			setShowPendingModal(true);
		}
	};

	const errorHandler = () => {
		Toast.error('Fill all mandatory details');
	};

	return {
		submitHandler,
		changeHandler,
		validateSubmitHandler,
		renderLabel,
		getKey,
		withHsHandler,
		errorHandler,
	};
};

export default useInfoValidateFn;
