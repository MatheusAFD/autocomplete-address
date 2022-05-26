import { useState } from "react";

export function App() {
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  function returnInputValue(e) {
    setCep(e.target.value);
  }

  function returnCep() {
    setIsShowAddress(true);
    const getCep = fetch(`https://viacep.com.br/ws/${cep}/json/`);

    getCep
      .then((resolve) => {
        return resolve.json();
      })
      .then((data) => {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
      });
  }

  return (
    <main className="main">
      <div className="main-content">
        <label htmlFor="" className="label">
          Find my address
        </label>
        <input
          type="number"
          name=""
          id=""
          onChange={returnInputValue}
          placeholder="00000000"
        />
        <input type="submit" value="Encontrar endereço" onClick={returnCep} />

        {isShowAddress ? (
          <>
            <label htmlFor="rua" className="info">
              Rua
            </label>
            <p className="result">{logradouro}</p>

            <label htmlFor="numero" className="info">
              Bairro
            </label>
            <p>{bairro}</p>

            <label htmlFor="cidade" className="info">
              Cidade / Estado
            </label>
            <p>{`${cidade} / ${estado}`}</p>
          </>
        ) : null}
      </div>
    </main>
  );
}
