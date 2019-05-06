/**
 * 请求统一管理
 */
import { postJson } from './request';

/* Common */
export const login = data => postJson('/user/login', data);
