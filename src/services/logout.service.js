import { logout } from '../store/ducks/auth';

export default function Logout() {
  localStorage.removeItem('email');
  localStorage.removeItem('isAdmin');
  return logout();
}
