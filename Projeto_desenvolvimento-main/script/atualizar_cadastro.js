const url = "https://go-wash-api.onrender.com/api/auth/address";


async function mostrar_enderecos() {
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

            
            btn_atualizar.addEventListener('click', function() {
                atualizarEndereco(endereco.id);
            });

            
            btn_deletar.addEventListener('click', function() {
                deletarEndereco(endereco.id);
            });
        });

    } else {
        console.log(`Erro: ${api.status}`);
        alert(`Erro: ${api.status}`);
    }
}


async function atualizarEndereco(id) {
    const formContainer = document.getElementById("form-container");
    const enderecoForm = document.getElementById("endereco-form");

    try {
        const response = await fetch(`${url}/${id}`, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
        });

        if (response.ok) {
            const endereco = await response.json();

        
            document.getElementById("title").value = endereco.title;
            document.getElementById("cep").value = endereco.cep;
            document.getElementById("address").value = endereco.address;
            document.getElementById("number").value = endereco.number;
            document.getElementById("complement").value = endereco.complement || '';

      
            formContainer.style.display = 'block';

            enderecoForm.onsubmit = async function(event) {
                event.preventDefault();

                let data = {
                    title: document.getElementById("title").value,
                    cep: document.getElementById("cep").value,
                    address: document.getElementById("address").value,
                    number: document.getElementById("number").value,
                    complement: document.getElementById("complement").value
                };

                try {
                    let updateResponse = await fetch(`${url}/${id}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                        },
                        body: JSON.stringify(data),
                    });

                    if (updateResponse.ok) {
                        alert("Endereço atualizado com sucesso!");
                        formContainer.style.display = 'none'; 
                        setTimeout(() => {
                            window.location.href = '../view/home.html'; 
                        }, 2000);
                        mostrar_enderecos(); 
                    } else {
                        const errorData = await updateResponse.json();
                        console.error("Erro ao atualizar:", errorData);
                        alert(`Erro ao atualizar: ${updateResponse.status} - ${errorData.message || ''}`);
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    alert("Erro ao atualizar o endereço.");
                }
            };
        } else {
            console.error("Erro ao buscar o endereço:", response.status);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

async function deletarEndereco(id) {
    if (confirm("Você tem certeza que deseja deletar este endereço?")) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                },
            });
            if (response.ok) {
                alert("Endereço deletado com sucesso!");
                window.location.href = './view/home.html'; 
                mostrar_enderecos(); 
            } else {
                const errorData = await response.json();
                console.error("Erro ao deletar:", errorData);
                alert(`Erro ao deletar: ${response.status} - ${errorData.message || ''}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao deletar o endereço.");
        }
    }
}
mostrar_enderecos();
