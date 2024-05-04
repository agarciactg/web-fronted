import { apiKey, baseUrl } from "@app/utils/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";

export const forgotPasswordProvider = async (email: string): Promise<any> => {
  try {
    const apiUrl: string = baseUrl + "reset-password/";

    const postData = {
      email: email,
    };

    const headers = {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, postData, { headers });
    toast.success("Correo Enviado con Exito!");
    return response.data;
  } catch (error) {
    const { response }: any = error;

    if (response.status) {
      toast.error("No existe usuario con este Email.");
    }

    return Promise.reject({ message: "error en el envio de email." });
  }
};


export const resetPasswordProvider = async ({ email, resetCode, newPassword }): Promise<any> => {
  try {
    const apiUrl: string = baseUrl + "reset-password/confirm/";

    const postData = {
      email: email,
      reset_code: resetCode,
      password: newPassword
    };

    const headers = {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, postData, { headers });
    toast.success('Contraseña restablecida con éxito');
    return response.data;
  } catch (error: any) {
    return Promise.reject({ message: "Codigo expiado o codigo invalido." });
  }
};
