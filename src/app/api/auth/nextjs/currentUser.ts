import { cache } from 'react';
import { getUserFromSession } from '../core/session';

export const getCurrentUser = cache(async () => {
	return await getUserFromSession();
});
