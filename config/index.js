module.exports = {
  ELASTICSEARCH_HOST: process.env.ELASTICSEARCH_HOST || "http://localhost:9200",
  kafka: {
    syncFriendCreate: {
      TOPIC: "sync-friend-create",
      GROUP: "g-sync-friend-create",
    },
    syncFriendEdit: {
      TOPIC: "sync-friend-edit",
      GROUP: "g-sync-friend-edit",
    },
    syncFriendRemove: {
      TOPIC: "sync-friend-remove",
      GROUP: "g-sync-friend-remove",
    },
  },
};
