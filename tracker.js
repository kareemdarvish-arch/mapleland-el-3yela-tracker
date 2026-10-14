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
    accountInventory: {},
    shiftLog: [],
    activeTab: 'mohamed',
    activeCategory: 'all',
    searchQuery: '',
    isMasterTableOpen: false
};

function getMember(memberId) {
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
        if (initial.data.accountInventory) appState.accountInventory = initial.data.accountInventory;
        if (initial.data.shiftLog) appState.shiftLog = initial.data.shiftLog;
    }

    // Subscribe to incoming realtime changes (from other players)
    window.teamDb.onDataChange((incomingData, source) => {
        if (incomingData) {
            if (incomingData.members) appState.members = incomingData.members;
            if (incomingData.accountInventory) appState.accountInventory = incomingData.accountInventory;
            if (incomingData.shiftLog) appState.shiftLog = incomingData.shiftLog;
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
        const totalItemMeso = memberQty * item.price;
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
                                🏷️ ${item.badge} (~${formatNumber(item.price)})
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
                    <button class="btn-card-fix" onclick="openItemFixModal('${memberId}', '${item.id}')" title="تعديل مباشر في حال حدث خطأ أو كتبت رقم غلط">
                        ✏️ تصحيح خطأ
                    </button>
                    <button class="btn-toggle-manual" onclick="toggleManualWrap('${memberId}', '${item.id}')">
                        ➕ أزرار الزيادة (+/-)
                    </button>
                    <span class="card-total-meso" id="meso-${memberId}-${item.id}" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-gold);">
                        ${formatNumber(totalItemMeso)} ميسو
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
            mesoEl.innerText = `${formatNumber(qty * itemObj.price)} ميسو`;
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
                // Raw meso is counted 1:1, others multiply by price
                const val = qty * item.price;
                memberMeso += val;
                if (item.id !== 'raw_meso') {
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
        if (mesoEl) mesoEl.innerText = formatMesoCompact(memberMeso);

        // Update column card total
        const colTotalEl = document.getElementById(`column-total-${member.id}`);
        if (colTotalEl) colTotalEl.innerText = formatMesoCompact(memberMeso);
    });

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

function updateMasterTable(aggregates, totalMeso) {
    const tbody = document.getElementById('master-table-body');
    if (!tbody) return;

    // Filter to items that have at least 1 collected
    const collectedItems = Object.values(aggregates).filter(a => a.totalQty > 0);

    if (collectedItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">لم يتم جمع أي عناصر بعد. ابدأ بإضافة دروباتك في بروفايلك!</td></tr>`;
        return;
    }

    // Sort by total meso descending
    collectedItems.sort((a, b) => (b.totalQty * b.price) - (a.totalQty * a.price));

    tbody.innerHTML = collectedItems.map(item => {
        const itemTotalMeso = item.totalQty * item.price;
        const mohamedQty = item.byMember['mohamed'] || 0;
        const amyQty = item.byMember['amy'] || 0;
        const abdoQty = item.byMember['abdo'] || 0;

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
                <td style="color: var(--accent-gold); font-weight: 800;">~${formatNumber(item.price)}</td>
                <td style="font-size: 1.1rem; font-weight: 900; color: var(--accent-cyan);">${formatNumber(item.totalQty)}</td>
                <td style="font-weight: 900; color: var(--accent-gold);">${formatMesoCompact(itemTotalMeso)}</td>
                <td>
                    <span style="color: #38bdf8; font-weight: 800;">محمد: ${mohamedQty}</span> | 
                    <span style="color: #ec4899; font-weight: 800;">طنط ايمي: ${amyQty}</span> | 
                    <span style="color: #f97316; font-weight: 800;">عبدالرحمن: ${abdoQty}</span>
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
                        <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 800; min-width: 70px; text-align: left;">
                            ${formatMesoCompact(qty * item.price)}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    });
}

// 10. REFRESH ALL UI
function refreshAllUI() {
    TEAM_MEMBERS.forEach(member => {
        const grid = document.getElementById(`grid-${member.id}`);
        if (grid) {
            grid.innerHTML = renderItemCards(member.id);
        }
    });
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
        grid.innerHTML = renderItemCards(memberId);
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
        grid.innerHTML = renderItemCards(memberId);
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
    
    let totalMeso = 0;
    let totalQty = 0;
    let lines = [`📊 تقرير فارمينج MapleLand - ${memberObj.name} (${memberObj.role})`];
    lines.push(`📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}`);
    lines.push(`---------------------------------`);

    ITEM_CATALOG.forEach(item => {
        const qty = memberItems[item.id] || 0;
        if (qty > 0) {
            const val = qty * item.price;
            totalMeso += val;
            totalQty += qty;
            lines.push(`▫️ ${item.nameKo} (${item.nameAr}): ${formatNumber(qty)} قطعة = ${formatNumber(val)} ميسو`);
        }
    });

    lines.push(`---------------------------------`);
    lines.push(`📦 إجمالي القطع: ${formatNumber(totalQty)} قطعة`);
    lines.push(`💰 إجمالي ثروة الميسو: ${formatNumber(totalMeso)} ميسو (~${formatMesoCompact(totalMeso)})`);
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
    let lines = [`🏆 تقرير المحصلة الكلية لفريق فارمينج MapleLand 🏆`];
    lines.push(`👥 الفريق: محمد | طنط ايمي | عبدالرحمن`);
    lines.push(`📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}`);
    lines.push(`=================================`);

    TEAM_MEMBERS.forEach(m => {
        let memberMeso = 0;
        let memberItems = 0;
        const items = appState.members[m.id]?.items || {};

        ITEM_CATALOG.forEach(i => {
            const q = items[i.id] || 0;
            if (q > 0) {
                memberMeso += q * i.price;
                if (i.id !== 'raw_meso') memberItems += q;
            }
        });

        grandTotalMeso += memberMeso;
        grandTotalItems += memberItems;
        lines.push(`👤 ${m.name}: ${formatNumber(memberItems)} قطعة | ${formatMesoCompact(memberMeso)}`);
    });

    lines.push(`=================================`);
    lines.push(`📦 إجمالي دروبات الفريق ككل: ${formatNumber(grandTotalItems)} قطعة`);
    lines.push(`💰 إجمالي ميسو الفريق المحصل: ${formatNumber(grandTotalMeso)} ميسو (~${formatMesoCompact(grandTotalMeso)})`);
    lines.push(`=================================`);
    lines.push(`✨ شركة المرعبين المحدودة - MapleLand`);

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
            if (imported && imported.members) {
                appState.members = imported.members;
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
