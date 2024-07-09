export const apiKey: string = import.meta.env.VITE_API_KEY;
export const baseUrl: string = import.meta.env.VITE_BASE_URL;

const rawToken = localStorage.getItem('token');
// Elimina las comillas dobles que rodean al token
const token = rawToken?.replace(/^"|"$/g, '');

export const headers = {
  "X-Api-Key": apiKey,
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}

export const headers_not_token: any = {
  "X-Api-Key": apiKey,
  "Content-Type": "application/json",
}

type RoleRedirects = {
  [key: string]: string;
};


export const roleRedirects: RoleRedirects = {
  'Administrador': '/',
  'Docente': '/blank',
  'Estudiante': '/profile' 
}
