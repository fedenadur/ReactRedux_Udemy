export const apiGet = (url) => () => fetch(url).then(v => v.json());

export const apiPut = (url, id, obj) => () => fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(v => v.json())
    .then(r => {
        console.log(r);
        if (r.error) {
            console.log(r.validation);
            return Promise.reject(r.validation);
        }

        return r;
    });

export const apiPost = (url, obj) => () => fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: new Headers({ 'Content-type': 'application/json' })
}).then(v => v.json())
    .then(r => {
        console.log(r);
        if (r.error) {
            console.log(r.validation);
            return Promise.reject(r.validation);
        }

        return r;
    });