import { Pill, Accordion, Button } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import FieldArray from '../../../common/FieldArray';
import { tradeControls } from '../../../configurations/gettradeControls';
import useTradeDetails from '../../../hooks/useTradeDetails';

import styles from './styles.module.css';
import TradeList from './TradeList';

import getField from '@/packages/forms/Controlled';

const getAccordianTitle = ({ placeholder, listLength = 0 }) => (
	<div className={styles.pill_container}>
		<div>{`${placeholder} ${listLength}`}</div>
		<Pill color={listLength >= 1 ? 'green' : 'yellow'} size="sm">
			{listLength >= 1 ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);

function TradeDetails({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const tradeDetails = getCreditRequestResponse.trade_details || [];
	const { payment_terms = [] } = getCreditRequestResponse;
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			payment_terms: payment_terms,
		},
	});
	const {
		updateTradeDetails = () => {},
		loading,
		selectedCountry,
		setSelectedCountry,
	} = useTradeDetails();

	const onSubmit = async (values) => {
		const trade_details = values.countries_exported?.map((x) => ({
			country: {
				id   : x.country,
				name : selectedCountry[x.country].name || '',
			},
			products: [x.products_exported],
		}));
		const req = {
			...values,
			trade_details,
			creditRequest: getCreditRequestResponse,
		};

		const response = await updateTradeDetails(req);
		if (response) {
			refetch();
		}
	};

	return (
		<form type="submit">
			<Accordion
				title={getAccordianTitle({
					placeholder : 'Trade List',
					listLength  : tradeDetails.length,
				})}
				type="form"
			>
				<div className={styles.container}>

					<TradeList list={tradeDetails} />

					{tradeControls(setSelectedCountry).map((item) => {
						const Element = getField(item.type);
						if (item.type === 'fieldArray') {
							return (
								<FieldArray
									{...item}
									control={control}
									name={item.name}
									error={errors?.[item.name]}
								/>
							);
						}
						return (
							<div className={styles.field}>
								<div
									className={styles.field_name}
									style={item.style}
								>
									{item?.label}
								</div>
								<Element control={control} {...item} />
								<div className={styles.error_text}>
									{errors?.[item?.name]?.message
										|| errors?.[item?.name]?.type}
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.btn_container}>
					<Button
						loading={loading}
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
						themeType="secondary"
					>
						Save
					</Button>
				</div>
			</Accordion>
		</form>
	);
}

export default TradeDetails;
