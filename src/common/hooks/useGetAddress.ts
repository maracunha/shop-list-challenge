import { validateBr } from 'js-brasil';
import { useEffect, useState } from 'react';

export const useGetAddress = (cep: string) => {
  const [address, setAddress] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });
  const validCep = validateBr.cep(cep) as boolean;

  useEffect(() => {
    if (validCep) {
      requestAddress();
    }

    async function requestAddress() {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
      const json = await res.json();
      setAddress(json);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  return address;
};
