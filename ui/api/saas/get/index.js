import { request } from '@/packages/request';

export const getListOrganisation = (paylaod) => request.get(
	'/list_organization_users',
	{
		params: paylaod,
	},
);
