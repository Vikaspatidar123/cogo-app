import { Tabs, TabPanel, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import RaiseIssueForm from './components/RaiseIssueForm';
import SuccessPage from './components/SucessPage';
import controls from './configurations/raise-ticket-controls';
import { ISSUE_COMPONENT_MAPPING, typeOptions } from './constants';
import useCreateTokenTicket from './hooks/useCreateTokenTicket';
import useUpdateTokenTicket from './hooks/useUpdateTokenTicket';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function CreateTicket() {
	const [selectedInvoices, setSelectedInvoices] = useState();
	const [selectedpayments, setSelectedPayments] = useState([]);
	const [selectIssue, setSelectIssue] = useState('invoice');

	const {
		createTokenTicket = () => {},
		loading: createLoading,
		isTicketNotUtlilized,
	} = useCreateTokenTicket();

	const {
		general: { query: { type = '' } = {} },
	} = useSelector((state) => state);

	const componentProps = {
		invoice : { selectedInvoices, setSelectedInvoices },
		payment : { selectedpayments, setSelectedPayments },
	};

	const Component = ISSUE_COMPONENT_MAPPING[selectIssue] || null;

	useEffect(() => {
		createTokenTicket();
	}, []);

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { updateTokenTicket, showSuccessPage, loading } =	useUpdateTokenTicket();

	const onFormSubmit = (val) => {
		updateTokenTicket({ val, selectedInvoices, selectedpayments });
	};

	const showList = typeOptions.includes(type);
	if (createLoading) {
		return (
			<div className={styles.loader_div}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg"
					alt="spinner"
					className={styles.loader}
				/>
			</div>
		);
	}

	return !showSuccessPage ? (
		<div>
			<form className={styles.container} onSubmit={handleSubmit(onFormSubmit)}>
				<div className={styles.logo_div}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/logo-cogoport.svg"
						alt="logo"
						className={styles.cogo_logo}
					/>
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
							submit
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
