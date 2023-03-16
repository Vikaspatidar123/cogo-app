/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm, asyncFieldsHsCodeCountries, useGetAsyncOptionsBf } from '@/packages/forms';
import ControlledSelect from '@/packages/forms/Controlled/SelectController';

const Options = useGetAsyncOptionsBf(merge(
	asyncFieldsHsCodeCountries(),
	{ params: { filters: { type: ['country'] } } },
));

function GetCountriesFilter({ setCountryforHsCode, setSelectedCountry }) {
	const countryOptions = Options;
	const controls = getControls({ setSelectedCountry, countryOptions });
	const { watch, control } = useForm();

	const watchCountry = watch('country');
	useEffect(() => {
		setCountryforHsCode(watchCountry);
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
