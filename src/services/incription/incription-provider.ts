import { apiKey, baseUrl } from "@app/utils/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";

export const IncriptionCreated = async (formData: any): Promise<any> => {
  try {
    const apiUrl: string = `${baseUrl}inscription/create/`;

    const response = await axios.post(
      apiUrl,
      formData,
      {
        headers: {
          "X-Api-Key": apiKey,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    toast.success("Registro de inscripción exitoso!");
    return {"response":response.data, "code": response.status};

  } catch (error: any) {
    console.error("Error: ", error);
    toast.error("Error: "+error.response.data.message);

    return Promise.reject({ message: "Función fallida!" });
  }
};
