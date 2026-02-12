type StorageKey = string;

const setItem = (key: StorageKey, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getItem = <T>(key: StorageKey): T | false => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item) as T;
    }
    return false;
}

const getItemGeneric = (key: StorageKey): string | false => {
    const item = localStorage.getItem(key);
    if (item) {
        return item;
    }
    return false;
}

const setItemGeneric = (key: StorageKey, value: string): void => {
    localStorage.setItem(key, value);
};

const removeItem = (key: StorageKey): boolean => {
    if (getItem(key) === false) return false;
    localStorage.removeItem(key);
    return true;
}

const clearStorage = (): void => {
    localStorage.clear();
}

export {
    setItem,
    getItem,
    getItemGeneric,
    setItemGeneric,
    removeItem,
    clearStorage,
};