document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS DO FORMULÁRIO INICIAL (INPUT)
  const stepInputSection = document.getElementById('step-input-section');
  const userNameInput = document.getElementById('user-name-input');
  const passwordInput = document.getElementById('password-input');
  const toggleBtn = document.getElementById('toggle-password');
  const eyeOpen = document.getElementById('eye-open');
  const eyeClosed = document.getElementById('eye-closed');
  const btnSubmit = document.getElementById('btn-submit-check');

  // ELEMENTOS DA ETAPA 2 (TELA DE CONCLUÍDO & ISCA DO GUIA)
  const stepCompletedSection = document.getElementById('step-completed-section');
  const meterBar = document.getElementById('meter-bar');
  const meterLevelText = document.getElementById('meter-level-text');
  const diagLevel = document.getElementById('diag-level');
  const diagCrackTime = document.getElementById('diag-crack-time');
  const feedbackList = document.getElementById('feedback-list');
  const btnGenerateFortified = document.getElementById('btn-generate-fortified');
  const linkGenerateFortified = document.getElementById('link-generate-fortified');

  // ELEMENTOS DA ETAPA 3 (AVISO DE SENHA NÃO SALVA & DESBLOQUEIO FECART)
  const stepUnlockSection = document.getElementById('step-unlock-section');
  const unlockPasswordInput = document.getElementById('unlock-password-input');
  const toggleUnlockPassword = document.getElementById('toggle-unlock-password');
  const unlockEyeOpen = document.getElementById('unlock-eye-open');
  const unlockEyeClosed = document.getElementById('unlock-eye-closed');
  const btnUnlockRealDiag = document.getElementById('btn-unlock-real-diag');
  const unlockErrorMsg = document.getElementById('unlock-error-msg');

  // ELEMENTOS DA ETAPA 4 (AVALIAÇÃO DE SEGURANÇA REAL DA FECART)
  const stepRealDiagSection = document.getElementById('step-real-diag-section');
  const fecartWelcomeMsg = document.getElementById('fecart-welcome-msg');
  const evalPwdEl = document.getElementById('fecart-eval-pwd');
  const btnToggleFecartPwd = document.getElementById('btn-toggle-fecart-pwd');
  const levelEl = document.getElementById('fecart-eval-level');
  const crackTimeEl = document.getElementById('fecart-eval-crack-time');
  const scoreTextEl = document.getElementById('fecart-eval-score-text');
  const meterBarEl = document.getElementById('fecart-eval-meter-bar');
  const summaryTextEl = document.getElementById('fecart-eval-summary-text');
  const tipsListEl = document.getElementById('fecart-eval-tips-list');
  const critLen = document.getElementById('crit-len');
  const critUpper = document.getElementById('crit-upper');
  const critLower = document.getElementById('crit-lower');
  const critNum = document.getElementById('crit-num');
  const critSpec = document.getElementById('crit-spec');
  const btnTestAgain = document.getElementById('btn-test-again');

  // Senhas aceitas para liberar o diagnóstico final da FECART
  const ACCEPTED_UNLOCK_PASSWORDS = [
    'kfW51Y#)V3mP',
    'FecartCiber2026',
    'fecartciber2026',
    'fecart2026',
    'Fecart2026',
    'fecart',
    'Fecart'
  ];

  // Dados da verificação atual em memória
  let currentCheckData = null;
  let fecartPwdMasked = false;

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

  // Toggle Exibir / Ocultar Senha do Formulário Inicial
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      if (eyeOpen) eyeOpen.classList.toggle('hidden', !isPassword);
      if (eyeClosed) eyeClosed.classList.toggle('hidden', isPassword);
    });
  }

  // Toggle Exibir / Ocultar Senha de Desbloqueio FECART
  if (toggleUnlockPassword && unlockPasswordInput) {
    toggleUnlockPassword.addEventListener('click', () => {
      const isPassword = unlockPasswordInput.type === 'password';
      unlockPasswordInput.type = isPassword ? 'text' : 'password';
      if (unlockEyeOpen) unlockEyeOpen.classList.toggle('hidden', !isPassword);
      if (unlockEyeClosed) unlockEyeClosed.classList.toggle('hidden', isPassword);
    });
  }

  // Toggle visualização da senha no diagnóstico da FECART
  if (btnToggleFecartPwd && evalPwdEl) {
    btnToggleFecartPwd.addEventListener('click', () => {
      if (!currentCheckData) return;
      const pwd = currentCheckData.password || '';
      fecartPwdMasked = !fecartPwdMasked;
      if (fecartPwdMasked) {
        evalPwdEl.textContent = '•'.repeat(Math.max(pwd.length, 6));
        btnToggleFecartPwd.textContent = '🙈';
      } else {
        evalPwdEl.textContent = pwd;
        btnToggleFecartPwd.textContent = '👁️';
      }
    });
  }

  // Tecla Enter para navegação e submissão
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

  if (unlockPasswordInput) {
    unlockPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUnlockRealDiagnosis();
    });
  }

  // Event Listeners dos botões principais
  if (btnSubmit) {
    btnSubmit.addEventListener('click', submitCheck);
  }

  // ========================================================
  // CLIQUE NO BOTÃO "Acessar Site: Como Criar Boas Senhas"
  // TRANSIÇÃO DIRETA: SEM TELA TREMENDO, SEM MENSAGENS DE ATAQUE!
  // ========================================================
  const handleProceedToUnlock = (e) => {
    if (e) e.preventDefault();
    if (stepCompletedSection) stepCompletedSection.classList.add('hidden');
    if (stepUnlockSection) {
      stepUnlockSection.classList.remove('hidden');
      stepUnlockSection.classList.add('fade-in');
      stepUnlockSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (unlockPasswordInput) {
      unlockPasswordInput.focus();
    }
  };

  if (btnGenerateFortified) {
    btnGenerateFortified.addEventListener('click', handleProceedToUnlock);
  }

  if (linkGenerateFortified) {
    linkGenerateFortified.addEventListener('click', handleProceedToUnlock);
    linkGenerateFortified.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleProceedToUnlock(e);
      }
    });
  }

  if (btnUnlockRealDiag) {
    btnUnlockRealDiag.addEventListener('click', handleUnlockRealDiagnosis);
  }

  if (btnTestAgain) {
    btnTestAgain.addEventListener('click', resetToStart);
  }

  // ========================================================
  // SUBMETER SENHA PARA VERIFICAÇÃO INICIAL
  // ========================================================
  async function submitCheck() {
    const userName = userNameInput ? (userNameInput.value.trim() || 'Visitante') : 'Visitante';
    const password = passwordInput ? passwordInput.value : '';

    if (!password || password.trim() === '') {
      alert('Por favor, digite uma senha para realizar o teste de segurança.');
      if (passwordInput) passwordInput.focus();
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
      resultData = {
        success: true,
        originalPassword: password,
        evaluation
      };
    }

    try {
      currentCheckData = {
        userName,
        password,
        evaluation: resultData.evaluation
      };

      // Configura os valores de alerta do diagnóstico na Etapa 2
      if (diagLevel) diagLevel.textContent = 'Crítico / Insegura';
      if (diagCrackTime) {
        diagCrackTime.textContent = 'Menos de 3 segundos';
        diagCrackTime.className = 'diag-value text-red';
      }

      if (meterBar) {
        meterBar.style.width = '1.5%';
        meterBar.style.backgroundColor = '#ff3366';
      }
      if (meterLevelText) {
        meterLevelText.className = 'level-badge level-very-weak';
        meterLevelText.textContent = 'Muito Fraca';
      }

      if (feedbackList) {
        feedbackList.innerHTML = `
          <div class="feedback-item">⚠️ <strong>Alerta de Risco:</strong> Padrões de baixa entropia detectados.</div>
          <div class="feedback-item">❌ Credencial vulnerável a ataques modernos automatizados.</div>
          <div class="feedback-item">🚨 <strong>Ação Recomendada:</strong> Conheça as boas práticas no guia oficial ao lado.</div>
        `;
      }

      // Transição suave para a Etapa 2 (com o botão de acessar o guia)
      if (stepInputSection) stepInputSection.classList.add('hidden');
      if (stepCompletedSection) {
        stepCompletedSection.classList.remove('hidden');
        stepCompletedSection.classList.add('fade-in');
        stepCompletedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao exibir os resultados: ' + err.message);
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span class="btn-icon">🔍</span><span>Verificar Segurança da Senha</span>';
    }
  }

  // ========================================================
  // DESBLOQUEAR AVALIAÇÃO COM A CHAVE DA FECART
  // ========================================================
  function handleUnlockRealDiagnosis() {
    if (!unlockPasswordInput) return;
    const typed = unlockPasswordInput.value.trim();

    const isMatch = ACCEPTED_UNLOCK_PASSWORDS.some(key => key.toLowerCase() === typed.toLowerCase());

    if (isMatch) {
      if (unlockErrorMsg) unlockErrorMsg.classList.add('hidden');
      unlockPasswordInput.classList.remove('shake-error');

      // Atualiza mensagem de boas-vindas da FECART
      if (fecartWelcomeMsg) {
        const name = (currentCheckData && currentCheckData.userName && currentCheckData.userName !== 'Visitante')
          ? currentCheckData.userName
          : '';
        if (name) {
          fecartWelcomeMsg.textContent = `Olá, ${name}! Obrigado pela sua participação na demonstração de cibersegurança!`;
        } else {
          fecartWelcomeMsg.textContent = 'Obrigado pela sua participação na demonstração prática de cibersegurança!';
        }
      }

      // Popula os dados técnicos reais
      populateFecartPasswordEvaluation();

      // Transição: oculta a caixa de desbloqueio e exibe o card da FECART
      if (stepUnlockSection) stepUnlockSection.classList.add('hidden');
      if (stepRealDiagSection) {
        stepRealDiagSection.classList.remove('hidden');
        stepRealDiagSection.classList.add('fade-in');
        stepRealDiagSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } else {
      if (unlockErrorMsg) unlockErrorMsg.classList.remove('hidden');
      unlockPasswordInput.classList.add('shake-error');
      setTimeout(() => {
        unlockPasswordInput.classList.remove('shake-error');
      }, 450);
      unlockPasswordInput.focus();
      unlockPasswordInput.select();
    }
  }

  // ========================================================
  // POPULAR AVALIAÇÃO REAL DA FECART
  // ========================================================
  function populateFecartPasswordEvaluation() {
    if (!currentCheckData) return;
    const pwd = currentCheckData.password || '';
    const evaluation = currentCheckData.evaluation || clientEvaluatePassword(pwd);

    if (evalPwdEl) {
      evalPwdEl.textContent = pwd;
      fecartPwdMasked = false;
      if (btnToggleFecartPwd) btnToggleFecartPwd.textContent = '👁️';
    }

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

    if (crackTimeEl) {
      crackTimeEl.textContent = evaluation.crackTime || 'Instantâneo';
      if (evaluation.score <= 3) {
        crackTimeEl.className = 'stat-value-crack text-red';
      } else {
        crackTimeEl.className = 'stat-value-crack text-green';
      }
    }

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

    if (summaryTextEl) {
      summaryTextEl.textContent = generateBriefPasswordSummary(pwd, evaluation);
    }

    if (tipsListEl && evaluation.feedback) {
      tipsListEl.innerHTML = '';
      evaluation.feedback.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        tipsListEl.appendChild(li);
      });
    }
  }

  function generateBriefPasswordSummary(pwd, evaluation) {
    const len = pwd ? pwd.length : 0;
    const score = evaluation ? evaluation.score : 0;
    const isCommon = evaluation && evaluation.feedback && evaluation.feedback.some(f => f.includes('vazadas') || f.includes('comuns'));

    if (isCommon) {
      return 'Sua senha é extremamente conhecida e consta em listas públicas de senhas vazadas. Softwares automatizados conseguem quebrar senhas como esta em fração de segundo por meio de bases de dados conhecidas.';
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
      crackTime = 'Instantâneo (Lista de Senhas Conhecidas)';
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

  // ========================================================
  // REINICIAR TESTE ("Fazer Novo Teste")
  // ========================================================
  function resetToStart() {
    if (passwordInput) passwordInput.value = '';
    if (userNameInput) userNameInput.value = '';
    if (unlockPasswordInput) unlockPasswordInput.value = '';
    if (unlockErrorMsg) unlockErrorMsg.classList.add('hidden');
    currentCheckData = null;

    if (stepRealDiagSection) stepRealDiagSection.classList.add('hidden');
    if (stepUnlockSection) stepUnlockSection.classList.add('hidden');
    if (stepCompletedSection) stepCompletedSection.classList.add('hidden');

    if (stepInputSection) {
      stepInputSection.classList.remove('hidden');
      stepInputSection.classList.add('fade-in');
    }

    if (userNameInput) {
      userNameInput.focus();
    } else if (passwordInput) {
      passwordInput.focus();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
