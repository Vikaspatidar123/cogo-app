import { Toast, Tabs, TabPanel } from '@cogoport/components';
import { useCallback, useEffect, useState, useMemo } from 'react';

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

const WAIT_TIME = 3 * 1000;
const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});

function Plan() {
	const { profile } = useSelector((s) => s);
	const { query } = useRouter();
	const [userplan, setUserPlan] = useState({});
	const [activeTab, setActiveTab] = useState('monthly');
	const [modal, setShowModal] = useState(false);
	const [clickedPlan, setClickedPlan] = useState();
	const [paymentStatus, setPaymentStatus] = useState({});
	const [apiTries, setApiTries] = useState(0);
	const [subscribeTab, setSubscribeTab] = useState('monthly');
	const { getPlan, loading } = useGetUSerActivePlan({ profile });
	const { razorLoading, verifyRazor, setRazorLoading } = useVerifyRazor();
	const { requestCallback, callbackLoading } = useGetRequestCallback({ profile });

	const { saas_checkout_id = '', saas_plan = '' } = query || {};

	const requestData = useMemo(() => ({ saas_checkout_id, gateway: 'chargebee' }), [saas_checkout_id]);

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
	const checkPaymentStatus = useCallback(async (payload) => {
		if (apiTries < 1) setRazorLoading(true);
		const res = await verifyRazor(payload);
		await wait(WAIT_TIME);
		setApiTries(apiTries + 1);
		setPaymentStatus(res);
	}, [apiTries, setRazorLoading, verifyRazor]);

	useEffect(() => {
		if (query?.state === 'succeeded') {
			checkPaymentStatus(requestData);
		} else setRazorLoading(false);
	}, [checkPaymentStatus, query, requestData, setRazorLoading]);

	useEffect(() => {
		(async () => {
			if (paymentStatus?.status !== 'active' && apiTries < 10 && razorLoading) {
				try {
					checkPaymentStatus(requestData);
				} catch (err) {
					Toast.error(err?.data);
				}
			}
		})();
	}, [apiTries, checkPaymentStatus, paymentStatus?.status, razorLoading, requestData]);

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
