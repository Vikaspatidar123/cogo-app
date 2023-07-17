import { Pill, Accordion, Button } from '@cogoport/components';
import React from 'react';

import FieldArray from '../../../common/FieldArray';
import { tradeControls } from '../../../configurations/gettradeControls';
import useTradeDetails from '../../../hooks/useTradeDetails';

import styles from './styles.module.css';
import TradeList from './TradeList';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const MIN_TRADE_DETAILS_VERIFIED = 1;

const getAccordianTitle = ({ placeholder, listLength = 0 }) => (
	<div className={styles.pill_container}>
		<div>{`${placeholder} ${listLength}`}</div>
		<Pill color={listLength >= MIN_TRADE_DETAILS_VERIFIED ? 'green' : 'yellow'} size="sm">
			{listLength >= MIN_TRADE_DETAILS_VERIFIED ? 'Completed' : 'Pending'}
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
			payment_terms,
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

					{tradeControls(setSelectedCountry).map((item) => {
						const Element = getField(item.type);
						if (item.type === 'fieldArray') {
							return (
								<FieldArray
									key={item.name}
									{...item}
									control={control}
									name={item.name}
									error={errors?.[item.name]}
								/>
							);
						}
						return (
							<div className={styles.field} key={item.name}>
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
						type="button"
						loading={loading}
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
						themeType="secondary"
					>
						Save
					</Button>
				</div>
				<TradeList list={tradeDetails} />
			</Accordion>
		</form>
	);
}

export default TradeDetails;
