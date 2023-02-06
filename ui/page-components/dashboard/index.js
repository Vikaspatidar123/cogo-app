import { FluidContainer } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import React from 'react';

import getControls from './config';

import {
	useForm, asyncFieldsLocations, useGetAsyncOptions, SelectController,
} from '@/packages/forms';

function Dashboard() {
	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
	} = useForm();
	const fields = getControls({ cityOptions });
	const item = fields[0];
	return (
		<FluidContainer>
			<p>Dashboard Page</p>
			<SelectController {...item} control={control} />
		</FluidContainer>
	);
}

export default Dashboard;
