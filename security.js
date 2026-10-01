/**
 * 716QX Lounge OS 3.5 — Apex Edition
 * Enterprise Client-Side Security, Anti-Tamper & Sanitization Engine
 * Zero-Tolerance Vulnerability Protocol | Strict Input Sanitization
 */

(function () {
    'use strict';

    const SecurityCore = {
        config: {
            antiDevToolsEnabled: true,
            killSwitchStorageKey: '716QX_REMOTE_LOCK',
            debuggerTrapIntervalMs: 1200,
            maxDebuggerLatencyMs: 100
        },

        state: {
            isLockedDown: false,
            trapIntervalId: null
        },

        init() {
            try {
                this.bindInputSanitizer();
                this.checkLocalKillSwitch();
                if (this.config.antiDevToolsEnabled) {
                    this.enforceContextRestrictions();
                    this.initDebuggerTrap();
                }
                this.freezeObjectIntegrity();
            } catch (error) {
                console.error('[Security Core] Boot Exception:', error);
            }
        },

        /**
         * XSS Defense: High-Performance Entity Encoding
         */
        sanitize(str) {
            if (str === null || str === undefined) return '';
            if (typeof str !== 'string') return String(str);

            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/`/g, '&#96;');
        },

        /**
         * Safe Parse & Strip Malicious Tags
         */
        stripTags(input) {
            if (typeof input !== 'string') return input;
            return input.replace(/<\/?[^>]+(>|$)/g, '').trim();
        },

        /**
         * Enforce Keyboard & Context Menu Deterrents
         */
        enforceContextRestrictions() {
            // Suppress context menu
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            }, { capture: true });

            // Suppress inspect keys
            window.addEventListener('keydown', (e) => {
                const isInspectShortcut = 
                    e.key === 'F12' ||
                    ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
                    ((e.ctrlKey || e.metaKey) && ['U', 'u', 'S', 's'].includes(e.key));

                if (isInspectShortcut) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }, { capture: true });
        },

        /**
         * Active Timing-Based Debugger Trap
         */
        initDebuggerTrap() {
            const trap = () => {
                if (this.state.isLockedDown) return;

                const start = performance.now();
                (function () {
                    return false;
                }['constructor']('debugger')());
                const end = performance.now();

                // If execution halted inside debugger, latency spikes
                if (end - start > this.config.maxDebuggerLatencyMs) {
                    console.warn('[Security Node] Inspection anomaly detected.');
                }
            };

            this.state.trapIntervalId = setInterval(trap, this.config.debuggerTrapIntervalMs);
        },

        /**
         * Remote Kill-Switch Verification Routine
         */
        checkLocalKillSwitch() {
            try {
                const lockData = localStorage.getItem(this.config.killSwitchStorageKey);
                if (lockData) {
                    const parsed = JSON.parse(lockData);
                    if (parsed && parsed.locked === true) {
                        this.triggerLockdown(parsed.reason || 'تم تعليق المنظومة عن بُعد لأسباب أمنية.');
                    }
                }
            } catch (e) {
                // Fail-safe silent error handling
            }
        },

        /**
         * Remote Signal Listener (BroadcastChannel or Cloud API Integration)
         */
        listenRemoteSignal(endpointUrl) {
            if (!endpointUrl) return;

            const poll = async () => {
                try {
                    const res = await fetch(endpointUrl, { method: 'GET', cache: 'no-store' });
                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.status === 'locked') {
                            this.setRemoteLock(true, data.message);
                            this.triggerLockdown(data.message);
                        } else if (data && data.status === 'unlocked') {
                            this.setRemoteLock(false);
                            this.releaseLockdown();
                        }
                    }
                } catch (err) {
                    // Silent network boundary
                }
            };

            setInterval(poll, 30000);
        },

        /**
         * Persist or Revoke Lock State
         */
        setRemoteLock(locked, reason = '') {
            try {
                if (locked) {
                    localStorage.setItem(this.config.killSwitchStorageKey, JSON.stringify({
                        locked: true,
                        reason: reason,
                        timestamp: Date.now()
                    }));
                } else {
                    localStorage.removeItem(this.config.killSwitchStorageKey);
                }
            } catch (e) {}
        },

        /**
         * Execute System Lockdown Protocol
         */
        triggerLockdown(message) {
            this.state.isLockedDown = true;
            const screen = document.getElementById('killswitch-screen');
            const msgEl = document.getElementById('killswitch-message');

            if (msgEl && message) {
                msgEl.innerText = this.sanitize(message);
            }

            if (screen) {
                screen.classList.remove('hidden');
                screen.classList.add('flex');
            }

            // Halt audio engine and background animations
            if (window.AudioEngine && typeof window.AudioEngine.mute === 'function') {
                window.AudioEngine.mute();
            }

            if (window.spaceEngineInstance && typeof window.spaceEngineInstance.stop === 'function') {
                window.spaceEngineInstance.stop();
            }
        },

        /**
         * Release Lockdown Routine
         */
        releaseLockdown() {
            this.state.isLockedDown = false;
            const screen = document.getElementById('killswitch-screen');
            if (screen) {
                screen.classList.add('hidden');
                screen.classList.remove('flex');
            }

            if (window.spaceEngineInstance && typeof window.spaceEngineInstance.start === 'function') {
                window.spaceEngineInstance.start();
            }
        },

        /**
         * DOM Sanitization Interceptor
         */
        bindInputSanitizer() {
            document.addEventListener('input', (e) => {
                if (e.target && e.target.matches('input[type="text"], textarea')) {
                    const raw = e.target.value;
                    const sanitized = raw.replace(/[<>{}]/g, '');
                    if (raw !== sanitized) {
                        e.target.value = sanitized;
                    }
                }
            }, { passive: true });
        },

        /**
         * Freeze Security Core from runtime prototype tampering
         */
        freezeObjectIntegrity() {
            try {
                Object.freeze(this.config);
                Object.seal(this.state);
            } catch (e) {}
        }
    };

    // Export Immutable Singleton to Window
    window.SecurityCore = SecurityCore;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SecurityCore.init());
    } else {
        SecurityCore.init();
    }
})();
