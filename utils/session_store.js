// utils/session_store.js
const sessions = new Map();

function addSession(userId, data) {
  sessions.set(userId, data);
}

function removeSession(userId) {
  sessions.delete(userId);
}

function getSession(userId) {
  return sessions.get(userId);
}

module.exports = {
  addSession,
  removeSession,
  getSession,
};