/**
 * MapleLand Team Farming Tracker - Core Logic
 * Handles interactive tracking for:
 * 1. Mohamed (محمد)
 * 2. Tant Amy (طنط ايمي)
 * 3. Abdelrahman (عبدالرحمن)
 * 4. Master Grand Total Profile (المحصلة الكلية)
 */

// 1. COMPREHENSIVE ITEM CATALOG
const ITEM_CATALOG = [
    // Pixie Drops
    { id: 'sunpiece', nameKo: '러스터픽시의 태양조각', nameAr: 'قطع شمس لاستر بيكسي', cat: 'pixie', price: 270, priceType: 'market', icon: 'assets/icon_sunpiece.png', badge: 'قمة المزاد 270' },
    { id: 'moonpiece', nameKo: '루나픽시의 달조각', nameAr: 'قطع قمر لونا بيكسي', cat: 'pixie', price: 350, priceType: 'market', icon: 'assets/icon_moonpiece.png', badge: 'المزاد' },
    { id: 'starpiece', nameKo: '스타픽시의 별조각', nameAr: 'قطع نجوم ستار بيكسي', cat: 'pixie', price: 1024, priceType: 'market', icon: 'assets/icon_starpiece.png', badge: 'المزاد 1,024' },

    // Ores & Gems (including Red Gem / Garnet requested explicitly)
    { id: 'garnet', nameKo: '가넷의 원석', nameAr: 'خام الجارنت (الجواهر الحمرا)', cat: 'ores', price: 175, priceType: 'market', icon: 'assets/icon_garnet_ore.png', badge: 'المزاد' },
    { id: 'power_crystal', nameKo: '힘의 크리스탈 원석', nameAr: 'خام كريستال القوة', cat: 'ores', price: 15300, priceType: 'market', icon: 'assets/icon_power_crystal_ore.png', badge: 'المزاد 15.3K' },
    { id: 'magic_stone', nameKo: '마법의 돌', nameAr: 'حجر السحر (Magic Stone)', cat: 'ores', price: 3000, priceType: 'market', icon: 'assets/icon_magic_stone.png', badge: 'المزاد 3K' },
    { id: 'dark_crystal', nameKo: '어둠의 크리스탈 원석', nameAr: 'خام الكريستال المظلم', cat: 'ores', price: 3500, priceType: 'npc', icon: 'assets/icon_dark_crystal_ore.png', badge: 'الـ NPC 3.5K' },
    { id: 'wisdom_crystal', nameKo: '지혜의 크리스탈 원석', nameAr: 'خام كريستال الحكمة', cat: 'ores', price: 2000, priceType: 'npc', icon: 'assets/icon_wisdom_crystal_ore.png', badge: 'الـ NPC 2K' },
    { id: 'mithril', nameKo: '미스릴의 원석', nameAr: 'خام الميثريل', cat: 'ores', price: 1999, priceType: 'market', icon: 'assets/icon_mithril_ore.png', badge: 'المزاد' },
    { id: 'gold', nameKo: '금의 원석', nameAr: 'خام الذهب', cat: 'ores', price: 500, priceType: 'market', icon: 'assets/icon_gold_ore.png', badge: 'المزاد' },
    { id: 'silver', nameKo: '은의 원석', nameAr: 'خام الفضة', cat: 'ores', price: 203, priceType: 'market', icon: 'assets/icon_silver_ore.png', badge: 'المزاد' },
    { id: 'aquamarine', nameKo: '아쿠아마린의 원석', nameAr: 'خام الأكوامارين', cat: 'ores', price: 200, priceType: 'market', icon: 'assets/icon_aquamarine_ore.png', badge: 'المزاد' },
    { id: 'sapphire', nameKo: '사파이어의 원석', nameAr: 'خام الياقوت الأزرق (سافاير)', cat: 'ores', price: 150, priceType: 'npc', icon: 'assets/icon_sapphire_ore.png', badge: 'الـ NPC 150' },
    { id: 'amethyst', nameKo: '자수정의 원석', nameAr: 'خام الجمشت', cat: 'ores', price: 150, priceType: 'market', icon: 'assets/icon_amethyst_ore.png', badge: 'المزاد' },

    // Drops & ETC
    { id: 'nependeath_seed', nameKo: '다크 네펜데스의 씨앗', nameAr: 'بذور دارك نيبينديث', cat: 'etc', price: 680, priceType: 'market', icon: 'assets/icon_dark_nependeath_seed.png', badge: 'المزاد 680' },
    { id: 'fairy_antenna', nameKo: '페어리의 더듬이', nameAr: 'قرون استشعار الجنية', cat: 'etc', price: 635, priceType: 'market', icon: 'assets/icon_fairy_antenna.png', badge: 'المزاد 635' },
    { id: 'helmet_stimulator', nameKo: '투구 제작의 촉진제', nameAr: 'مسرع صناعة الخوذة', cat: 'etc', price: 340, priceType: 'market', icon: 'assets/icon_helmet_stimulator.png', badge: 'المزاد 340' },
    { id: 'soft_feather', nameKo: '부드러운 깃털', nameAr: 'ريش ناعم', cat: 'etc', price: 50, priceType: 'npc', icon: 'assets/icon_soft_feather.png', badge: 'الـ NPC 50' },
    { id: 'stiff_feather', nameKo: '뻣뻣한 깃털', nameAr: 'ريش خشن', cat: 'etc', price: 25, priceType: 'npc', icon: 'assets/icon_stiff_feather.png', badge: 'الـ NPC 25' },

    // Rare Scrolls
    { id: 'shoe_jump_scroll', nameKo: '신발 점프력 주문서 10%', nameAr: 'لفافة قفز أحذية 10% (DEX +3)', cat: 'scrolls', price: 1640000, priceType: 'market', icon: 'assets/icon_shoe_jump_scroll.png', badge: 'المزاد 1.64M' },
    { id: 'cape_str_scroll', nameKo: '망토 힘 주문서 100%', nameAr: 'لفافة قوة عباءة 100% (STR +1)', cat: 'scrolls', price: 780000, priceType: 'market', icon: 'assets/icon_cape_str_scroll.png', badge: 'المزاد 780K' },
    { id: 'shield_def_scroll', nameKo: '방패 방어력 주문서 10%', nameAr: 'لفافة دفاع درع 10%', cat: 'scrolls', price: 495000, priceType: 'market', icon: 'assets/icon_shield_def_scroll.png', badge: 'المزاد 495K' },
    { id: 'cape_int_scroll', nameKo: '망토 지력 주문서 10%', nameAr: 'لفافة ذكاء عباءة 10% (INT +3)', cat: 'scrolls', price: 465000, priceType: 'market', icon: 'assets/icon_cape_int_scroll.png', badge: 'المزاد 465K' },

    // Special Gear
    { id: 'steel_manut', nameKo: '스틸 마누트', nameAr: 'قفاز الساحر ليفل 60 (Steel Manut)', cat: 'gear', price: 350000, priceType: 'market', icon: 'assets/gear_steel_manut.png', badge: 'المزاد 350K' },

    // Direct Cash Meso
    { id: 'raw_meso', nameKo: '순수 메소', nameAr: 'كاش ميسو نقد مباشر (Pure Meso)', cat: 'meso', price: 1, priceType: 'meso', icon: 'assets/icon_gold_ore.png', badge: '1:1 ميسو' }
];

// 2. TEAM MEMBERS DEFINITION
const TEAM_MEMBERS = [
    { id: 'mohamed', name: 'محمد', role: 'نايت لورد (Night Lord)', color: '#38bdf8', avatar: '🥷', themeClass: 'theme-mohamed' },
    { id: 'amy', name: 'طنط ايمي', role: 'فارمر محترف (Lead Farmer)', color: '#ec4899', avatar: '🧙‍♀️', themeClass: 'theme-amy' },
    { id: 'abdo', name: 'عبدالرحمن', role: 'خبير التجميع (Loot Master)', color: '#f97316', avatar: '🏹', themeClass: 'theme-abdo' }
];

// 3. APPLICATION STATE
let appState = {
    members: {
        mohamed: { items: {} },
        amy: { items: {} },
        abdo: { items: {} }
    },
    vault: { items: {} },
    accountInventory: {},
    shiftLog: [],
    salesLog: [],
    activeTab: 'mohamed',
    activeCategory: 'all',
    searchQuery: '',
    isMasterTableOpen: false
};

function getMember(memberId) {
    if (memberId === 'vault') {
        return { id: 'vault', name: 'المخزن العام', role: 'رصيد مستقل عام', color: '#eab308', avatar: '🏛️', themeClass: 'theme-vault' };
    }
    return TEAM_MEMBERS.find(m => m.id === memberId) || { id: memberId, name: memberId, avatar: '👤' };
}

function getAccountBagQty(itemId) {
    if (appState.accountInventory && appState.accountInventory[itemId] !== undefined) {
        return Number(appState.accountInventory[itemId]) || 0;
    }
    let sum = 0;
    TEAM_MEMBERS.forEach(m => {
        sum += (appState.members[m.id]?.items[itemId] || 0);
    });
    sum += (appState.vault?.items?.[itemId] || 0);
    return sum;
}

// 4. FORMATTING UTILITIES
function formatNumber(num) {
    if (!num || isNaN(num)) return '0';
    return Number(num).toLocaleString('en-US');
}

function formatMesoCompact(num) {
    if (!num || isNaN(num)) return '0 ميسو';
    num = Number(num);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M ميسو';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K ميسو';
    }
    return formatNumber(num) + ' ميسو';
}

let currentSellItemId = null;

// SMART PRICING: Calculate actual weighted average from past salesLog or fallback to initial catalog price
function getSmartItemPrice(itemId) {
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!itemObj) return 0;
    if (itemObj.id === 'raw_meso') return 1;

    const sales = (appState.salesLog || []).filter(s => s.itemId === itemId && s.soldQty > 0 && s.totalRevenue > 0);
    if (sales.length > 0) {
        let totalRev = 0;
        let totalQ = 0;
        sales.forEach(s => {
            totalRev += (Number(s.totalRevenue) || 0);
            totalQ += (Number(s.soldQty) || 0);
        });
        if (totalQ > 0) {
            return Math.round(totalRev / totalQ);
        }
    }

    return itemObj.price || 0;
}

function getItemPriceMeta(itemId) {
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!itemObj) return { price: 0, isActual: false, salesCount: 0, totalSoldQty: 0 };
    if (itemObj.id === 'raw_meso') return { price: 1, isActual: true, salesCount: 1, totalSoldQty: 0 };

    const sales = (appState.salesLog || []).filter(s => s.itemId === itemId && s.soldQty > 0 && s.totalRevenue > 0);
    if (sales.length > 0) {
        let totalRev = 0;
        let totalQ = 0;
        sales.forEach(s => {
            totalRev += (Number(s.totalRevenue) || 0);
            totalQ += (Number(s.soldQty) || 0);
        });
        const avg = totalQ > 0 ? Math.round(totalRev / totalQ) : (itemObj.price || 0);
        return {
            price: avg,
            isActual: true,
            salesCount: sales.length,
            totalSoldQty: totalQ
        };
    }

    return {
        price: itemObj.price || 0,
        isActual: false,
        salesCount: 0,
        totalSoldQty: 0
    };
}

function applySuggestedPrice(price) {
    const unitInput = document.getElementById('sell-input-unit-price');
    if (unitInput) {
        unitInput.value = price;
        onSellInputsChange('unit');
    }
}

function applyMemberSuggestedPrice(price) {
    const unitInput = document.getElementById('member-sell-input-unit-price');
    if (unitInput) {
        unitInput.value = price;
        onMemberSellInputsChange('unit');
    }
}

// 5. INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Connect to Database (Firebase or Local)
    await initDatabase();

    // 2. Render all profile panels & side-by-side view
    renderMemberPanels();
    renderAllMembersView();

    // 3. Recalculate and update master & member stats
    updateCalculations();

    // 4. Setup listeners
    setupEventListeners();
});

async function initDatabase() {
    updateSyncBadgeUI('connecting');
    const res = await window.teamDb.initFirebase();

    const initial = await window.teamDb.loadInitial();
    if (initial && initial.data) {
        if (initial.data.members) appState.members = initial.data.members;
        if (initial.data.vault) appState.vault = initial.data.vault;
        if (initial.data.accountInventory) appState.accountInventory = initial.data.accountInventory;
        if (initial.data.shiftLog) appState.shiftLog = initial.data.shiftLog;
        if (initial.data.salesLog) appState.salesLog = initial.data.salesLog;
    }

    // Subscribe to incoming realtime changes (from other players)
    window.teamDb.onDataChange((incomingData, source) => {
        if (incomingData) {
            if (incomingData.members) appState.members = incomingData.members;
            if (incomingData.vault) appState.vault = incomingData.vault;
            if (incomingData.accountInventory) appState.accountInventory = incomingData.accountInventory;
            if (incomingData.shiftLog) appState.shiftLog = incomingData.shiftLog;
            if (incomingData.salesLog) appState.salesLog = incomingData.salesLog;
            refreshAllUI();
            if (source === 'cloud') {
                showToast("🔄 تم استلام تحديث جديد من الفريق سحابياً!", "cloud");
            }
        }
    });

    updateSyncBadgeUI(window.teamDb.isCloudConnected ? 'cloud' : 'local');
}

function updateSyncBadgeUI(status) {
    const pill = document.getElementById('sync-status-badge');
    if (!pill) return;

    pill.className = 'sync-status-pill ' + status;
    if (status === 'cloud') {
        pill.innerHTML = `🟢 سحابي متصل (Live Sync)`;
    } else if (status === 'connecting') {
        pill.innerHTML = `🟡 جاري الاتصال...`;
    } else {
        pill.innerHTML = `💾 تخزين محلي (Offline Mode)`;
    }
}

// 6. RENDER MEMBER PANELS (CARDS FOR MOHAMED, TANT AMY, ABDELRAHMAN)
function renderMemberPanels() {
    const container = document.getElementById('member-panels-container');
    if (!container) return;

    container.innerHTML = '';

    TEAM_MEMBERS.forEach(member => {
        const panel = document.createElement('div');
        panel.className = `member-profile-panel ${member.themeClass} ${appState.activeTab === member.id ? 'active' : ''}`;
        panel.id = `panel-${member.id}`;

        panel.innerHTML = `
            <!-- MEMBER HEADER -->
            <div class="member-card-header">
                <div class="member-info-left">
                    <div class="member-avatar-lg">${member.avatar}</div>
                    <div class="member-name-box">
                        <h3>بروفايل: ${member.name}</h3>
                        <span class="member-role-badge">🎮 ${member.role}</span>
                    </div>
                </div>

                <div class="member-stats-strip">
                    <div class="member-stat-strip-item">
                        <span class="member-stat-strip-label">📦 إجمالي الدروبات المجمعة:</span>
                        <span class="member-stat-strip-val val-items" id="member-items-${member.id}">0 قطعة</span>
                    </div>
                    <div class="member-stat-strip-item">
                        <span class="member-stat-strip-label">💰 إجمالي ثروة الميسو المقدرة:</span>
                        <span class="member-stat-strip-val val-meso" id="member-meso-${member.id}">0 ميسو</span>
                    </div>
                </div>

                <div class="member-actions">
                    <button class="btn-member-action" style="background: linear-gradient(135deg, #0284c7, #0284c7); color: #fff; border: none; font-weight: 800;" onclick="openFullShiftModal('${member.id}')" title="جرد الشنطة بعد انتهاء جلسة اللعب لجميع العناصر">
                        ✨ جرد الشنطة السريع
                    </button>
                    <button class="btn-member-action" onclick="openShiftHistoryModal()" title="سجل العمليات السابقة">
                        📜 سجل الورديات
                    </button>
                    <button class="btn-member-action reset" onclick="confirmResetMember('${member.id}')">
                        🗑️ تصفير
                    </button>
                    <button class="btn-member-action" onclick="copyMemberReport('${member.id}')">
                        📋 تقرير
                    </button>
                </div>
            </div>

            <!-- CONTROLS & FILTERS -->
            <div class="tracker-controls-bar">
                <div class="search-wrapper">
                    <input type="text" class="tracker-search-input" placeholder="🔍 ابحث في عناصر ${member.name} (مثال: شمس، جارنت، كريستال...)" oninput="handleSearch(this.value, '${member.id}')">
                </div>

                <div class="category-filter-chips">
                    <button class="filter-chip active" onclick="setCategoryFilter('all', '${member.id}', this)">الكل</button>
                    <button class="filter-chip" onclick="setCategoryFilter('pixie', '${member.id}', this)">قطع لاستر ☀️</button>
                    <button class="filter-chip" onclick="setCategoryFilter('ores', '${member.id}', this)">خامات وجواهر 💎</button>
                    <button class="filter-chip" onclick="setCategoryFilter('scrolls', '${member.id}', this)">لفائف نادرة 📜</button>
                    <button class="filter-chip" onclick="setCategoryFilter('etc', '${member.id}', this)">دروبات متنوعة 🎒</button>
                    <button class="filter-chip" onclick="setCategoryFilter('gear', '${member.id}', this)">معدات 🛡️</button>
                </div>
            </div>

            <!-- ITEMS GRID -->
            <div class="items-grid" id="grid-${member.id}">
                ${renderItemCards(member.id)}
            </div>
        `;

        container.appendChild(panel);
    });

    // 2B. RENDER THE VAULT (المخزن العام المشترك المستقل) PANEL
    const vaultPanel = document.createElement('div');
    vaultPanel.className = `member-profile-panel theme-vault ${appState.activeTab === 'vault' ? 'active' : ''}`;
    vaultPanel.id = 'panel-vault';

    vaultPanel.innerHTML = `
        <!-- SMART VAULT DASHBOARD HEADER -->
        <div class="vault-smart-header-card">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div class="member-info-left">
                    <div class="member-avatar-lg" style="background: rgba(234, 179, 8, 0.2); border: 2px solid #eab308; font-size: 2.2rem; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 14px;">🏛️</div>
                    <div class="member-name-box">
                        <h3 style="font-size: 1.4rem; color: #facc15; display: flex; align-items: center; gap: 8px;">
                            <span>المخزن الذكي المشترك</span>
                            <span style="font-size: 0.8rem; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); padding: 2px 10px; border-radius: 20px; font-weight: 700;">
                                ✨ تسعير ذكي وتجميع تلقائي
                            </span>
                        </h3>
                        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 4px;">
                            تجميع إجمالي لدروبات جميع أفراد الفريق (محمد + طنط ايمي + عبدالرحمن + المخزن) مع حساب الفلوس المتوقعة ونصيب كل عضو بناءً على متوسطات أسعار البيع الفعلية!
                        </p>
                    </div>
                </div>

                <div class="member-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-member-action" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 900; border: none; padding: 8px 16px; border-radius: 10px;" onclick="openUniversalSellModal()" title="بيع أي عنصر من المخزن الكلي وتحديد سعر البيع">
                        💰 بيع وتحديد السعر
                    </button>
                    <button class="btn-member-action" style="background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 10px;" onclick="openVaultBulkAddModal()" title="إضافة سريعة أو توريد عناصر للمخزن العام">
                        📥 توريد للمخزن
                    </button>
                    <button class="btn-member-action" style="border-radius: 10px;" onclick="copyVaultReport()" title="نسخ تقرير المخزن الشامل">
                        📋 تقرير
                    </button>
                </div>
            </div>

            <!-- VAULT AGGREGATE STATS BANNER -->
            <div class="vault-stats-banner">
                <div class="vault-stat-item-box">
                    <span class="stat-icon">📦</span>
                    <div>
                        <div class="stat-label">إجمالي قطع المخزن الكلي</div>
                        <div class="stat-value" id="vault-stat-total-items" style="color: #38bdf8;">0 قطعة</div>
                    </div>
                </div>
                <div class="vault-stat-item-box" style="border-color: rgba(16, 185, 129, 0.4); background: rgba(6, 78, 59, 0.2);">
                    <span class="stat-icon">💰</span>
                    <div>
                        <div class="stat-label">إجمالي الفلوس المتوقعة (متوسطات البيع الذكية ✨)</div>
                        <div class="stat-value" id="vault-stat-expected-meso" style="color: #34d399;">0 ميسو</div>
                    </div>
                </div>
                <div class="vault-stat-item-box" style="border-color: rgba(234, 179, 8, 0.4); background: rgba(234, 179, 8, 0.1);">
                    <span class="stat-icon">💵</span>
                    <div>
                        <div class="stat-label">رصيد الكاش المحصل حالياً من البيع</div>
                        <div class="stat-value" id="vault-stat-actual-cash" style="color: var(--accent-gold);">0 ميسو</div>
                    </div>
                </div>
            </div>

            <!-- MEMBERS EXPECTED PAYOUT SHARE SECTION -->
            <div class="vault-members-payout-section">
                <div class="vault-members-payout-title">
                    <span>👥</span>
                    <span>التوزيع العادل التقديري - أرباح ونصيب كل عضو المتوقع عند بيع المخزن:</span>
                </div>
                <div class="vault-payout-grid" id="vault-members-payout-grid">
                    <!-- Populated dynamically via updateCalculations() -->
                </div>
            </div>
        </div>

        <!-- CONTROLS & FILTERS -->
        <div class="tracker-controls-bar">
            <div class="search-wrapper">
                <input type="text" class="tracker-search-input" placeholder="🔍 ابحث في عناصر المخزن الذكي (شمس، جارنت، كريستال...)" oninput="handleSearch(this.value, 'vault')">
            </div>

            <div class="category-filter-chips">
                <button class="filter-chip active" onclick="setCategoryFilter('all', 'vault', this)">الكل</button>
                <button class="filter-chip" onclick="setCategoryFilter('pixie', 'vault', this)">قطع لاستر ☀️</button>
                <button class="filter-chip" onclick="setCategoryFilter('ores', 'vault', this)">خامات وجواهر 💎</button>
                <button class="filter-chip" onclick="setCategoryFilter('scrolls', 'vault', this)">لفائف نادرة 📜</button>
                <button class="filter-chip" onclick="setCategoryFilter('etc', 'vault', this)">دروبات متنوعة 🎒</button>
                <button class="filter-chip" onclick="setCategoryFilter('gear', 'vault', this)">معدات 🛡️</button>
            </div>
        </div>

        <!-- ITEMS GRID -->
        <div class="items-grid" id="grid-vault">
            ${renderVaultItemCards()}
        </div>
    `;

    container.appendChild(vaultPanel);
}

function renderItemCards(memberId) {
    const member = getMember(memberId);
    const memberItems = appState.members[memberId]?.items || {};
    const query = appState.searchQuery.toLowerCase().trim();
    const cat = appState.activeCategory;

    return ITEM_CATALOG.map(item => {
        // Filter by category
        if (cat !== 'all' && item.cat !== cat) return '';

        // Filter by search
        if (query) {
            const matchKo = item.nameKo.toLowerCase().includes(query);
            const matchAr = item.nameAr.toLowerCase().includes(query);
            if (!matchKo && !matchAr) return '';
        }

        const memberQty = memberItems[item.id] || 0;
        const bagQty = getAccountBagQty(item.id);
        const hasQty = memberQty > 0;

        return `
            <div class="tracker-item-card ${hasQty ? 'has-qty' : ''}" id="card-${memberId}-${item.id}">
                <div class="item-card-top">
                    <div class="item-thumb-box">
                        <img src="${item.icon}" alt="${item.nameKo}" loading="lazy">
                    </div>
                    <div class="item-card-titles">
                        <span class="item-korean-name">${item.nameKo}</span>
                        <span class="item-arabic-name">${item.nameAr}</span>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                            <span class="item-price-chip ${item.priceType}">
                                🏷️ ${item.badge}
                            </span>
                            <span class="account-bag-badge" id="bag-badge-${memberId}-${item.id}" title="رصيد شنطة اللعبة المشتركة الآن">
                                🎒 في الشنطة: <strong id="bag-val-${item.id}">${formatNumber(bagQty)}</strong>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Member share pill -->
                <div class="member-share-pill">
                    <span>👤 ما جمعه ${member.name}:</span>
                    <strong id="share-val-${memberId}-${item.id}">${formatNumber(memberQty)} قطعة</strong>
                </div>

                <!-- Smart Shift Box -->
                <div class="smart-shift-box">
                    <div class="smart-shift-label">
                        <span>🎯 جرد نهاية اللعب (العدد في الشنطة الآن):</span>
                    </div>
                    <div class="smart-shift-input-group">
                        <input type="number" min="0" class="shift-bag-input" id="shift-input-${memberId}-${item.id}" placeholder="العدد في الشنطة..." oninput="previewShiftDelta('${memberId}', '${item.id}', this.value)" onkeydown="if(event.key==='Enter') commitShiftDelta('${memberId}', '${item.id}')">
                        <button class="btn-shift-commit" onclick="commitShiftDelta('${memberId}', '${item.id}')" title="احسب ما تم تجميعه في الوردية">
                            حساب وإضافة ✨
                        </button>
                    </div>
                    <div class="shift-preview-hint" id="shift-hint-${memberId}-${item.id}"></div>
                </div>

                <!-- Actions Row: Quick Fix & Manual Controls toggle -->
                <div class="card-actions-row">
                    ${item.id !== 'raw_meso' ? `<button class="btn-card-sell" onclick="openMemberSellModal('${memberId}', '${item.id}')" title="بيع كمية ${member.name} وإيداع الميسو كاش في حسابه فقط">💰 بيع لحساب ${member.name}</button>` : ''}
                    <button class="btn-card-fix" onclick="openItemFixModal('${memberId}', '${item.id}')" title="تعديل مباشر في حال حدث خطأ أو كتبت رقم غلط">
                        ✏️ تصحيح خطأ
                    </button>
                    <button class="btn-toggle-manual" onclick="toggleManualWrap('${memberId}', '${item.id}')">
                        ➕ أزرار (+/-)
                    </button>
                    <span class="card-total-meso" id="meso-${memberId}-${item.id}" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-gold);">
                        ${item.id === 'raw_meso' ? `${formatNumber(memberQty)} ميسو كاش` : `${formatNumber(memberQty)} قطعة`}
                    </span>
                </div>

                <!-- Collapsible Manual Stepper / Quick Add -->
                <div class="manual-stepper-wrap" id="manual-wrap-${memberId}-${item.id}">
                    <div class="stepper-row">
                        <button class="btn-stepper" onclick="modifyQty('${memberId}', '${item.id}', -1)">−</button>
                        <input type="number" min="0" class="stepper-input" id="input-${memberId}-${item.id}" value="${memberQty}" onchange="setDirectQty('${memberId}', '${item.id}', this.value)" oninput="setDirectQty('${memberId}', '${item.id}', this.value)">
                        <button class="btn-stepper" onclick="modifyQty('${memberId}', '${item.id}', 1)">+</button>
                    </div>
                    <div class="quick-add-row">
                        <button class="btn-quick-add" onclick="modifyQty('${memberId}', '${item.id}', 5)">+5</button>
                        <button class="btn-quick-add" onclick="modifyQty('${memberId}', '${item.id}', 10)">+10</button>
                        <button class="btn-quick-add" onclick="modifyQty('${memberId}', '${item.id}', 50)">+50</button>
                        <button class="btn-quick-add" onclick="modifyQty('${memberId}', '${item.id}', 100)">+100</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderVaultItemCards() {
    const vaultItems = appState.vault?.items || {};
    const query = (appState.searchQuery || '').toLowerCase().trim();
    const cat = appState.activeCategory || 'all';

    return ITEM_CATALOG.map(item => {
        // Filter by category
        if (cat !== 'all' && item.cat !== cat) return '';

        // Filter by search
        if (query) {
            const matchKo = item.nameKo.toLowerCase().includes(query);
            const matchAr = item.nameAr.toLowerCase().includes(query);
            if (!matchKo && !matchAr) return '';
        }

        // 1. Smart Aggregate: Total pieces across Mohamed, Amy, Abdo, and Vault
        let totalWarehouseQty = 0;
        const memberBreakdown = {};
        TEAM_MEMBERS.forEach(m => {
            const q = (appState.members[m.id]?.items?.[item.id]) || 0;
            memberBreakdown[m.id] = q;
            totalWarehouseQty += q;
        });
        const vaultQty = vaultItems[item.id] || 0;
        memberBreakdown['vault'] = vaultQty;
        totalWarehouseQty += vaultQty;

        const hasStock = totalWarehouseQty > 0;
        const bagQty = getAccountBagQty(item.id);

        // 2. Smart Dynamic Average Price
        const meta = getItemPriceMeta(item.id);
        const smartPrice = meta.price;
        const expectedTotalMeso = totalWarehouseQty * smartPrice;

        return `
            <div class="tracker-item-card vault-item-card-smart ${hasStock ? 'has-stock' : ''}" id="card-vault-${item.id}">
                <div class="item-card-top">
                    <div class="item-thumb-box">
                        <img src="${item.icon}" alt="${item.nameKo}" loading="lazy">
                    </div>
                    <div class="item-card-titles" style="flex: 1;">
                        <span class="item-korean-name">${item.nameKo}</span>
                        <span class="item-arabic-name">${item.nameAr}</span>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                            ${meta.isActual ? `
                                <span class="item-price-chip" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.5);" title="متوسط سعر البيع الفعلي المحسوب تلقائياً من ${meta.salesCount} عمليات بيع سابقة (${formatNumber(meta.totalSoldQty)} قطعة)">
                                    🏷️ متوسط البيع: ${formatNumber(smartPrice)} ميسو (من المبيعات ✨)
                                </span>
                            ` : `
                                <span class="item-price-chip ${item.priceType}" title="سعر استرشادي مبدئي من الدليل">
                                    🏷️ سعر مبدئي: ${formatNumber(smartPrice)} ميسو
                                </span>
                            `}
                            <span class="account-bag-badge" title="رصيد شنطة الحساب الإجمالية في اللعبة">
                                🎒 إجمالي الشنطة: <strong>${formatNumber(bagQty)}</strong>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Warehouse Stock Quantity Display -->
                <div style="background: rgba(15, 23, 42, 0.75); border: 1.5px solid rgba(234, 179, 8, 0.35); border-radius: 12px; padding: 10px 14px; margin: 12px 0 8px; display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-size: 0.86rem; color: #cbd5e1; font-weight: 700;">🏛️ إجمالي المتوفر بالمخزن:</span>
                    <strong id="vault-qty-val-${item.id}" style="font-size: 1.25rem; color: #facc15; font-weight: 900;">
                        ${formatNumber(totalWarehouseQty)} ${item.id === 'raw_meso' ? 'ميسو كاش' : 'قطعة'}
                    </strong>
                </div>

                <!-- Expected Meso Revenue Box -->
                ${item.id !== 'raw_meso' ? `
                    <div class="vault-expected-revenue-box">
                        <span style="font-size: 0.82rem; color: #94a3b8; font-weight: 700;">💰 الفلوس المتوقعة:</span>
                        <div style="text-align: left;">
                            <strong style="color: var(--accent-gold); font-size: 1.05rem;">~${formatMesoCompact(expectedTotalMeso)}</strong>
                            <div style="font-size: 0.72rem; color: #94a3b8;">(${formatNumber(totalWarehouseQty)} × ${formatNumber(smartPrice)})</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Member Shares Breakdown Pills -->
                <div class="vault-member-shares-list">
                    <span class="vault-member-share-pill mohamed" title="مساهمة محمد">
                        🧙‍♂️ محمد: <strong>${formatNumber(memberBreakdown['mohamed'] || 0)}</strong>
                        ${item.id !== 'raw_meso' && (memberBreakdown['mohamed'] || 0) > 0 ? ` (~${formatMesoCompact((memberBreakdown['mohamed'] || 0) * smartPrice)})` : ''}
                    </span>
                    <span class="vault-member-share-pill amy" title="مساهمة طنط ايمي">
                        🧝‍♀️ طنط ايمي: <strong>${formatNumber(memberBreakdown['amy'] || 0)}</strong>
                        ${item.id !== 'raw_meso' && (memberBreakdown['amy'] || 0) > 0 ? ` (~${formatMesoCompact((memberBreakdown['amy'] || 0) * smartPrice)})` : ''}
                    </span>
                    <span class="vault-member-share-pill abdo" title="مساهمة عبدالرحمن">
                        🏹 عبدالرحمن: <strong>${formatNumber(memberBreakdown['abdo'] || 0)}</strong>
                        ${item.id !== 'raw_meso' && (memberBreakdown['abdo'] || 0) > 0 ? ` (~${formatMesoCompact((memberBreakdown['abdo'] || 0) * smartPrice)})` : ''}
                    </span>
                    ${vaultQty > 0 ? `
                        <span class="vault-member-share-pill vault" title="رصيد عام مستقل">
                            🏛️ عام: <strong>${formatNumber(vaultQty)}</strong>
                            ${item.id !== 'raw_meso' ? ` (~${formatMesoCompact(vaultQty * smartPrice)})` : ''}
                        </span>
                    ` : ''}
                </div>

                <!-- Stepper for direct Vault adjustments (collapsible) -->
                <div class="manual-stepper-wrap" id="manual-wrap-vault-${item.id}">
                    <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 4px;">تعديل الرصيد العام المشترك (غير المنسوب لأعضاء):</div>
                    <div class="stepper-row">
                        <button class="btn-stepper" onclick="modifyVaultQty('${item.id}', -1)" title="طرح 1">−</button>
                        <input type="number" min="0" class="stepper-input" id="input-vault-${item.id}" value="${vaultQty}" onchange="setDirectVaultQty('${item.id}', this.value)" oninput="setDirectVaultQty('${item.id}', this.value)" placeholder="الرصيد العام...">
                        <button class="btn-stepper" onclick="modifyVaultQty('${item.id}', 1)" title="إضافة 1">+</button>
                    </div>
                </div>

                <!-- Card Actions Row -->
                <div class="card-actions-row" style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                    ${item.id !== 'raw_meso' ? `
                        <button class="btn-card-sell" style="flex: 1; background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; font-weight: 900; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer;" onclick="openGrandSellModal('${item.id}')" title="بيع وتصفير هذا العنصر من المخزن الكلي وتحديد سعر البيع">
                            💰 بيع وتحديد السعر
                        </button>
                    ` : '<span style="color: var(--accent-gold); font-size: 0.85rem; font-weight: 800;">كاش ميسو مباشر</span>'}
                    <button class="btn-toggle-manual" onclick="toggleVaultManual('${item.id}')" title="تعديل الرصيد العام المستقل">
                        ⚙️ رصيد عام
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function toggleVaultManual(itemId) {
    const wrap = document.getElementById(`manual-wrap-vault-${itemId}`);
    if (wrap) {
        wrap.classList.toggle('open');
    }
}

function modifyVaultQty(itemId, delta) {
    if (!appState.vault) appState.vault = { items: {} };
    if (!appState.vault.items) appState.vault.items = {};

    let current = appState.vault.items[itemId] || 0;
    current = Math.max(0, current + delta);

    if (current === 0) {
        delete appState.vault.items[itemId];
    } else {
        appState.vault.items[itemId] = current;
    }

    updateSingleVaultItemUI(itemId, current);
    updateCalculations();
    saveStateDebounced();
}

function setDirectVaultQty(itemId, value) {
    if (!appState.vault) appState.vault = { items: {} };
    if (!appState.vault.items) appState.vault.items = {};

    let num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
        num = 0;
        delete appState.vault.items[itemId];
    } else {
        appState.vault.items[itemId] = num;
    }

    updateSingleVaultItemUI(itemId, num);
    updateCalculations();
    saveStateDebounced();
}

function updateSingleVaultItemUI(itemId, qty) {
    const input = document.getElementById(`input-vault-${itemId}`);
    if (input && document.activeElement !== input) {
        input.value = qty;
    }

    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    const qtyVal = document.getElementById(`vault-qty-val-${itemId}`);
    if (qtyVal) {
        qtyVal.innerText = `${formatNumber(qty)} ${itemObj?.id === 'raw_meso' ? 'ميسو كاش' : 'قطعة'}`;
    }

    const card = document.getElementById(`card-vault-${itemId}`);
    if (card) {
        if (qty > 0) {
            card.classList.add('has-qty');
            card.style.borderColor = 'rgba(234, 179, 8, 0.6)';
        } else {
            card.classList.remove('has-qty');
            card.style.borderColor = '';
        }
    }
}

function confirmResetVault() {
    if (!confirm("⚠️ هل أنت متأكد من تصفير كافة محتويات المخزن العام المشترك؟\n(لن تتأثر دروبات محمد أو طنط ايمي أو عبدالرحمن)")) return;
    if (appState.vault) {
        appState.vault.items = {};
    }
    refreshAllUI();
    saveStateDebounced();
    showToast("🗑️ تم تصفير محتويات المخزن العام بنجاح!");
}

function copyVaultReport() {
    const vaultItems = appState.vault?.items || {};
    let totalCash = vaultItems['raw_meso'] || 0;
    let totalQty = 0;
    let lines = [`🏛️ تقرير المخزن العام المشترك - MapleLand`];
    lines.push(`📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}`);
    lines.push(`---------------------------------`);

    ITEM_CATALOG.forEach(item => {
        const qty = vaultItems[item.id] || 0;
        if (qty > 0 && item.id !== 'raw_meso') {
            totalQty += qty;
            lines.push(`▫️ ${item.nameKo} (${item.nameAr}): ${formatNumber(qty)} قطعة`);
        }
    });

    lines.push(`---------------------------------`);
    lines.push(`📦 إجمالي القطع في المخزن العام: ${formatNumber(totalQty)} قطعة`);
    lines.push(`💰 رصيد كاش المخزن العام: ${formatNumber(totalCash)} ميسو`);
    lines.push(`---------------------------------`);
    lines.push(`✨ MapleLand General Vault`);

    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        showToast("📋 تم نسخ تقرير المخزن العام للحافظة بنجاح!");
    });
}

function openVaultBulkAddModal() {
    const modal = document.getElementById('vault-bulk-modal');
    if (!modal) return;

    const select = document.getElementById('vault-bulk-item-select');
    if (select) {
        select.innerHTML = ITEM_CATALOG.map(item => {
            const cur = appState.vault?.items?.[item.id] || 0;
            return `<option value="${item.id}">${item.nameKo} (${item.nameAr}) - متوفر حالياً: ${formatNumber(cur)}</option>`;
        }).join('');
    }

    const input = document.getElementById('vault-bulk-input-qty');
    if (input) input.value = '';

    modal.classList.add('open');
}

function closeVaultBulkModal() {
    const modal = document.getElementById('vault-bulk-modal');
    if (!modal) return;
    modal.classList.remove('open');
}

function setVaultBulkQty(val) {
    const input = document.getElementById('vault-bulk-input-qty');
    if (input) {
        let cur = parseInt(input.value, 10) || 0;
        input.value = cur + val;
    }
}

function confirmVaultBulkAdd() {
    const select = document.getElementById('vault-bulk-item-select');
    const input = document.getElementById('vault-bulk-input-qty');
    if (!select || !input) return;

    const itemId = select.value;
    const qty = parseInt(input.value, 10);
    if (isNaN(qty) || qty <= 0) {
        alert("يرجى إدخال كمية صحيحة أكبر من 0.");
        return;
    }

    modifyVaultQty(itemId, qty);
    closeVaultBulkModal();
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    showToast(`📥 تم توريد +${formatNumber(qty)} من (${itemObj?.nameKo || itemId}) للمخزن العام بنجاح!`);
}

function openVaultSellModal(itemId) {
    openMemberSellModal('vault', itemId);
}

// 7. RENDER ALL MEMBERS SIDE-BY-SIDE VIEW
function renderAllMembersView() {
    const container = document.getElementById('panel-all');
    if (!container) return;

    container.innerHTML = `
        <div class="all-members-grid">
            ${TEAM_MEMBERS.map(member => `
                <div class="member-column-card ${member.themeClass}">
                    <div class="column-card-header">
                        <div class="column-member-title">
                            <span>${member.avatar}</span>
                            <span>${member.name}</span>
                        </div>
                        <span class="column-total-badge" id="column-total-${member.id}">
                            0 ميسو
                        </span>
                    </div>

                    <div class="column-items-list" id="column-list-${member.id}">
                        <!-- Populated dynamically in updateCalculations() -->
                    </div>
                </div>
            `).join('')}

            <!-- 4. General Vault Column in Side-by-Side View -->
            <div class="member-column-card theme-vault">
                <div class="column-card-header">
                    <div class="column-member-title">
                        <span>🏛️</span>
                        <span>المخزن (عام مستقل)</span>
                    </div>
                    <span class="column-total-badge" id="column-total-vault" style="background: rgba(234, 179, 8, 0.2); color: #facc15; border-color: #eab308;">
                        0 ميسو
                    </span>
                </div>

                <div class="column-items-list" id="column-list-vault">
                    <!-- Populated dynamically in updateCalculations() -->
                </div>
            </div>
        </div>
    `;
}

// 8. QUANTITY MANIPULATION & PERSISTENCE
function modifyQty(memberId, itemId, delta) {
    if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
    if (!appState.members[memberId].items) appState.members[memberId].items = {};

    let current = appState.members[memberId].items[itemId] || 0;
    current = Math.max(0, current + delta);

    if (current === 0) {
        delete appState.members[memberId].items[itemId];
    } else {
        appState.members[memberId].items[itemId] = current;
    }

    updateSingleItemUI(memberId, itemId, current);
    updateCalculations();
    saveStateDebounced();
}

function setDirectQty(memberId, itemId, value) {
    if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
    if (!appState.members[memberId].items) appState.members[memberId].items = {};

    let num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
        num = 0;
        delete appState.members[memberId].items[itemId];
    } else {
        appState.members[memberId].items[itemId] = num;
    }

    updateSingleItemUI(memberId, itemId, num);
    updateCalculations();
    saveStateDebounced();
}

function updateSingleItemUI(memberId, itemId, qty) {
    const input = document.getElementById(`input-${memberId}-${itemId}`);
    if (input && document.activeElement !== input) {
        input.value = qty;
    }

    const bagVal = document.getElementById(`bag-val-${itemId}`);
    if (bagVal) {
        bagVal.innerText = formatNumber(getAccountBagQty(itemId));
    }

    const shareVal = document.getElementById(`share-val-${memberId}-${itemId}`);
    if (shareVal) {
        shareVal.innerText = `${formatNumber(qty)} قطعة`;
    }

    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (itemObj) {
        const mesoEl = document.getElementById(`meso-${memberId}-${itemId}`);
        if (mesoEl) {
            mesoEl.innerText = itemObj.id === 'raw_meso' ? `${formatNumber(qty)} ميسو كاش` : `${formatNumber(qty)} قطعة`;
        }
    }

    const card = document.getElementById(`card-${memberId}-${itemId}`);
    if (card) {
        if (qty > 0) {
            card.classList.add('has-qty');
        } else {
            card.classList.remove('has-qty');
        }
    }
}

// 9. CALCULATIONS & MASTER PROFILE UPDATE
function updateCalculations() {
    let grandTotalMeso = 0;
    let grandTotalItems = 0;
    let totalBagItems = 0;
    const memberTotals = {};
    const itemAggregates = {};

    // Initialize item aggregates
    ITEM_CATALOG.forEach(item => {
        itemAggregates[item.id] = { ...item, totalQty: 0, byMember: {} };
        if (item.id !== 'raw_meso') {
            totalBagItems += getAccountBagQty(item.id);
        }
    });

    // Calculate per-member totals
    TEAM_MEMBERS.forEach(member => {
        let memberMeso = 0;
        let memberItemsCount = 0;
        const memberItems = appState.members[member.id]?.items || {};

        ITEM_CATALOG.forEach(item => {
            const qty = memberItems[item.id] || 0;
            if (qty > 0) {
                // Real cash meso only from sales or raw cash; items are items only!
                if (item.id === 'raw_meso') {
                    memberMeso += qty;
                } else {
                    memberItemsCount += qty;
                }

                itemAggregates[item.id].totalQty += qty;
                itemAggregates[item.id].byMember[member.id] = qty;
            }
        });

        memberTotals[member.id] = { meso: memberMeso, items: memberItemsCount };
        grandTotalMeso += memberMeso;
        grandTotalItems += memberItemsCount;

        // Update strip inside member header
        const itemsEl = document.getElementById(`member-items-${member.id}`);
        const mesoEl = document.getElementById(`member-meso-${member.id}`);
        if (itemsEl) itemsEl.innerText = `${formatNumber(memberItemsCount)} قطعة`;
        if (mesoEl) mesoEl.innerText = `${formatMesoCompact(memberMeso)} كاش`;

        // Update column card total
        const colTotalEl = document.getElementById(`column-total-${member.id}`);
        if (colTotalEl) colTotalEl.innerText = `${formatMesoCompact(memberMeso)} كاش`;
    });

    // Calculate Vault (المخزن العام المشترك المستقل) totals
    const vaultItems = appState.vault?.items || {};
    let vaultMeso = vaultItems['raw_meso'] || 0;
    let vaultItemsCount = 0;

    ITEM_CATALOG.forEach(item => {
        const qty = vaultItems[item.id] || 0;
        if (qty > 0) {
            if (item.id === 'raw_meso') {
                // already accounted in vaultMeso
            } else {
                vaultItemsCount += qty;
                itemAggregates[item.id].totalQty += qty;
            }
            itemAggregates[item.id].vaultQty = qty;
        }
    });

    grandTotalMeso += vaultMeso;
    grandTotalItems += vaultItemsCount;

    // Update strip inside Vault header
    const vaultItemsEl = document.getElementById('member-items-vault');
    const vaultMesoEl = document.getElementById('member-meso-vault');
    if (vaultItemsEl) vaultItemsEl.innerText = `${formatNumber(vaultItemsCount)} قطعة`;
    if (vaultMesoEl) vaultMesoEl.innerText = `${formatMesoCompact(vaultMeso)} كاش`;

    // Update Vault column card total in side-by-side view
    const colTotalVaultEl = document.getElementById('column-total-vault');
    if (colTotalVaultEl) colTotalVaultEl.innerText = `${formatMesoCompact(vaultMeso)} كاش`;

    // 1B. CALCULATE DYNAMIC EXPECTED MESO REVENUE PER MEMBER & VAULT
    const memberExpectedMeso = {};
    TEAM_MEMBERS.forEach(m => memberExpectedMeso[m.id] = 0);
    let vaultExpectedMeso = 0;
    let totalExpectedWarehouseRevenue = 0;

    ITEM_CATALOG.forEach(item => {
        if (item.id === 'raw_meso') return;
        const smartPrice = getSmartItemPrice(item.id);

        let itemTotalQty = 0;
        TEAM_MEMBERS.forEach(m => {
            const q = (appState.members[m.id]?.items?.[item.id]) || 0;
            if (q > 0) {
                memberExpectedMeso[m.id] += (q * smartPrice);
                itemTotalQty += q;
            }
        });

        const vq = (appState.vault?.items?.[item.id]) || 0;
        if (vq > 0) {
            vaultExpectedMeso += (vq * smartPrice);
            itemTotalQty += vq;
        }

        totalExpectedWarehouseRevenue += (itemTotalQty * smartPrice);
    });

    // Update Smart Vault Dashboard stats & members expected payout share
    const vaultStatItems = document.getElementById('vault-stat-total-items');
    const vaultStatExp = document.getElementById('vault-stat-expected-meso');
    const vaultStatCash = document.getElementById('vault-stat-actual-cash');
    if (vaultStatItems) vaultStatItems.innerText = `${formatNumber(grandTotalItems)} قطعة`;
    if (vaultStatExp) vaultStatExp.innerText = `~${formatMesoCompact(totalExpectedWarehouseRevenue)}`;
    if (vaultStatCash) vaultStatCash.innerText = `${formatMesoCompact(grandTotalMeso)} كاش`;

    const vaultPayoutGrid = document.getElementById('vault-members-payout-grid');
    if (vaultPayoutGrid) {
        vaultPayoutGrid.innerHTML = TEAM_MEMBERS.map(m => {
            const cash = memberTotals[m.id].meso;
            const exp = memberExpectedMeso[m.id] || 0;
            const totalWealth = cash + exp;
            const itemsCount = memberTotals[m.id].items;
            return `
                <div class="vault-member-payout-card ${m.id}">
                    <div class="vault-payout-card-header">
                        <span class="vault-payout-member-name">${m.avatar} ${m.name}</span>
                        <span style="font-size: 0.78rem; color: #38bdf8; font-weight: 700;">${formatNumber(itemsCount)} قطعة</span>
                    </div>
                    <div style="margin: 4px 0;">
                        <div style="font-size: 0.76rem; color: var(--text-muted);">الأرباح المتوقعة من دروباته:</div>
                        <div class="vault-payout-expected-val">~${formatMesoCompact(exp)}</div>
                    </div>
                    <div class="vault-payout-meta-row">
                        <span>💵 كاش محصل حالياً:</span>
                        <strong style="color: #34d399;">${formatMesoCompact(cash)}</strong>
                    </div>
                    <div class="vault-payout-meta-row" style="border-top: 1px dashed var(--border-color); padding-top: 4px; margin-top: 4px;">
                        <span>💰 الإجمالي التقديري:</span>
                        <strong style="color: var(--accent-gold);">~${formatMesoCompact(totalWealth)}</strong>
                    </div>
                </div>
            `;
        }).join('') + (vaultMeso > 0 || vaultExpectedMeso > 0 ? `
            <div class="vault-member-payout-card vault">
                <div class="vault-payout-card-header">
                    <span class="vault-payout-member-name">🏛️ المخزن العام</span>
                    <span style="font-size: 0.78rem; color: #facc15; font-weight: 700;">${formatNumber(vaultItemsCount)} قطعة</span>
                </div>
                <div style="margin: 4px 0;">
                    <div style="font-size: 0.76rem; color: var(--text-muted);">الأرباح المتوقعة من رصيد المخزن:</div>
                    <div class="vault-payout-expected-val" style="color: #facc15;">~${formatMesoCompact(vaultExpectedMeso)}</div>
                </div>
                <div class="vault-payout-meta-row">
                    <span>💵 كاش رصيد المخزن:</span>
                    <strong style="color: #34d399;">${formatMesoCompact(vaultMeso)}</strong>
                </div>
                <div class="vault-payout-meta-row" style="border-top: 1px dashed var(--border-color); padding-top: 4px; margin-top: 4px;">
                    <span>💰 الإجمالي التقديري:</span>
                    <strong style="color: var(--accent-gold);">~${formatMesoCompact(vaultMeso + vaultExpectedMeso)}</strong>
                </div>
            </div>
        ` : '');
    }

    // 1. UPDATE MASTER GRAND TOTAL CARD
    const masterMesoEl = document.getElementById('master-total-meso');
    const masterItemsEl = document.getElementById('master-total-items');
    const masterBagEl = document.getElementById('master-total-bag');
    const topFarmerEl = document.getElementById('master-top-farmer');

    if (masterMesoEl) masterMesoEl.innerText = formatMesoCompact(grandTotalMeso);
    if (masterItemsEl) masterItemsEl.innerText = `${formatNumber(grandTotalItems)} قطعة`;
    if (masterBagEl) masterBagEl.innerText = `${formatNumber(totalBagItems)} قطعة`;

    // Find top contributor
    let topFarmerName = 'لا يوجد حتى الآن';
    let maxVal = -1;
    TEAM_MEMBERS.forEach(m => {
        if (memberTotals[m.id].meso > maxVal && memberTotals[m.id].meso > 0) {
            maxVal = memberTotals[m.id].meso;
            topFarmerName = `${m.avatar} ${m.name} (${formatMesoCompact(maxVal)})`;
        }
    });
    if (topFarmerEl) topFarmerEl.innerText = topFarmerName;

    // 2. UPDATE PROGRESS BARS AND PERCENTAGES
    TEAM_MEMBERS.forEach(m => {
        const pct = grandTotalMeso > 0 ? ((memberTotals[m.id].meso / grandTotalMeso) * 100).toFixed(1) : 0;
        
        const seg = document.getElementById(`seg-${m.id}`);
        if (seg) seg.style.width = `${pct}%`;

        const legendVal = document.getElementById(`legend-val-${m.id}`);
        if (legendVal) {
            legendVal.innerText = `${formatMesoCompact(memberTotals[m.id].meso)} (${pct}%)`;
        }
    });

    // 3. UPDATE MASTER TABLE (SHARED LOOT POOL)
    updateMasterTable(itemAggregates, grandTotalMeso);

    // 4. UPDATE SIDE-BY-SIDE COLUMN LISTS
    updateColumnLists();
}

let warehouseOnlyAvailable = true;
let warehouseSearchTerm = '';

function onWarehouseSearch(term) {
    warehouseSearchTerm = (term || '').toLowerCase().trim();
    updateCalculations();
}

function toggleWarehouseFilter(onlyAvail, btnEl) {
    warehouseOnlyAvailable = onlyAvail;
    const chipAvail = document.getElementById('chip-avail');
    const chipAll = document.getElementById('chip-all');
    if (chipAvail && chipAll) {
        chipAvail.classList.toggle('active', onlyAvail);
        chipAll.classList.toggle('active', !onlyAvail);
    }
    updateCalculations();
}

function updateMasterTable(aggregates, totalMeso) {
    const tbody = document.getElementById('master-table-body');
    if (!tbody) return;

    let itemsList = Object.values(aggregates);

    if (warehouseOnlyAvailable) {
        itemsList = itemsList.filter(a => a.totalQty > 0);
    }

    if (warehouseSearchTerm) {
        itemsList = itemsList.filter(a => 
            a.nameKo.toLowerCase().includes(warehouseSearchTerm) || 
            a.nameAr.toLowerCase().includes(warehouseSearchTerm)
        );
    }

    if (itemsList.length === 0) {
        const msg = warehouseOnlyAvailable 
            ? "المخزن الكلي فارغ حالياً. بمجرد إضافة أي دروب في بروفايل أي عضو أو في المخزن العام سيظهر هنا فوراً مع زر البيع والتصفير!" 
            : "لا توجد نتائج مطابقة لبحثك في المخزن الكلي.";
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">${msg}</td></tr>`;
        return;
    }

    // Sort purely by totalQty descending
    itemsList.sort((a, b) => b.totalQty - a.totalQty);

    tbody.innerHTML = itemsList.map(item => {
        const mohamedQty = item.byMember['mohamed'] || 0;
        const amyQty = item.byMember['amy'] || 0;
        const abdoQty = item.byMember['abdo'] || 0;
        const vaultQty = item.vaultQty || 0;

        return `
            <tr>
                <td>
                    <div class="table-item-cell">
                        <img src="${item.icon}" alt="" class="table-item-icon">
                        <div>
                            <strong>${item.nameKo}</strong>
                            <div style="font-size: 0.78rem; color: var(--text-muted);">${item.nameAr}</div>
                        </div>
                    </div>
                </td>
                <td style="font-size: 1.1rem; font-weight: 900; color: var(--accent-cyan);">
                    ${formatNumber(item.totalQty)} قطعة
                </td>
                <td>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.82rem;">
                        <span style="color: #38bdf8; font-weight: 800;">محمد: ${mohamedQty}</span> | 
                        <span style="color: #ec4899; font-weight: 800;">طنط ايمي: ${amyQty}</span> | 
                        <span style="color: #f97316; font-weight: 800;">عبدالرحمن: ${abdoQty}</span>
                        ${vaultQty > 0 ? ` | <span style="color: #facc15; font-weight: 800;">🏛️ المخزن: ${vaultQty}</span>` : ''}
                    </div>
                </td>
                <td style="text-align: center;">
                    ${item.id !== 'raw_meso' ? (item.totalQty > 0 ? 
                        `<button class="btn-table-sell" onclick="openGrandSellModal('${item.id}')" title="بيع وتصفير هذا العنصر من المخزن الكلي وتحديد سعر البيع لتحويله لميسو">💰 بيع وتحديد السعر</button>` : 
                        `<span style="color: var(--text-muted); font-size: 0.78rem;">المخزن فارغ</span>`
                    ) : '<span style="color: var(--accent-gold); font-weight: 800;">كاش ميسو مباشر</span>'}
                </td>
            </tr>
        `;
    }).join('');
}

function updateColumnLists() {
    TEAM_MEMBERS.forEach(member => {
        const listEl = document.getElementById(`column-list-${member.id}`);
        if (!listEl) return;

        const memberItems = appState.members[member.id]?.items || {};
        const activeItems = ITEM_CATALOG.filter(i => (memberItems[i.id] || 0) > 0);

        if (activeItems.length === 0) {
            listEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; font-size: 0.85rem;">لا توجد دروبات مسجلة بعد</div>`;
            return;
        }

        listEl.innerHTML = activeItems.map(item => {
            const qty = memberItems[item.id] || 0;
            return `
                <div class="column-item-row">
                    <div class="column-item-info">
                        <img src="${item.icon}" alt="" style="width: 22px; height: 22px; object-fit: contain;">
                        <span>${item.nameKo}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number" class="column-item-qty-input" value="${qty}" onchange="setDirectQty('${member.id}', '${item.id}', this.value)">
                        <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 800; min-width: 60px; text-align: left;">
                            ${item.id === 'raw_meso' ? `${formatNumber(qty)} كاش` : `${formatNumber(qty)} قطعة`}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    });

    // Populate Vault column in side-by-side view
    const vaultListEl = document.getElementById('column-list-vault');
    if (vaultListEl) {
        const vaultItems = appState.vault?.items || {};
        const activeVaultItems = ITEM_CATALOG.filter(i => (vaultItems[i.id] || 0) > 0);

        if (activeVaultItems.length === 0) {
            vaultListEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; font-size: 0.85rem;">المخزن العام فارغ حالياً</div>`;
        } else {
            vaultListEl.innerHTML = activeVaultItems.map(item => {
                const qty = vaultItems[item.id] || 0;
                return `
                    <div class="column-item-row">
                        <div class="column-item-info">
                            <img src="${item.icon}" alt="" style="width: 22px; height: 22px; object-fit: contain;">
                            <span>${item.nameKo}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <input type="number" class="column-item-qty-input" value="${qty}" onchange="setDirectVaultQty('${item.id}', this.value)">
                            <span style="font-size: 0.8rem; color: #facc15; font-weight: 800; min-width: 60px; text-align: left;">
                                ${item.id === 'raw_meso' ? `${formatNumber(qty)} كاش` : `${formatNumber(qty)} قطعة`}
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// 10. REFRESH ALL UI
function refreshAllUI() {
    TEAM_MEMBERS.forEach(member => {
        const grid = document.getElementById(`grid-${member.id}`);
        if (grid) {
            grid.innerHTML = renderItemCards(member.id);
        }
    });

    const vaultGrid = document.getElementById('grid-vault');
    if (vaultGrid) {
        vaultGrid.innerHTML = renderVaultItemCards();
    }

    updateCalculations();
}

// 11. DEBOUNCED SAVE TO DB
let saveTimeout = null;
function saveStateDebounced() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        const res = await window.teamDb.save(appState);
        if (res && res.mode === 'cloud') {
            updateSyncBadgeUI('cloud');
        } else {
            updateSyncBadgeUI('local');
        }
    }, 400);
}

// 12. TAB SWITCHING
function switchTab(tabId, btn = null) {
    appState.activeTab = tabId;

    // Update active tab buttons
    document.querySelectorAll('.profile-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const found = document.querySelector(`.profile-tab-btn.tab-${tabId}`);
        if (found) found.classList.add('active');
    }

    // Update panel visibility
    document.querySelectorAll('.member-profile-panel').forEach(p => p.classList.remove('active'));
    
    if (tabId === 'all') {
        const allPanel = document.getElementById('panel-all');
        if (allPanel) allPanel.classList.add('active');
        updateColumnLists();
    } else {
        const activePanel = document.getElementById(`panel-${tabId}`);
        if (activePanel) activePanel.classList.add('active');
    }
}
window.switchProfileTab = switchTab;
window.switchTab = switchTab;

// 13. SEARCH AND CATEGORY FILTERING
function handleSearch(query, memberId) {
    appState.searchQuery = query;
    const grid = document.getElementById(`grid-${memberId}`);
    if (grid) {
        if (memberId === 'vault') {
            grid.innerHTML = renderVaultItemCards();
        } else {
            grid.innerHTML = renderItemCards(memberId);
        }
    }
}

function setCategoryFilter(cat, memberId, btn) {
    appState.activeCategory = cat;

    // Update chips in this panel
    const panel = document.getElementById(`panel-${memberId}`);
    if (panel) {
        panel.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        if (btn) btn.classList.add('active');
    }

    const grid = document.getElementById(`grid-${memberId}`);
    if (grid) {
        if (memberId === 'vault') {
            grid.innerHTML = renderVaultItemCards();
        } else {
            grid.innerHTML = renderItemCards(memberId);
        }
    }
}

function toggleMasterTable() {
    const container = document.getElementById('master-table-container');
    const chevron = document.getElementById('master-table-chevron');
    if (!container) return;

    appState.isMasterTableOpen = !appState.isMasterTableOpen;
    if (appState.isMasterTableOpen) {
        container.classList.add('open');
        if (chevron) chevron.innerText = '▲';
    } else {
        container.classList.remove('open');
        if (chevron) chevron.innerText = '▼';
    }
}

// 14. RESET AND REPORT FUNCTIONS
function confirmResetMember(memberId) {
    const memberObj = TEAM_MEMBERS.find(m => m.id === memberId);
    if (!confirm(`هل أنت متأكد من تصفير كافة دروبات وميسو (${memberObj ? memberObj.name : memberId})؟`)) {
        return;
    }

    if (appState.members[memberId]) {
        appState.members[memberId].items = {};
    }

    refreshAllUI();
    saveStateDebounced();
    showToast(`🗑️ تم تصفير دروبات ${memberObj.name} بنجاح!`);
}

function copyMemberReport(memberId) {
    const memberObj = TEAM_MEMBERS.find(m => m.id === memberId);
    const memberItems = appState.members[memberId]?.items || {};
    
    let totalMesoCash = memberItems['raw_meso'] || 0;
    let totalQty = 0;
    let lines = [`📊 تقرير فارمينج MapleLand - ${memberObj.name} (${memberObj.role})`];
    lines.push(`📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}`);
    lines.push(`---------------------------------`);

    ITEM_CATALOG.forEach(item => {
        const qty = memberItems[item.id] || 0;
        if (qty > 0 && item.id !== 'raw_meso') {
            totalQty += qty;
            lines.push(`▫️ ${item.nameKo} (${item.nameAr}): ${formatNumber(qty)} قطعة`);
        }
    });

    lines.push(`---------------------------------`);
    lines.push(`📦 إجمالي القطع المخزنة: ${formatNumber(totalQty)} قطعة`);
    lines.push(`💰 رصيد الكاش المحصل من المبيعات: ${formatNumber(totalMesoCash)} ميسو (~${formatMesoCompact(totalMesoCash)})`);
    lines.push(`---------------------------------`);
    lines.push(`🔥 تم التوليد عبر MapleLand Team Tracker`);

    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 تم نسخ تقرير ${memberObj.name} للحافظة بنجاح!`);
    });
}

function copyTeamReport() {
    let grandTotalMeso = 0;
    let grandTotalItems = 0;
    let lines = [`🏆 تقرير المحصلة الكلية لمخزن MapleLand 🏆`];
    lines.push(`👥 أعضاء الفريق: ${TEAM_MEMBERS.map(m => m.name).join(' | ')}`);
    lines.push(`📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}`);
    lines.push(`=================================`);

    TEAM_MEMBERS.forEach(m => {
        let memberItems = 0;
        const items = appState.members[m.id]?.items || {};
        const memberCash = items['raw_meso'] || 0;

        ITEM_CATALOG.forEach(i => {
            const q = items[i.id] || 0;
            if (q > 0 && i.id !== 'raw_meso') {
                memberItems += q;
            }
        });

        grandTotalMeso += memberCash;
        grandTotalItems += memberItems;
        lines.push(`👤 ${m.name}: ${formatNumber(memberItems)} قطعة بالمخزن | رصيد كاش: ${formatNumber(memberCash)} ميسو`);
    });

    lines.push(`=================================`);
    lines.push(`📦 إجمالي القطع في مخزن الفريق: ${formatNumber(grandTotalItems)} قطعة`);
    lines.push(`💰 إجمالي الميسو الكاش الفعلي المحصل: ${formatNumber(grandTotalMeso)} ميسو (~${formatMesoCompact(grandTotalMeso)})`);
    lines.push(`=================================`);
    lines.push(`✨ MapleLand Team Tracker`);

    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 تم نسخ تقرير الفريق الإجمالي بنجاح!`);
    });
}

// 15. MODALS & SETTINGS
function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    const config = window.teamDb.customConfig;
    document.getElementById('cfg-api-key').value = config.apiKey || '';
    document.getElementById('cfg-db-url').value = config.databaseURL || '';
    document.getElementById('cfg-project-id').value = config.projectId || '';

    modal.classList.add('open');
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('open');
}

async function saveDatabaseSettings() {
    const apiKey = document.getElementById('cfg-api-key').value.trim();
    const databaseURL = document.getElementById('cfg-db-url').value.trim();
    const projectId = document.getElementById('cfg-project-id').value.trim();

    if (!apiKey || !databaseURL) {
        // Fall back to local
        window.teamDb.setLocalMode();
        updateSyncBadgeUI('local');
        closeSettingsModal();
        showToast("💾 تم التحويل إلى وضع التخزين المحلي (Offline)");
        return;
    }

    const newConfig = {
        apiKey,
        databaseURL,
        projectId,
        authDomain: `${projectId}.firebaseapp.com`,
        storageBucket: `${projectId}.appspot.com`
    };

    updateSyncBadgeUI('connecting');
    const result = await window.teamDb.saveConfig(newConfig);

    closeSettingsModal();

    if (result.success) {
        updateSyncBadgeUI('cloud');
        showToast("🔥 تم الاتصال بقاعدة بيانات Firebase بنجاح والمزامنة المباشرة نشطة!", "cloud");
    } else {
        updateSyncBadgeUI('local');
        alert("فشل الاتصال بـ Firebase: " + (result.error || "تأكد من صحة الـ API Key و Database URL"));
    }
}

function exportBackupJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mapleland_team_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("📥 تم تصدير النسخة الاحتياطية بنجاح!");
}

function importBackupJSON(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && (imported.members || imported.vault)) {
                if (imported.members) appState.members = imported.members;
                if (imported.vault) appState.vault = imported.vault;
                refreshAllUI();
                saveStateDebounced();
                showToast("📤 تم استيراد البيانات وتطبيقها بنجاح!");
            } else {
                alert("الملف لا يحتوي على صيغة بيانات صالحة لتراكر الفريق.");
            }
        } catch (err) {
            alert("حدث خطأ أثناء قراءة ملف JSON: " + err.message);
        }
    };
    reader.readAsText(file);
}

// 16. TOAST NOTIFICATION
function showToast(message, type = 'normal') {
    const toast = document.getElementById('toast-notice');
    if (!toast) return;

    toast.innerText = message;
    toast.className = 'toast-notice show ' + type;

    setTimeout(() => {
        toast.className = 'toast-notice';
    }, 2800);
}

// 17. GLOBAL EVENT LISTENERS
function setupEventListeners() {
    // Close modals on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettingsModal();
            closeFixModal();
            closeFullShiftModal();
            closeShiftHistoryModal();
            closeSellModal();
            closeMemberSellModal();
            closeVaultBulkModal();
            closeSalesHistoryModal();
        }
    });
}

// 18. SMART SHIFT & CORRECTION SYSTEM
function previewShiftDelta(memberId, itemId, enteredVal) {
    const hint = document.getElementById(`shift-hint-${memberId}-${itemId}`);
    if (!hint) return;

    if (enteredVal === '' || isNaN(enteredVal)) {
        hint.innerText = '';
        hint.className = 'shift-preview-hint';
        return;
    }

    const prevBag = getAccountBagQty(itemId);
    const newBag = parseInt(enteredVal, 10);
    const delta = newBag - prevBag;
    const member = getMember(memberId);

    if (delta > 0) {
        hint.innerHTML = `⚡ الفارق: <strong>+${formatNumber(delta)}</strong> قطعة ستُضاف لـ <strong>${member.name}</strong>`;
        hint.className = 'shift-preview-hint positive';
    } else if (delta === 0) {
        hint.innerText = `نفس رصيد الشنطة السابق (${formatNumber(prevBag)}) دون زيادة`;
        hint.className = 'shift-preview-hint zero';
    } else {
        hint.innerHTML = `⚠️ أقل من رصيد الشنطة السابق بـ <strong>${formatNumber(Math.abs(delta))}</strong> قطعة (بيع/استهلاك)`;
        hint.className = 'shift-preview-hint negative';
    }
}

function commitShiftDelta(memberId, itemId) {
    const input = document.getElementById(`shift-input-${memberId}-${itemId}`);
    if (!input || input.value === '') {
        alert("يرجى كتابة الكمية التي تراها في الشنطة أولاً.");
        return;
    }

    const newBag = parseInt(input.value, 10);
    if (isNaN(newBag) || newBag < 0) {
        alert("يرجى إدخال رقم صحيح موجب.");
        return;
    }

    const prevBag = getAccountBagQty(itemId);
    const delta = newBag - prevBag;
    const member = getMember(memberId);
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);

    if (delta > 0) {
        if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
        if (!appState.members[memberId].items) appState.members[memberId].items = {};
        if (!appState.accountInventory) appState.accountInventory = {};

        // 1. Credit delta to member
        appState.members[memberId].items[itemId] = (appState.members[memberId].items[itemId] || 0) + delta;

        // 2. Update account bag baseline
        appState.accountInventory[itemId] = newBag;

        // 3. Log shift entry
        if (!appState.shiftLog) appState.shiftLog = [];
        appState.shiftLog.unshift({
            id: 'shift_' + Date.now(),
            memberId,
            memberName: member.name,
            avatar: member.avatar,
            itemId,
            itemNameKo: itemObj ? itemObj.nameKo : itemId,
            itemNameAr: itemObj ? itemObj.nameAr : itemId,
            prevBag,
            newBag,
            delta,
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        });
        if (appState.shiftLog.length > 50) appState.shiftLog.pop();

        showToast(`🎉 تم احتساب +${formatNumber(delta)} قطعة لصالح ${member.name}! (رصيد الشنطة: ${formatNumber(newBag)})`, "cloud");

        input.value = '';
        const hint = document.getElementById(`shift-hint-${memberId}-${itemId}`);
        if (hint) { hint.innerText = ''; hint.className = 'shift-preview-hint'; }

        refreshAllUI();
        saveStateDebounced();

    } else if (delta === 0) {
        showToast(`ℹ️ رصيد الشنطة لم يتغير (${formatNumber(newBag)} قطعة).`);
    } else {
        // Delta < 0
        const confirmed = confirm(
            `⚠️ رصيد الشنطة المدخل (${formatNumber(newBag)}) أقل من السابق (${formatNumber(prevBag)}).\n\n` +
            `الفارق: نقص ${formatNumber(Math.abs(delta))} قطعة.\n` +
            `هل تم بيع عناصر في الماركت/المتجر أو نقلها؟\n\n` +
            `• اضغط "OK" لتحديث رصيد الشنطة إلى ${formatNumber(newBag)} دون المساس برصيد ${member.name}.\n` +
            `• اضغط "Cancel" للإلغاء والتراجع.`
        );

        if (confirmed) {
            if (!appState.accountInventory) appState.accountInventory = {};
            appState.accountInventory[itemId] = newBag;
            showToast(`📉 تم تحديث رصيد الشنطة إلى ${formatNumber(newBag)} قطعة.`);
            input.value = '';
            refreshAllUI();
            saveStateDebounced();
        }
    }
}

function toggleManualWrap(memberId, itemId) {
    const wrap = document.getElementById(`manual-wrap-${memberId}-${itemId}`);
    if (wrap) {
        wrap.classList.toggle('open');
    }
}

// 19. MANUAL CORRECTION / FIX MODAL
function openItemFixModal(memberId, itemId) {
    const modal = document.getElementById('fix-modal');
    if (!modal) return;

    const member = getMember(memberId);
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!itemObj) return;

    document.getElementById('fix-target-member').value = memberId;
    document.getElementById('fix-target-item').value = itemId;

    const titleEl = document.getElementById('fix-item-title');
    if (titleEl) titleEl.innerText = `📦 تعديل: ${itemObj.nameKo} (${itemObj.nameAr})`;

    const labelEl = document.getElementById('fix-member-label');
    if (labelEl) labelEl.innerText = `الكمية المحسوبة لصالح ${member.name}:`;

    const memberQty = appState.members[memberId]?.items[itemId] || 0;
    const bagQty = getAccountBagQty(itemId);

    document.getElementById('fix-member-qty').value = memberQty;
    document.getElementById('fix-bag-qty').value = bagQty;

    modal.classList.add('open');
}

function closeFixModal() {
    const modal = document.getElementById('fix-modal');
    if (modal) modal.classList.remove('open');
}

function saveItemFix() {
    const memberId = document.getElementById('fix-target-member').value;
    const itemId = document.getElementById('fix-target-item').value;
    const memberQty = parseInt(document.getElementById('fix-member-qty').value, 10);
    const bagQty = parseInt(document.getElementById('fix-bag-qty').value, 10);

    if (isNaN(memberQty) || isNaN(bagQty) || memberQty < 0 || bagQty < 0) {
        alert("يرجى إدخال أرقام صحيحة موجبة.");
        return;
    }

    if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
    if (!appState.members[memberId].items) appState.members[memberId].items = {};
    if (!appState.accountInventory) appState.accountInventory = {};

    appState.members[memberId].items[itemId] = memberQty;
    appState.accountInventory[itemId] = bagQty;

    closeFixModal();
    refreshAllUI();
    saveStateDebounced();
    showToast("💾 تم تصحيح البيانات وحفظها بنجاح!");
}

// 20. FULL SHIFT MODAL
function openFullShiftModal(memberId) {
    const modal = document.getElementById('full-shift-modal');
    if (!modal) return;

    const member = getMember(memberId);
    document.getElementById('full-shift-title').innerText = `✨ جرد الشنطة السريع لـ ${member.name}`;

    const listBody = document.getElementById('full-shift-list-body');
    if (listBody) {
        listBody.innerHTML = ITEM_CATALOG.map(item => {
            const prevBag = getAccountBagQty(item.id);
            return `
                <div class="full-shift-row">
                    <div class="full-shift-item-info">
                        <img src="${item.icon}" alt="">
                        <div>
                            <strong>${item.nameKo}</strong>
                            <div style="font-size: 0.78rem; color: var(--text-muted);">${item.nameAr}</div>
                        </div>
                    </div>
                    <div class="full-shift-inputs">
                        <span class="full-shift-bag-prev">السابق في الشنطة: <strong>${formatNumber(prevBag)}</strong></span>
                        <input type="number" min="0" class="full-shift-input" id="bulk-shift-${item.id}" placeholder="${prevBag}" data-item-id="${item.id}" data-prev="${prevBag}">
                    </div>
                </div>
            `;
        }).join('');
    }

    modal.dataset.currentMember = memberId;
    modal.classList.add('open');
}

function closeFullShiftModal() {
    const modal = document.getElementById('full-shift-modal');
    if (modal) modal.classList.remove('open');
}

function commitFullShift() {
    const modal = document.getElementById('full-shift-modal');
    const memberId = modal.dataset.currentMember;
    if (!memberId) return;

    const inputs = modal.querySelectorAll('.full-shift-input');
    let totalAdded = 0;
    let itemsChanged = 0;

    inputs.forEach(input => {
        const valStr = input.value.trim();
        if (valStr !== '') {
            const newBag = parseInt(valStr, 10);
            const prevBag = parseInt(input.dataset.prev, 10) || 0;
            const itemId = input.dataset.itemId;
            const delta = newBag - prevBag;

            if (delta > 0) {
                if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
                if (!appState.members[memberId].items) appState.members[memberId].items = {};
                if (!appState.accountInventory) appState.accountInventory = {};

                appState.members[memberId].items[itemId] = (appState.members[memberId].items[itemId] || 0) + delta;
                appState.accountInventory[itemId] = newBag;
                totalAdded += delta;
                itemsChanged++;

                const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
                if (!appState.shiftLog) appState.shiftLog = [];
                appState.shiftLog.unshift({
                    id: 'shift_' + Date.now() + '_' + itemId,
                    memberId,
                    memberName: getMember(memberId).name,
                    avatar: getMember(memberId).avatar,
                    itemId,
                    itemNameKo: itemObj ? itemObj.nameKo : itemId,
                    itemNameAr: itemObj ? itemObj.nameAr : itemId,
                    prevBag,
                    newBag,
                    delta,
                    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
                });
            }
        }
    });

    closeFullShiftModal();

    if (itemsChanged > 0) {
        if (appState.shiftLog.length > 50) appState.shiftLog = appState.shiftLog.slice(0, 50);
        refreshAllUI();
        saveStateDebounced();
        showToast(`🎉 تم تسجيل الجرد واحتساب ${formatNumber(totalAdded)} قطعة جديدة لصالح ${getMember(memberId).name}!`);
    } else {
        showToast("لم تقم بإدخال أي زيادة جديدة في الشنطة.");
    }
}

// 21. SHIFT HISTORY LOG MODAL
function openShiftHistoryModal() {
    const modal = document.getElementById('history-modal');
    if (!modal) return;

    const listBody = document.getElementById('history-list-body');
    if (listBody) {
        const logs = appState.shiftLog || [];
        if (logs.length === 0) {
            listBody.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 30px;">لا توجد أي عمليات جرد مسجلة حتى الآن.</div>`;
        } else {
            listBody.innerHTML = logs.map(log => `
                <div class="history-item-row">
                    <div class="history-item-left">
                        <span style="font-size: 1.4rem;">${log.avatar || '👤'}</span>
                        <div>
                            <strong>${log.memberName}:</strong>
                            <span style="color: #cbd5e1; font-size: 0.88rem;">${log.itemNameKo} (${log.itemNameAr})</span>
                            <div style="font-size: 0.76rem; color: var(--text-muted);">
                                كانت في الشنطة: ${formatNumber(log.prevBag)} ➔ أصبحت: ${formatNumber(log.newBag)}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left;">
                        <span class="history-badge-delta">+${formatNumber(log.delta)}</span>
                        <div class="history-time">${log.time || ''}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    modal.classList.add('open');
}

function closeShiftHistoryModal() {
    const modal = document.getElementById('history-modal');
    if (modal) modal.classList.remove('open');
}

// 22. SMART BATCH SALE & PAYOUT SYSTEM
function openUniversalSellModal(defaultItemId) {
    const modal = document.getElementById('sell-modal');
    if (!modal) return;

    // Get list of all items that exist in warehouse (members + vault)
    const availableItems = ITEM_CATALOG.filter(item => {
        if (item.id === 'raw_meso') return false;
        let total = 0;
        TEAM_MEMBERS.forEach(m => {
            total += (appState.members[m.id]?.items?.[item.id] || 0);
        });
        total += (appState.vault?.items?.[item.id] || 0);
        return total > 0;
    });

    if (availableItems.length === 0) {
        alert("المخزن الكلي فارغ حالياً! لا توجد أي عناصر مسجلة لبيعها.");
        return;
    }

    const selectEl = document.getElementById('sell-item-select');
    const selectWrap = document.getElementById('sell-item-select-wrap');

    if (selectEl) {
        selectEl.innerHTML = availableItems.map(item => {
            let total = 0;
            TEAM_MEMBERS.forEach(m => {
                total += (appState.members[m.id]?.items?.[item.id] || 0);
            });
            total += (appState.vault?.items?.[item.id] || 0);
            return `<option value="${item.id}">${item.nameKo} (${item.nameAr}) - متوفر: ${formatNumber(total)} قطعة</option>`;
        }).join('');
    }

    const targetItemId = defaultItemId || availableItems[0].id;
    if (selectEl) selectEl.value = targetItemId;
    if (selectWrap) selectWrap.style.display = 'block';

    openSellModal(targetItemId);
}

function onUniversalItemSelect(itemId) {
    if (!itemId) return;
    openSellModal(itemId);
}

function openGrandSellModal(itemId) {
    const selectWrap = document.getElementById('sell-item-select-wrap');
    if (selectWrap) selectWrap.style.display = 'none';
    openSellModal(itemId);
}

function openSellModal(itemId) {
    const modal = document.getElementById('sell-modal');
    if (!modal) return;

    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!itemObj) return;

    currentSellItemId = itemId;
    document.getElementById('sell-target-item').value = itemId;

    // Set banner info
    const iconEl = document.getElementById('sell-item-icon');
    if (iconEl) iconEl.src = itemObj.icon;
    const nameKoEl = document.getElementById('sell-item-name-ko');
    if (nameKoEl) nameKoEl.innerText = itemObj.nameKo;
    const nameArEl = document.getElementById('sell-item-name-ar');
    if (nameArEl) nameArEl.innerText = itemObj.nameAr;

    let totalContributed = 0;
    TEAM_MEMBERS.forEach(m => {
        totalContributed += ((appState.members[m.id]?.items && appState.members[m.id].items[itemId]) || 0);
    });
    totalContributed += (appState.vault?.items?.[itemId] || 0);

    const availEl = document.getElementById('sell-available-qty');
    if (availEl) availEl.innerText = formatNumber(totalContributed);

    // Default inputs: sell ALL totalContributed pieces in warehouse to zero it out!
    const initialQty = totalContributed > 0 ? totalContributed : 1;
    document.getElementById('sell-input-qty').value = initialQty;
    
    // Price starts EMPTY - user MUST enter real selling price!
    document.getElementById('sell-input-unit-price').value = '';
    document.getElementById('sell-input-total-price').value = '';

    // Render Smart Price Hint
    const meta = getItemPriceMeta(itemId);
    const hintBox = document.getElementById('sell-smart-price-hint');
    if (hintBox) {
        if (meta.isActual) {
            hintBox.innerHTML = `
                <div class="smart-price-badge-box actual">
                    <div class="smart-price-text">
                        <span class="smart-price-icon">✨</span>
                        <div>
                            <strong style="color: #34d399; font-size: 0.92rem;">متوسط سعر البيع الفعلي المسجل: ${formatNumber(meta.price)} ميسو / للقطعة</strong>
                            <div style="font-size: 0.76rem; color: #94a3b8;">محسوب تلقائياً من ${meta.salesCount} عمليات بيع سابقة (${formatNumber(meta.totalSoldQty)} قطعة بيعت بالفعل)</div>
                        </div>
                    </div>
                    <button type="button" class="btn-use-smart-price" onclick="applySuggestedPrice(${meta.price})">
                        استخدام هذا السعر تلقائياً 🎯
                    </button>
                </div>
            `;
        } else if (meta.price > 0) {
            hintBox.innerHTML = `
                <div class="smart-price-badge-box guide">
                    <div class="smart-price-text">
                        <span class="smart-price-icon">💡</span>
                        <div>
                            <strong style="color: #facc15; font-size: 0.92rem;">السعر الاسترشادي المبدئي: ${formatNumber(meta.price)} ميسو / للقطعة</strong>
                            <div style="font-size: 0.76rem; color: #94a3b8;">لم يتم تسجيل بيع لهذا العنصر بعد، هذا السعر مقترح من الدليل</div>
                        </div>
                    </div>
                    <button type="button" class="btn-use-smart-price" onclick="applySuggestedPrice(${meta.price})">
                        استخدام هذا السعر 🎯
                    </button>
                </div>
            `;
        } else {
            hintBox.innerHTML = '';
        }
    }

    onSellInputsChange('qty');
    modal.classList.add('open');
}

function closeSellModal() {
    const modal = document.getElementById('sell-modal');
    if (modal) modal.classList.remove('open');
    currentSellItemId = null;
}

function onSellInputsChange(changedField) {
    const itemId = document.getElementById('sell-target-item').value || currentSellItemId;
    if (!itemId) return;

    let qty = parseInt(document.getElementById('sell-input-qty').value, 10);
    if (isNaN(qty) || qty < 0) qty = 0;

    let unit = parseInt(document.getElementById('sell-input-unit-price').value, 10);
    if (isNaN(unit) || unit < 0) unit = 0;

    let total = parseInt(document.getElementById('sell-input-total-price').value, 10);
    if (isNaN(total) || total < 0) total = 0;

    if (changedField === 'unit') {
        total = qty * unit;
        document.getElementById('sell-input-total-price').value = total > 0 ? total : '';
    } else if (changedField === 'total') {
        if (qty > 0) {
            unit = Math.round(total / qty);
            document.getElementById('sell-input-unit-price').value = unit > 0 ? unit : '';
        }
    } else if (changedField === 'qty') {
        if (unit > 0) {
            total = qty * unit;
            document.getElementById('sell-input-total-price').value = total > 0 ? total : '';
        }
    }

    // Calculate members breakdown (including Vault if it has stock)
    const payoutList = document.getElementById('sell-payout-list');
    if (!payoutList) return;

    let totalContributed = 0;
    const contributions = {};
    const entities = [...TEAM_MEMBERS];

    TEAM_MEMBERS.forEach(m => {
        const q = (appState.members[m.id]?.items && appState.members[m.id].items[itemId]) || 0;
        contributions[m.id] = q;
        totalContributed += q;
    });

    const vaultQ = (appState.vault?.items && appState.vault.items[itemId]) || 0;
    if (vaultQ > 0) {
        entities.push({ id: 'vault', name: 'المخزن العام (مستقل)', avatar: '🏛️' });
        contributions['vault'] = vaultQ;
        totalContributed += vaultQ;
    }

    if (totalContributed === 0) {
        payoutList.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 10px; text-align: center;">لا يملك أي عضو أو المخزن العام حالياً كميات مسجلة من هذا العنصر.</div>`;
        return;
    }

    if (total <= 0) {
        payoutList.innerHTML = `
            <div style="color: #fbbf24; background: rgba(245, 158, 11, 0.12); border: 1px dashed rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 12px; text-align: center; font-size: 0.88rem; font-weight: 700;">
                ⚠️ اكتب سعر البيع الفعلي أعلاه (سعر القطعة أو إجمالي المبلغ) لحساب وتوزيع الميسو كاش على الفريق والمخزن!
            </div>
        `;
        return;
    }

    payoutList.innerHTML = entities.map(m => {
        const memberFarmed = contributions[m.id] || 0;
        const ratio = totalContributed > 0 ? (memberFarmed / totalContributed) : 0;
        const pct = (ratio * 100).toFixed(1);
        
        let memberSoldShare = 0;
        if (qty >= totalContributed) {
            memberSoldShare = memberFarmed;
        } else {
            memberSoldShare = Math.round(ratio * qty);
        }
        const memberMesoShare = Math.round(ratio * total);

        return `
            <div class="payout-member-row">
                <div class="payout-member-info">
                    <span style="font-size: 1.3rem;">${m.avatar}</span>
                    <div>
                        <strong>${m.name}</strong>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">
                            ${m.id === 'vault' ? 'متوفر بالمخزن' : 'جمع'} ${formatNumber(memberFarmed)} قطعة (${pct}%)
                        </div>
                    </div>
                </div>
                <div style="text-align: left;">
                    <div class="payout-meso-amount">+${formatNumber(memberMesoShare)} ميسو كاش</div>
                    <div style="font-size: 0.75rem; color: #f87171;">
                        سيتم تصفير/خصم: -${formatNumber(memberSoldShare)} قطعة
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function confirmExecuteSale() {
    const itemId = document.getElementById('sell-target-item').value || currentSellItemId;
    if (!itemId) return;

    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!itemObj) return;

    const soldQty = parseInt(document.getElementById('sell-input-qty').value, 10);
    const totalRevenue = parseInt(document.getElementById('sell-input-total-price').value, 10);
    const unitPrice = parseInt(document.getElementById('sell-input-unit-price').value, 10) || (soldQty > 0 ? Math.round(totalRevenue / soldQty) : 0);

    if (isNaN(soldQty) || soldQty <= 0) {
        alert("يرجى إدخال كمية بيع صحيحة أكبر من 0.");
        return;
    }

    if (isNaN(totalRevenue) || totalRevenue <= 0) {
        alert("يرجى إدخال سعر بيع صحيح أكبر من 0.");
        return;
    }

    let totalContributed = 0;
    const contributions = {};
    const entities = [...TEAM_MEMBERS];

    TEAM_MEMBERS.forEach(m => {
        const q = (appState.members[m.id]?.items && appState.members[m.id].items[itemId]) || 0;
        contributions[m.id] = q;
        totalContributed += q;
    });

    const vaultQ = (appState.vault?.items && appState.vault.items[itemId]) || 0;
    if (vaultQ > 0) {
        entities.push({ id: 'vault', name: 'المخزن العام', avatar: '🏛️' });
        contributions['vault'] = vaultQ;
        totalContributed += vaultQ;
    }

    if (totalContributed === 0) {
        alert("لا يملك أي عضو أو المخزن العام حالياً كميات مسجلة من هذا العنصر لبيعها.");
        return;
    }

    const confirmMsg = 
        `هل أنت متأكد من تنفيذ عملية بيع ${formatNumber(soldQty)} قطعة من (${itemObj.nameKo})؟\n\n` +
        `• إجمالي المبلغ المحصل: ${formatNumber(totalRevenue)} ميسو كاش\n` +
        `• سيتم خصم القطع المباعة فوراً من الشنطة ومن حساب كل جهة.\n` +
        `• سيتم إضافة الميسو كاش نقد مباشر في حساب كل عضو والمخزن حسب نسبة المساهمة!`;

    if (!confirm(confirmMsg)) return;

    const payouts = [];

    entities.forEach(m => {
        const memberFarmed = contributions[m.id] || 0;
        const ratio = totalContributed > 0 ? (memberFarmed / totalContributed) : 0;

        let memberSoldShare = 0;
        if (soldQty >= totalContributed) {
            memberSoldShare = memberFarmed;
        } else {
            memberSoldShare = Math.round(ratio * soldQty);
        }
        const memberMesoShare = Math.round(ratio * totalRevenue);

        if (m.id === 'vault') {
            if (!appState.vault) appState.vault = { items: {} };
            if (!appState.vault.items) appState.vault.items = {};

            const curItems = appState.vault.items[itemId] || 0;
            const newItems = Math.max(0, curItems - memberSoldShare);
            if (newItems === 0) {
                delete appState.vault.items[itemId];
            } else {
                appState.vault.items[itemId] = newItems;
            }

            const curMeso = appState.vault.items['raw_meso'] || 0;
            appState.vault.items['raw_meso'] = curMeso + memberMesoShare;
        } else {
            if (!appState.members[m.id]) appState.members[m.id] = { items: {} };
            if (!appState.members[m.id].items) appState.members[m.id].items = {};

            // Deduct sold items
            const curItems = appState.members[m.id].items[itemId] || 0;
            const newItems = Math.max(0, curItems - memberSoldShare);
            if (newItems === 0) {
                delete appState.members[m.id].items[itemId];
            } else {
                appState.members[m.id].items[itemId] = newItems;
            }

            // Add cash Meso to member's account!
            const curMeso = appState.members[m.id].items['raw_meso'] || 0;
            appState.members[m.id].items['raw_meso'] = curMeso + memberMesoShare;
        }

        payouts.push({
            memberId: m.id,
            name: m.name,
            avatar: m.avatar,
            qtyDeducted: memberSoldShare,
            mesoEarned: memberMesoShare
        });
    });

    // Update account bag
    const curBag = getAccountBagQty(itemId);
    if (!appState.accountInventory) appState.accountInventory = {};
    appState.accountInventory[itemId] = Math.max(0, curBag - soldQty);

    // Log sale
    if (!appState.salesLog) appState.salesLog = [];
    appState.salesLog.unshift({
        id: 'sale_' + Date.now(),
        itemId,
        itemNameKo: itemObj.nameKo,
        itemNameAr: itemObj.nameAr,
        itemIcon: itemObj.icon,
        soldQty,
        unitPrice,
        totalRevenue,
        payouts,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('ar-EG')
    });
    if (appState.salesLog.length > 50) appState.salesLog.pop();

    closeSellModal();
    refreshAllUI();
    saveStateDebounced();

    showToast(`🎉 تم بيع ${formatNumber(soldQty)} قطعة بنجاح وإضافة ${formatNumber(totalRevenue)} ميسو كاش لحسابات الفريق والمخزن!`, "cloud");
}

// ========================================================
// 22B. SINGLE MEMBER SALE SYSTEM
// ========================================================
let currentMemberSellTarget = { memberId: null, itemId: null };

function openMemberSellModal(memberId, itemId) {
    const modal = document.getElementById('member-sell-modal');
    if (!modal) return;

    const member = getMember(memberId);
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!member || !itemObj) return;

    const curMemberQty = memberId === 'vault'
        ? ((appState.vault?.items && appState.vault.items[itemId]) || 0)
        : ((appState.members[memberId]?.items && appState.members[memberId].items[itemId]) || 0);

    if (curMemberQty <= 0) {
        alert(memberId === 'vault' ? `لا توجد أي قطع مسجلة من (${itemObj.nameKo}) في المخزن العام لبيعها.` : `لا يملك ${member.name} أي قطع مسجلة من (${itemObj.nameKo}) لبيعها.`);
        return;
    }

    currentMemberSellTarget = { memberId, itemId };
    document.getElementById('member-sell-target-member').value = memberId;
    document.getElementById('member-sell-target-item').value = itemId;

    document.getElementById('member-sell-modal-title').innerText = memberId === 'vault'
        ? `💰 بيع عنصر من المخزن العام المشترك`
        : `💰 بيع عنصر لحساب ${member.name} فقط`;
    const ownerBadge = document.getElementById('member-sell-owner-badge');
    if (ownerBadge) {
        ownerBadge.innerText = memberId === 'vault' ? `🏛️ المخزن: رصيد عام مستقل` : `👤 حساب: ${member.name}`;
    }

    const iconEl = document.getElementById('member-sell-item-icon');
    if (iconEl) iconEl.src = itemObj.icon;
    const nameKoEl = document.getElementById('member-sell-item-name-ko');
    if (nameKoEl) nameKoEl.innerText = itemObj.nameKo;
    const nameArEl = document.getElementById('member-sell-item-name-ar');
    if (nameArEl) nameArEl.innerText = itemObj.nameAr;

    const availEl = document.getElementById('member-sell-available-qty');
    if (availEl) availEl.innerText = formatNumber(curMemberQty);

    document.getElementById('member-sell-summary-name').innerText = member.name;
    document.getElementById('member-sell-summary-name2').innerText = member.name;

    // Default: sell ALL of member's pieces
    document.getElementById('member-sell-input-qty').value = curMemberQty;
    document.getElementById('member-sell-input-unit-price').value = '';
    document.getElementById('member-sell-input-total-price').value = '';

    // Render Smart Price Hint for member sale
    const meta = getItemPriceMeta(itemId);
    const memberHintBox = document.getElementById('member-sell-smart-price-hint');
    if (memberHintBox) {
        if (meta.isActual) {
            memberHintBox.innerHTML = `
                <div class="smart-price-badge-box actual">
                    <div class="smart-price-text">
                        <span class="smart-price-icon">✨</span>
                        <div>
                            <strong style="color: #34d399; font-size: 0.92rem;">متوسط سعر البيع الفعلي المسجل: ${formatNumber(meta.price)} ميسو / للقطعة</strong>
                            <div style="font-size: 0.76rem; color: #94a3b8;">محسوب تلقائياً من ${meta.salesCount} عمليات بيع سابقة (${formatNumber(meta.totalSoldQty)} قطعة)</div>
                        </div>
                    </div>
                    <button type="button" class="btn-use-smart-price" onclick="applyMemberSuggestedPrice(${meta.price})">
                        استخدام هذا السعر تلقائياً 🎯
                    </button>
                </div>
            `;
        } else if (meta.price > 0) {
            memberHintBox.innerHTML = `
                <div class="smart-price-badge-box guide">
                    <div class="smart-price-text">
                        <span class="smart-price-icon">💡</span>
                        <div>
                            <strong style="color: #facc15; font-size: 0.92rem;">السعر الاسترشادي المبدئي: ${formatNumber(meta.price)} ميسو / للقطعة</strong>
                            <div style="font-size: 0.76rem; color: #94a3b8;">سعر مقترح من الدليل</div>
                        </div>
                    </div>
                    <button type="button" class="btn-use-smart-price" onclick="applyMemberSuggestedPrice(${meta.price})">
                        استخدام هذا السعر 🎯
                    </button>
                </div>
            `;
        } else {
            memberHintBox.innerHTML = '';
        }
    }

    onMemberSellInputsChange('qty');
    modal.classList.add('open');
}

function closeMemberSellModal() {
    const modal = document.getElementById('member-sell-modal');
    if (modal) modal.classList.remove('open');
    currentMemberSellTarget = { memberId: null, itemId: null };
}

function setMemberSellAllQty() {
    const { memberId, itemId } = currentMemberSellTarget;
    if (!memberId || !itemId) return;
    const curMemberQty = memberId === 'vault'
        ? ((appState.vault?.items && appState.vault.items[itemId]) || 0)
        : ((appState.members[memberId]?.items && appState.members[memberId].items[itemId]) || 0);
    document.getElementById('member-sell-input-qty').value = curMemberQty;
    onMemberSellInputsChange('qty');
}

function onMemberSellInputsChange(changedField) {
    const { memberId, itemId } = currentMemberSellTarget;
    if (!memberId || !itemId) return;

    let qty = parseInt(document.getElementById('member-sell-input-qty').value, 10);
    if (isNaN(qty) || qty < 0) qty = 0;

    let unit = parseInt(document.getElementById('member-sell-input-unit-price').value, 10);
    if (isNaN(unit) || unit < 0) unit = 0;

    let total = parseInt(document.getElementById('member-sell-input-total-price').value, 10);
    if (isNaN(total) || total < 0) total = 0;

    if (changedField === 'unit') {
        total = qty * unit;
        document.getElementById('member-sell-input-total-price').value = total > 0 ? total : '';
    } else if (changedField === 'total') {
        if (qty > 0) {
            unit = Math.round(total / qty);
            document.getElementById('member-sell-input-unit-price').value = unit > 0 ? unit : '';
        }
    } else if (changedField === 'qty') {
        if (unit > 0) {
            total = qty * unit;
            document.getElementById('member-sell-input-total-price').value = total > 0 ? total : '';
        }
    }

    const sumMeso = document.getElementById('member-sell-summary-meso');
    const sumItems = document.getElementById('member-sell-summary-items');
    const sumBag = document.getElementById('member-sell-summary-bag');

    if (total <= 0) {
        if (sumMeso) sumMeso.innerText = 'بانتظار كتابة سعر البيع...';
        if (sumItems) sumItems.innerText = `-${formatNumber(qty)} قطعة`;
        if (sumBag) sumBag.innerText = `-${formatNumber(qty)} قطعة`;
    } else {
        if (sumMeso) sumMeso.innerText = `+${formatNumber(total)} ميسو كاش`;
        if (sumItems) sumItems.innerText = `-${formatNumber(qty)} قطعة`;
        if (sumBag) sumBag.innerText = `-${formatNumber(qty)} قطعة`;
    }
}

function confirmExecuteMemberSale() {
    const memberId = document.getElementById('member-sell-target-member').value;
    const itemId = document.getElementById('member-sell-target-item').value;
    if (!memberId || !itemId) return;

    const member = getMember(memberId);
    const itemObj = ITEM_CATALOG.find(i => i.id === itemId);
    if (!member || !itemObj) return;

    const soldQty = parseInt(document.getElementById('member-sell-input-qty').value, 10);
    const totalRevenue = parseInt(document.getElementById('member-sell-input-total-price').value, 10);
    const unitPrice = parseInt(document.getElementById('member-sell-input-unit-price').value, 10) || (soldQty > 0 ? Math.round(totalRevenue / soldQty) : 0);

    const curMemberQty = memberId === 'vault'
        ? ((appState.vault?.items && appState.vault.items[itemId]) || 0)
        : ((appState.members[memberId]?.items && appState.members[memberId].items[itemId]) || 0);

    if (isNaN(soldQty) || soldQty <= 0) {
        alert("يرجى إدخال كمية بيع صحيحة أكبر من 0.");
        return;
    }

    if (soldQty > curMemberQty) {
        alert(`الكمية المراد بيعها (${formatNumber(soldQty)}) أكبر من الرصيد المتوفر لدى ${member.name} (${formatNumber(curMemberQty)} قطعة).`);
        return;
    }

    if (isNaN(totalRevenue) || totalRevenue <= 0) {
        alert("يجب تحديد وكتابة سعر بيع صحيح أكبر من 0 قبل تأكيد البيع.");
        return;
    }

    const confirmMsg = memberId === 'vault'
        ? `هل أنت متأكد من بيع ${formatNumber(soldQty)} قطعة من (${itemObj.nameKo}) من المخزن العام المشترك؟\n\n` +
          `• سيتم إضافة: +${formatNumber(totalRevenue)} ميسو كاش نقد حقيقي في رصيد كاش المخزن العام.\n` +
          `• سيتم تصفير/خصم: -${formatNumber(soldQty)} قطعة من المخزن العام ومن الشنطة والمخزن الكلي.`
        : `هل أنت متأكد من بيع ${formatNumber(soldQty)} قطعة من (${itemObj.nameKo}) لحساب ${member.name} فقط؟\n\n` +
          `• سيتم إضافة: +${formatNumber(totalRevenue)} ميسو كاش نقد حقيقي في رصيد ${member.name}.\n` +
          `• سيتم تصفير/خصم: -${formatNumber(soldQty)} قطعة من دروبات ${member.name} ومن الشنطة والمخزن الكلي.`;

    if (!confirm(confirmMsg)) return;

    if (memberId === 'vault') {
        if (!appState.vault) appState.vault = { items: {} };
        if (!appState.vault.items) appState.vault.items = {};

        const newItems = Math.max(0, curMemberQty - soldQty);
        if (newItems === 0) {
            delete appState.vault.items[itemId];
        } else {
            appState.vault.items[itemId] = newItems;
        }

        const curMeso = appState.vault.items['raw_meso'] || 0;
        appState.vault.items['raw_meso'] = curMeso + totalRevenue;
    } else {
        if (!appState.members[memberId]) appState.members[memberId] = { items: {} };
        if (!appState.members[memberId].items) appState.members[memberId].items = {};

        // 1. Deduct items from member
        const newItems = Math.max(0, curMemberQty - soldQty);
        if (newItems === 0) {
            delete appState.members[memberId].items[itemId];
        } else {
            appState.members[memberId].items[itemId] = newItems;
        }

        // 2. Add cash Meso to member's account!
        const curMeso = appState.members[memberId].items['raw_meso'] || 0;
        appState.members[memberId].items['raw_meso'] = curMeso + totalRevenue;
    }

    // 3. Deduct from account bag
    const curBag = getAccountBagQty(itemId);
    if (!appState.accountInventory) appState.accountInventory = {};
    appState.accountInventory[itemId] = Math.max(0, curBag - soldQty);

    // 4. Log in sales history
    if (!appState.salesLog) appState.salesLog = [];
    appState.salesLog.unshift({
        id: 'sale_' + Date.now(),
        type: 'member_sale',
        memberId: member.id,
        memberName: member.name,
        memberAvatar: member.avatar,
        itemId,
        itemNameKo: itemObj.nameKo,
        itemNameAr: itemObj.nameAr,
        itemIcon: itemObj.icon,
        soldQty,
        unitPrice,
        totalRevenue,
        payouts: [{
            memberId: member.id,
            name: member.name,
            avatar: member.avatar,
            qtyDeducted: soldQty,
            mesoEarned: totalRevenue
        }],
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('ar-EG')
    });
    if (appState.salesLog.length > 50) appState.salesLog.pop();

    closeMemberSellModal();
    refreshAllUI();
    saveStateDebounced();

    showToast(`🎉 تم بيع ${formatNumber(soldQty)} قطعة بنجاح وإيداع ${formatNumber(totalRevenue)} ميسو كاش في رصيد ${member.name}!`, "cloud");
}

function openSalesHistoryModal() {
    const modal = document.getElementById('sales-history-modal');
    if (!modal) return;

    const listEl = document.getElementById('sales-history-list');
    if (listEl) {
        const sales = appState.salesLog || [];
        if (sales.length === 0) {
            listEl.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 30px;">لم يتم تسجيل أي عمليات بيع بعد. بمجرد بيع أي دروب سيظهر توزيعه هنا بالتفصيل!</div>`;
        } else {
            listEl.innerHTML = sales.map(s => {
                const isMemberSale = s.type === 'member_sale';
                return `
                    <div class="sales-timeline-row">
                        <div class="sales-timeline-header">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img src="${s.itemIcon}" alt="" style="width: 32px; height: 32px; object-fit: contain; border-radius: 6px; background: #000;">
                                <div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <strong>${s.itemNameKo} (${s.itemNameAr})</strong>
                                        ${isMemberSale ? 
                                            `<span style="background: rgba(56,189,248,0.2); color: #38bdf8; font-size: 0.72rem; padding: 2px 8px; border-radius: 6px; font-weight: 800;">👤 بيع خاص لحساب ${s.memberName}</span>` : 
                                            `<span style="background: rgba(251,191,36,0.2); color: #fbbf24; font-size: 0.72rem; padding: 2px 8px; border-radius: 6px; font-weight: 800;">👑 بيع وتصفير المخزن الكلي</span>`}
                                    </div>
                                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                                        تم بيع: ${formatNumber(s.soldQty)} قطعة | سعر الواحدة: ${formatNumber(s.unitPrice)} ميسو
                                    </div>
                                </div>
                            </div>
                            <div style="text-align: left;">
                                <div style="color: var(--accent-gold); font-size: 1.1rem; font-weight: 900;">
                                    +${formatNumber(s.totalRevenue)} ميسو
                                </div>
                                <div style="font-size: 0.75rem; color: var(--text-dim);">
                                    ${s.date || ''} - ${s.time || ''}
                                </div>
                            </div>
                        </div>
                        <div class="sales-payouts-mini-grid">
                            <span style="font-weight: 800; color: #cbd5e1;">${isMemberSale ? 'المستفيد:' : 'توزيع الكاش:'}</span>
                            ${s.payouts.map(p => `
                                <span class="sales-payout-chip">
                                    ${p.avatar} ${p.name}: 
                                    <strong style="color: var(--accent-gold);">+${formatNumber(p.mesoEarned)} ميسو</strong>
                                    <span style="font-size: 0.72rem; color: #f87171;">(-${formatNumber(p.qtyDeducted)})</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    modal.classList.add('open');
}

function closeSalesHistoryModal() {
    const modal = document.getElementById('sales-history-modal');
    if (modal) modal.classList.remove('open');
}

