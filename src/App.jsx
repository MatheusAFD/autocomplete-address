import axios from "axios";
import { useState } from "react";

export function App() {
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  function getInputValue(e) {
    setCep(e.target.value);
  }

  function getCep() {
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const data = response.data;
          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);

          setIsShowAddress(true);
        })
        .catch((error) => {
          alert(`${cep} não é um cep válido`);
          setIsShowAddress(false);
        });
    }
  }

  return (
    <main className="main">
      <div className="main-content">
        <label htmlFor="" className="label">
          Find my address
        </label>
        <input
          type="text"
          pattern="\d"
          maxLength={8}
          placeholder="00000000"
          onChange={getInputValue}
          onBlur={getCep}
        />

        {isShowAddress && (
          <div>
            <p>{logradouro}</p>
            <p>Bairro: {bairro}</p>
            <p>Cidade: {cidade}</p>
            <p>Estado: {estado}</p>
          </div>
        )}
      </div>
    </main>
  );
}
