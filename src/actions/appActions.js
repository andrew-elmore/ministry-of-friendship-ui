export function addNotice(note) {
    return {
        type: 'NOTICE_ADD',
        payload: Promise.resolve(note),
    };
}

export function updateNotice(note) {
    return {
        type: 'NOTICE_UPDATE',
        payload: Promise.resolve(note),
    };
}

export function removeNotice(note) {
    return {
        type: 'NOTICE_REMOVE',
        payload: Promise.resolve(note),
    };
}

export function clearNotice() {
    return {
        type: 'NOTICE_CLEAR',
        payload: Promise.resolve(),
    };
}

export default {
    addNotice,
    updateNotice,
    removeNotice,
    clearNotice,
};
