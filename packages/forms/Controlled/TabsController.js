import { Tabs } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function TabsController(props) {
	const {
		name, control, rules, children, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<Tabs
					{...rest}
					onChange={onChange}
					activeTab={value}
				>
					{children}
				</Tabs>
			)}
		/>
	);
}

export default TabsController;
