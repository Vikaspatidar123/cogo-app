import { useState } from 'react';

import { useForm } from '@/packages/forms';

const useUpdate = () => {
	const [columns, setColumns] = useState([]);
	const { control, handleSubmit } = useForm();
	console.log(columns, 'columns');
	const onSubmit = (value) => {
		console.log(value);
	};
	return { onSubmit, setColumns, columns, control, handleSubmit };
};
export default useUpdate;
