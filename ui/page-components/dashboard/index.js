import React from 'react';

function Dashboard() {
	// const [{ loading: signupLoading }, trigger] = useRequest({
	// 	url    : 'list_store_quota',
	// 	method : 'get',
	// }, { manual: true });
	// const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
	// 	params: { filters: { type: ['country'] } },
	// }));

	// const {
	// 	handleSubmit, getValues, control, formState: { errors },
	// 	watch,
	// } = useForm();
	// useEffect(() => {
	// 	const data = trigger({
	// 		params: {
	// 			organizationId : '61788285-f069-4cf5-8d99-31f206f3a65c',
	// 			page           : 1,
	// 			pageLimit      : 10,
	// 			archived       : false,
	// 		},
	// 	});
	// 	console.log(data);
	// }, []);

	// const fields = getControls({ cityOptions });
	// const item = fields[0];
	return (
		<p>Dashboard Page</p>
	);
}

export default Dashboard;
