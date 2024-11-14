import { useState } from 'react';

const useForm = () => {
  const [form, setForm] = useState({
    nome: '',
    pin: '',
    rol: '',
  });

  function resetForm(): void {
    setForm({
      nome: '',
      pin: '',
      rol: '',
    });
  }
  function changeState(state: string, newValue: string): void {
    setForm({
      ...form,
      [state]: newValue,
    });
  }

  return {
    nome: form.nome,
    pin: form.pin,
    rol: form.rol,
    updateForm: changeState,
    resetForm,
  };
};

export default useForm;
