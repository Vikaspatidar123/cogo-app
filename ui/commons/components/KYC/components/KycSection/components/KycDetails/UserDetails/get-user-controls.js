const controls = [
	{
		name         : 'user_id_proof',
		label        : 'Photo ID Proof',
		type         : 'file',
		drag         : true,
		uploadType   : 'aws',
		span         : 4,
		showOptional : false,
		rules        : { required: true },
	},
];

export default controls;
