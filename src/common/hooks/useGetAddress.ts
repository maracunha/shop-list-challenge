import { validateBr } from 'js-brasil';
import { useEffect, useState } from 'react';

export const useGetAddress = (cep: string) => {
  const [address, setAddress] = useState({});
  const validCep = validateBr.cep(cep);

  useEffect(() => {
    if (validCep) {
      requestAddress();
    }

    async function requestAddress() {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
      const json = await res.json();
      setAddress(json)
    }
  }, [cep]);

  return address;
};
