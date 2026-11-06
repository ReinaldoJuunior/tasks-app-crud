export const fetchWithToken = async (
    url: string,
    token: string,
    options: RequestInit = {}
) => {
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return await res.json();
};
