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

  // ELEMENTOS DA ETAPA 2 (TELA DE CONCLUÍDO & ISCA DO GERADOR)
  const stepCompletedSection = document.getElementById('step-completed-section');
  const meterBar = document.getElementById('meter-bar');
  const meterLevelText = document.getElementById('meter-level-text');
  const diagLevel = document.getElementById('diag-level');
  const diagCrackTime = document.getElementById('diag-crack-time');
  const feedbackList = document.getElementById('feedback-list');
  const btnGenerateFortified = document.getElementById('btn-generate-fortified');
  const linkGenerateFortified = document.getElementById('link-generate-fortified');

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
  const MASTER_UNLOCK_PASSWORD = 'FecartCiber2026';

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

  // CLIQUE NO BOTÃO OU LINK CHAMATIVO DO GERADOR DISPARA A SIMULAÇÃO DE HACK
  const handleTriggerHack = (e) => {
    if (e) e.preventDefault();
    triggerMultiPhaseHackingSequence();
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
      stepAlertSection.classList.add('hidden');
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
      stepAlertSection.classList.remove('hidden');
      stepAlertSection.classList.add('fade-in');
      stepAlertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  function handleUnlockRealDiagnosis() {
    if (!unlockPasswordInput) return;
    const typed = unlockPasswordInput.value.trim();

    if (typed === MASTER_UNLOCK_PASSWORD) {
      // SENHA CORRETA: DESBLOQUEIA O DIAGNÓSTICO TÉCNICO REAL
      playGlitchBeep('unlock');
      if (unlockErrorMsg) unlockErrorMsg.classList.add('hidden');
      unlockPasswordInput.classList.remove('shake-error');

      // Substitui a caixa de input por um banner de sucesso
      if (unlockPasswordBox) {
        unlockPasswordBox.innerHTML = `
          <div class="unlock-success-banner">
            <span style="font-size: 1.6rem;">🔓</span>
            <div>
              <strong style="color: #00e676; font-size: 1.05rem;">Chave 'FecartCiber2026' Validada com Sucesso!</strong>
              <p style="color: #cbd5e1; font-size: 0.88rem; margin-top: 2px;">
                Acesso liberado. Confira abaixo a <strong>avaliação técnica verdadeira</strong> e a força real da senha testada:
              </p>
            </div>
          </div>
        `;
      }

      // Revela os cartões do diagnóstico real
      if (realDiagLockedWrapper) {
        realDiagLockedWrapper.classList.remove('hidden');
        realDiagLockedWrapper.classList.add('fade-in');
        realDiagLockedWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } else {
      // SENHA INCORRETA
      playGlitchBeep('error');
      if (unlockErrorMsg) unlockErrorMsg.classList.remove('hidden');
      unlockPasswordInput.classList.add('shake-error');
      setTimeout(() => {
        unlockPasswordInput.classList.remove('shake-error');
      }, 450);
      unlockPasswordInput.focus();
      unlockPasswordInput.select();
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
        body: JSON.stringify({ password })
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
      // ETAPA 2: DIAGNÓSTICO FALSO (SCAREWARE / ISCA DE PHISHING)
      // Mostra SEMPRE a senha como vulnerável para induzir ao clique
      // =========================================================================
      if (diagLevel) diagLevel.textContent = 'Crítico / Insegura';
      if (diagCrackTime) {
        diagCrackTime.textContent = 'Menos de 3 segundos';
        diagCrackTime.className = 'diag-value text-red';
      }

      if (meterBar) {
        meterBar.style.width = '15%';
        meterBar.style.backgroundColor = '#ff3366';
      }
      if (meterLevelText) {
        meterLevelText.className = 'level-badge level-very-weak';
        meterLevelText.textContent = 'Muito Fraca';
      }

      // Renderiza Dicas de Alerta Falso (Scareware)
      if (feedbackList) {
        feedbackList.innerHTML = `
          <div class="feedback-item">⚠️ <strong>Alerta de Risco:</strong> Padrões de baixa entropia detectados.</div>
          <div class="feedback-item">❌ Credencial vulnerável a ataques modernos por dicionário e IA.</div>
          <div class="feedback-item">🚨 <strong>Ação Urgente:</strong> Substitua imediatamente por uma credencial blindada pelo link ao lado.</div>
        `;
      }

      // TRANSIÇÃO: Oculta Input e Exibe Tela de Concluído (Falsa)
      stepInputSection.classList.add('hidden');
      stepCompletedSection.classList.remove('hidden');
      stepCompletedSection.classList.add('fade-in');

      stepAlertSection.classList.add('hidden');
      hackerBlackScreen.classList.add('hidden');

      stepCompletedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
    // FASE 1: O SITE TRAVA, TREME E APARECEM AVISOS DE SEGURANÇA E ANTIVÍRUS (0s a 2.5s)
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
    // FASE 2: TELA PRETA COM CÓDIGOS MATRIX EM EXECUÇÃO (2.5s)
    // ---------------------------------------------------------------------------------
    setTimeout(() => {
      document.body.classList.remove('system-crashing');
      crashOverlay.classList.add('hidden');
      errWins.forEach(win => win && win.classList.remove('show'));

      hackerBlackScreen.classList.remove('hidden');
      if (hackerMessageCard) hackerMessageCard.classList.add('hidden');

      startMatrixCodeStream();

      // ---------------------------------------------------------------------------------
      // FASE 3: SURGE A MENSAGEM "VOCÊ FOI HACKEADO" APÓS OS CÓDIGOS (4.5s)
      // ---------------------------------------------------------------------------------
      hackCardTimeout = setTimeout(() => {
        if (currentCheckData) {
          if (hackScreenName) hackScreenName.textContent = currentCheckData.userName;
          if (hackScreenPassword) hackScreenPassword.textContent = currentCheckData.password;
        }

        if (hackerMessageCard) {
          hackerMessageCard.classList.remove('hidden');
          hackerMessageCard.classList.add('fade-in');
        }

        autoSecurityTimeout = setTimeout(() => {
          showSecurityExplanationPhase();
        }, 6500);

      }, 2000);

    }, 2500);
  }

  // Chuva de códigos/logs no terminal da tela preta
  function startMatrixCodeStream() {
    if (matrixInterval) clearInterval(matrixInterval);
    matrixCodeStream.textContent = '';

    const hexCodes = [
      '0x7FFE041B_EXFILTRATION_SOCKET_CONNECTED [PORT:3000]',
      'DUMPING_V8_HEAP_MEMORY_BUFFER_AT_OFFSET_0x004011B',
      `PAYLOAD_INTERCEPTED: "${currentCheckData ? currentCheckData.password : '******'}"`,
      `TARGET_NAME: "${currentCheckData ? currentCheckData.userName : 'Visitante'}"`,
      'BYPASSING_BROWSER_ISOLATION_POLICIES... [SUCCESS]',
      'LOCAL_STORAGE_CREDENTIAL_OVERWRITE_PREVENTED... [OFFLINE_SANDBOX]',
      'OVERWRITING_RETURN_ADDRESS: 0xDEADBEEFCAFE',
      'EXFILTRATING_LOCAL_STORAGE_TOKENS_TO_REMOTE_HOST...',
      'WINDOWS_DEFENDER_HOOK_TRIGGERED... [EVADED]',
      'ROOT_ACCESS_ELEVATION_GRANTED... SYSTEM_COMPROMISED.'
    ];

    let count = 0;
    matrixInterval = setInterval(() => {
      const randomLine = hexCodes[Math.floor(Math.random() * hexCodes.length)];
      const timeTag = `[${new Date().toISOString().substring(11, 23)}] `;
      matrixCodeStream.textContent += `${timeTag} ${randomLine}\n`;
      matrixCodeStream.scrollTop = matrixCodeStream.scrollHeight;
      count++;
      if (count > 40) {
        matrixCodeStream.textContent = matrixCodeStream.textContent.substring(350);
      }
    }, 100);
  }

  // =========================================================================
  // FASE 4: AVISOS DE SEGURANÇA E CONSCIENTIZAÇÃO EDUCATIVA (PÁGINA SEPARADA)
  // =========================================================================
  function showSecurityExplanationPhase() {
    if (hackCardTimeout) clearTimeout(hackCardTimeout);
    if (autoSecurityTimeout) clearTimeout(autoSecurityTimeout);
    if (matrixInterval) clearInterval(matrixInterval);

    hackerBlackScreen.classList.add('hidden');
    stepCompletedSection.classList.add('hidden');
    if (stepFecartSection) stepFecartSection.classList.add('hidden');

    if (currentCheckData) {
      // =========================================================================
      // PREPARA OS DADOS DO DIAGNÓSTICO REAL (FICAM PRONTOS EM SEGREDO ATÉ DESBLOQUEAR)
      // =========================================================================
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
        realMeterBar.style.width = `${Math.max(percentage, 10)}%`;

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

    // Mantém o conteúdo real bloqueado inicialmente até o usuário digitar FecartCiber2026
    if (realDiagLockedWrapper) realDiagLockedWrapper.classList.add('hidden');
    if (unlockPasswordInput) {
      unlockPasswordInput.value = '';
      unlockPasswordInput.classList.remove('shake-error');
    }
    if (unlockErrorMsg) unlockErrorMsg.classList.add('hidden');

    // Revela a seção educativa
    stepAlertSection.classList.remove('hidden');
    stepAlertSection.classList.add('fade-in');

    securityAlertBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              Digite a chave de liberação obtida no stand da <strong>FECART de Cibersegurança</strong> para liberar a análise:
            </p>
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
          ❌ Chave incorreta! Solicite a chave secreta no stand da <strong>FECART de Cibersegurança</strong> para desbloquear.
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

    if (realDiagLockedWrapper) realDiagLockedWrapper.classList.add('hidden');

    stepCompletedSection.classList.add('hidden');
    stepAlertSection.classList.add('hidden');
    if (stepFecartSection) stepFecartSection.classList.add('hidden');
    stepInputSection.classList.remove('hidden');
    stepInputSection.classList.add('fade-in');

    if (userNameInput) userNameInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
