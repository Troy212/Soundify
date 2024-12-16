import { Price } from "@/types";

export const getURL = () => {
    let url = 
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'https://soundify-by-troy.vercel.app/';

    // Fix: Use correct template literal syntax and logic
    url = url.includes('https') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

    return url;
};


export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: {price: Price}
}) => {
    console.log('POST REQUEST:', url, data);


    const res: Response = await fetch(url, {
        method: 'POST',
        headers: new Headers({'content-Type': 'applications/json'}),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })



    if (!res.ok) {
        console.log('Error in POST', { url, data, res});

        throw new Error(res.statusText);
    }


    return res.json();
};


export const toDataTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z');
    t.setSeconds(secs);
    return t;
};