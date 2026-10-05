const isZh = document.documentElement.lang.startsWith("zh");

const englishParticipants = [
  { name: "Prestige Architecture Brand", role: "Recognizable market participant", initial: "Product + market relevance", final: "SPECIFICATION PLATFORM", detail: "Procurement path UNKNOWN · hold senior sales effort" },
  { name: "StudioForm Design Brand", role: "Design-led market participant", initial: "Product + design relevance", final: "POTENTIAL ENTRY PATH", detail: "External sourcing and demand still require verification" },
  { name: "Regional Contract Interiors Distributor", role: "Channel participant", initial: "Category + channel relevance", final: "POTENTIAL CHANNEL PATH", detail: "A repeatable route may exist · verify acquisition terms" },
  { name: "Demo participant 04", role: "Adjacent category participant", initial: "Product similarity", final: "COMPETITOR / BENCHMARK", detail: "Similarity does not establish external procurement" },
  { name: "Demo participant 05", role: "Specification ecosystem", initial: "Samples + specification relevance", final: "SPECIFICATION PLATFORM", detail: "Visibility is not purchasing evidence" },
  { name: "Demo participant 06", role: "Market participant", initial: "Application relevance", final: "UNKNOWN", detail: "Buyer role and supplier openness need evidence" },
];

const englishObjectives = {
  capacity: { title: "Regional Contract Interiors Distributor", label: "PRIMARY RESEARCH PATH · FILL CAPACITY", body: "This path is prioritized because it may offer a more repeatable channel rhythm aligned with the capacity objective. It is not a confirmed buyer.", question: "Can we evidence an external sourcing path, category depth, annual-volume range, and workable terms?" },
  premium: { title: "StudioForm Design Brand", label: "PRIMARY RESEARCH PATH · ENTER PREMIUM U.S. MARKET", body: "This path is prioritized because a narrow, design-led entry may create useful market learning for the premium objective. Demand and sourcing remain unproven.", question: "Do they source externally, and what specific product conversation would justify the next bounded step?" },
};

const zhParticipants = [
  { name: "知名建築品牌", role: "具市場辨識度的參與者", initial: "產品與市場看似相關", final: "規格／設計平台", detail: "採購路徑 UNKNOWN · 暫不投入資深業務資源" },
  { name: "StudioForm 設計品牌", role: "設計導向市場參與者", initial: "產品與設計脈絡相關", final: "可能的市場切入路徑", detail: "是否外部採購與需求規模仍待驗證" },
  { name: "區域商用室內通路商", role: "通路型市場參與者", initial: "品類與通路看似相關", final: "可能的通路路徑", detail: "可能存在可重複路徑 · 先確認採購與合作條件" },
  { name: "示範參與者 04", role: "相鄰品類參與者", initial: "產品相似", final: "競爭者／市場基準", detail: "產品相似不代表存在外部採購關係" },
  { name: "示範參與者 05", role: "規格生態系參與者", initial: "樣品與規格看似相關", final: "規格／設計平台", detail: "可見度不等於採購證據" },
  { name: "示範參與者 06", role: "市場參與者", initial: "應用情境相關", final: "UNKNOWN", detail: "買方角色與供應商開放度仍需證據" },
];

const zhObjectives = {
  capacity: { title: "區域商用室內通路商", label: "目前優先研究路徑 · 填補產能", body: "這條路徑較可能提供可重複比較的通路節奏，較符合填補產能的目標；但它仍不是已確認買方。", question: "是否存在外部採購路徑、足夠的品類深度、年量範圍與可行的商業條件？" },
  premium: { title: "StudioForm 設計品牌", label: "目前優先研究路徑 · 進入美國高端市場", body: "這條路徑更可能以窄而有設計脈絡的切入，換取高端市場學習；需求與外部採購仍未被證實。", question: "是否對外採購？什麼樣的產品對話才值得啟動下一個有邊界的步驟？" },
};

const participants = isZh ? zhParticipants : englishParticipants;
const objectives = isZh ? zhObjectives : englishObjectives;
const ui = isZh ? {
  relevant: "相關", hold: "暫緩", verify: "待驗證", firstPass: "第一輪看起來相關", reclassified: "先釐清角色，再談是否為買方。", next: "下一個問題：先有證據，再投入資源。", inspect: "檢查商業取得路徑", challenge: "挑戰採購路徑假設", reset: "回到第一輪觀察", stage1: "先把市場角色與買方假設分開。", stage2: "角色已較清楚。下一步檢查是否存在值得投入的商業路徑。", stage3: "名單依然相關；但 UNKNOWN 已經改變了下一步。", nextLabel: "下一個需要確認的問題",
} : {
  relevant: "RELEVANT", hold: "HOLD", verify: "VERIFY", firstPass: "Appears relevant on the first pass.", reclassified: "Role reclassified before buyer status is assumed.", next: "Next question: evidence before effort.", inspect: "Inspect the acquisition path", challenge: "Challenge the procurement path", reset: "Reset first pass", stage1: "First, separate market roles from buyer assumptions.", stage2: "Roles are clearer. Now test whether any path supports commercial effort.", stage3: "The list is still relevant; UNKNOWN now changes what happens next.", nextLabel: "Next question to verify",
};

const grid = document.querySelector("#participantGrid");
const revealButton = document.querySelector("#revealButton");
const actionHint = document.querySelector("#actionHint");
let revealed = false;
let revealStage = 0;

function renderParticipants() {
  grid.innerHTML = participants.map((person, index) => `
    <article class="participant ${revealStage >= 2 ? (index === 0 ? "is-hold" : index === 1 || index === 2 ? "is-reclassified" : "") : revealStage === 1 && index < 3 ? "is-reclassified" : ""}">
      <div class="participant-top"><span class="participant-role">0${index + 1} · ${revealStage >= 1 ? person.final : person.role}</span><span class="state">${revealStage >= 2 && index === 0 ? ui.hold : revealStage >= 1 && (index === 1 || index === 2) ? ui.verify : ui.relevant}</span></div>
      <h3>${person.name}</h3>
      <p>${revealStage >= 2 ? person.detail : revealStage === 1 ? ui.reclassified : person.initial}</p>
      <p class="reveal-detail">${revealStage >= 2 ? ui.next : ui.firstPass}</p>
    </article>`).join("");
}

function renderObjective(key = "capacity") {
  const item = objectives[key];
  document.querySelector("#priorityResult").innerHTML = `
    <div class="result-label">${item.label}</div>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <div class="next-question"><span>${ui.nextLabel}</span>${item.question}</div>`;
}

revealButton.addEventListener("click", () => {
  revealStage = revealStage >= 2 ? 0 : revealStage + 1;
  revealed = revealStage > 0;
  renderParticipants();
  revealButton.innerHTML = revealStage === 0 ? `${ui.inspect} <span aria-hidden=\"true\">→</span>` : revealStage === 1 ? `${ui.challenge} <span aria-hidden=\"true\">→</span>` : `${ui.reset} <span aria-hidden=\"true\">↺</span>`;
  document.querySelector("#stageCount").textContent = revealStage >= 2 ? "02 / 02" : revealStage === 1 ? "01 / 02" : "01 / 02";
  actionHint.textContent = revealStage === 0 ? ui.stage1 : revealStage === 1 ? ui.stage2 : ui.stage3;
});

document.querySelectorAll(".objective-tab").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".objective-tab").forEach((tab) => { tab.classList.toggle("is-active", tab === button); tab.setAttribute("aria-pressed", String(tab === button)); });
  renderObjective(button.dataset.objective);
}));

renderParticipants();
renderObjective();
