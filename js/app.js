/**
 * 1ª CORRIDA DA PARÓQUIA DE NOSSA SENHORA APARECIDA - JS APP LOGIC
 * Sistema com QR Code PIX R$ 75,00, WhatsApp, Painel Administrativo e Lista Pública
 */

// Chave PIX e Telefone da Paróquia (configuráveis)
const PARISH_CONFIG = {
  pixKey: "paroquiansaparecida@sg.org.br",
  pixName: "PAROQUIA NSA SG",
  pixCity: "SAO GONCALO",
  whatsappPhone: "5521999999999", // Telefone da secretaria/organização
  price: 75.00
};

// Banco de Dados Local Inicial de Atletas
const DEFAULT_ATHLETES = [
  {
    id: "#NSA-1001",
    name: "Carlos Eduardo Silva",
    cpf: "123.456.789-10",
    birth: "1992-05-14",
    phone: "(21) 98888-1111",
    gender: "Masculino",
    email: "carlos.silva@email.com",
    shirtSize: "G",
    modality: "Corrida 5 KM",
    status: "confirmed",
    date: "18/08/2026 14:32"
  },
  {
    id: "#NSA-1002",
    name: "Mariana Costa Santos",
    cpf: "234.567.890-21",
    birth: "1988-11-20",
    phone: "(21) 97777-2222",
    gender: "Feminino",
    email: "mariana.costa@email.com",
    shirtSize: "Baby Look M",
    modality: "Corrida 5 KM",
    status: "confirmed",
    date: "18/08/2026 15:10"
  },
  {
    id: "#NSA-1003",
    name: "Rodrigo Alcantara",
    cpf: "345.678.901-32",
    birth: "1980-03-08",
    phone: "(21) 96666-3333",
    gender: "Masculino",
    email: "rodrigo.alcantara@email.com",
    shirtSize: "GG",
    modality: "Corrida 5 KM",
    status: "confirmed",
    date: "18/08/2026 16:45"
  },
  {
    id: "#NSA-1004",
    name: "Fernanda Ribeiro Lima",
    cpf: "456.789.012-43",
    birth: "1996-09-25",
    phone: "(21) 95555-4444",
    gender: "Feminino",
    email: "fernanda.lima@email.com",
    shirtSize: "M",
    modality: "Corrida 5 KM",
    status: "pending",
    date: "18/08/2026 18:20"
  },
  {
    id: "#NSA-1005",
    name: "Gabriel Martins Soares",
    cpf: "567.890.123-54",
    birth: "1990-07-12",
    phone: "(21) 94444-5555",
    gender: "Masculino",
    email: "gabriel.soares@email.com",
    shirtSize: "P",
    modality: "Corrida 5 KM",
    status: "confirmed",
    date: "18/08/2026 19:05"
  }
];

// Obter atletas do LocalStorage
function getAthletes() {
  const data = localStorage.getItem('NSA_ATHLETES_DB');
  if (!data) {
    localStorage.setItem('NSA_ATHLETES_DB', JSON.stringify(DEFAULT_ATHLETES));
    return DEFAULT_ATHLETES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_ATHLETES;
  }
}

// Salvar atletas no LocalStorage
function saveAthletes(athletes) {
  localStorage.setItem('NSA_ATHLETES_DB', JSON.stringify(athletes));
}

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNavbar();
  initFaqAccordion();
  initInputMasks();
  renderPublicAthletesList();
});

/* ==========================================================================
   1. CONTAGEM REGRESSIVA PARA 12 DE OUTUBRO
   ========================================================================== */
function initCountdown() {
  const currentYear = new Date().getFullYear();
  let targetDate = new Date(`${currentYear}-10-12T08:00:00`);
  
  if (targetDate.getTime() < new Date().getTime()) {
    targetDate = new Date(`${currentYear + 1}-10-12T08:00:00`);
  }

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. NAVBAR & SCROLL
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   4. INPUT MASKS
   ========================================================================== */
function initInputMasks() {
  const cpfInput = document.getElementById('athlete-cpf');
  const phoneInput = document.getElementById('athlete-phone');

  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 5) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      }
      e.target.value = v;
    });
  }
}

/* ==========================================================================
   5. LISTA PÚBLICA DE ATLETAS INSCRITOS
   ========================================================================== */
function renderPublicAthletesList(filterQuery = '') {
  const tableBody = document.getElementById('publicAthletesTableBody');
  const countBadge = document.getElementById('publicAthletesCount');
  if (!tableBody) return;

  const athletes = getAthletes();
  // Mostrar apenas confirmados na lista pública
  const confirmedAthletes = athletes.filter(a => a.status === 'confirmed');

  const filtered = confirmedAthletes.filter(a => {
    const q = filterQuery.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
  });

  if (countBadge) {
    countBadge.textContent = `${confirmedAthletes.length} Atleta(s) Confirmado(s)`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 2rem; color: #64748b;">
          <i class="fa-solid fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
          Nenhum atleta confirmado encontrado com esse termo.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(a => `
    <tr>
      <td>
        <strong style="color: var(--color-gold-dark); font-family: var(--font-heading);">${a.id}</strong>
      </td>
      <td>
        <div style="font-weight: 700; color: var(--color-primary-navy);">${a.name}</div>
      </td>
      <td>
        <span style="color: #475569; font-weight: 600;">${a.modality}</span>
      </td>
      <td>
        <span class="badge-status confirmed">
          <i class="fa-solid fa-circle-check"></i> Confirmado
        </span>
      </td>
    </tr>
  `).join('');
}

function handlePublicSearch(e) {
  renderPublicAthletesList(e.target.value);
}

/* ==========================================================================
   6. REGISTRATION MODAL FLOW & WHATSAPP GENERATION
   ========================================================================== */
const registrationState = {
  name: '',
  cpf: '',
  birth: '',
  phone: '',
  gender: '',
  email: '',
  shirtSize: 'P',
  registrationId: ''
};

function openRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    goToStep(1);
  }
}

function closeRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('registrationModal');
  if (e.target === modal) {
    closeRegistrationModal();
  }
});

function goToStep(stepNumber) {
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`form-step-${i}`);
    if (stepEl) stepEl.classList.remove('active');

    const tabEl = document.getElementById(`tab-step-${i}`);
    if (tabEl) {
      tabEl.classList.remove('active');
      if (i < stepNumber) {
        tabEl.classList.add('completed');
      } else {
        tabEl.classList.remove('completed');
      }
    }
  }

  const currentStepEl = document.getElementById(`form-step-${stepNumber}`);
  if (currentStepEl) currentStepEl.classList.add('active');

  const currentTabEl = document.getElementById(`tab-step-${stepNumber}`);
  if (currentTabEl) currentTabEl.classList.add('active');
}

function handleStep1Submit(e) {
  e.preventDefault();
  registrationState.name = document.getElementById('athlete-name').value.trim();
  registrationState.cpf = document.getElementById('athlete-cpf').value.trim();
  registrationState.birth = document.getElementById('athlete-birth').value;
  registrationState.phone = document.getElementById('athlete-phone').value.trim();
  registrationState.gender = document.getElementById('athlete-gender').value;
  registrationState.email = document.getElementById('athlete-email').value.trim();

  goToStep(2);
}

function handleStep2Submit(e) {
  e.preventDefault();
  const selectedShirt = document.querySelector('input[name="shirt-size"]:checked');
  if (selectedShirt) {
    registrationState.shirtSize = selectedShirt.value;
  }

  // Gera número de inscrição único
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  registrationState.registrationId = `#NSA-${randomNum}`;

  // Salva no banco de dados como "pending"
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newAthlete = {
    id: registrationState.registrationId,
    name: registrationState.name,
    cpf: registrationState.cpf,
    birth: registrationState.birth,
    phone: registrationState.phone,
    gender: registrationState.gender,
    email: registrationState.email,
    shirtSize: registrationState.shirtSize,
    modality: "Corrida 5 KM",
    status: "pending",
    date: dateStr
  };

  const athletes = getAthletes();
  athletes.unshift(newAthlete);
  saveAthletes(athletes);

  // Prepara botão de WhatsApp com texto personalizado
  setupWhatsAppProofButton();

  goToStep(3);
}

function setupWhatsAppProofButton() {
  const btn = document.getElementById('btnSendWhatsappProof');
  if (!btn) return;

  const msg = `Olá, Paróquia Nossa Senhora Aparecida! 🙏🏃\nAcabei de realizar minha inscrição no site da 1ª Corrida e estou enviando o comprovante do PIX de R$ 75,00:\n\n👤 *Atleta:* ${registrationState.name}\n🔢 *Inscrição:* ${registrationState.registrationId}\n📄 *CPF:* ${registrationState.cpf}\n👕 *Camiseta:* ${registrationState.shirtSize}\n\nPor favor, confirmem minha inscrição!`;
  
  const encodedMsg = encodeURIComponent(msg);
  btn.href = `https://wa.me/${PARISH_CONFIG.whatsappPhone}?text=${encodedMsg}`;
}

function copyPixCode() {
  const codeField = document.getElementById('pix-code-field');
  if (codeField) {
    codeField.select();
    navigator.clipboard.writeText(codeField.value).then(() => {
      showToast('Chave PIX copiada com sucesso!');
    }).catch(() => {
      document.execCommand('copy');
      showToast('Chave PIX copiada com sucesso!');
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toastMsg');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}
