const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
admin.initializeApp();

exports.removeExpiredDocuments = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = firestore.Timestamp.now();
  // delete every 7 days
  const ts = firestore.Timestamp.fromMillis(now.toMillis() - 604800000 );

  const snap = await db.collection("docs").where("publishedAt", "<", ts).get();
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});