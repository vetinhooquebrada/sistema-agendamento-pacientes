let consultas =
JSON.parse(localStorage.getItem("consultas")) || [];

function salvarDados() {
    localStorage.setItem(
        "consultas",
        JSON.stringify(consultas)
    );
}

function renderizar() {

    const tabela =
    document.getElementById("listaConsultas");

    tabela.innerHTML = "";

    consultas.forEach((consulta, index) => {

        tabela.innerHTML += `
        <tr>
            <td>${consulta.nome}</td>
            <td>${consulta.telefone}</td>
            <td>${consulta.data}</td>
            <td>${consulta.horario}</td>
            <td>
                <button class="btn-excluir"
                onclick="excluirConsulta(${index})">
                Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

function adicionarConsulta() {

    const nome =
    document.getElementById("nome").value;

    const telefone =
    document.getElementById("telefone").value;

    const data =
    document.getElementById("data").value;

    const horario =
    document.getElementById("horario").value;

    if (!nome || !telefone || !data || !horario) {
        alert("Preencha todos os campos.");
        return;
    }

    consultas.push({
        nome,
        telefone,
        data,
        horario
    });

    salvarDados();
    renderizar();

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("data").value = "";
    document.getElementById("horario").value = "";
}

function excluirConsulta(index) {

    consultas.splice(index, 1);

    salvarDados();
    renderizar();
}

renderizar();