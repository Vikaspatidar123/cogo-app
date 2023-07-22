/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

import controlsConfig from '../configurations/controlsConfig';

import useCheckPaymentStatus from './useCheckPaymentStatus';
import useDraft from './useDraft';
import useVerifyHsCode from './useVerifyHsCode';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';

const COUNTRIES = ['exportCountry', 'importCountry', 'manufacturingCountry'];
const HS_CODE_LENGTH = 6;

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
	const { hsCode = '', name: productName = '', description = '' } = selectedData || {};

	const { query, push } = useRouter();
	const { billId = '' } = query;

	const initialRef = useRef({ fillExportHs: true, fillImportHs: true });

	const formProps = useForm();
	const { getValues, setValue, watch } = formProps;

	const [watchImportHs, watchExportHs,
		watchImportCountry,
		watchExportCountry] = watch(['importHsCode', 'exportHsCode', 'importCountry', 'exportCountry']);

	const { verifySixDigitHs, verifySixDigitLoading } = useVerifyHsCode();
	const { refetchDraft, draftLoading, getDraftFn } = useDraft();
	const { checkPaymentStatus, stop } = useCheckPaymentStatus({
		billId,
		paymentSuccessHandler,
		setShowPendingModal,
	});

	const prevHsChangeHandler = (hsKey) => {
		setPrevHs((prev) => ({ ...prev, [hsKey]: '' }));
	};

	const setFormValue = (key, value) => {
		setValue(key, value);
		setFormInfo((prev) => ({
			...prev,
			[key]: value,
		}));
	};

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

			const setKeys = Object.keys(rest || {});
			setKeys.forEach((item) => setValue(item, rest?.[item]));

			setValue('exportCountry', exportCountry?.id);
			setValue('importCountry', importCountry?.id);
			setValue('manufacturingCountry', manufacturingCountry?.id);

			setFormInfo(localStorageFormData);
			localStorage.removeItem('formInfo');
		}
	};

	const getKey = (name) => {
		if (COUNTRIES.includes(name)) return getValues(name);

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
			id            : exportCountry?.id || '',
			name          : exportCountry?.name || '',
			country_code  : exportCountry?.country_code || '',
			flag_icon_url : exportCountry?.flag_icon_url || '',
			latitude      : exportCountry?.latitude || '',
			longitude     : exportCountry?.longitude || '',
		};
		const importCountryObj = {
			id            : importCountry?.id || '',
			name          : importCountry?.name || '',
			country_code  : importCountry?.country_code || '',
			flag_icon_url : importCountry?.flag_icon_url || '',
			latitude      : importCountry?.latitude || '',
			longitude     : importCountry?.longitude || '',
		};
		const manufacturing = {
			id            : manufacturingCountry?.id || '',
			name          : manufacturingCountry?.name || '',
			country_code  : manufacturingCountry?.country_code || '',
			flag_icon_url : manufacturingCountry?.flag_icon_url || '',
		};
		return {
			exportCountry        : exportCountryObj,
			importCountry        : importCountryObj,
			manufacturingCountry : manufacturing,
			productName          : name,
			tradeEngineInputId   : id,
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

		const importHs = await verifySixDigitHs({ hsCode: importHsCode.toString() });
		const exportHs = await verifySixDigitHs({ hsCode: exportHsCode.toString() });

		if (importHs && exportHs) {
			if (importHsCode.toString().substring(0, HS_CODE_LENGTH)
			!== exportHsCode.toString().substring(0, HS_CODE_LENGTH)) {
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

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		}
	}, [billId]);

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
			watchExportHs?.toString().length >= HS_CODE_LENGTH
			&& !watchImportHs
			&& initialRef.current.fillImportHs
		) {
			const importHs = watchExportHs.toString().substring(0, HS_CODE_LENGTH);
			setFormValue('importHsCode', importHs);
			initialRef.current.fillImportHs = false;
		}
		if (
			!watchExportHs
			&& watchImportHs?.toString().length >= HS_CODE_LENGTH
			&& initialRef.current.fillExportHs
		) {
			const exportHs = watchImportHs.toString().substring(0, HS_CODE_LENGTH);
			setFormValue('exportHsCode', exportHs);
			initialRef.current.fillExportHs = false;
		}
	}, [watchImportHs, watchExportHs]);

	useEffect(() => {
		prefillData();
	}, []);

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
		watchImportCountry,
		watchExportCountry,
	};
};

export default useInfoValidate;
