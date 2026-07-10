import {
  Component,
  ErrorFactory,
  FirebaseError,
  _getProvider,
  _registerComponent,
  areCookiesEnabled,
  deleteDB,
  getApp,
  getModularInstance,
  isIndexedDBAvailable,
  openDB,
  registerVersion,
  validateIndexedDBOpenable
} from "./chunk-QALQTMXH.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-TXDUYLVM.js";

// node_modules/@firebase/installations/dist/esm/index.esm.js
var name = "@firebase/installations";
var version = "0.6.22";
var PENDING_TIMEOUT_MS = 1e4;
var PACKAGE_VERSION = `w:${version}`;
var INTERNAL_AUTH_VERSION = "FIS_v2";
var INSTALLATIONS_API_URL = "https://firebaseinstallations.googleapis.com/v1";
var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1e3;
var SERVICE = "installations";
var SERVICE_NAME = "Installations";
var ERROR_DESCRIPTION_MAP = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "not-registered"
    /* ErrorCode.NOT_REGISTERED */
  ]: "Firebase Installation is not registered.",
  [
    "installation-not-found"
    /* ErrorCode.INSTALLATION_NOT_FOUND */
  ]: "Firebase Installation not found.",
  [
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  ]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  [
    "app-offline"
    /* ErrorCode.APP_OFFLINE */
  ]: "Could not process request. Application offline.",
  [
    "delete-pending-registration"
    /* ErrorCode.DELETE_PENDING_REGISTRATION */
  ]: "Can't delete installation while there is a pending registration request."
};
var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
function isServerError(error) {
  return error instanceof FirebaseError && error.code.includes(
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  );
}
function getInstallationsEndpoint({ projectId }) {
  return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}
function extractAuthTokenInfoFromResponse(response) {
  return {
    token: response.token,
    requestStatus: 2,
    expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
    creationTime: Date.now()
  };
}
function getErrorFromResponse(requestName, response) {
  return __async(this, null, function* () {
    const responseJson = yield response.json();
    const errorData = responseJson.error;
    return ERROR_FACTORY.create("request-failed", {
      requestName,
      serverCode: errorData.code,
      serverMessage: errorData.message,
      serverStatus: errorData.status
    });
  });
}
function getHeaders({ apiKey }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": apiKey
  });
}
function getHeadersWithAuth(appConfig, { refreshToken }) {
  const headers = getHeaders(appConfig);
  headers.append("Authorization", getAuthorizationHeader(refreshToken));
  return headers;
}
function retryIfServerError(fn) {
  return __async(this, null, function* () {
    const result = yield fn();
    if (result.status >= 500 && result.status < 600) {
      return fn();
    }
    return result;
  });
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
  return Number(responseExpiresIn.replace("s", "000"));
}
function getAuthorizationHeader(refreshToken) {
  return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
}
function createInstallationRequest(_0, _1) {
  return __async(this, arguments, function* ({ appConfig, heartbeatServiceProvider }, { fid }) {
    const endpoint = getInstallationsEndpoint(appConfig);
    const headers = getHeaders(appConfig);
    const heartbeatService = heartbeatServiceProvider.getImmediate({
      optional: true
    });
    if (heartbeatService) {
      const heartbeatsHeader = yield heartbeatService.getHeartbeatsHeader();
      if (heartbeatsHeader) {
        headers.append("x-firebase-client", heartbeatsHeader);
      }
    }
    const body = {
      fid,
      authVersion: INTERNAL_AUTH_VERSION,
      appId: appConfig.appId,
      sdkVersion: PACKAGE_VERSION
    };
    const request = {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    };
    const response = yield retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
      const responseValue = yield response.json();
      const registeredInstallationEntry = {
        fid: responseValue.fid || fid,
        registrationStatus: 2,
        refreshToken: responseValue.refreshToken,
        authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
      };
      return registeredInstallationEntry;
    } else {
      throw yield getErrorFromResponse("Create Installation", response);
    }
  });
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function bufferToBase64UrlSafe(array) {
  const b64 = btoa(String.fromCharCode(...array));
  return b64.replace(/\+/g, "-").replace(/\//g, "_");
}
var VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
var INVALID_FID = "";
function generateFid() {
  try {
    const fidByteArray = new Uint8Array(17);
    const crypto = self.crypto || self.msCrypto;
    crypto.getRandomValues(fidByteArray);
    fidByteArray[0] = 112 + fidByteArray[0] % 16;
    const fid = encode(fidByteArray);
    return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
  } catch {
    return INVALID_FID;
  }
}
function encode(fidByteArray) {
  const b64String = bufferToBase64UrlSafe(fidByteArray);
  return b64String.substr(0, 22);
}
function getKey(appConfig) {
  return `${appConfig.appName}!${appConfig.appId}`;
}
var fidChangeCallbacks = /* @__PURE__ */ new Map();
function fidChanged(appConfig, fid) {
  const key = getKey(appConfig);
  callFidChangeCallbacks(key, fid);
  broadcastFidChange(key, fid);
}
function addCallback(appConfig, callback) {
  getBroadcastChannel();
  const key = getKey(appConfig);
  let callbackSet = fidChangeCallbacks.get(key);
  if (!callbackSet) {
    callbackSet = /* @__PURE__ */ new Set();
    fidChangeCallbacks.set(key, callbackSet);
  }
  callbackSet.add(callback);
}
function removeCallback(appConfig, callback) {
  const key = getKey(appConfig);
  const callbackSet = fidChangeCallbacks.get(key);
  if (!callbackSet) {
    return;
  }
  callbackSet.delete(callback);
  if (callbackSet.size === 0) {
    fidChangeCallbacks.delete(key);
  }
  closeBroadcastChannel();
}
function callFidChangeCallbacks(key, fid) {
  const callbacks = fidChangeCallbacks.get(key);
  if (!callbacks) {
    return;
  }
  for (const callback of callbacks) {
    callback(fid);
  }
}
function broadcastFidChange(key, fid) {
  const channel = getBroadcastChannel();
  if (channel) {
    channel.postMessage({ key, fid });
  }
  closeBroadcastChannel();
}
var broadcastChannel = null;
function getBroadcastChannel() {
  if (!broadcastChannel && "BroadcastChannel" in self) {
    broadcastChannel = new BroadcastChannel("[Firebase] FID Change");
    broadcastChannel.onmessage = (e) => {
      callFidChangeCallbacks(e.data.key, e.data.fid);
    };
  }
  return broadcastChannel;
}
function closeBroadcastChannel() {
  if (fidChangeCallbacks.size === 0 && broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }
}
var DATABASE_NAME = "firebase-installations-database";
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = "firebase-installations-store";
var dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade: (db, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db.createObjectStore(OBJECT_STORE_NAME);
        }
      }
    });
  }
  return dbPromise;
}
function set(appConfig, value) {
  return __async(this, null, function* () {
    const key = getKey(appConfig);
    const db = yield getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = yield objectStore.get(key);
    yield objectStore.put(value, key);
    yield tx.done;
    if (!oldValue || oldValue.fid !== value.fid) {
      fidChanged(appConfig, value.fid);
    }
    return value;
  });
}
function remove(appConfig) {
  return __async(this, null, function* () {
    const key = getKey(appConfig);
    const db = yield getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    yield tx.objectStore(OBJECT_STORE_NAME).delete(key);
    yield tx.done;
  });
}
function update(appConfig, updateFn) {
  return __async(this, null, function* () {
    const key = getKey(appConfig);
    const db = yield getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = yield store.get(key);
    const newValue = updateFn(oldValue);
    if (newValue === void 0) {
      yield store.delete(key);
    } else {
      yield store.put(newValue, key);
    }
    yield tx.done;
    if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
      fidChanged(appConfig, newValue.fid);
    }
    return newValue;
  });
}
function getInstallationEntry(installations) {
  return __async(this, null, function* () {
    let registrationPromise;
    const installationEntry = yield update(installations.appConfig, (oldEntry) => {
      const installationEntry2 = updateOrCreateInstallationEntry(oldEntry);
      const entryWithPromise = triggerRegistrationIfNecessary(installations, installationEntry2);
      registrationPromise = entryWithPromise.registrationPromise;
      return entryWithPromise.installationEntry;
    });
    if (installationEntry.fid === INVALID_FID) {
      return { installationEntry: yield registrationPromise };
    }
    return {
      installationEntry,
      registrationPromise
    };
  });
}
function updateOrCreateInstallationEntry(oldEntry) {
  const entry = oldEntry || {
    fid: generateFid(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return clearTimedOutRequest(entry);
}
function triggerRegistrationIfNecessary(installations, installationEntry) {
  if (installationEntry.registrationStatus === 0) {
    if (!navigator.onLine) {
      const registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry,
        registrationPromise: registrationPromiseWithError
      };
    }
    const inProgressEntry = {
      fid: installationEntry.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    };
    const registrationPromise = registerInstallation(installations, inProgressEntry);
    return { installationEntry: inProgressEntry, registrationPromise };
  } else if (installationEntry.registrationStatus === 1) {
    return {
      installationEntry,
      registrationPromise: waitUntilFidRegistration(installations)
    };
  } else {
    return { installationEntry };
  }
}
function registerInstallation(installations, installationEntry) {
  return __async(this, null, function* () {
    try {
      const registeredInstallationEntry = yield createInstallationRequest(installations, installationEntry);
      return set(installations.appConfig, registeredInstallationEntry);
    } catch (e) {
      if (isServerError(e) && e.customData.serverCode === 409) {
        yield remove(installations.appConfig);
      } else {
        yield set(installations.appConfig, {
          fid: installationEntry.fid,
          registrationStatus: 0
          /* RequestStatus.NOT_STARTED */
        });
      }
      throw e;
    }
  });
}
function waitUntilFidRegistration(installations) {
  return __async(this, null, function* () {
    let entry = yield updateInstallationRequest(installations.appConfig);
    while (entry.registrationStatus === 1) {
      yield sleep(100);
      entry = yield updateInstallationRequest(installations.appConfig);
    }
    if (entry.registrationStatus === 0) {
      const { installationEntry, registrationPromise } = yield getInstallationEntry(installations);
      if (registrationPromise) {
        return registrationPromise;
      } else {
        return installationEntry;
      }
    }
    return entry;
  });
}
function updateInstallationRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!oldEntry) {
      throw ERROR_FACTORY.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    }
    return clearTimedOutRequest(oldEntry);
  });
}
function clearTimedOutRequest(entry) {
  if (hasInstallationRequestTimedOut(entry)) {
    return {
      fid: entry.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    };
  }
  return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
  return installationEntry.registrationStatus === 1 && installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now();
}
function generateAuthTokenRequest(_0, _1) {
  return __async(this, arguments, function* ({ appConfig, heartbeatServiceProvider }, installationEntry) {
    const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
    const headers = getHeadersWithAuth(appConfig, installationEntry);
    const heartbeatService = heartbeatServiceProvider.getImmediate({
      optional: true
    });
    if (heartbeatService) {
      const heartbeatsHeader = yield heartbeatService.getHeartbeatsHeader();
      if (heartbeatsHeader) {
        headers.append("x-firebase-client", heartbeatsHeader);
      }
    }
    const body = {
      installation: {
        sdkVersion: PACKAGE_VERSION,
        appId: appConfig.appId
      }
    };
    const request = {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    };
    const response = yield retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
      const responseValue = yield response.json();
      const completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
      return completedAuthToken;
    } else {
      throw yield getErrorFromResponse("Generate Auth Token", response);
    }
  });
}
function getGenerateAuthTokenEndpoint(appConfig, { fid }) {
  return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
}
function refreshAuthToken(installations, forceRefresh = false) {
  return __async(this, null, function* () {
    let tokenPromise;
    const entry = yield update(installations.appConfig, (oldEntry) => {
      if (!isEntryRegistered(oldEntry)) {
        throw ERROR_FACTORY.create(
          "not-registered"
          /* ErrorCode.NOT_REGISTERED */
        );
      }
      const oldAuthToken = oldEntry.authToken;
      if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
        return oldEntry;
      } else if (oldAuthToken.requestStatus === 1) {
        tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
        return oldEntry;
      } else {
        if (!navigator.onLine) {
          throw ERROR_FACTORY.create(
            "app-offline"
            /* ErrorCode.APP_OFFLINE */
          );
        }
        const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
        tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
        return inProgressEntry;
      }
    });
    const authToken = tokenPromise ? yield tokenPromise : entry.authToken;
    return authToken;
  });
}
function waitUntilAuthTokenRequest(installations, forceRefresh) {
  return __async(this, null, function* () {
    let entry = yield updateAuthTokenRequest(installations.appConfig);
    while (entry.authToken.requestStatus === 1) {
      yield sleep(100);
      entry = yield updateAuthTokenRequest(installations.appConfig);
    }
    const authToken = entry.authToken;
    if (authToken.requestStatus === 0) {
      return refreshAuthToken(installations, forceRefresh);
    } else {
      return authToken;
    }
  });
}
function updateAuthTokenRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    }
    const oldAuthToken = oldEntry.authToken;
    if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
      return __spreadProps(__spreadValues({}, oldEntry), {
        authToken: {
          requestStatus: 0
          /* RequestStatus.NOT_STARTED */
        }
      });
    }
    return oldEntry;
  });
}
function fetchAuthTokenFromServer(installations, installationEntry) {
  return __async(this, null, function* () {
    try {
      const authToken = yield generateAuthTokenRequest(installations, installationEntry);
      const updatedInstallationEntry = __spreadProps(__spreadValues({}, installationEntry), {
        authToken
      });
      yield set(installations.appConfig, updatedInstallationEntry);
      return authToken;
    } catch (e) {
      if (isServerError(e) && (e.customData.serverCode === 401 || e.customData.serverCode === 404)) {
        yield remove(installations.appConfig);
      } else {
        const updatedInstallationEntry = __spreadProps(__spreadValues({}, installationEntry), {
          authToken: {
            requestStatus: 0
            /* RequestStatus.NOT_STARTED */
          }
        });
        yield set(installations.appConfig, updatedInstallationEntry);
      }
      throw e;
    }
  });
}
function isEntryRegistered(installationEntry) {
  return installationEntry !== void 0 && installationEntry.registrationStatus === 2;
}
function isAuthTokenValid(authToken) {
  return authToken.requestStatus === 2 && !isAuthTokenExpired(authToken);
}
function isAuthTokenExpired(authToken) {
  const now = Date.now();
  return now < authToken.creationTime || authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER;
}
function makeAuthTokenRequestInProgressEntry(oldEntry) {
  const inProgressAuthToken = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return __spreadProps(__spreadValues({}, oldEntry), {
    authToken: inProgressAuthToken
  });
}
function hasAuthTokenRequestTimedOut(authToken) {
  return authToken.requestStatus === 1 && authToken.requestTime + PENDING_TIMEOUT_MS < Date.now();
}
function getId(installations) {
  return __async(this, null, function* () {
    const installationsImpl = installations;
    const { installationEntry, registrationPromise } = yield getInstallationEntry(installationsImpl);
    if (registrationPromise) {
      registrationPromise.catch(console.error);
    } else {
      refreshAuthToken(installationsImpl).catch(console.error);
    }
    return installationEntry.fid;
  });
}
function getToken(installations, forceRefresh = false) {
  return __async(this, null, function* () {
    const installationsImpl = installations;
    yield completeInstallationRegistration(installationsImpl);
    const authToken = yield refreshAuthToken(installationsImpl, forceRefresh);
    return authToken.token;
  });
}
function completeInstallationRegistration(installations) {
  return __async(this, null, function* () {
    const { registrationPromise } = yield getInstallationEntry(installations);
    if (registrationPromise) {
      yield registrationPromise;
    }
  });
}
function onIdChange(installations, callback) {
  const { appConfig } = installations;
  addCallback(appConfig, callback);
  return () => {
    removeCallback(appConfig, callback);
  };
}
function extractAppConfig(app) {
  if (!app || !app.options) {
    throw getMissingValueError("App Configuration");
  }
  if (!app.name) {
    throw getMissingValueError("App Name");
  }
  const configKeys = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const keyName of configKeys) {
    if (!app.options[keyName]) {
      throw getMissingValueError(keyName);
    }
  }
  return {
    appName: app.name,
    projectId: app.options.projectId,
    apiKey: app.options.apiKey,
    appId: app.options.appId
  };
}
function getMissingValueError(valueName) {
  return ERROR_FACTORY.create("missing-app-config-values", {
    valueName
  });
}
var INSTALLATIONS_NAME = "installations";
var INSTALLATIONS_NAME_INTERNAL = "installations-internal";
var publicFactory = (container) => {
  const app = container.getProvider("app").getImmediate();
  const appConfig = extractAppConfig(app);
  const heartbeatServiceProvider = _getProvider(app, "heartbeat");
  const installationsImpl = {
    app,
    appConfig,
    heartbeatServiceProvider,
    _delete: () => Promise.resolve()
  };
  return installationsImpl;
};
var internalFactory = (container) => {
  const app = container.getProvider("app").getImmediate();
  const installations = _getProvider(app, INSTALLATIONS_NAME).getImmediate();
  const installationsInternal = {
    getId: () => getId(installations),
    getToken: (forceRefresh) => getToken(installations, forceRefresh)
  };
  return installationsInternal;
};
function registerInstallations() {
  _registerComponent(new Component(
    INSTALLATIONS_NAME,
    publicFactory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  _registerComponent(new Component(
    INSTALLATIONS_NAME_INTERNAL,
    internalFactory,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
registerInstallations();
registerVersion(name, version);
registerVersion(name, version, "esm2020");

// node_modules/@firebase/messaging/dist/esm/index.esm.js
var DEFAULT_SW_PATH = "/firebase-messaging-sw.js";
var DEFAULT_SW_SCOPE = "/firebase-cloud-messaging-push-scope";
var DEFAULT_VAPID_KEY = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";
var ENDPOINT = "https://fcmregistrations.googleapis.com/v1";
var CONSOLE_CAMPAIGN_ID = "google.c.a.c_id";
var CONSOLE_CAMPAIGN_NAME = "google.c.a.c_l";
var CONSOLE_CAMPAIGN_TIME = "google.c.a.ts";
var CONSOLE_CAMPAIGN_ANALYTICS_ENABLED = "google.c.a.e";
var DEFAULT_REGISTRATION_TIMEOUT = 1e4;
var MessageType$1;
(function(MessageType2) {
  MessageType2[MessageType2["DATA_MESSAGE"] = 1] = "DATA_MESSAGE";
  MessageType2[MessageType2["DISPLAY_NOTIFICATION"] = 3] = "DISPLAY_NOTIFICATION";
})(MessageType$1 || (MessageType$1 = {}));
var MessageType;
(function(MessageType2) {
  MessageType2["PUSH_RECEIVED"] = "push-received";
  MessageType2["NOTIFICATION_CLICKED"] = "notification-clicked";
  MessageType2["FID_REGISTERED"] = "fid-registered";
})(MessageType || (MessageType = {}));
function arrayToBase64(array) {
  const uint8Array = new Uint8Array(array);
  const base64String = btoa(String.fromCharCode(...uint8Array));
  return base64String.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function base64ToArray(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
var OLD_DB_NAME = "fcm_token_details_db";
var OLD_DB_VERSION = 5;
var OLD_OBJECT_STORE_NAME = "fcm_token_object_Store";
function migrateOldDatabase(senderId) {
  return __async(this, null, function* () {
    if ("databases" in indexedDB) {
      const databases = yield indexedDB.databases();
      const dbNames = databases.map((db2) => db2.name);
      if (!dbNames.includes(OLD_DB_NAME)) {
        return null;
      }
    }
    let tokenDetails = null;
    const db = yield openDB(OLD_DB_NAME, OLD_DB_VERSION, {
      upgrade: (db2, oldVersion, newVersion, upgradeTransaction) => __async(null, null, function* () {
        if (oldVersion < 2) {
          return;
        }
        if (!db2.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
          return;
        }
        const objectStore = upgradeTransaction.objectStore(OLD_OBJECT_STORE_NAME);
        const value = yield objectStore.index("fcmSenderId").get(senderId);
        yield objectStore.clear();
        if (!value) {
          return;
        }
        if (oldVersion === 2) {
          const oldDetails = value;
          if (!oldDetails.auth || !oldDetails.p256dh || !oldDetails.endpoint) {
            return;
          }
          tokenDetails = {
            token: oldDetails.fcmToken,
            createTime: oldDetails.createTime ?? Date.now(),
            subscriptionOptions: {
              auth: oldDetails.auth,
              p256dh: oldDetails.p256dh,
              endpoint: oldDetails.endpoint,
              swScope: oldDetails.swScope,
              vapidKey: typeof oldDetails.vapidKey === "string" ? oldDetails.vapidKey : arrayToBase64(oldDetails.vapidKey)
            }
          };
        } else if (oldVersion === 3) {
          const oldDetails = value;
          tokenDetails = {
            token: oldDetails.fcmToken,
            createTime: oldDetails.createTime,
            subscriptionOptions: {
              auth: arrayToBase64(oldDetails.auth),
              p256dh: arrayToBase64(oldDetails.p256dh),
              endpoint: oldDetails.endpoint,
              swScope: oldDetails.swScope,
              vapidKey: arrayToBase64(oldDetails.vapidKey)
            }
          };
        } else if (oldVersion === 4) {
          const oldDetails = value;
          tokenDetails = {
            token: oldDetails.fcmToken,
            createTime: oldDetails.createTime,
            subscriptionOptions: {
              auth: arrayToBase64(oldDetails.auth),
              p256dh: arrayToBase64(oldDetails.p256dh),
              endpoint: oldDetails.endpoint,
              swScope: oldDetails.swScope,
              vapidKey: arrayToBase64(oldDetails.vapidKey)
            }
          };
        }
      })
    });
    db.close();
    yield deleteDB(OLD_DB_NAME);
    yield deleteDB("fcm_vapid_details_db");
    yield deleteDB("undefined");
    return checkTokenDetails(tokenDetails) ? tokenDetails : null;
  });
}
function checkTokenDetails(tokenDetails) {
  if (!tokenDetails || !tokenDetails.subscriptionOptions) {
    return false;
  }
  const { subscriptionOptions } = tokenDetails;
  return typeof tokenDetails.createTime === "number" && tokenDetails.createTime > 0 && typeof tokenDetails.token === "string" && tokenDetails.token.length > 0 && typeof subscriptionOptions.auth === "string" && subscriptionOptions.auth.length > 0 && typeof subscriptionOptions.p256dh === "string" && subscriptionOptions.p256dh.length > 0 && typeof subscriptionOptions.endpoint === "string" && subscriptionOptions.endpoint.length > 0 && typeof subscriptionOptions.swScope === "string" && subscriptionOptions.swScope.length > 0 && typeof subscriptionOptions.vapidKey === "string" && subscriptionOptions.vapidKey.length > 0;
}
var ERROR_MAP = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "only-available-in-window"
    /* ErrorCode.AVAILABLE_IN_WINDOW */
  ]: "This method is available in a Window context.",
  [
    "only-available-in-sw"
    /* ErrorCode.AVAILABLE_IN_SW */
  ]: "This method is available in a service worker context.",
  [
    "permission-default"
    /* ErrorCode.PERMISSION_DEFAULT */
  ]: "The notification permission was not granted and dismissed instead.",
  [
    "permission-blocked"
    /* ErrorCode.PERMISSION_BLOCKED */
  ]: "The notification permission was not granted and blocked instead.",
  [
    "unsupported-browser"
    /* ErrorCode.UNSUPPORTED_BROWSER */
  ]: "This browser doesn't support the API's required to use the Firebase SDK.",
  [
    "indexed-db-unsupported"
    /* ErrorCode.INDEXED_DB_UNSUPPORTED */
  ]: "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
  [
    "failed-service-worker-registration"
    /* ErrorCode.FAILED_DEFAULT_REGISTRATION */
  ]: "We are unable to register the default service worker. {$browserErrorMessage}",
  [
    "token-subscribe-failed"
    /* ErrorCode.TOKEN_SUBSCRIBE_FAILED */
  ]: "A problem occurred while subscribing the user to FCM: {$errorInfo}",
  [
    "token-subscribe-no-token"
    /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
  ]: "FCM returned no token when subscribing the user to push.",
  [
    "fid-registration-failed"
    /* ErrorCode.FID_REGISTRATION_FAILED */
  ]: "A problem occurred while creating an FCM registration via FID: {$errorInfo}",
  [
    "fid-unregister-failed"
    /* ErrorCode.FID_UNREGISTER_FAILED */
  ]: "A problem occurred while unregistering the FCM registration via FID: {$errorInfo}",
  [
    "fid-registration-idb-schema-unavailable"
    /* ErrorCode.FID_REGISTRATION_IDB_SCHEMA_UNAVAILABLE */
  ]: "Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).",
  [
    "token-unsubscribe-failed"
    /* ErrorCode.TOKEN_UNSUBSCRIBE_FAILED */
  ]: "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
  [
    "token-update-failed"
    /* ErrorCode.TOKEN_UPDATE_FAILED */
  ]: "A problem occurred while updating the user from FCM: {$errorInfo}",
  [
    "token-update-no-token"
    /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
  ]: "FCM returned no token when updating the user to push.",
  [
    "use-sw-after-get-token"
    /* ErrorCode.USE_SW_AFTER_GET_TOKEN */
  ]: "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
  [
    "invalid-sw-registration"
    /* ErrorCode.INVALID_SW_REGISTRATION */
  ]: "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
  [
    "invalid-bg-handler"
    /* ErrorCode.INVALID_BG_HANDLER */
  ]: "The input to setBackgroundMessageHandler() must be a function.",
  [
    "invalid-vapid-key"
    /* ErrorCode.INVALID_VAPID_KEY */
  ]: "The public VAPID key must be a string.",
  [
    "use-vapid-key-after-get-token"
    /* ErrorCode.USE_VAPID_KEY_AFTER_GET_TOKEN */
  ]: "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",
  [
    "invalid-on-registered-handler"
    /* ErrorCode.INVALID_ON_REGISTERED_HANDLER */
  ]: "No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."
};
var ERROR_FACTORY2 = new ErrorFactory("messaging", "Messaging", ERROR_MAP);
var DATABASE_NAME2 = "firebase-messaging-database";
var DATABASE_VERSION2 = 2;
var TOKEN_OBJECT_STORE_NAME = "firebase-messaging-store";
var FID_REGISTRATION_OBJECT_STORE_NAME = "firebase-messaging-fid-registration-store";
var defaultIdb = { openDB, deleteDB };
var idbImpl = defaultIdb;
var dbPromise2 = null;
function migrateMessagingDb(upgradeDb, oldVersion, targetSchemaVersion) {
  switch (oldVersion) {
    case 0:
      upgradeDb.createObjectStore(TOKEN_OBJECT_STORE_NAME);
      if (targetSchemaVersion === 1) {
        break;
      }
    // fall through
    case 1:
      if (targetSchemaVersion === 2) {
        upgradeDb.createObjectStore(FID_REGISTRATION_OBJECT_STORE_NAME);
      }
  }
}
function createOpenDbOptions(targetSchemaVersion) {
  return {
    upgrade: (upgradeDb, oldVersion) => {
      migrateMessagingDb(upgradeDb, oldVersion, targetSchemaVersion);
    },
    blocked: () => {
    },
    blocking: (_currentVersion, _blockedVersion, event) => {
      dbPromise2 = null;
      event.target?.close();
    },
    terminated: () => {
      dbPromise2 = null;
    }
  };
}
function getDbPromise2() {
  if (!dbPromise2) {
    const openLatest = idbImpl.openDB(DATABASE_NAME2, DATABASE_VERSION2, createOpenDbOptions(2));
    dbPromise2 = openLatest.catch(() => idbImpl.openDB(DATABASE_NAME2, DATABASE_VERSION2 - 1, createOpenDbOptions(1)));
  }
  return dbPromise2;
}
function hasObjectStore(db, storeName) {
  return db.objectStoreNames.contains(storeName);
}
function assertFidRegistrationObjectStore(db) {
  if (!hasObjectStore(db, FID_REGISTRATION_OBJECT_STORE_NAME)) {
    throw ERROR_FACTORY2.create(
      "fid-registration-idb-schema-unavailable"
      /* ErrorCode.FID_REGISTRATION_IDB_SCHEMA_UNAVAILABLE */
    );
  }
}
function dbGet(firebaseDependencies) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    const tokenDetails = yield db.transaction(TOKEN_OBJECT_STORE_NAME).objectStore(TOKEN_OBJECT_STORE_NAME).get(key);
    if (tokenDetails) {
      return tokenDetails;
    } else {
      const oldTokenDetails = yield migrateOldDatabase(firebaseDependencies.appConfig.senderId);
      if (oldTokenDetails) {
        yield dbSet(firebaseDependencies, oldTokenDetails);
        return oldTokenDetails;
      }
    }
  });
}
function dbSet(firebaseDependencies, tokenDetails) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    const stores = [TOKEN_OBJECT_STORE_NAME];
    const hasFidStore = hasObjectStore(db, FID_REGISTRATION_OBJECT_STORE_NAME);
    if (hasFidStore) {
      stores.push(FID_REGISTRATION_OBJECT_STORE_NAME);
    }
    const tx = db.transaction(stores, "readwrite");
    yield tx.objectStore(TOKEN_OBJECT_STORE_NAME).put(tokenDetails, key);
    if (hasFidStore) {
      yield tx.objectStore(FID_REGISTRATION_OBJECT_STORE_NAME).delete(key);
    }
    yield tx.done;
    return tokenDetails;
  });
}
function dbRemove(firebaseDependencies) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    const tx = db.transaction(TOKEN_OBJECT_STORE_NAME, "readwrite");
    yield tx.objectStore(TOKEN_OBJECT_STORE_NAME).delete(key);
    yield tx.done;
  });
}
function dbGetFidRegistration(firebaseDependencies) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    assertFidRegistrationObjectStore(db);
    return yield db.transaction(FID_REGISTRATION_OBJECT_STORE_NAME).objectStore(FID_REGISTRATION_OBJECT_STORE_NAME).get(key);
  });
}
function dbSetFidRegistration(firebaseDependencies, details) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    assertFidRegistrationObjectStore(db);
    const tx = db.transaction([TOKEN_OBJECT_STORE_NAME, FID_REGISTRATION_OBJECT_STORE_NAME], "readwrite");
    yield tx.objectStore(FID_REGISTRATION_OBJECT_STORE_NAME).put(details, key);
    yield tx.objectStore(TOKEN_OBJECT_STORE_NAME).delete(key);
    yield tx.done;
    return details;
  });
}
function dbRemoveFidRegistration(firebaseDependencies) {
  return __async(this, null, function* () {
    const key = getKey2(firebaseDependencies);
    const db = yield getDbPromise2();
    assertFidRegistrationObjectStore(db);
    const tx = db.transaction(FID_REGISTRATION_OBJECT_STORE_NAME, "readwrite");
    yield tx.objectStore(FID_REGISTRATION_OBJECT_STORE_NAME).delete(key);
    yield tx.done;
  });
}
function getKey2({ appConfig }) {
  return appConfig.appId;
}
var name2 = "@firebase/messaging";
var version2 = "0.13.0";
var FID_REGISTRATION_FETCH_MAX_ATTEMPTS = 3;
var FID_REGISTRATION_FETCH_BASE_BACKOFF_MS = 1e3;
function requestGetToken(firebaseDependencies, subscriptionOptions) {
  return __async(this, null, function* () {
    const headers = yield getHeaders2(firebaseDependencies);
    const body = getBody(
      subscriptionOptions,
      firebaseDependencies.appConfig.appName,
      /* includeSdkVersion= */
      false
    );
    const subscribeOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    };
    let responseData;
    try {
      const response = yield fetch(getEndpoint(firebaseDependencies.appConfig), subscribeOptions);
      responseData = yield response.json();
    } catch (err) {
      throw ERROR_FACTORY2.create("token-subscribe-failed", {
        errorInfo: err?.toString()
      });
    }
    if (responseData.error) {
      const message = responseData.error.message;
      throw ERROR_FACTORY2.create("token-subscribe-failed", {
        errorInfo: message
      });
    }
    if (!responseData.token) {
      throw ERROR_FACTORY2.create(
        "token-subscribe-no-token"
        /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
      );
    }
    return responseData.token;
  });
}
function requestCreateRegistration(firebaseDependencies, subscriptionOptions) {
  return __async(this, null, function* () {
    const headers = yield getHeaders2(firebaseDependencies);
    const body = getBody(
      subscriptionOptions,
      firebaseDependencies.appConfig.appName,
      /* includeSdkVersion= */
      true
    );
    const subscribeOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    };
    let response;
    try {
      response = yield fetchWithExponentialRetry(() => fetch(getEndpoint(firebaseDependencies.appConfig), subscribeOptions), FID_REGISTRATION_FETCH_MAX_ATTEMPTS, FID_REGISTRATION_FETCH_BASE_BACKOFF_MS);
    } catch (err) {
      throw ERROR_FACTORY2.create("fid-registration-failed", {
        errorInfo: err?.toString()
      });
    }
    if (response.ok) {
      const responseFid = yield parseCreateRegistrationSuccessFid(response);
      return { responseFid };
    }
    let responseData;
    try {
      responseData = yield response.json();
    } catch (err) {
      throw ERROR_FACTORY2.create("fid-registration-failed", {
        errorInfo: response.statusText
      });
    }
    const message = responseData.error?.message ?? response.statusText;
    throw ERROR_FACTORY2.create("fid-registration-failed", {
      errorInfo: message
    });
  });
}
function requestDeleteRegistration(firebaseDependencies, fid) {
  return __async(this, null, function* () {
    const headers = yield getHeaders2(firebaseDependencies);
    const options = {
      method: "DELETE",
      headers
    };
    let response;
    try {
      response = yield fetch(`${getEndpoint(firebaseDependencies.appConfig)}/${fid}`, options);
    } catch (err) {
      throw ERROR_FACTORY2.create("fid-unregister-failed", {
        errorInfo: err?.toString()
      });
    }
    if (response.ok) {
      return;
    }
    try {
      const responseData = yield response.json();
      const message = responseData.error?.message ?? response.statusText;
      throw message;
    } catch (err) {
      throw ERROR_FACTORY2.create("fid-unregister-failed", {
        errorInfo: typeof err === "string" && err || response.statusText || err?.toString()
      });
    }
  });
}
function parseCreateRegistrationSuccessFid(response) {
  return __async(this, null, function* () {
    const text = yield response.text();
    if (!text.trim()) {
      throw ERROR_FACTORY2.create("fid-registration-failed", {
        errorInfo: "CreateRegistration succeeded but response body is empty"
      });
    }
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw ERROR_FACTORY2.create("fid-registration-failed", {
        errorInfo: "CreateRegistration succeeded but response body is not valid JSON"
      });
    }
    const name3 = data.name;
    if (typeof name3 !== "string" || name3.length === 0) {
      throw ERROR_FACTORY2.create("fid-registration-failed", {
        errorInfo: "CreateRegistration succeeded but response did not include a non-empty name"
      });
    }
    return parseFidFromRegistrationResourceName(name3);
  });
}
var REGISTRATIONS_NAME_SEGMENT = "/registrations/";
function parseFidFromRegistrationResourceName(name3) {
  const segmentIndex = name3.indexOf(REGISTRATIONS_NAME_SEGMENT);
  if (segmentIndex !== -1) {
    const fid = name3.slice(segmentIndex + REGISTRATIONS_NAME_SEGMENT.length);
    if (fid.length > 0) {
      return fid;
    }
  }
  throw ERROR_FACTORY2.create("fid-registration-failed", {
    errorInfo: "CreateRegistration succeeded but response name is not a valid registration resource name"
  });
}
function requestUpdateToken(firebaseDependencies, tokenDetails) {
  return __async(this, null, function* () {
    const headers = yield getHeaders2(firebaseDependencies);
    const body = getBody(
      tokenDetails.subscriptionOptions,
      firebaseDependencies.appConfig.appName,
      /* includeSdkVersion= */
      false
    );
    const updateOptions = {
      method: "PATCH",
      headers,
      body: JSON.stringify(body)
    };
    let responseData;
    try {
      const response = yield fetch(`${getEndpoint(firebaseDependencies.appConfig)}/${tokenDetails.token}`, updateOptions);
      responseData = yield response.json();
    } catch (err) {
      throw ERROR_FACTORY2.create("token-update-failed", {
        errorInfo: err?.toString()
      });
    }
    if (responseData.error) {
      const message = responseData.error.message;
      throw ERROR_FACTORY2.create("token-update-failed", {
        errorInfo: message
      });
    }
    if (!responseData.token) {
      throw ERROR_FACTORY2.create(
        "token-update-no-token"
        /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
      );
    }
    return responseData.token;
  });
}
function requestDeleteToken(firebaseDependencies, token) {
  return __async(this, null, function* () {
    const headers = yield getHeaders2(firebaseDependencies);
    const unsubscribeOptions = {
      method: "DELETE",
      headers
    };
    try {
      const response = yield fetch(`${getEndpoint(firebaseDependencies.appConfig)}/${token}`, unsubscribeOptions);
      const responseData = yield response.json();
      if (responseData.error) {
        const message = responseData.error.message;
        throw ERROR_FACTORY2.create("token-unsubscribe-failed", {
          errorInfo: message
        });
      }
    } catch (err) {
      throw ERROR_FACTORY2.create("token-unsubscribe-failed", {
        errorInfo: err?.toString()
      });
    }
  });
}
function fetchWithExponentialRetry(operation, maxAttempts, baseBackoffMs) {
  return __async(this, null, function* () {
    let lastError;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return yield operation();
      } catch (err) {
        lastError = err;
        if (attempt < maxAttempts - 1) {
          const delayMs = baseBackoffMs * Math.pow(2, attempt);
          yield new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
    throw lastError;
  });
}
function getEndpoint({ projectId }) {
  return `${ENDPOINT}/projects/${projectId}/registrations`;
}
function getHeaders2(_0) {
  return __async(this, arguments, function* ({ appConfig, installations }) {
    const authToken = yield installations.getToken();
    return new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-goog-api-key": appConfig.apiKey,
      "x-goog-firebase-installations-auth": `FIS ${authToken}`
    });
  });
}
function getRegistrationOrigin(swScope, appNameFallback) {
  try {
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(swScope)) {
      return new URL(swScope).host;
    }
  } catch {
  }
  try {
    if (typeof self !== "undefined" && self.location?.href) {
      return new URL(swScope, self.location.origin).host;
    }
  } catch {
  }
  if (typeof self !== "undefined" && self.location?.host) {
    return self.location.host;
  }
  return appNameFallback;
}
function getBody({ p256dh, auth, endpoint, vapidKey, swScope }, appNameFallback, includeSdkVersion) {
  const body = {
    web: {
      origin: getRegistrationOrigin(swScope, appNameFallback),
      endpoint,
      auth,
      p256dh
    }
  };
  if (includeSdkVersion) {
    body.fcm_sdk_version = version2;
  }
  if (vapidKey !== DEFAULT_VAPID_KEY) {
    body.web.applicationPubKey = vapidKey;
  }
  return body;
}
var TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1e3;
function getTokenInternal(messaging) {
  return __async(this, null, function* () {
    const pushSubscription = yield getPushSubscription$1(messaging.swRegistration, messaging.vapidKey);
    const subscriptionOptions = {
      vapidKey: messaging.vapidKey,
      swScope: messaging.swRegistration.scope,
      endpoint: pushSubscription.endpoint,
      auth: arrayToBase64(pushSubscription.getKey("auth")),
      p256dh: arrayToBase64(pushSubscription.getKey("p256dh"))
    };
    const tokenDetails = yield dbGet(messaging.firebaseDependencies);
    if (!tokenDetails) {
      return getNewToken(messaging.firebaseDependencies, subscriptionOptions);
    } else if (!isTokenValid(tokenDetails.subscriptionOptions, subscriptionOptions)) {
      try {
        yield requestDeleteToken(messaging.firebaseDependencies, tokenDetails.token);
      } catch (e) {
        console.warn(e);
      }
      return getNewToken(messaging.firebaseDependencies, subscriptionOptions);
    } else if (Date.now() >= tokenDetails.createTime + TOKEN_EXPIRATION_MS) {
      return updateToken(messaging, {
        token: tokenDetails.token,
        createTime: Date.now(),
        subscriptionOptions
      });
    } else {
      return tokenDetails.token;
    }
  });
}
function revokeLegacyFcmTokenAndClearCaches(messaging, tokenDetails) {
  return __async(this, null, function* () {
    yield requestDeleteToken(messaging.firebaseDependencies, tokenDetails.token);
    yield dbRemove(messaging.firebaseDependencies);
    yield removeFidRegistrationBestEffort(messaging.firebaseDependencies);
  });
}
function revokeFidRegistrationIfStored(messaging) {
  return __async(this, null, function* () {
    const stored = yield dbGetFidRegistration(messaging.firebaseDependencies).catch(() => void 0);
    const fid = stored?.fid;
    if (fid) {
      yield requestDeleteRegistration(messaging.firebaseDependencies, fid);
    }
    yield removeFidRegistrationBestEffort(messaging.firebaseDependencies);
    if (fid) {
      notifyOnUnregistered(messaging, fid);
    }
  });
}
function revokeRegistrationInternal(messaging) {
  return __async(this, null, function* () {
    const tokenDetails = yield dbGet(messaging.firebaseDependencies);
    if (tokenDetails) {
      yield revokeLegacyFcmTokenAndClearCaches(messaging, tokenDetails);
    } else {
      yield revokeFidRegistrationIfStored(messaging);
    }
    const pushSubscription = yield messaging.swRegistration.pushManager.getSubscription();
    if (pushSubscription) {
      return pushSubscription.unsubscribe();
    }
    return true;
  });
}
function updateToken(messaging, tokenDetails) {
  return __async(this, null, function* () {
    try {
      const updatedToken = yield requestUpdateToken(messaging.firebaseDependencies, tokenDetails);
      const updatedTokenDetails = __spreadProps(__spreadValues({}, tokenDetails), {
        token: updatedToken,
        createTime: Date.now()
      });
      yield dbSet(messaging.firebaseDependencies, updatedTokenDetails);
      return updatedToken;
    } catch (e) {
      throw e;
    }
  });
}
function getNewToken(firebaseDependencies, subscriptionOptions) {
  return __async(this, null, function* () {
    const token = yield requestGetToken(firebaseDependencies, subscriptionOptions);
    const tokenDetails = {
      token,
      createTime: Date.now(),
      subscriptionOptions
    };
    yield dbSet(firebaseDependencies, tokenDetails);
    return tokenDetails.token;
  });
}
function getPushSubscription$1(swRegistration, vapidKey) {
  return __async(this, null, function* () {
    const subscription = yield swRegistration.pushManager.getSubscription();
    if (subscription) {
      return subscription;
    }
    return swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
      // submitted to pushManager#subscribe must be of type Uint8Array.
      applicationServerKey: base64ToArray(vapidKey)
    });
  });
}
function isTokenValid(dbOptions, currentOptions) {
  const isVapidKeyEqual = currentOptions.vapidKey === dbOptions.vapidKey;
  const isEndpointEqual = currentOptions.endpoint === dbOptions.endpoint;
  const isAuthEqual = currentOptions.auth === dbOptions.auth;
  const isP256dhEqual = currentOptions.p256dh === dbOptions.p256dh;
  return isVapidKeyEqual && isEndpointEqual && isAuthEqual && isP256dhEqual;
}
function removeFidRegistrationBestEffort(firebaseDependencies) {
  return __async(this, null, function* () {
    try {
      yield dbRemoveFidRegistration(firebaseDependencies);
    } catch {
    }
  });
}
function notifyOnRegistered(messaging, fid) {
  const handler = messaging.onRegisteredHandler;
  if (!handler) {
    return;
  }
  if (typeof handler === "function") {
    handler(fid);
  } else {
    handler.next(fid);
  }
}
function notifyOnUnregistered(messaging, fid) {
  const handler = messaging.onUnregisteredHandler;
  if (!handler) {
    return;
  }
  if (typeof handler === "function") {
    handler(fid);
  } else {
    handler.next(fid);
  }
}
function registerDefaultSw(messaging) {
  return __async(this, null, function* () {
    try {
      messaging.swRegistration = yield navigator.serviceWorker.register(DEFAULT_SW_PATH, {
        scope: DEFAULT_SW_SCOPE
      });
      messaging.swRegistration.update().catch(() => {
      });
      yield waitForRegistrationActive(messaging.swRegistration);
    } catch (e) {
      throw ERROR_FACTORY2.create("failed-service-worker-registration", {
        browserErrorMessage: e?.message
      });
    }
  });
}
function waitForRegistrationActive(registration) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      const rejectTimeout = setTimeout(() => reject(new Error(`Service worker not registered after ${DEFAULT_REGISTRATION_TIMEOUT} ms`)), DEFAULT_REGISTRATION_TIMEOUT);
      const incomingSw = registration.installing || registration.waiting;
      if (registration.active) {
        clearTimeout(rejectTimeout);
        resolve();
      } else if (incomingSw) {
        incomingSw.onstatechange = (ev) => {
          if (ev.target?.state === "activated") {
            incomingSw.onstatechange = null;
            clearTimeout(rejectTimeout);
            resolve();
          }
        };
      } else {
        clearTimeout(rejectTimeout);
        reject(new Error("No incoming service worker found."));
      }
    });
  });
}
function updateSwReg(messaging, swRegistration) {
  return __async(this, null, function* () {
    if (!swRegistration && !messaging.swRegistration) {
      yield registerDefaultSw(messaging);
    }
    if (!swRegistration && !!messaging.swRegistration) {
      return;
    }
    if (!(swRegistration instanceof ServiceWorkerRegistration)) {
      throw ERROR_FACTORY2.create(
        "invalid-sw-registration"
        /* ErrorCode.INVALID_SW_REGISTRATION */
      );
    }
    messaging.swRegistration = swRegistration;
  });
}
function updateVapidKey(messaging, vapidKey) {
  return __async(this, null, function* () {
    if (!!vapidKey) {
      messaging.vapidKey = vapidKey;
    } else if (!messaging.vapidKey) {
      messaging.vapidKey = DEFAULT_VAPID_KEY;
    }
  });
}
var FID_REGISTRATION_FID_MATCH_MAX_ATTEMPTS = 3;
function registerFcmRegistrationWithFid(messaging, expectedFid) {
  return __async(this, null, function* () {
    const pushSubscription = yield getPushSubscription(messaging.swRegistration, messaging.vapidKey);
    const subscriptionOptions = {
      vapidKey: messaging.vapidKey,
      swScope: messaging.swRegistration.scope,
      endpoint: pushSubscription.endpoint,
      auth: arrayToBase64(pushSubscription.getKey("auth")),
      p256dh: arrayToBase64(pushSubscription.getKey("p256dh"))
    };
    const installations = messaging.firebaseDependencies.installations;
    for (let attempt = 0; attempt < FID_REGISTRATION_FID_MATCH_MAX_ATTEMPTS; attempt++) {
      const { responseFid } = yield requestCreateRegistration(messaging.firebaseDependencies, subscriptionOptions);
      if (responseFid === expectedFid) {
        return;
      }
      if (attempt < FID_REGISTRATION_FID_MATCH_MAX_ATTEMPTS - 1) {
        yield installations.getToken(true);
      }
    }
    throw ERROR_FACTORY2.create("fid-registration-failed", {
      errorInfo: "CreateRegistration response FID does not match Firebase Installation ID"
    });
  });
}
function getPushSubscription(swRegistration, vapidKey) {
  return __async(this, null, function* () {
    const subscription = yield swRegistration.pushManager.getSubscription();
    if (subscription) {
      return subscription;
    }
    return swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      // `PushManager.subscribe` expects a `BufferSource`; `base64ToArray` produces a typed array.
      // Cast to satisfy the lib typing differences across TS DOM versions.
      applicationServerKey: base64ToArray(vapidKey)
    });
  });
}
var FID_REGISTRATION_REFRESH_MS = 7 * 24 * 60 * 60 * 1e3;
function register$1(messaging, options) {
  return __async(this, null, function* () {
    if (!navigator) {
      throw ERROR_FACTORY2.create(
        "only-available-in-window"
        /* ErrorCode.AVAILABLE_IN_WINDOW */
      );
    }
    if (Notification.permission === "default") {
      yield Notification.requestPermission();
    }
    if (Notification.permission !== "granted") {
      throw ERROR_FACTORY2.create(
        "permission-blocked"
        /* ErrorCode.PERMISSION_BLOCKED */
      );
    }
    if (!messaging.onRegisteredHandler) {
      throw ERROR_FACTORY2.create(
        "invalid-on-registered-handler"
        /* ErrorCode.INVALID_ON_REGISTERED_HANDLER */
      );
    }
    yield updateVapidKey(messaging, options?.vapidKey);
    yield updateSwReg(messaging, options?.serviceWorkerRegistration);
    const prev = messaging._registerNotifyChain.catch(() => {
    });
    messaging._registerNotifyChain = prev.then(() => __async(null, null, function* () {
      const fid = yield messaging.firebaseDependencies.installations.getId();
      const stored = yield dbGetFidRegistration(messaging.firebaseDependencies);
      const now = Date.now();
      const shouldRefresh = !stored || stored.fid !== fid || now >= stored.lastRegisterTime + FID_REGISTRATION_REFRESH_MS;
      if (shouldRefresh) {
        yield registerFcmRegistrationWithFid(messaging, fid);
        yield dbSetFidRegistration(messaging.firebaseDependencies, {
          fid,
          lastRegisterTime: now,
          vapidKey: messaging.vapidKey
        });
      }
      const handler = messaging.onRegisteredHandler;
      if (!handler) {
        throw ERROR_FACTORY2.create(
          "invalid-on-registered-handler"
          /* ErrorCode.INVALID_ON_REGISTERED_HANDLER */
        );
      }
      notifyOnRegistered(messaging, fid);
    }));
    return messaging._registerNotifyChain;
  });
}
function subscribeFidChangeRegistration(messaging, installations) {
  return onIdChange(installations, () => {
    void (() => __async(null, null, function* () {
      if (!messaging.onRegisteredHandler) {
        return;
      }
      const stored = yield dbGetFidRegistration(messaging.firebaseDependencies);
      if (!stored) {
        return;
      }
      yield register$1(messaging).catch(() => {
      });
    }))();
  });
}
function externalizePayload(internalPayload) {
  const payload = {
    from: internalPayload.from,
    // eslint-disable-next-line camelcase
    collapseKey: internalPayload.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: internalPayload.fcmMessageId
  };
  propagateNotificationPayload(payload, internalPayload);
  propagateDataPayload(payload, internalPayload);
  propagateFcmOptions(payload, internalPayload);
  return payload;
}
function propagateNotificationPayload(payload, messagePayloadInternal) {
  if (!messagePayloadInternal.notification) {
    return;
  }
  payload.notification = {};
  const title = messagePayloadInternal.notification.title;
  if (!!title) {
    payload.notification.title = title;
  }
  const body = messagePayloadInternal.notification.body;
  if (!!body) {
    payload.notification.body = body;
  }
  const image = messagePayloadInternal.notification.image;
  if (!!image) {
    payload.notification.image = image;
  }
  const icon = messagePayloadInternal.notification.icon;
  if (!!icon) {
    payload.notification.icon = icon;
  }
}
function propagateDataPayload(payload, messagePayloadInternal) {
  if (!messagePayloadInternal.data) {
    return;
  }
  payload.data = messagePayloadInternal.data;
}
function propagateFcmOptions(payload, messagePayloadInternal) {
  if (!messagePayloadInternal.fcmOptions && !messagePayloadInternal.notification?.click_action) {
    return;
  }
  payload.fcmOptions = {};
  const link = messagePayloadInternal.fcmOptions?.link ?? messagePayloadInternal.notification?.click_action;
  if (!!link) {
    payload.fcmOptions.link = link;
  }
  const analyticsLabel = messagePayloadInternal.fcmOptions?.analytics_label;
  if (!!analyticsLabel) {
    payload.fcmOptions.analyticsLabel = analyticsLabel;
  }
}
function isConsoleMessage(data) {
  return typeof data === "object" && !!data && CONSOLE_CAMPAIGN_ID in data;
}
_mergeStrings("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function _mergeStrings(s1, s2) {
  const resultArray = [];
  for (let i = 0; i < s1.length; i++) {
    resultArray.push(s1.charAt(i));
    if (i < s2.length) {
      resultArray.push(s2.charAt(i));
    }
  }
  return resultArray.join("");
}
function extractAppConfig2(app) {
  if (!app || !app.options) {
    throw getMissingValueError2("App Configuration Object");
  }
  if (!app.name) {
    throw getMissingValueError2("App Name");
  }
  const configKeys = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ];
  const { options } = app;
  for (const keyName of configKeys) {
    if (!options[keyName]) {
      throw getMissingValueError2(keyName);
    }
  }
  return {
    appName: app.name,
    projectId: options.projectId,
    apiKey: options.apiKey,
    appId: options.appId,
    senderId: options.messagingSenderId
  };
}
function getMissingValueError2(valueName) {
  return ERROR_FACTORY2.create("missing-app-config-values", {
    valueName
  });
}
var MessagingService = class {
  constructor(app, installations, analyticsProvider) {
    this.deliveryMetricsExportedToBigQueryEnabled = false;
    this.onBackgroundMessageHandler = null;
    this.onMessageHandler = null;
    this.onRegisteredHandler = null;
    this.onUnregisteredHandler = null;
    this._registerNotifyChain = Promise.resolve();
    this._fidChangeUnsubscribe = null;
    this.logEvents = [];
    this.logQueue = { state: "stopped" };
    const appConfig = extractAppConfig2(app);
    this.firebaseDependencies = {
      app,
      appConfig,
      installations,
      analyticsProvider
    };
  }
  _delete() {
    if (this._fidChangeUnsubscribe) {
      this._fidChangeUnsubscribe();
      this._fidChangeUnsubscribe = null;
    }
    if (this.logQueue.state === "scheduled") {
      clearTimeout(this.logQueue.timerId);
    }
    this.logQueue = { state: "stopped" };
    return Promise.resolve();
  }
};
function getToken$1(messaging, options) {
  return __async(this, null, function* () {
    if (!navigator) {
      throw ERROR_FACTORY2.create(
        "only-available-in-window"
        /* ErrorCode.AVAILABLE_IN_WINDOW */
      );
    }
    if (Notification.permission === "default") {
      yield Notification.requestPermission();
    }
    if (Notification.permission !== "granted") {
      throw ERROR_FACTORY2.create(
        "permission-blocked"
        /* ErrorCode.PERMISSION_BLOCKED */
      );
    }
    yield updateVapidKey(messaging, options?.vapidKey);
    yield updateSwReg(messaging, options?.serviceWorkerRegistration);
    return getTokenInternal(messaging);
  });
}
function logToScion(messaging, messageType, data) {
  return __async(this, null, function* () {
    const eventType = getEventType(messageType);
    const analytics = yield messaging.firebaseDependencies.analyticsProvider.get();
    analytics.logEvent(eventType, {
      /* eslint-disable camelcase */
      message_id: data[CONSOLE_CAMPAIGN_ID],
      message_name: data[CONSOLE_CAMPAIGN_NAME],
      message_time: data[CONSOLE_CAMPAIGN_TIME],
      message_device_time: Math.floor(Date.now() / 1e3)
      /* eslint-enable camelcase */
    });
  });
}
function getEventType(messageType) {
  switch (messageType) {
    case MessageType.NOTIFICATION_CLICKED:
      return "notification_open";
    case MessageType.PUSH_RECEIVED:
      return "notification_foreground";
    default:
      throw new Error();
  }
}
function messageEventListener(messaging, event) {
  return __async(this, null, function* () {
    const internalPayload = event.data;
    if (!internalPayload.isFirebaseMessaging) {
      return;
    }
    if (messaging.onMessageHandler && internalPayload.messageType === MessageType.PUSH_RECEIVED) {
      if (typeof messaging.onMessageHandler === "function") {
        messaging.onMessageHandler(externalizePayload(internalPayload));
      } else {
        messaging.onMessageHandler.next(externalizePayload(internalPayload));
      }
    }
    if (messaging.onRegisteredHandler && internalPayload.messageType === MessageType.FID_REGISTERED) {
      const fid = internalPayload.fid;
      if (typeof messaging.onRegisteredHandler === "function") {
        messaging.onRegisteredHandler(fid);
      } else {
        messaging.onRegisteredHandler.next(fid);
      }
    }
    const dataPayload = internalPayload.data;
    if (isConsoleMessage(dataPayload) && dataPayload[CONSOLE_CAMPAIGN_ANALYTICS_ENABLED] === "1") {
      yield logToScion(messaging, internalPayload.messageType, dataPayload);
    }
  });
}
var WindowMessagingFactory = (container) => {
  const messaging = new MessagingService(container.getProvider("app").getImmediate(), container.getProvider("installations-internal").getImmediate(), container.getProvider("analytics-internal"));
  navigator.serviceWorker.addEventListener("message", (e) => messageEventListener(messaging, e));
  messaging._fidChangeUnsubscribe = subscribeFidChangeRegistration(messaging, container.getProvider("installations").getImmediate());
  return messaging;
};
var WindowMessagingInternalFactory = (container) => {
  const messaging = container.getProvider("messaging").getImmediate();
  const messagingInternal = {
    getToken: (options) => getToken$1(messaging, options),
    register: (options) => register$1(messaging, options)
  };
  return messagingInternal;
};
function registerMessagingInWindow() {
  _registerComponent(new Component(
    "messaging",
    WindowMessagingFactory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  _registerComponent(new Component(
    "messaging-internal",
    WindowMessagingInternalFactory,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  registerVersion(name2, version2);
  registerVersion(name2, version2, "esm2020");
}
function isWindowSupported() {
  return __async(this, null, function* () {
    try {
      yield validateIndexedDBOpenable();
    } catch (e) {
      return false;
    }
    return typeof window !== "undefined" && isIndexedDBAvailable() && areCookiesEnabled() && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
  });
}
function deleteToken$1(messaging) {
  return __async(this, null, function* () {
    if (!navigator) {
      throw ERROR_FACTORY2.create(
        "only-available-in-window"
        /* ErrorCode.AVAILABLE_IN_WINDOW */
      );
    }
    if (!messaging.swRegistration) {
      yield registerDefaultSw(messaging);
    }
    return revokeRegistrationInternal(messaging);
  });
}
function onMessage$1(messaging, nextOrObserver) {
  if (!navigator) {
    throw ERROR_FACTORY2.create(
      "only-available-in-window"
      /* ErrorCode.AVAILABLE_IN_WINDOW */
    );
  }
  messaging.onMessageHandler = nextOrObserver;
  return () => {
    messaging.onMessageHandler = null;
  };
}
function onRegistered$1(messaging, nextOrObserver) {
  messaging.onRegisteredHandler = nextOrObserver;
  return () => {
    if (messaging.onRegisteredHandler === nextOrObserver) {
      messaging.onRegisteredHandler = null;
    }
  };
}
function onUnregistered$1(messaging, nextOrObserver) {
  messaging.onUnregisteredHandler = nextOrObserver;
  return () => {
    if (messaging.onUnregisteredHandler === nextOrObserver) {
      messaging.onUnregisteredHandler = null;
    }
  };
}
function unregister$1(messaging) {
  return __async(this, null, function* () {
    if (!navigator) {
      throw ERROR_FACTORY2.create(
        "only-available-in-window"
        /* ErrorCode.AVAILABLE_IN_WINDOW */
      );
    }
    const stored = yield dbGetFidRegistration(messaging.firebaseDependencies).catch(() => void 0);
    const fid = stored?.fid ?? (yield messaging.firebaseDependencies.installations.getId());
    yield requestDeleteRegistration(messaging.firebaseDependencies, fid);
    try {
      yield dbRemoveFidRegistration(messaging.firebaseDependencies);
    } catch {
    }
    try {
      yield dbRemove(messaging.firebaseDependencies);
    } catch {
    }
    const handler = messaging.onUnregisteredHandler;
    if (!handler) {
      return;
    }
    if (typeof handler === "function") {
      handler(fid);
    } else {
      handler.next(fid);
    }
  });
}
function getMessagingInWindow(app = getApp()) {
  isWindowSupported().then((isSupported) => {
    if (!isSupported) {
      throw ERROR_FACTORY2.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
    }
  }, (_) => {
    throw ERROR_FACTORY2.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  });
  return _getProvider(getModularInstance(app), "messaging").getImmediate();
}
function getToken2(messaging, options) {
  return __async(this, null, function* () {
    messaging = getModularInstance(messaging);
    return getToken$1(messaging, options);
  });
}
function deleteToken(messaging) {
  messaging = getModularInstance(messaging);
  return deleteToken$1(messaging);
}
function onMessage(messaging, nextOrObserver) {
  messaging = getModularInstance(messaging);
  return onMessage$1(messaging, nextOrObserver);
}
function register(messaging, options) {
  return __async(this, null, function* () {
    messaging = getModularInstance(messaging);
    return register$1(messaging, options);
  });
}
function unregister(messaging) {
  return __async(this, null, function* () {
    messaging = getModularInstance(messaging);
    return unregister$1(messaging);
  });
}
function onRegistered(messaging, nextOrObserver) {
  messaging = getModularInstance(messaging);
  return onRegistered$1(messaging, nextOrObserver);
}
function onUnregistered(messaging, nextOrObserver) {
  messaging = getModularInstance(messaging);
  return onUnregistered$1(messaging, nextOrObserver);
}
registerMessagingInWindow();
export {
  deleteToken,
  getMessagingInWindow as getMessaging,
  getToken2 as getToken,
  isWindowSupported as isSupported,
  onMessage,
  onRegistered,
  onUnregistered,
  register,
  unregister
};
/*! Bundled license information:

@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=firebase_messaging.js.map
