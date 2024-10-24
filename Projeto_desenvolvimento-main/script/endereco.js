const url = 'https://go-wash-api.onrender.com/api/auth/address';
async function cadastro_endereco() {
    let title = document.querySelector("#title").value;
    let cep = document.querySelector("#cep").value;
    let address = document.querySelector("#adress").value;
    let number = document.querySelector("#number").value;
    let complement = document.querySelector("#complement").value;

    if (!title) {
        alert("Preencha o campo de título")
        return;
    }
    if (!cep) {
        alert("Preencha o campo de CEP")
        return;
    }
    if (!address) {
        alert("Preencha o campo de Endereço")
        return;
    }
    if (!number) {
        alert("Preencha o campo de Número")
        return;
    }


    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "cep": cep,
            "address": address,
            "number": number,
            "complement": complement,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).access_token,
        },
    })
    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta);
        alert("Endereço cadastrado com sucesso");
        window.location.href = "../view/home.html";
        return
    }
}


