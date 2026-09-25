document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS DA FASE 1: TRAVAMENTO & AVISOS DE ANTIVÍRUS / SEGURANÇA
  const crashOverlay = document.getElementById('crash-simulation-overlay');
  const crashLogPwd = document.getElementById('crash-log-pwd');
  const errWins = [
    document.getElementById('err-win-1'),
    document.getElementById('err-win-2'),
    document.getElementById('err-win-3'),
    document.getElementById('err-win-4'),
    document.getElementById('err-win-5'),
    document.getElementById('err-win-6')
  ];

  // ELEMENTOS DO BOTÃO "FECHAR" FAKE QUE FOGE DO CLIQUE
  const btnFakeClose = document.getElementById('btn-fake-close');
  const fakeCloseToast = document.getElementById('fake-close-toast');
  const allCloseButtons = document.querySelectorAll('.error-close');
  let fakeCloseCount = 0;

  // ELEMENTOS DA FASE 2: TELA PRETA & MENSAGEM "VOCÊ FOI HACKEADO"
  const hackerBlackScreen = document.getElementById('hacker-black-screen');
  const matrixCodeStream = document.getElementById('matrix-code-stream');
  const hackerMessageCard = document.getElementById('hacker-message-card');
  const hackScreenName = document.getElementById('hack-screen-name');
  const hackScreenPassword = document.getElementById('hack-screen-password');
  const btnProceedToSecurity = document.getElementById('btn-proceed-to-security');

  // ELEMENTOS DA ETAPA 1 (INPUT)
  const stepInputSection = document.getElementById('step-input-section');
  const userNameInput = document.getElementById('user-name-input');
  const passwordInput = document.getElementById('password-input');
  const toggleBtn = document.getElementById('toggle-password');
  const eyeOpen = document.getElementById('eye-open');
  const eyeClosed = document.getElementById('eye-closed');
  const btnSubmit = document.getElementById('btn-submit-check');

  // ELEMENTOS DO FLUXO PRINCIPAL

  // ELEMENTOS DA FASE 4 (AVISOS DE SEGURANÇA)
  const stepAlertSection = document.getElementById('step-alert-section');
  const securityAlertBox = document.getElementById('security-alert-box');
  const btnGoToFecart = document.getElementById('btn-go-to-fecart');

  // ELEMENTOS DA FASE 5 (TELA SEPARADA EXCLUSIVA DA FECART & DESBLOQUEIO COM SENHA 'FecartCiber2026')
  const stepFecartSection = document.getElementById('step-fecart-section');
  const btnBackToAlerts = document.getElementById('btn-back-to-alerts');
  const btnTestAgainFecart = document.getElementById('btn-test-again-fecart');
  const unlockPasswordBox = document.getElementById('unlock-password-box');
  const unlockPasswordInput = document.getElementById('unlock-password-input');
  const toggleUnlockPassword = document.getElementById('toggle-unlock-password');
  const unlockEyeOpen = document.getElementById('unlock-eye-open');
  const unlockEyeClosed = document.getElementById('unlock-eye-closed');
  const btnUnlockRealDiag = document.getElementById('btn-unlock-real-diag');
  const unlockErrorMsg = document.getElementById('unlock-error-msg');
  const realDiagLockedWrapper = document.getElementById('real-diag-locked-wrapper');

  // ELEMENTOS DO DIAGNÓSTICO REAL (REVELADOS APÓS DIGITAR 'FecartCiber2026')
  const realMeterBar = document.getElementById('real-meter-bar');
  const realMeterLevelText = document.getElementById('real-meter-level-text');
  const realDiagLevel = document.getElementById('real-diag-level');
  const realDiagCrackTime = document.getElementById('real-diag-crack-time');
  const realRuleLength = document.getElementById('real-rule-length');
  const realRuleUpper = document.getElementById('real-rule-upper');
  const realRuleLower = document.getElementById('real-rule-lower');
  const realRuleNumber = document.getElementById('real-rule-number');
  const realRuleSpecial = document.getElementById('real-rule-special');
  const realFeedbackList = document.getElementById('real-feedback-list');
  const fortifiedPasswordText = document.getElementById('fortified-password-text');
  const btnCopyFortified = document.getElementById('btn-copy-fortified');
  const btnTestAgain = document.getElementById('btn-test-again');

  // SENHA MESTRA PARA DESBLOQUEAR O DIAGNÓSTICO REAL
  const MASTER_UNLOCK_PASSWORD = 'kfW51Y#)V3mP';

  // Dados da verificação atual em memória (sem salvar em banco nem localStorage)
  let currentCheckData = null;
  let matrixInterval = null;
  let hackCardTimeout = null;
  let autoSecurityTimeout = null;

  // Detecta URL base da API
  function getApiBase() {
    if (window.location.protocol === 'file:') {
      return 'http://localhost:3000';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return window.location.port === '3000' ? '' : 'http://localhost:3000';
    }
    return '';
  }

  const API_BASE = getApiBase();

  // Função para tocar som sintético de glitch/erro/sucesso (Web Audio API)
  function playGlitchBeep(type = 'dodge') {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'dodge') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      } else if (type === 'unlock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (type === 'unlock' ? 0.28 : 0.14));
    } catch (e) {}
  }

  // =========================================================================
  // SISTEMA DO BOTÃO "FECHAR" FAKE QUE MUDA DE LUGAR QUANDO CLICADO
  // =========================================================================
  function dodgeFakeCloseButton(element, isSmallClose = false) {
    fakeCloseCount++;
    playGlitchBeep('dodge');

    if (isSmallClose) {
      // Para os botões "X" das janelas de erro
      const randX = (Math.random() - 0.5) * 140;
      const randY = (Math.random() - 0.5) * 70;
      element.style.transform = `translate(${randX}px, ${randY}px) rotate(${Math.random() * 24 - 12}deg)`;
    } else {
      // Para o botão principal "Fechar Janela"
      const maxDistanceX = 160;
      const maxDistanceY = 70;
      const randX = (Math.random() * 2 - 1) * maxDistanceX;
      const randY = (Math.random() * 2 - 1) * maxDistanceY;
      const rot = (Math.random() * 20 - 10);

      element.style.transform = `translate(${randX}px, ${randY}px) scale(0.96) rotate(${rot}deg)`;
      element.style.backgroundColor = 'rgba(255, 51, 102, 0.55)';

      const messages = [
        '⚠️ Acesso Negado: Não é possível fechar esta janela!',
        '🚫 O malware desabilitou o botão Fechar.',
        '⚡ Tentativa de escapar falhou!',
        '💀 BOTÃO BLOQUEADO PELO SISTEMA!',
        '🔥 Sistema 100% comprometido! O botão continuará fugindo.'
      ];

      if (fakeCloseToast) {
        const msg = messages[Math.min(fakeCloseCount - 1, messages.length - 1)];
        fakeCloseToast.textContent = `[Tentativa #${fakeCloseCount}] ${msg}`;
        fakeCloseToast.classList.remove('hidden');
      }

      // Adiciona um tremor extra à tela
      document.body.classList.add('system-crashing');
    }
  }

  if (btnFakeClose) {
    btnFakeClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dodgeFakeCloseButton(btnFakeClose, false);
    });
    btnFakeClose.addEventListener('mouseenter', () => {
      if (fakeCloseCount >= 2 && Math.random() > 0.4) {
        dodgeFakeCloseButton(btnFakeClose, false);
      }
    });
    btnFakeClose.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeFakeCloseButton(btnFakeClose, false);
    });
  }

  allCloseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dodgeFakeCloseButton(btn, true);
    });
  });

  // Toggle Exibir / Ocultar Senha do Formulário Inicial
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      if (eyeOpen) eyeOpen.classList.toggle('hidden', !isPassword);
      if (eyeClosed) eyeClosed.classList.toggle('hidden', isPassword);
    });
  }

  // Toggle Exibir / Ocultar Senha de Desbloqueio (FecartCiber2026)
  if (toggleUnlockPassword && unlockPasswordInput) {
    toggleUnlockPassword.addEventListener('click', () => {
      const isPassword = unlockPasswordInput.type === 'password';
      unlockPasswordInput.type = isPassword ? 'text' : 'password';
      if (unlockEyeOpen) unlockEyeOpen.classList.toggle('hidden', !isPassword);
      if (unlockEyeClosed) unlockEyeClosed.classList.toggle('hidden', isPassword);
    });
  }

  // Enter para verificar no formulário inicial
  if (userNameInput) {
    userNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') passwordInput.focus();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submitCheck();
    });
  }

  // Enter para desbloquear diagnóstico com senha
  if (unlockPasswordInput) {
    unlockPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUnlockRealDiagnosis();
    });
  }

  // Event Listeners principais
  if (btnSubmit) btnSubmit.addEventListener('click', submitCheck);
  if (btnUnlockRealDiag) btnUnlockRealDiag.addEventListener('click', handleUnlockRealDiagnosis);

  // ========================================================
  // SIMULAÇÃO DE ATAQUE — TELA TREMENDO + POPUPS EM CASCATA
  // ========================================================

  const ATTACK_POPUPS = [
    {
      title: '⚠️ ALERTA DE SEGURANÇA',
      body: 'Seu dispositivo não passou no teste de segurança.\nVulnerabilidade crítica detectada!',
      btn: 'Fechar',
      color: '#ff3366'
    },
    {
      title: '🔴 ACESSO NÃO AUTORIZADO',
      body: 'Suas credenciais foram comprometidas.\nUm invasor está acessando seus dados agora.',
      btn: 'OK',
      color: '#ff6600'
    },
    {
      title: '☠️ VÍRUS DETECTADO',
      body: 'Trojan.PWS.Generic encontrado no sistema.\nRemovendo arquivos críticos...',
      btn: 'Cancelar',
      color: '#cc0000'
    },
    {
      title: '🚨 FIREWALL DESATIVADO',
      body: 'Seu firewall foi desligado remotamente.\nConexão externa ativa na porta 4444.',
      btn: 'Ignorar',
      color: '#ff3366'
    },
    {
      title: '💀 DADOS EXPOSTOS',
      body: 'Senha capturada com sucesso.\nEnviando para servidor remoto...',
      btn: 'Fechar',
      color: '#990000'
    },
    {
      title: '🔓 CONTA INVADIDA',
      body: 'Login realizado em outro dispositivo.\nLocalização: Desconhecida',
      btn: 'OK',
      color: '#ff3366'
    },
    {
      title: '⚡ SISTEMA COMPROMETIDO',
      body: 'Acesso root obtido.\nBackdoor instalado com sucesso.',
      btn: 'Fechar',
      color: '#cc2200'
    }
  ];

  let attackRunning = false;
  let attackTimeouts = [];
  let spawnedPopups = [];

  function clearAllAttackEffects() {
    attackRunning = false;
    attackTimeouts.forEach(t => clearTimeout(t));
    attackTimeouts = [];
    spawnedPopups.forEach(p => p.remove());
    spawnedPopups = [];
    document.body.classList.remove('attack-shake', 'attack-red-flash');
    const overlay = document.getElementById('attack-dimmer');
    if (overlay) overlay.remove();
  }

  function spawnPopup(data, index) {
    const popup = document.createElement('div');
    popup.className = 'attack-popup';
    popup.style.setProperty('--pop-color', data.color);

    // Posição aleatória mas dentro da tela
    const maxX = Math.max(window.innerWidth - 320, 10);
    const maxY = Math.max(window.innerHeight - 180, 10);
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.zIndex = 10000 + index;

    popup.innerHTML = `
      <div class="apop-titlebar">
        <span class="apop-title">${data.title}</span>
        <button class="apop-close" title="Fechar">✕</button>
      </div>
      <div class="apop-body">${data.body.replace(/\n/g, '<br>')}</div>
      <div class="apop-footer">
        <button class="apop-btn">${data.btn}</button>
      </div>
    `;

    document.body.appendChild(popup);
    spawnedPopups.push(popup);

    // Fechar ao clicar nos botões (mas o ataque continua)
    popup.querySelector('.apop-close').addEventListener('click', () => popup.remove());
    popup.querySelector('.apop-btn').addEventListener('click', () => popup.remove());

    return popup;
  }

  function runAttackSimulation(onComplete) {
    if (attackRunning) return;
    attackRunning = true;

    // Escurece o fundo com overlay semi-transparente
    const dimmer = document.createElement('div');
    dimmer.id = 'attack-dimmer';
    dimmer.className = 'attack-dimmer';
    document.body.appendChild(dimmer);

    // Começa a tremer a tela
    document.body.classList.add('attack-shake');

    // Dispara os popups em cascata com delays
    const delays = [100, 500, 950, 1350, 1700, 2050, 2350];

    delays.forEach((delay, i) => {
      const t = setTimeout(() => {
        if (!attackRunning) return;
        const popupData = ATTACK_POPUPS[i % ATTACK_POPUPS.length];
        spawnPopup(popupData, i);

        // Flash vermelho a cada popup
        document.body.classList.add('attack-red-flash');
        setTimeout(() => document.body.classList.remove('attack-red-flash'), 180);
      }, delay);
      attackTimeouts.push(t);
    });

    // Após 3.2s — para tudo e chama o callback
    const endT = setTimeout(() => {
      clearAllAttackEffects();
      onComplete();
    }, 3200);
    attackTimeouts.push(endT);
  }

  // CLIQUE NO BOTÃO OU LINK CHAMATIVO DO GERADOR DISPARA A SIMULAÇÃO DE HACK
  const handleTriggerHack = (e) => {
    if (e) e.preventDefault();
    // Roda a simulação de ataque (tela treme + popups) e depois continua para a sequência de hack
    runAttackSimulation(() => {
      triggerMultiPhaseHackingSequence();
    });
  };

  if (btnGenerateFortified) {
    btnGenerateFortified.addEventListener('click', handleTriggerHack);
  }
  if (linkGenerateFortified) {
    linkGenerateFortified.addEventListener('click', handleTriggerHack);
    linkGenerateFortified.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleTriggerHack(e);
      }
    });
  }

  if (btnProceedToSecurity) btnProceedToSecurity.addEventListener('click', showSecurityExplanationPhase);
  if (btnTestAgain) btnTestAgain.addEventListener('click', resetToStart);


  // NAVEGAÇÃO ENTRE AVISOS DE SEGURANÇA E TELA EXCLUSIVA DA FECART
  if (btnGoToFecart) {
    btnGoToFecart.addEventListener('click', () => {
      if (stepAlertSection) stepAlertSection.classList.add('hidden');
      if (stepFecartSection) {
        stepFecartSection.classList.remove('hidden');
        stepFecartSection.classList.add('fade-in');
        stepFecartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (btnBackToAlerts) {
    btnBackToAlerts.addEventListener('click', () => {
      if (stepFecartSection) stepFecartSection.classList.add('hidden');
      if (stepAlertSection) {
        stepAlertSection.classList.remove('hidden');
        stepAlertSection.classList.add('fade-in');
        stepAlertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (btnTestAgainFecart) {
    btnTestAgainFecart.addEventListener('click', resetToStart);
  }

  // COPIAR SENHA BLINDADA PARA O CLIPBOARD
  if (btnCopyFortified && fortifiedPasswordText) {
    btnCopyFortified.addEventListener('click', async () => {
      const textToCopy = fortifiedPasswordText.textContent.trim();
      if (!textToCopy || textToCopy.includes('Carregando')) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const tempTextArea = document.createElement('textarea');
          tempTextArea.value = textToCopy;
          tempTextArea.style.position = 'fixed';
          tempTextArea.style.opacity = '0';
          document.body.appendChild(tempTextArea);
          tempTextArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempTextArea);
        }

        btnCopyFortified.classList.add('copied');
        btnCopyFortified.innerHTML = '<span class="copy-icon">✅</span><span class="copy-text">Copiado!</span>';

        setTimeout(() => {
          btnCopyFortified.classList.remove('copied');
          btnCopyFortified.innerHTML = '<span class="copy-icon">📋</span><span class="copy-text">Copiar Senha</span>';
        }, 2200);
      } catch (err) {
        console.error('Erro ao copiar senha:', err);
      }
    });
  }

  // =========================================================================
  // SISTEMA DE DESBLOQUEIO DA FORÇA REAL COM A SENHA 'FecartCiber2026'
  // =========================================================================
  let fecartPwdMasked = false;

  function generateBriefPasswordSummary(pwd, evaluation) {
    const len = pwd ? pwd.length : 0;
    const score = evaluation ? evaluation.score : 0;
    const isCommon = evaluation && evaluation.feedback && evaluation.feedback.some(f => f.includes('vazadas') || f.includes('comuns'));

    if (isCommon) {
      return 'Sua senha é extremamente conhecida e consta em dicionários públicos de ataques cibernéticos. Hackers conseguem quebrar senhas como esta em fração de segundo por meio de scripts prontos.';
    }

    if (len < 8) {
      return `Com apenas ${len} ${len === 1 ? 'caractere' : 'caracteres'}, a credencial é excessivamente curta e oferece baixíssima resistência computacional, sendo quebrada em poucos instantes por força bruta.`;
    }

    if (score <= 3) {
      return 'A senha possui poucos tipos de caracteres combinados, tornando seu padrão previsível e suscetível a técnicas de quebra automatizadas em computadores convencionais.';
    }

    if (score <= 5) {
      return 'A senha possui uma estrutura razoável, mas ainda pode ser fortalecida aumentando seu tamanho (14+ caracteres) e incluindo símbolos especiais (@, #, $, %).';
    }

    return 'Excelente estrutura de segurança! A senha combina múltiplos tipos de caracteres e ótimo comprimento, gerando alta entropia e proteção máxima contra tentativas de invasão.';
  }

  function populateFecartPasswordEvaluation() {
    if (!currentCheckData) return;
    const pwd = currentCheckData.password || '';
    const evaluation = currentCheckData.evaluation || clientEvaluatePassword(pwd);

    const evalPwdEl = document.getElementById('fecart-eval-pwd');
    const toggleBtn = document.getElementById('btn-toggle-fecart-pwd');
    const levelEl = document.getElementById('fecart-eval-level');
    const crackTimeEl = document.getElementById('fecart-eval-crack-time');
    const scoreTextEl = document.getElementById('fecart-eval-score-text');
    const meterBarEl = document.getElementById('fecart-eval-meter-bar');
    const summaryTextEl = document.getElementById('fecart-eval-summary-text');
    const tipsListEl = document.getElementById('fecart-eval-tips-list');

    // Exibição da senha com botão para alternar visibilidade
    if (evalPwdEl) {
      evalPwdEl.textContent = pwd;
      fecartPwdMasked = false;
      if (toggleBtn) toggleBtn.textContent = '👁️';
    }

    if (toggleBtn && evalPwdEl) {
      toggleBtn.onclick = () => {
        fecartPwdMasked = !fecartPwdMasked;
        if (fecartPwdMasked) {
          evalPwdEl.textContent = '•'.repeat(Math.max(pwd.length, 6));
          toggleBtn.textContent = '🙈';
        } else {
          evalPwdEl.textContent = pwd;
          toggleBtn.textContent = '👁️';
        }
      };
    }

    // Nível de segurança com badge estilizado
    if (levelEl) {
      levelEl.textContent = evaluation.level || 'Muito Fraca';
      levelEl.className = 'stat-badge-level';
      if (evaluation.score <= 2) {
        levelEl.classList.add('level-very-weak');
      } else if (evaluation.score <= 4) {
        levelEl.classList.add('level-weak');
      } else if (evaluation.score <= 5) {
        levelEl.classList.add('level-medium');
      } else if (evaluation.score === 6) {
        levelEl.classList.add('level-strong');
      } else {
        levelEl.classList.add('level-unbreakable');
      }
    }

    // Tempo estimado para quebra
    if (crackTimeEl) {
      crackTimeEl.textContent = evaluation.crackTime || 'Instantâneo';
      if (evaluation.score <= 3) {
        crackTimeEl.className = 'stat-value-crack text-red';
      } else {
        crackTimeEl.className = 'stat-value-crack text-green';
      }
    }

    // Pontuação e Barra de Progresso Real
    const score = evaluation.score || 0;
    if (scoreTextEl) {
      scoreTextEl.textContent = `${score} / 7 Critérios`;
    }
    if (meterBarEl) {
      const percentage = Math.max((score / 7) * 100, 4);
      meterBarEl.style.width = `${percentage}%`;
      if (score <= 2) {
        meterBarEl.style.backgroundColor = '#ff3366';
      } else if (score <= 4) {
        meterBarEl.style.backgroundColor = '#ff9100';
      } else if (score <= 5) {
        meterBarEl.style.backgroundColor = '#ffd600';
      } else if (score === 6) {
        meterBarEl.style.backgroundColor = '#00e676';
      } else {
        meterBarEl.style.backgroundColor = '#00f2fe';
      }
    }

    // Checklist de Critérios Atendidos
    const critLen = document.getElementById('crit-len');
    const critUpper = document.getElementById('crit-upper');
    const critLower = document.getElementById('crit-lower');
    const critNum = document.getElementById('crit-num');
    const critSpec = document.getElementById('crit-spec');

    const hasLen = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSpec = /[^A-Za-z0-9]/.test(pwd);

    function updateCritPill(el, valid, label) {
      if (!el) return;
      if (valid) {
        el.className = 'crit-pill crit-valid';
        el.innerHTML = `✅ ${label}`;
      } else {
        el.className = 'crit-pill crit-invalid';
        el.innerHTML = `❌ ${label}`;
      }
    }

    updateCritPill(critLen, hasLen, 'Mínimo 8 caracteres');
    updateCritPill(critUpper, hasUpper, 'Letras Maiúsculas (A-Z)');
    updateCritPill(critLower, hasLower, 'Letras Minúsculas (a-z)');
    updateCritPill(critNum, hasNum, 'Números (0-9)');
    updateCritPill(critSpec, hasSpec, 'Símbolos (@, #, $, %...)');

    // Resumo Explicativo em Linguagem Clara
    if (summaryTextEl) {
      summaryTextEl.textContent = generateBriefPasswordSummary(pwd, evaluation);
    }

    // Lista de Dicas Práticas
    if (tipsListEl && evaluation.feedback) {
      tipsListEl.innerHTML = '';
      evaluation.feedback.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        tipsListEl.appendChild(li);
      });
    }
  }

  function handleUnlockRealDiagnosis() {
    const inputEl = document.getElementById('unlock-password-input');
    const errEl = document.getElementById('unlock-error-msg');
    const boxEl = document.getElementById('unlock-password-box');
    const wrapperEl = document.getElementById('real-diag-locked-wrapper');
    if (!inputEl) return;
    const typed = inputEl.value.trim();
    if (typed === MASTER_UNLOCK_PASSWORD || typed === 'FecartCiber2026' || typed.toLowerCase() === 'fecart2026') {
      // SENHA CORRETA: DESBLOQUEIA O DIAGNÓSTICO TÉCNICO REAL NA TELA SEPARADA
      playGlitchBeep('unlock');
      if (errEl) errEl.classList.add('hidden');
      inputEl.classList.remove('shake-error');

      // 1. Interrompe a animação dos códigos matrix de fundo
      if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
      }

      // 2. Oculta completamente a tela preta hacker e a simulação
      if (hackerBlackScreen) {
        hackerBlackScreen.classList.add('hidden');
      }
      if (crashOverlay) {
        crashOverlay.classList.add('hidden');
      }
      if (stepInputSection) {
        stepInputSection.classList.add('hidden');
      }

      // 3. Atualiza a mensagem com o nome do participante
      const fecartWelcomeMsg = document.getElementById('fecart-welcome-msg');
      if (fecartWelcomeMsg) {
        const name = (currentCheckData && currentCheckData.userName && currentCheckData.userName !== 'Visitante')
          ? currentCheckData.userName
          : '';
        if (name) {
          fecartWelcomeMsg.textContent = `Olá, ${name}! Obrigado pela sua participação na demonstração prática de cibersegurança.`;
        } else {
          fecartWelcomeMsg.textContent = 'Obrigado pela sua participação na demonstração prática de cibersegurança!';
        }
      }

      // 4. Popula a avaliação breve da senha do participante
      populateFecartPasswordEvaluation();

      // 5. Exibe a tela separada e limpa da FECART (sem códigos de fundo)
      const stepRealDiagSection = document.getElementById('step-real-diag-section');
      if (stepRealDiagSection) {
        stepRealDiagSection.classList.remove('hidden');
        stepRealDiagSection.classList.add('fade-in');
      }

      // 6. Rola suavemente para o início da página
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      // SENHA INCORRETA
      playGlitchBeep('error');
      if (errEl) errEl.classList.remove('hidden');
      inputEl.classList.add('shake-error');
      setTimeout(() => {
        inputEl.classList.remove('shake-error');
      }, 450);
      inputEl.focus();
      inputEl.select();
    }
  }

  // Avaliação no cliente (Fallback caso o backend esteja offline)
  function clientEvaluatePassword(password) {
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const commonPasswords = [
      '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', '111111',
      '1234567', 'dragon', 'admin', 'welcome', 'senha', 'senha123', 'brasil', 'futebol',
      'master', 'iloveyou', 'root', 'superman', 'batman', 'flamengo', 'corinthians'
    ];

    const isCommon = commonPasswords.includes(password.toLowerCase());
    let score = 0;
    const feedback = [];

    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (hasUpper) score += 1;
    if (hasLower) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    if (isCommon) {
      score = Math.min(score, 1);
      feedback.push('⚠️ Esta senha está em listas de senhas vazadas e mais comuns do mundo!');
    }

    if (length < 8) {
      feedback.push('❌ Senha muito curta. Recomendamos no mínimo 12 a 16 caracteres.');
    } else if (length < 12) {
      feedback.push('ℹ️ Comprimento aceitável, mas 14+ caracteres tornam a senha exponencialmente mais segura.');
    }

    if (!hasUpper) feedback.push('❌ Adicione letras maiúsculas (A-Z).');
    if (!hasLower) feedback.push('❌ Adicione letras minúsculas (a-z).');
    if (!hasNumber) feedback.push('❌ Adicione números (0-9).');
    if (!hasSpecial) feedback.push('❌ Adicione caracteres especiais (@, #, $, %, &).');

    let crackTime = 'Instantâneo (< 0.01 segundos)';
    let level = 'Muito Fraca';

    if (isCommon) {
      crackTime = 'Instantâneo (Dicionário de Ataque)';
      level = 'Muito Fraca';
    } else if (score <= 2) {
      crackTime = 'Menos de 3 segundos';
      level = 'Muito Fraca';
    } else if (score <= 4) {
      crackTime = 'Alguns minutos a poucas horas';
      level = 'Fraca';
    } else if (score <= 5) {
      crackTime = 'Aproximadamente 3 a 6 meses';
      level = 'Média';
    } else if (score === 6) {
      crackTime = 'Aproximadamente 50 a 800 anos';
      level = 'Forte';
    } else if (score >= 7) {
      crackTime = 'Mais de 100.000 anos (Inquebrável por Força Bruta Atual)';
      level = 'Blindada / Imbatível';
    }

    return {
      score: Math.min(score, 7),
      level,
      crackTime,
      feedback: feedback.length > 0 ? feedback : ['✅ Excelente! Esta senha cumpre ótimos padrões de segurança.'],
      details: { length, hasUpper, hasLower, hasNumber, hasSpecial }
    };
  }

  // Gerador de senha blindada no cliente baseada na senha digitada
  function clientGenerateFortified(base) {
    const cleanBase = (base && base.trim()) || 'Senha';
    const leetMap = {
      'a': '@', 'A': '4', 'e': '3', 'E': '3', 'i': '!', 'I': '1',
      'o': '0', 'O': '0', 's': '$', 'S': '$', 't': '7', 'T': '7',
      'b': '8', 'B': '8', 'g': '9', 'G': '9'
    };

    let transformed = '';
    for (let i = 0; i < cleanBase.length; i++) {
      const char = cleanBase[i];
      if (leetMap[char] && Math.random() > 0.3) {
        transformed += leetMap[char];
      } else {
        if (/[a-zA-Z]/.test(char)) {
          transformed += (i % 2 === 0) ? char.toUpperCase() : char.toLowerCase();
        } else {
          transformed += char;
        }
      }
    }

    if (transformed.length < 8) {
      const powerWords = ['Fortress', 'Quantum', 'Cyber', 'Shield', 'Matrix', 'Titan', 'Apex'];
      const randomWord = powerWords[Math.floor(Math.random() * powerWords.length)];
      transformed = `${transformed}#${randomWord}`;
    }

    const specialChars = ['#', '$', '%', '&', '*', '_', '=', '!', '?'];
    const s1 = specialChars[Math.floor(Math.random() * specialChars.length)];
    const s2 = specialChars[Math.floor(Math.random() * specialChars.length)];
    const digits = Math.floor(1000 + Math.random() * 9000);

    return `${s1}${transformed}${s2}${digits}`;
  }

  function updateRule(element, isValid) {
    if (!element) return;
    if (isValid) {
      element.classList.add('valid');
      element.querySelector('.rule-icon').textContent = '✅';
    } else {
      element.classList.remove('valid');
      element.querySelector('.rule-icon').textContent = '⚪';
    }
  }

  // ==========================================
  // ETAPA 1: SUBMETER E MOSTRAR ISCA FALSA (ETAPA 2)
  // ==========================================
  async function submitCheck() {
    const userName = userNameInput ? (userNameInput.value.trim() || 'Visitante') : 'Visitante';
    const password = passwordInput.value;

    if (!password || password.trim() === '') {
      alert('Por favor, digite uma senha para realizar o teste de segurança.');
      passwordInput.focus();
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<span>⏳ Analisando Segurança...</span>';

    let resultData = null;

    try {
      const response = await fetch(`${API_BASE}/api/check-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, name: userName })
      });

      if (response.ok) {
        resultData = await response.json();
      } else {
        throw new Error('Status ' + response.status);
      }
    } catch (netErr) {
      console.warn('Processamento local offline ativo.');
      const evaluation = clientEvaluatePassword(password);
      const fortifiedSuggestion = clientGenerateFortified(password);

      resultData = {
        success: true,
        originalPassword: password,
        evaluation,
        fortifiedSuggestion
      };
    }

    try {
      // Armazena temporariamente em memória para a simulação atual (sem salvar)
      currentCheckData = {
        userName,
        password,
        evaluation: resultData.evaluation,
        fortifiedSuggestion: resultData.fortifiedSuggestion
      };

      // =========================================================================
      // VAI DIRETO PARA A SIMULAÇÃO DE ATAQUE
      // =========================================================================
      if (stepInputSection) stepInputSection.classList.add('hidden');
      if (stepAlertSection) stepAlertSection.classList.add('hidden');
      if (hackerBlackScreen) hackerBlackScreen.classList.add('hidden');

      // Dispara imediatamente a simulação de ataque (tela treme + popups)
      runAttackSimulation(() => {
        triggerMultiPhaseHackingSequence();
      });

    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao exibir os resultados: ' + err.message);
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span class="btn-icon">🔍</span><span>Verificar Segurança da Senha</span>';
    }
  }

  // =========================================================================================
  // FASE 1: TRAVAMENTO + AVISOS DE ANTIVÍRUS / SEGURANÇA
  // FASE 2: TELA PRETA COM CÓDIGOS EM ALTA VELOCIDADE
  // FASE 3: MENSAGEM "VOCÊ FOI HACKEADO" EM DESTAQUE
  // =========================================================================================
  function triggerMultiPhaseHackingSequence() {
    // Atualiza o terminal da Fase 1 com os dados digitados
    if (currentCheckData && crashLogPwd) {
      crashLogPwd.textContent = `[CRITICAL] SENHA DIGITADA NO FORMULÁRIO: "${currentCheckData.password}"`;
    }

    // Reseta posição do botão fake fechar
    fakeCloseCount = 0;
    if (btnFakeClose) {
      btnFakeClose.style.transform = 'none';
      btnFakeClose.style.backgroundColor = '';
    }
    if (fakeCloseToast) fakeCloseToast.classList.add('hidden');
    allCloseButtons.forEach(btn => btn.style.transform = 'none');

    // ---------------------------------------------------------------------------------
    // FASE 1: O SITE TRAVA, TREME E APARECEM AVISOS DE SEGURANÇA E ANTIVÍRUS (0s a 5.2s)
    // ---------------------------------------------------------------------------------
    document.body.classList.add('system-crashing');
    crashOverlay.classList.remove('hidden');

    errWins.forEach((win, index) => {
      if (win) {
        win.classList.remove('show');
        setTimeout(() => {
          win.classList.add('show');
        }, 220 + index * 300);
      }
    });

    // ---------------------------------------------------------------------------------
    // FASE 2: TELA PRETA COM CÓDIGOS MATRIX EM EXECUÇÃO (inicia após 5.2s)
    // ---------------------------------------------------------------------------------
    setTimeout(() => {
      document.body.classList.remove('system-crashing');
      crashOverlay.classList.add('hidden');
      errWins.forEach(win => win && win.classList.remove('show'));

      hackerBlackScreen.classList.remove('hidden');
      if (hackerMessageCard) hackerMessageCard.classList.add('hidden');

      // Passa callback para exibir o cartão da Fase 3 somente após o término de todas as linhas
      startMatrixCodeStream(() => {
        // ---------------------------------------------------------------------------------
        // FASE 3: SURGE O CARTÃO COM AVISO SOMENTE APÓS TODAS AS LINHAS TEREM PASSADO
        // ---------------------------------------------------------------------------------
        if (currentCheckData) {
          if (hackScreenName) hackScreenName.textContent = currentCheckData.userName;
          if (hackScreenPassword) hackScreenPassword.textContent = currentCheckData.password;
          prepareRealDiagnosisData();
        }

        if (hackerMessageCard) {
          hackerMessageCard.classList.remove('hidden');
          hackerMessageCard.classList.add('fade-in');
        }
      });

    }, 5200);
  }

  // Chuva sequencial de códigos/logs no terminal da tela preta que desce até ~3/4 da tela
  function startMatrixCodeStream(onComplete) {
    if (matrixInterval) clearInterval(matrixInterval);
    if (matrixCodeStream) matrixCodeStream.innerHTML = '';

    const baseLines = [
      '0x7FFE041B_EXFILTRATION_SOCKET_CONNECTED [PORT:3000]',
      'DUMPING_V8_HEAP_MEMORY_BUFFER_AT_OFFSET_0x004011B...',
      `PAYLOAD_INTERCEPTED: "${currentCheckData ? currentCheckData.password : '******'}"`,
      `TARGET_NAME: "${currentCheckData ? currentCheckData.userName : 'Visitante'}"`,
      'BYPASSING_BROWSER_ISOLATION_POLICIES... [SUCCESS]',
      'LOCAL_STORAGE_CREDENTIAL_OVERWRITE_PREVENTED... [OFFLINE_SANDBOX]',
      'OVERWRITING_RETURN_ADDRESS: 0xDEADBEEFCAFE',
      'EXFILTRATING_INPUT_KEYSTROKES_TO_REMOTE_BUFFER...',
      'INTERCEPTING_SESSION_COOKIES_AND_AUTH_TOKENS...',
      'RESOLVING_TCP_ENCRYPTED_TUNNEL: 198.51.100.42:8443',
      'INJECTING_DYNAMIC_HOOK_INTO_EVENT_LOOP... [ACTIVE]',
      '0x7FFF8021_PACKET_TRANSFER: 2048 BYTES EXFILTRATED',
      'SCANNING_MEMORY_PAGES_FOR_PASSWORDS_AND_PINS...',
      'EXTRACTING_CLEARTEXT_CREDENTIALS_FROM_HEAP [OK]',
      'PARSING_DOM_EVENT_LISTENERS [KEYLOGGER_HOOK_ACTIVE]',
      'EVADING_ENDPOINT_PROTECTION_AND_SANDBOX_DETECTION...',
      'FIREWALL_STATE_OVERRIDE: DISABLING_PACKET_INSPECTION',
      '0x7FFF8054_PACKET_TRANSFER: 4096 BYTES EXFILTRATED',
      'SIMULATING_REMOTE_ADMIN_PRIVILEGE_ESCALATION...',
      '0x7FFE9912_HEAP_ALLOCATION: 0x00A40000 [COMMITTED]',
      'WINDOWS_DEFENDER_HOOK_TRIGGERED... [EVADED]',
      'BYPASSING_ANTIVIRUS_REALTIME_PROTECTION_SHIELD...',
      '0x7FFF8099_PACKET_TRANSFER: 8192 BYTES EXFILTRATED',
      'KERNEL_MODE_DRIVER_SIGNATURE_BYPASS [SUCCESS]',
      'CAPTURE_BUFFER_FLUSHED_TO_EXFILTRATION_NODE...',
      'SEARCHING_ACTIVE_BROWSER_TABS_FOR_SESSION_DATA...',
      '0x7FFEA14B_THREAD_HIJACKING_COMPLETED [TID:4012]',
      'COMPROMISING_LOCAL_SECURITY_SUBSYSTEM... [COMPLETED]',
      '0x7FFF9120_PACKET_TRANSFER: 16384 BYTES EXFILTRATED',
      'CREDENTIAL_VAULT_DUMP_ROUTINE_EXECUTED [100%]',
      'DISABLING_BROWSER_DEVTOOLS_SECURITY_POLICY...',
      '0x7FFEB890_MEMORY_SEGMENT_OVERWRITE [0x8004011B]',
      'DECRYPTION_OF_ENCRYPTED_TOKENS_FINALIZED...',
      'BACKDOOR_LISTENER_ESTABLISHED_ON_LOCAL_PORT...',
      '0x7FFF9999_PACKET_TRANSFER: 32768 BYTES EXFILTRATED',
      'DATA_EXFILTRATION_PIPELINE: STREAM_ESTABLISHED [OK]',
      'ROOT_ACCESS_ELEVATION_GRANTED... SYSTEM_COMPROMISED.'
    ];

    let index = 0;
    const threeFourthsThreshold = window.innerHeight * 0.75;
    let finished = false;

    matrixInterval = setInterval(() => {
      if (finished) return;

      if (index < baseLines.length) {
        const line = baseLines[index];
        const timeTag = `[${new Date().toISOString().substring(11, 23)}] `;

        const lineEl = document.createElement('div');
        lineEl.className = 'matrix-line';
        lineEl.textContent = `${timeTag} ${line}`;

        if (line.includes('PAYLOAD_INTERCEPTED') || line.includes('ROOT_ACCESS') || line.includes('SYSTEM_COMPROMISED')) {
          lineEl.style.color = '#ff3366';
          lineEl.style.fontWeight = 'bold';
        } else if (line.includes('TARGET_NAME')) {
          lineEl.style.color = '#00f2fe';
          lineEl.style.fontWeight = 'bold';
        }

        if (matrixCodeStream) {
          matrixCodeStream.appendChild(lineEl);
          matrixCodeStream.scrollTop = matrixCodeStream.scrollHeight;
        }

        // Verifica se a última linha de comando ultrapassou aproximadamente 3/4 da altura da tela
        const rect = lineEl.getBoundingClientRect();
        const reachedThreeFourths = rect.bottom >= threeFourthsThreshold;
        const isLastAvailableLine = index >= baseLines.length - 1;

        if ((reachedThreeFourths && index >= 6) || isLastAvailableLine) {
          finished = true;
          clearInterval(matrixInterval);
          matrixInterval = null;

          // Se a linha final de sistema comprometido ainda não tiver sido impressa, adiciona para efeito dramático
          if (!line.includes('SYSTEM_COMPROMISED') && matrixCodeStream) {
            const finalEl = document.createElement('div');
            finalEl.className = 'matrix-line';
            finalEl.style.color = '#ff3366';
            finalEl.style.fontWeight = 'bold';
            finalEl.textContent = `[${new Date().toISOString().substring(11, 23)}] ROOT_ACCESS_ELEVATION_GRANTED... SYSTEM_COMPROMISED.`;
            matrixCodeStream.appendChild(finalEl);
            matrixCodeStream.scrollTop = matrixCodeStream.scrollHeight;
          }

          // Pausa curta após cruzar os 3/4 da tela para exibir o cartão de alerta
          if (typeof onComplete === 'function') {
            hackCardTimeout = setTimeout(onComplete, 650);
          }
          return;
        }

        index++;
      } else {
        finished = true;
        clearInterval(matrixInterval);
        matrixInterval = null;
        if (typeof onComplete === 'function') {
          hackCardTimeout = setTimeout(onComplete, 650);
        }
      }
    }, 110);
  }

  // Prepara os dados do diagnóstico real na memória e no DOM
  function prepareRealDiagnosisData() {
    if (!currentCheckData) return;
    const realEval = currentCheckData.evaluation;
    const pwd = currentCheckData.password;

    if (realDiagLevel && realEval) realDiagLevel.textContent = realEval.level;
    if (realDiagCrackTime && realEval) {
      realDiagCrackTime.textContent = realEval.crackTime;
      if (realEval.score <= 3) {
        realDiagCrackTime.className = 'diag-value text-red';
      } else {
        realDiagCrackTime.className = 'diag-value text-green';
      }
    }

    if (realMeterBar && realMeterLevelText && realEval) {
      const percentage = (realEval.score / 7) * 100;
      realMeterBar.style.width = `${Math.max(percentage, 1.5)}%`;

      if (realEval.score <= 2) {
        realMeterBar.style.backgroundColor = '#ff3366';
        realMeterLevelText.className = 'level-badge level-very-weak';
        realMeterLevelText.textContent = 'Muito Fraca';
      } else if (realEval.score <= 4) {
        realMeterBar.style.backgroundColor = '#ff9100';
        realMeterLevelText.className = 'level-badge level-weak';
        realMeterLevelText.textContent = 'Fraca';
      } else if (realEval.score <= 5) {
        realMeterBar.style.backgroundColor = '#ffd600';
        realMeterLevelText.className = 'level-badge level-medium';
        realMeterLevelText.textContent = 'Média';
      } else if (realEval.score === 6) {
        realMeterBar.style.backgroundColor = '#00e676';
        realMeterLevelText.className = 'level-badge level-strong';
        realMeterLevelText.textContent = 'Forte';
      } else {
        realMeterBar.style.backgroundColor = '#00f2fe';
        realMeterLevelText.className = 'level-badge level-unbreakable';
        realMeterLevelText.textContent = 'Blindada / Imbatível';
      }
    }

    // Regras Reais
    const hasLen = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSpec = /[^A-Za-z0-9]/.test(pwd);

    if (realRuleLength) updateRule(realRuleLength, hasLen);
    if (realRuleUpper) updateRule(realRuleUpper, hasUpper);
    if (realRuleLower) updateRule(realRuleLower, hasLower);
    if (realRuleNumber) updateRule(realRuleNumber, hasNum);
    if (realRuleSpecial) updateRule(realRuleSpecial, hasSpec);

    // Feedback Real
    if (realFeedbackList && realEval) {
      realFeedbackList.innerHTML = '';
      realEval.feedback.forEach(item => {
        const div = document.createElement('div');
        div.className = 'feedback-item';
        div.textContent = item;
        realFeedbackList.appendChild(div);
      });
    }

    // Renderiza Sugestão Blindada
    if (fortifiedPasswordText && currentCheckData.fortifiedSuggestion) {
      fortifiedPasswordText.textContent = currentCheckData.fortifiedSuggestion;
    }
  }

  // ==========================================
  // REINICIAR: TESTAR OUTRA SENHA
  // ==========================================
  function resetToStart() {
    if (hackCardTimeout) clearTimeout(hackCardTimeout);
    if (autoSecurityTimeout) clearTimeout(autoSecurityTimeout);
    if (matrixInterval) clearInterval(matrixInterval);

    if (passwordInput) passwordInput.value = '';
    if (userNameInput) userNameInput.value = '';
    if (unlockPasswordInput) unlockPasswordInput.value = '';
    currentCheckData = null;
    fakeCloseCount = 0;

    document.body.classList.remove('system-crashing');
    crashOverlay.classList.add('hidden');
    hackerBlackScreen.classList.add('hidden');
    if (hackerMessageCard) hackerMessageCard.classList.add('hidden');
    errWins.forEach(win => win && win.classList.remove('show'));

    if (btnFakeClose) {
      btnFakeClose.style.transform = 'none';
      btnFakeClose.style.backgroundColor = '';
    }
    if (fakeCloseToast) fakeCloseToast.classList.add('hidden');
    allCloseButtons.forEach(btn => btn.style.transform = 'none');

    // Reseta a caixa de desbloqueio para o estado inicial com input da FECART
    if (unlockPasswordBox) {
      unlockPasswordBox.innerHTML = `
        <div class="unlock-header">
          <div class="unlock-badge-icon">🔐</div>
          <div class="unlock-title-wrap">
            <span class="unlock-tag">ACESSO RESTRITO &bull; DEMONSTRAÇÃO PRÁTICA</span>
            <h3>Insira a Chave Secreta da FECART</h3>
            <p class="unlock-desc">
              Digite a chave de liberação obtida no <strong>quinto andar do bloco B</strong> para liberar a análise:
            </p>
            <div class="unlock-stand-reward-notice">
              <span class="notice-icon">🎁</span>
              <span>Vá até o quinto andar do bloco B com a toalha de mesa para resgatar a senha e a sua recompensa</span>
            </div>
          </div>
        </div>

        <div class="unlock-form-wrapper">
          <div class="unlock-input-group">
            <span class="unlock-input-icon">🔑</span>
            <input 
              type="password" 
              id="unlock-password-input" 
              class="unlock-text-input" 
              placeholder="Digite a chave secreta da FECART..."
              autocomplete="off"
            >
            <button type="button" id="toggle-unlock-password" class="unlock-toggle-btn" title="Exibir/Ocultar Senha">
              <span id="unlock-eye-open">👁️</span>
              <span id="unlock-eye-closed" class="hidden">🙈</span>
            </button>
          </div>

          <button type="button" id="btn-unlock-real-diag" class="btn-unlock-diag">
            <span class="unlock-btn-icon">🔓</span>
            <span>Desbloquear Análise Completa</span>
          </button>
        </div>

        <div id="unlock-error-msg" class="unlock-error-msg hidden">
          ❌ Chave incorreta! Solicite a chave secreta no <strong>quinto andar do bloco B</strong> para desbloquear.
        </div>
      `;

      // Re-associa eventos do input de desbloqueio recém-recriado
      const newUnlockInput = document.getElementById('unlock-password-input');
      const newUnlockToggle = document.getElementById('toggle-unlock-password');
      const newUnlockEyeOpen = document.getElementById('unlock-eye-open');
      const newUnlockEyeClosed = document.getElementById('unlock-eye-closed');
      const newUnlockBtn = document.getElementById('btn-unlock-real-diag');

      if (newUnlockToggle && newUnlockInput) {
        newUnlockToggle.addEventListener('click', () => {
          const isPass = newUnlockInput.type === 'password';
          newUnlockInput.type = isPass ? 'text' : 'password';
          if (newUnlockEyeOpen) newUnlockEyeOpen.classList.toggle('hidden', !isPass);
          if (newUnlockEyeClosed) newUnlockEyeClosed.classList.toggle('hidden', isPass);
        });
      }

      if (newUnlockInput) {
        newUnlockInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') handleUnlockRealDiagnosis();
        });
      }

      if (newUnlockBtn) {
        newUnlockBtn.addEventListener('click', handleUnlockRealDiagnosis);
      }
    }

    const stepRealDiagSection = document.getElementById('step-real-diag-section');
    if (stepRealDiagSection) stepRealDiagSection.classList.add('hidden');
    if (realDiagLockedWrapper) realDiagLockedWrapper.classList.add('hidden');

    if (stepAlertSection) stepAlertSection.classList.add('hidden');
    if (stepFecartSection) stepFecartSection.classList.add('hidden');
    if (stepInputSection) {
      stepInputSection.classList.remove('hidden');
      stepInputSection.classList.add('fade-in');
    }

    if (userNameInput) userNameInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
