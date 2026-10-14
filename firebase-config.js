/**
 * MapleLand Team Tracker - Firebase & Database Integration Module
 * Provides seamless real-time cloud synchronization using Firebase Realtime Database.
 * If Firebase is unconfigured, it automatically falls back to LocalStorage.
 */

// Default Configuration Template - mapleland-el-3eyla
const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDfilsZj_Lc6SUIL4_5OhJJSqM87WRnVD0",
    authDomain: "mapleland-el-3eyla.firebaseapp.com",
    databaseURL: "https://mapleland-el-3eyla-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mapleland-el-3eyla",
    storageBucket: "mapleland-el-3eyla.firebasestorage.app",
    messagingSenderId: "850176832753",
    appId: "1:850176832753:web:bc79e6d4157f367a366550",
    measurementId: "G-3GTQ7NZVDN"
};

class TeamDatabaseManager {
    constructor() {
        this.firebaseApp = null;
        this.database = null;
        this.isCloudConnected = false;
        const hasDefaultFirebase = Boolean(DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.databaseURL);
        this.dbType = localStorage.getItem('ml_db_type') || (hasDefaultFirebase ? 'firebase' : 'local');
        this.customConfig = this.loadStoredConfig();
        this.listeners = [];
    }

    loadStoredConfig() {
        const stored = localStorage.getItem('ml_firebase_config');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.apiKey && parsed.databaseURL) {
                    return parsed;
                }
            } catch (e) {
                console.error("Failed to parse stored Firebase config", e);
            }
        }
        return { ...DEFAULT_FIREBASE_CONFIG };
    }

    saveConfig(config) {
        this.customConfig = { ...config };
        localStorage.setItem('ml_firebase_config', JSON.stringify(this.customConfig));
        localStorage.setItem('ml_db_type', 'firebase');
        this.dbType = 'firebase';
        return this.initFirebase();
    }

    setLocalMode() {
        this.dbType = 'local';
        localStorage.setItem('ml_db_type', 'local');
        this.isCloudConnected = false;
    }

    async initFirebase() {
        if (!this.customConfig.apiKey || !this.customConfig.databaseURL) {
            console.log("Firebase config incomplete, using LocalStorage mode.");
            this.setLocalMode();
            return { success: false, reason: "missing_config" };
        }

        try {
            // Check if Firebase SDK is loaded
            if (typeof firebase === 'undefined') {
                console.warn("Firebase SDK not loaded, using LocalStorage.");
                this.setLocalMode();
                return { success: false, reason: "sdk_not_loaded" };
            }

            // If already initialized
            if (!firebase.apps.length) {
                this.firebaseApp = firebase.initializeApp(this.customConfig);
            } else {
                this.firebaseApp = firebase.app();
            }

            this.database = firebase.database();
            this.isCloudConnected = true;
            this.dbType = 'firebase';
            console.log("🔥 Firebase Realtime Database connected successfully!");
            return { success: true };
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            this.setLocalMode();
            return { success: false, error: error.message };
        }
    }

    /**
     * Subscribe to team data changes
     */
    onDataChange(callback) {
        this.listeners.push(callback);

        if (this.dbType === 'firebase' && this.database) {
            const teamRef = this.database.ref('mapleland_team_tracker');
            teamRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    callback(data, 'cloud');
                }
            }, (error) => {
                console.warn("Realtime sync error, falling back to local:", error);
            });
        }

        // Also listen to local storage events across browser tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'ml_team_tracker_data' && e.newValue) {
                try {
                    const localData = JSON.parse(e.newValue);
                    callback(localData, 'local');
                } catch (err) {}
            }
        });
    }

    /**
     * Save team data to either cloud or local
     */
    async save(data) {
        // Always save locally first for instant snappy UI
        localStorage.setItem('ml_team_tracker_data', JSON.stringify(data));

        // If cloud connected, push to Firebase
        if (this.dbType === 'firebase' && this.database) {
            try {
                await this.database.ref('mapleland_team_tracker').set({
                    ...data,
                    lastUpdated: Date.now()
                });
                return { success: true, mode: 'cloud' };
            } catch (err) {
                console.error("Cloud save failed, kept local:", err);
                return { success: false, error: err.message, mode: 'local_fallback' };
            }
        }

        return { success: true, mode: 'local' };
    }

    /**
     * Load initial state
     */
    async loadInitial() {
        if (this.dbType === 'firebase' && this.database) {
            try {
                const snapshot = await this.database.ref('mapleland_team_tracker').once('value');
                const data = snapshot.val();
                if (data) {
                    // Update local copy too
                    localStorage.setItem('ml_team_tracker_data', JSON.stringify(data));
                    return { data, source: 'cloud' };
                }
            } catch (err) {
                console.warn("Could not load from cloud, reading local:", err);
            }
        }

        const local = localStorage.getItem('ml_team_tracker_data');
        if (local) {
            try {
                return { data: JSON.parse(local), source: 'local' };
            } catch (e) {}
        }

        return { data: null, source: 'empty' };
    }
}

// Global instance
window.teamDb = new TeamDatabaseManager();
