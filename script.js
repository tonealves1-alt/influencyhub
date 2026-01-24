// ======== CONFIGURAÇÕES EMAILJS ========
const EMAILJS_PUBLIC_KEY   = 'EGF_hBVqUpyXpum6G';
const EMAILJS_SERVICE_ID   = 'service_27r93m1';
const EMAILJS_TEMPLATE_EMPRESA    = 'template_qacl1zh';
const EMAILJS_TEMPLATE_INFLUENCER = 'template_cqql81u';

// Inicializar EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ======== MOSTRAR FORMULÁRIOS ========
// Recebe "empresa", "influenciador" ou "agencia" e exibe o formulário correspondente.
function mostrarSecao(tipo) {
  const ids = ['form-empresa', 'form-influenciador', 'form-agencia'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById('form-' + tipo);
  if (target) target.style.display = 'block';
}

// ======== CADASTRO DE EMPRESAS ========
const formEmpresa = document.getElementById('formEmpresa');
if (formEmpresa) {
  formEmpresa.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
      nomeEmpresa: document.getElementById('nomeEmpresa').value.trim(),
      emailEmpresa: document.getElementById('emailEmpresa').value.trim(),
      telefoneEmpresa: document.getElementById('telefoneEmpresa').value.trim(),
      segmentoEmpresa: document.getElementById('segmentoEmpresa').value.trim(),
      siteEmpresa: document.getElementById('siteEmpresa').value.trim(),
      objetivosEmpresa: document.getElementById('objetivosEmpresa').value.trim(),
      orcamentoMensal: document.getElementById('orcamentoMensal').value.trim()
    };
    // Enviar via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_EMPRESA, data)
      .then(() => {
        alert('✅ Empresa cadastrada com sucesso! Você receberá um email de confirmação.');
        formEmpresa.reset();
      })
      .catch((err) => {
        console.error('Erro EmailJS (empresa):', err);
        alert('❌ Erro ao cadastrar empresa. Tente novamente.');
      });
  });
}

// ======== CADASTRO DE INFLUENCIADORES ========
const formInfluencer = document.getElementById('formInfluenciador');
if (formInfluencer) {
  formInfluencer.addEventListener('submit', function (e) {
    e.preventDefault();
    const seguidores = Number(document.getElementById('seguidoresInfluencer').value || 0);
    const nicho      = document.getElementById('nichoInfluencer').value.trim();
    const data = {
      nomeInfluencer: document.getElementById('nomeInfluencer').value.trim(),
      emailInfluencer: document.getElementById('emailInfluencer').value.trim(),
      telefoneInfluencer: document.getElementById('telefoneInfluencer').value.trim(),
      instagramInfluencer: document.getElementById('instagramInfluencer').value.trim(),
      seguidoresInfluencer: seguidores,
      nichoInfluencer: nicho,
      frequenciaPostagem: document.getElementById('frequenciaPostagem').value.trim(),
      formatoPreferido: document.getElementById('formatoPreferido').value.trim()
    };
    // Calcular score de relevância
    const score = calcularScore(seguidores, nicho);
    data.score = score;
    // Enviar via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_INFLUENCER, data)
      .then(() => {
        alert(`✅ Influenciador cadastrado com sucesso!\nSeu Score de Relevância: ${score}/100\nVocê receberá um email de confirmação.`);
        formInfluencer.reset();
      })
      .catch((err) => {
        console.error('Erro EmailJS (influencer):', err);
        alert('❌ Erro ao cadastrar influenciador. Tente novamente.');
      });
  });
}

// ======== CADASTRO DE AGÊNCIAS ========
const formAgencia = document.getElementById('formAgencia');
if (formAgencia) {
  formAgencia.addEventListener('submit', function (e) {
    e.preventDefault();
    // Captura simples. Em produção, crie seu próprio template EmailJS para agências.
    const data = {
      nomeAgencia: document.getElementById('nomeAgencia').value.trim(),
      emailAgencia: document.getElementById('emailAgencia').value.trim(),
      telefoneAgencia: document.getElementById('telefoneAgencia').value.trim(),
      numClientes: document.getElementById('numClientes').value.trim(),
      especialidadeAgencia: document.getElementById('especialidadeAgencia').value.trim(),
      servicosAgencia: document.getElementById('servicosAgencia').value.trim()
    };
    // Aqui você pode enviar para um template separado ou apenas mostrar um alerta
    alert('✅ Agência cadastrada com sucesso!');
    formAgencia.reset();
  });
}

// ======== FUNÇÃO DE SCORE DE RELEVÂNCIA ========
function calcularScore(seguidores, nicho) {
  let score = 0;
  // Baseado em seguidores (0-40 pontos)
  if (seguidores < 10000) score += 10;
  else if (seguidores < 50000) score += 20;
  else if (seguidores < 100000) score += 30;
  else score += 40;
  // Nichos valorizados (0-30 pontos)
  const nichosAltos = ['moda','beleza','fitness','tech','tecnologia','saude','gastronomia','comida'];
  if (nichosAltos.some(n => nicho.toLowerCase().includes(n))) {
    score += 30;
  } else {
    score += 20;
  }
  // Pontos aleatórios de crescimento potencial (0-30)
  score += Math.floor(Math.random() * 30) + 1;
  return Math.min(score, 100);
}

// ======== CÁLCULO DE ORÇAMENTO INTELIGENTE ========
function calcularOrcamento() {
  const seguidores = Number(document.getElementById('calcSeguidores').value || 0);
  const nicho      = document.getElementById('calcNicho').value;
  const formato    = document.getElementById('calcFormato').value;
  const objetivo   = document.getElementById('calcObjetivo').value;
  if (!seguidores || !nicho || !formato || !objetivo) {
    alert('Por favor, preencha todos os campos da calculadora.');
    return;
  }
  // Base: 2% do número de seguidores (ex: 50k => R$1000)
  let base = seguidores * 0.02;
  // Multiplicadores por nicho
  const nicheMult = {
    saude: 1.25,
    financas: 1.35,
    tech: 1.20,
    moda: 1.10,
    viagem: 1.10,
    fitness: 1.10,
    comida: 1.00,
    lifestyle: 1.00
  };
  // Multiplicadores por formato
  const formatMult = {
    stories: 1.0,
    stories3: 2.5,
    stories7: 4.0,
    feed: 1.5,
    feed3: 3.5,
    reels: 2.0,
    reels3: 4.0,
    combo: 5.0
  };
  // Multiplicadores por objetivo
  const objectiveMult = {
    branding: 1.0,
    vendas: 1.20,
    trafego: 1.10,
    engajamento: 0.90
  };
  const total = base * (nicheMult[nicho] || 1) * (formatMult[formato] || 1) * (objectiveMult[objetivo] || 1);
  const valorMin = total * 0.85;
  const valorMid = total;
  const valorPre = total * 1.25;
  // Atualiza a interface
  document.getElementById('precoMinimo').textContent = `R$ ${valorMin.toFixed(0)}`;
  document.getElementById('precoMedio').textContent = `R$ ${valorMid.toFixed(0)}`;
  document.getElementById('precoPremium').textContent = `R$ ${valorPre.toFixed(0)}`;
  document.getElementById('resultadoOrcamento').style.display = 'block';
}

// Mensagens de debug no console
console.log('📧 EmailJS configurado:', EMAILJS_SERVICE_ID);
console.log('💳 Mercado Pago configurado');
