//Grupo: 19, Número: 64178, Nome: Camile Hasse 
//Grupo: 19, Número: 64686, Nome: Marta Cabral  
//Grupo: 19, Número: 64149, Nome: Gabriele Botelho
//Grupo: 19, Número: 63194, Nome: Gizela Monteiro

/* ------------------------------------------------------------------------- */
"use strict";
/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */
/*                                                   CONSTANTES E VARIAVEIS  */
/* ------------------------------------------------------------------------- */
let comodoPreselecionado = "";

const BOTAO_APAGAR_PLANTAS = "btnApagarPlantas";
const BOTAO_ADICIONAR_PLANTAS = "btnAddPlant";

const MODAL_ADICIONAR_PLANTA = "modalAdicionarPlanta";
const MODAL_FUNC_N_IMPLEMENTADA = "modalFuncNImplementada";
const MODAL_SELECIONAR_PLANTA = "modalCatalogo";
const MODAL_SELECIONAR_PLANTA_APAGAR = "modalPlantasAdicionadas";
const MODAL_BODY_ADICIONAR_PLANTA = "msgPlantaSelecionada";
const MODAL_ADICIONAR_PLANTA_CUSTOMIZADA = "modalAdicionarPlantaCustomizada";

const BOTAO_COMODOS = "btnComodos";
const BOTAO_CONFIRMAR_REMOVER_COMODO = "btnConfirmarRemoverComodo";

const GRID_CATALOGO = "catalogoGrid";
const GRID_PLANTAS = "grid_plantas";
const GRID_PLANTAS_ADICIONADAS = "plantasAdicionadasGrid";

const FORM_ADICIONAR_PLANTA = "formAdicionarPlanta";
const FORM_ADICIONAR_PLANTA_CUSTOMIZADA = "formAdicionarPlantaCustomizada";
const NOME_PLANTA_CUSTOMIZADA = "nome_customizada";
const TIPO_PLANTA_CUSTOMIZADA = "tipo_customizada";
const CATEGORIA_PLANTA_CUSTOMIZADA = "categoria_customizada";
const NIVEL_LUZ_PLANTA_CUSTOMIZADA = "nivel_luz_customizada";
const NIVEL_AGUA_PLANTA_CUSTOMIZADA = "nivel_agua_customizada";
const COMODO_PLANTA_CUSTOMIZADA = "comodo_customizada";
const REGUA_PLANTA_CUSTOMIZADA = "rega_customizada";
const IMG_PLANTA_CUSTOMIZADA = "img_customizada";

const ITEM_PLANTAS_ADICIONADAS = "plantas_adicionadas";
const ITEM_COMODOS = "comodos";

const BOTAO_GUARDAR_REGA = "btnGuardarRega";

//MODAL QUE APARECE QUANDO NAO FOI POSSÍVEL ADICIONAR PLANTA INDICANDO O MOTIVO.
const MODAL_ALERTA_ADICAO = "modalAlertaAdicao";
const OK_MODAL_ALERTA = "okAlerta";

const MODAL_CONFIRMAR_ADICAO = "modalConfirmarAdicao";
const BOTAO_CONFIRMAR_ADICAO = "confirmarAdicao";

//ADD ID DO MODAL PARA ADD COMODO:
const MODAL_ADICIONAR_COMODO = "modalAddComodo";

//ID COM CAMPOS COM VALORES DO FORM ADD COMODO:
const CAPACIDADE_FORM_ADD_COMODO = "capacidadeComodo";
const LUMINOSIDADE_FORM_ADD_COMODO = "luminosidadeComodo";
const NOME_FORM_ADD_COMODO = "nomeComodo";
//id grid comodo
const GRID_COMODOS = "gridComodos";

//id form
const FORM_ADICIONAR_COMODO = "formAdicionarComodo";

let plantas_adicionadas = [];
let plantaSelecionada = null;
let plantaParaApagar = null;
let comodoParaRemover = null;

let comodos_adicionados = [];
let idxUltimaPlantaAdicionada = null; // PLANTA ULTIMA ADICIONADA

let comodoIndexParaRemoverPlanta = null;
let plantaIndexParaRemoverComodo = null;

//IDS DO FORMS DO MODAL VER INFO COMODO:
const MODAL_INFO_COMODO = "modalVerComodo";

const MODAL_INFO_COMODO_NOME = "verComodoNome";
const MODAL_INFO_COMODO_LUMINOSIDADE = "verComodoLuz";
const MODAL_INFO_COMODO_CAPACIDADE = "verComodoCapacidade";

let regaOriginal = null;
let fertOriginal = null;

let modoLuz = null;
let comodoOrigemLuz = null;

window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

function principal() {
  carregaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();
  atualizarSelectComodos();
  defineEventListenersParaElementosHTML();
  mostrarPlantaPorAdicionar();
  mostrarPlantaPorApagar();
}

/* ------------------------------------------------------------------------- */
/*                             LISTENERS GERAIS                              */
/* ------------------------------------------------------------------------- */

function defineEventListenersParaElementosHTML() {
  if (document.getElementById(BOTAO_APAGAR_PLANTAS)) {
    document.getElementById(BOTAO_APAGAR_PLANTAS).addEventListener("click", ativaModalSelecionarPlantasAdicionadas);
  }

  if (document.getElementById(BOTAO_ADICIONAR_PLANTAS)) {
    document.getElementById(BOTAO_ADICIONAR_PLANTAS).addEventListener("click", ativaModalSelecionarPlantas);
  }

  if (document.getElementById(FORM_ADICIONAR_PLANTA)) {
    document.getElementById(FORM_ADICIONAR_PLANTA).addEventListener("submit", submeterFormulario);
  }



  if (document.getElementById(FORM_ADICIONAR_COMODO)) {
    document
      .getElementById(FORM_ADICIONAR_COMODO)
      .addEventListener("submit", abrirModalConfirmarAdicionarComodo);
  }





  if (document.getElementById("btnAddComodo")) {
    document.getElementById("btnAddComodo").addEventListener("click", ativarModalAdicionarComodo);
  }

  if (document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA)) {
    document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA).addEventListener("click", ativarModalPlantaCustomizada);
  }

  // CONFIRMAR ADIÇÃO (modal "tens a certeza?")
  const btnConfirmarAdicao = document.getElementById("confirmarAdicao");
  if (btnConfirmarAdicao) {
    btnConfirmarAdicao.addEventListener("click", ativarModalConfirmarAdicao);
  }

  if (document.getElementById(FORM_ADICIONAR_PLANTA_CUSTOMIZADA)) {
    document.getElementById(FORM_ADICIONAR_PLANTA_CUSTOMIZADA).addEventListener("submit", submeterFormularioPlantaCustomizada);
  }

  // CONFIRMAR REMOÇÃO CÓMODO
  if (document.getElementById(BOTAO_CONFIRMAR_REMOVER_COMODO)) {
    document.getElementById(BOTAO_CONFIRMAR_REMOVER_COMODO).addEventListener("click", confirmarRemocaoComodo);
  }

  // Botão "OK" no modal de sucesso de rega
  if (document.getElementById(BTN_OK_REGA_GUARDADA)) {
    document.getElementById(BTN_OK_REGA_GUARDADA).addEventListener("click", () => {
        const mdSucesso = bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_REGA_GUARDADA));mdSucesso.hide();
      });
  }

}

// Eventos gerais de clique em botões dos modais de confirmação genéricos, alerta, etc.
document.addEventListener("click", (ev) => {
  if (ev.target && ev.target.id === "simAdicionar") {
    ev.preventDefault();

    // fecha o modal "Confirmar Adição"
    const mdConfirm = bootstrap.Modal.getOrCreateInstance(
      document.getElementById(MODAL_CONFIRMAR_ADICAO)
    );
    mdConfirm.hide();

    // chama a função que trata a submissão do formulário
    submeterFormulario(new Event("submit"));
  }

  if (ev.target && ev.target.id === "naoAdicionar") {
    if (document.getElementById(MODAL_CONFIRMAR_ADICAO)) {
      bootstrap
        .Modal
        .getOrCreateInstance(document.getElementById(MODAL_CONFIRMAR_ADICAO))
        .hide();
    }
  }

  if (ev.target && ev.target.id === OK_MODAL_ALERTA) {
    if (document.getElementById(MODAL_ALERTA_ADICAO)) {
      bootstrap
        .Modal
        .getOrCreateInstance(document.getElementById(MODAL_ALERTA_ADICAO))
        .hide();
    }
  }
});

// Clique no "+" de um cómodo → abrir fluxo de adicionar planta com esse cómodo pré-selecionado
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-comodo-add");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  const idx = Number(btn.dataset.comodo);
  const comodo = comodos_adicionados[idx];
  if (!comodo) return;

  comodoPreselecionado = comodo.nome;

  atualizarSelectComodos();
  const sel = document.getElementById("selComodo");
  if (sel) {
    sel.value = comodo.nome;
  }

  const modalCatalogo = document.getElementById(MODAL_SELECIONAR_PLANTA);
  if (modalCatalogo && window.bootstrap) {
    mostrarPlantaPorAdicionar();

    const md =
      bootstrap.Modal.getInstance(modalCatalogo) ||
      bootstrap.Modal.getOrCreateInstance(modalCatalogo);
    md.show();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnAddComodo = document.getElementById("btnAddComodo");
  if (btnAddComodo) {
    btnAddComodo.addEventListener("click", (e) => {
      e.preventDefault();
      ativarModalAdicionarComodo();
    });
  }
});



//------------------------------------------------
// controla de onde veio o "info" da rega custumizada
//------------------------------------------------

let origemInfoRega = null;

document.addEventListener("DOMContentLoaded", () => {
  const iconInfoRegaNormal  = document.getElementById("iconInfoRega");
  const iconInfoRegaCustom  = document.getElementById("iconInfoRegaCustom");
  const btnEntendiRega      = document.getElementById("btnEntendiRega");

  // clicar no ícone do modal Adicionar Planta normal
  if (iconInfoRegaNormal) {
    iconInfoRegaNormal.addEventListener("click", () => {
      origemInfoRega = "normal";
      // opcional: esconder o modal de adicionar, se quiseres que fique mesmo só o de info
      const elAdd = document.getElementById("modalAdicionarPlanta");
      if (elAdd) {
        const mdAdd = bootstrap.Modal.getInstance(elAdd) || bootstrap.Modal.getOrCreateInstance(elAdd);
        mdAdd.hide();
      }
    });
  }

  // clicar no ícone do modal Adicionar Planta Customizada
  if (iconInfoRegaCustom) {
    iconInfoRegaCustom.addEventListener("click", () => {
      origemInfoRega = "custom";
      const elAddCustom = document.getElementById("modalAdicionarPlantaCustomizada");
      if (elAddCustom) {
        const mdAddCustom = bootstrap.Modal.getInstance(elAddCustom) || bootstrap.Modal.getOrCreateInstance(elAddCustom);
        mdAddCustom.hide();
      }
    });
  }

  // botão "Entendi" dentro do modalInfoRega
  if (btnEntendiRega) {
    btnEntendiRega.addEventListener("click", () => {
      const elInfo = document.getElementById("modalInfoRega");
      const mdInfo = bootstrap.Modal.getInstance(elInfo) || bootstrap.Modal.getOrCreateInstance(elInfo);
      mdInfo.hide();

      setTimeout(() => {
        if (origemInfoRega === "custom") {
          const elAddCustom = document.getElementById("modalAdicionarPlantaCustomizada");
          if (elAddCustom) {
            const mdAddCustom = bootstrap.Modal.getInstance(elAddCustom) || bootstrap.Modal.getOrCreateInstance(elAddCustom);
            mdAddCustom.show();
          }
        } else {
          // default: modal de adicionar planta normal
          const elAdd = document.getElementById("modalAdicionarPlanta");
          if (elAdd) {
            const mdAdd = bootstrap.Modal.getInstance(elAdd) || bootstrap.Modal.getOrCreateInstance(elAdd);
            mdAdd.show();
          }
        }

        origemInfoRega = null; // limpa
      }, 100);
    });
  }
});

/* ------------------------------------------------------------------------- */
/*                        FUNÇÕES DE NORMALIZAÇÃO PLANTA                     */
/* ------------------------------------------------------------------------- */

function normalizarPlanta(planta) {
  if (!planta) return;

  // defaults básicos
  if (!("tipo_rega" in planta)) planta.tipo_rega = "manual";
  if (!("comodo" in planta)) planta.comodo = "";
  if (!planta.status) planta.status = "saudavel";

  // REGA
  if (!("ultimo_rega" in planta)) planta.ultimo_rega = null; // "YYYY-MM-DD"
  if (!Array.isArray(planta.historico_rega)) planta.historico_rega = [];

  // FERTILIZAÇÃO
  if (!("fertilizacao_tipo" in planta)) planta.fertilizacao_tipo = null; // ainda sem tipo
  if (!("ultima_fertilizacao" in planta)) planta.ultima_fertilizacao = null;
  if (!Array.isArray(planta.historico_fertilizacao)) {
    planta.historico_fertilizacao = [];
  }

  const cat = (planta.categoria || "").toLowerCase();

  // ---------------- REGA ----------------
  if (!("dias_rega" in planta) || planta.dias_rega == null) {
    switch (cat) {
      case "suculentas":
      case "cactos":
        planta.dias_rega = 7;
        break;
      case "flor":
        planta.dias_rega = 3;
        break;
      case "aromática":
      case "aromatica":
        planta.dias_rega = 2;
        break;
      case "árvore":
      case "arvore":
        planta.dias_rega = 4;
        break;
      default:
        planta.dias_rega = 3;
        break;
    }
  }

  // --------- FERTILIZAÇÃO: respeitar "nenhum" -----------
  if (planta.fertilizacao_tipo === "nenhum") {
    planta.intervalo_fertilizacao = null;
    return;
  }

  // Se a planta já tem tipo definido (inclusive “semanal”), respeitamos
  if (planta.fertilizacao_tipo === "semanal") {
    planta.intervalo_fertilizacao = 7;
    return;
  }

  // Se ainda não tem tipo definido, sugerimos um plano por categoria
  if (!planta.fertilizacao_tipo) {
    const cat = (planta.categoria || "").toLowerCase();

    switch (cat) {
      case "suculentas":
      case "cactos":
        planta.fertilizacao_tipo = "trimestral";
        planta.intervalo_fertilizacao = 90;
        break;

      case "flor":
      case "aromática":
      case "aromatica":
        planta.fertilizacao_tipo = "mensal";
        planta.intervalo_fertilizacao = 30;
        break;

      case "árvore":
      case "arvore":
        planta.fertilizacao_tipo = "trimestral";
        planta.intervalo_fertilizacao = 90;
        break;

      default:
        planta.fertilizacao_tipo = "mensal";
        planta.intervalo_fertilizacao = 30;
    }
  }
}

/* ------------------------------------------------------------------------- */
/*                                                                  COMODOS  */
/* ------------------------------------------------------------------------- */

/* Comodos*/
class Comodo {
  constructor(nome, nivel_luz, capacidade = 5, plantas = []) {
    this.nome = nome;
    this.nivel_luz = nivel_luz;
    this.capacidade = capacidade;
    this.plantas = plantas;
  }
  mudarCapacidade(nova_capacidade) {
    this.capacidade = nova_capacidade;
  }
  estahCheio() {
    return this.plantas.length == this.capacidade;
  }
  adicionar(planta) {
    if (this.nivel_luz != planta.nivel_luz) {
      planta.status = "doente";
      this.plantas.push(planta);
    } else {
      this.plantas.push(planta);
    }
  }
  remover(planta) {
    let i = this.plantas.indexOf(planta);
    this.plantas.splice(i, 1);
  }
}

function comodoExiste(nome) {
  return comodos_adicionados.some((comodo) => comodo.nome === nome);
}

function ativarModalFuncNImplementada() {
  if (document.getElementById(MODAL_FUNC_N_IMPLEMENTADA)) {
    new bootstrap.Modal(
      document.getElementById(MODAL_FUNC_N_IMPLEMENTADA)
    ).show();
  }
}

function ativarModalPlantaCustomizada() {
  const modal = document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA);
  if (modal) {
    bootstrap.Modal.getOrCreateInstance(modal).show();
  }
}

function ativarModalAdicionarComodo() {
  const modalEl = document.getElementById(MODAL_ADICIONAR_COMODO);
  if (!modalEl || !window.bootstrap) return;

  const md =
    bootstrap.Modal.getInstance(modalEl) ||
    bootstrap.Modal.getOrCreateInstance(modalEl);
  md.show();
}

/* ------------------------------------------------------------------------- */
/*               FORMULÁRIO PLANTA CUSTOMIZADA / ADICIONAR CÓMODO           */
/* ------------------------------------------------------------------------- */

// FORMULARIO de planta customizada
function submeterFormularioPlantaCustomizada(ev) {
  ev.preventDefault();

  const form = document.getElementById(FORM_ADICIONAR_PLANTA_CUSTOMIZADA);
  if (!form) return;

  const nome = form.nome_customizada.value.trim();
  const tipo = form.tipo_customizada.value.trim();
  const categoria = form.categoria_customizada.value.trim();
  const nivel_luz = form.nivel_luz_customizada.value;
  const nivel_agua = form.nivel_agua_customizada.value;
  const rega = form.rega_customizada.value;

  const selectComodo = form.comodo_customizada;
  const nomeComodo = selectComodo.value || "";

  const inputImg = document.getElementById("img_customizada");
  const ficheiroImg = inputImg.files[0];

  if (!ficheiroImg) {
    criarPlantaCustomizada("../imagens/planta_misteriosa.png");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64Img = e.target.result;
    criarPlantaCustomizada(base64Img);
  };

  reader.readAsDataURL(ficheiroImg);

  function criarPlantaCustomizada(img) {
    const nova = new Planta(
      nome || "Planta customizada",
      categoria || "Customizada",
      nivel_agua,
      nivel_luz,
      img
    );

    nova.tipo = tipo || nome || "Planta customizada";
    nova.tipo_rega = rega || "manual";
    nova.comodo = nomeComodo;

    let comodoObj = null;
    if (nomeComodo) {
      comodoObj = comodos_adicionados.find((c) => c.nome === nomeComodo);
    }

    if (!comodoObj) {
      plantas_adicionadas.push(nova);
      idxUltimaPlantaAdicionada = plantas_adicionadas.length - 1;

      gravaLocalStorage();
      mostrarMinhasPlantas();
    } else {
      if (comodoObj.estahCheio()) {
        bootstrap.Modal.getOrCreateInstance(
          document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA)
        ).hide();
        ativarModalAlertaEstahCheio();
        return;
      }

      if (nova.nivel_luz !== comodoObj.nivel_luz) {
        bootstrap.Modal.getOrCreateInstance(
          document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA)
        ).hide();
        ativarModalLuzAlerta(nova, comodoObj, "adicao", null);
        return;
      }

      comodoObj.adicionar(nova);
      plantas_adicionadas.push(nova);
      idxUltimaPlantaAdicionada = plantas_adicionadas.length - 1;

      gravaLocalStorage();
      mostrarMinhasPlantas();
      mostrarComodo();
    }
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalAdicionarPlantaCustomizada")
    ).hide();

    // mostrar toast em vez do modal de sucesso
    mostrarNotificacaoPlantaAdicionada();

    form.reset();
  }
}


// SUBMETER FORMULARIO COMODOS
function submeterFormularioComodos(event) {
  if (event) event.preventDefault();

  const nome = document.getElementById(NOME_FORM_ADD_COMODO).value.trim();
  const nivel_luz = document.getElementById(
    LUMINOSIDADE_FORM_ADD_COMODO
  ).value;
  const capacidade = parseInt(
    document.getElementById(CAPACIDADE_FORM_ADD_COMODO).value
  );

  const novoComodo = new Comodo(nome, nivel_luz, capacidade);
  comodos_adicionados.push(novoComodo);

  gravaLocalStorage();
  mostrarComodo();
  atualizarSelectComodos();

  const form = document.getElementById(FORM_ADICIONAR_COMODO);
  if (form) form.reset();

  const modalEl = document.getElementById(MODAL_ADICIONAR_COMODO);
  if (modalEl) {
    const md =
      bootstrap.Modal.getInstance(modalEl) ||
      bootstrap.Modal.getOrCreateInstance(modalEl);
    md.hide();
  }

  mostrarNotificacaoComodoAdicionado();
}

/* ------------------------------------------------------------------------- */
/*                                MOSTRAR COMODOS                            */
/* ------------------------------------------------------------------------- */

//MOSTRAR COMODO , MOSTRAR PLANTA NO COMODO
function mostrarComodo() {
  const grid = document.getElementById(GRID_COMODOS);
  if (!grid) return;

  const itens = comodos_adicionados
    .map((c, i) => {
      const bodyId = `comodo-${i}-body`;

      const lista =
        c.plantas && c.plantas.length
          ? c.plantas
              .map((p, j) => {
                // 👉 se a planta estiver doente, adiciona a classe que a põe a vermelho
                const estadoClasse = p.status === "doente" ? "planta-doente" : "";

                return `
        <div class="comodo-planta-row ${estadoClasse}">
          <div class="comodo-planta-esq">
            <img class="planta-thumb" src="${p.img}" alt="${p.nome}">
            <div class="planta-info">
              <div class="planta-nome">${p.nome}</div>
              <div class="planta-det">Sol: ${p.nivel_luz} • Água: ${p.nivel_agua}</div>
            </div>
          </div>

          <div class="comodo-planta-acoes" data-comodo="${i}" data-planta="${j}">
            <!-- Ícone mover -->
            <button type="button" class="btn-acao-comodo btn-mover" title="Mover planta">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2.51839 20.1752 2.22937 19.3001 2.10149 18M2 12V6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C21.8004 7.62741 21.9482 8.51364 21.9866 10" stroke="#000000ff" stroke-width="2" stroke-linecap="round"></path>
                <path d="M2 15C8.44365 15 6.55635 15 13 15M13 15L8.875 12M13 15L8.875 18" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>

            <!-- Ícone eliminar planta -->
            <button type="button" class="btn-acao-comodo btn-remover-comodo" title="Remover planta do cómodo">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M10 12V17" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M14 12V17" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M4 7H20" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
              }).join("")
          : `<div class="comodo-empty">Nenhuma planta neste cómodo.</div>`;

      return `
      <div class="accordion-item">
        <h2 class="accordion-header d-flex align-items-center">
          <button class="accordion-button collapsed flex-grow-1 d-flex justify-content-between align-items-center"
                  type="button" data-bs-toggle="collapse" data-bs-target="#${bodyId}" aria-expanded="false">
            <span class="fw-bold">${c.nome}</span>
            <span class="comodo-counter">${c.plantas.length}/${c.capacidade}</span>
          </button>

          <button type="button"
                  class="btn-acao-comodo-comodo icon-comodo-trash ms-2 me-3"
                  title="Eliminar cómodo"
                  data-comodo="${i}">
            <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
              <path d="M10 12V17" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M14 12V17" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M4 7H20" stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#000000ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button type="button" class="btn btn-addPlanta btn-comodo-add ms-2" title="Adicionar planta a este cómodo" data-comodo="${i}">
            <svg id="iconeAddPlanta" width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="1.5" y="1.5" width="20" height="20" rx="6" stroke="#000000" stroke-width="2" stroke-dasharray="4 6"/>
              <path d="M12 7v10M7 12h10" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

        </h2>

        <div id="${bodyId}" class="accordion-collapse collapse" data-bs-parent="#accComodos">
          <div class="accordion-body">
            <div class="comodo-meta">Luminosidade: <b>${c.nivel_luz}</b></div>
            <div class="lista-plantas">${lista}</div>
          </div>
        </div>
      </div>`;
    })
    .join("");

  grid.innerHTML = `<div id="accComodos" class="accordion w-100">${itens}</div>`;
}






function mostrarModalComodo(comodo) {
  document.getElementById(MODAL_INFO_COMODO_NOME).textContent = comodo.nome;
  document.getElementById(MODAL_INFO_COMODO_LUMINOSIDADE).textContent =
    comodo.nivel_luz;
  document.getElementById(MODAL_INFO_COMODO_CAPACIDADE).textContent =
    comodo.capacidade;

  const containerPlantas = document.getElementById("comodoPlantas");
  containerPlantas.innerHTML = "";

  if (comodo.plantas.length === 0) {
    containerPlantas.textContent = "Nenhuma planta neste cómodo.";
  } else {
    comodo.plantas.forEach((planta) => {
      const div = document.createElement("div");
      div.className = "comodo-planta-card";
      div.innerHTML = `
        <img src="${planta.img}" alt="${planta.nome}">
        <div>
        <span><b>Nome:</b>  ${planta.nome}</span> <br>
        <span><b>Tipo:</b>  ${planta.tipo} </span>
        <div>
      `;
      containerPlantas.appendChild(div);
    });
  }

  const modal = new bootstrap.Modal(document.getElementById(MODAL_INFO_COMODO));
  modal.show();
}

function atualizarSelectComodos() {
  const selects = [
    document.getElementById("selComodo"),
    document.getElementById("comodo_customizada"),
  ];

  selects.forEach((campoComodos) => {
    if (!campoComodos) return;

    campoComodos.innerHTML = "";

    const opcaoSemComodo = document.createElement("option");
    opcaoSemComodo.value = "";
    opcaoSemComodo.textContent = "Sem cómodo";
    campoComodos.appendChild(opcaoSemComodo);

    comodos_adicionados.forEach((comodo) => {
      const outraopcao = document.createElement("option");
      outraopcao.value = comodo.nome;
      outraopcao.textContent = comodo.nome;
      campoComodos.appendChild(outraopcao);
    });
  });
}

// para poder aceder aos métodos de comodo e manter as MESMAS referências de planta
function reconstruirComodosDoLocalStorage(comodos) {
  if (!comodos || !Array.isArray(comodos)) return [];

  return comodos
    .map((c) => {
      const comodo = new Comodo(c.nome, c.nivel_luz, c.capacidade);
      comodo.plantas = [];

      if (c.plantas && Array.isArray(c.plantas)) {
        c.plantas.forEach((pSalvo) => {
          const planta = plantas_adicionadas.find(
            (pp) =>
              pp.nome === pSalvo.nome &&
              pp.categoria === pSalvo.categoria &&
              pp.nivel_agua === pSalvo.nivel_agua &&
              pp.nivel_luz === pSalvo.nivel_luz &&
              pp.img === pSalvo.img
          );

          if (planta) {
            planta.comodo = c.nome;
            normalizarPlanta(planta);
            comodo.plantas.push(planta);
          }
        });
      }

      return comodo;
    })
    .filter(Boolean);
}

/* ------------------------------------------------------------------------- */
/*                                                                  PLANTAS  */
/* ------------------------------------------------------------------------- */

/**
 * Classe de plantas
 * @property {String} nome  - nome da planta
 * @property {String} categoria - categoria da planta
 * @property {String} nivel_agua - nivel de agua ideal pra planta
 * @property {String} nivel_luz - nivel de luz ideal pra planta
 * @property {String} img - caminho do ficheiro da imagem da planta
 */
class Planta {
  constructor(nome, categoria, nivel_agua, nivel_luz, img = null, status = "saudavel") {
    this.nome = nome;
    this.tipo = nome;
    this.categoria = categoria;
    this.nivel_agua = nivel_agua;
    this.nivel_luz = nivel_luz;

    this.tipo_rega = "manual";
    this.comodo = "";
    this.status = status;
    this.img = img;

    this.ultimo_rega = null;
    this.historico_rega = [];
    this.dias_rega = null;

    // campos de fertilização
    this.fertilizacao_tipo = null;         // ainda sem tipo definido
    this.ultima_fertilizacao = null;       // "YYYY-MM-DD"
    this.historico_fertilizacao = [];      // [{data: "..."}]
    this.intervalo_fertilizacao = null;    // em dias


    normalizarPlanta(this);
  }
}

// Lista de plantas disponíveis no catálogo
let plantas = [
  /*planta customizada*/
  new Planta("Planta Customizada", "", "", "", "../imagens/planta_misteriosa.png"),

   /*suculentas*/
  new Planta("Aloe vera ", "suculentas", "baixo", "alto", "../imagens/aloe.webp"), 
  new Planta("Echeveria", "suculentas", "baixo", "alto", "../imagens/Echeveria.webp"),
  new Planta("Crassula ovata", "suculentas", "alto", "alto", "../imagens/Crassulaovata.webp"),
  new Planta("Rabo burro", "suculentas", "baixo", "baixo", "../imagens/rabo-de-burro.webp"),
  new Planta("Haworthia", "suculentas", "baixo", "baixo", "../imagens/Haworthia.webp"),

  /*cactos*/
  new Planta("Cacto-bola", "cactos", "baixo", "baixo", "../imagens/cacto-bola.png"),
  new Planta("Orelha coelho", "cactos", "baixo", "medio", "../imagens/orelha-de-coelho.webp"),
  new Planta("Cacto-coluna", "cactos", "baixo", "alto", "../imagens/cacto-coluna.webp"),
  new Planta("Cacto-lunar", "cactos", "baixo", "alto", "../imagens/cacto-lunar.webp"),
  new Planta("Cacto Saguaro", "cactos", "medio", "medio", "../imagens/Saguaro.webp"),

  /*flores*/
  new Planta("Rosa", "flor", "medio", "alto", "../imagens/rosa.webp"),
  new Planta("Margarida", "flor", "medio", "medio", "../imagens/Margarida.webp"),
  new Planta("Girassol", "flor", "medio", "alto", "../imagens/Girassol.webp"),
  new Planta("Orquidia", "flor", "baixo", "alto", "../imagens/Orquidia.webp"),
  new Planta("Lirio", "flor", "alto", "alto", "../imagens/Lírio.webp"),

  /*ervas aromaticas*/
  new Planta("Manjericão", "Aromática", "alto", "alto", "../imagens/Manjericão.webp"),
  new Planta("Alecrim", "Aromática", "baixo", "medio", "../imagens/alecrim.webp"),
  new Planta("Hortelã", "Aromática", "alto", "medio", "../imagens/Hortelã.webp"),
  new Planta("Tomilho", "Aromática", "baixo", "medio", "../imagens/Tomilho.webp"),
  new Planta("Salsa", "Aromática", "alto", "medio", "../imagens/Salsa.webp"),

  /*arvores*/
  new Planta("Limoneiro", "árvore", "alto", "alto", "../imagens/Limoneiro.webp"),
  new Planta("Mangueira", "árvore", "alto", "medio", "../imagens/Mangueira.webp"),
  new Planta("Cerejeira", "árvore", "medio", "medio", "../imagens/Cerejeira.webp"),
  new Planta("Amendoeiro", "árvore", "baixo", "medio", "../imagens/Amendoeiro.webp"),
  new Planta("Oliveira", "árvore", "baixo", "alto", "../imagens/Oliveira.webp"),
];

window.plantas = plantas;

/* ------------------------------------------------------------------------- */
/*                                    LOCALSTORAGE / MOSTRAR PLANTAS         */
/* ------------------------------------------------------------------------- */


/**
 * Adiciona a planta desejada em Minhas Plantas e guarda no local storage
 * @param {Planta} planta Planta para adicionar
 */
function adicionarPlanta(planta) {
  plantas_adicionadas.push(planta);
  gravaLocalStorage();
}

function mostrarMinhasPlantas() {
  const gridAntiga = document.getElementById(GRID_PLANTAS);
  if (!gridAntiga) return;

  // cria nova grelha
  const gridNova = document.createElement("div");
  gridNova.setAttribute("id", GRID_PLANTAS);
  gridNova.className = gridAntiga.className || "grid";

  // botão "+"
  const BOTAO_ADICIONAR = document.createElement("div");
  BOTAO_ADICIONAR.id = BOTAO_ADICIONAR_PLANTAS;
  BOTAO_ADICIONAR.className = "card add";
  BOTAO_ADICIONAR.innerHTML = `
    <svg id="iconeAddPlanta" width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" stroke="#2b3b28" stroke-width="2" stroke-dasharray="4 6"/>
      <path d="M12 7v10M7 12h10" stroke="#2b3b28" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  gridNova.appendChild(BOTAO_ADICIONAR);

  // cartões das plantas
  plantas_adicionadas.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card itemCatalogo plant cursor-pointer";

    if (p.status === "doente") {
        card.classList.add("planta-doente");
    }

    if (i === idxUltimaPlantaAdicionada) {
      card.classList.add("just-added");
    }

    card.dataset.index = i;
    card.title = "Ver informação";

    normalizarPlanta(p);

    const estadoRega = getEstadoRega(p);
    const estadoFert = getEstadoFertilizacao(p);

    card.innerHTML = `
      ${p.img ? `<img class="plant-img" src="${p.img}" alt="${p.nome}">` : ""}
      <div class="meta">
        <div class="name">${p.nome}</div>
        <div class="plant-badges mt-1">
          <span class="badge ${estadoRega.precisa ? "bg-warning" : "bg-success"}" title="${estadoRega.mensagem}">
            💧 ${estadoRega.precisa ? "Precisa de água" : "Rega  &#x21E8; Ok"}
          </span>
          <span class="badge ${estadoFert.precisa ? "bg-warning" : "bg-success"}" title="${estadoFert.mensagem}">
            🌱 ${estadoFert.precisa ? "Fertilizar" : "Fertilização  &#x21E8; Ok"}
          </span>
        </div>
      </div>
    `;
    gridNova.appendChild(card);
  });

  // substitui grelha antiga pela nova
  gridAntiga.parentNode.replaceChild(gridNova, gridAntiga);

  // === BOTÃO ELIMINAR FORA DA GRELHA ===
  const wrapper = document.getElementById("delete-wrapper");
  if (wrapper) {
    wrapper.innerHTML = ""; // limpa o que lá estava

    if (plantas_adicionadas.length !== 0) {
      const BOTAO_APAGAR = document.createElement("button");
      BOTAO_APAGAR.id = "btnApagarPlantas";
      BOTAO_APAGAR.className = "delete";
      BOTAO_APAGAR.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M9 3h6m-9 4h12M8 7v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        "</svg>Eliminar";

      wrapper.appendChild(BOTAO_APAGAR);

      BOTAO_APAGAR.addEventListener("click", ativaModalSelecionarPlantasAdicionadas);
    }
  }

  // listeners do "+"
  document
    .getElementById(BOTAO_ADICIONAR_PLANTAS)
    ?.addEventListener("click", ativaModalSelecionarPlantas);
}




function mostrarPlantaPorAdicionar(filtroNome = "") {
  const catalogoGrid = document.getElementById(GRID_CATALOGO);
  if (!catalogoGrid) return;

  catalogoGrid.innerHTML = "";

  const termo = filtroNome.trim().toLowerCase();

  const listaFiltrada = plantas.filter((planta) =>
    planta.nome.toLowerCase().includes(termo)
  );

  if (listaFiltrada.length === 0) {
    catalogoGrid.innerHTML = `
      <p class="text-muted text-center mt-3">
        Nenhuma planta encontrada com esse nome.
      </p>`;
    return;
  }

  listaFiltrada.forEach((planta) => {
    const card = document.createElement("div");
    card.className = "card itemCatalogo planta-card text-center";
    card.dataset.nome = planta.nome;

    card.innerHTML = `
      <img class="plant-img" src="${planta.img}" alt="${planta.nome}">
      <div class="plant-name">${planta.nome}</div>
    `;

    catalogoGrid.appendChild(card);
  });
}

function mostrarPlantaPorApagar() {
  const grid = document.getElementById(GRID_PLANTAS_ADICIONADAS);
  if (!grid) return;

  grid.innerHTML = "";

  plantas_adicionadas.forEach((planta, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "planta-card";

    const card = document.createElement("div");
    card.className = "card itemCatalogo planta-card-apagar text-center";
    card.dataset.index = i;

    card.innerHTML = `
      ${planta.img ? `<img class="plant-img" src="${planta.img}" alt="${planta.nome}">` : ""}
      <div class="plant-name">${planta.nome}</div>
    `;

    wrapper.appendChild(card);
    grid.appendChild(wrapper);
  });
}


/**
 * Mostra o modal da planta selecionada
 * @param {Planta} plantaSelecionada 
 */
function mostrarPlantaSelecionada(plantaSelecionada) {
  let bodyModalAddPlanta = document.getElementById(MODAL_BODY_ADICIONAR_PLANTA);
  let msg_planta_selecionada = "<p>" + plantaSelecionada.innerHTML + "</p>";
  bodyModalAddPlanta.innerHTML = msg_planta_selecionada;
}



/* LOCALSTORAGE */

function gravaLocalStorage() {
  localStorage.setItem(
    ITEM_PLANTAS_ADICIONADAS,
    JSON.stringify(plantas_adicionadas)
  );
  localStorage.setItem(ITEM_COMODOS, JSON.stringify(comodos_adicionados));
}

function carregaLocalStorage() {
  plantas_adicionadas =
    JSON.parse(localStorage.getItem(ITEM_PLANTAS_ADICIONADAS)) || [];
  plantas_adicionadas.forEach(normalizarPlanta);

  const comodos = JSON.parse(localStorage.getItem(ITEM_COMODOS)) || [];
  comodos_adicionados = reconstruirComodosDoLocalStorage(comodos) || [];


  // Converte o histórico de plantas adicionadas guardado em formato JSON (JavaScript
  // Object Notation) no local storage do browser, para um objeto em memória.

  // A parte "|| []" em cima serve para garantir que o histórico de plantas
  // em memória existe (como array), pois pode dar-se o caso de JSON.parse()
  // devolver null se for a primeira vez que executamos a aplicação.
}


/**
 * Apaga todos os dados no local storage do browser.
 * @param {Planta} planta a ser removida
 */
function trataApagarPlanta(planta) {
  const idx = plantas_adicionadas.findIndex(
    (p) =>
      p.nome === planta.nome &&
      p.categoria === planta.categoria &&
      p.img === planta.img
  );

  if (idx === -1) return;

  plantas_adicionadas.splice(idx, 1);

  const comodoObj = comodos_adicionados.find((c) => c.nome === planta.comodo);
  if (comodoObj) {
    const idxPlantaComodo = comodoObj.plantas.findIndex(
      (p) => p.nome === planta.nome
    );
    if (idxPlantaComodo !== -1) comodoObj.plantas.splice(idxPlantaComodo, 1);
  }

  gravaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();
  mostrarPlantaPorApagar();
}

/* ------------------------------------------------------------------------- */
/*                              MODAL INFO PLANTA                            */
/* ------------------------------------------------------------------------- */

let idxPlantaAberta = null;

// Abrir modal ao clicar no cartão da planta (secção Minhas Plantas)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".itemCatalogo.plant");
  if (!card || !card.dataset.index) return;

  const idx = parseInt(card.dataset.index, 10);
  const p = plantas_adicionadas[idx];
  if (!p) return;

  abrirModalInfoPlanta(p);
});




// Abrir modal ao clicar numa planta DENTRO do cómodo
document.addEventListener("click", (e) => {
  const row = e.target.closest(".comodo-planta-row");
  if (!row) return;

  // se clicar nos botões de ação (mover/remover), não abre o modal de info
  if (e.target.closest(".comodo-planta-acoes")) return;

  const acoes = row.querySelector(".comodo-planta-acoes");
  if (!acoes) return;

  const idxComodo = parseInt(acoes.dataset.comodo, 10);
  const idxPlanta = parseInt(acoes.dataset.planta, 10);
  if (isNaN(idxComodo) || isNaN(idxPlanta)) return;

  const comodo = comodos_adicionados[idxComodo];
  const planta = comodo?.plantas[idxPlanta];
  if (!comodo || !planta) return;

  abrirModalInfoPlanta(planta);
});





// Guardar alteração de rega
function guardarRega() {
  if (idxPlantaAberta == null) return;

  const sel = document.getElementById("infoSelRega");
  const inp = document.getElementById("infoDiasRega");

  const valorTipo = sel?.value || "manual";
  let valorDias = parseInt(inp?.value, 10);

  if (isNaN(valorDias) || valorDias <= 0) {
    valorDias = 3;
  }

  const planta = plantas_adicionadas[idxPlantaAberta];
  planta.tipo_rega = valorTipo;
  planta.dias_rega = valorDias;

  normalizarPlanta(planta);
  gravaLocalStorage();
  mostrarMinhasPlantas();
  atualizarEstadoRegaEFertilizacaoNoModal(planta);

  regaOriginal = `${valorTipo}|${valorDias}`;
  const btnGuardar = document.getElementById("btnGuardarRega");
  if (btnGuardar) btnGuardar.disabled = true;
}

// BOTÃO "Eliminar" dentro do modal de informações
document.addEventListener("DOMContentLoaded", () => {
  const btnEliminarInfo = document.getElementById("btnEliminarPlantaInfo");
  if (!btnEliminarInfo) return;

  btnEliminarInfo.addEventListener("click", () => {
    if (idxPlantaAberta == null) return;

    const planta = plantas_adicionadas[idxPlantaAberta];
    if (!planta) return;

    plantaParaApagar = planta;
    const nomeSpan = document.getElementById("nomePlantaConfirmar");
    if (nomeSpan) {
      nomeSpan.textContent = planta.nome;
    }

    const mdInfo = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalInfoPlanta")
    );
    mdInfo.hide();

    const mdConfirm = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalConfirmarApagarPlanta")
    );
    mdConfirm.show();
  });
});


/* ------------------------------------- */
/*        MODAL Confirmar Adição         */
/* ------------------------------------- */
function ativarModalConfirmarAdicao(event) {
  event.preventDefault();
  if (document.getElementById(MODAL_ADICIONAR_PLANTA)) {
    bootstrap
      .Modal
      .getOrCreateInstance(document.getElementById(MODAL_ADICIONAR_PLANTA))
      .hide();
  }
  new bootstrap.Modal(
    document.getElementById(MODAL_CONFIRMAR_ADICAO)
  ).show();
}

/* ------------------------------------- */
/*        MODAL Alerta está cheio        */
/* ------------------------------------- */
function ativarModalAlertaEstahCheio() {
  if (document.getElementById(MODAL_CONFIRMAR_ADICAO)) {
    bootstrap
      .Modal
      .getOrCreateInstance(document.getElementById(MODAL_CONFIRMAR_ADICAO))
      .hide();
  }
  if (document.getElementById(MODAL_ALERTA_ADICAO)) {
    if (document.getElementById("motivoCancelamento")) {
      document.getElementById("motivoCancelamento").innerHTML =
        `<p><b>MOTIVO</b>: O comodo está cheio!</p>`;
    }
  }
  new bootstrap.Modal(
    document.getElementById(MODAL_ALERTA_ADICAO)
  ).show();
}

/* ------------------------------------- */
/*        MODAL Alerta Luz diferente     */
/* ------------------------------------- */
function ativarModalLuzAlerta(planta, comodoDestino, modo = "adicao", comodoOrigem = null) {
  modoLuz = modo;
  comodoOrigemLuz = comodoOrigem;

  if (document.getElementById("motivoLuz")) {
    document.getElementById("motivoLuz").innerHTML =
      `<b>Nível de luz do cómodo ${comodoDestino.nome}</b> : ${comodoDestino.nivel_luz}<br>` +
      `<b>Nível de luz da planta ${planta.nome}</b>: ${planta.nivel_luz}`;
  }

  const elModal = document.getElementById("modalLuzAlerta");
  const modalLuz =
    bootstrap.Modal.getInstance(elModal) ||
    bootstrap.Modal.getOrCreateInstance(elModal);
  modalLuz.show();

  const btnSim = document.getElementById("btnSimAdicionarAlerta");
  btnSim.onclick = () => {
    if (modoLuz === "adicao") {
      comodoDestino.adicionar(planta);
      plantas_adicionadas.push(planta);
      idxUltimaPlantaAdicionada = plantas_adicionadas.length - 1;
    } else if (modoLuz === "movimento" && comodoOrigemLuz) {
      const idxOrig = comodoOrigemLuz.plantas.indexOf(planta);
      if (idxOrig !== -1) {
        comodoOrigemLuz.plantas.splice(idxOrig, 1);
      }

      const idxDest = comodoDestino.plantas.indexOf(planta);
      if (idxDest === -1) {
        comodoDestino.adicionar(planta);
      }

      planta.comodo = comodoDestino.nome;

      const idxGlobal = plantas_adicionadas.findIndex(
        (p) =>
          p.nome === planta.nome &&
          p.img === planta.img &&
          p.nivel_luz === planta.nivel_luz &&
          p.nivel_agua === planta.nivel_agua
      );
      if (idxGlobal !== -1) {
        plantas_adicionadas[idxGlobal].comodo = comodoDestino.nome;
      }
    }

    gravaLocalStorage();
    mostrarMinhasPlantas();
    mostrarComodo();

    modalLuz.hide();

    if (modoLuz === "adicao") {
      mostrarNotificacaoPlantaAdicionada();
    } else if (modoLuz === "movimento") {
      mostrarNotificacaoPlantaMovida();
    }

    modoLuz = null;
    comodoOrigemLuz = null;
  };
}

/* ----------------------------------- */
/*        MODAL Catalogo Plantas       */
/* ----------------------------------- */

function ativaModalSelecionarPlantas() {
  const inputPesquisa = document.getElementById("inputPesquisaPlantas");
  if (inputPesquisa) {
    inputPesquisa.value = "";
  }

  mostrarPlantaPorAdicionar("");

  const modalEl = document.getElementById(MODAL_SELECIONAR_PLANTA);
  if (modalEl && window.bootstrap) {
    const md =
      bootstrap.Modal.getInstance(modalEl) ||
      bootstrap.Modal.getOrCreateInstance(modalEl);
    md.show();
  }
}


// ativa modal pra selecionar qual das plantas adicionadas apagar
function ativaModalSelecionarPlantasAdicionadas(event) {
  event.preventDefault();

  // Atualiza a grelha com as plantas atuais
  mostrarPlantaPorApagar();

  // Abre o modal de selecionar plantas para apagar
  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_SELECIONAR_PLANTA_APAGAR)).show();
}

/* ----------------------------------- */
//planta escolhida no catálogo          /
/* ----------------------------------- */

// CLICK NAS PLANTAS DO CATÁLOGO (ADD PLANTA)
document.addEventListener("click", (ev) => {
  const card = ev.target.closest(".planta-card.itemCatalogo");
  if (!card) return;

  // garantir que é mesmo do catálogo
  const grid = card.closest(`#${GRID_CATALOGO}`);
  if (!grid) return;

  const nome = card.dataset.nome;
  plantaSelecionada = plantas.find((p) => p.nome === nome);
  if (!plantaSelecionada) return;

  if (plantaSelecionada.nome == "Planta Customizada") {
    // fecha catálogo e abre o modal de adicionar planta customizada
    bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_SELECIONAR_PLANTA)).hide();
    bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_ADICIONAR_PLANTA_CUSTOMIZADA)).show();
    return;
  }

  // fecha catálogo e abre o modal de adicionar planta
  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_SELECIONAR_PLANTA)).hide();
  preencherFormulario(plantaSelecionada);
  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_ADICIONAR_PLANTA)).show();
});

// CLICK NAS PLANTAS PARA APAGAR
document.addEventListener("click", (ev) => {
  const card = ev.target.closest(".planta-card-apagar");
  if (!card) return;

  const grid = card.closest(`#${GRID_PLANTAS_ADICIONADAS}`);
  if (!grid) return;

  const nome = card.querySelector(".plant-name")?.textContent.trim();
  if (!nome) return;

  const planta = plantas_adicionadas.find((p) => p.nome === nome);
  if (!planta) return;

  // guardar planta na variável global
  plantaParaApagar = planta;

  // mete o nome da planta no modal
  document.getElementById("nomePlantaConfirmar").textContent = planta.nome;

  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_SELECIONAR_PLANTA_APAGAR)).hide();

  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalConfirmarApagarPlanta")).show();
});



document.addEventListener("DOMContentLoaded", () => {
  const inputPesquisa = document.getElementById("inputPesquisaPlantas");
  if (!inputPesquisa) return;

  inputPesquisa.addEventListener("input", () => {
    mostrarPlantaPorAdicionar(inputPesquisa.value);
  });
});

/* ----------------------------------- */
/*         Form adicionar planta       */
/* ----------------------------------- */
// Form----Preenche os campos visuais + editáveis
function preencherFormulario(planta) {
  if (planta.nome != "Planta Customizada") {
    document.getElementById("Nome").value = planta.nome;
    document.getElementById("txtTipo").innerHTML = `<i>${planta.tipo}</i>`;

    document.getElementById("txtCategoria").textContent = planta.categoria;
    document.getElementById("txtLuz").textContent = planta.nivel_luz;
    document.getElementById("txtAgua").textContent = planta.nivel_agua;

    document.getElementById("selComodo").value =
      comodoPreselecionado || "";
    document.getElementById("selRega").value = "manual";
  } else {
    document.getElementById("Nome").value = planta.nome;
    document.getElementById("txtTipo").style.display = "none";
    document.getElementById("inpTipo").type = "text";

    document.getElementById("txtCategoria").style.display = "none";
    document.getElementById("inpCategoria").type = "text";
    document.getElementById("txtLuz").style.display = "none";
    document.getElementById("inpLuz").type = "text";
    document.getElementById("txtAgua").style.display = "none";
    document.getElementById("inpAgua").type = "text";

    document.getElementById("selComodo").value =
      comodoPreselecionado || "";
    document.getElementById("selRega").value = "manual";
  }
}

function submeterFormulario(ev) {
  ev.preventDefault();

  console.log(plantaSelecionada.nome);
  /*
  if(plantaSelecionada.nome != "Planta Customizada"){
    console.log("aqui");
    const nome   = document.getElementById("Nome").value.trim(); 
    const comodo = document.getElementById("selComodo").value;
    const rega   = document.getElementById("selRega").value;
    console.log(comodo);
    const tipo       = plantaSelecionada.nome;
    const categoria  = plantaSelecionada.categoria;
    const nivel_agua = plantaSelecionada.nivel_agua;
    const nivel_luz  = plantaSelecionada.nivel_luz;

    const nova = new Planta(nome, categoria, nivel_agua, nivel_luz, plantaSelecionada.img);
    nova.comodo   = comodo;
    nova.tipo_rega = rega;
  }
  else{
    const nome   = document.getElementById("Nome").value.trim(); 
    const comodo = document.getElementById("selComodo").value;
    const rega   = document.getElementById("selRega").value;

    const tipo       = document.getElementById("inpTipo").value.trim();;
    const categoria  = document.getElementById("inpCategoria").value.trim();;
    const nivel_agua = document.getElementById("Nome").value.trim();;
    const nivel_luz  = document.getElementById("Nome").value.trim();;

    const nova = new Planta(nome, categoria, nivel_agua, nivel_luz, plantaSelecionada.img);
    nova.comodo   = comodo;
    nova.tipo_rega = rega;
  }
  */

  const nome = document.getElementById("Nome").value.trim();
  const comodo = document.getElementById("selComodo").value;
  const rega = document.getElementById("selRega").value;

  const tipo = plantaSelecionada.nome;
  const categoria = plantaSelecionada.categoria;
  const nivel_agua = plantaSelecionada.nivel_agua;
  const nivel_luz = plantaSelecionada.nivel_luz;

  const nova = new Planta(
    nome,
    categoria,
    nivel_agua,
    nivel_luz,
    plantaSelecionada.img
  );
  nova.comodo = comodo;
  nova.tipo_rega = rega;

  if (comodo === "") {
    plantas_adicionadas.push(nova);
    idxUltimaPlantaAdicionada = plantas_adicionadas.length - 1;

    gravaLocalStorage();
    mostrarMinhasPlantas();

    // toast em vez do modal
    mostrarNotificacaoPlantaAdicionada();

    bootstrap.Modal.getOrCreateInstance(
      document.getElementById(MODAL_ADICIONAR_PLANTA)
    ).hide();
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById(MODAL_SELECIONAR_PLANTA)
    ).hide();

    return;
  }



  const comodoObj = comodos_adicionados.find((c) => c.nome === comodo);
  if (!comodoObj) return;

  if (comodoObj.estahCheio()) {
    if (document.getElementById(MODAL_ADICIONAR_PLANTA)) {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById(MODAL_ADICIONAR_PLANTA)
      ).hide();
    }
    if (document.getElementById(MODAL_SELECIONAR_PLANTA)) {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById(MODAL_SELECIONAR_PLANTA)
      ).hide();
    }

    ativarModalAlertaEstahCheio();
    return;
  }

  if (nova.nivel_luz !== comodoObj.nivel_luz) {
    if (document.getElementById(MODAL_ADICIONAR_PLANTA)) {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById(MODAL_ADICIONAR_PLANTA)
      ).hide();
    }
    if (document.getElementById(MODAL_SELECIONAR_PLANTA)) {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById(MODAL_SELECIONAR_PLANTA)
      ).hide();
    }
    ativarModalLuzAlerta(nova, comodoObj, "adicao", null);
    return;
  }

  comodoObj.adicionar(nova);
  plantas_adicionadas.push(nova);
  idxUltimaPlantaAdicionada = plantas_adicionadas.length - 1;

  gravaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();
  
  // toast em vez do modal
  mostrarNotificacaoPlantaAdicionada();  

  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_ADICIONAR_PLANTA)).hide();

  bootstrap.Modal.getOrCreateInstance(document.getElementById(MODAL_SELECIONAR_PLANTA)).hide();
}


/* ------------------------------------------------------------------------- */
/*                                                       modal EXPLICAR REGA */
/* ------------------------------------------------------------------------- */
/*   // Só adiciona o listener se o botão existir na página
  const btnEntendiRega = document.getElementById("btnEntendiRega");
  if (btnEntendiRega) {
    btnEntendiRega.addEventListener("click", function () {
      // Fechar o modal de informação
      const modalInfo = bootstrap.Modal.getInstance(document.getElementById("modalInfoRega"));
      modalInfo.hide();

      // Reabrir o modal de Adicionar Planta
      setTimeout(() => {
        const modalAdd = new bootstrap.Modal(document.getElementById("modalAdicionarPlanta"));
        modalAdd.show();
      }, 100);
    });
  }
 */
 
/* ------------------------------------------------------------------------- */
/*                    MODAL CONFIRMAR APAGAR PLANTA                          */
/* ------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const btnNaoApagar = document.getElementById("btnNaoApagarPlanta");
  const btnSimApagar = document.getElementById("btnSimApagarPlanta");
  const btnOkApagada = document.getElementById("btnOkPlantaApagada");

 // BOTÃO "NÃO" 
  if (btnNaoApagar) {
    btnNaoApagar.addEventListener("click", () => {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalConfirmarApagarPlanta")
      ).hide();
      plantaParaApagar = null;
    });
  }


  // BOTÃO "SIM, ELIMINAR"
  if (btnSimApagar) {
    btnSimApagar.addEventListener("click", () => {
      if (!plantaParaApagar) return;
      trataApagarPlanta(plantaParaApagar);

      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalConfirmarApagarPlanta")
      ).hide();

      plantaParaApagar = null;

      // toast específico de planta apagada
      mostrarNotificacaoPlantaApagada();
    });
  }

  // BOTÃO "OK" -- MODAL DE SUCESSO
  if (btnOkApagada) {
    btnOkApagada.addEventListener("click", () => {
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalPlantaApagada")
      ).hide();
    });
  }

  if (btnOkAdicionada) {
    btnOkAdicionada.addEventListener("click", () => {
      // AGORA:
      mostrarNotificacaoPlantaAdicionada();
    });
  }
});

/* -------------------------------------------------------- */
/*       ATIVAR/DESATIVAR BOTÕES GUARDAR REGA/FERT          */
/* -------------------------------------------------------- */
document.addEventListener("change", (e) => {
  if (e.target.id === "infoSelRega" || e.target.id === "infoDiasRega") {
    const sel = document.getElementById("infoSelRega");
    const inp = document.getElementById("infoDiasRega");
    const btn = document.getElementById("btnGuardarRega");
    if (!sel || !inp || !btn) return;

    const atual = `${sel.value}|${inp.value}`;
    btn.disabled = atual === regaOriginal;
  }

  if (e.target.id === "infoSelFertTipo") {
    const btn = document.getElementById("btnGuardarFert");
    if (!btn) return;
    btn.disabled = e.target.value === fertOriginal;
  }
});

/* ------------------------------------------------------------------------- */
/*                           REGAS E FERTILIZAÇÃO                            */
/* ------------------------------------------------------------------------- */

function hojeISO() {
  return new Date().toISOString().split("T")[0];
}

function diasDesde(dataISO) {
  if (!dataISO) return null;
  const hoje = new Date();
  const data = new Date(dataISO);
  const diffMs = hoje - data;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function diasAteProxima(ultimoISO, intervaloDias) {
  if (!ultimoISO || !intervaloDias) return null;
  const passados = diasDesde(ultimoISO);
  if (passados == null) return null;
  return intervaloDias - passados;
}

function getEstadoRega(planta) {
  normalizarPlanta(planta);

  const passados = diasDesde(planta.ultimo_rega);
  const intervalo = planta.dias_rega;
  if (passados == null) {
    return {
      precisa: true,
      mensagem: "Ainda não foi registada nenhuma rega.",
      dias_passados: null,
      dias_restantes: null,
    };
  }

  const restantes = intervalo - passados;
  const precisa = restantes <= 0;
  return {
    precisa,
    dias_passados: passados,
    dias_restantes: restantes,
    mensagem: precisa
      ? `Esta planta devia ter sido regada há ${-restantes} dia(s).`
      : `Faltam ${restantes} dia(s) para a próxima rega.`,
  };
}

function getEstadoFertilizacao(planta) {
  normalizarPlanta(planta);

  if (planta.fertilizacao_tipo === "nenhum") {
    return {
      precisa: false,
      mensagem: "Fertilização não configurada.",
      dias_passados: null,
      dias_restantes: null,
    };
  }

  const passados = diasDesde(planta.ultima_fertilizacao);
  const intervalo = planta.intervalo_fertilizacao;
  if (passados == null) {
    return {
      precisa: true,
      mensagem: "Ainda não foi registada nenhuma fertilização.",
      dias_passados: null,
      dias_restantes: null,
    };
  }

  const restantes = intervalo - passados;
  const precisa = restantes <= 0;
  return {
    precisa,
    dias_passados: passados,
    dias_restantes: restantes,
    mensagem: precisa
      ? `Esta planta devia ter sido fertilizada há ${-restantes} dia(s).`
      : `Faltam ${restantes} dia(s) para a próxima fertilização.`,
  };
}

function registarRegaAgora(planta) {
  if (!planta) return;
  normalizarPlanta(planta);

  const hoje = hojeISO();
  planta.ultimo_rega = hoje;
  planta.historico_rega.push({ data: hoje });

  const idx = plantas_adicionadas.indexOf(planta);
  if (idx !== -1) {
    idxUltimaPlantaAdicionada = idx;
  }

  gravaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();
}


function registarRegaAgoraPlantaAberta() {
  if (idxPlantaAberta == null) return;
  const planta = plantas_adicionadas[idxPlantaAberta];
  registarRegaAgora(planta);
}

function registarFertilizacaoAgora(planta) {
  if (!planta) return;
  normalizarPlanta(planta);

  if (planta.fertilizacao_tipo === "nenhum") {
    console.warn("Fertilização não configurada para esta planta.");
  }

  const hoje = hojeISO();
  planta.ultima_fertilizacao = hoje;
  planta.historico_fertilizacao.push({ data: hoje });

  const idx = plantas_adicionadas.indexOf(planta);
  if (idx !== -1) {
    idxUltimaPlantaAdicionada = idx;
  }

  gravaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();
}



function registarFertilizacaoAgoraPlantaAberta() {
  if (idxPlantaAberta == null) return;
  const planta = plantas_adicionadas[idxPlantaAberta];
  registarFertilizacaoAgora(planta);
}

function definirTipoFertilizacao(planta, tipo) {
  if (!planta) return;
  normalizarPlanta(planta);

  planta.fertilizacao_tipo = tipo;

  if (tipo === "semanal") {
    planta.intervalo_fertilizacao = 7;
  }
  else if (tipo === "mensal") {
    planta.intervalo_fertilizacao = 30;
  }
  else if (tipo === "trimestral") {
    planta.intervalo_fertilizacao = 90;
  }
  else if (tipo === "nenhum") {
    planta.intervalo_fertilizacao = null;
  }

  gravaLocalStorage();
}


function atualizarEstadoRegaEFertilizacaoNoModal(planta) {
  if (!planta) return;
  normalizarPlanta(planta);

  const estadoRega = getEstadoRega(planta);
  const elRegaEstado = document.getElementById("infoRegaEstado");
  const elRegaUltima = document.getElementById("infoRegaUltima");
  const elRegaProxima = document.getElementById("infoRegaProxima");

  if (elRegaEstado) elRegaEstado.textContent = estadoRega.mensagem;
  if (elRegaUltima)
    elRegaUltima.textContent = planta.ultimo_rega ? planta.ultimo_rega : "—";
  if (elRegaProxima) {
    if (estadoRega.dias_restantes == null) {
      elRegaProxima.textContent = "—";
    } else if (estadoRega.dias_restantes <= 0) {
      elRegaProxima.textContent = "Hoje / em atraso";
    } else {
      elRegaProxima.textContent = `Dentro de ${estadoRega.dias_restantes} dia(s)`;
    }
  }

  const estadoFert = getEstadoFertilizacao(planta);
  const elFertEstado = document.getElementById("infoFertEstado");
  const elFertUltima = document.getElementById("infoFertUltima");
  const elFertProxima = document.getElementById("infoFertProxima");
  const selFertTipo = document.getElementById("infoSelFertTipo");

  if (elFertEstado) elFertEstado.textContent = estadoFert.mensagem;
  if (elFertUltima)
    elFertUltima.textContent = planta.ultima_fertilizacao
      ? planta.ultima_fertilizacao
      : "—";
  if (elFertProxima) {
    if (estadoFert.dias_restantes == null) {
      elFertProxima.textContent = "—";
    } else if (estadoFert.dias_restantes <= 0) {
      elFertProxima.textContent = "Hoje / em atraso";
    } else {
      elFertProxima.textContent = `Dentro de ${estadoFert.dias_restantes} dia(s)`;
    }
  }

  if (selFertTipo) {
    selFertTipo.value = planta.fertilizacao_tipo || "nenhum";
  }
}

function guardarFertilizacao() {
  if (idxPlantaAberta == null) return;

  const sel = document.getElementById("infoSelFertTipo");
  const valor = sel?.value || "nenhum";

  const planta = plantas_adicionadas[idxPlantaAberta];
  definirTipoFertilizacao(planta, valor);
  atualizarEstadoRegaEFertilizacaoNoModal(planta);
  gravaLocalStorage();

  fertOriginal = valor;
  const btn = document.getElementById("btnGuardarFert");
  if (btn) btn.disabled = true;
}

/* ------------------------------------------------------------------------- */
/*                        TROCA DE CÓMODO / POPUPS VÁRIOS                    */
/* ------------------------------------------------------------------------- */

function ativarModalTrocaDeComodo(planta, comodoAtual) {
  preencherModalTrocaDeComodo(planta, comodoAtual);

  const el = document.getElementById("modalTrocarPlantaDeComodo");
  if (!el) return;

  const md =
    bootstrap.Modal.getInstance(el) ||
    bootstrap.Modal.getOrCreateInstance(el);
  md.show();
}

function preencherModalTrocaDeComodo(planta, comodoAtual) {
  const div_comodos_disponiveis = document.getElementById("comodosDisponiveis");
  if (!div_comodos_disponiveis) return;

  div_comodos_disponiveis.innerHTML = "";

  const comodosDestino = comodos_adicionados.filter(
    (c) => !c.estahCheio() && c !== comodoAtual
  );

  if (comodosDestino.length === 0) {
    const msg = document.createElement("p");
    msg.className = "text-muted text-center w-100 mt-3";
    msg.textContent =
      "Não há outros cómodos disponíveis para mover esta planta.";
    div_comodos_disponiveis.appendChild(msg);
    return;
  }

  comodosDestino.forEach((c) => {
    const div_comodo = document.createElement("div");
    div_comodo.className = "card card_comodos_disponiveis";
    div_comodo.innerHTML = "<p>" + c.nome + "</p>";
    div_comodo.addEventListener("click", () => {
      trocarPlantaDeComodo(planta, c, comodoAtual);
    });
    div_comodos_disponiveis.appendChild(div_comodo);
  });
}


/**Função que permite fazer a troca de comodo de uma planta. trocarPlantaDeComodo */
function trocarPlantaDeComodo(planta, novoComodo, comodoAtual) {
  if (!planta || !novoComodo || !comodoAtual) return;

  const modalTrocarEl = document.getElementById("modalTrocarPlantaDeComodo");
  const modalTrocar = modalTrocarEl
    ? bootstrap.Modal.getInstance(modalTrocarEl) ||
      bootstrap.Modal.getOrCreateInstance(modalTrocarEl)
    : null;

  if (typeof novoComodo.estahCheio === "function" && novoComodo.estahCheio()) {
    if (modalTrocar) modalTrocar.hide();
    ativarModalAlertaEstahCheio();
    return;
  }

  if (planta.nivel_luz !== novoComodo.nivel_luz) {
    if (modalTrocar) modalTrocar.hide();
    ativarModalLuzAlerta(planta, novoComodo, "movimento", comodoAtual);
    return;
  }

  comodoAtual.plantas = comodoAtual.plantas.filter((p) => p !== planta);

  if (!Array.isArray(novoComodo.plantas)) {
    novoComodo.plantas = [];
  }

  if (!novoComodo.plantas.includes(planta)) {
    if (typeof novoComodo.adicionar === "function") {
      novoComodo.adicionar(planta);
    } else {
      novoComodo.plantas.push(planta);
    }
  }

  planta.comodo = novoComodo.nome;

  const idxGlobal = plantas_adicionadas.indexOf(planta);
  if (idxGlobal !== -1) {
    plantas_adicionadas[idxGlobal].comodo = novoComodo.nome;
  }

  gravaLocalStorage();
  mostrarMinhasPlantas();
  mostrarComodo();

  if (modalTrocar) modalTrocar.hide();

  // toast de planta "movida/adicionada"
  mostrarNotificacaoPlantaMovida();
}

/* ------------------------------------------------------------------------- */
/*                                                  POP UPS DE CANCELAMENTO  */
/* ------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Modais
  const elCatalogo     = document.getElementById("modalCatalogo");
  const elAdicionar    = document.getElementById("modalAdicionarPlanta");
  const elApagar       = document.getElementById("modalPlantasAdicionadas");
  const elConfirmar    = document.getElementById("modalConfirmarCancelar");
  const elComodo       = document.getElementById("modalAddComodo");
  const elQuiz         = document.getElementById("modalQuizComodo");
  const elRecomendadas = document.getElementById("modalPlantasRecomendadas");
  const elLuz          = document.getElementById("modalLuzAlerta");

  const elAddCustom  = document.getElementById("modalAdicionarPlantaCustomizada");


  const mdConfirmar = elConfirmar ? bootstrap.Modal.getOrCreateInstance(elConfirmar): null;

  // mapa para conseguir chegar ao modal a partir da "origin"
  const modalPorOrigin = {
    catalogo: elCatalogo,
    adicionar: elAdicionar,
    apagar: elApagar,
    comodo: elComodo,
    quiz: elQuiz,
    recomendadas: elRecomendadas,
    luz: elLuz,
    
    adicionar_customizada: elAddCustom,
  };

  // Botões que pedem confirmação
  const triggers = [
    { el: document.getElementById("btn-close"),        origin: "catalogo"  },
    { el: document.getElementById("btn_fechar"),       origin: "catalogo"  },

    { el: document.getElementById("btn-closeAdd"),     origin: "adicionar" },
    { el: document.getElementById("btn_fecharAdd"),    origin: "adicionar" },
      
    { el: document.getElementById("btn-closeApagar"),  origin: "apagar"    },
    { el: document.getElementById("btn_fecharApagar"), origin: "apagar"    },

    { el: document.getElementById("btnCloseComodo"),   origin: "comodo"    },
    { el: document.getElementById("btnCancelarComodo"),origin: "comodo"    },

    // X do quiz "Descobre as plantas ideais"
    { el: document.getElementById("btnFecharQuiz"),    origin: "quiz"      },

    { el: document.getElementById("btnFecharRecomendadas"), origin: "recomendadas" },
    { el: document.getElementById("btnNaoAdicionarAlerta"), origin: "luz" },

    { el: document.getElementById("btn-closeAddCustom"),  origin: "adicionar_customizada" },
    { el: document.getElementById("btn_fecharAddCustom"), origin: "adicionar_customizada" },
   
  ];

  const btnSim = document.getElementById("btnSimCancelar");
  const btnNao = document.getElementById("btnNaoCancelar");

  // "catalogo" | "adicionar" | "apagar" | "comodo" | "quiz" | "recomendadas" | "luz"
  let origin = null;

  // Abrir confirmação a partir do botão certo 
  triggers.forEach((t) => {
    if (!t.el) return;

    t.el.addEventListener("click", (e) => {
      // MUITO IMPORTANTE: bloquear o comportamento automático do Bootstrap
      e.preventDefault();
      e.stopImmediatePropagation();

      origin = t.origin;

      // fecha SEMPRE o modal de origem antes de abrir a confirmação
      const elOrig = modalPorOrigin[origin];
      if (elOrig) {
        const instOrig =
          bootstrap.Modal.getInstance(elOrig) ||
          bootstrap.Modal.getOrCreateInstance(elOrig);
        instOrig.hide();
      }

      // pequena pausa para deixar o fade-out acabar e depois mostrar o de confirmação
      setTimeout(() => {
        if (mdConfirmar) mdConfirmar.show();
      }, 150);
    });
  });

  // SIM - não reabre o modal original
  if (btnSim) {
    btnSim.addEventListener("click", () => {
      if (mdConfirmar) mdConfirmar.hide();
      origin = null;
    });
  }

  // NÃO - reabre o modal de origem
  if (btnNao) {
    btnNao.addEventListener("click", () => {
      if (mdConfirmar) mdConfirmar.hide();

      setTimeout(() => {
        const elOrig = modalPorOrigin[origin];
        if (elOrig) {
          const instOrig =
            bootstrap.Modal.getInstance(elOrig) ||
            bootstrap.Modal.getOrCreateInstance(elOrig);
          instOrig.show();
        }
        origin = null;
      }, 150);
    });
  }
});







/* ------------------------------------------------------------------------- */
/*                                                                           */
/* ------------------------------------------------------------------------- */
/*
function atualizarEstadoBotaoApagar() {
  const grid = document.getElementById("grid_plantas");
  const btnApagar = document.getElementById("btnApagarPlantas");
  const plantas = grid.querySelectorAll(".card-planta");
  btnApagar.disabled = (plantas.length === 0);
}
  */

// Atualiza ao carregar a página
//document.addEventListener("DOMContentLoaded", atualizarEstadoBotaoApagar);

/* ------------------------------------------------------------------------- */
/*                                                   MODAL DE REMOVER CÓMODO */
/* ------------------------------------------------------------------------- */

// Quando clicar no ícone do caixote do cómodo
document.addEventListener("click", (ev) => {
  const icon = ev.target.closest(".icon-comodo-trash");
  if (!icon) return;

  ev.preventDefault();
  ev.stopPropagation();

  const idx = parseInt(icon.dataset.comodo, 10);
  if (isNaN(idx)) return;

  comodoParaRemover = comodos_adicionados[idx];
  if (!comodoParaRemover) return;

  // mete nome no modal
  document.getElementById("nomeComodoRemover").textContent = comodoParaRemover.nome;

  // abre modal de confirmar
  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalConfirmarRemoverComodo")).show();
});


// CONFIRMAR A REMOÇÃO DE COMODO
function confirmarRemocaoComodo() {
  if (!comodoParaRemover) return;

  // Remove do array
  comodos_adicionados = comodos_adicionados.filter((c) => c !== comodoParaRemover);

  // Plantas que estavam nesse cómodo ficam sem cómodo
  plantas_adicionadas.forEach((p) => {
    if (p.comodo === comodoParaRemover.nome) {
      p.comodo = "";
    }
  });


  // Guarda e atualiza interface
  gravaLocalStorage();
  mostrarComodo();
  mostrarMinhasPlantas();

  comodoParaRemover = null;

  // Fecha modal de confirmar
  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalConfirmarRemoverComodo")).hide();

  // Mostrar toast (em vez do modal)
  mostrarNotificacaoComodoRemovido();
}

/* ------------------------------------------------------------------------- */
/*                             REMOVER PLANTA DO CÓMODO                      */
/* ------------------------------------------------------------------------- */
// Clicar no ícone de lixo da planta dentro do cómodo
document.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".btn-remover-comodo");
  if (!btn) return;

  const container = btn.closest(".comodo-planta-acoes");
  if (!container) return;

  ev.preventDefault();
  ev.stopPropagation();

  const idxComodo = parseInt(container.dataset.comodo, 10);
  const idxPlanta = parseInt(container.dataset.planta, 10);
  if (isNaN(idxComodo) || isNaN(idxPlanta)) return;

  const comodo = comodos_adicionados[idxComodo];
  const planta = comodo?.plantas[idxPlanta];
  if (!comodo || !planta) return;

  comodoIndexParaRemoverPlanta = idxComodo;
  plantaIndexParaRemoverComodo = idxPlanta;

  document.getElementById("nomePlantaRemoverComodo").textContent = planta.nome;
  document.getElementById("nomeComodoPlantaRemover").textContent = comodo.nome;

  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalConfirmarRemoverPlantaComodo")).show();
});


// Botão "Remover" no modal de confirmação
const btnConfirmarRemoverPlantaComodo = document.getElementById("btnConfirmarRemoverPlantaComodo");
if (btnConfirmarRemoverPlantaComodo) {
  btnConfirmarRemoverPlantaComodo.addEventListener("click", () => {
    if (
      comodoIndexParaRemoverPlanta == null ||
      plantaIndexParaRemoverComodo == null
    )
      return;

    const comodo = comodos_adicionados[comodoIndexParaRemoverPlanta];
    if (!comodo) return;
    
    // Planta a remover do cómodo
    const plantaRemovida = comodo.plantas[plantaIndexParaRemoverComodo];
    if (!plantaRemovida) return;

    comodo.plantas.splice(plantaIndexParaRemoverComodo, 1);

    plantas_adicionadas = plantas_adicionadas.filter(
      (p) => !(p.nome === plantaRemovida.nome && p.img === plantaRemovida.img)
    );

    gravaLocalStorage();
    mostrarComodo();
    mostrarMinhasPlantas();
    mostrarPlantaPorApagar();

    comodoIndexParaRemoverPlanta = null;
    plantaIndexParaRemoverComodo = null;

    const mdConfirm = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("modalConfirmarRemoverPlantaComodo"));mdConfirm.hide();

    // em vez do mdSucesso.show(), só isto:
    mostrarNotificacaoPlantaApagada();
  });
}

/* ------------------------------------------------------------------------- */
/*                      MOVER PLANTA ENTRE CÓMODOS (BOTÃO)                   */
/* ------------------------------------------------------------------------- */

document.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".btn-mover");
  if (!btn) return;

  const container = btn.closest(".comodo-planta-acoes");
  if (!container) return;

  ev.preventDefault();
  ev.stopPropagation();

  const idxComodo = parseInt(container.dataset.comodo, 10);
  const idxPlanta = parseInt(container.dataset.planta, 10);
  if (isNaN(idxComodo) || isNaN(idxPlanta)) return;

  const comodo = comodos_adicionados[idxComodo];
  const planta = comodo?.plantas[idxPlanta];
  if (!comodo || !planta) return;

  ativarModalTrocaDeComodo(planta, comodo);
});

/* ------------------------------------------------------------------------- */
/*                      REGA & FERT – MODAIS E BOTÕES                        */
/* ------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const elModalInfo = document.getElementById("modalInfoPlanta");
  const elModalRega = document.getElementById("modalRega");
  const elModalFert = document.getElementById("modalFert");

  if (!elModalInfo || !elModalRega || !elModalFert) {
    console.error("Algum dos modais (Info/Rega/Fert) não foi encontrado.");
    return;
  }

  const modalInfo = bootstrap.Modal.getOrCreateInstance(elModalInfo);
  const modalRega = bootstrap.Modal.getOrCreateInstance(elModalRega);
  const modalFert = bootstrap.Modal.getOrCreateInstance(elModalFert);

  const btnAbrirRega = document.getElementById("btnAbrirRega");
  const btnAbrirFert = document.getElementById("btnAbrirFert");
  const btnVoltarRega = document.getElementById("btnVoltarRega");
  const btnVoltarFert = document.getElementById("btnVoltarFert");

  const btnGuardarRega = document.getElementById("btnGuardarRega");
  const btnGuardarFert = document.getElementById("btnGuardarFert");

  const btnRegaHoje = document.getElementById("btnRegaHoje");
  const btnFertHoje = document.getElementById("btnFertHoje");

  const selFertTipo = document.getElementById("infoSelFertTipo");

  if (btnAbrirRega) {
    btnAbrirRega.addEventListener("click", () => {
      modalInfo.hide();
      setTimeout(() => modalRega.show(), 200);
    });
  }

  if (btnAbrirFert) {
    btnAbrirFert.addEventListener("click", () => {
      modalInfo.hide();
      setTimeout(() => modalFert.show(), 200);
    });
  }

  if (btnVoltarRega) {
    btnVoltarRega.addEventListener("click", () => {
      modalRega.hide();
      setTimeout(() => modalInfo.show(), 200);
    });
  }

  if (btnVoltarFert) {
    btnVoltarFert.addEventListener("click", () => {
      modalFert.hide();
      setTimeout(() => modalInfo.show(), 200);
    });
  }

  if (btnGuardarRega) {
    btnGuardarRega.addEventListener("click", (e) => {
      e.preventDefault();

      if (typeof guardarRega === "function") {
        guardarRega();
      }

      // fecha o modal de configuração de rega
      modalRega.hide();

      // mostra o toast de sucesso
      mostrarNotificacaoRegaGuardada();
      setTimeout(() => modalInfo.show(), 200);
    });
  }

  if (btnGuardarFert) {
    btnGuardarFert.addEventListener("click", (e) => {
      e.preventDefault();

      if (typeof guardarFertilizacao === "function") {
        guardarFertilizacao();
      }
      // fecha o modal de fertilização
      modalFert.hide();

      // mostra o toast de sucesso
      mostrarNotificacaoFertGuardada();
      setTimeout(() => modalInfo.show(), 200);
    });
  }


  if (btnRegaHoje) {
    btnRegaHoje.addEventListener("click", () => {
      if (idxPlantaAberta == null) return;

      const planta = plantas_adicionadas[idxPlantaAberta];
      registarRegaAgora(planta);

      modalRega.hide();

      // mostrar toast de sucesso
      mostrarNotificacaoRegaHoje();
      setTimeout(() => modalInfo.show(), 200);
    });
  }


  if (btnFertHoje) {
    btnFertHoje.addEventListener("click", () => {
      if (idxPlantaAberta == null) return;
      
      const planta = plantas_adicionadas[idxPlantaAberta];
      registarFertilizacaoAgora(planta);

      modalFert.hide();

      // mostrar toast de sucesso
      mostrarNotificacaoFertHoje();

      setTimeout(() => modalInfo.show(), 200);
    });
  }

  if (selFertTipo) {
    selFertTipo.addEventListener("change", () => {
      if (idxPlantaAberta == null) return;
      const planta = plantas_adicionadas[idxPlantaAberta];
      definirTipoFertilizacao(planta, selFertTipo.value);
      atualizarEstadoRegaEFertilizacaoNoModal(planta);
    });
  }
});


/*--------------------------------------TOASTS-toats-------------------------------------------------*/
function mostrarNotificacaoPlantaAdicionada() {
  const elToast = document.getElementById("toastPlantaAdicionada");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoPlantaApagada() {
  const elToast = document.getElementById("toastPlantaApagada");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoPlantaMovida() {
  const elToast = document.getElementById("toastPlantaMovida");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoComodoRemovido() {
  const elToast = document.getElementById("toastComodoRemovido");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoComodoAdicionado() {
  const elToast = document.getElementById("toastComodoAdicionado");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoRegaGuardada() {
  const elToast = document.getElementById("toastRegaGuardada");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoFertGuardada() {
  const elToast = document.getElementById("toastFertGuardada");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoRegaHoje() {
  const elToast = document.getElementById("toastRegaHoje");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}

function mostrarNotificacaoFertHoje() {
  const elToast = document.getElementById("toastFertHoje");
  if (!elToast) return;

  const toast = bootstrap.Toast.getInstance(elToast) || new bootstrap.Toast(elToast);
  toast.show();
}


//--------------info de planta dentro do comodo-------------------------------------------------------------------
function abrirModalInfoPlanta(planta) {
  if (!planta) return;
  // descobrir o índice desta planta no array global
  const idxGlobal = plantas_adicionadas.indexOf(planta);
  if (idxGlobal === -1) return;

  idxPlantaAberta = idxGlobal;
  normalizarPlanta(planta);

  if (planta.nome === "Planta Customizada") {
    document.getElementById("infoPlantaTipo").className =
      "form-control-plaintext border rounded px-2 py-1";
    document.getElementById("infoPlantaCategoria").className =
      "form-control-plaintext border rounded px-2 py-1";
    document.getElementById("infoPlantaLuz").className = "";
    document.getElementById("infoPlantaAgua").className = "";
  }

  document.getElementById("infoPlantaTitulo").textContent = planta.nome || "—";
  document.getElementById("infoPlantaImg").src = planta.img || "";
  document.getElementById("infoPlantaImg").alt = planta.nome || "";
  document.getElementById("infoPlantaNome").textContent = planta.nome || "—";
  document.getElementById("infoPlantaTipo").textContent =
    planta.tipo || planta.nome || "—";
  document.getElementById("infoPlantaCategoria").textContent =
    planta.categoria || "—";
  document.getElementById("infoPlantaLuz").textContent = planta.nivel_luz || "—";
  document.getElementById("infoPlantaAgua").textContent = planta.nivel_agua || "—";
  document.getElementById("infoPlantaComodo").textContent = planta.comodo || "—";

  const selRega = document.getElementById("infoSelRega");
  if (selRega) selRega.value = planta.tipo_rega || "manual";

  const inpDiasRega = document.getElementById("infoDiasRega");
  if (inpDiasRega) {
    inpDiasRega.value = planta.dias_rega != null ? planta.dias_rega : 3;
  }

  regaOriginal =
    selRega && inpDiasRega ? `${selRega.value}|${inpDiasRega.value}` : "manual|3";

  const btnGuardar = document.getElementById("btnGuardarRega");
  if (btnGuardar) btnGuardar.disabled = true;

  // fertilização
  fertOriginal = planta.fertilizacao_tipo || "nenhum";
  const btnF = document.getElementById("btnGuardarFert");
  if (btnF) btnF.disabled = true;

  atualizarEstadoRegaEFertilizacaoNoModal(planta);

  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modalInfoPlanta")
  ).show();
}




//------------------abrirModalConfirmarAdicionarComodo
function abrirModalConfirmarAdicionarComodo(event) {
  if (event) event.preventDefault();

  // esconde o modal "Adicionar Cómodo"
  const modalAdd = document.getElementById(MODAL_ADICIONAR_COMODO); // "modalAddComodo"
  if (modalAdd && window.bootstrap) {
    const mdAdd =
      bootstrap.Modal.getInstance(modalAdd) ||
      bootstrap.Modal.getOrCreateInstance(modalAdd);
    mdAdd.hide();
  }

  // mostra o modal de confirmação
  const elConfirm = document.getElementById("modalConfirmarAdicionarComodo");
  if (!elConfirm) return;

  const mdConfirm =
    bootstrap.Modal.getInstance(elConfirm) ||
    bootstrap.Modal.getOrCreateInstance(elConfirm);
  mdConfirm.show();
}

//--------------modal de confirmação de adicionar comodo-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnSim = document.getElementById("btnSimAdicionarComodo");
  const btnNao = document.getElementById("btnNaoAdicionarComodo");

  // Clicar em "Não" -» fecha confirmação e volta a abrir "Adicionar Cómodo"
  if (btnNao) {
    btnNao.addEventListener("click", () => {
      const elConfirm = document.getElementById("modalConfirmarAdicionarComodo");
      if (elConfirm) {
        const mdConfirm =
          bootstrap.Modal.getInstance(elConfirm) ||
          bootstrap.Modal.getOrCreateInstance(elConfirm);
        mdConfirm.hide();
      }

      // reabrir o modal de adicionar cómodo
      setTimeout(() => {
        const elAdd = document.getElementById(MODAL_ADICIONAR_COMODO);
        if (elAdd) {
          const mdAdd =
            bootstrap.Modal.getInstance(elAdd) ||
            bootstrap.Modal.getOrCreateInstance(elAdd);
          mdAdd.show();
        }
      }, 150);
    });
  }

  // Clicar em "Sim" -» fecha confirmação e cria o cómodo
  if (btnSim) {
    btnSim.addEventListener("click", () => {
      const elConfirm = document.getElementById("modalConfirmarAdicionarComodo");
      if (elConfirm) {
        const mdConfirm =
          bootstrap.Modal.getInstance(elConfirm) ||
          bootstrap.Modal.getOrCreateInstance(elConfirm);
        mdConfirm.hide();
      }

      submeterFormularioComodos();
    });
  }
});
