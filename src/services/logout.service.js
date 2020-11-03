import { logout } from '../store/ducks/auth';

export default function Logout() {
  localStorage.removeItem('name');
  localStorage.removeItem('isAdmin');
  return logout();
}
