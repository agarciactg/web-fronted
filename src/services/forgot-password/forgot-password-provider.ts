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
    console.log("Response", response.data);
    toast.success("Correo Enviado con Exito!");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    toast.error("Fallo al enviar el correo, intente denuevo.");
    return Promise.reject({ message: "error en el envio de email." });
  }
};
