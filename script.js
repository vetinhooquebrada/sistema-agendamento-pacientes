let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
let editandoIndex = null;

const dias = {
    segunda: document.getElementById("segunda"),
    terca: document.getElementById("terca"),
    quarta: document.getElementById("quarta"),
    quinta: document.getElementById("quinta"),
    sexta: document.getElementById("sexta")
};

const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const dataInput = document.getElementById("data");
const horarioInput = document.getElementById("horario");

const btnAdicionar = document.querySelector("button");

function salvarDados() {
    localStorage.setItem("consultas", JSON.stringify(consultas));
}

function renderizar() {

    Object.values(dias).forEach(div => {
        div.innerHTML = "";
    });

    consultas.sort((a, b) =>
        new Date(a.data + "T" + a.horario) -
        new Date(b.data + "T" + b.horario)
    );

    consultas.forEach((consulta, index) => {

        const diaSemana = new Date(consulta.data + "T00:00:00").getDay();

        let coluna = null;

        if (diaSemana === 1) coluna = dias.segunda;
        if (diaSemana === 2) coluna = dias.terca;
        if (diaSemana === 3) coluna = dias.quarta;
        if (diaSemana === 4) coluna = dias.quinta;
        if (diaSemana === 5) coluna = dias.sexta;

        if (!coluna) return;

        const div = document.createElement("div");
        div.className = "consulta-item";

        div.innerHTML = `
            <div class="horario">${consulta.horario}</div>
            <div class="paciente">${consulta.nome}</div>

            <button class="btn-editar">Editar</button>
            <button class="btn-excluir">Excluir</button>
        `;

        div.querySelector(".btn-editar").addEventListener("click", () => {
            editarConsulta(index);
        });

        div.querySelector(".btn-excluir").addEventListener("click", () => {
            excluirConsulta(index);
        });

        coluna.appendChild(div);
    });
}

function adicionarConsulta() {

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const data = dataInput.value;
    const horario = horarioInput.value;

    if (!nome || !telefone || !data || !horario) {
        alert("Preencha todos os campos.");
        return;
    }

    const existe = consultas.some((c, i) =>
        c.data === data &&
        c.horario === horario &&
        i !== editandoIndex
    );

    if (existe) {
        alert("Já existe uma consulta nesse horário.");
        return;
    }

    const novaConsulta = { nome, telefone, data, horario };

    if (editandoIndex !== null) {
        consultas[editandoIndex] = novaConsulta;
        editandoIndex = null;
        btnAdicionar.textContent = "➕ Agendar Consulta";
    } else {
        consultas.push(novaConsulta);
    }

    salvarDados();
    renderizar();
    limparCampos();
}

function editarConsulta(index) {

    const consulta = consultas[index];

    nomeInput.value = consulta.nome;
    telefoneInput.value = consulta.telefone;
    dataInput.value = consulta.data;
    horarioInput.value = consulta.horario;

    editandoIndex = index;
    btnAdicionar.textContent = "✏️ Atualizar Consulta";
}

function excluirConsulta(index) {

    if (!confirm("Deseja excluir esta consulta?")) return;

    consultas.splice(index, 1);

    salvarDados();
    renderizar();
}

function limparCampos() {
    nomeInput.value = "";
    telefoneInput.value = "";
    dataInput.value = "";
    horarioInput.value = "";
}

/* máscara telefone */
telefoneInput.addEventListener("input", (e) => {

    let valor = e.target.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    e.target.value = valor;
});

/* evento do botão */
btnAdicionar.addEventListener("click", adicionarConsulta);

/* inicializa */
renderizar();