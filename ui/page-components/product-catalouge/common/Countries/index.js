import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from './controls';
// import { Div, Form } from './style';
import styles from './styles.module.css';

import { useForm, asyncFieldsHsCodeCountries, useGetAsyncOptionsBf } from '@/packages/forms';
import ControlledSelect from '@/packages/forms/Controlled/SelectController';

const optionsFunc = () => {
	const Options = useGetAsyncOptionsBf(merge(
		asyncFieldsHsCodeCountries(),
		{ params: { filters: { type: ['country'] } } },
	));

	return Options;
};

function GetCountriesFilter({ setCountryforHsCode, setSelectedCountry }) {
	const countryOptions = optionsFunc();
	const controls = getControls({ setSelectedCountry, countryOptions });
	const { watch, control } = useForm();

	const formValues = watch('country');

	console.log(formValues, 'formVAlues');

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
