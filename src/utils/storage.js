export const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFormStorage = ( key ) => {
    const data = localStorage.getItem(key);

    if (!data) {
        return null;
    }
    return JSON.parse(data);
};

export const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};

export const clearHireFlowStroage = () => {

    localStorage.removeItem( "hireflow_candidates" );

    localStorage.removeItem( "hireflow_jobs" );

    localStorage.removeItem( "hireflow_interviews" );

    localStorage.removeItem( "hireflow_team" );
};