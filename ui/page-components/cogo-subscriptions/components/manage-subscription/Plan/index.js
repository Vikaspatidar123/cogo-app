import { Tabs, TabPanel } from '@cogoport/components';
import { useEffect, useState } from 'react';

import SuccessModal from '../../../common/SuccessModal';
import useGetRequestCallback from '../../../hooks/useGetRequestCallback';
import useGetUSerActivePlan from '../../../hooks/useGetUserActivePlan';
import useVerifyRazor from '../../../hooks/useVerifyRazorPayStatus';
import SubscriptionsPlanList from '../SubscriptionsPlanList/index';

import HeaderContainer from './HeaderContainer';
import Loader from './Loader';
import PendingModal from './PendingModal';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const options = [
	{
		label           : 'Bill Monthly',
		value           : 'monthly',
		backgroundColor : '#2b2b43',
		color           : ' #ffffff',
	},
	{
		label           : 'Bill Yearly',
		value           : 'annual',
		backgroundColor : '#2b2b43',
		color           : ' #ffffff',
	},
];

function Plan() {
	const { profile } = useSelector((s) => s);
	const { query } = useRouter();
	const [userplan, setUserPlan] = useState({});
	const [activeTab, setActiveTab] = useState('monthly');
	const [modal, setShowModal] = useState(false);
	const [clickedPlan, setClickedPlan] = useState();
	const [subscribeTab, setSubscribeTab] = useState('monthly');
	const { getPlan, loading } = useGetUSerActivePlan({ profile });
	const {
		setRazorLoading,
		razorLoading = false,
		paymentStatus = {},
		apiTries,
	} = useVerifyRazor();
	const { requestCallback, callbackLoading } = useGetRequestCallback({ profile });

	const { saas_plan = '' } = query || {};

	const { billing_cycle } = userplan;
	const userActivePlan = userplan?.item_plans?.find(
		(obj) => obj?.display_pricing?.annual?.id === userplan?.saas_plan_pricing_id
			|| obj?.display_pricing?.monthly?.id === userplan?.saas_plan_pricing_id,
	);

	const { description = '', priority_sequence: priority_sequence_active_plan } =		userActivePlan || {};

	useEffect(() => {
		getPlan({ setUserPlan });
	}, [getPlan]);

	const { item_plans = [], saas_plan_pricing_id = '' } = userplan || {};

	useEffect(() => {
		if (Object.keys(item_plans).length > 0) {
			item_plans.forEach(({ display_pricing = {}, priority_sequence }) => {
				if (priority_sequence > 0) {
					if (display_pricing?.annual?.is_active_plan) {
						setActiveTab('annual');
						setSubscribeTab('annual');
					}
				}
			});
		}
	}, [item_plans]);

	return (
		<div>
			<HeaderContainer />

			<div className={styles.container}>
				<div>
					<div className={styles.heading}>Efficient plans to grow your business</div>
					<div className={styles.line} />
				</div>

				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{ options.map((val) => (
						<TabPanel name={val.value} title={val.label} key={val.id} />
					)) }
				</Tabs>
			</div>
			<div className={styles.wrapper}>
				{loading && <Loader className="loader" />}
				{!loading && item_plans?.length > 0 && (
					<SubscriptionsPlanList
						clickedPlan={clickedPlan}
						setClickedPlan={setClickedPlan}
						activeTab={activeTab}
						userplan={userplan}
						description={description}
						priority_sequence_active_plan={priority_sequence_active_plan}
						requestCallback={requestCallback}
						saas_plan_pricing_id={saas_plan_pricing_id}
						subscribeTab={subscribeTab}
						callbackLoading={callbackLoading}
						billing_cycle={billing_cycle}
					/>
				)}
			</div>
			{modal && (
				<SuccessModal
					query={query}
					modal={modal}
					setShowModal={setShowModal}
					getPlan={getPlan}
					name={saas_plan}
					setUserPlan={setUserPlan}
				/>
			)}
			{razorLoading && (
				<PendingModal
					razorLoading={razorLoading}
					setRazorLoading={setRazorLoading}
					apiTries={apiTries}
					paymentStatus={paymentStatus}
					setAddModal={setShowModal}
				/>
			)}
		</div>
	);
}

export default Plan;
