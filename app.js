/**
 * 716QX Lounge OS 3.5 — Apex Edition
 * Core Business Logic, State Engine & POS Controller
 * Ultra-Secure Sanitization | Web Audio Synthesis | Silent Error Boundaries
 */

(function () {
    'use strict';

    /* ==========================================================================
       STORAGE & SCHEMA INITIALIZATION
       ========================================================================== */
    const DB_KEY = '716QX_OS_DB_3.5';
    const SCHEMA_VERSION = 3.5;

    const DEFAULT_DATA = {
        schemaVersion: SCHEMA_VERSION,
        categories: [
            { id: 'cat_hot', name: 'مشروبات ساخنة', icon: '☕' },
            { id: 'cat_juices', name: 'عصائر طبيعية', icon: '🍹' },
            { id: 'cat_cold', name: 'مشروبات غازية وباردة', icon: '🥤' },
            { id: 'cat_hookah', name: 'أراجيل فاخرة', icon: '💨' },
            { id: 'cat_table', name: 'تنس ومنضدة', icon: '🏓' },
            { id: 'cat_ps', name: 'بلايستيشن 5 (PS5)', icon: '🎮' },
            { id: 'cat_billiards', name: 'صالة البليارد', icon: '🎱' }
        ],
        menu: [
            { id: 'm_hot_1', catId: 'cat_hot', name: 'شاي عراقي مهيّل', price: 250, icon: '☕', isTime: false },
            { id: 'm_hot_2', catId: 'cat_hot', name: 'آيس كوفي مثلج', price: 1000, icon: '🧋', isTime: false },
            { id: 'm_hot_3', catId: 'cat_hot', name: 'نودلز إندومي حار', price: 1000, icon: '🍜', isTime: false },
            { id: 'm_hot_4', catId: 'cat_hot', name: 'قهوة تركي مخصوص', price: 500, icon: '🍵', isTime: false },
            
            { id: 'm_j_0', catId: 'cat_juices', name: 'عصير برتقال فريش', price: 1000, icon: '🍊', isTime: false },
            { id: 'm_j_1', catId: 'cat_juices', name: 'عصير موز حليب طبيعي', price: 1000, icon: '🍌', isTime: false },
            { id: 'm_j_2', catId: 'cat_juices', name: 'كوكتيل فراولة مثلجة', price: 1000, icon: '🍓', isTime: false },
            { id: 'm_j_3', catId: 'cat_juices', name: 'عصير رمان فريش', price: 1000, icon: '🍹', isTime: false },
            { id: 'm_j_4', catId: 'cat_juices', name: 'عصير بطيخ أحمر مثلج', price: 1000, icon: '🍉', isTime: false },
            { id: 'm_j_5', catId: 'cat_juices', name: 'ليمون ونعناع منعش', price: 1000, icon: '🍋', isTime: false },

            { id: 'm_c_0', catId: 'cat_cold', name: 'سفن أب مبرّد', price: 500, notes: 'مع كأس ثلج: 750', icon: '🥤', isTime: false },
            { id: 'm_c_1', catId: 'cat_cold', name: 'ماونتن ديو ثلج', price: 500, notes: 'مع كأس ثلج: 750', icon: '🥤', isTime: false },
            { id: 'm_c_2', catId: 'cat_cold', name: 'بيبسي كولا مبرّد', price: 500, notes: 'مع كأس ثلج: 750', icon: '🥤', isTime: false },
            { id: 'm_c_3', catId: 'cat_cold', name: 'ميرندا برتقال', price: 500, notes: 'مع كأس ثلج: 750', icon: '🥤', isTime: false },
            { id: 'm_c_4', catId: 'cat_cold', name: 'مشروب طاقة تايجر', price: 1250, notes: '', icon: '⚡', isTime: false },
            { id: 'm_c_5', catId: 'cat_cold', name: 'مياه معدنية نقية', price: 500, notes: '', icon: '💧', isTime: false },

            { id: 'm_hk_0', catId: 'cat_hookah', name: 'أركيلة تفاحتين فاخر', price: 2500, icon: '💨', isTime: false },
            { id: 'm_hk_1', catId: 'cat_hookah', name: 'أركيلة علك ونعناع بارد', price: 2500, icon: '💨', isTime: false },
            { id: 'm_hk_2', catId: 'cat_hookah', name: 'أركيلة ليمون ونعناع', price: 2500, icon: '💨', isTime: false },
            { id: 'm_hk_3', catId: 'cat_hookah', name: 'أركيلة مكس إنجليزي', price: 2500, icon: '💨', isTime: false },

            { id: 'm_tb_1', catId: 'cat_table', name: 'كيم منضدة مفتوح', price: 500, icon: '🏓', isTime: true, timerMode: 'open' },
            { id: 'm_tb_2', catId: 'cat_table', name: 'كيم منضدة زوجي', price: 1000, icon: '🏓', isTime: true, timerMode: 'open' },
            { id: 'm_tb_3', catId: 'cat_table', name: '10 دقائق منضدة', price: 500, icon: '⏱', isTime: true, timerMode: 'countdown', durationSeconds: 600 },
            { id: 'm_tb_4', catId: 'cat_table', name: 'نصف ساعة منضدة', price: 2000, icon: '⏱', isTime: true, timerMode: 'countdown', durationSeconds: 1800 },
            { id: 'm_tb_5', catId: 'cat_table', name: 'ساعة كاملة منضدة', price: 4000, icon: '⏱', isTime: true, timerMode: 'countdown', durationSeconds: 3600 },

            { id: 'm_ps_1', catId: 'cat_ps', name: 'ساعة PS5 كونسول', price: 4000, icon: '🎮', isTime: true, timerMode: 'countdown', durationSeconds: 3600 },
            { id: 'm_ps_2', catId: 'cat_ps', name: 'كيم PS5 زوجي مفتوح', price: 2000, icon: '🎮', isTime: true, timerMode: 'open' },
            { id: 'm_ps_3', catId: 'cat_ps', name: 'نصف ساعة PS5', price: 2000, icon: '🎮', isTime: true, timerMode: 'countdown', durationSeconds: 1800 },
            { id: 'm_ps_4', catId: 'cat_ps', name: 'كيم PS5 فردي مفتوح', price: 1000, icon: '🎮', isTime: true, timerMode: 'open' },

            { id: 'm_bl_1', catId: 'cat_billiards', name: 'كيم بليارد فردي', price: 1000, icon: '🎱', isTime: false },
            { id: 'm_bl_2', catId: 'cat_billiards', name: 'كيم بليارد زوجي', price: 2000, icon: '🎱', isTime: false },
            { id: 'm_bl_3', catId: 'cat_billiards', name: 'نصف ساعة بليارد', price: 2500, icon: '⏱', isTime: true, timerMode: 'countdown', durationSeconds: 1800 },
            { id: 'm_bl_4', catId: 'cat_billiards', name: 'ساعة كاملة بليارد', price: 5000, icon: '⏱', isTime: true, timerMode: 'countdown', durationSeconds: 3600 }
        ],
        tables: {},
        invoices: [],
        debts: {},
        stats: {
            daily: 0,
            yesterday: 0,
            monthly: 0,
            lastResetDate: new Date().toDateString()
        }
    };

    let db = null;

    function loadDatabase() {
        try {
            const raw = localStorage.getItem(DB_KEY);
            if (!raw) {
                db = JSON.parse(JSON.stringify(DEFAULT_DATA));
                saveDatabase();
                return;
            }
            db = JSON.parse(raw);
            if (!db || !db.categories || db.schemaVersion !== SCHEMA_VERSION) {
                // Non-destructive schema migration
                db.categories = db.categories || JSON.parse(JSON.stringify(DEFAULT_DATA.categories));
                db.menu = db.menu || JSON.parse(JSON.stringify(DEFAULT_DATA.menu));
                db.tables = db.tables || {};
                db.invoices = db.invoices || [];
                db.debts = db.debts || {};
                db.stats = db.stats || JSON.parse(JSON.stringify(DEFAULT_DATA.stats));
                db.schemaVersion = SCHEMA_VERSION;
                saveDatabase();
            }
        } catch (e) {
            console.error('[DB Engine] Data corrupted, reverting to defaults safely:', e);
            db = JSON.parse(JSON.stringify(DEFAULT_DATA));
            saveDatabase();
        }
    }

    function saveDatabase() {
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(db));
        } catch (e) {
            console.error('[DB Engine] Quota exceeded or storage failure:', e);
            window.showToast('تعذر حفظ البيانات في الذاكرة المحلية', 'error');
        }
    }

    /* ==========================================================================
       SYNTHESIZED WEB AUDIO ENGINE
       ========================================================================== */
    window.AudioEngine = {
        ctx: null,
        isMuted: false,

        init() {
            if (!this.ctx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        },

        mute() {
            this.isMuted = true;
        },

        unmute() {
            this.isMuted = false;
        },

        play(type) {
            if (this.isMuted) return;
            try {
                this.init();
                if (!this.ctx) return;

                const t = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                if (type === 'click') {
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(880, t);
                    gain.gain.setValueAtTime(0.02, t);
                    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
                    osc.start(t);
                    osc.stop(t + 0.04);
                } else if (type === 'success') {
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(523.25, t); // C5
                    osc.frequency.setValueAtTime(659.25, t + 0.06); // E5
                    osc.frequency.setValueAtTime(783.99, t + 0.12); // G5
                    gain.gain.setValueAtTime(0.05, t);
                    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
                    osc.start(t);
                    osc.stop(t + 0.28);
                } else if (type === 'error') {
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(180, t);
                    osc.frequency.setValueAtTime(140, t + 0.08);
                    gain.gain.setValueAtTime(0.06, t);
                    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
                    osc.start(t);
                    osc.stop(t + 0.22);
                }
            } catch (err) {
                // Audio failure must never disrupt POS operation
            }
        }
    };

    /* ==========================================================================
       TOAST STREAM ARCHITECTURE
       ========================================================================== */
    window.showToast = (message, type = 'success') => {
        try {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            const sanitizedMsg = window.SecurityCore ? window.SecurityCore.sanitize(message) : message;

            let borderTheme = 'border-cyanGlow/40 text-cyanGlow bg-cyanGlow/10';
            let icon = 'ℹ';

            if (type === 'success') {
                borderTheme = 'border-emeraldGlow/40 text-emeraldGlow bg-emeraldGlow/10';
                icon = '✓';
                window.AudioEngine.play('success');
            } else if (type === 'error') {
                borderTheme = 'border-roseAlert/40 text-roseAlert bg-roseAlert/10';
                icon = '✕';
                window.AudioEngine.play('error');
            } else {
                window.AudioEngine.play('click');
            }

            toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-card border backdrop-blur-xl shadow-2xl text-xs font-bold animate__animated animate__fadeInDown animate__faster ${borderTheme}`;
            toast.innerHTML = `<span class="text-sm font-black">${icon}</span><span>${sanitizedMsg}</span>`;

            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.replace('animate__fadeInDown', 'animate__fadeOutUp');
                setTimeout(() => toast.remove(), 400);
            }, 3200);
        } catch (e) {
            console.warn('[Toast Engine] Render fallback:', e);
        }
    };

    /* ==========================================================================
       CENTRAL UI STATE
       ========================================================================== */
    window.uiState = {
        currentView: 'dashboard',
        selectedTableId: null,
        pickerCurrentCatId: null,
        currentEarlyPayItem: null
    };

    /* ==========================================================================
       NAVIGATION & MODAL CONTROLLERS
       ========================================================================== */
    window.toggleDrawer = () => {
        window.AudioEngine.play('click');
        const drawer = document.getElementById('drawer');
        if (drawer) drawer.classList.toggle('translate-x-full');
    };

    window.closeModal = (modalId) => {
        window.AudioEngine.play('click');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    };

    window.openModal = (modalId) => {
        window.AudioEngine.play('click');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('hidden');
    };

    window.switchView = (viewName) => {
        try {
            window.AudioEngine.play('click');
            document.querySelectorAll('.view').forEach((el) => el.classList.add('hidden'));

            const target = document.getElementById(`view-${viewName}`);
            if (target) {
                target.classList.remove('hidden');
            }

            // Close Drawer if open
            const drawer = document.getElementById('drawer');
            if (drawer) drawer.classList.add('translate-x-full');

            // Sync Sidebar State
            document.querySelectorAll('.sidebar-link').forEach((link) => {
                link.classList.remove('active', 'text-violetApex');
                link.classList.add('text-gray-400');
            });
            const activeNav = document.getElementById(`nav-${viewName}`);
            if (activeNav) {
                activeNav.classList.add('active');
                activeNav.classList.remove('text-gray-400');
            }

            // Sync Top Tabs State
            document.querySelectorAll('.header-tab').forEach((tab) => {
                tab.classList.remove('active');
            });
            const matchingTab = Array.from(document.querySelectorAll('.header-tab')).find(
                (b) => b.getAttribute('onclick') && b.getAttribute('onclick').includes(viewName)
            );
            if (matchingTab) matchingTab.classList.add('active');

            window.uiState.currentView = viewName;

            // Route Render Dispatches
            if (viewName === 'tables') window.searchTables();
            if (viewName === 'debts') window.renderDebtsList();
            if (viewName === 'dashboard') window.updateDashboardStats();
            if (viewName === 'invoices') window.renderInvoices();
            if (viewName === 'menu') window.renderMenuManagement();
        } catch (e) {
            console.error('[View Router] Transition error:', e);
        }
    };

    /* ==========================================================================
       DASHBOARD METRICS CONTROLLER
       ========================================================================== */
    window.updateDashboardStats = () => {
        try {
            const dailyEl = document.getElementById('stat-daily');
            const yestEl = document.getElementById('stat-yesterday');
            const monthEl = document.getElementById('stat-monthly');
            const activeEl = document.getElementById('stat-active');

            if (dailyEl) dailyEl.innerText = Number(db.stats.daily || 0).toLocaleString();
            if (yestEl) yestEl.innerText = Number(db.stats.yesterday || 0).toLocaleString();
            if (monthEl) monthEl.innerText = Number(db.stats.monthly || 0).toLocaleString();
            if (activeEl) activeEl.innerText = Object.keys(db.tables || {}).length;
        } catch (e) {
            console.error('[Dashboard Stats] Metric failure:', e);
        }
    };

    window.resetDailyRevenue = () => {
        if (!confirm('هل أنت متأكد من تصفير مبيعات اليوم؟ سيتم إغلاق الوردية الحالية.')) return;
        db.stats.daily = 0;
        saveDatabase();
        window.updateDashboardStats();
        window.showToast('تم تصفير مبيعات الوردية اليومية بنجاح');
    };

    window.resetMonthlyRevenue = () => {
        if (!confirm('هل أنت متأكد من تصفير الإيراد الشهري التراكمي؟')) return;
        db.stats.monthly = 0;
        saveDatabase();
        window.updateDashboardStats();
        window.showToast('تم تصفير إيرادات الشهر التراكمية');
    };

    window.triggerFactoryReset = () => {
        if (!confirm('⚠️ تحذير أمني أخير: هل أنت متأكد من إعادة ضبط المصنع؟ سيتم حذف جميع الجلسات والديون والأرشيف نهائياً!')) return;
        localStorage.removeItem(DB_KEY);
        loadDatabase();
        window.switchView('dashboard');
        window.updateDashboardStats();
        window.showToast('تم استعادة إعدادات المصنع للمنظومة بالكامل');
    };

    /* ==========================================================================
       TIMER & TIME-BILLING CALCULATION ENGINE
       ========================================================================== */
    window.getItemElapsedSeconds = (item) => {
        let sec = item.elapsedSeconds || 0;
        if (item.isRunning && item.startTime) {
            sec += Math.floor((Date.now() - item.startTime) / 1000);
        }
        if (item.timerMode === 'countdown' && item.durationSeconds) {
            return Math.min(sec, item.durationSeconds);
        }
        return Math.max(0, sec);
    };

    window.calculateItemCost = (item) => {
        if (!item.isTime) {
            return (item.price || 0) * (item.qty || 1);
        }
        if (item.timerMode === 'countdown') {
            return item.price || 0;
        }
        // Open time billing: calculated pro-rata per hour
        const elapsed = window.getItemElapsedSeconds(item);
        return Math.ceil((elapsed / 3600) * (item.price || 0));
    };

    window.formatTimer = (item) => {
        const elapsed = window.getItemElapsedSeconds(item);
        const displaySec = item.timerMode === 'countdown'
            ? Math.max(0, (item.durationSeconds || 0) - elapsed)
            : elapsed;

        const h = String(Math.floor(displaySec / 3600)).padStart(2, '0');
        const m = String(Math.floor((displaySec % 3600) / 60)).padStart(2, '0');
        const s = String(displaySec % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    /* ==========================================================================
       SESSION & TABLE MATRIX CONTROLLER
       ========================================================================== */
    window.openAddTableModal = () => {
        const input = document.getElementById('input-new-table-name');
        if (input) input.value = '';
        window.openModal('modal-add-table');
    };

    window.suggestTableName = (prefix) => {
        const input = document.getElementById('input-new-table-name');
        if (input) {
            const count = Object.keys(db.tables).length + 1;
            input.value = `${prefix}${count}`;
        }
    };

    window.confirmAddTable = () => {
        const input = document.getElementById('input-new-table-name');
        const rawName = input ? input.value.trim() : '';
        const safeName = window.SecurityCore
            ? window.SecurityCore.sanitize(rawName || `طاولة #${Object.keys(db.tables).length + 1}`)
            : (rawName || `طاولة #${Object.keys(db.tables).length + 1}`);

        const id = 'tbl_' + Date.now();
        db.tables[id] = {
            id,
            name: safeName,
            customer: 'زبون عام',
            discount: 0,
            items: [],
            createdAt: Date.now()
        };

        saveDatabase();
        window.closeModal('modal-add-table');
        window.showToast(`تم فتح ${safeName} بنجاح`);
        window.switchView('tables');
        window.updateDashboardStats();
    };

    window.searchTables = () => {
        try {
            const query = (document.getElementById('search-tables')?.value || '').toLowerCase().trim();
            const grid = document.getElementById('tables-grid');
            if (!grid) return;

            grid.innerHTML = '';
            const tableKeys = Object.keys(db.tables);

            if (tableKeys.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-20 glass-card rounded-3xl border border-white/5">
                        <div class="text-4xl mb-3">🎮</div>
                        <h4 class="text-base font-bold text-white mb-1">لا توجد جلسات أو أجهزة مفتوحة حالياً</h4>
                        <p class="text-xs text-gray-400">اضغط على زر (جلسة جديدة) بالأعلى لبدء جلسة جديدة</p>
                    </div>`;
                return;
            }

            tableKeys.forEach((key) => {
                const table = db.tables[key];
                const matches = !query ||
                    table.name.toLowerCase().includes(query) ||
                    (table.customer && table.customer.toLowerCase().includes(query));

                if (!matches) return;

                let activeTimers = 0;
                let totalCost = 0;
                let earlyPaid = 0;

                table.items.forEach((item) => {
                    if (item.isTime && item.isRunning) activeTimers++;
                    totalCost += window.calculateItemCost(item);
                    earlyPaid += (item.paidAmount || 0);
                });

                const remaining = Math.max(0, totalCost - earlyPaid - (table.discount || 0));

                const card = document.createElement('div');
                card.className = `glass-card p-6 rounded-3xl flex flex-col justify-between cursor-pointer group transition-all ${
                    activeTimers > 0 ? 'border-t-4 border-t-cyanGlow shadow-lg shadow-cyanGlow/10' : ''
                }`;
                card.onclick = () => window.openTableDetail(key);

                const safeName = window.SecurityCore ? window.SecurityCore.sanitize(table.name) : table.name;
                const safeCust = window.SecurityCore ? window.SecurityCore.sanitize(table.customer) : table.customer;

                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-black text-white group-hover:text-violetApex transition-colors">${safeName}</h3>
                                <span class="text-xs text-cyanGlow font-bold">${safeCust}</span>
                            </div>
                            <span class="px-3 py-1 rounded-full text-[10px] font-bold ${
                                activeTimers > 0
                                    ? 'bg-cyanGlow/20 text-cyanGlow border border-cyanGlow/30 timer-live'
                                    : 'bg-white/5 text-gray-400 border border-white/5'
                            }">
                                ${activeTimers > 0 ? '🎮 نشط' : '⏸ خامل'}
                            </span>
                        </div>
                        <div class="space-y-2 mb-6">
                            <div class="flex justify-between text-xs text-gray-400">
                                <span>الأصناف والعدادات:</span>
                                <span class="font-bold text-white font-en">${table.items.length}</span>
                            </div>
                            ${earlyPaid > 0 ? `
                            <div class="flex justify-between text-xs text-emeraldGlow">
                                <span>مدفوع مبكراً:</span>
                                <span class="font-bold font-en">${earlyPaid.toLocaleString()} IQD</span>
                            </div>` : ''}
                            <div class="flex justify-between text-xs text-gray-300">
                                <span>المتبقي الصافي:</span>
                                <span class="font-bold text-cyanGlow font-en text-sm">${remaining.toLocaleString()} IQD</span>
                            </div>
                        </div>
                    </div>
                    <button class="w-full py-3 rounded-xl bg-white/5 group-hover:bg-violetApex group-hover:text-white text-xs font-bold text-gray-300 transition-all flex items-center justify-center gap-2">
                        <span>إدارة الجلسة والحساب</span>
                        <span>➔</span>
                    </button>
                `;

                grid.appendChild(card);
            });
        } catch (e) {
            console.error('[Tables Matrix] Rendering failure:', e);
        }
    };

    /* ==========================================================================
       GRANULAR TABLE DETAIL CONTROLLER
       ========================================================================== */
    window.openTableDetail = (tableId) => {
        try {
            window.uiState.selectedTableId = tableId;
            const table = db.tables[tableId];
            if (!table) return window.switchView('tables');

            const nameEl = document.getElementById('detail-table-name');
            const custBadge = document.getElementById('detail-customer-badge');
            const custInput = document.getElementById('input-table-customer');
            const discInput = document.getElementById('input-table-discount');

            if (nameEl) nameEl.innerText = table.name;
            if (custBadge) custBadge.innerText = table.customer || 'زبون عام';
            if (custInput) custInput.value = table.customer || '';
            if (discInput) discInput.value = table.discount || '';

            window.renderTableItems();
            window.switchView('table-detail');
        } catch (e) {
            console.error('[Table Detail] Open failure:', e);
        }
    };

    window.renderTableItems = () => {
        try {
            const tableId = window.uiState.selectedTableId;
            const table = db.tables[tableId];
            if (!table) return;

            const list = document.getElementById('detail-items-list');
            if (!list) return;

            list.innerHTML = '';
            let subtotal = 0;
            let totalEarlyPaid = 0;

            if (table.items.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-16 text-gray-500 font-bold text-xs glass-card rounded-2xl border border-white/5">
                        لا توجد طلبات أو عدادات مضافة لهذه الطاولة حتى الآن. اضغط زر الإضافة بالأعلى.
                    </div>`;
            } else {
                table.items.forEach((item, idx) => {
                    const cost = window.calculateItemCost(item);
                    const paid = item.paidAmount || 0;
                    const rem = Math.max(0, cost - paid);

                    subtotal += cost;
                    totalEarlyPaid += paid;

                    const row = document.createElement('div');
                    row.className = 'bg-panelDark/80 p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-white/10 transition-all';

                    const safeItemName = window.SecurityCore ? window.SecurityCore.sanitize(item.name) : item.name;
                    const safeIcon = window.SecurityCore ? window.SecurityCore.sanitize(item.icon || '🎮') : (item.icon || '🎮');

                    if (item.isTime) {
                        row.innerHTML = `
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <span class="text-2xl">${safeIcon}</span>
                                <div>
                                    <h4 class="font-bold text-white text-sm flex items-center gap-2">
                                        <span>${safeItemName}</span>
                                        ${paid >= cost && cost > 0 ? '<span class="text-[10px] bg-emeraldGlow/20 text-emeraldGlow px-2 py-0.5 rounded-md font-bold">مدفوع بالكامل</span>' : ''}
                                    </h4>
                                    <span class="text-[10px] text-gray-400 font-en">
                                        ${(item.price || 0).toLocaleString()} IQD ${item.timerMode === 'countdown' ? 'سعر باقة' : '/ ساعة'}
                                    </span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 flex-wrap justify-end w-full md:w-auto">
                                <div class="text-center min-w-[70px]">
                                    <div class="text-base font-black font-en text-cyanGlow tracking-wider timer-live">${window.formatTimer(item)}</div>
                                    <div class="text-[9px] text-gray-500">${item.timerMode === 'countdown' ? 'تنازلي' : 'وقت مفتوح'}</div>
                                </div>
                                <button onclick="window.toggleTimer('${tableId}', ${idx})" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                    item.isRunning 
                                        ? 'bg-amberWarn/15 text-amberWarn border-amberWarn/30 hover:bg-amberWarn/25' 
                                        : 'bg-emeraldGlow/15 text-emeraldGlow border-emeraldGlow/30 hover:bg-emeraldGlow/25'
                                }">
                                    ${item.isRunning ? '⏸ إيقاف' : '▶ تشغيل'}
                                </button>
                                <button onclick="window.openEarlyPayModal(${idx})" class="px-3 py-1.5 rounded-xl bg-emeraldGlow/10 hover:bg-emeraldGlow text-emeraldGlow hover:text-black transition-all text-xs font-bold border border-emeraldGlow/30 flex items-center gap-1">
                                    ⚡ دفع مبكر
                                </button>
                                <button onclick="window.removeItem('${tableId}', ${idx})" class="p-1.5 rounded-lg text-gray-500 hover:text-roseAlert transition-colors text-sm">✕</button>
                                <div class="text-left min-w-[100px]">
                                    <span class="text-xs font-black text-white font-en block">${cost.toLocaleString()} IQD</span>
                                    ${paid > 0 ? `<span class="text-[10px] text-emeraldGlow block font-en">مدفوع: ${paid.toLocaleString()}</span>` : ''}
                                    <span class="text-[10px] text-gray-400 block font-en">متبقي: ${rem.toLocaleString()} IQD</span>
                                </div>
                            </div>`;
                    } else {
                        row.innerHTML = `
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <span class="text-2xl">${safeIcon}</span>
                                <div>
                                    <h4 class="font-bold text-white text-sm flex items-center gap-2">
                                        <span>${safeItemName}</span>
                                        ${rem === 0 ? '<span class="text-[10px] bg-emeraldGlow/20 text-emeraldGlow px-2 py-0.5 rounded-md font-bold">مدفوع بالكامل</span>' : ''}
                                    </h4>
                                    <span class="text-[10px] text-gray-400 font-en">${(item.price || 0).toLocaleString()} IQD للقطعة</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 flex-wrap justify-end w-full md:w-auto">
                                <div class="flex items-center border border-white/10 rounded-xl overflow-hidden bg-black/40">
                                    <button onclick="window.updateQty('${tableId}', ${idx}, -1)" class="px-3 py-1 text-gray-400 hover:text-white font-bold text-xs">-</button>
                                    <span class="px-3 py-1 font-en font-bold text-xs text-white">${item.qty}</span>
                                    <button onclick="window.updateQty('${tableId}', ${idx}, 1)" class="px-3 py-1 text-gray-400 hover:text-white font-bold text-xs">+</button>
                                </div>
                                <button onclick="window.openEarlyPayModal(${idx})" class="px-3 py-1.5 rounded-xl bg-emeraldGlow/10 hover:bg-emeraldGlow text-emeraldGlow hover:text-black transition-all text-xs font-bold border border-emeraldGlow/30 flex items-center gap-1">
                                    ⚡ دفع مبكر
                                </button>
                                <button onclick="window.removeItem('${tableId}', ${idx})" class="p-1.5 rounded-lg text-gray-500 hover:text-roseAlert transition-colors text-sm">✕</button>
                                <div class="text-left min-w-[100px]">
                                    <span class="text-xs font-black text-white font-en block">${cost.toLocaleString()} IQD</span>
                                    ${paid > 0 ? `<span class="text-[10px] text-emeraldGlow block font-en">مدفوع: ${paid.toLocaleString()}</span>` : ''}
                                    <span class="text-[10px] text-gray-400 block font-en">متبقي: ${rem.toLocaleString()} IQD</span>
                                </div>
                            </div>`;
                    }

                    list.appendChild(row);
                });
            }

            const discount = table.discount || 0;
            const finalRemaining = Math.max(0, subtotal - totalEarlyPaid - discount);

            const sumSubEl = document.getElementById('sum-subtotal');
            const sumPaidEl = document.getElementById('sum-early-paid');
            const sumDiscEl = document.getElementById('sum-discount-val');
            const sumFinalEl = document.getElementById('sum-final');

            if (sumSubEl) sumSubEl.innerText = `${subtotal.toLocaleString()} IQD`;
            if (sumPaidEl) sumPaidEl.innerText = `${totalEarlyPaid.toLocaleString()} IQD`;
            if (sumDiscEl) sumDiscEl.innerText = `-${discount.toLocaleString()} IQD`;
            if (sumFinalEl) sumFinalEl.innerText = finalRemaining.toLocaleString();
        } catch (e) {
            console.error('[Table Detail] Item render exception:', e);
        }
    };

    window.toggleTimer = (tableId, idx) => {
        const table = db.tables[tableId];
        if (!table || !table.items[idx]) return;

        const item = table.items[idx];
        if (item.isRunning) {
            item.elapsedSeconds = (item.elapsedSeconds || 0) + Math.floor((Date.now() - item.startTime) / 1000);
            item.isRunning = false;
            item.startTime = null;
        } else {
            if (item.timerMode === 'countdown' && (item.elapsedSeconds || 0) >= item.durationSeconds) {
                return window.showToast('انتهت مدة هذا العداد التنازلي مسبقاً', 'error');
            }
            item.isRunning = true;
            item.startTime = Date.now();
        }

        saveDatabase();
        window.renderTableItems();
    };

    window.updateQty = (tableId, idx, delta) => {
        const table = db.tables[tableId];
        if (!table || !table.items[idx]) return;

        table.items[idx].qty = (table.items[idx].qty || 1) + delta;
        if (table.items[idx].qty <= 0) {
            table.items.splice(idx, 1);
        }

        saveDatabase();
        window.renderTableItems();
    };

    window.removeItem = (tableId, idx) => {
        const table = db.tables[tableId];
        if (!table) return;

        table.items.splice(idx, 1);
        saveDatabase();
        window.renderTableItems();
    };

    window.updateCustomerName = (value) => {
        const tableId = window.uiState.selectedTableId;
        if (!db.tables[tableId]) return;

        const clean = window.SecurityCore ? window.SecurityCore.sanitize(value.trim() || 'زبون عام') : (value.trim() || 'زبون عام');
        db.tables[tableId].customer = clean;

        const badge = document.getElementById('detail-customer-badge');
        if (badge) badge.innerText = clean;

        saveDatabase();
    };

    window.updateDiscountIQD = (val) => {
        const tableId = window.uiState.selectedTableId;
        if (!db.tables[tableId]) return;

        db.tables[tableId].discount = Math.max(0, parseInt(val, 10) || 0);
        saveDatabase();
        window.renderTableItems();
    };

    window.deleteTablePrompt = () => {
        if (!confirm('هل أنت متأكد تماماً من إلغاء وحذف هذه الجلسة؟ سيتم فقدان الطلبات الحالية غير المؤرشفة.')) return;
        const tableId = window.uiState.selectedTableId;
        if (!db.tables[tableId]) return;

        delete db.tables[tableId];
        saveDatabase();
        window.showToast('تم إلغاء وحذف الجلسة بنجاح', 'error');
        window.switchView('tables');
        window.updateDashboardStats();
    };

    /* ==========================================================================
       PRODUCT PICKER MODAL
       ========================================================================== */
    window.openProductPicker = () => {
        window.uiState.pickerCurrentCatId = null;
        window.pickerShowCategories();
        window.openModal('modal-product-picker');
    };

    window.pickerShowCategories = () => {
        window.uiState.pickerCurrentCatId = null;
        const title = document.getElementById('picker-title');
        const sub = document.getElementById('picker-subtitle');
        const backBtn = document.getElementById('picker-back-btn');
        const body = document.getElementById('picker-body');

        if (title) title.innerText = 'اختر القسم المطلوب';
        if (sub) sub.innerText = 'اضغط على القسم لعرض الأصناف الموجودة بداخله';
        if (backBtn) backBtn.classList.add('hidden');
        if (!body) return;

        body.innerHTML = '';
        db.categories.forEach((cat) => {
            const count = db.menu.filter((m) => m.catId === cat.id).length;
            const el = document.createElement('div');
            el.className = 'glass-card p-5 rounded-2xl border border-white/10 hover:border-violetApex cursor-pointer transition-all flex flex-col items-center justify-center text-center group active:scale-95';
            el.onclick = () => window.pickerShowProductsInCat(cat.id);

            const safeCatName = window.SecurityCore ? window.SecurityCore.sanitize(cat.name) : cat.name;
            const safeIcon = window.SecurityCore ? window.SecurityCore.sanitize(cat.icon || '📁') : (cat.icon || '📁');

            el.innerHTML = `
                <span class="text-4xl mb-3 group-hover:scale-110 transition-transform">${safeIcon}</span>
                <h4 class="font-bold text-white text-sm group-hover:text-violetApex">${safeCatName}</h4>
                <span class="text-[10px] text-gray-400 mt-1 font-bold">${count} أصناف</span>
            `;
            body.appendChild(el);
        });
    };

    window.pickerShowProductsInCat = (catId) => {
        window.uiState.pickerCurrentCatId = catId;
        const cat = db.categories.find((c) => c.id === catId);

        const title = document.getElementById('picker-title');
        const sub = document.getElementById('picker-subtitle');
        const backBtn = document.getElementById('picker-back-btn');
        const body = document.getElementById('picker-body');

        if (title) title.innerText = cat ? cat.name : 'الأصناف المتاحة';
        if (sub) sub.innerText = 'اضغط على الصنف لإضافته مباشرة للجلسة الحالية';
        if (backBtn) backBtn.classList.remove('hidden');
        if (!body) return;

        body.innerHTML = '';
        const items = db.menu.filter((m) => m.catId === catId);

        if (items.length === 0) {
            body.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500 font-bold text-xs">لا توجد أصناف في هذا القسم. أضفها عبر شاشة المنيو.</div>';
            return;
        }

        items.forEach((p) => {
            const el = document.createElement('div');
            el.className = 'glass-card p-4 rounded-2xl border border-white/10 hover:border-cyanGlow cursor-pointer transition-all flex flex-col justify-between group active:scale-95 text-center';
            el.onclick = () => window.addItemToCurrentTable(p);

            const safeName = window.SecurityCore ? window.SecurityCore.sanitize(p.name) : p.name;
            const safeIcon = window.SecurityCore ? window.SecurityCore.sanitize(p.icon || '🎮') : (p.icon || '🎮');
            const safeNotes = p.notes && window.SecurityCore ? window.SecurityCore.sanitize(p.notes) : (p.notes || '');

            el.innerHTML = `
                <div class="mb-3">
                    <span class="text-3xl block mb-1 group-hover:scale-110 transition-transform">${safeIcon}</span>
                    <h4 class="font-bold text-white text-xs">${safeName}</h4>
                    ${safeNotes ? `<span class="text-[10px] text-amberWarn block mt-1">${safeNotes}</span>` : ''}
                    <span class="text-[9px] text-gray-400 mt-0.5 block">${p.isTime ? 'عداد وقت' : 'صنف مباشر'}</span>
                </div>
                <div>
                    <span class="text-xs font-black text-cyanGlow font-en">${Number(p.price).toLocaleString()} IQD</span>
                </div>
            `;
            body.appendChild(el);
        });
    };

    window.addItemToCurrentTable = (product) => {
        const tableId = window.uiState.selectedTableId;
        const table = db.tables[tableId];
        if (!table) return;

        if (product.isTime) {
            table.items.push({
                id: 'itm_' + Date.now(),
                name: product.name,
                price: product.price,
                icon: product.icon,
                isTime: true,
                timerMode: product.timerMode || 'open',
                durationSeconds: product.durationSeconds || null,
                isRunning: true,
                startTime: Date.now(),
                elapsedSeconds: 0,
                paidAmount: 0
            });
        } else {
            const existing = table.items.find((i) => !i.isTime && i.name === product.name);
            if (existing) {
                existing.qty = (existing.qty || 1) + 1;
            } else {
                table.items.push({
                    id: 'itm_' + Date.now(),
                    name: product.name,
                    price: product.price,
                    icon: product.icon,
                    isTime: false,
                    qty: 1,
                    paidAmount: 0
                });
            }
        }

        saveDatabase();
        window.closeModal('modal-product-picker');
        window.renderTableItems();
        window.showToast(`تمت إضافة ${product.name}`);
    };

    /* ==========================================================================
       EARLY SETTLEMENT DISPATCHER
       ========================================================================== */
    window.openEarlyPayModal = (idx) => {
        const tableId = window.uiState.selectedTableId;
        const table = db.tables[tableId];
        if (!table || !table.items[idx]) return;

        const item = table.items[idx];
        window.uiState.currentEarlyPayItem = { tableId, itemIndex: idx };

        const total = window.calculateItemCost(item);
        const paid = item.paidAmount || 0;
        const rem = Math.max(0, total - paid);

        const nameEl = document.getElementById('early-item-name');
        const totalEl = document.getElementById('early-item-total');
        const paidEl = document.getElementById('early-item-already-paid');
        const remEl = document.getElementById('early-item-remaining');
        const helpers = document.getElementById('early-qty-helpers');
        const input = document.getElementById('input-early-pay-amount');

        if (nameEl) nameEl.innerText = `${item.name}${!item.isTime && item.qty > 1 ? ` (العدد: ${item.qty})` : ''}`;
        if (totalEl) totalEl.innerText = `${total.toLocaleString()} IQD`;
        if (paidEl) paidEl.innerText = `${paid.toLocaleString()} IQD`;
        if (remEl) remEl.innerText = `${rem.toLocaleString()} IQD`;

        if (helpers) {
            if (!item.isTime && item.qty > 1) {
                helpers.classList.remove('hidden');
            } else {
                helpers.classList.add('hidden');
            }
        }

        if (input) input.value = rem > 0 ? rem : '';
        window.openModal('modal-early-pay');
    };

    window.quickPaySingleQty = () => {
        const cur = window.uiState.currentEarlyPayItem;
        if (!cur) return;
        const item = db.tables[cur.tableId]?.items[cur.itemIndex];
        const input = document.getElementById('input-early-pay-amount');
        if (item && input) input.value = item.price;
    };

    window.quickPayAllRemaining = () => {
        const cur = window.uiState.currentEarlyPayItem;
        if (!cur) return;
        const item = db.tables[cur.tableId]?.items[cur.itemIndex];
        const input = document.getElementById('input-early-pay-amount');
        if (item && input) {
            const tot = window.calculateItemCost(item);
            input.value = Math.max(0, tot - (item.paidAmount || 0));
        }
    };

    window.confirmEarlyPayment = () => {
        const cur = window.uiState.currentEarlyPayItem;
        if (!cur) return;

        const table = db.tables[cur.tableId];
        if (!table || !table.items[cur.itemIndex]) return;

        const item = table.items[cur.itemIndex];
        const input = document.getElementById('input-early-pay-amount');
        const amount = parseInt(input?.value, 10) || 0;

        if (amount <= 0) {
            return window.showToast('يرجى تحديد مبلغ دفع صحيح أكبر من صفر', 'error');
        }

        item.paidAmount = (item.paidAmount || 0) + amount;
        db.stats.daily = (db.stats.daily || 0) + amount;
        db.stats.monthly = (db.stats.monthly || 0) + amount;

        saveDatabase();
        window.closeModal('modal-early-pay');
        window.renderTableItems();
        window.updateDashboardStats();
        window.showToast(`تم استلام ${amount.toLocaleString()} IQD كدفع مبكر لصنف (${item.name})`);
    };

    /* ==========================================================================
       FINAL CHECKOUT & DEBT SPLITTING
       ========================================================================== */
    window.openCheckoutModal = () => {
        const tableId = window.uiState.selectedTableId;
        const table = db.tables[tableId];
        if (!table) return;

        let total = 0;
        let earlyPaid = 0;
        table.items.forEach((item) => {
            total += window.calculateItemCost(item);
            earlyPaid += (item.paidAmount || 0);
        });

        const remainingFinal = Math.max(0, total - earlyPaid - (table.discount || 0));
        const totalValEl = document.getElementById('checkout-total-val');
        const paidInput = document.getElementById('checkout-paid-amount');
        const debtInput = document.getElementById('checkout-debt-amount');

        if (totalValEl) totalValEl.innerText = `${remainingFinal.toLocaleString()} IQD`;
        if (paidInput) paidInput.value = remainingFinal;
        if (debtInput) debtInput.value = 0;

        window.openModal('modal-checkout');
    };

    window.calculateDebtSplit = () => {
        const tableId = window.uiState.selectedTableId;
        const table = db.tables[tableId];
        if (!table) return;

        let total = 0;
        let earlyPaid = 0;
        table.items.forEach((item) => {
            total += window.calculateItemCost(item);
            earlyPaid += (item.paidAmount || 0);
        });

        const finalRequired = Math.max(0, total - earlyPaid - (table.discount || 0));
        const paidVal = parseInt(document.getElementById('checkout-paid-amount')?.value, 10) || 0;
        const debtInput = document.getElementById('checkout-debt-amount');

        if (debtInput) {
            debtInput.value = Math.max(0, finalRequired - paidVal);
        }
    };

    window.confirmCheckout = () => {
        const tableId = window.uiState.selectedTableId;
        const table = db.tables[tableId];
        if (!table) return;

        let total = 0;
        let earlyPaid = 0;
        table.items.forEach((item) => {
            total += window.calculateItemCost(item);
            earlyPaid += (item.paidAmount || 0);
        });

        const finalRequired = Math.max(0, total - earlyPaid - (table.discount || 0));
        const paidVal = parseInt(document.getElementById('checkout-paid-amount')?.value, 10) || 0;
        const debtAmount = Math.max(0, finalRequired - paidVal);

        const invoice = {
            id: 'INV-' + Math.floor(100000 + Math.random() * 900000),
            tableName: table.name,
            customer: table.customer || 'زبون عام',
            subtotal: total,
            earlyPaid: earlyPaid,
            discount: table.discount || 0,
            finalTotal: finalRequired,
            paid: paidVal,
            debt: debtAmount,
            items: JSON.parse(JSON.stringify(table.items)),
            date: new Date().toLocaleString('ar-IQ')
        };

        db.invoices.unshift(invoice);
        db.stats.daily = (db.stats.daily || 0) + paidVal;
        db.stats.monthly = (db.stats.monthly || 0) + paidVal;

        if (debtAmount > 0) {
            const customerName = table.customer || 'زبون عام';
            if (!db.debts[customerName]) {
                db.debts[customerName] = { customer: customerName, totalDebt: 0, history: [] };
            }
            db.debts[customerName].totalDebt += debtAmount;
            db.debts[customerName].history.unshift({
                invoiceId: invoice.id,
                amount: debtAmount,
                date: new Date().toLocaleString('ar-IQ')
            });
        }

        delete db.tables[tableId];
        saveDatabase();

        window.closeModal('modal-checkout');
        window.showToast('تم إغلاق الحساب وأرشفة الفاتورة بنجاح');
        window.switchView('tables');
        window.updateDashboardStats();
    };

    /* ==========================================================================
       SESSION TRANSFER & MERGE CONTROLLER
       ========================================================================== */
    window.openTransferModal = () => {
        const curTableId = window.uiState.selectedTableId;
        const select = document.getElementById('transfer-target-select');
        if (!select) return;

        select.innerHTML = '';
        const otherKeys = Object.keys(db.tables).filter((k) => k !== curTableId);

        if (otherKeys.length === 0) {
            return window.showToast('لا توجد طاولات أخرى متاحة للنقل أو الدمج', 'error');
        }

        otherKeys.forEach((key) => {
            const t = db.tables[key];
            const opt = document.createElement('option');
            opt.value = key;
            opt.innerText = `${t.name} (${t.customer || 'زبون عام'})`;
            select.appendChild(opt);
        });

        window.openModal('modal-transfer');
    };

    window.confirmTransfer = () => {
        const curTableId = window.uiState.selectedTableId;
        const targetTableId = document.getElementById('transfer-target-select')?.value;

        if (!db.tables[curTableId] || !db.tables[targetTableId]) return;

        // Merge active items into target table
        db.tables[targetTableId].items.push(...db.tables[curTableId].items);
        delete db.tables[curTableId];

        saveDatabase();
        window.closeModal('modal-transfer');
        window.showToast('تم نقل ودمج محتويات الجلسة بنجاح');
        window.switchView('tables');
    };

    /* ==========================================================================
       DEBT REGISTER & SETTLEMENT
       ========================================================================== */
    window.renderDebtsList = () => {
        try {
            const query = (document.getElementById('search-debts')?.value || '').toLowerCase().trim();
            const grid = document.getElementById('debts-grid');
            if (!grid) return;

            grid.innerHTML = '';
            const debtorNames = Object.keys(db.debts).filter((k) => db.debts[k].totalDebt > 0);

            if (debtorNames.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-20 glass-card rounded-3xl border border-white/5">
                        <div class="text-4xl mb-3">📒</div>
                        <h4 class="text-base font-bold text-white mb-1">لا توجد ديون مستحقة مسجلة حالياً</h4>
                        <p class="text-xs text-gray-400">كافة الحسابات مسددة بالكامل</p>
                    </div>`;
                return;
            }

            debtorNames.forEach((name) => {
                const entry = db.debts[name];
                if (query && !entry.customer.toLowerCase().includes(query)) return;

                const card = document.createElement('div');
                card.className = 'glass-card p-6 rounded-3xl border-t-4 border-roseAlert flex flex-col justify-between';

                const safeCustomer = window.SecurityCore ? window.SecurityCore.sanitize(entry.customer) : entry.customer;

                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-black text-white">${safeCustomer}</h3>
                            <span class="text-xs font-bold text-roseAlert bg-roseAlert/10 px-3 py-1 rounded-full border border-roseAlert/20">مطلوب ذمة</span>
                        </div>
                        <div class="bg-panelDark/80 p-4 rounded-2xl border border-white/5 mb-6">
                            <span class="text-xs text-gray-400 block mb-1">إجمالي المبلغ المستحق:</span>
                            <span class="text-2xl font-black font-en text-roseAlert">${entry.totalDebt.toLocaleString()} IQD</span>
                        </div>
                    </div>
                    <div>
                        <button onclick="window.settleDebt('${window.SecurityCore ? window.SecurityCore.sanitize(name) : name}')" class="w-full py-3.5 glow-btn-emerald rounded-xl font-bold text-xs text-black transition-all">
                            تسديد المبلغ بالكامل واستلام الكاش
                        </button>
                    </div>
                `;

                grid.appendChild(card);
            });
        } catch (e) {
            console.error('[Debts Register] Render error:', e);
        }
    };

    window.settleDebt = (customerName) => {
        if (!db.debts[customerName]) return;
        const amount = db.debts[customerName].totalDebt;

        db.stats.daily = (db.stats.daily || 0) + amount;
        db.stats.monthly = (db.stats.monthly || 0) + amount;
        db.debts[customerName].totalDebt = 0;

        saveDatabase();
        window.showToast(`تم تسديد دين (${customerName}) بالكامل بنجاح`);
        window.renderDebtsList();
        window.updateDashboardStats();
    };

    /* ==========================================================================
       INVOICE ARCHIVE, PRINTING & CSV EXPORT
       ========================================================================== */
    window.renderInvoices = () => {
        try {
            const tbody = document.getElementById('invoice-list');
            if (!tbody) return;

            tbody.innerHTML = '';
            if (db.invoices.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center py-12 text-gray-500 font-bold">لا توجد فواتير مؤرشفة بعد.</td></tr>';
                return;
            }

            db.invoices.forEach((inv) => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-white/5 transition-colors';

                const safeId = window.SecurityCore ? window.SecurityCore.sanitize(inv.id) : inv.id;
                const safeTable = window.SecurityCore ? window.SecurityCore.sanitize(inv.tableName) : inv.tableName;
                const safeCust = window.SecurityCore ? window.SecurityCore.sanitize(inv.customer) : inv.customer;
                const safeDate = window.SecurityCore ? window.SecurityCore.sanitize(inv.date) : inv.date;

                tr.innerHTML = `
                    <td class="p-5 font-en font-bold text-cyanGlow">${safeId}</td>
                    <td class="p-5 font-bold text-white">${safeTable} <span class="text-xs text-gray-400">(${safeCust})</span></td>
                    <td class="p-5 font-en font-bold text-emeraldGlow">${inv.finalTotal.toLocaleString()} IQD</td>
                    <td class="p-5">
                        <span class="px-3 py-1 rounded-full text-[10px] font-bold ${
                            inv.debt > 0
                                ? 'bg-roseAlert/15 text-roseAlert border border-roseAlert/30'
                                : 'bg-emeraldGlow/15 text-emeraldGlow border border-emeraldGlow/30'
                        }">
                            ${inv.debt > 0 ? `متبقي دين: ${inv.debt.toLocaleString()} IQD` : 'مدفوع بالكامل'}
                        </span>
                    </td>
                    <td class="p-5 text-xs text-gray-400 font-en">${safeDate}</td>
                    <td class="p-5 text-center">
                        <button onclick="window.printInvoice('${safeId}')" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors">
                            🖨 طباعة
                        </button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        } catch (e) {
            console.error('[Invoice Archive] Render error:', e);
        }
    };

    window.exportInvoicesCSV = () => {
        if (!db.invoices || db.invoices.length === 0) {
            return window.showToast('لا توجد فواتير لتصديرها', 'error');
        }

        try {
            let csv = '\uFEFFرقم الفاتورة,الطاولة,الزبون,المبلغ الصافي,المدفوع,الدين المتبقي,التاريخ\n';
            db.invoices.forEach((i) => {
                csv += `"${i.id}","${i.tableName}","${i.customer}","${i.finalTotal}","${i.paid}","${i.debt}","${i.date}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `716QX_Invoices_${Date.now()}.csv`;
            link.click();

            window.showToast('تم تصدير ملف الفواتير بنجاح');
        } catch (e) {
            console.error('[CSV Export] Failure:', e);
        }
    };

    window.clearInvoicesPrompt = () => {
        if (!confirm('⚠️ تحذير: هل أنت متأكد من مسح كامل أرشيف الفواتير؟ لا يمكن التراجع عن هذه الخطوة.')) return;
        db.invoices = [];
        saveDatabase();
        window.renderInvoices();
        window.showToast('تم مسح كامل أرشيف الفواتير بنجاح');
    };

    window.printInvoice = (id) => {
        const inv = db.invoices.find((i) => i.id === id);
        if (!inv) return;

        const w = window.open('', '', 'width=440,height=650');
        if (!w) return;

        const safeId = window.SecurityCore ? window.SecurityCore.sanitize(inv.id) : inv.id;
        const safeTable = window.SecurityCore ? window.SecurityCore.sanitize(inv.tableName) : inv.tableName;
        const safeCustomer = window.SecurityCore ? window.SecurityCore.sanitize(inv.customer) : inv.customer;
        const safeDate = window.SecurityCore ? window.SecurityCore.sanitize(inv.date) : inv.date;

        w.document.write(`
            <html dir="rtl">
            <head>
                <meta charset="utf-8">
                <title>فاتورة - ${safeId}</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; text-align: center; color: #111; font-size: 13px; margin: 0; }
                    h2 { margin: 0 0 4px 0; font-size: 20px; font-weight: 900; }
                    .header-sub { font-size: 11px; color: #666; margin-bottom: 16px; }
                    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
                    th, td { border-bottom: 1px dashed #ccc; padding: 8px 4px; text-align: right; }
                    .total-box { font-size: 15px; font-weight: 900; margin: 14px 0; }
                    .footer-msg { font-size: 11px; color: #777; margin-top: 24px; }
                </style>
            </head>
            <body>
                <h2>716QX LOUNGE</h2>
                <div class="header-sub">وصل محاسبة إلكتروني رسمي</div>
                <div style="text-align: right; font-size: 11px; line-height: 1.6;">
                    <div>رقم الفاتورة: <b>${safeId}</b></div>
                    <div>التاريخ: ${safeDate}</div>
                    <div>الجلسة: ${safeTable} | العميل: ${safeCustomer}</div>
                </div>
                <table>
                    <thead>
                        <tr><th>البند</th><th>المبلغ</th></tr>
                    </thead>
                    <tbody>
                        ${inv.items.map((i) => `
                            <tr>
                                <td>${window.SecurityCore ? window.SecurityCore.sanitize(i.name) : i.name} ${!i.isTime ? 'x' + i.qty : ''}</td>
                                <td style="text-align: left; font-family: monospace;">${window.calculateItemCost(i).toLocaleString()} IQD</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${inv.earlyPaid > 0 ? `<div style="text-align: left; font-size: 11px;">مدفوع مبكراً: ${inv.earlyPaid.toLocaleString()} IQD</div>` : ''}
                ${inv.discount > 0 ? `<div style="text-align: left; font-size: 11px; color: #d00;">خصم: -${inv.discount.toLocaleString()} IQD</div>` : ''}
                <div class="total-box" style="text-align: left;">المبلغ النهائي المطلوب: ${inv.finalTotal.toLocaleString()} IQD</div>
                <div style="text-align: left; font-size: 12px;">المسدد نقداً: ${inv.paid.toLocaleString()} IQD</div>
                ${inv.debt > 0 ? `<div style="text-align: left; font-size: 12px; color: red; font-weight: bold;">المتبقي ذمة (دين): ${inv.debt.toLocaleString()} IQD</div>` : ''}
                <div class="footer-msg">شكراً لزيارتكم! نتمنى لكم يوماً سعيداً.</div>
            </body>
            </html>
        `);

        w.document.close();
        w.focus();
        setTimeout(() => {
            w.print();
            w.close();
        }, 300);
    };

    /* ==========================================================================
       MENU & CATEGORY ARCHITECTURE MANAGEMENT
       ========================================================================== */
    window.renderMenuManagement = () => {
        try {
            const container = document.getElementById('menu-categories-container');
            const nav = document.getElementById('menu-category-nav');
            if (!container) return;

            container.innerHTML = '';
            if (nav) {
                nav.innerHTML = db.categories.map((cat) => `
                    <button onclick="document.getElementById('menu-section-${cat.id}')?.scrollIntoView({behavior:'smooth',block:'start'})" class="shrink-0 rounded-xl bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 transition-all hover:bg-cyanGlow/20 hover:text-cyanGlow">
                        ${cat.icon || '📁'} ${window.SecurityCore ? window.SecurityCore.sanitize(cat.name) : cat.name}
                    </button>
                `).join('');
            }

            if (db.categories.length === 0) {
                container.innerHTML = '<div class="text-center py-16 text-gray-500 font-bold glass-card rounded-3xl">لا توجد أقسام مسجلة. اضغط زر (+ قسم جديد) لإضافة تصنيف جديد.</div>';
                return;
            }

            const accents = ['section-accent-violet', 'section-accent-cyan', 'section-accent-amber', 'section-accent-rose', 'section-accent-green'];

            db.categories.forEach((cat, idx) => {
                const section = document.createElement('div');
                const accentClass = accents[idx % accents.length];
                section.className = `glass-card menu-section-accent ${accentClass} p-6 md:p-8 rounded-3xl border border-white/5 space-y-6`;
                section.id = `menu-section-${cat.id}`;

                const items = db.menu.filter((m) => m.catId === cat.id);
                const safeCatName = window.SecurityCore ? window.SecurityCore.sanitize(cat.name) : cat.name;
                const safeCatIcon = window.SecurityCore ? window.SecurityCore.sanitize(cat.icon || '📁') : (cat.icon || '📁');

                section.innerHTML = `
                    <div class="flex justify-between items-center border-b border-white/5 pb-4">
                        <div class="flex items-center gap-3">
                            <span class="text-3xl">${safeCatIcon}</span>
                            <div>
                                <h3 class="text-xl font-black text-white">${safeCatName}</h3>
                                <span class="text-xs text-gray-400 font-bold">${items.length} أصناف في هذا القسم</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="window.openAddProductToCat('${cat.id}')" class="px-4 py-2 rounded-xl bg-violetApex/20 hover:bg-violetApex text-violetApex hover:text-white transition-all text-xs font-bold">
                                + إضافة صنف
                            </button>
                            <button onclick="window.deleteCategory('${cat.id}')" class="p-2 rounded-xl hover:bg-roseAlert/20 text-gray-500 hover:text-roseAlert transition-all text-xs">
                                🗑
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${items.map((i) => {
                            const safeItemName = window.SecurityCore ? window.SecurityCore.sanitize(i.name) : i.name;
                            const safeIcon = window.SecurityCore ? window.SecurityCore.sanitize(i.icon || '🎮') : (i.icon || '🎮');
                            const safeNotes = i.notes && window.SecurityCore ? window.SecurityCore.sanitize(i.notes) : (i.notes || '');

                            return `
                                <div class="bg-panelDark/80 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl">${safeIcon}</span>
                                        <div>
                                            <h5 class="font-bold text-white text-sm">${safeItemName}</h5>
                                            <span class="text-[10px] text-gray-400">
                                                ${i.isTime ? (i.timerMode === 'countdown' ? 'عداد تنازلي' : 'وقت مفتوح') : 'صنف مباشر'}
                                            </span>
                                            ${safeNotes ? `<span class="text-[10px] text-amberWarn block">${safeNotes}</span>` : ''}
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <span class="font-en font-black text-cyanGlow text-sm">${Number(i.price).toLocaleString()} IQD</span>
                                        <button onclick="window.deleteMenuItem('${i.id}')" class="text-gray-500 hover:text-roseAlert p-1 transition-colors">✕</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;

                container.appendChild(section);
            });
        } catch (e) {
            console.error('[Menu Management] Render error:', e);
        }
    };

    window.confirmAddCategory = () => {
        const nameInput = document.getElementById('new-cat-name');
        const iconInput = document.getElementById('new-cat-icon');

        const name = (nameInput?.value || '').trim();
        const icon = (iconInput?.value || '').trim() || '📁';

        if (!name) return window.showToast('يرجى إدخال اسم القسم أولاً', 'error');

        const cleanName = window.SecurityCore ? window.SecurityCore.sanitize(name) : name;
        const cleanIcon = window.SecurityCore ? window.SecurityCore.sanitize(icon) : icon;

        db.categories.push({ id: 'cat_' + Date.now(), name: cleanName, icon: cleanIcon });
        saveDatabase();

        window.closeModal('modal-add-category');
        if (nameInput) nameInput.value = '';
        window.renderMenuManagement();
        window.showToast(`تمت إضافة قسم (${cleanName}) بنجاح`);
    };

    window.deleteCategory = (catId) => {
        if (!confirm('هل أنت متأكد من حذف هذا القسم وكافة الأصناف التابعة له؟')) return;

        db.categories = db.categories.filter((c) => c.id !== catId);
        db.menu = db.menu.filter((m) => m.catId !== catId);

        saveDatabase();
        window.renderMenuManagement();
        window.showToast('تم حذف القسم وجميع أصنافه بنجاح');
    };

    window.openAddProductModal = () => {
        window.populateCategorySelect();
        window.openModal('modal-add-product');
    };

    window.openAddProductToCat = (catId) => {
        window.populateCategorySelect();
        const sel = document.getElementById('new-prod-cat-select');
        if (sel) sel.value = catId;
        window.openModal('modal-add-product');
    };

    window.populateCategorySelect = () => {
        const sel = document.getElementById('new-prod-cat-select');
        if (!sel) return;

        sel.innerHTML = db.categories.map((c) => `
            <option value="${c.id}">${c.icon || '📁'} ${window.SecurityCore ? window.SecurityCore.sanitize(c.name) : c.name}</option>
        `).join('');
    };

    window.confirmAddProduct = () => {
        const catId = document.getElementById('new-prod-cat-select')?.value;
        const nameInput = document.getElementById('new-prod-name');
        const priceInput = document.getElementById('new-prod-price');
        const isTimeSel = document.getElementById('new-prod-is-time');
        const iconInput = document.getElementById('new-prod-icon');

        const name = (nameInput?.value || '').trim();
        const price = parseInt(priceInput?.value, 10) || 0;
        const isTime = isTimeSel?.value === 'true';
        const icon = (iconInput?.value || '').trim() || '🎮';

        if (!catId || !name || price <= 0) {
            return window.showToast('يرجى ملء بيانات الصنف والسعر بدقة', 'error');
        }

        const cleanName = window.SecurityCore ? window.SecurityCore.sanitize(name) : name;
        const cleanIcon = window.SecurityCore ? window.SecurityCore.sanitize(icon) : icon;

        db.menu.push({
            id: 'm_' + Date.now(),
            catId,
            name: cleanName,
            price,
            isTime,
            timerMode: isTime ? 'open' : undefined,
            icon: cleanIcon
        });

        saveDatabase();
        window.closeModal('modal-add-product');
        if (nameInput) nameInput.value = '';
        if (priceInput) priceInput.value = '';

        window.renderMenuManagement();
        window.showToast(`تمت إضافة الصنف (${cleanName}) بنجاح`);
    };

    window.deleteMenuItem = (id) => {
        if (!confirm('هل أنت متأكد من حذف هذا الصنف من المنيو؟')) return;

        db.menu = db.menu.filter((m) => m.id !== id);
        saveDatabase();
        window.renderMenuManagement();
        window.showToast('تم حذف الصنف بنجاح');
    };

    /* ==========================================================================
       REAL-TIME HEARTBEAT & COUNTDOWN ENGINE (1000ms TICK)
       ========================================================================== */
    setInterval(() => {
        try {
            const now = new Date();
            const clockEl = document.getElementById('live-clock');
            if (clockEl) {
                clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });
            }

            // Midnight rollover fiscal check
            const currentDateStr = now.toDateString();
            if (db && db.stats && db.stats.lastResetDate !== currentDateStr) {
                db.stats.yesterday = db.stats.daily || 0;
                db.stats.daily = 0;
                db.stats.lastResetDate = currentDateStr;
                saveDatabase();
                window.updateDashboardStats();
            }

            // Refresh live table timer interface if viewing details
            if (window.uiState.currentView === 'table-detail' && window.uiState.selectedTableId) {
                window.renderTableItems();
            }

            // Countdown timer boundary completion checks
            let databaseChanged = false;
            if (db && db.tables) {
                Object.values(db.tables).forEach((table) => {
                    table.items.forEach((item) => {
                        if (item.isTime && item.timerMode === 'countdown' && item.isRunning) {
                            const elapsed = window.getItemElapsedSeconds(item);
                            if (elapsed >= (item.durationSeconds || 0)) {
                                item.elapsedSeconds = item.durationSeconds;
                                item.isRunning = false;
                                item.startTime = null;
                                databaseChanged = true;
                                window.showToast(`⏰ انتهى الوقت المحدد للصنف (${item.name}) في ${table.name}`);
                            }
                        }
                    });
                });
            }

            if (databaseChanged) {
                saveDatabase();
                if (window.uiState.currentView === 'tables') window.searchTables();
            }
        } catch (e) {
            // Silent error boundary to prevent runtime ticker crashes
        }
    }, 1000);

    /* ==========================================================================
       KEYBOARD SHORTCUT & MODAL ESCAPE LISTENERS
       ========================================================================== */
    window.addEventListener('keydown', (e) => {
        try {
            const activeModal = Array.from(document.querySelectorAll('[id^="modal-"]')).find(
                (m) => !m.classList.contains('hidden')
            );

            if (e.key === 'Escape' && activeModal) {
                e.preventDefault();
                window.closeModal(activeModal.id);
                return;
            }

            if (e.key !== 'Enter' || e.isComposing || e.target.tagName === 'TEXTAREA') return;

            if (activeModal) {
                e.preventDefault();
                const modalSubmitMap = {
                    'modal-add-table': 'confirmAddTable',
                    'modal-early-pay': 'confirmEarlyPayment',
                    'modal-checkout': 'confirmCheckout',
                    'modal-transfer': 'confirmTransfer',
                    'modal-add-category': 'confirmAddCategory',
                    'modal-add-product': 'confirmAddProduct'
                };

                const action = modalSubmitMap[activeModal.id];
                if (action && typeof window[action] === 'function') {
                    window[action]();
                }
            }
        } catch (err) {
            // Graceful keydown handler
        }
    });

    /* ==========================================================================
       BOOTSTRAP INITIALIZATION
       ========================================================================== */
    function initializeApplication() {
        loadDatabase();
        window.updateDashboardStats();
        window.switchView('dashboard');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApplication);
    } else {
        initializeApplication();
    }
})();
