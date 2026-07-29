"use client";

import { useMemo, useRef, useState } from "react";

type Category = "vip" | "premium" | "daily";
type CardItem = {
  id: string;
  category: Category;
  bank: string;
  name: string;
  badge: string;
  reason: string;
  benefits: string[];
  fee: string;
  eligible: boolean;
  restriction?: string;
  tone: string;
};

const categories: { id: Category; label: string; eyebrow: string }[] = [
  { id: "vip", label: "腾讯联名", eyebrow: "专属联名权益" },
  { id: "premium", label: "白金权益", eyebrow: "额度与高端权益" },
  { id: "daily", label: "日常优选", eyebrow: "轻松入门免年费" },
];

const cards: CardItem[] = [
  {
    id: "v-gold",
    category: "vip",
    bank: "平安银行",
    name: "超V联名金卡",
    badge: "与你最匹配",
    reason: "你常用平台会员权益，这张卡每月更容易回本",
    benefits: ["每月6选1会员", "消费达标返现", "首年免年费"],
    fee: "首年免年费",
    eligible: true,
    tone: "lime",
  },
  {
    id: "v-travel",
    category: "vip",
    bank: "广发银行",
    name: "超V旅行卡",
    badge: "出行加分",
    reason: "适合高频打车与酒店预订，权益使用门槛低",
    benefits: ["酒店9折", "打车月券", "里程兑换"],
    fee: "消费6笔免次年",
    eligible: true,
    tone: "blue",
  },
  {
    id: "v-video",
    category: "vip",
    bank: "浦发银行",
    name: "腾讯视频联名卡",
    badge: "影音优选",
    reason: "适合腾讯视频高频用户，会员权益更容易使用",
    benefits: ["视频VIP", "观影优惠", "首年免年费"],
    fee: "首年免年费",
    eligible: true,
    tone: "violet",
  },
  {
    id: "v-qq",
    category: "vip",
    bank: "中信银行",
    name: "QQ联名信用卡",
    badge: "会员特权",
    reason: "QQ会员权益与日常消费返现可以兼顾",
    benefits: ["QQ会员特权", "消费返现", "积分加速"],
    fee: "消费6笔免次年",
    eligible: true,
    tone: "mint",
  },
  {
    id: "v-old",
    category: "vip",
    bank: "招商银行",
    name: "超V经典卡",
    badge: "暂不可办理",
    reason: "你已持有同系列卡片",
    benefits: ["平台会员", "积分加速", "生活缴费"],
    fee: "年费¥300",
    eligible: false,
    restriction: "仅限超V系列一卡用户办理",
    tone: "charcoal",
  },
  {
    id: "v-repeat",
    category: "vip",
    bank: "光大银行",
    name: "微信联名信用卡",
    badge: "暂不可办理",
    reason: "你已办理过该联名产品",
    benefits: ["微信支付积分", "专属权益", "消费返现"],
    fee: "首年免年费",
    eligible: false,
    restriction: "同一用户不可重复申请该产品",
    tone: "sky",
  },
  {
    id: "p-platinum",
    category: "premium",
    bank: "浦发银行",
    name: "臻享白金卡",
    badge: "权益利用率高",
    reason: "根据你的出行频次，预计一年可使用4次贵宾厅",
    benefits: ["机场贵宾厅", "高铁休息室", "酒店礼遇"],
    fee: "年费¥680",
    eligible: true,
    tone: "violet",
  },
  {
    id: "p-air",
    category: "premium",
    bank: "中信银行",
    name: "悦享航空卡",
    badge: "里程优选",
    reason: "更适合关注里程积累和境外消费的用户",
    benefits: ["航空里程", "境外返现", "延误险"],
    fee: "年费¥480",
    eligible: true,
    tone: "navy",
  },
  {
    id: "p-hotel",
    category: "premium",
    bank: "广发银行",
    name: "臻尚酒店白金卡",
    badge: "酒店优选",
    reason: "适合高频酒店预订与品质出行用户",
    benefits: ["酒店礼遇", "延迟退房", "消费积分"],
    fee: "年费¥480",
    eligible: true,
    tone: "sand",
  },
  {
    id: "p-family",
    category: "premium",
    bank: "平安银行",
    name: "悦享家庭白金卡",
    badge: "家庭权益",
    reason: "亲子、健康和出行权益覆盖更均衡",
    benefits: ["亲子权益", "健康服务", "接送机"],
    fee: "年费¥600",
    eligible: true,
    tone: "coral",
  },
  {
    id: "p-limit",
    category: "premium",
    bank: "兴业银行",
    name: "寰宇白金卡",
    badge: "暂不可办理",
    reason: "当前地区暂不在开放范围",
    benefits: ["全球礼宾", "接送机", "酒店会籍"],
    fee: "年费¥900",
    eligible: false,
    restriction: "当前仅开放部分城市申请",
    tone: "sand",
  },
  {
    id: "d-cash",
    category: "daily",
    bank: "光大银行",
    name: "阳光返现卡",
    badge: "日常省钱",
    reason: "覆盖你的餐饮和线上消费偏好，无年费压力",
    benefits: ["餐饮返现", "线上加倍", "终身免年费"],
    fee: "终身免年费",
    eligible: true,
    tone: "coral",
  },
  {
    id: "d-green",
    category: "daily",
    bank: "民生银行",
    name: "自在生活卡",
    badge: "新户友好",
    reason: "申请门槛相对友好，适合作为日常主刷卡",
    benefits: ["新户礼", "商超积分", "账单分期"],
    fee: "首年免年费",
    eligible: true,
    tone: "mint",
  },
  {
    id: "d-food",
    category: "daily",
    bank: "招商银行",
    name: "周末餐饮卡",
    badge: "餐饮优选",
    reason: "周末餐饮消费较多时更容易获得优惠",
    benefits: ["餐饮折扣", "周末返现", "积分兑换"],
    fee: "消费6笔免次年",
    eligible: true,
    tone: "violet",
  },
  {
    id: "d-shop",
    category: "daily",
    bank: "中信银行",
    name: "悦购生活卡",
    badge: "购物返现",
    reason: "覆盖商超、电商与生活缴费等常用场景",
    benefits: ["电商返现", "商超积分", "生活缴费"],
    fee: "首年免年费",
    eligible: true,
    tone: "blue",
  },
  {
    id: "d-one",
    category: "daily",
    bank: "广发银行",
    name: "轻享卡",
    badge: "暂不可办理",
    reason: "你已办理过该产品",
    benefits: ["免年费", "积分兑换", "生活优惠"],
    fee: "终身免年费",
    eligible: false,
    restriction: "同一用户不可重复申请",
    tone: "sky",
  },
];

const aiReplies: Record<string, string> = {
  choose:
    "结合你已有1张基础卡、偏好会员权益且不希望承担高年费，我更推荐「超V联名金卡」。它首年免年费，每月会员权益也更容易用到。",
  compare:
    "两张卡的侧重点不同：超V联名金卡更适合日常会员与返现；臻享白金卡适合高频出行，但年费更高。以你当前使用习惯，先选超V联名金卡更划算。",
  fee:
    "不一定。高端权益卡只有在贵宾厅、酒店或里程等权益能稳定使用时才值得。你预计每年出行3次左右，建议先看免年费产品。",
};

export default function Home() {
  const [active, setActive] = useState<Category>("vip");
  const [aiOpen, setAiOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [blockedCard, setBlockedCard] = useState<CardItem | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [filterOpen, setFilterOpen] = useState<"bank" | "benefit" | null>(null);
  const [selectedBank, setSelectedBank] = useState("全部银行");
  const [selectedBenefit, setSelectedBenefit] = useState("全部权益");
  const [aiMessage, setAiMessage] = useState(aiReplies.choose);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAsked, setAiAsked] = useState(false);
  const [aiRecommended, setAiRecommended] = useState(false);
  const [toast, setToast] = useState("");
  const touchStart = useRef<number | null>(null);
  const suppressHeroClick = useRef(false);

  const activeCards = useMemo(() => cards.filter((card) => card.category === active), [active]);
  const topCard = activeCards.find((card) => card.eligible) ?? activeCards[0];
  const listCards = activeCards.filter((card) => card.id !== topCard.id);
  const eligibleCards = listCards.filter((card) => {
    const bankMatch = selectedBank === "全部银行" || card.bank === selectedBank;
    const benefitMatch = selectedBenefit === "全部权益" || card.benefits.includes(selectedBenefit);
    return card.eligible && bankMatch && benefitMatch;
  });
  const ineligibleCards = listCards.filter((card) => {
    const bankMatch = selectedBank === "全部银行" || card.bank === selectedBank;
    const benefitMatch = selectedBenefit === "全部权益" || card.benefits.includes(selectedBenefit);
    return !card.eligible && bankMatch && benefitMatch;
  });

  const activeLabel = categories.find((item) => item.id === active)?.label;

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function openCard(card: CardItem) {
    if (!card.eligible) {
      setBlockedCard(card);
      return;
    }
    setSelectedCard(card);
  }

  function switchCategory(direction: number) {
    const currentIndex = categories.findIndex((category) => category.id === active);
    const nextIndex = (currentIndex + direction + categories.length) % categories.length;
    setActive(categories[nextIndex].id);
    setSelectedBank("全部银行");
    setSelectedBenefit("全部权益");
  }

  function selectCategory(category: Category) {
    setActive(category);
    setSelectedBank("全部银行");
    setSelectedBenefit("全部权益");
  }

  function askAi(message: string, reply = aiReplies.choose) {
    setAiQuestion(message);
    setAiMessage(reply);
    setAiAsked(true);
    setAiRecommended(true);
  }

  function submitAiQuestion() {
    const question = aiQuestion.trim();
    if (!question) return;
    const reply = /年费|值得/.test(question)
      ? aiReplies.fee
      : /对比|比较|区别/.test(question)
        ? aiReplies.compare
        : aiReplies.choose;
    askAi(question, reply);
  }

  function handleHeroTouchEnd(clientX: number) {
    if (touchStart.current === null) return;
    const distance = clientX - touchStart.current;
    if (Math.abs(distance) > 44) {
      suppressHeroClick.current = true;
      switchCategory(distance < 0 ? 1 : -1);
      window.setTimeout(() => { suppressHeroClick.current = false; }, 240);
    }
    touchStart.current = null;
  }

  function renderProductCard(card: CardItem, rank?: number) {
    return (
      <article
        key={card.id}
        className={`product-card ${!card.eligible ? "disabled" : ""}`}
        onClick={() => openCard(card)}
      >
        <div className={`card-art ${card.tone}`}>
          <div className="bank-line">
            <span>{card.bank}</span>
            <i>VISA</i>
          </div>
          <div className="card-chip" />
          <strong>{card.name}</strong>
          <small>•••• 2048</small>
        </div>
        <div className="card-info">
          <span className="compact-bank">{card.bank}</span>
          <h3>{card.name}</h3>
          <div className="benefits">
            {card.benefits.slice(0, 2).map((benefit) => <span key={benefit}>{benefit}</span>)}
          </div>
        </div>
        <div className="compact-status">
          <span>{card.eligible ? "可申请" : "暂不可办理"}</span>
          <b>›</b>
        </div>
        {!card.eligible && <div className="disabled-overlay">当前不可办理</div>}
      </article>
    );
  }

  return (
    <main className="app-shell">
      <section className="phone">
        <header className="topbar">
          <button className="icon-button" aria-label="返回">‹</button>
          <div>
            <strong>信用卡专区</strong>
            <span>AI 智能匹配</span>
          </div>
          <button className="icon-button dots" aria-label="更多">•••</button>
        </header>

        <section
          className={`hero hero-${topCard.tone}`}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => handleHeroTouchEnd(event.changedTouches[0].clientX)}
          onClick={() => {
            if (!suppressHeroClick.current) openCard(topCard);
          }}
        >
          <button className="hero-arrow left" aria-label="上一个专区" onClick={(event) => { event.stopPropagation(); switchCategory(-1); }}>‹</button>
          <button className="hero-arrow right" aria-label="下一个专区" onClick={(event) => { event.stopPropagation(); switchCategory(1); }}>›</button>
          <div className="hero-card-visual">
            <span>{topCard.bank}</span>
            <div className="hero-chip" />
            <strong>{topCard.name}</strong>
            <small>VISA · •••• 2048</small>
          </div>
          <div className="hero-copy">
            <span className="eyebrow">为你推荐</span>
            <h1>{topCard.name}</h1>
            <p>{topCard.benefits[0]} · {topCard.fee}</p>
            <div className="hero-benefits">
              {topCard.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
            </div>
            <div className="hero-footer"><b>立即办卡</b></div>
          </div>
        </section>
        <button
          className="hero-apply"
          onClick={() => showToast("已进入银行申请链路（Demo）")}
        >
          免费办卡
        </button>

        <div className="carousel-meta">
          <span>为你推荐</span>
          <div>{categories.map((category) => <i key={category.id} className={active === category.id ? "active" : ""} />)}</div>
          <small>{categories.find((item) => item.id === active)?.eyebrow}</small>
        </div>

        <nav className="category-tabs" aria-label="专区切换">
          {categories.map((category) => (
            <button
              key={category.id}
              className={active === category.id ? "active" : ""}
              onClick={() => selectCategory(category.id)}
            >
              <span>{category.label}</span>
              <small>{category.eyebrow}</small>
            </button>
          ))}
        </nav>

        <button className={`ai-entry ${aiOpen ? "expanded" : ""}`} onClick={() => setAiOpen((open) => !open)}>
          <span className="ai-spark">✦</span>
          <span><strong>问问 AI 选卡助手</strong><small>结合你的需求，帮你选卡、比卡、看权益</small></span>
          <b>{aiOpen ? "⌃" : "›"}</b>
        </button>

        {aiOpen && (
          <section className="ai-inline" aria-label="AI 选卡助手">
            <div className="ai-context">
              <span>正在浏览「{activeLabel}」专区</span>
              <small>已结合你的可办资格与当前筛选</small>
            </div>

            {!aiAsked ? (
              <>
                <div className="ai-welcome">
                  <div className="ai-avatar">✦</div>
                  <div>
                    <strong>大黑</strong>
                    <p>告诉我你常用的消费场景，或者直接选一个问题，我会从当前专区里帮你挑一张真正适合的卡。</p>
                  </div>
                </div>
                <div className="quick-prompts inline-prompts">
                  <button onClick={() => askAi("直接帮我选一张")}>直接帮我选</button>
                  <button onClick={() => askAi("比较两张卡的区别", aiReplies.compare)}>比较两张卡</button>
                  <button onClick={() => askAi("年费卡值得办吗？", aiReplies.fee)}>年费卡值得吗</button>
                </div>
              </>
            ) : (
              <div className="ai-conversation">
                <div className="user-bubble">{aiQuestion}</div>
                <div className="agent-label"><span>✦</span><strong>大黑</strong></div>
                <div className="assistant-bubble">
                  <p>{aiMessage}</p>
                </div>
                <article className="ai-result-card">
                  <div className="ai-result-art">V</div>
                  <div>
                    <span>首选推荐</span>
                    <strong>{topCard.name}</strong>
                    <small>{topCard.bank} · {topCard.fee}</small>
                    <div className="ai-result-benefits">
                      {topCard.benefits.slice(0, 2).map((benefit) => <i key={benefit}>{benefit}</i>)}
                    </div>
                  </div>
                  <div className="ai-result-actions">
                    <button onClick={() => openCard(topCard)}>查看详情</button>
                    <button className="apply" onClick={() => showToast("已进入银行申请链路（Demo）")}>立即办卡</button>
                  </div>
                </article>
                <p className="ai-sync-note">已将这张卡放到下方「为你精选」首位</p>
              </div>
            )}

            <div className="inline-chat-input">
              <span>◉</span>
              <input
                value={aiQuestion}
                onChange={(event) => setAiQuestion(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") submitAiQuestion(); }}
                placeholder="还想了解什么信用卡问题？"
              />
              <button onClick={submitAiQuestion}>↑</button>
            </div>
          </section>
        )}

        <section className="list-toolbar" aria-label="卡片筛选">
          <div>
            <span className="green-dot" />
            <h2>为你精选</h2>
            {aiRecommended && <small>推荐已更新</small>}
          </div>
          <button onClick={() => setFilterOpen("bank")}>银行⌄</button>
          <button onClick={() => setFilterOpen("benefit")}>权益⌄</button>
        </section>

        <section className="card-list">
          {eligibleCards.map((card, index) => renderProductCard(card, index + 2))}
          {eligibleCards.length === 0 && <div className="empty-result">当前筛选条件下暂无可办理卡片</div>}
        </section>

        {ineligibleCards.length > 0 && (
          <>
            <div className="eligibility-divider">
              <span>以下卡片暂不可办理</span>
              <small>可查看产品权益及限制原因</small>
            </div>
            <section className="card-list ineligible-list">
              {ineligibleCards.map((card) => renderProductCard(card))}
            </section>
          </>
        )}

        <section className="trust-strip">
          <span>✓ 资格前置判断</span>
          <span>✓ 推荐理由可解释</span>
          <span>✓ 最终审批以银行为准</span>
        </section>

      </section>

      {toast && <div className="toast">{toast}</div>}

      {(allOpen || blockedCard || selectedCard || filterOpen) && (
        <div
          className="scrim"
          onClick={() => {
            setAllOpen(false);
            setBlockedCard(null);
            setSelectedCard(null);
            setFilterOpen(null);
          }}
        />
      )}

      <aside className={`bottom-sheet all-sheet ${allOpen ? "open" : ""}`}>
        <div className="sheet-handle" />
        <div className="sheet-title">
          <div><strong>全部信用卡</strong><span>共 9 张 · 可办理优先</span></div>
          <button onClick={() => setAllOpen(false)}>×</button>
        </div>
        <div className="filter-row">
          <button className="selected">智能排序</button><button>银行</button><button>核心权益</button><button>年费</button>
        </div>
        <div className="compact-list">
          {cards.filter((card) => card.eligible).map((card) => (
            <button key={card.id} onClick={() => { setAllOpen(false); openCard(card); }}>
              <span className={`compact-art ${card.tone}`}>V</span>
              <span><strong>{card.name}</strong><small>{card.bank} · {card.fee}</small></span>
              <b>›</b>
            </button>
          ))}
        </div>
      </aside>

      <aside className={`bottom-sheet filter-sheet ${filterOpen ? "open" : ""}`}>
        <div className="sheet-handle" />
        <div className="sheet-title">
          <div>
            <strong>{filterOpen === "bank" ? "选择银行" : "选择核心权益"}</strong>
            <span>仅筛选当前「{activeLabel}」专区</span>
          </div>
          <button onClick={() => setFilterOpen(null)}>×</button>
        </div>
        <div className="option-grid">
          {(filterOpen === "bank"
            ? ["全部银行", ...Array.from(new Set(activeCards.map((card) => card.bank)))]
            : ["全部权益", ...Array.from(new Set(activeCards.flatMap((card) => card.benefits)))]
          ).map((option) => {
            const selected = filterOpen === "bank" ? selectedBank === option : selectedBenefit === option;
            return (
              <button
                key={option}
                className={selected ? "selected" : ""}
                onClick={() => {
                  if (filterOpen === "bank") setSelectedBank(option);
                  if (filterOpen === "benefit") setSelectedBenefit(option);
                  setFilterOpen(null);
                }}
              >
                {option}<span>{selected ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <aside className={`bottom-sheet status-sheet ${blockedCard ? "open" : ""}`}>
        <div className="sheet-handle" />
        <div className="status-icon">!</div>
        <h2>这张卡暂时不能办理</h2>
        <p>{blockedCard?.restriction}</p>
        <div className="status-detail"><span>资格判断</span><strong>{blockedCard?.reason}</strong></div>
        <button className="primary" onClick={() => { setBlockedCard(null); setAiOpen(true); setAiMessage("这张卡目前不符合办理条件。我已为你筛出同类可办卡：超V联名金卡和超V旅行卡，前者年费压力更低。"); }}>
          让 AI 推荐可办的相似卡
        </button>
        <button className="secondary" onClick={() => setBlockedCard(null)}>继续浏览</button>
      </aside>

      <aside className={`bottom-sheet detail-sheet ${selectedCard ? "open" : ""}`}>
        <div className="sheet-handle" />
        <div className={`detail-card ${selectedCard?.tone || ""}`}>
          <span>{selectedCard?.bank}</span><strong>{selectedCard?.name}</strong><small>•••• 2048</small>
        </div>
        <span className="detail-label">为什么适合你</span>
        <h2>{selectedCard?.reason}</h2>
        <div className="detail-benefits">
          {selectedCard?.benefits.map((benefit, index) => (
            <div key={benefit}><span>{["01", "02", "03"][index]}</span><strong>{benefit}</strong></div>
          ))}
        </div>
        <div className="approval-note">平台推荐不代表银行审批结果，最终以银行审核为准。</div>
        <button className="primary" onClick={() => { setSelectedCard(null); showToast("已进入银行申请链路（Demo）"); }}>立即申请</button>
        <button className="secondary" onClick={() => { setSelectedCard(null); setAiOpen(true); setAiMessage(aiReplies.compare); }}>先问 AI 再决定</button>
      </aside>
    </main>
  );
}
