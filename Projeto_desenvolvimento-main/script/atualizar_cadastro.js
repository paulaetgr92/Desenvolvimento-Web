const url = "https://go-wash-api.onrender.com/api/auth/address";

async function mostrar_enderecos() {
    try {
        let api = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);

            const divEnderecos = document.getElementById("enderecos");
            let listaEnderecos = resposta.data;

            listaEnderecos.forEach(endereco => {
                let p = document.createElement("p");

                let btn_atualizar = document.createElement("input");
                btn_atualizar.type = 'button';
                btn_atualizar.value = 'Atualizar';
                btn_atualizar.style.cursor = 'pointer';

                let btn_deletar = document.createElement("input");
                btn_deletar.type = 'button';
                btn_deletar.value = 'Deletar';
                btn_deletar.style.cursor = 'pointer';

                p.textContent = `${endereco.id}|${endereco.title}|${endereco.cep}|${endereco.address}|${endereco.number}|${endereco.complement}`;
                p.style.display = 'flex';
                p.appendChild(btn_atualizar);
                p.appendChild(btn_deletar);
                divEnderecos.appendChild(p);

                // Ação do botão atualizar
                btn_atualizar.addEventListener('click', function() {
                    window.location.href = "../view/home.html"
                    atualizarEndereco(endereco.id);
                });

                // Ação do botão deletar
                btn_deletar.addEventListener('click', function() {
                    deletarEndereco(endereco.id);
                });
            });
        } else {
            console.log(`Erro ao mostrar endereços: ${api.status}`);
            alert(`Erro ao mostrar endereços: ${api.status}`);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar endereços.");
    }
}

async function atualizarEndereco(id) {
    let novoTitulo = prompt("Digite o novo título:");
    let novoCep = prompt("Digite o novo CEP:");
    let novoEndereco = prompt("Digite o novo endereço:");
    let novoNumero = prompt("Digite o novo número:");
    let novoComplemento = prompt("Digite o novo complemento:");

    let data = {
        title: novoTitulo,
        cep: novoCep,
        address: novoEndereco,
        number: novoNumero,
        complement: novoComplemento
    };

    try {
        let response = await fetch(`${url}/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Endereço atualizado com sucesso!");
            window.location.reload();
        } else {
            console.log(`Erro ao atualizar: ${response.status}`);
            alert(`Erro ao atualizar: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar o endereço.");
    }
}

async function deletarEndereco(id) {
    let confirmacao = confirm("Você realmente deseja deletar este endereço?");
    if (confirmacao) {
        try {
            let response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                },
            });

            if (response.ok) {
                alert("Endereço deletado com sucesso!");
                window.location.reload();
            } else {
                console.log(`Erro ao deletar: ${response.status}`);
                alert(`Erro ao deletar: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao deletar o endereço.");
        }
    }
}


mostrar_enderecos();
