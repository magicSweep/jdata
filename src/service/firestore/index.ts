//import { initializeApp, credential, firestore } from "firebase-admin";

// JEST DO NOT WORK WITH THAT KINDA IMPORTS
import { initializeApp, cert } from "firebase-admin/app";
//import { credential } from "firebase-admin/lib";
import { getFirestore } from "firebase-admin/firestore";

//import { photosCollectionName } from "../config";

//const serviceAccount = require(pathToFirestoreCredentials);

/* export let firestoreDb: firestore.Firestore;

export const setFirestore = (db: firestore.Firestore) => {
    firestoreDb = db;
};

export const getFirestore = () => firestoreDb; */

export const init = () => {
  try {
    //console.log("!!!!!!!!!!!!!!!!!!!", process.env.PROJECT_ID);
    //console.log("!!!!!!!!!!!!!!!!!!!", process.env.FIRESTORE_CLIENT_EMAIL);

    let privateKey = process.env.FIRESTORE_PRIVATE_KEY as string;
    if (process.env.IENV === "heroku") {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }

    initializeApp({
      credential: cert({
        //type: "service_account",
        //private_key_id: "d840b18e39d60eb7000d658180ec8fbaa06bdd18",
        projectId: process.env.PROJECT_ID,
        privateKey,
        clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
        /*       client_id: "102514509935869039049",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uef40%40lizzigram-1600291187801.iam.gserviceaccount.com",
   */
      }),
    });
  } catch (err: any) {
    console.error(
      "FIREBASE INIT ERROR",
      process.env.PROJECT_ID,
      err.message ? err.message : JSON.stringify(err)
    );
  }
};

// Add document with random id
export const addOne =
  (collectionName: string) =>
  async <T>(docData: T, id?: string) => {
    const db = getFirestore();

    let docRef;

    if (id === undefined) docRef = db.collection(collectionName).doc();
    else docRef = db.collection(collectionName).doc(id);

    /* const res: firestore.WriteResult = */
    await docRef.set(docData as any);

    return true;
  };

export const addMany =
  (collectionName: string) =>
  async <T>(docsData: T[]) => {
    const db = getFirestore();

    const promises = docsData.map((data) => {
      return db
        .collection(collectionName)
        .doc()
        .set(data as any);
    });

    await Promise.all(promises);

    return true;
  };

//export const addOne = addOne_(photosCollectionName);

export const getAll = (collectionName: string) => async () => {
  const db = getFirestore();

  const snapshot = await db.collection(collectionName).get();

  const result: any[] = [];

  snapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return result;
};

//export const getAll = getAll_(photosCollectionName);

export const exists =
  (collectionName: string) =>
  async (docId: string): Promise<any | undefined> => {
    const db = getFirestore();

    const docRef = db.collection(collectionName).doc(docId);

    const doc = await docRef.get();

    return doc.exists;
  };

export const executeQuery = async (
  queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>
) => {
  const snapshot = await queryRef.get();

  if (snapshot.empty) {
    return;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const getOneByArrayContainsCondition =
  (collectionName: string) =>
  (rowName: string, value: any): Promise<any | undefined> => {
    const db = getFirestore();

    const queryRef = db
      .collection(collectionName)
      .where(rowName, "array-contains", value);

    return executeQuery(queryRef);
  };

export const getOneByEqualCondition =
  (collectionName: string) =>
  (rowName: string, value: any): Promise<any | undefined> => {
    const db = getFirestore();

    const queryRef = db.collection(collectionName).where(rowName, "==", value);

    return executeQuery(queryRef);
  };

export const getOne =
  (collectionName: string) =>
  async (docId: string): Promise<any | undefined> => {
    const db = getFirestore();

    const docRef = db.collection(collectionName).doc(docId);

    const doc = await docRef.get();

    if (doc.exists !== true) {
      return undefined;
    } else {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }
  };

//export const getOne = getOne_(photosCollectionName);

export const deleteOne = (collectionName: string) => async (docId: string) => {
  const db = getFirestore();

  await db.collection(collectionName).doc(docId).delete();

  return true;
};

//export const deleteOne = deleteOne_(photosCollectionName);

export const updateOne =
  (collectionName: string) => async (docId: string, fieldsToUpdate: any) => {
    const db = getFirestore();

    //console.log("----UPDATE ONE", JSON.stringify(fieldsToUpdate));

    const docRef = db.collection(collectionName).doc(docId);

    await docRef.update(fieldsToUpdate);

    return true;
  };

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
