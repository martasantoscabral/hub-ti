(function () {
  "use strict";

  /*--------------------- NORMALIZAR LUZ DAS PLANTAS ----------------------*/
  function normalizarNivelLuz(valor) {
    if (!valor) return "";
    return valor.toLowerCase().trim(); 
  }

  /*--------------------- RECOMENDAR PLANTAS ------------------------------*/
  function recomendarPlantasAPartirDoQuiz(dadosQuiz) {
    const plantas = window.plantas || [];
    const nivelLuzComodo = dadosQuiz.luzDia; // já vem "baixo/medio/alto"
    const recomendadas = [];

    plantas.forEach(p => {
      if (!p || !p.nome) return;
      if (p.nome.toLowerCase().includes("customizada")) return;

      const nivelPlanta = normalizarNivelLuz(p.nivel_luz || p.luz || "");

      if (!nivelPlanta) return;

      if (nivelPlanta === nivelLuzComodo) {
        recomendadas.push(p);
      }
    });

    return recomendadas;
  }

  /*--------------------- MOSTRAR PLANTAS RECOMENDADAS --------------------*/
  function mostrarPlantasRecomendadas(lista) {
    const zona = document.getElementById("listaRecomendadas");
    if (!zona) return;

    zona.innerHTML = "";

    if (!lista || !lista.length) {
      zona.innerHTML = "<p>Não encontrámos plantas compatíveis com este cómodo.</p>";
      return;
    }

    lista.forEach(p => {
      const nome = (p.nome || "").trim();
      const categoria = p.categoria || p.tipo || "";
      const luz = p.nivel_luz || p.luz || "";
      const agua = p.nivel_agua || p.agua || "";
      const imgSrc = p.imagem || p.image || p.img || "";

      zona.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3">
          <div class="itemCatalogo cardRecomendada">
            <div class="plant-img">
              ${imgSrc ? `<img src="${imgSrc}" alt="${nome}">` : ""}
            </div>
            <div class="plant-name">
              <strong>${nome}</strong>
            </div>
            <div class="plant-extra">
              ${categoria ? `<small>Categoria: ${categoria}</small><br>` : ""}
              <small>Luz: ${luz}</small><br>
              <small>Água: ${agua}</small>
            </div>
          </div>
        </div>
      `;
    });
  }

  /*----------------------- CONTROLO DO QUIZ ------------------------------*/
  const FIELD_BY_STEP = {
    1: "luzDia",
    2: "ventilacao",
    3: "temperatura",
    4: "uso"
  };

  let quizPasso = 1;
  const TOTAL_PASSOS = 4;

  function atualizarQuiz() {
    document.querySelectorAll(".quiz-step").forEach(step => {
      const n = Number(step.dataset.step);
      step.classList.toggle("d-none", n !== quizPasso);
    });

    const barra = document.getElementById("quizProgress");
    if (barra) {
      const pct = (quizPasso / TOTAL_PASSOS) * 100;
      barra.style.width = pct + "%";
      barra.textContent = `${quizPasso} / ${TOTAL_PASSOS}`;
    }

    const btnNext = document.getElementById("btnQuizSeguinte");
    if (btnNext) {
      btnNext.textContent =
        quizPasso === TOTAL_PASSOS ? "Ver plantas recomendadas" : "Seguinte";
    }

    const feedback = document.getElementById("quizFeedback");
    if (feedback) {
      const msgs = {
        1: "Comecemos pela luz do espaço",
        2: "Agora, fala-nos da ventilação",
        3: "Quase lá! Qual a temperatura?",
        4: "Última pergunta: movimento no cómodo"
      };
      feedback.textContent = msgs[quizPasso] || "";
    }
  }

  function validarPassoAtual() {
    const form = document.getElementById("formQuizComodo");
    if (!form) return false;

    const fieldName = FIELD_BY_STEP[quizPasso];
    const value = form.elements[fieldName]?.value || "";
    return value.trim() !== "";
  }

  function lerDadosQuiz() {
    const form = document.getElementById("formQuizComodo");
    return {
      luzDia: form.elements["luzDia"].value
    };
  }

  /*--------------------- INICIALIZAÇÃO DO QUIZ ---------------------------*/
  function initQuiz() {
    const modalQuiz = document.getElementById("modalQuizComodo");
    if (!modalQuiz) return;

    const btnNext = document.getElementById("btnQuizSeguinte");
    const btnPrev = document.getElementById("btnQuizAnterior");
    const btnAbrir = document.getElementById("btnAbrirQuizComodo");
    const modalAlerta = document.getElementById("modalLuzAlerta");

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (!validarPassoAtual()) {
          alert("Escolhe uma opção antes de avançar.");
          return;
        }

        if (quizPasso === TOTAL_PASSOS) {
          const dados = lerDadosQuiz();
          const lista = recomendarPlantasAPartirDoQuiz(dados);
          mostrarPlantasRecomendadas(lista);

          const modalRec = document.getElementById("modalPlantasRecomendadas");
          if (window.bootstrap && modalRec) {
            bootstrap.Modal.getInstance(modalQuiz)?.hide();
            new bootstrap.Modal(modalRec).show();
          }
          return;
        }

        quizPasso++;
        atualizarQuiz();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (quizPasso > 1) {
          quizPasso--;
          atualizarQuiz();
        }
      });
    }

    modalQuiz.addEventListener("show.bs.modal", () => {
      quizPasso = 1;
      const form = document.getElementById("formQuizComodo");
      if (form) form.reset();
      atualizarQuiz();
    });

    if (btnAbrir && modalAlerta) {
      btnAbrir.addEventListener("click", () => {
        if (window.bootstrap) {
          const instAlerta = bootstrap.Modal.getInstance(modalAlerta);
          instAlerta?.hide();
          bootstrap.Modal.getOrCreateInstance(modalQuiz).show();

        }
      });
    }

    atualizarQuiz();
  }

  /*------------------ BOTÃO "VOLTAR AO AVISO" ----------------------------*/
  function initVoltarAviso() {
    const btnVoltarAviso = document.getElementById("btnVoltarAviso");
    const modalAviso = document.getElementById("modalLuzAlerta");
    const modalRecomendadas = document.getElementById("modalPlantasRecomendadas");

    if (!btnVoltarAviso || !modalAviso || !modalRecomendadas) return;

    btnVoltarAviso.addEventListener("click", () => {
      const instRec = bootstrap.Modal.getInstance(modalRecomendadas);
      instRec?.hide();

      const instAviso =
        bootstrap.Modal.getInstance(modalAviso) ||
        bootstrap.Modal.getOrCreateInstance(modalAviso);

      instAviso.show();
    });
  }

  /*--------------------- INIT GERAL --------------------------------------*/
  function init() {
    initQuiz();
    initVoltarAviso();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
