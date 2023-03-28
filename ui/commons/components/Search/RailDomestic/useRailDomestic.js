import showErrorsInToast from '@cogo/utils/showErrorsInToastV2';
import { isEmpty } from '@cogoport/front/utils';
import { useState, useRef, useMemo } from 'react';

import useCreateSpotSearch from './CreateSpotSearch/hooks/useCreateSpotSearch';
import formatSavedFormValues from './utils/formatSavedFormValues';
import getImperativeHandleValues from './utils/getImperativeHandleValues';
import validateImporterExporterDetails from './utils/validateImporterExporterDetails';

const useRailDomestic = ({
	importerExporterDetails,
	searchType,
	searchData,
	onPush,
}) => {
	const [loading, setLoading] = useState(false);
	const [isSearchRatesButtonClicked, setIsSearchRatesButtonClicked] =		useState(false);

	const imperativeHandleRef = useRef({});

	const { createSpotSearch } = useCreateSpotSearch({
		importerExporterDetails,
		searchType,
		onSuccess : () => {},
		onFailure : ({ errors }) => {
			showErrorsInToast(errors?.data);

			setLoading(false);
		},
		redirectOnSuccess: true,
	});

	const onClickSearchRatesButton = async () => {
		try {
			setLoading(true);
			setIsSearchRatesButtonClicked(true);

			const isImporterExporterDetailsPresent = validateImporterExporterDetails({
				importerExporterDetails,
			});
			if (!isImporterExporterDetailsPresent) {
				setLoading(false);
				return;
			}

			const values = await getImperativeHandleValues({ imperativeHandleRef });
			if (isEmpty(values)) {
				setLoading(false);
				return;
			}

			await createSpotSearch?.({ formValues: values });

			if (onPush) {
				onPush();
			}
		} catch (error) {
			showErrorsInToast(error?.data);

			setLoading(false);
		}
	};

	const formValues = useMemo(() => formatSavedFormValues({ searchData }), []);

	return {
		loading,
		imperativeHandleRef,
		onClickSearchRatesButton,
		isSearchRatesButtonClicked,
		formValues,
	};
};

export default useRailDomestic;
