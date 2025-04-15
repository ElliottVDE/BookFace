const groups = {};

function createGroup(id, name, description, creatorId) {
    groups[id] = { id, name, description, members: [creatorId], posts: [] };
    return groups[id];
  }

function joinGroup(id,userId) {
    if (groups[id] && !groups[id].members.includes(userId)) {
        groups[id].members.push(userId);
    }
    return groups[id];
}

function leaveGroup(id, userId) {
    if (groups[id]) {
        groups[id].members = groups[id].members.filter(uid => uid !== userId);
    }
    return groups[id];
}

function addPostToGroup(groupId, post){
    if (groups[groupId]) {
        groups[groupId].posts.push(post);
    }
}

function getUserGroups(userId) {
    return Object.values(groups).filter(group => group.members.includes(userId));
}

function getGroup(groupId) {
    return groups[groupId];
}

module.exports = {
    createGroup,
    joinGroup,
    leaveGroup,
    addPostToGroup,
    getUserGroups,
    getGroup,
    groups
};