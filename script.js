// Mostrar seções de cadastro
function mostrarSecao(id) {
    document.querySelectorAll('.form-section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

// Cadastro de empresas
document.getElementById('formEmpresa').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Empresa cadastrada com sucesso!');
});

// Cadastro de influenciadores usando LocalStorage
document.getElementById('formInfluencer').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = e.target.querySelectorAll('input');
    const influencer = {
        nome: inputs[0].value,
        email: inputs[1].value,
        telefone: inputs[2].value,
        redes: inputs[3].value,
        nicho: inputs[4].value
    };

    let lista = JSON.parse(localStorage.getItem('influencers')) || [];
    lista.push(influencer);
    localStorage.setItem('influencers', JSON.stringify(lista));

    alert('Influenciador cadastrado!');
    e.target.reset();
});

// Busca de influenciadores
function buscarInfluencers() {
    const nicho = document.getElementById('filtroNicho').value.toLowerCase();
    const lista = JSON.parse(localStorage.getItem('influencers')) || [];
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = '';

    lista
        .filter(i => i.nicho.toLowerCase().includes(nicho))
        .forEach(i => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${i.nome}</h3>
                <p><strong>Nicho:</strong> ${i.nicho}</p>
                <p><strong>Contato:</strong> ${i.email}</p>
            `;
            resultado.appendChild(card);
        });
}
