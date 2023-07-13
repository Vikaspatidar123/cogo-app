import { request } from '@/packages/request/helpers/request';

const acceptPassword = (body) => request.post('/accept_organization_user_invitation', body);

export default acceptPassword;
