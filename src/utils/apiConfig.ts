export const baseUrl: string  = "http://201.219.216.217:5511/api/v1/"
export const apiKey: string = "wLKp7Osz.KAgP5OJdvYCLJpUUrX0eH40fHQf4aDux";

const rawToken = localStorage.getItem('token');
// Elimina las comillas dobles que rodean al token
const token = rawToken?.replace(/^"|"$/g, '');

export const headers = {
  "X-Api-Key": apiKey,
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}

type RoleRedirects = {
  [key: string]: string;
};


export const roleRedirects: RoleRedirects = {
  'Administrador': '/',
  'Docente': '/blank',
  'Estudiante': '/profile' 
}
