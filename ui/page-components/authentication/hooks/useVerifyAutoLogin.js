import { request } from '@/packages/request';

const getVerifyAutoLogin = (body) => request.post('/verify_auto_login_lead_user', body);

export default getVerifyAutoLogin;
