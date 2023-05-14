import { request } from '@/packages/request';

const useVerifyEmail = (body) => request.post('/verify_lead_user', body);

export default useVerifyEmail;
