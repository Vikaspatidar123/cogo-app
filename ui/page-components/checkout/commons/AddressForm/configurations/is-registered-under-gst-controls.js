import { CountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const getAddressRegisteredUnderGst = ({ organizationCountryId }) => [
	{
		type    : 'checkbox',
		name    : 'isAddressRegisteredUnderGst',
		label   : 'Not Registered Under GST Law',
		options : [
			{
				value : true,
				label : (
					<>
						Not Registered Under
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
						{' '}
						Law
					</>
				),
			},
		],
		multiple : true,
		span     : 12,
	},
];

export default getAddressRegisteredUnderGst;
