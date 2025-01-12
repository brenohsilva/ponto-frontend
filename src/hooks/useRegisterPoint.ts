import { useNavigate } from "react-router-dom";
import { recordsService } from "../services/recordsService";

export function useRegisterPoint() {
  const navigate = useNavigate();

  const registerPoint = async () => {
    try {
      await recordsService.setRecord();
      alert("Ponto registrado com sucesso!");
      navigate("/home");
    } catch (err: any) {
      console.error("Erro ao registrar ponto:", err);
      alert("Erro ao registrar ponto. Tente novamente.");
    }
  };

  return { registerPoint };
}
