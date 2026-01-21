// ========== CONFIGURAÇÕES EMAILJS ==========
const EMAILJS_PUBLIC_KEY = 'EGF_hBVqUpyXpum6G';
const EMAILJS_SERVICE_ID = 'service_27r93m1';
const EMAILJS_TEMPLATE_EMPRESA = 'template_qacl1zh';
const EMAILJS_TEMPLATE_INFLUENCER = 'template_cqql81u';

// ========== INICIALIZAÇÃO ==========
emailjs.init(EMAILJS_PUBLIC_KEY);

// ========== MOSTRAR SEÇÕES ==========
function mostrarSecao(id) {
    document.querySelectorAll('.form-section').forEach(sec => {
        sec.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

// ========== CADASTRO DE EMPRESAS ==========
document.getElementById('formEmpresa')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        tipo: 'Empresa',
        nome: document.getElementById('nomeEmpresa').value,
        email: document.getElementById('emailEmpresa').value,
        telefone: document.getElementById('telefoneEmpresa').value,
        setor: document.getElementById('setorEmpresa').value
    };
    
    // Enviar email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_EMPRESA, formData)
        .then(function() {
            alert('✅ Empresa cadastrada com sucesso! Você receberá um email de confirmação.');
            document.getElementById('formEmpresa').reset();
        }, function(error) {
            alert('❌ Erro ao cadastrar. Tente novamente.');
            console.error('Erro EmailJS:', error);
        });
});

// ========== CADASTRO DE INFLUENCERS ==========
document.getElementById('formInfluencer')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        tipo: 'Influencer',
        nome: document.getElementById('nomeInfluencer').value,
        email: document.getElementById('emailInfluencer').value,
        telefone: document.getElementById('telefoneInfluencer').value,
        redes: document.getElementById('redesInfluencer').value,
        nicho: document.getElementById('nichoInfluencer').value,
        seguidores: document.getElementById('seguidoresInfluencer').value
    };
    
    // Calcular score de relevância
    const score = calcularScore(formData.seguidores, formData.nicho);
    formData.score = score;
    
    // Enviar email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_INFLUENCER, formData)
        .then(function() {
            alert(`✅ Influencer cadastrado com sucesso!\nSeu Score de Relevância: ${score}/100\nVocê receberá um email de confirmação.`);
            document.getElementById('formInfluencer').reset();
        }, function(error) {
            alert('❌ Erro ao cadastrar. Tente novamente.');
            console.error('Erro EmailJS:', error);
        });
});

// ========== CÁLCULO DE SCORE DE RELEVÂNCIA ==========
function calcularScore(seguidores, nicho) {
    let score = 0;
    
    // Baseado em seguidores (0-40 pontos)
    const numSeguidores = parseInt(seguidores.replace(/[^0-9]/g, ''));
    if (numSeguidores < 10000) score += 10;
    else if (numSeguidores < 50000) score += 20;
    else if (numSeguidores < 100000) score += 30;
    else score += 40;
    
    // Baseado em nicho (0-30 pontos)
    const nichosAltos = ['moda', 'beleza', 'fitness', 'tecnologia', 'gastronomia'];
    if (nichosAltos.some(n => nicho.toLowerCase().includes(n))) {
        score += 30;
    } else {
        score += 20;
    }
    
    // Pontos de crescimento potencial (0-30 pontos)
    score += Math.floor(Math.random() * 30) + 1;
    
    return Math.min(score, 100);
}

// ========== ORÇAMENTO INTELIGENTE ==========
function calcularOrcamento() {
    const objetivo = document.getElementById('objetivoCampanha')?.value;
    const orcamento = parseFloat(document.getElementById('orcamentoCampanha')?.value || 0);
    const tipoAcao = document.getElementById('tipoAcao')?.value;
    
    if (!objetivo || !orcamento || !tipoAcao) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Cálculo baseado em tipo de ação
    let multiplicador = 1;
    switch(tipoAcao) {
        case 'post-feed': multiplicador = 1.5; break;
        case 'stories': multiplicador = 1.0; break;
        case 'reels': multiplicador = 2.0; break;
        case 'collab': multiplicador = 2.5; break;
    }
    
    const valorSugerido = orcamento * multiplicador;
    const taxaPlataforma = valorSugerido * 0.20; // 20% da plataforma
    const valorFinal = valorSugerido + taxaPlataforma;
    
    document.getElementById('resultadoOrcamento').innerHTML = `
        <div class="orcamento-resultado">
            <h3>💰 Orçamento Calculado</h3>
            <p><strong>Tipo de Ação:</strong> ${tipoAcao}</p>
            <p><strong>Valor Base:</strong> R$ ${orcamento.toFixed(2)}</p>
            <p><strong>Valor Sugerido:</strong> R$ ${valorSugerido.toFixed(2)}</p>
            <p><strong>Taxa da Plataforma (20%):</strong> R$ ${taxaPlataforma.toFixed(2)}</p>
            <h4>Total: R$ ${valorFinal.toFixed(2)}</h4>
            <button onclick="iniciarPagamento(${valorFinal})">Prosseguir com Pagamento</button>
        </div>
    `;
}

// ========== SISTEMA DE INTERMEDIAÇÃO SEGURA ==========
let acordoAtual = null;

function criarAcordo(empresaId, influencerId, valor) {
    acordoAtual = {
        id: Date.now(),
        empresaId,
        influencerId,
        valor,
        status: 'pendente',
        aceiteEmpresa: false,
        aceiteInfluencer: false
    };
    
    mostrarTermosAcordo();
}

function mostrarTermosAcordo() {
    const modal = document.createElement('div');
    modal.className = 'modal-acordo';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>📋 Acordo de Serviço</h3>
            <div class="termos-acordo">
                <p><strong>Valor:</strong> R$ ${acordoAtual.valor.toFixed(2)}</p>
                <p><strong>Status:</strong> Aguardando confirmação</p>
                <hr>
                <label class="checkbox-acordo">
                    <input type="checkbox" id="aceiteEmpresa">
                    <span>Concordo que a empresa pagará o valor antecipadamente e o influencer entregará o serviço conforme combinado. A plataforma cobrará 20% de taxa.</span>
                </label>
                <label class="checkbox-acordo">
                    <input type="checkbox" id="aceiteInfluencer">
                    <span>Confirmo que realizarei o serviço conforme acordado após o pagamento ser liberado pela plataforma.</span>
                </label>
            </div>
            <button onclick="confirmarAcordo()">Confirmar Acordo</button>
            <button onclick="fecharModal()">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function confirmarAcordo() {
    const aceiteEmpresa = document.getElementById('aceiteEmpresa')?.checked;
    const aceiteInfluencer = document.getElementById('aceiteInfluencer')?.checked;
    
    if (!aceiteEmpresa || !aceiteInfluencer) {
        alert('❌ Ambas as partes precisam aceitar o acordo!');
        return;
    }
    
    acordoAtual.aceiteEmpresa = true;
    acordoAtual.aceiteInfluencer = true;
    acordoAtual.status = 'confirmado';
    
    alert('✅ Acordo confirmado! Prosseguindo para pagamento...');
    fecharModal();
    iniciarPagamento(acordoAtual.valor);
}

function fecharModal() {
    document.querySelector('.modal-acordo')?.remove();
}

// ========== INTEGRAÇÃO MERCADO PAGO ==========
function iniciarPagamento(valor) {
    // Aqui você integraria com o SDK do Mercado Pago
    alert(`💳 Iniciando pagamento de R$ ${valor.toFixed(2)}\n\nEm produção, isso abrirá o checkout do Mercado Pago.\n\nChave configurada: APP_USR-60cc757b-23ee-4a39ea-a3-541ded1f80a1a`);
    
    // Simulação de sucesso
    setTimeout(() => {
        alert('✅ Pagamento realizado com sucesso!\nO valor foi retido pela plataforma e será liberado após a entrega do serviço.');
    }, 2000);
}

// ========== BUSCA E MATCHING ==========
function buscarInfluencers() {
    const nicho = document.getElementById('buscaNicho')?.value;
    const orcamento = document.getElementById('buscaOrcamento')?.value;
    
    // Simulação de busca (em produção, buscaria no banco de dados)
    const resultados = [
        { nome: 'Maria Silva', nicho: 'Moda', seguidores: '50k', score: 85 },
        { nome: 'João Santos', nicho: 'Fitness', seguidores: '120k', score: 92 },
        { nome: 'Ana Costa', nicho: 'Beleza', seguidores: '80k', score: 88 }
    ];
    
    exibirResultados(resultados);
}

function exibirResultados(resultados) {
    const container = document.getElementById('resultadosBusca');
    container.innerHTML = resultados.map(inf => `
        <div class="card-influencer">
            <h4>${inf.nome}</h4>
            <p>Nicho: ${inf.nicho}</p>
            <p>Seguidores: ${inf.seguidores}</p>
            <p>Score: ⭐ ${inf.score}/100</p>
            <button onclick="criarAcordo(1, ${inf.score}, 5000)">Contratar</button>
        </div>
    `).join('');
}

// ========== ESTILOS DINÂMICOS ==========
const style = document.createElement('style');
style.innerHTML = `
    .modal-acordo {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
    }
    .termos-acordo {
        margin: 20px 0;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 10px;
    }
    .checkbox-acordo {
        display: flex;
        align-items: flex-start;
        margin: 15px 0;
        cursor: pointer;
    }
    .checkbox-acordo input {
        margin-right: 10px;
        margin-top: 3px;
    }
    .checkbox-acordo span {
        font-size: 14px;
        line-height: 1.5;
    }
    .orcamento-resultado {
        background: linear-gradient(135deg, #6a11cb, #ff7a18);
        color: white;
        padding: 25px;
        border-radius: 15px;
        margin-top: 20px;
    }
    .orcamento-resultado button {
        background: white;
        color: #6a11cb;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 15px;
    }
    .card-influencer {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin: 10px 0;
    }
`;
document.head.appendChild(style);

console.log('✅ InfluencyHub carregado com sucesso!');
console.log('📧 EmailJS:', EMAILJS_SERVICE_ID);
console.log('💳 Mercado Pago configurado');
