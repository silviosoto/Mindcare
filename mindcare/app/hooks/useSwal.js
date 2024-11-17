import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Hook para mostrar una alerta simple
export const useSimpleAlert = () => {
  return (title, text, icon = "info") => {
    MySwal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  };
};

// Hook para mostrar una alerta de confirmación
export const useConfirmationAlert = () => {
  return async (title, text, confirmButtonText = "Confirmar", cancelButtonText = "Cancelar") => {
    const result = await MySwal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
    });
    return result.isConfirmed; // Retorna true si el usuario confirma
  };
};

// Hook para mostrar una alerta con un input
export const useInputAlert = () => {
  return async (title, inputType = "text", inputPlaceholder = "") => {
    const { value: inputValue } = await MySwal.fire({
      title,
      input: inputType, // Tipos como 'text', 'email', 'password', etc.
      inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: "Enviar",
    });
    return inputValue; // Retorna el valor ingresado o null si se cancela
  };
};

// Hook para mostrar un alerta con un temporizador
export const useTimedAlert = () => {
  return (title, text, timer = 3000, icon = "success") => {
    MySwal.fire({
      title,
      text,
      icon,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
};
