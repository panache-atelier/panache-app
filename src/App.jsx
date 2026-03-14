import { useState } from "react";

const MENU_ITEMS = [
  { id: 1,  category: "BASIC",      name: "Shampoo",         price: "¥1,100〜",  desc: "" },
  { id: 2,  category: "BASIC",      name: "Cut",             price: "¥4,000〜",  desc: "" },
  { id: 3,  category: "PERM",       name: "Perm",            price: "¥8,800〜",  desc: "" },
  { id: 4,  category: "PERM",       name: "Straight Perm",   price: "¥17,600〜", desc: "" },
  { id: 5,  category: "COLOR",      name: "Color",           price: "¥5,500〜",  desc: "" },
  { id: 6,  category: "COLOR",      name: "Henna",           price: "¥6,050〜",  desc: "" },
  { id: 7,  category: "COLOR",      name: "Acid Color",      price: "¥6,050〜",  desc: "" },
  { id: 8,  category: "TREATMENT",  name: "Treatment",       price: "¥2,750〜",  desc: "" },
  { id: 9,  category: "TREATMENT",  name: "Acid Treatment",  price: "¥5,500〜",  desc: "" },
  { id: 10, category: "SCHOOL",     name: "高校生",           price: "¥3,000",    desc: "School Cut" },
  { id: 11, category: "SCHOOL",     name: "小中学生",          price: "¥2,500",    desc: "School Cut" },
  { id: 12, category: "SCHOOL",     name: "幼児",             price: "¥2,000",    desc: "School Cut" },
];

const CATEGORIES = ["すべて", "BASIC", "PERM", "COLOR", "TREATMENT", "SCHOOL"];

const CAT_STYLE = {
  "BASIC":      { dot: "#B8860B" },
  "PERM":       { dot: "#2E6DA4" },
  "COLOR":      { dot: "#7B2D8B" },
  "TREATMENT":  { dot: "#2E8B57" },
  "SCHOOL":     { dot: "#C0392B" },
};

function PanacheLogo() {
  return (
    <svg width="200" height="80" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="24" rx="56" ry="22" fill="#5B1A70"/>
      <ellipse cx="60" cy="24" rx="56" ry="22" fill="url(#lg)"/>
      <defs>
        <radialGradient id="lg" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#8B3FA8"/>
          <stop offset="100%" stopColor="#3D0F50"/>
        </radialGradient>
      </defs>
      <text x="60" y="32" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic" fontWeight="bold"
        fontSize="23" fill="#F0D800" letterSpacing="1.5">
        Panache
      </text>
      <text x="60" y="9" textAnchor="middle"
        fontFamily="'Arial Narrow', Arial, sans-serif"
        fontSize="6.5" fill="rgba(255,255,255,0.55)" letterSpacing="3">
        since 2002
      </text>
      <text x="60" y="45" textAnchor="middle"
        fontFamily="'Arial Narrow', Arial, sans-serif"
        fontSize="6.5" fill="rgba(255,255,255,0.55)" letterSpacing="3">
        atelier
      </text>
    </svg>
  );
}

export default function SalonApp() {
  const [tab, setTab] = useState("menu");
  const [category, setCategory] = useState("すべて");
  const [showPopup, setShowPopup] = useState(false);
  const [contactPopup, setContactPopup] = useState(null); // 'tel' | 'sms' | 'email'
  const [notices, setNotices] = useState([
    { id: 1, date: "2025.03.14", title: "春季休業のお知らせ", body: "3月20日(木)〜3月22日(土)は春季休業とさせていただきます。" },
  ]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newDate, setNewDate] = useState("");
  const ADMIN_PW = "0222";

  const filtered = category === "すべて"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(m => m.category === category);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F6F2",
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-card {
          transition: box-shadow 0.2s, transform 0.2s;
          animation: fadeUp 0.35s ease both;
        }
        .menu-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(91,26,112,0.12) !important;
        }
        .action-btn {
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .action-btn:active { transform: scale(0.97); }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        background: "#1C0A24",
        padding: "28px 24px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(91,26,112,0.35)",
        }} />
        <div style={{
          position: "absolute", bottom: -50, left: -20,
          width: 130, height: 130, borderRadius: "50%",
          background: "rgba(91,26,112,0.18)",
        }} />
        <div style={{ position: "relative" }}>
          <PanacheLogo />
          <div style={{
            marginTop: 10,
            color: "rgba(255,255,255,0.45)",
            fontSize: 11,
            letterSpacing: 3,
          }}>HAIR SALON  /  atelier</div>
          <div style={{
            marginTop: 4,
            color: "rgba(255,255,255,0.28)",
            fontSize: 10,
            letterSpacing: 4,
          }}>since 2002</div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #EDE8E0" }}>
        {[
          { key: "menu",    label: "MENU" },
          { key: "reserve", label: "予約・アクセス" },
          { key: "info",    label: "INFO" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "15px 0", background: "none", border: "none",
            borderBottom: tab === t.key ? "2px solid #7B2D8B" : "2px solid transparent",
            color: tab === t.key ? "#7B2D8B" : "#AAA",
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            cursor: "pointer", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px 16px 100px" }}>

        {/* ════ MENU ════ */}
        {tab === "menu" && (
          <>
            {/* category filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: "7px 16px",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: category === c ? "#7B2D8B" : "#DDD",
                  background: category === c ? "#7B2D8B" : "transparent",
                  color: category === c ? "#fff" : "#888",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}>{c}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {filtered.map((item, idx) => {
                const dot = CAT_STYLE[item.category]?.dot || "#888";
                return (
                  <div key={item.id} className="menu-card" style={{
                    background: "#fff",
                    padding: "18px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #F0EBE5",
                    animationDelay: `${idx * 0.04}s`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                      <div style={{
                        width: 4, height: 44, borderRadius: 2,
                        background: dot, flexShrink: 0,
                      }} />
                      <div>
                        <div style={{ color: "#1C0A24", fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                        {item.desc ? <div style={{ color: "#AAA", fontSize: 11 }}>{item.desc}</div> : null}
                      </div>
                    </div>
                    <div style={{
                      color: "#1C0A24",
                      fontSize: 15,
                      fontWeight: 700,
                      minWidth: 80,
                      textAlign: "right",
                    }}>{item.price}</div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: 20,
              padding: "14px 18px",
              background: "#fff",
              borderLeft: "3px solid #7B2D8B",
              borderRadius: 2,
              color: "#555",
              fontSize: 11,
              fontWeight: 700,
              lineHeight: 1.7,
              letterSpacing: 0.3,
            }}>
              価格は最低料金です。<br/>
              長さ・量により追加料金が発生致します。
            </div>

            <div style={{ textAlign: "center", marginTop: 16, color: "#CCC", fontSize: 10, letterSpacing: 1 }}>
              ALL PRICES TAX INCLUDED
            </div>
          </>
        )}

        {/* ════ INFO TAB ════ */}
        {tab === "info" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>INFORMATION</div>
              <button onClick={() => { setShowAdmin(true); setPwInput(""); setPwError(false); }} style={{
                background: "none", border: "1px solid #DDD", borderRadius: 4,
                color: "#AAA", fontSize: 10, padding: "5px 12px", cursor: "pointer", letterSpacing: 1,
              }}>⚙ 管理</button>
            </div>

            {notices.length === 0 && (
              <div style={{ textAlign: "center", color: "#CCC", fontSize: 13, padding: "40px 0" }}>
                お知らせはありません
              </div>
            )}

            {notices.map(n => (
              <div key={n.id} style={{
                background: "#fff", borderRadius: 4, padding: "18px 20px",
                borderLeft: "3px solid #7B2D8B",
                boxShadow: "0 2px 10px rgba(91,26,112,0.07)",
              }}>
                <div style={{ color: "#AAA", fontSize: 10, marginBottom: 6 }}>{n.date}</div>
                <div style={{ color: "#1C0A24", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{n.title}</div>
                <div style={{ color: "#666", fontSize: 12, lineHeight: 1.7 }}>{n.body}</div>
              </div>
            ))}

            {/* Admin password modal */}
            {showAdmin && !isAuthed && (
              <div style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
              }} onClick={() => setShowAdmin(false)}>
                <div style={{
                  background: "#fff", borderRadius: 12, padding: "32px 28px",
                  width: "100%", maxWidth: 320,
                }} onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: 28, textAlign: "center", marginBottom: 12 }}>🔐</div>
                  <div style={{ color: "#1C0A24", fontSize: 15, fontWeight: 700, textAlign: "center", marginBottom: 20 }}>管理者パスワード</div>
                  <input
                    type="password"
                    value={pwInput}
                    onChange={e => setPwInput(e.target.value)}
                    placeholder="パスワードを入力"
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 6,
                      border: pwError ? "1.5px solid #E74C3C" : "1.5px solid #DDD",
                      fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 8,
                    }}
                  />
                  {pwError && <div style={{ color: "#E74C3C", fontSize: 11, marginBottom: 8 }}>パスワードが違います</div>}
                  <button onClick={() => {
                    if (pwInput === ADMIN_PW) { setIsAuthed(true); setPwError(false); }
                    else { setPwError(true); }
                  }} style={{
                    width: "100%", background: "#7B2D8B", color: "#fff",
                    border: "none", borderRadius: 6, padding: "13px", fontSize: 14,
                    fontWeight: 700, cursor: "pointer", marginBottom: 10,
                  }}>確認</button>
                  <button onClick={() => setShowAdmin(false)} style={{
                    width: "100%", background: "none", border: "1px solid #EEE",
                    color: "#AAA", borderRadius: 6, padding: "12px", fontSize: 13,
                    cursor: "pointer",
                  }}>キャンセル</button>
                </div>
              </div>
            )}

            {/* Admin panel */}
            {showAdmin && isAuthed && (
              <div style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
              }} onClick={() => { setShowAdmin(false); setIsAuthed(false); }}>
                <div style={{
                  background: "#fff", borderRadius: 12, padding: "28px 24px",
                  width: "100%", maxWidth: 380, maxHeight: "85vh", overflowY: "auto",
                }} onClick={e => e.stopPropagation()}>
                  <div style={{ color: "#1C0A24", fontSize: 15, fontWeight: 700, marginBottom: 20 }}>⚙ お知らせ管理</div>

                  {/* Add new */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>新規追加</div>
                    <input value={newDate} onChange={e => setNewDate(e.target.value)} placeholder="日付（例：2025.04.01）"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #DDD", fontSize: 13, marginBottom: 8, boxSizing: "border-box", outline: "none" }} />
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="タイトル"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #DDD", fontSize: 13, marginBottom: 8, boxSizing: "border-box", outline: "none" }} />
                    <textarea value={newBody} onChange={e => setNewBody(e.target.value)} placeholder="内容" rows={3}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #DDD", fontSize: 13, marginBottom: 10, boxSizing: "border-box", outline: "none", resize: "none" }} />
                    <button onClick={() => {
                      if (!newTitle.trim()) return;
                      setNotices([{ id: Date.now(), date: newDate, title: newTitle, body: newBody }, ...notices]);
                      setNewTitle(""); setNewBody(""); setNewDate("");
                    }} style={{
                      width: "100%", background: "#7B2D8B", color: "#fff",
                      border: "none", borderRadius: 6, padding: "12px", fontSize: 13,
                      fontWeight: 700, cursor: "pointer",
                    }}>追加する</button>
                  </div>

                  {/* Existing notices */}
                  {notices.length > 0 && (
                    <div>
                      <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>既存のお知らせ</div>
                      {notices.map(n => (
                        <div key={n.id} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                          padding: "12px 0", borderBottom: "1px solid #F5F0EC",
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: "#AAA", fontSize: 10 }}>{n.date}</div>
                            <div style={{ color: "#1C0A24", fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                          </div>
                          <button onClick={() => setNotices(notices.filter(x => x.id !== n.id))} style={{
                            background: "#FFF0F0", border: "none", borderRadius: 4,
                            color: "#E74C3C", fontSize: 11, padding: "5px 10px", cursor: "pointer", marginLeft: 10,
                          }}>削除</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button onClick={() => { setShowAdmin(false); setIsAuthed(false); }} style={{
                    width: "100%", background: "none", border: "1px solid #EEE",
                    color: "#AAA", borderRadius: 6, padding: "12px", fontSize: 13,
                    cursor: "pointer", marginTop: 16,
                  }}>閉じる</button>
                </div>
              </div>
            )}
          </div>
        )}


        {tab === "reserve" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* section label */}
            <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 3, fontWeight: 700, marginBottom: -4 }}>
              RESERVATION
            </div>

            {/* Tel */}
            <button onClick={() => setContactPopup('tel')} className="action-btn" style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "#fff", borderRadius: 4, padding: "22px 24px",
              border: "1px solid #E8E0F0", width: "100%", cursor: "pointer",
              boxShadow: "0 2px 12px rgba(91,26,112,0.07)",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "#F3E8FF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>📞</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>CALL</div>
                <div style={{ color: "#1C0A24", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>0466(34)6713</div>
                <div style={{ color: "#CCC", fontSize: 10, marginTop: 3 }}>タップで確認</div>
              </div>
            </button>

            {/* SMS */}
            <button onClick={() => setContactPopup('sms')} className="action-btn" style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "#fff", borderRadius: 4, padding: "22px 24px",
              border: "1px solid #E8E0F0", width: "100%", cursor: "pointer",
              boxShadow: "0 2px 12px rgba(91,26,112,0.07)",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%", background: "#F3E8FF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>💬</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>SMS</div>
                <div style={{ color: "#1C0A24", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>080-5177-7095</div>
                <div style={{ color: "#CCC", fontSize: 10, marginTop: 3 }}>タップで確認</div>
              </div>
            </button>

            {/* Email */}
            <button onClick={() => setContactPopup('email')} className="action-btn" style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "#fff", borderRadius: 4, padding: "22px 24px",
              border: "1px solid #E8E0F0", width: "100%", cursor: "pointer",
              boxShadow: "0 2px 12px rgba(91,26,112,0.07)",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%", background: "#F3E8FF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>✉️</div>
              <div style={{ textAlign: "left", overflow: "hidden" }}>
                <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>EMAIL</div>
                <div style={{ color: "#1C0A24", fontSize: 12, fontWeight: 700, wordBreak: "break-all" }}>panache2002atelier44@ezweb.ne.jp</div>
                <div style={{ color: "#CCC", fontSize: 10, marginTop: 3 }}>タップで確認</div>
              </div>
            </button>

            {/* Contact popups */}
            {contactPopup && (
              <div style={{
                position: "fixed", inset: 0, zIndex: 100,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
              }} onClick={() => setContactPopup(null)}>
                <div style={{
                  background: "#fff", borderRadius: 12, padding: "32px 28px",
                  width: "100%", maxWidth: 340,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                }} onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: 36, textAlign: "center", marginBottom: 16 }}>
                    {contactPopup === 'tel' ? '📞' : contactPopup === 'sms' ? '💬' : '✉️'}
                  </div>
                  <div style={{ color: "#1C0A24", fontSize: 16, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
                    {contactPopup === 'tel' && '電話で予約しますか？'}
                    {contactPopup === 'sms' && 'SMSで予約しますか？'}
                    {contactPopup === 'email' && 'メールで予約しますか？'}
                  </div>
                  <div style={{ color: "#AAA", fontSize: 12, textAlign: "center", marginBottom: 28, lineHeight: 1.7 }}>
                    {contactPopup === 'tel' && '0466(34)6713'}
                    {contactPopup === 'sms' && '080-5177-7095'}
                    {contactPopup === 'email' && 'panache2002atelier44@ezweb.ne.jp'}
                  </div>
                  <a
                    href={
                      contactPopup === 'tel' ? 'tel:0466346713' :
                      contactPopup === 'sms' ? 'sms:08051777095' :
                      'mailto:panache2002atelier44@ezweb.ne.jp'
                    }
                    onClick={() => setContactPopup(null)}
                    style={{
                      display: "block", background: "#7B2D8B", color: "#fff",
                      textAlign: "center", padding: "14px", borderRadius: 6,
                      fontWeight: 700, fontSize: 14, textDecoration: "none",
                      marginBottom: 12, letterSpacing: 1,
                    }}>
                    {contactPopup === 'tel' ? '電話する' : contactPopup === 'sms' ? 'SMSを送る' : 'メールを送る'}
                  </a>
                  <button onClick={() => setContactPopup(null)} style={{
                    display: "block", width: "100%", background: "none",
                    border: "1px solid #EEE", color: "#AAA", padding: "13px",
                    borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer",
                  }}>キャンセル</button>
                </div>
              </div>
            )}

            {/* divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
              <span style={{ color: "#CCC", fontSize: 10, letterSpacing: 2 }}>ONLINE</span>
              <div style={{ flex: 1, height: 1, background: "#EDE8E0" }} />
            </div>

            {/* Web reservation / congestion */}
            <button
              onClick={() => setShowPopup(true)}
              className="action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "#7B2D8B",
                borderRadius: 4,
                padding: "22px 24px",
                border: "none",
                width: "100%",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(91,26,112,0.28)",
              }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>🗓</div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>RESERVATION STATUS</div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>予約状況・混雑情報</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 3 }}>panache-atelier.com</div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>›</div>
            </button>

            {/* Popup */}
            {showPopup && (
              <div style={{
                position: "fixed", inset: 0, zIndex: 100,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: 32,
              }} onClick={() => setShowPopup(false)}>
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "32px 28px",
                  width: "100%",
                  maxWidth: 340,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                }} onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: 36, textAlign: "center", marginBottom: 16 }}>🗓</div>
                  <div style={{ color: "#1C0A24", fontSize: 16, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
                    予約状況・混雑情報
                  </div>
                  <div style={{ color: "#AAA", fontSize: 12, textAlign: "center", marginBottom: 28, lineHeight: 1.7 }}>
                    外部サイト（panache-atelier.com）を開きます。
                  </div>
                  <a href="https://panache-atelier.com/reservation/index.php"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => setShowPopup(false)}
                    style={{
                      display: "block",
                      background: "#7B2D8B",
                      color: "#fff",
                      textAlign: "center",
                      padding: "14px",
                      borderRadius: 6,
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                      marginBottom: 12,
                      letterSpacing: 1,
                    }}>開く</a>
                  <button onClick={() => setShowPopup(false)} style={{
                    display: "block",
                    width: "100%",
                    background: "none",
                    border: "1px solid #EEE",
                    color: "#AAA",
                    padding: "13px",
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}>キャンセル</button>
                </div>
              </div>
            )}

            {/* Info */}
            <div style={{
              background: "#fff",
              borderRadius: 4,
              padding: "20px 24px",
              border: "1px solid #EDE8E0",
              marginTop: 4,
            }}>
              <div style={{ color: "#AAA", fontSize: 10, letterSpacing: 3, fontWeight: 700, marginBottom: 14 }}>SALON INFO</div>
              {[
                ["営業時間", "9:00 〜 19:00"],
                ["定休日", "毎週火曜日"],
                ["駐車場", "2台"],
                ["Web", "www.panache-atelier.com"],
              ].map(([label, val]) => (
                <div key={label} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: "1px solid #F5F0EC",
                }}>
                  <span style={{ color: "#AAA", fontSize: 11, letterSpacing: 1 }}>{label}</span>
                  <span style={{ color: "#1C0A24", fontSize: 12, fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* ── Bottom nav ── */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #EDE8E0",
        display: "flex",
        padding: "10px 0 24px",
      }}>
        {[
          { key: "menu",    icon: "≡",  label: "MENU" },
          { key: "reserve", icon: "◎", label: "予約" },
          { key: "info",    icon: "📢", label: "INFO" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, background: "none", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            cursor: "pointer", padding: "6px 0",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 4,
              background: tab === t.key ? "#1C0A24" : "#F5F0F8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: tab === t.key ? 22 : 20,
              color: tab === t.key ? "#fff" : "#AAA",
              transition: "all 0.2s",
            }}>{t.icon}</div>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
              color: tab === t.key ? "#1C0A24" : "#CCC",
            }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}