/*
  MEGA PACK 3D™ - Dynamic Conversion & Interaction Engine
  Lógica: Marketing Digital de Alta Conversão
  Gatilhos: Escassez, Urgência, Prova Social, Autoridade
*/

document.addEventListener('DOMContentLoaded', () => {
  initUrgencyTimer();
  initVisitorCounter();
  initPurchasePopups();
  initFaqAccordion();
  initCtaSmoothScroll();
});

/* ==========================================================================
   1. CRONÔMETRO REGRESSIVO DE URGÊNCIA (15 minutos com Persistência)
   ========================================================================== */
function initUrgencyTimer() {
  const timerElements = document.querySelectorAll('.urgency-timer');
  if (timerElements.length === 0) return;

  const durationInSeconds = 15 * 60; // 15 minutos
  let remainingTime = durationInSeconds;

  // Tenta recuperar tempo salvo no localStorage para não resetar no refresh
  const savedEndTime = localStorage.getItem('mega_pack_3d_endtime');
  const now = Math.floor(Date.now() / 1000);

  if (savedEndTime && savedEndTime > now) {
    remainingTime = savedEndTime - now;
  } else {
    // Caso não tenha ou já tenha expirado, define um novo tempo final (15 minutos a partir de agora)
    const newEndTime = now + durationInSeconds;
    localStorage.setItem('mega_pack_3d_endtime', newEndTime);
  }

  function updateTimer() {
    if (remainingTime <= 0) {
      // Quando zera, reinicia sutilmente para manter a conversão de novos usuários
      remainingTime = durationInSeconds;
      const newEndTime = Math.floor(Date.now() / 1000) + durationInSeconds;
      localStorage.setItem('mega_pack_3d_endtime', newEndTime);
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    timerElements.forEach(el => {
      el.textContent = `${formattedMinutes}:${formattedSeconds}`;
    });

    remainingTime--;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. CONTADOR DINÂMICO DE VISITAS (Prova Social / FOMO)
   ========================================================================== */
function initVisitorCounter() {
  const visitorCountEl = document.getElementById('visitor-count');
  if (!visitorCountEl) return;

  // Valor inicial padrão
  let currentVisitors = Math.floor(Math.random() * (162 - 131 + 1)) + 131;
  visitorCountEl.textContent = currentVisitors;

  // Oscilação natural das visitas
  setInterval(() => {
    const change = Math.floor(Math.random() * 7) - 3; // -3, -2, -1, 0, 1, 2, 3
    currentVisitors += change;

    // Mantém entre limites realistas de conversão
    if (currentVisitors < 110) currentVisitors = 120;
    if (currentVisitors > 185) currentVisitors = 170;

    visitorCountEl.textContent = currentVisitors;
  }, 4000);
}

/* ==========================================================================
   3. NOTIFICAÇÕES POPUP FAKE DE COMPRAS RECENTES (Urgência Social)
   ========================================================================== */
function initPurchasePopups() {
  // Lista de nomes e estados brasileiros comuns
  const names = [
    'Marcos Silva', 'Thiago Ramos', 'Felipe Oliveira', 'Aline Costa', 
    'Rodrigo Santos', 'Jefferson Sousa', 'Gabriela Lima', 'Juliana Rezende', 
    'Carlos Eduardo', 'Mateus Pinheiro', 'Bruno Fernandes', 'Lucas Viana',
    'Eduardo Castro', 'Fernanda Souza', 'Rafael Albuquerque', 'André Teixeira'
  ];

  const locations = [
    'São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Curitiba/PR',
    'Porto Alegre/RS', 'Salvador/BA', 'Fortaleza/CE', 'Recife/PE',
    'Campinas/SP', 'Goiânia/GO', 'Brasília/DF', 'Manaus/AM',
    'Florianópolis/SC', 'Vitória/ES', 'Natal/RN', 'Joinville/SC'
  ];

  const times = [
    'há 2 minutos', 'há 45 segundos', 'há 3 minutos', 'há 1 minuto',
    'há 15 segundos', 'há 4 minutos', 'agora mesmo', 'há 50 segundos'
  ];

  // Cria a estrutura HTML do popup dinamicamente e injeta no body
  const popup = document.createElement('div');
  popup.className = 'purchase-popup';
  popup.innerHTML = `
    <div class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
    </div>
    <div class="purchase-popup-content">
      <span class="purchase-popup-title" id="popup-user">Marcos de São Paulo/SP</span>
      <span class="purchase-popup-desc">Acabou de adquirir o <strong style="color: #ff4e00;">Plano Completo</strong></span>
      <span class="purchase-popup-time" id="popup-time">há 45 segundos</span>
    </div>
  `;
  document.body.appendChild(popup);

  function triggerPopup() {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];

    document.getElementById('popup-user').innerHTML = `${randomName} (${randomLocation})`;
    document.getElementById('popup-time').textContent = randomTime;

    // Mostra o popup
    popup.classList.add('show');

    // Esconde após 5 segundos
    setTimeout(() => {
      popup.classList.remove('show');
    }, 5500);
  }

  // Primeiro disparo ocorre após 8 segundos
  setTimeout(() => {
    triggerPopup();
    // Dispara a cada 16 a 24 segundos alternadamente
    setInterval(() => {
      triggerPopup();
    }, Math.floor(Math.random() * (24000 - 16000 + 1)) + 16000);
  }, 8000);
}

/* ==========================================================================
   4. ACCORDION DO FAQ (Perguntas Frequentes)
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens FAQ abertos (estilo acordeão profissional)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Alterna o estado do item clicado
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        // Define a altura dinâmica baseada no scrollHeight real do conteúdo interno
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. ROLAGEM SUAVE PARA AS CTA (Smooth Scroll para a Oferta)
   ========================================================================== */
function initCtaSmoothScroll() {
  const ctaLinks = document.querySelectorAll('a[href^="#"]');
  
  ctaLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        // Rola até o elemento de destino com compensação de offset caso haja tarja fixa
        const offset = 40;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
