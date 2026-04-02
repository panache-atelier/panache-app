import { useState, useCallback } from "react";

// ─────────────────────────────────────────────
// 定数
// ─────────────────────────────────────────────

const WALL_IMG = "data:image/jpeg;base64,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";

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

const ADMIN_PW = "0222";

const DEFAULT_NOTICES = [
  { id: 1, date: "2025.03.14", title: "春季休業のお知らせ", body: "3月20日(木)〜3月22日(土)は春季休業とさせていただきます。" },
];

// ─────────────────────────────────────────────
// 日付バリデーション（YYYY.MM.DD 形式）
// ─────────────────────────────────────────────
function isValidDate(str) {
  if (!str) return false;
  const match = str.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

// ─────────────────────────────────────────────
// ロゴ
// ─────────────────────────────────────────────
function PanacheLogo() {
  return (
    <svg width="260" height="104" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="24" rx="56" ry="22" fill="#5B1A70"/>
      <ellipse cx="60" cy="24" rx="56" ry="22" fill="url(#lg)"/>
      <defs>
        <radialGradient id="lg" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#8B3FA8"/>
          <stop offset="100%" stopColor="#3D0F50"/>
        </radialGradient>
      </defs>
      <text x="60" y="32" textAnchor="middle"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900" fontSize="21" fill="#F0D800" letterSpacing="3">
        Panache
      </text>
      <text x="60" y="9" textAnchor="middle"
        fontFamily="'Trebuchet MS', Arial, sans-serif"
        fontSize="6.5" fill="rgba(240,200,0,0.85)" letterSpacing="3">
        since 2002
      </text>
      <text x="60" y="45" textAnchor="middle"
        fontFamily="'Trebuchet MS', Arial, sans-serif"
        fontSize="6.5" fill="rgba(240,200,0,0.85)" letterSpacing="3">
        atelier
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────
// スタイルヘルパー
// ─────────────────────────────────────────────
const inputStyle = (hasError = false) => ({
  width: "100%",
  padding: "10px 12px",
  borderRadius: 6,
  border: `1.5px solid ${hasError ? "#E74C3C" : "#DDD"}`,
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  marginBottom: 8,
});

// ─────────────────────────────────────────────
// メインコンポーネント
// ─────────────────────────────────────────────
export default function SalonApp() {
  // ── タブ・メニュー状態
  const [tab, setTab] = useState("home");
  const [category, setCategory] = useState("すべて");
  const [contactPopup, setContactPopup] = useState(null);

  // ── お知らせデータ（useState で管理）
  const [notices, setNotices] = useState(DEFAULT_NOTICES);

  // ── 管理パネル状態
  const [showAdmin, setShowAdmin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ── 新規追加フォーム
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [formError, setFormError] = useState("");

  // ── 編集中のお知らせ
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  // ── 削除確認ダイアログ
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // ─────────────────────────────────────────
  // ハンドラ
  // ─────────────────────────────────────────

  const showSuccess = useCallback((msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 2500);
  }, []);

  const openAdmin = useCallback(() => {
    setShowAdmin(true);
    setPwInput("");
    setPwError(false);
    setSuccessMsg("");
    setFormError("");
    setEditingId(null);
    setConfirmDeleteId(null);
  }, []);

  const closeAdmin = useCallback(() => {
    setShowAdmin(false);
    setIsAuthed(false);
    setEditingId(null);
    setConfirmDeleteId(null);
    setNewDate("");
    setNewTitle("");
    setNewBody("");
    setFormError("");
    setSuccessMsg("");
  }, []);

  const handlePwSubmit = useCallback(() => {
    if (pwInput === ADMIN_PW) {
      setIsAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }, [pwInput]);

  // ── 追加バリデーション
  const handleAdd = useCallback(() => {
    setFormError("");
    if (!newDate.trim()) {
      setFormError("日付を入力してください");
      return;
    }
    if (!isValidDate(newDate.trim())) {
      setFormError("日付は YYYY.MM.DD 形式で入力してください（例: 2025.04.01）");
      return;
    }
    if (!newTitle.trim()) {
      setFormError("タイトルを入力してください");
      return;
    }
    if (!newBody.trim()) {
      setFormError("内容を入力してください");
      return;
    }
    const newNotice = {
      id: Date.now(),
      date: newDate.trim(),
      title: newTitle.trim(),
      body: newBody.trim(),
    };
    setNotices((prev) => [newNotice, ...prev]);
    setNewDate("");
    setNewTitle("");
    setNewBody("");
    showSuccess("✓ 追加しました");
  }, [newDate, newTitle, newBody, showSuccess]);

  // ── 編集開始（元の値をコピー）
  const startEdit = useCallback((notice) => {
    setEditingId(notice.id);
    setEditDate(notice.date);
    setEditTitle(notice.title);
    setEditBody(notice.body);
    setConfirmDeleteId(null);
  }, []);

  // ── 編集キャンセル（値をリセット）
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditDate("");
    setEditTitle("");
    setEditBody("");
  }, []);

  // ── 編集保存
  const saveEdit = useCallback(() => {
    if (!editTitle.trim()) return;
    setNotices((prev) =>
      prev.map((n) =>
        n.id === editingId
          ? { ...n, date: editDate.trim(), title: editTitle.trim(), body: editBody.trim() }
          : n
      )
    );
    setEditingId(null);
    showSuccess("✓ 保存しました");
  }, [editingId, editDate, editTitle, editBody, showSuccess]);

  // ── 削除確認ダイアログを開く
  const requestDelete = useCallback((id) => {
    setConfirmDeleteId(id);
    setEditingId(null); // 編集中であればキャンセル
  }, []);

  // ── 削除実行
  const confirmDelete = useCallback(() => {
    setNotices((prev) => prev.filter((n) => n.id !== confirmDeleteId));
    setConfirmDeleteId(null);
    showSuccess("✓ 削除しました");
  }, [confirmDeleteId, showSuccess]);

  // ── 削除キャンセル
  const cancelDelete = useCallback(() => {
    setConfirmDeleteId(null);
  }, []);

  // ─────────────────────────────────────────
  // フィルタリング
  // ─────────────────────────────────────────
  const filtered =
    category === "すべて"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((m) => m.category === category);

  // ─────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────
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
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .menu-card { transition:box-shadow .2s,transform .2s; animation:fadeUp .35s ease both; }
        .menu-card:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(91,26,112,.12)!important; }
        .action-btn { transition:transform .15s,box-shadow .15s; }
        .action-btn:active { transform:scale(.97); }
        .home-btn { transition:all .2s; }
        .home-btn:active { transform:scale(.97); }
      `}</style>

      {/* ────────── HOME ────────── */}
      {tab === "home" && (
        <div style={{
          minHeight: "100vh",
          background: "#1C0A24",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position:"absolute",inset:0,backgroundImage:`url(${WALL_IMG})`,backgroundSize:"cover",backgroundPosition:"center",opacity:.25 }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(160deg,rgba(28,10,36,.85) 0%,rgba(61,15,80,.75) 50%,rgba(28,10,36,.9) 100%)" }} />
          <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"rgba(123,45,139,.2)" }} />
          <div style={{ position:"absolute",bottom:-80,left:-40,width:240,height:240,borderRadius:"50%",background:"rgba(123,45,139,.15)" }} />

          <div style={{ animation:"fadeIn .6s ease both",marginBottom:50,position:"relative" }}>
            <PanacheLogo />
          </div>

          <div style={{ width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:12,position:"relative" }}>
            {[
              { key:"status",  icon:"🗓", label:"予約状況", sub:"混雑情報・空き確認" },
              { key:"menu",    icon:"✂️", label:"MENU",   sub:"料金表" },
              { key:"reserve", icon:"📞", label:"予約",    sub:"電話・SMS・メール" },
              { key:"info",    icon:"📢", label:"INFO",    sub:"お知らせ・臨時休業" },
            ].map((item, i) => (
              <button key={item.key} className="home-btn" onClick={() => setTab(item.key)} style={{
                display:"flex",alignItems:"center",gap:16,
                background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",
                borderRadius:14,padding:"14px 20px",cursor:"pointer",
                animation:`fadeIn .5s ${.15+i*.1}s ease both`,backdropFilter:"blur(10px)",
              }}>
                <div style={{ width:42,height:42,borderRadius:12,background:"rgba(123,45,139,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{item.icon}</div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ color:"#fff",fontSize:15,fontWeight:700,letterSpacing:2 }}>{item.label}</div>
                  <div style={{ color:"rgba(255,255,255,.4)",fontSize:11,marginTop:1 }}>{item.sub}</div>
                </div>
                <div style={{ marginLeft:"auto",color:"rgba(255,255,255,.25)",fontSize:20 }}>›</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ────────── 内ページ共通ヘッダー ────────── */}
      {tab !== "home" && (
        <>
          <div style={{ background:"#1C0A24",padding:"20px 24px 16px",display:"flex",alignItems:"center",gap:12 }}>
            <button onClick={() => setTab("home")} style={{ background:"rgba(255,255,255,.1)",border:"none",borderRadius:8,color:"#fff",fontSize:18,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>‹</button>
            <PanacheLogo />
          </div>

          {/* タブバー */}
          <div style={{ display:"flex",background:"#fff",borderBottom:"1px solid #EDE8E0" }}>
            {[
              { key:"status", label:"予約状況" },
              { key:"menu",   label:"MENU" },
              { key:"reserve",label:"予約" },
              { key:"info",   label:"INFO" },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                flex:1,padding:"15px 0",background:"none",border:"none",
                borderBottom:tab===t.key?"2px solid #7B2D8B":"2px solid transparent",
                color:tab===t.key?"#7B2D8B":"#AAA",
                fontSize:10,fontWeight:700,letterSpacing:1,cursor:"pointer",transition:"all .2s",
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{ padding:"24px 16px 100px" }}>

            {/* ────────── MENU ────────── */}
            {tab === "menu" && (
              <>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:22 }}>
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => setCategory(c)} style={{
                      padding:"7px 16px",borderRadius:2,border:"1px solid",
                      borderColor:category===c?"#7B2D8B":"#DDD",
                      background:category===c?"#7B2D8B":"transparent",
                      color:category===c?"#fff":"#888",
                      fontSize:11,fontWeight:600,letterSpacing:1,whiteSpace:"nowrap",cursor:"pointer",transition:"all .18s",
                    }}>{c}</button>
                  ))}
                </div>

                <div style={{ display:"flex",flexDirection:"column",gap:1 }}>
                  {filtered.map((item, idx) => (
                    <div key={item.id} className="menu-card" style={{
                      background:"#fff",padding:"18px 20px",
                      display:"flex",justifyContent:"space-between",alignItems:"center",
                      borderBottom:"1px solid #F0EBE5",animationDelay:`${idx*.04}s`,
                    }}>
                      <div style={{ display:"flex",alignItems:"center",gap:14,flex:1 }}>
                        <div style={{ width:4,height:44,borderRadius:2,background:CAT_STYLE[item.category]?.dot||"#888",flexShrink:0 }} />
                        <div>
                          <div style={{ color:"#1C0A24",fontSize:14,fontWeight:600,marginBottom:3 }}>{item.name}</div>
                          {item.desc && <div style={{ color:"#AAA",fontSize:11 }}>{item.desc}</div>}
                        </div>
                      </div>
                      <div style={{ color:"#1C0A24",fontSize:15,fontWeight:700,minWidth:80,textAlign:"right" }}>{item.price}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop:20,padding:"14px 18px",background:"#fff",borderLeft:"3px solid #7B2D8B",borderRadius:2,color:"#555",fontSize:11,fontWeight:700,lineHeight:1.7,letterSpacing:.3 }}>
                  価格は最低料金です。<br/>長さ・量により追加料金が発生致します。
                </div>
                <div style={{ textAlign:"center",marginTop:16,color:"#CCC",fontSize:10,letterSpacing:1 }}>ALL PRICES TAX INCLUDED</div>
              </>
            )}

            {/* ────────── INFO ────────── */}
            {tab === "info" && (
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                  <div style={{ color:"#AAA",fontSize:10,letterSpacing:3,fontWeight:700 }}>INFORMATION</div>
                  <button onClick={openAdmin} style={{
                    background:"none",border:"1px solid #DDD",borderRadius:4,
                    color:"#AAA",fontSize:10,padding:"5px 12px",cursor:"pointer",letterSpacing:1,
                  }}>⚙ 管理</button>
                </div>

                {notices.length === 0 ? (
                  <div style={{ textAlign:"center",color:"#CCC",fontSize:13,padding:"40px 0" }}>お知らせはありません</div>
                ) : (
                  notices.map((n) => (
                    <div key={n.id} style={{
                      background:"#fff",borderRadius:4,padding:"18px 20px",
                      borderLeft:"3px solid #7B2D8B",boxShadow:"0 2px 10px rgba(91,26,112,.07)",
                    }}>
                      <div style={{ color:"#AAA",fontSize:10,marginBottom:6 }}>{n.date}</div>
                      <div style={{ color:"#1C0A24",fontSize:14,fontWeight:700,marginBottom:6 }}>{n.title}</div>
                      <div style={{ color:"#666",fontSize:12,lineHeight:1.7 }}>{n.body}</div>
                    </div>
                  ))
                )}

                {/* ── パスワードモーダル ── */}
                {showAdmin && !isAuthed && (
                  <div style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:32 }} onClick={closeAdmin}>
                    <div style={{ background:"#fff",borderRadius:12,padding:"32px 28px",width:"100%",maxWidth:320 }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ fontSize:28,textAlign:"center",marginBottom:12 }}>🔐</div>
                      <div style={{ color:"#1C0A24",fontSize:15,fontWeight:700,textAlign:"center",marginBottom:20 }}>管理者パスワード</div>
                      <input
                        type="password"
                        value={pwInput}
                        onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                        onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()}
                        placeholder="パスワードを入力"
                        style={inputStyle(pwError)}
                      />
                      {pwError && (
                        <div style={{ color:"#E74C3C",fontSize:11,marginBottom:8 }}>パスワードが違います</div>
                      )}
                      <button onClick={handlePwSubmit} style={{ width:"100%",background:"#7B2D8B",color:"#fff",border:"none",borderRadius:6,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:10 }}>確認</button>
                      <button onClick={closeAdmin} style={{ width:"100%",background:"none",border:"1px solid #EEE",color:"#AAA",borderRadius:6,padding:"12px",fontSize:13,cursor:"pointer" }}>キャンセル</button>
                    </div>
                  </div>
                )}

                {/* ── 管理パネル（豪華バージョン） ── */}
                {showAdmin && isAuthed && (
                  <div
                    style={{
                      position:"fixed", inset:0, zIndex:200,
                      background:"rgba(28,10,36,0.85)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      padding:20
                    }}
                    onClick={closeAdmin}
                  >
                    <div
                      style={{
                        background:"#fff",
                        borderRadius:20,
                        padding:"32px 28px",
                        width:"100%",
                        maxWidth:400,
                        maxHeight:"88vh",
                        overflowY:"auto",
                        boxShadow:"0 25px 70px rgba(123,45,139,0.35)",
                        border:"1px solid rgba(123,45,139,0.15)"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* 豪華ヘッダー */}
                      <div style={{
                        display:"flex", alignItems:"center", gap:12,
                        marginBottom:24, paddingBottom:20,
                        borderBottom:"1px solid #F0E8F5"
                      }}>
                        <div style={{
                          width:52, height:52, borderRadius:"50%",
                          background:"linear-gradient(135deg, #7B2D8B, #4A1A5E)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:28, color:"#fff", flexShrink:0
                        }}>⚙️</div>
                        <div>
                          <div style={{ color:"#1C0A24", fontSize:18, fontWeight:700, letterSpacing:1 }}>お知らせ管理</div>
                          <div style={{ color:"#7B2D8B", fontSize:12, fontWeight:600 }}>Panache Atelier</div>
                        </div>
                      </div>

                      {/* セキュリティ警告 */}
                      <div style={{
                        background:"linear-gradient(90deg, #FFF7ED, #FEF3C7)",
                        border:"1px solid #FCD34D",
                        borderRadius:12,
                        padding:"14px 16px",
                        marginBottom:24,
                        display:"flex",
                        gap:12,
                        alignItems:"flex-start",
                      }}>
                        <span style={{ fontSize:20, flexShrink:0, color:"#D97706" }}>⚠️</span>
                        <div style={{ fontSize:11.5, lineHeight:1.65, color:"#92400E" }}>
                          <span style={{ fontWeight:700 }}>本番運用前に注意：</span><br/>
                          パスワードは現在フロントエンドのみです。<br/>
                          セキュリティ強化のため、Next.js API Routes + 環境変数認証への移行をおすすめします。
                        </div>
                      </div>

                      {/* 成功メッセージ */}
                      {successMsg && (
                        <div style={{
                          background:"#ECFDF5", border:"1px solid #6EE7B7",
                          borderRadius:10, padding:"12px 16px",
                          color:"#10B981", fontSize:13, fontWeight:600,
                          marginBottom:20, textAlign:"center"
                        }}>
                          {successMsg}
                        </div>
                      )}

                      {/* 新規追加フォーム */}
                      <div style={{ marginBottom:28 }}>
                        <div style={{ color:"#7B2D8B", fontSize:11, fontWeight:700, letterSpacing:2, marginBottom:12 }}>＋ 新規お知らせ追加</div>

                        <input
                          value={newDate}
                          onChange={(e) => { setNewDate(e.target.value); setFormError(""); }}
                          placeholder="日付（例：2025.04.01）"
                          style={inputStyle(!!formError && !newDate.trim())}
                        />
                        <input
                          value={newTitle}
                          onChange={(e) => { setNewTitle(e.target.value); setFormError(""); }}
                          placeholder="タイトルを入力"
                          style={inputStyle(!!formError && !newTitle.trim())}
                        />
                        <textarea
                          value={newBody}
                          onChange={(e) => { setNewBody(e.target.value); setFormError(""); }}
                          placeholder="お知らせの内容"
                          rows={4}
                          style={{ ...inputStyle(!!formError && !newBody.trim()), resize:"vertical", minHeight:90 }}
                        />

                        {formError && (
                          <div style={{ color:"#EF4444", fontSize:12, marginBottom:10, paddingLeft:4 }}>{formError}</div>
                        )}

                        <button
                          onClick={handleAdd}
                          style={{
                            width:"100%", background:"linear-gradient(90deg, #7B2D8B, #9F4BBA)",
                            color:"#fff", border:"none", borderRadius:12,
                            padding:"15px", fontSize:14, fontWeight:700,
                            cursor:"pointer", boxShadow:"0 4px 15px rgba(123,45,139,0.3)",
                            transition:"all 0.2s"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 6px 20px rgba(123,45,139,0.4)"}
                          onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 15px rgba(123,45,139,0.3)"}
                        >
                          お知らせを追加する
                        </button>
                      </div>

                      {/* 既存一覧 */}
                      {notices.length > 0 && (
                        <div>
                          <div style={{ color:"#7B2D8B", fontSize:11, fontWeight:700, letterSpacing:2, marginBottom:12 }}>登録済みお知らせ（{notices.length}件）</div>

                          {notices.map((n) => (
                            <div
                              key={n.id}
                              style={{ padding:"16px 0", borderBottom:"1px solid #F5F0F8" }}
                            >
                              {confirmDeleteId === n.id ? (
                                <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:12, padding:"16px" }}>
                                  <div style={{ color:"#B91C1C", fontSize:13, fontWeight:700 }}>本当に削除しますか？</div>
                                  <div style={{ color:"#666", fontSize:12, margin:"8px 0 16px" }}>「{n.title}」</div>
                                  <div style={{ display:"flex", gap:10 }}>
                                    <button onClick={confirmDelete} style={{ flex:1, background:"#EF4444", color:"#fff", border:"none", borderRadius:8, padding:"10px", fontWeight:700, cursor:"pointer" }}>削除する</button>
                                    <button onClick={cancelDelete} style={{ flex:1, background:"#fff", border:"1px solid #E5E7EB", borderRadius:8, padding:"10px", cursor:"pointer" }}>キャンセル</button>
                                  </div>
                                </div>
                              ) : editingId === n.id ? (
                                <div>
                                  <input value={editDate} onChange={(e) => { setEditDate(e.target.value); setFormError(""); }} placeholder="日付" style={inputStyle(!!formError && !editDate.trim())} />
                                  <input value={editTitle} onChange={(e) => { setEditTitle(e.target.value); setFormError(""); }} placeholder="タイトル" style={inputStyle(!!formError && !editTitle.trim())} />
                                  <textarea value={editBody} onChange={(e) => { setEditBody(e.target.value); setFormError(""); }} placeholder="内容" rows={3} style={{ ...inputStyle(!!formError && !editBody.trim()), resize:"vertical" }} />

                                  {formError && <div style={{ color:"#EF4444", fontSize:12, marginBottom:10 }}>{formError}</div>}

                                  <div style={{ display:"flex", gap:10 }}>
                                    <button onClick={saveEdit} style={{ flex:1, background:"#7B2D8B", color:"#fff", border:"none", borderRadius:8, padding:"11px", fontWeight:700, cursor:"pointer" }}>保存する</button>
                                    <button onClick={cancelEdit} style={{ flex:1, background:"#F3F4F6", border:"none", borderRadius:8, padding:"11px", color:"#555", cursor:"pointer" }}>キャンセル</button>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                                  <div style={{ flex:1 }}>
                                    <div style={{ color:"#9F4BBA", fontSize:11, fontWeight:600 }}>{n.date}</div>
                                    <div style={{ color:"#1C0A24", fontSize:14.5, fontWeight:700, margin:"4px 0 6px", lineHeight:1.3 }}>{n.title}</div>
                                    <div style={{ color:"#555", fontSize:12.5, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                                      {n.body}
                                    </div>
                                  </div>
                                  <div style={{ display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
                                    <button
                                      onClick={() => startEdit(n)}
                                      style={{ background:"#F3E8FF", color:"#7B2D8B", border:"none", borderRadius:6, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}
                                    >
                                      編集
                                    </button>
                                    <button
                                      onClick={() => requestDelete(n.id)}
                                      style={{ background:"#FEF2F2", color:"#E11D48", border:"none", borderRadius:6, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}
                                    >
                                      削除
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={closeAdmin}
                        style={{
                          width:"100%", marginTop:28, background:"#F8FAFC",
                          border:"1px solid #E2E8F0", color:"#64748B",
                          borderRadius:12, padding:"14px", fontSize:13.5, fontWeight:600, cursor:"pointer"
                        }}
                      >
                        パネルを閉じる
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ────────── RESERVE ────────── */}
            {tab === "reserve" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <div style={{ color:"#AAA",fontSize:10,letterSpacing:3,fontWeight:700,marginBottom:-4 }}>RESERVATION</div>

                {[
                  { key:"tel",   icon:"📞", label:"CALL",  val:"0466(34)6713",                    href:"tel:0466346713" },
                  { key:"sms",   icon:"💬", label:"SMS",   val:"080-5177-7095",                   href:"sms:08051777095" },
                  { key:"email", icon:"✉️", label:"EMAIL", val:"panache2002atelier44@ezweb.ne.jp", href:"mailto:panache2002atelier44@ezweb.ne.jp" },
                ].map((item) => (
                  <button key={item.key} onClick={() => setContactPopup(item.key)} className="action-btn" style={{
                    display:"flex",alignItems:"center",gap:18,
                    background:"#fff",borderRadius:4,padding:"22px 24px",
                    border:"1px solid #E8E0F0",width:"100%",cursor:"pointer",
                    boxShadow:"0 2px 12px rgba(91,26,112,.07)",
                  }}>
                    <div style={{ width:46,height:46,borderRadius:"50%",background:"#F3E8FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{item.icon}</div>
                    <div style={{ textAlign:"left",overflow:"hidden" }}>
                      <div style={{ color:"#AAA",fontSize:10,letterSpacing:2,marginBottom:4 }}>{item.label}</div>
                      <div style={{ color:"#1C0A24",fontSize:item.key==="email"?12:20,fontWeight:700,letterSpacing:item.key==="email"?0:1,wordBreak:"break-all" }}>{item.val}</div>
                      <div style={{ color:"#CCC",fontSize:10,marginTop:3 }}>タップで確認</div>
                    </div>
                  </button>
                ))}

                {/* 連絡先確認ポップアップ */}
                {contactPopup && (
                  <div style={{ position:"fixed",inset:0,zIndex:100,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:32 }} onClick={() => setContactPopup(null)}>
                    <div style={{ background:"#fff",borderRadius:12,padding:"32px 28px",width:"100%",maxWidth:340,boxShadow:"0 20px 60px rgba(0,0,0,.25)" }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ fontSize:36,textAlign:"center",marginBottom:16 }}>
                        {contactPopup==="tel" ? "📞" : contactPopup==="sms" ? "💬" : "✉️"}
                      </div>
                      <div style={{ color:"#1C0A24",fontSize:16,fontWeight:700,textAlign:"center",marginBottom:8 }}>
                        {contactPopup==="tel" && "電話で予約しますか？"}
                        {contactPopup==="sms" && "SMSで予約しますか？"}
                        {contactPopup==="email" && "メールで予約しますか？"}
                      </div>
                      <div style={{ color:"#AAA",fontSize:12,textAlign:"center",marginBottom:28,lineHeight:1.7 }}>
                        {contactPopup==="tel" && "0466(34)6713"}
                        {contactPopup==="sms" && "080-5177-7095"}
                        {contactPopup==="email" && "panache2002atelier44@ezweb.ne.jp"}
                      </div>
                      <a
                        href={contactPopup==="tel" ? "tel:0466346713" : contactPopup==="sms" ? "sms:08051777095" : "mailto:panache2002atelier44@ezweb.ne.jp"}
                        onClick={() => setContactPopup(null)}
                        style={{ display:"block",background:"#7B2D8B",color:"#fff",textAlign:"center",padding:"14px",borderRadius:6,fontWeight:700,fontSize:14,textDecoration:"none",marginBottom:12,letterSpacing:1 }}>
                        {contactPopup==="tel" ? "電話する" : contactPopup==="sms" ? "SMSを送る" : "メールを送る"}
                      </a>
                      <button onClick={() => setContactPopup(null)} style={{ display:"block",width:"100%",background:"none",border:"1px solid #EEE",color:"#AAA",padding:"13px",borderRadius:6,fontWeight:600,fontSize:13,cursor:"pointer" }}>
                        キャンセル
                      </button>
                    </div>
                  </div>
                )}

                <div style={{ display:"flex",alignItems:"center",gap:12,margin:"4px 0" }}>
                  <div style={{ flex:1,height:1,background:"#EDE8E0" }} />
                  <span style={{ color:"#CCC",fontSize:10,letterSpacing:2 }}>SALON INFO</span>
                  <div style={{ flex:1,height:1,background:"#EDE8E0" }} />
                </div>

                <div style={{ background:"#fff",borderRadius:4,padding:"20px 24px",border:"1px solid #EDE8E0" }}>
                  {[
                    ["営業時間", "9:00 〜 19:00"],
                    ["定休日",   "毎週火曜日"],
                    ["駐車場",   "2台"],
                    ["Web",      "www.panache-atelier.com"],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #F5F0EC" }}>
                      <span style={{ color:"#AAA",fontSize:11,letterSpacing:1 }}>{label}</span>
                      <span style={{ color:"#1C0A24",fontSize:12,fontWeight:600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────── STATUS ────────── */}
            {tab === "status" && (
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                <div style={{ color:"#AAA",fontSize:10,letterSpacing:3,fontWeight:700 }}>RESERVATION STATUS</div>
                <div style={{ background:"#fff",borderRadius:12,padding:"32px 24px",border:"1px solid #EDE8E0",textAlign:"center",boxShadow:"0 4px 20px rgba(91,26,112,.08)" }}>
                  <div style={{ fontSize:48,marginBottom:16 }}>🗓</div>
                  <div style={{ color:"#1C0A24",fontSize:16,fontWeight:700,marginBottom:10 }}>予約状況・混雑情報</div>
                  <div style={{ color:"#AAA",fontSize:12,marginBottom:28,lineHeight:1.8 }}>
                    現在の予約状況と混雑情報を<br/>外部サイトでご確認いただけます。
                  </div>
                  <a
                    href="https://panache-atelier.com/reservation/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:"block",background:"#7B2D8B",color:"#fff",textAlign:"center",padding:"16px",borderRadius:8,fontWeight:700,fontSize:15,textDecoration:"none",letterSpacing:1,boxShadow:"0 4px 16px rgba(123,45,139,.4)" }}>
                    予約状況を確認する →
                  </a>
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* ────────── ボトムナビ ────────── */}
      {tab !== "home" && (
        <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(255,255,255,.97)",backdropFilter:"blur(16px)",borderTop:"1px solid #EDE8E0",display:"flex",padding:"10px 0 24px" }}>
          {[
            { key:"status",  icon:"🗓", label:"予約状況" },
            { key:"menu",    icon:"≡",  label:"MENU" },
            { key:"reserve", icon:"◎",  label:"予約" },
            { key:"info",    icon:"📢", label:"INFO" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ flex:1,background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"6px 0" }}>
              <div style={{ width:44,height:44,borderRadius:4,background:tab===t.key?"#1C0A24":"#F5F0F8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:tab===t.key?22:20,color:tab===t.key?"#fff":"#AAA",transition:"all .2s" }}>{t.icon}</div>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:1.5,color:tab===t.key?"#1C0A24":"#CCC" }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
