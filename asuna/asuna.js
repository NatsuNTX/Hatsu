const points = require('./asunapoint');
const fetch = require('node-fetch');

class asuna {

    /* Asuna Wrapper */
    async asunaImg(img) {
        return fetch(`${points.asunaBase}${img}`)
            .then(res => res.json())
            .then(json => {
                if (json.url === undefined) throw new Error(`[ASUNA]:Cannot get ${img} Image!`)
                return json.url
            });
    }
}
module.exports = asuna