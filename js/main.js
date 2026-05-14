
// ------------------------------
// 進化データ
// ------------------------------
const evolutionData = {
  gu: [
    { level: 1, name: "石", type: "グー" },
    { level: 2, name: "鋼", type: "グー" },
    { level: 3, name: "ダイアモンド", type: "グー" },
    { level: 4, name: "神の感謝の正拳", type: "グー" }
  ],
  cho: [
    { level: 1, name: "ハサミ", type: "チョキ" },
    { level: 2, name: "日本刀", type: "チョキ" },
    { level: 3, name: "レーザーカッター", type: "チョキ" },
    { level: 4, name: "悪魔の裁断", type: "チョキ" }
  ],
  par: [
    { level: 1, name: "紙", type: "パー" },
    { level: 2, name: "防弾チョッキ", type: "パー" },
    { level: 3, name: "カーボンファイバー", type: "パー" },
    { level: 4, name: "女神の結界", type: "パー" }
  ]
};

// ------------------------------
// 現在のレベル
// 配列は0番目から始まるので、Lv.1 = 0
// ------------------------------
let playerLevel = {
  gu: 0,
  cho: 0,
  par: 0
};

let computerLevel = {
  gu: 0,
  cho: 0,
  par: 0
};

// ------------------------------
// 現在の攻撃力
// 初期値はLv.1の最小攻撃力にしておく
// ------------------------------
let playerPower = {
  gu: 100,
  cho: 100,
  par: 100
};

let computerPower = {
  gu: 100,
  cho: 100,
  par: 100
};

// ------------------------------
// 手の一覧
// ------------------------------
const hands = ["gu", "cho", "par"];

// ------------------------------
// ボタン取得
// ------------------------------
const guBtn = document.querySelector("#gu_btn");
const choBtn = document.querySelector("#cho_btn");
const parBtn = document.querySelector("#par_btn");

// ------------------------------
// 表示エリア取得
// ------------------------------
const playerHandText = document.querySelector("#player_hand");
const computerHandText = document.querySelector("#computer_hand");
const resultText = document.querySelector("#result");

const playerAttackPowerText = document.querySelector("#player_attack_power");
const computerAttackPowerText = document.querySelector("#computer_attack_power");


// ------------------------------
// ボタンクリックイベント
// ------------------------------
guBtn.addEventListener("click", function () {
  playGame("gu");
});

choBtn.addEventListener("click", function () {
  playGame("cho");
});

parBtn.addEventListener("click", function () {
  playGame("par");
});

// ------------------------------
// ゲーム本体
// ------------------------------
function playGame(playerHand) {
  const computerHand = getComputerHand();

  const playerCurrentData = evolutionData[playerHand][playerLevel[playerHand]];
  const computerCurrentData = evolutionData[computerHand][computerLevel[computerHand]];

  const result = judgeResult(playerHand, computerHand);

  let playerAttackPower = calculateAttackPower(playerCurrentData.level);
  let computerAttackPower = calculateAttackPower(computerCurrentData.level);

  // 勝敗による処理
  if (result === "勝ち") {
    // プレイヤーの攻撃力を2倍
    playerAttackPower = playerAttackPower * 2;

    // プレイヤーは勝った手が進化
    levelUp(playerLevel, playerHand);

    // コンピュータは負けた手がLv.1に戻る
    resetLevel(computerLevel, computerHand);

  } else if (result === "負け") {
    // コンピュータの攻撃力を2倍
    computerAttackPower = computerAttackPower * 2;

    // プレイヤーは負けた手がLv.1に戻る
    resetLevel(playerLevel, playerHand);

    // コンピュータは勝った手が進化
    levelUp(computerLevel, computerHand);
  }

  // 今回使った手の攻撃力を保存
  playerPower[playerHand] = playerAttackPower;
  computerPower[computerHand] = computerAttackPower;

  // 画面表示
  playerHandText.textContent = `あなたの手：Lv.${playerCurrentData.level} ${playerCurrentData.name}（${playerCurrentData.type}）`;
  computerHandText.textContent = `コンピューターの手：Lv.${computerCurrentData.level} ${computerCurrentData.name}（${computerCurrentData.type}）`;
  resultText.textContent = `結果：${result}`;

  playerAttackPowerText.textContent = `あなたの攻撃力：${playerAttackPower}`;
  computerAttackPowerText.textContent = `コンピューターの攻撃力：${computerAttackPower}`;

  showEvolutionStatus();
}

// ------------------------------
// コンピューターの手をランダムで決める
// ------------------------------
function getComputerHand() {
  const randomNumber = Math.floor(Math.random() * 3);
  return hands[randomNumber];
}

// ------------------------------
// 勝敗判定
// ------------------------------
function judgeResult(playerHand, computerHand) {
  if (playerHand === computerHand) {
    return "あいこ";
  }

  if (
    playerHand === "gu" && computerHand === "cho" ||
    playerHand === "cho" && computerHand === "par" ||
    playerHand === "par" && computerHand === "gu"
  ) {
    return "勝ち";
  }

  return "負け";
}

// ------------------------------
// 攻撃力計算
// Lv.1：100 + 0〜100
// Lv.2：200 + 0〜100
// Lv.3：300 + 0〜100
// Lv.4：400 + 0〜100
// ------------------------------
function calculateAttackPower(level) {
  const basePower = level * 100;
  const randomPower = Math.floor(Math.random() * 101);
  return basePower + randomPower;
}

// ------------------------------
// レベルアップ
// 最大Lv.4まで
// ------------------------------
function levelUp(levelObject, hand) {
  if (levelObject[hand] < 3) {
    levelObject[hand]++;
  }
}

// ------------------------------
// Lv.1に戻す
// ------------------------------
function resetLevel(levelObject, hand) {
  levelObject[hand] = 0;
}

// ------------------------------
// 進化状況を表示
// ------------------------------
function showEvolutionStatus() {
  const playerGuData = evolutionData.gu[playerLevel.gu];
  const playerChoData = evolutionData.cho[playerLevel.cho];
  const playerParData = evolutionData.par[playerLevel.par];

  const computerGuData = evolutionData.gu[computerLevel.gu];
  const computerChoData = evolutionData.cho[computerLevel.cho];
  const computerParData = evolutionData.par[computerLevel.par];

  // プレイヤー：グー
  document.querySelector("#player_gu_name").textContent = playerGuData.name;
  document.querySelector("#player_gu_level").textContent = playerGuData.level;
  document.querySelector("#player_gu_power").textContent = playerPower.gu;

  // プレイヤー：チョキ
  document.querySelector("#player_cho_name").textContent = playerChoData.name;
  document.querySelector("#player_cho_level").textContent = playerChoData.level;
  document.querySelector("#player_cho_power").textContent = playerPower.cho;

  // プレイヤー：パー
  document.querySelector("#player_par_name").textContent = playerParData.name;
  document.querySelector("#player_par_level").textContent = playerParData.level;
  document.querySelector("#player_par_power").textContent = playerPower.par;

  // コンピューター：グー
  document.querySelector("#computer_gu_name").textContent = computerGuData.name;
  document.querySelector("#computer_gu_level").textContent = computerGuData.level;
  document.querySelector("#computer_gu_power").textContent = computerPower.gu;

  // コンピューター：チョキ
  document.querySelector("#computer_cho_name").textContent = computerChoData.name;
  document.querySelector("#computer_cho_level").textContent = computerChoData.level;
  document.querySelector("#computer_cho_power").textContent = computerPower.cho;

  // コンピューター：パー
  document.querySelector("#computer_par_name").textContent = computerParData.name;
  document.querySelector("#computer_par_level").textContent = computerParData.level;
  document.querySelector("#computer_par_power").textContent = computerPower.par;
}

// 初期表示
showEvolutionStatus();



