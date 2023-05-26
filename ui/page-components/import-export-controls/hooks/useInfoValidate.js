import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@cogo/next';
import useForm from '@cogoport/front/hooks/useFormCogo';
import { isEmpty } from '@cogoport/utils';
import useVerifyHsCode from './useVerifyHsCode';
import useDraft from './useDraft';
import controlsConfig from '../configurations/controlsConfig';
import useCheckPaymentStatus from './useCheckPaymentStatus';
import { useWindowDimensions } from '../../../common/utils/getMobileView';

const useInfoValidate = ({
	isQuotaLeft = false,
	isUserSubscribed = false,
	formInfo,
	setFormInfo,
	setShowValidate,
	setPaymentOptionsModal,
	selectedData,
	isImportHs,
	paymentSuccessHandler,
	setShowPendingModal,
	setPrevHs,
	prevHs,
}) => {
	const { query, push } = useRouter();
	const [isMobile, setIsMobile] = useState(false);

	const { billId = '' } = query;
	const initialRef = useRef({ fillExportHs: true, fillImportHs: true });

	const { width = '' } = useWindowDimensions();

	const {
		hsCode = '',
		name: productName = '',
		description = '',
	} = selectedData || {};

	const { verifySixDigitHs, verifySixDigitLoading } = useVerifyHsCode();
	const { refetchDraft, draftLoading, getDraftFn } = useDraft();
	const { checkPaymentStatus, stop } = useCheckPaymentStatus({
		billId,
		paymentSuccessHandler,
		setShowPendingModal,
	});

	const formProps = useForm(controlsConfig);
	const { getValues, setValues, setValue, watch } = formProps;

	const [watchImportHs, watchExportHs, watchImportCountry, watchExportCountry] =
		watch(['importHsCode', 'exportHsCode', 'importCountry', 'exportCountry']);

	useEffect(() => {
		if (width < 1154) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		}
	}, [billId]);

	const prevHsChangeHandler = (hsKey) => {
		setPrevHs((prev) => ({ ...prev, [hsKey]: '' }));
	};

	useEffect(() => {
		if (watchImportCountry && !isEmpty(prevHs)) {
			prevHsChangeHandler('importHs');
		}
	}, [watchImportCountry]);

	useEffect(() => {
		if (watchExportCountry && !isEmpty(prevHs)) {
			prevHsChangeHandler('exportHs');
		}
	}, [watchExportCountry]);

	const setFormValue = (key, value) => {
		setValue(key, value);
		setFormInfo((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	useEffect(() => {
		if (!isEmpty(hsCode)) {
			if (isImportHs) {
				setFormValue('importHsCode', hsCode);
				if (!isEmpty(productName)) {
					setValue('productName', productName);
				} else if (!isEmpty(description)) {
					setValue('productName', description);
				}
			} else {
				setFormValue('exportHsCode', hsCode);
			}
		}
	}, [selectedData]);

	useEffect(() => {
		if (
			watchExportHs.length >= 6 &&
			watchImportHs === '' &&
			initialRef.current.fillImportHs
		) {
			const importHs = watchExportHs.substring(0, 6);
			setFormValue('importHsCode', importHs);
			initialRef.current.fillImportHs = false;
		}
		if (
			watchExportHs === '' &&
			watchImportHs.length >= 6 &&
			initialRef.current.fillExportHs
		) {
			const exportHs = watchImportHs.substring(0, 6);
			setFormValue('exportHsCode', exportHs);
			initialRef.current.fillExportHs = false;
		}
	}, [watchImportHs, watchExportHs]);

	const prefillData = () => {
		if (typeof window === 'undefined') return;
		const localStorageFormData = JSON.parse(localStorage.getItem('formInfo'));
		if (localStorageFormData) {
			const {
				exportCountry = {},
				importCountry = {},
				manufacturingCountry = {},
				...rest
			} = localStorageFormData || {};

			const obj = {
				exportCountry: exportCountry?.id,
				importCountry: importCountry?.id,
				manufacturingCountry: manufacturingCountry?.id || '',
				...rest,
			};
			setValues(obj);
			setFormInfo(localStorageFormData);
			localStorage.removeItem('formInfo');
		}
	};

	useEffect(() => {
		prefillData();
	}, []);

	const getKey = (name) => {
		if (
			['exportCountry', 'importCountry', 'manufacturingCountry'].includes(name)
		)
			return getValues(name);

		return name;
	};

	const buildData = ({ name, id }) => {
		const {
			importCountry = {},
			exportCountry = {},
			manufacturingCountry = {},
			...rest
		} = formInfo;

		const exportCountryObj = {
			id: exportCountry?.id || '',
			name: exportCountry?.name || '',
			country_code: exportCountry?.country_code || '',
			flag_icon_url: exportCountry?.flag_icon_url || '',
			latitude: exportCountry?.latitude || '',
			longitude: exportCountry?.longitude || '',
		};
		const importCountryObj = {
			id: importCountry?.id || '',
			name: importCountry?.name || '',
			country_code: importCountry?.country_code || '',
			flag_icon_url: importCountry?.flag_icon_url || '',
			latitude: importCountry?.latitude || '',
			longitude: importCountry?.longitude || '',
		};
		const manufacturing = {
			id: manufacturingCountry?.id || '',
			name: manufacturingCountry?.name || '',
			country_code: manufacturingCountry?.country_code || '',
			flag_icon_url: manufacturingCountry?.flag_icon_url || '',
		};
		return {
			exportCountry: exportCountryObj,
			importCountry: importCountryObj,
			manufacturingCountry: manufacturing,
			productName: name,
			tradeEngineInputId: id,
			...rest,
		};
	};

	const changeHandler = (name, value) => {
		setFormInfo((prev) => ({
			...prev,
			[name]:
				name === 'transportMode' || name === 'productUse'
					? value?.value
					: value,
		}));
	};

	const btnSubtmitHandler = () => {
		if (isQuotaLeft && isUserSubscribed) {
			setShowValidate(true);
		} else {
			setPaymentOptionsModal(true);
		}
	};

	const submitHandler = async (data) => {
		const { importHsCode, exportHsCode = '' } = data;

		const importHs = await verifySixDigitHs({ hsCode: importHsCode });
		const exportHs = await verifySixDigitHs({ hsCode: exportHsCode });

		if (importHs && exportHs) {
			if (importHsCode.substring(0, 6) !== exportHsCode.substring(0, 6)) {
				setShowPendingModal(true);
			} else {
				btnSubtmitHandler();
			}
		}
	};

	const validateSubmitHandler = async (data) => {
		const resp = await refetchDraft({ data, formInfo });
		const localStorageData = buildData({ name: data?.productName, id: resp });
		localStorage.setItem('formInfo', JSON.stringify({ ...localStorageData }));

		if (resp) {
			if (!billId) {
				push(`/saas/premium-services/import-export-controls/${resp}`);
			} else {
				push(
					`/saas/premium-services/import-export-controls/${resp}/result?billId=${billId}`,
				);
			}
		}
	};

	return {
		formProps,
		getKey,
		controlsConfig,
		loading: verifySixDigitLoading || draftLoading,
		submitHandler,
		changeHandler,
		validateSubmitHandler,
		stop,
		btnSubtmitHandler,
		getDraftFn,
		isMobile,
		watchImportCountry,
		watchExportCountry,
	};
};

export default useInfoValidate;
