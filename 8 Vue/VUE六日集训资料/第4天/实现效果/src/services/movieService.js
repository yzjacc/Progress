
export default {
    async getMovies(page, pageSize) {
        const arr = await fetch("https://api.myjson.com/bins/15f8x1")
            .then(resp => resp.json());
        return {
            total: arr.length,
            datas: arr.slice((page - 1) * pageSize, page * pageSize)
        } 
    }
}