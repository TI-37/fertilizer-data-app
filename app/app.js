const STORAGE_KEY = "fertilizer-soil-log-v1";
const componentKeys = [
  "carbon",
  "hydrogen",
  "oxygen",
  "nitrogen",
  "phosphorus",
  "potassium",
  "calcium",
  "magnesium",
  "sulfur",
  "iron",
  "manganese",
  "zinc",
  "copper",
  "boron",
  "molybdenum",
  "chlorine",
  "nickel",
];
const componentLabels = {
  carbon: "C",
  hydrogen: "H",
  oxygen: "O",
  nitrogen: "N",
  phosphorus: "P",
  potassium: "K",
  calcium: "Ca",
  magnesium: "Mg",
  sulfur: "S",
  iron: "Fe",
  manganese: "Mn",
  zinc: "Zn",
  copper: "Cu",
  boron: "B",
  molybdenum: "Mo",
  chlorine: "Cl",
  nickel: "Ni",
};
const guaranteeRules = {
  nitrogen: { legalName: "窒素全量", status: "guarantee" },
  phosphorus: { legalName: "りん酸全量", status: "guarantee" },
  potassium: { legalName: "加里全量", status: "guarantee" },
  calcium: { legalName: "石灰（可溶性・く溶性・水溶性の区分要確認）", status: "guarantee" },
  magnesium: { legalName: "苦土（可溶性・く溶性・水溶性の区分要確認）", status: "guarantee" },
  sulfur: { legalName: "可溶性硫黄", status: "guarantee" },
  manganese: { legalName: "マンガン（可溶性・く溶性・水溶性の区分要確認）", status: "guarantee" },
  boron: { legalName: "ほう素（く溶性・水溶性の区分要確認）", status: "guarantee" },
  carbon: { legalName: "炭素", status: "reference" },
  hydrogen: { legalName: "水素", status: "reference" },
  oxygen: { legalName: "酸素", status: "reference" },
  iron: { legalName: "鉄", status: "reference" },
  zinc: { legalName: "亜鉛", status: "reference" },
  copper: { legalName: "銅", status: "reference" },
  molybdenum: { legalName: "モリブデン", status: "reference" },
  chlorine: { legalName: "塩素", status: "reference" },
  nickel: { legalName: "ニッケル", status: "reference" },
};
// 保証形態別内訳（内成分）: 肥料表示ルールで保証票に記載される「全量」の内訳・形態別保証成分
const formKeys = [
  "ammoniacalNitrogen",
  "nitrateNitrogen",
  "solublePhosphate",
  "waterSolublePhosphate",
  "citrateSolublePhosphate",
  "waterSolublePotassium",
  "citrateSolublePotassium",
  "solubleMagnesium",
  "citrateSolubleMagnesium",
  "waterSolubleMagnesium",
  "citrateSolubleBoron",
  "waterSolubleBoron",
  "alkali",
];
const formLabels = {
  ammoniacalNitrogen: "アンモニア性窒素",
  nitrateNitrogen: "硝酸性窒素",
  solublePhosphate: "可溶性りん酸",
  waterSolublePhosphate: "水溶性りん酸",
  citrateSolublePhosphate: "く溶性りん酸",
  waterSolublePotassium: "水溶性加里",
  citrateSolublePotassium: "く溶性加里",
  solubleMagnesium: "可溶性苦土",
  citrateSolubleMagnesium: "く溶性苦土",
  waterSolubleMagnesium: "水溶性苦土",
  citrateSolubleBoron: "く溶性ほう素",
  waterSolubleBoron: "水溶性ほう素",
  alkali: "アルカリ分",
};
// 内訳が属する主要成分（多量・微量）への対応。OCRで全量が読めない場合の補完に使う。
const formParent = {
  ammoniacalNitrogen: "nitrogen",
  nitrateNitrogen: "nitrogen",
  solublePhosphate: "phosphorus",
  waterSolublePhosphate: "phosphorus",
  citrateSolublePhosphate: "phosphorus",
  waterSolublePotassium: "potassium",
  citrateSolublePotassium: "potassium",
  solubleMagnesium: "magnesium",
  citrateSolubleMagnesium: "magnesium",
  waterSolubleMagnesium: "magnesium",
  citrateSolubleBoron: "boron",
  waterSolubleBoron: "boron",
  alkali: "calcium",
};
// 保証票で「全量」として表記される主要成分のラベル（内訳から推定した値の表示に使う）
const guaranteeTotalLabels = {
  nitrogen: "窒素全量",
  phosphorus: "りん酸全量",
  potassium: "加里全量",
  magnesium: "苦土",
  boron: "ほう素",
};
const soilLabels = {
  ph: "pH",
  ec: "EC",
  nitrateNitrogen: "硝酸態窒素",
  ammoniumNitrogen: "アンモニア態窒素",
  availablePhosphorus: "有効態リン酸",
  calcium: "石灰",
  magnesium: "苦土",
  potassium: "カリ",
  cec: "CEC",
  phosphateAbsorption: "リン酸吸収係数",
  humus: "腐食",
  baseSaturation: "塩基飽和度",
  calciumMagnesiumRatio: "Ca/Mg",
  magnesiumPotassiumRatio: "Mg/K",
};
const fertilizerTypeOptions = ["化成肥料", "有機肥料", "液体肥料", "堆肥・改良材", "微量要素", "その他"];
const fertilizerEffectOptions = ["未選択", "速効性", "緩効性", "中間", "混合・併用"];
const nitrogenKindOptions = ["未選択", "アンモニア態窒素", "硝酸態窒素", "硝酸態窒素＋アンモニア態窒素", "窒素全量", "緩効性窒素", "被覆窒素"];
const phosphorusKindOptions = ["未選択", "水溶性りん酸", "可溶性りん酸", "く溶性りん酸", "りん酸全量"];
const potassiumKindOptions = ["未選択", "水溶性加里", "く溶性加里", "加里全量"];
const soilTextureOptions = ["砂土", "砂壌土", "壌土", "埴壌土", "埴土", "未判定"];
const colors = ["#2f6f55", "#c9871e", "#5d7fa3", "#8c6a45", "#b94635", "#6b7f3c"];

let state = loadState();
let selectedFertilizerId = state.fertilizers[0]?.id ?? null;
let pendingPhoto = "";
let pendingOcrImage = "";
let chartAnimationFrame = 0;

const el = {
  fertilizerForm: document.querySelector("#fertilizerForm"),
  soilForm: document.querySelector("#soilForm"),
  viewPanes: document.querySelectorAll(".view-pane"),
  entryPanel: document.querySelector(".entry-panel"),
  tabs: document.querySelectorAll(".tab"),
  fertilizerId: document.querySelector("#fertilizerId"),
  fertilizerName: document.querySelector("#fertilizerName"),
  fertilizerNameOptions: document.querySelector("#fertilizerNameOptions"),
  fertilizerType: document.querySelector("#fertilizerType"),
  manufacturer: document.querySelector("#manufacturer"),
  manufacturerOptions: document.querySelector("#manufacturerOptions"),
  registeredAt: document.querySelector("#registeredAt"),
  fertilizerEffect: document.querySelector("#fertilizerEffect"),
  fertilizerTraitKind: document.querySelector("#fertilizerTraitKind"),
  nitrogenKind: document.querySelector("#nitrogenKind"),
  phosphorusKind: document.querySelector("#phosphorusKind"),
  potassiumKind: document.querySelector("#potassiumKind"),
  packagePhoto: document.querySelector("#packagePhoto"),
  photoPreview: document.querySelector("#photoPreview"),
  ocrPanel: document.querySelector("#ocrPanel"),
  ocrStatus: document.querySelector("#ocrStatus"),
  ocrResults: document.querySelector("#ocrResults"),
  retryOcr: document.querySelector("#retryOcr"),
  carbon: document.querySelector("#carbon"),
  hydrogen: document.querySelector("#hydrogen"),
  oxygen: document.querySelector("#oxygen"),
  nitrogen: document.querySelector("#nitrogen"),
  phosphorus: document.querySelector("#phosphorus"),
  potassium: document.querySelector("#potassium"),
  calcium: document.querySelector("#calcium"),
  magnesium: document.querySelector("#magnesium"),
  sulfur: document.querySelector("#sulfur"),
  iron: document.querySelector("#iron"),
  manganese: document.querySelector("#manganese"),
  zinc: document.querySelector("#zinc"),
  copper: document.querySelector("#copper"),
  boron: document.querySelector("#boron"),
  molybdenum: document.querySelector("#molybdenum"),
  chlorine: document.querySelector("#chlorine"),
  nickel: document.querySelector("#nickel"),
  ammoniacalNitrogen: document.querySelector("#ammoniacalNitrogen"),
  nitrateNitrogen: document.querySelector("#nitrateNitrogen"),
  solublePhosphate: document.querySelector("#solublePhosphate"),
  waterSolublePhosphate: document.querySelector("#waterSolublePhosphate"),
  citrateSolublePhosphate: document.querySelector("#citrateSolublePhosphate"),
  waterSolublePotassium: document.querySelector("#waterSolublePotassium"),
  citrateSolublePotassium: document.querySelector("#citrateSolublePotassium"),
  solubleMagnesium: document.querySelector("#solubleMagnesium"),
  citrateSolubleMagnesium: document.querySelector("#citrateSolubleMagnesium"),
  waterSolubleMagnesium: document.querySelector("#waterSolubleMagnesium"),
  citrateSolubleBoron: document.querySelector("#citrateSolubleBoron"),
  waterSolubleBoron: document.querySelector("#waterSolubleBoron"),
  alkali: document.querySelector("#alkali"),
  fertilizerMemo: document.querySelector("#fertilizerMemo"),
  soilId: document.querySelector("#soilId"),
  soilPlace: document.querySelector("#soilPlace"),
  soilPlaceOptions: document.querySelector("#soilPlaceOptions"),
  soilDate: document.querySelector("#soilDate"),
  soilTexture: document.querySelector("#soilTexture"),
  soilCrop: document.querySelector("#soilCrop"),
  soilCropOptions: document.querySelector("#soilCropOptions"),
  soilPh: document.querySelector("#soilPh"),
  soilEc: document.querySelector("#soilEc"),
  soilNitrateNitrogen: document.querySelector("#soilNitrateNitrogen"),
  soilAmmoniumNitrogen: document.querySelector("#soilAmmoniumNitrogen"),
  soilAvailablePhosphorus: document.querySelector("#soilAvailablePhosphorus"),
  soilCalcium: document.querySelector("#soilCalcium"),
  soilMagnesium: document.querySelector("#soilMagnesium"),
  soilPotassium: document.querySelector("#soilPotassium"),
  soilCec: document.querySelector("#soilCec"),
  soilPhosphateAbsorption: document.querySelector("#soilPhosphateAbsorption"),
  soilHumus: document.querySelector("#soilHumus"),
  soilBaseSaturation: document.querySelector("#soilBaseSaturation"),
  soilCalciumMagnesiumRatio: document.querySelector("#soilCalciumMagnesiumRatio"),
  soilMagnesiumPotassiumRatio: document.querySelector("#soilMagnesiumPotassiumRatio"),
  soilMemo: document.querySelector("#soilMemo"),
  chart: document.querySelector("#componentChart"),
  visualPanel: document.querySelector(".visual-panel"),
  chartEmpty: document.querySelector("#chartEmpty"),
  selectedSummary: document.querySelector("#selectedSummary"),
  guaranteeSummary: document.querySelector("#guaranteeSummary"),
  dataView: document.querySelector("#dataView"),
  sortMode: document.querySelector("#sortMode"),
  records: document.querySelector("#records"),
  recordsOpenButton: document.querySelector("#recordsOpenButton"),
  backToEntry: document.querySelector("#backToEntry"),
};

setDefaultDates();
render();

if (
  "serviceWorker" in navigator &&
  (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

let swipeStartX = 0;
let swipeStartY = 0;

el.tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

formKeys.forEach((key) => {
  el[key].addEventListener("input", renderGuaranteeSummary);
});

el.entryPanel.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  swipeStartX = touch.clientX;
  swipeStartY = touch.clientY;
}, { passive: true });

el.entryPanel.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - swipeStartX;
  const deltaY = touch.clientY - swipeStartY;
  if (Math.abs(deltaX) < 64 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
  switchTab(deltaX < 0 ? "soil" : "fertilizer", deltaX < 0 ? "right" : "left");
}, { passive: true });

el.packagePhoto.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  pendingPhoto = await resizeImage(file, 900);
  pendingOcrImage = await prepareOcrImage(file);
  updatePhotoPreview(pendingPhoto);
  runPhotoAutoRead(pendingOcrImage);
});

el.fertilizerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const existing = state.fertilizers.find((item) => item.id === el.fertilizerId.value);
  const record = {
    id: existing?.id ?? crypto.randomUUID(),
    name: el.fertilizerName.value.trim(),
    type: el.fertilizerType.value,
    manufacturer: el.manufacturer.value.trim(),
    registeredAt: el.registeredAt.value,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    photo: pendingPhoto || existing?.photo || "",
    traits: {
      effect: el.fertilizerEffect.value,
      kind: el.fertilizerTraitKind.value,
      nitrogenKind: el.nitrogenKind.value,
      phosphorusKind: el.phosphorusKind.value,
      potassiumKind: el.potassiumKind.value,
    },
    forms: readFertilizerForms(),
    memo: el.fertilizerMemo.value.trim(),
  };

  state.fertilizers = upsert(state.fertilizers, record);
  selectedFertilizerId = record.id;
  saveState();
  resetFertilizerForm();
  render();
  switchView("recordsView");
});

el.soilForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const existing = state.soils.find((item) => item.id === el.soilId.value);
  const record = {
    id: existing?.id ?? crypto.randomUUID(),
    place: el.soilPlace.value.trim(),
    date: el.soilDate.value,
    texture: el.soilTexture.value,
    crop: el.soilCrop.value.trim(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    components: readSoilComponents(),
    elements: readSoilElements(),
    memo: el.soilMemo.value.trim(),
  };

  state.soils = upsert(state.soils, record);
  saveState();
  resetSoilForm();
  render();
  switchView("recordsView");
});

document.querySelector("#resetFertilizer").addEventListener("click", resetFertilizerForm);
document.querySelector("#resetSoil").addEventListener("click", resetSoilForm);
el.retryOcr.addEventListener("click", () => {
  if (!pendingOcrImage && !pendingPhoto) {
    setOcrState("写真を選ぶと、成分表の文字を自動で読み取ります。");
    return;
  }
  runPhotoAutoRead(pendingOcrImage || pendingPhoto);
});
el.dataView.addEventListener("change", renderRecords);
el.sortMode.addEventListener("change", renderRecords);
el.recordsOpenButton.addEventListener("click", () => {
  const recordsVisible = document.querySelector("#recordsView").classList.contains("is-active");
  switchView(recordsVisible ? "entryView" : "recordsView");
});
el.backToEntry.addEventListener("click", () => switchView("entryView"));
window.addEventListener("resize", () => drawChart({ animate: false }));
el.visualPanel.addEventListener("toggle", () => {
  if (el.visualPanel.open) requestAnimationFrame(() => drawChart({ animate: true }));
});

function render() {
  drawChart({ animate: true });
  renderSummary();
  renderGuaranteeSummary();
  renderSuggestionOptions();
  renderRecords();
}

function renderRecords() {
  el.records.innerHTML = "";
  const view = el.dataView.value;
  const list = sortRecords(view === "fertilizers" ? state.fertilizers : state.soils, view);

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = view === "fertilizers" ? "肥料データはまだありません。" : "土壌データはまだありません。";
    el.records.append(empty);
    return;
  }

  list.forEach((record) => {
    if (view === "fertilizers") {
      el.records.append(createFertilizerCard(record));
    } else {
      el.records.append(createSoilCard(record));
    }
  });
}

function renderSuggestionOptions() {
  fillDatalist(el.fertilizerNameOptions, state.fertilizers.map((record) => record.name));
  fillDatalist(el.manufacturerOptions, state.fertilizers.map((record) => record.manufacturer));
  fillDatalist(el.soilPlaceOptions, state.soils.map((record) => record.place));
  fillDatalist(el.soilCropOptions, state.soils.map((record) => record.crop));
}

function fillDatalist(datalist, values) {
  datalist.innerHTML = "";
  uniqueValues(values).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    datalist.append(option);
  });
}

function uniqueValues(values) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));
}

// 多量要素・微量要素（土壌タブへ移行）。記録上は record.elements に保存する。
function readSoilElements() {
  return componentKeys.reduce((elements, key) => {
    elements[key] = numberValue(el[key]);
    return elements;
  }, {});
}

function readFertilizerForms() {
  return formKeys.reduce((forms, key) => {
    forms[key] = numberValue(el[key]);
    return forms;
  }, {});
}

function readSoilComponents() {
  return {
    ph: numberValue(el.soilPh),
    ec: numberValue(el.soilEc),
    nitrateNitrogen: numberValue(el.soilNitrateNitrogen),
    ammoniumNitrogen: numberValue(el.soilAmmoniumNitrogen),
    availablePhosphorus: numberValue(el.soilAvailablePhosphorus),
    calcium: numberValue(el.soilCalcium),
    magnesium: numberValue(el.soilMagnesium),
    potassium: numberValue(el.soilPotassium),
    cec: numberValue(el.soilCec),
    phosphateAbsorption: numberValue(el.soilPhosphateAbsorption),
    humus: numberValue(el.soilHumus),
    baseSaturation: numberValue(el.soilBaseSaturation),
    calciumMagnesiumRatio: numberValue(el.soilCalciumMagnesiumRatio),
    magnesiumPotassiumRatio: numberValue(el.soilMagnesiumPotassiumRatio),
  };
}

// 形態別内訳（内成分）から主成分の全量（外成分）を肥料表示ルールに沿って推定する。
function deriveGuaranteeTotals(forms) {
  const n = (forms.ammoniacalNitrogen || 0) + (forms.nitrateNitrogen || 0);
  const totals = {
    nitrogen: n,
    phosphorus: firstFinite(forms.solublePhosphate, forms.waterSolublePhosphate, forms.citrateSolublePhosphate) || 0,
    potassium: firstFinite(forms.waterSolublePotassium, forms.citrateSolublePotassium) || 0,
    magnesium: firstFinite(forms.solubleMagnesium, forms.citrateSolubleMagnesium, forms.waterSolubleMagnesium) || 0,
    boron: firstFinite(forms.citrateSolubleBoron, forms.waterSolubleBoron) || 0,
  };
  return totals;
}

function renderGuaranteeSummary() {
  const forms = readFertilizerForms();
  const totals = deriveGuaranteeTotals(forms);
  const guaranteeLines = Object.keys(guaranteeTotalLabels)
    .filter((key) => totals[key])
    .map((key) => `${guaranteeTotalLabels[key]} ${formatPercent(totals[key])}`);
  const formLines = formKeys
    .filter((key) => forms[key])
    .map((key) => `${formLabels[key]} ${formatPercent(forms[key])}`);

  el.guaranteeSummary.innerHTML = "";
  if (!guaranteeLines.length && !formLines.length) {
    el.guaranteeSummary.textContent = "保証形態別の成分を入力すると、法規表記に近い保証成分量の概要を表示します。";
    return;
  }

  if (guaranteeLines.length) {
    const main = document.createElement("div");
    main.className = "summary-line";
    main.textContent = `保証成分量（推定）: ${guaranteeLines.join("、")}`;
    el.guaranteeSummary.append(main);
  }

  if (formLines.length) {
    const breakdown = document.createElement("div");
    breakdown.className = "summary-line";
    breakdown.textContent = `保証形態別の内訳: ${formLines.join("、")}`;
    el.guaranteeSummary.append(breakdown);
  }

  const note = document.createElement("div");
  note.className = "summary-note";
  note.textContent = "保証成分量は肥料表示の形態別保証成分（内成分）から推定した目安です。実際の保証票の全量表記と照合してください。";
  el.guaranteeSummary.append(note);
}

function createFertilizerCard(record) {
  const card = document.querySelector("#fertilizerCardTemplate").content.firstElementChild.cloneNode(true);
  card.innerHTML = `
    <details class="record-toggle">
      <summary class="record-summary">
        ${record.photo ? `<img class="record-thumb" alt="" src="${record.photo}">` : `<div class="record-thumb"></div>`}
        <span class="record-row-main">
          <span class="record-title">${escapeHtml(record.name)}</span>
          <span class="record-sub">${escapeHtml(record.type)} / ${formatDate(record.registeredAt)}</span>
        </span>
        <span class="record-chevron" aria-hidden="true"></span>
      </summary>
      <div class="record-detail">
        <div class="record-read">
          ${record.photo ? `<img class="record-photo" alt="" src="${record.photo}">` : ""}
          <div class="meta-line"><span>${escapeHtml(record.manufacturer || "メーカー未記録")}</span></div>
          <div class="meta-line"><span>${escapeHtml(record.traits?.effect || "肥効未選択")}</span><span>${escapeHtml(record.traits?.kind || "種類未選択")}</span></div>
          <div class="meta-line"><span>N ${escapeHtml(record.traits?.nitrogenKind || "未選択")}</span><span>P ${escapeHtml(record.traits?.phosphorusKind || "未選択")}</span><span>K ${escapeHtml(record.traits?.potassiumKind || "未選択")}</span></div>
          ${renderMiniBars(formKeys.filter((key) => record.forms?.[key]).map((key) => ({ label: formLabels[key], value: record.forms[key] })))}
          ${record.memo ? `<p class="record-memo">${escapeHtml(record.memo)}</p>` : ""}
          <div class="card-actions">
            <button class="small-button edit" type="button">編集</button>
            <button class="small-button danger delete" type="button">削除</button>
          </div>
        </div>
        ${renderFertilizerInlineForm(record)}
      </div>
    </details>
  `;
  card.querySelector(".record-toggle").addEventListener("toggle", (event) => {
    const toggle = event.currentTarget;
    if (!toggle.open) {
      toggle.classList.remove("is-bar-animating");
      return;
    }
    restartMiniBarAnimation(toggle);
    selectedFertilizerId = record.id;
    drawChart({ animate: true });
    renderSummary();
  });
  card.querySelector(".edit").addEventListener("click", () => showInlineEdit(card));
  card.querySelector(".cancel-inline-edit").addEventListener("click", () => hideInlineEdit(card));
  card.querySelector(".record-edit-form").addEventListener("submit", (event) => saveInlineFertilizer(event, record));
  card.querySelector(".delete").addEventListener("click", () => deleteRecord("fertilizers", record.id));
  return card;
}

function createSoilCard(record) {
  const card = document.querySelector("#soilCardTemplate").content.firstElementChild.cloneNode(true);
  card.innerHTML = `
    <details class="record-toggle">
      <summary class="record-summary">
        <div class="record-thumb soil-thumb"></div>
        <span class="record-row-main">
          <span class="record-title">${escapeHtml(record.place)}</span>
          <span class="record-sub">${escapeHtml(record.texture)} / ${formatDate(record.date)}</span>
        </span>
        <span class="record-chevron" aria-hidden="true"></span>
      </summary>
      <div class="record-detail">
        <div class="record-read">
          <div class="meta-line"><span>${escapeHtml(record.crop || "作物未記録")}</span></div>
          ${renderMiniBars([
            ...Object.entries(soilLabels).map(([key, label]) => ({ label, value: soilComponentValue(record, key) })),
            ...componentKeys.filter((key) => record.elements?.[key]).map((key) => ({ label: componentLabels[key], value: record.elements[key] })),
          ])}
          ${record.memo ? `<p class="record-memo">${escapeHtml(record.memo)}</p>` : ""}
          <div class="card-actions">
            <button class="small-button edit" type="button">編集</button>
            <button class="small-button danger delete" type="button">削除</button>
          </div>
        </div>
        ${renderSoilInlineForm(record)}
      </div>
    </details>
  `;
  card.querySelector(".record-toggle").addEventListener("toggle", (event) => {
    const toggle = event.currentTarget;
    if (!toggle.open) {
      toggle.classList.remove("is-bar-animating");
      return;
    }
    restartMiniBarAnimation(toggle);
  });
  card.querySelector(".edit").addEventListener("click", () => showInlineEdit(card));
  card.querySelector(".cancel-inline-edit").addEventListener("click", () => hideInlineEdit(card));
  card.querySelector(".record-edit-form").addEventListener("submit", (event) => saveInlineSoil(event, record));
  card.querySelector(".delete").addEventListener("click", () => deleteRecord("soils", record.id));
  return card;
}

function renderFertilizerInlineForm(record) {
  return `
    <form class="record-edit-form" hidden>
      <div class="inline-edit-grid">
        ${editInput("name", "名前", record.name, "text", true)}
        ${editSelect("type", "種類", fertilizerTypeOptions, record.type)}
        ${editInput("manufacturer", "メーカー", record.manufacturer)}
        ${editInput("registeredAt", "登録日", record.registeredAt, "date", true)}
        ${editSelect("effect", "肥効", fertilizerEffectOptions, record.traits?.effect || "未選択")}
        ${editInput("kind", "種類詳細", record.traits?.kind || "")}
        ${editSelect("nitrogenKind", "N", nitrogenKindOptions, record.traits?.nitrogenKind || "未選択")}
        ${editSelect("phosphorusKind", "P", phosphorusKindOptions, record.traits?.phosphorusKind || "未選択")}
        ${editSelect("potassiumKind", "K", potassiumKindOptions, record.traits?.potassiumKind || "未選択")}
        ${formKeys.map((key) => editInput(`component-${key}`, formLabels[key], record.forms?.[key] ?? 0, "number")).join("")}
        <label class="inline-field span-all">メモ<textarea name="memo" rows="2">${escapeHtml(record.memo || "")}</textarea></label>
      </div>
      <div class="card-actions">
        <button class="secondary cancel-inline-edit" type="button">戻す</button>
        <button class="primary" type="submit">保存</button>
      </div>
    </form>
  `;
}

function renderSoilInlineForm(record) {
  return `
    <form class="record-edit-form" hidden>
      <div class="inline-edit-grid">
        ${editInput("place", "場所", record.place, "text", true)}
        ${editInput("date", "記録日", record.date, "date", true)}
        ${editSelect("texture", "土性", soilTextureOptions, record.texture)}
        ${editInput("crop", "作物", record.crop)}
        ${Object.entries(soilLabels).map(([key, label]) => editInput(`component-${key}`, label, soilComponentValue(record, key), "number")).join("")}
        ${componentKeys.map((key) => editInput(`element-${key}`, componentLabels[key], record.elements?.[key] ?? 0, "number")).join("")}
        <label class="inline-field span-all">メモ<textarea name="memo" rows="2">${escapeHtml(record.memo || "")}</textarea></label>
      </div>
      <div class="card-actions">
        <button class="secondary cancel-inline-edit" type="button">戻す</button>
        <button class="primary" type="submit">保存</button>
      </div>
    </form>
  `;
}

function soilComponentValue(record, key) {
  const components = record.components || {};
  if (components[key] !== undefined) return components[key];
  const legacyMap = {
    nitrateNitrogen: "n",
    availablePhosphorus: "p",
    potassium: "k",
  };
  return components[legacyMap[key]] ?? 0;
}

function showInlineEdit(card) {
  card.classList.add("is-editing");
  card.querySelector(".record-read").hidden = true;
  card.querySelector(".record-edit-form").hidden = false;
}

function hideInlineEdit(card) {
  card.classList.remove("is-editing");
  card.querySelector(".record-edit-form").hidden = true;
  card.querySelector(".record-read").hidden = false;
}

function saveInlineFertilizer(event, record) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const updated = {
    ...record,
    name: String(data.get("name") || "").trim(),
    type: String(data.get("type") || ""),
    manufacturer: String(data.get("manufacturer") || "").trim(),
    registeredAt: String(data.get("registeredAt") || ""),
    updatedAt: new Date().toISOString(),
    traits: {
      ...record.traits,
      effect: String(data.get("effect") || "未選択"),
      kind: String(data.get("kind") || "").trim() || "未選択",
      nitrogenKind: String(data.get("nitrogenKind") || "未選択"),
      phosphorusKind: String(data.get("phosphorusKind") || "未選択"),
      potassiumKind: String(data.get("potassiumKind") || "未選択"),
    },
    forms: readComponentsFromForm(data, formKeys),
    memo: String(data.get("memo") || "").trim(),
  };
  state.fertilizers = upsert(state.fertilizers, updated);
  selectedFertilizerId = updated.id;
  saveState();
  render();
}

function saveInlineSoil(event, record) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const updated = {
    ...record,
    place: String(data.get("place") || "").trim(),
    date: String(data.get("date") || ""),
    texture: String(data.get("texture") || ""),
    crop: String(data.get("crop") || "").trim(),
    updatedAt: new Date().toISOString(),
    components: readComponentsFromForm(data, Object.keys(soilLabels)),
    elements: readComponentsFromForm(data, componentKeys, "element-"),
    memo: String(data.get("memo") || "").trim(),
  };
  state.soils = upsert(state.soils, updated);
  saveState();
  render();
}

function readComponentsFromForm(data, keys, prefix = "component-") {
  return keys.reduce((components, key) => {
    components[key] = Number.parseFloat(data.get(`${prefix}${key}`)) || 0;
    return components;
  }, {});
}

function editInput(name, label, value, type = "text", required = false) {
  const step = type === "number" ? ' step="0.1" min="0"' : "";
  return `<label class="inline-field">${escapeHtml(label)}<input name="${escapeHtml(name)}" type="${type}" value="${escapeHtml(value ?? "")}"${required ? " required" : ""}${step}></label>`;
}

function editSelect(name, label, options, selected) {
  return `
    <label class="inline-field">${escapeHtml(label)}
      <select name="${escapeHtml(name)}">
        ${options.map((option) => `<option${option === selected ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderMiniBars(items) {
  const max = Math.max(1, ...items.map((item) => Number(item.value) || 0));
  return `
    <div class="mini-bars">
      ${items.map((item) => {
        const value = Number(item.value) || 0;
        const width = max ? Math.round((value / max) * 100) : 0;
        return `
          <div class="mini-bar-row">
            <span class="mini-bar-label">${escapeHtml(item.label)}</span>
            <span class="mini-bar-track"><span class="mini-bar-fill" style="width: ${width}%"></span></span>
            <span class="mini-bar-value">${escapeHtml(value)}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function restartMiniBarAnimation(toggle) {
  toggle.classList.remove("is-bar-animating");
  void toggle.offsetWidth;
  toggle.classList.add("is-bar-animating");
}

function drawChart(options = {}) {
  const ctx = el.chart.getContext("2d");
  const rect = el.chart.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  el.chart.width = Math.max(640, Math.floor(rect.width * scale));
  el.chart.height = Math.max(360, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const width = el.chart.width / scale;
  const height = el.chart.height / scale;
  ctx.clearRect(0, 0, width, height);

  const selected = state.fertilizers.find((item) => item.id === selectedFertilizerId) || state.fertilizers[0];
  const forms = selected?.forms || {};
  const items = formKeys
    .filter((key) => forms[key])
    .map((key) => ({ label: formLabels[key], value: forms[key] }));
  el.chartEmpty.hidden = Boolean(selected) && items.length > 0;
  if (!selected || !items.length) return;

  const max = Math.max(10, ...items.map((item) => item.value));
  const shouldAnimate = options.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!shouldAnimate) {
    drawBars(ctx, width, height, items, max, 1);
    return;
  }

  const duration = 520;
  const startedAt = performance.now();
  cancelAnimationFrame(chartAnimationFrame);

  const tick = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, width, height);
    drawBars(ctx, width, height, items, max, eased);
    if (progress < 1) chartAnimationFrame = requestAnimationFrame(tick);
  };
  chartAnimationFrame = requestAnimationFrame(tick);
}

function drawBars(ctx, width, height, items, max, progress = 1) {
  const pad = 44;
  const graphHeight = height - pad * 2;
  const barWidth = (width - pad * 2) / items.length - 18;
  ctx.strokeStyle = "#d9ded2";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad + (graphHeight / 4) * i;
    line(ctx, pad, y, width - pad, y);
  }
  items.forEach((item, index) => {
    const value = item.value;
    const x = pad + index * (barWidth + 18) + 10;
    const h = (value / max) * graphHeight * progress;
    ctx.fillStyle = colors[index % colors.length];
    roundRect(ctx, x, height - pad - h, barWidth, h, 8);
    ctx.fill();
    ctx.fillStyle = "#20251f";
    ctx.font = "600 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x + barWidth / 2, height - 18);
    ctx.fillText(value, x + barWidth / 2, height - pad - h - 8);
  });
}

function renderSummary() {
  const selected = state.fertilizers.find((item) => item.id === selectedFertilizerId) || state.fertilizers[0];
  el.selectedSummary.innerHTML = "";
  if (!selected) return;
  el.selectedSummary.textContent = `登録日 ${formatDate(selected.registeredAt)}`;
}

function editFertilizer(record) {
  switchView("entryView");
  switchTab("fertilizer");
  el.fertilizerId.value = record.id;
  el.fertilizerName.value = record.name;
  el.fertilizerType.value = record.type;
  el.manufacturer.value = record.manufacturer;
  el.registeredAt.value = record.registeredAt;
  el.fertilizerEffect.value = record.traits?.effect || "未選択";
  el.fertilizerTraitKind.value = record.traits?.kind || "未選択";
  el.nitrogenKind.value = record.traits?.nitrogenKind || "未選択";
  el.phosphorusKind.value = record.traits?.phosphorusKind || "未選択";
  el.potassiumKind.value = record.traits?.potassiumKind || "未選択";
  formKeys.forEach((key) => {
    el[key].value = record.forms?.[key] ?? 0;
  });
  renderGuaranteeSummary();
  el.fertilizerMemo.value = record.memo;
  pendingPhoto = record.photo;
  pendingOcrImage = record.photo;
  updatePhotoPreview(record.photo);
  setOcrState(record.photo ? "保存済みの写真です。必要なら再読み取りできます。" : "写真を選ぶと、成分表の文字を自動で読み取ります。");
  el.fertilizerName.focus();
}

function editSoil(record) {
  switchView("entryView");
  switchTab("soil");
  el.soilId.value = record.id;
  el.soilPlace.value = record.place;
  el.soilDate.value = record.date;
  el.soilTexture.value = record.texture;
  el.soilCrop.value = record.crop;
  el.soilPh.value = soilComponentValue(record, "ph");
  el.soilEc.value = soilComponentValue(record, "ec");
  el.soilNitrateNitrogen.value = soilComponentValue(record, "nitrateNitrogen");
  el.soilAmmoniumNitrogen.value = soilComponentValue(record, "ammoniumNitrogen");
  el.soilAvailablePhosphorus.value = soilComponentValue(record, "availablePhosphorus");
  el.soilCalcium.value = soilComponentValue(record, "calcium");
  el.soilMagnesium.value = soilComponentValue(record, "magnesium");
  el.soilPotassium.value = soilComponentValue(record, "potassium");
  el.soilCec.value = soilComponentValue(record, "cec");
  el.soilPhosphateAbsorption.value = soilComponentValue(record, "phosphateAbsorption");
  el.soilHumus.value = soilComponentValue(record, "humus");
  el.soilBaseSaturation.value = soilComponentValue(record, "baseSaturation");
  el.soilCalciumMagnesiumRatio.value = soilComponentValue(record, "calciumMagnesiumRatio");
  el.soilMagnesiumPotassiumRatio.value = soilComponentValue(record, "magnesiumPotassiumRatio");
  componentKeys.forEach((key) => {
    el[key].value = record.elements?.[key] ?? 0;
  });
  el.soilMemo.value = record.memo;
  el.soilPlace.focus();
}

function deleteRecord(collection, id) {
  if (!confirm("この記録を削除しますか？")) return;
  state[collection] = state[collection].filter((record) => record.id !== id);
  if (id === selectedFertilizerId) selectedFertilizerId = state.fertilizers[0]?.id ?? null;
  saveState();
  render();
}

function sortRecords(records, view) {
  const sorted = [...records];
  const mode = el.sortMode.value;
  sorted.sort((a, b) => {
    if (mode === "nameAsc") return getName(a, view).localeCompare(getName(b, view), "ja");
    if (mode === "typeAsc") return getType(a, view).localeCompare(getType(b, view), "ja");
    if (mode === "dateDesc") return getDate(b, view).localeCompare(getDate(a, view));
    return b.createdAt.localeCompare(a.createdAt);
  });
  return sorted;
}

function resetFertilizerForm() {
  el.fertilizerForm.reset();
  el.fertilizerId.value = "";
  pendingPhoto = "";
  pendingOcrImage = "";
  setDefaultDates();
  updatePhotoPreview("");
  setOcrState("写真を選ぶと、成分表の文字を自動で読み取ります。");
  el.fertilizerEffect.value = "未選択";
  el.fertilizerTraitKind.value = "未選択";
  el.nitrogenKind.value = "未選択";
  el.phosphorusKind.value = "未選択";
  el.potassiumKind.value = "未選択";
  formKeys.forEach((key) => {
    el[key].value = 0;
  });
  renderGuaranteeSummary();
}

function resetSoilForm() {
  el.soilForm.reset();
  el.soilId.value = "";
  setDefaultDates();
  el.soilPh.value = 6.5;
  Object.keys(soilLabels).forEach((key) => {
    if (key === "ph") return;
    const fieldName = `soil${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (el[fieldName]) el[fieldName].value = 0;
  });
  componentKeys.forEach((key) => {
    el[key].value = 0;
  });
}

function switchTab(name, direction = name === "soil" ? "right" : "left") {
  const current = el.fertilizerForm.classList.contains("active-form") ? "fertilizer" : "soil";
  if (current === name) return;
  el.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === name));
  [el.fertilizerForm, el.soilForm].forEach((form) => {
    form.classList.remove("active-form", "slide-from-left", "slide-from-right");
  });
  const activeForm = name === "fertilizer" ? el.fertilizerForm : el.soilForm;
  activeForm.classList.add(direction === "right" ? "slide-from-right" : "slide-from-left", "active-form");
}

function switchView(id) {
  el.viewPanes.forEach((pane) => pane.classList.toggle("is-active", pane.id === id));
  el.recordsOpenButton.textContent = id === "recordsView" ? "入力へ戻る" : "登録データ";
  el.recordsOpenButton.setAttribute("aria-label", el.recordsOpenButton.textContent);
  if (id === "entryView") {
    requestAnimationFrame(() => drawChart({ animate: true }));
  }
}

function setDefaultDates() {
  const today = new Date().toISOString().slice(0, 10);
  if (!el.registeredAt.value) el.registeredAt.value = today;
  if (!el.soilDate.value) el.soilDate.value = today;
}

function updatePhotoPreview(src) {
  el.photoPreview.innerHTML = src ? `<img src="${src}" alt="パッケージ写真プレビュー">` : "<span>写真プレビュー</span>";
}

async function runPhotoAutoRead(src) {
  setOcrState("写真を読み取っています。初回は少し時間がかかります。", "reading");
  try {
    const text = await readTextFromImage(src);
    applyParsedTextFields(text);
    const result = parseFertilizerComponents(text);
    const found = applyParsedComponents(result);
    if (found.length) {
      setOcrState(`読み取った内容を下の項目へ反映しました。保存前に数値を確認してください。`, "success", found);
      appendOcrMemo(text);
      return;
    }
    setOcrState("文字は読み取りましたが、成分値を特定できませんでした。成分表が正面に写った写真で再試行してください。", "warning");
  } catch (error) {
    setOcrState("この環境では自動読み取りを実行できませんでした。写真は保存できますが、成分は手入力してください。", "warning");
    console.warn(error);
  }
}

async function readTextFromImage(src) {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);
  let bestText = "";
  let bestScore = -1;

  for (const source of sources) {
    const text = await readTextFromSingleImage(source);
    const score = scoreOcrText(text);
    if (score > bestScore) {
      bestText = text;
      bestScore = score;
    }
  }

  return bestText;
}

async function readTextFromSingleImage(src) {
  if ("TextDetector" in window) {
    const blob = await dataUrlToBlob(src);
    const bitmap = await createImageBitmap(blob);
    const detector = new TextDetector();
    const lines = await detector.detect(bitmap);
    const text = lines.map((line) => line.rawValue).join("\n");
    if (text.trim() && scoreOcrText(text) >= 8) return text;
  }

  await loadTesseract();
  // PSM 11: sparse text — best for scattered text on packaging labels
  const result = await Tesseract.recognize(src, "jpn+eng", {
    preserve_interword_spaces: "1",
    tessedit_pageseg_mode: "11",
  });
  const text11 = result.data.text || "";
  if (scoreOcrText(text11) >= 20) return text11;

  // Fallback: PSM 6 for structured/tabular layouts
  const result6 = await Tesseract.recognize(src, "jpn+eng", {
    preserve_interword_spaces: "1",
    tessedit_pageseg_mode: "6",
  });
  const text6 = result6.data.text || "";
  return scoreOcrText(text11) >= scoreOcrText(text6) ? text11 : text6;
}

function scoreOcrText(text) {
  const normalized = normalizeOcrText(text || "");
  const componentHits = [
    "nitrogen", "phosphorus", "potassium", "calcium", "magnesium",
    "carbon", "sulfur", "iron", "zinc", "copper", "boron",
    "窒素", "リン", "りん", "カリ", "加里", "石灰", "苦土", "硫黄", "鉄", "亜鉛", "銅", "ホウ素",
    "全量", "可溶性", "水溶性", "く溶性", "アンモニア", "硝酸", "保証成分",
    "遯堤ｴ", "繝ｪ繝ｳ", "繧ｫ繝ｪ", "遏ｳ轣ｰ", "闍ｦ蝨",
    "n", "p2o5", "k2o", "npk",
  ].reduce((score, word) => score + (normalized.includes(word.toLowerCase()) ? 5 : 0), 0);
  const numberHits = (normalized.match(/\b[0-9]{1,2}(?:\.[0-9]+)?\s*%?/g) || []).length;
  const ratioHits = (normalized.match(/[0-9]+(?:\.[0-9]+)?\s*[-:\/]\s*[0-9]+(?:\.[0-9]+)?\s*[-:\/]\s*[0-9]+(?:\.[0-9]+)?/g) || []).length;
  return componentHits + Math.min(numberHits, 24) + ratioHits * 12 + Math.min(normalized.length / 80, 8);
}

function loadTesseract() {
  if (window.Tesseract) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

async function dataUrlToBlob(src) {
  const response = await fetch(src);
  return response.blob();
}

function parseFertilizerComponents(text) {
  const normalized = normalizeOcrText(text);
  const result = {
    carbon: findComponentValue(normalized, ["炭素", "carbon", " c "]),
    hydrogen: findComponentValue(normalized, ["水素", "hydrogen", " h "]),
    oxygen: findComponentValue(normalized, ["酸素", "oxygen", " o "]),
    nitrogen: findComponentValue(normalized, ["窒素全量", "全窒素", "有機態窒素", "硝酸態窒素", "アンモニア態窒素", "窒素", "チッソ", "ちっそ", "nitrogen", " n ", "tn"]),
    phosphorus: findComponentValue(normalized, ["りん酸全量", "可溶性りん酸", "水溶性りん酸", "く溶性りん酸", "リン酸", "りん酸", "燐酸", "りん", "燐", "phosphorus", "phosphate", "p2o5", "p205", " p "]),
    potassium: findComponentValue(normalized, ["加里全量", "水溶性加里", "く溶性加里", "カリ", "加里", "potash", "potassium", "k2o", "k20", " k "]),
    calcium: findComponentValue(normalized, ["可溶性石灰", "く溶性石灰", "水溶性石灰", "石灰全量", "石灰", "カルシウム", "calcium", "caco", " ca "]),
    magnesium: findComponentValue(normalized, ["可溶性苦土", "く溶性苦土", "水溶性苦土", "苦土", "マグネシウム", "magnesium", " mg "]),
    sulfur: findComponentValue(normalized, ["可溶性硫黄", "硫黄", "硫酸", "sulfur", "sulphur", " s "]),
    iron: findComponentValue(normalized, ["可溶性鉄", "水溶性鉄", "鉄", "iron", " fe "]),
    manganese: findComponentValue(normalized, ["可溶性マンガン", "水溶性マンガン", "マンガン", "manganese", " mn "]),
    zinc: findComponentValue(normalized, ["水溶性亜鉛", "亜鉛", "zinc", " zn "]),
    copper: findComponentValue(normalized, ["水溶性銅", "銅", "copper", " cu "]),
    boron: findComponentValue(normalized, ["水溶性ほう素", "く溶性ほう素", "ホウ素", "ほう素", "boron", " b "]),
    molybdenum: findComponentValue(normalized, ["水溶性モリブデン", "モリブデン", "molybdenum", " mo "]),
    chlorine: findComponentValue(normalized, ["塩素", "chlorine", " chloride", " cl "]),
    nickel: findComponentValue(normalized, ["ニッケル", "nickel", " ni "]),
    // 保証形態別内訳（内成分）— 肥料表示ルールで保証票に記載される形態
    ammoniacalNitrogen: findComponentValue(normalized, ["内アンモニア性窒素", "アンモニア性窒素", "アンモニア態窒素", "あんもにあ性窒素", "ammoniacal"]),
    nitrateNitrogen: findComponentValue(normalized, ["内硝酸性窒素", "硝酸性窒素", "硝酸態窒素", "nitrate"]),
    solublePhosphate: findComponentValue(normalized, ["内可溶性りん酸", "可溶性りん酸", "可溶性燐酸", "可溶性リン酸"]),
    waterSolublePhosphate: findComponentValue(normalized, ["内水溶性りん酸", "水溶性りん酸", "水溶性燐酸", "水溶性リン酸"]),
    citrateSolublePhosphate: findComponentValue(normalized, ["内く溶性りん酸", "く溶性りん酸", "枸溶性りん酸", "ク溶性りん酸"]),
    waterSolublePotassium: findComponentValue(normalized, ["内水溶性加里", "水溶性加里", "水溶性カリ"]),
    citrateSolublePotassium: findComponentValue(normalized, ["内く溶性加里", "く溶性加里", "枸溶性加里", "ク溶性加里"]),
    solubleMagnesium: findComponentValue(normalized, ["内可溶性苦土", "可溶性苦土"]),
    citrateSolubleMagnesium: findComponentValue(normalized, ["内く溶性苦土", "く溶性苦土", "ク溶性苦土"]),
    waterSolubleMagnesium: findComponentValue(normalized, ["内水溶性苦土", "水溶性苦土"]),
    citrateSolubleBoron: findComponentValue(normalized, ["く溶性ほう素", "ク溶性ほう素", "く溶性ホウ素"]),
    waterSolubleBoron: findComponentValue(normalized, ["水溶性ほう素", "水溶性ホウ素"]),
    alkali: findComponentValue(normalized, ["アルカリ分", "alkali"]),
  };
  const npk = findNpkRatio(normalized);
  if (npk) {
    if (!Number.isFinite(result.nitrogen)) result.nitrogen = npk[0];
    if (!Number.isFinite(result.phosphorus)) result.phosphorus = npk[1];
    if (!Number.isFinite(result.potassium)) result.potassium = npk[2];
  }
  deriveTotalsFromForms(result);
  return result;
}

// 肥料表示ルールに基づく補完: 「全量(外成分)」が読み取れない場合、
// 形態別保証成分(内成分)から主要成分の量を推定する。
function deriveTotalsFromForms(result) {
  if (!Number.isFinite(result.nitrogen)) {
    const an = Number.isFinite(result.ammoniacalNitrogen) ? result.ammoniacalNitrogen : 0;
    const nn = Number.isFinite(result.nitrateNitrogen) ? result.nitrateNitrogen : 0;
    if (an || nn) result.nitrogen = Math.round((an + nn) * 10) / 10;
  }
  if (!Number.isFinite(result.phosphorus)) {
    result.phosphorus = firstFinite(result.solublePhosphate, result.waterSolublePhosphate, result.citrateSolublePhosphate);
  }
  if (!Number.isFinite(result.potassium)) {
    result.potassium = firstFinite(result.waterSolublePotassium, result.citrateSolublePotassium);
  }
  if (!Number.isFinite(result.magnesium)) {
    result.magnesium = firstFinite(result.solubleMagnesium, result.citrateSolubleMagnesium, result.waterSolubleMagnesium);
  }
  if (!Number.isFinite(result.boron)) {
    result.boron = firstFinite(result.citrateSolubleBoron, result.waterSolubleBoron);
  }
}

function firstFinite(...values) {
  for (const value of values) {
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function normalizeOcrText(text) {
  return ` ${text
    .normalize("NFKC")
    .replace(/[₂]/g, "2")
    .replace(/[₅]/g, "5")
    .replace(/[％%]/g, " %")
    .replace(/[|｜]/g, " ")
    .replace(/[：]/g, ":")
    // Fix common OCR digit confusions (O↔0, l/I↔1, S↔5, Z↔2) near numbers
    .replace(/([0-9])[oO]([0-9.])/g, "$10$2")
    .replace(/([0-9.])[oO]([^a-z])/gi, "$10$2")
    .replace(/([^a-z])[oO]([0-9.])/gi, "$10$2")
    .replace(/([0-9])[lI]([^a-z])/g, "$11$2")
    .replace(/([^a-z])[lI]([0-9])/g, "$11$2")
    .replace(/\s+/g, " ")
    .toLowerCase()} `;
}

function findComponentValue(text, aliases) {
  for (const alias of aliases) {
    const trimmed = alias.trim();
    const escapedAlias = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escaped = /^[a-z]{1,2}$/i.test(trimmed) ? `(?:^|\\s)${escapedAlias}(?=\\s|[:=]|[^a-z0-9])` : escapedAlias;
    const patterns = [
      new RegExp(`${escaped}[^0-9]{0,32}([0-9]+(?:\\.[0-9]+)?)`, "i"),
      new RegExp(`([0-9]+(?:\\.[0-9]+)?)[^0-9]{0,18}${escaped}`, "i"),
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const value = Number.parseFloat(match[1]);
        if (value >= 0 && value <= 80) return value;
      }
    }
  }
  return null;
}

function findNpkRatio(text) {
  const match = text.match(/(?:npk|n\s*[-/]\s*p\s*[-/]\s*k|n\s*p\s*k|成分|保証成分)?[^0-9]{0,20}([0-9]+(?:\.[0-9]+)?)\s*[-:\/・]\s*([0-9]+(?:\.[0-9]+)?)\s*[-:\/・]\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (!match) return null;
  const values = match.slice(1, 4).map(Number.parseFloat);
  return values.every((value) => Number.isFinite(value) && value >= 0 && value <= 60) ? values : null;
}

function applyParsedTextFields(text) {
  const lines = text
    .normalize("NFKC")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const nameLine = lines.find((line) => {
    const lower = line.toLowerCase();
    return line.length >= 4 && !/[0-9]{1,2}\s*[-:\/・]\s*[0-9]{1,2}/.test(line) && !/(保証|成分|窒素|リン|りん|燐|カリ|加里|苦土|石灰|p2o5|k2o|npk)/i.test(lower);
  });
  if (nameLine && !el.fertilizerName.value.trim()) {
    el.fertilizerName.value = nameLine.slice(0, 40);
  }

  const normalized = normalizeOcrText(text);
  if (/有機|ぼかし|油かす|骨粉|魚粉|堆肥/.test(normalized)) el.fertilizerType.value = "有機肥料";
  if (/液体|液肥|liquid/.test(normalized)) el.fertilizerType.value = "液体肥料";
  if (/化成|高度化成|配合/.test(normalized)) el.fertilizerType.value = "化成肥料";
  if (/堆肥|改良材|腐葉土/.test(normalized)) el.fertilizerType.value = "堆肥・改良材";
}

function applyParsedComponents(result) {
  const found = [];
  formKeys.forEach((key) => {
    const value = result[key];
    if (Number.isFinite(value)) {
      el[key].value = value;
      found.push(`${formLabels[key]} ${value}`);
    }
  });
  renderGuaranteeSummary();
  return found;
}

function setOcrState(message, status = "idle", found = []) {
  el.ocrPanel.classList.toggle("is-reading", status === "reading");
  el.ocrPanel.classList.toggle("is-success", status === "success");
  el.ocrPanel.classList.toggle("is-warning", status === "warning");
  el.ocrStatus.textContent = message;
  el.ocrResults.innerHTML = "";
  found.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    el.ocrResults.append(chip);
  });
}

function appendOcrMemo(text) {
  const compact = text.normalize("NFKC").replace(/\s+/g, " ").trim().slice(0, 260);
  if (!compact) return;
  if (el.fertilizerMemo.value.includes("OCR:")) {
    el.fertilizerMemo.value = el.fertilizerMemo.value.replace(/OCR: .*/s, `OCR: ${compact}`);
    return;
  }
  const prefix = el.fertilizerMemo.value.trim() ? "\n" : "";
  el.fertilizerMemo.value += `${prefix}OCR: ${compact}`;
}

function prepareOcrImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const ratio = Math.min(3, Math.max(1.25, 2600 / Math.max(image.width, image.height)));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve([
          canvas.toDataURL("image/png"),
          createOcrVariant(canvas, "contrast"),
          createOcrVariant(canvas, "threshold"),
          createOcrVariant(canvas, "darkText"),
          createOcrVariant(canvas, "sharpen"),
          createOcrVariant(canvas, "invertThreshold"),
        ]);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function createOcrVariant(sourceCanvas, mode) {
  const canvas = document.createElement("canvas");
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(sourceCanvas, 0, 0);
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const threshold = mode === "darkText" ? 178 : 154;

  // Pre-compute grayscale once (needed by sharpen kernel for neighbour lookups)
  const gray = new Uint8ClampedArray(width * height);
  for (let i = 0; i < data.length; i += 4) {
    gray[i >> 2] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  }

  for (let idx = 0; idx < gray.length; idx += 1) {
    let value = gray[idx];
    if (mode === "contrast") {
      value = Math.max(0, Math.min(255, (gray[idx] - 128) * 1.8 + 128));
    } else if (mode === "threshold" || mode === "darkText") {
      value = gray[idx] > threshold ? 255 : 0;
    } else if (mode === "invertThreshold") {
      // For light text on a dark background: flip so text becomes dark on white
      value = gray[idx] > 128 ? 0 : 255;
    } else if (mode === "sharpen") {
      const x = idx % width;
      const y = (idx - x) / width;
      const up = y > 0 ? gray[idx - width] : gray[idx];
      const down = y < height - 1 ? gray[idx + width] : gray[idx];
      const left = x > 0 ? gray[idx - 1] : gray[idx];
      const right = x < width - 1 ? gray[idx + 1] : gray[idx];
      value = Math.max(0, Math.min(255, 5 * gray[idx] - up - down - left - right));
    }
    const pi = idx * 4;
    data[pi] = value;
    data[pi + 1] = value;
    data[pi + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function resizeImage(file, maxSize) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadState() {
  const fallback = { fertilizers: [], soils: [] };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function upsert(records, record) {
  const exists = records.some((item) => item.id === record.id);
  return exists ? records.map((item) => (item.id === record.id ? record : item)) : [record, ...records];
}

function numberValue(input) {
  return Number.parseFloat(input.value) || 0;
}

function getName(record, view) {
  return view === "fertilizers" ? record.name : record.place;
}

function getType(record, view) {
  return view === "fertilizers" ? record.type : record.texture;
}

function getDate(record, view) {
  return view === "fertilizers" ? record.registeredAt : record.date;
}

function formatDate(value) {
  if (!value) return "日付なし";
  return value.replaceAll("-", "/");
}

function formatPercent(value) {
  return `${Number(value).toFixed(1)}%`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function polygon(ctx, cx, cy, radius, sides) {
  ctx.beginPath();
  for (let index = 0; index < sides; index += 1) {
    const point = radialPoint(cx, cy, radius, index, sides);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
}

function radialPoint(cx, cy, radius, index, total) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}
