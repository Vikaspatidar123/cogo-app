import { merge } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm, asyncFieldsHsCodeCountries, useGetAsyncOptionsBf } from '@/packages/forms';
import ControlledSelect from '@/packages/forms/Controlled/SelectController';

function GetCountriesFilter({ setCountryforHsCode, setSelectedCountry }) {
	const { t } = useTranslation(['common', 'productCatalogue']);

	const Options = useGetAsyncOptionsBf(merge(
		asyncFieldsHsCodeCountries(),
		{ params: { filters: { type: ['country'] } } },
	));

	const countryOptions = Options;
	const controls = getControls({ setSelectedCountry, countryOptions, t });
	const { watch, control } = useForm();

	const watchCountry = watch('country');

	useEffect(() => {
		setCountryforHsCode(watchCountry);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchCountry]);

	return (
		<div className="cardFilter">
			<form className={styles.Form}>
				<div className={styles.Div}>
					<ControlledSelect key={watchCountry} {...controls[0]} control={control} />
				</div>
			</form>
		</div>
	);
}

export default GetCountriesFilter;
