const URL = 'https://market-backend-zeta.vercel.app'

export async function baseUrl(way, id) {
    try {
        const res = await fetch(`${URL}/${way}${id ? `/${id}` : ""}`);
        const data = await res.json();
        return data

    } catch (error) {
        console.log(error);

    }
}