import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useState } from 'react';

import RaiseIssueForm from './components/RaiseIssueForm';
import SuccessPage from './components/SucessPage';
import controls from './configurations/raise-ticket-controls';
import { ISSUE_COMPONENT_MAPPING, typeOptions } from './constants';
import useCreateTokenTicket from './hooks/useCreateTokenTicket';
import useUpdateTokenTicket from './hooks/useUpdateTokenTicket';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { Image } from '@/packages/next';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CreateTicket() {
	const {
		general: { query: { type = '' } = {} },
	} = useSelector((state) => state);

	const [selectedInvoices, setSelectedInvoices] = useState();
	const [selectedpayments, setSelectedPayments] = useState([]);
	const [selectIssue, setSelectIssue] = useState('invoice');

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const {
		loading: createLoading,
		isTicketNotUtlilized,
	} = useCreateTokenTicket();

	const componentProps = {
		invoice : { selectedInvoices, setSelectedInvoices },
		payment : { selectedpayments, setSelectedPayments },
	};

	const Component = ISSUE_COMPONENT_MAPPING[selectIssue] || null;

	const { updateTokenTicket, showSuccessPage, loading } =	useUpdateTokenTicket();

	const onFormSubmit = (val) => {
		updateTokenTicket({ val, selectedInvoices, selectedpayments });
	};

	const showList = typeOptions.includes(type);

	if (createLoading) {
		return (
			<div className={styles.loader_div}>
				<Image src={GLOBAL_CONSTANTS.image_url.spinner_loader} width={60} height={60} alt="loading" />
			</div>
		);
	}

	return !showSuccessPage ? (
		<div>
			<form className={styles.container} onSubmit={handleSubmit(onFormSubmit)}>
				<div className={styles.logo_div}>
					<Image width={118} height={25} src={GLOBAL_CONSTANTS.image_url.logo_without_footer} alt="logo" />
					<div className={styles.heading}>Raise an Issue</div>
				</div>

				<div className={showList ? styles.layout_div : styles.layout_div_list}>
					<div className={styles.wrapper}>
						<RaiseIssueForm
							controls={controls}
							errors={errors}
							control={control}
							showList={showList}
							isTicketNotUtlilized={isTicketNotUtlilized}
						/>

						{showList && isTicketNotUtlilized && (
							<div className={styles.table_wrapper}>
								<Tabs
									activeTab={selectIssue}
									themeType="secondary"
									onChange={setSelectIssue}
								>
									<TabPanel name="invoice" title="Invoice" />
									<TabPanel name="payment" title="Payment" />
								</Tabs>
								{Component && (
									<Component
										{...(componentProps[selectIssue] || {})}
										key={selectIssue}
									/>
								)}
							</div>
						)}
					</div>

					<div className={styles.button_wrapper}>
						<Button
							themeType="primary"
							type="submit"
							disabled={loading}
							onClick={handleSubmit(onFormSubmit)}
						>
							Submit
						</Button>
					</div>
				</div>
			</form>
		</div>
	) : (
		<SuccessPage />
	);
}

export default CreateTicket;
