"use strict";
//import { initializeApp, credential, firestore } from "firebase-admin";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateOne = exports.deleteOne = exports.getOne = exports.exists = exports.getAll = exports.addMany = exports.addOne = exports.init = void 0;
// JEST DO NOT WORK WITH THAT KINDA IMPORTS
var app_1 = require("firebase-admin/app");
//import { credential } from "firebase-admin/lib";
var firestore_1 = require("firebase-admin/firestore");
//import { photosCollectionName } from "../config";
//const serviceAccount = require(pathToFirestoreCredentials);
/* export let firestoreDb: firestore.Firestore;

export const setFirestore = (db: firestore.Firestore) => {
    firestoreDb = db;
};

export const getFirestore = () => firestoreDb; */
var init = function () {
    try {
        //console.log("!!!!!!!!!!!!!!!!!!!", process.env.PROJECT_ID);
        //console.log("!!!!!!!!!!!!!!!!!!!", process.env.FIRESTORE_CLIENT_EMAIL);
        var privateKey = process.env.FIRESTORE_PRIVATE_KEY;
        if (process.env.IENV === "heroku") {
            privateKey = privateKey.replace(/\\n/g, "\n");
        }
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)({
                //type: "service_account",
                //private_key_id: "d840b18e39d60eb7000d658180ec8fbaa06bdd18",
                projectId: process.env.PROJECT_ID,
                privateKey: privateKey,
                clientEmail: process.env.FIRESTORE_CLIENT_EMAIL
            })
        });
    }
    catch (err) {
        console.error("FIREBASE INIT ERROR", process.env.PROJECT_ID, err.message ? err.message : JSON.stringify(err));
    }
};
exports.init = init;
// Add document with random id
var addOne = function (collectionName) {
    return function (docData, id) { return __awaiter(void 0, void 0, void 0, function () {
        var db, docRef;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = (0, firestore_1.getFirestore)();
                    if (id === undefined)
                        docRef = db.collection(collectionName).doc();
                    else
                        docRef = db.collection(collectionName).doc(id);
                    /* const res: firestore.WriteResult = */
                    return [4 /*yield*/, docRef.set(docData)];
                case 1:
                    /* const res: firestore.WriteResult = */
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); };
};
exports.addOne = addOne;
var addMany = function (collectionName) {
    return function (docsData) { return __awaiter(void 0, void 0, void 0, function () {
        var db, promises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = (0, firestore_1.getFirestore)();
                    promises = docsData.map(function (data) {
                        return db.collection(collectionName).doc().set(data);
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); };
};
exports.addMany = addMany;
//export const addOne = addOne_(photosCollectionName);
var getAll = function (collectionName) { return function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, snapshot, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, firestore_1.getFirestore)();
                return [4 /*yield*/, db.collection(collectionName).get()];
            case 1:
                snapshot = _a.sent();
                result = [];
                snapshot.forEach(function (doc) {
                    result.push(__assign({ id: doc.id }, doc.data()));
                });
                return [2 /*return*/, result];
        }
    });
}); }; };
exports.getAll = getAll;
//export const getAll = getAll_(photosCollectionName);
var exists = function (collectionName) {
    return function (docId) { return __awaiter(void 0, void 0, void 0, function () {
        var db, docRef, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = (0, firestore_1.getFirestore)();
                    docRef = db.collection(collectionName).doc(docId);
                    return [4 /*yield*/, docRef.get()];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/, doc.exists];
            }
        });
    }); };
};
exports.exists = exists;
var getOne = function (collectionName) {
    return function (docId) { return __awaiter(void 0, void 0, void 0, function () {
        var db, docRef, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = (0, firestore_1.getFirestore)();
                    docRef = db.collection(collectionName).doc(docId);
                    return [4 /*yield*/, docRef.get()];
                case 1:
                    doc = _a.sent();
                    if (doc.exists !== true) {
                        return [2 /*return*/, undefined];
                    }
                    else {
                        return [2 /*return*/, __assign({ id: doc.id }, doc.data())];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.getOne = getOne;
//export const getOne = getOne_(photosCollectionName);
var deleteOne = function (collectionName) { return function (docId) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, firestore_1.getFirestore)();
                return [4 /*yield*/, db.collection(collectionName).doc(docId)["delete"]()];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); }; };
exports.deleteOne = deleteOne;
//export const deleteOne = deleteOne_(photosCollectionName);
var updateOne = function (collectionName) { return function (docId, fieldsToUpdate) { return __awaiter(void 0, void 0, void 0, function () {
    var db, docRef;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, firestore_1.getFirestore)();
                docRef = db.collection(collectionName).doc(docId);
                return [4 /*yield*/, docRef.update(fieldsToUpdate)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); }; };
exports.updateOne = updateOne;
//export const updateOne = updateOne_(photosCollectionName);
/*

createPhotoRecord = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .set(this.photo);
  };

  getPhotoRecordFromFirestore = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .get();
  };

  setExistedPhoto = async (photoId: string) => {
    const doc = await this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(photoId)
      .get();

    if (!doc.exists) throw new Error(`No photo with id - ${photoId}`);

    this.photoId = photoId;

    this.photo = doc.data() as any;
  };

  removePhotoRecord = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .delete();
  };
*/
/* export const getAll = async () => {
  return await db.collection("photos").limit(3).get();
}; */
