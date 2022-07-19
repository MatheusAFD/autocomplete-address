import axios from "axios";
import { useState } from "react";
import InputMask from "react-input-mask";

export function App() {
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [cep, setCep] = useState("");
  const [data, setData] = useState("");

  function getInputValue(e) {
    setCep(e.target.value);
    cep.replace("-", "");
  }

  async function getCep() {
    if (cep.length === 9) {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return res;
    }
  }

  async function CepData() {
    const res = await getCep();
    setData(res.data);
    setIsShowAddress(true);
  }

  return (
    <main className="main">
      <div className="main-content">
        <label htmlFor="" className="label">
          Find my address
        </label>
        <InputMask onChange={getInputValue} mask="99999-999" onBlur={CepData} />

        {isShowAddress && (
          <div>
            <p>Logradouro: {data.logradouro}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Cidade: {data.localidade}</p>
            <p>Estado: {data.uf}</p>
          </div>
        )}
      </div>
    </main>
  );
}
