export default {
    async getMovies(page, pageSize) {
        const datas = await fetch("https://api.myjson.com/bins/15f8x1").then(resp => resp.json())
        return {
            total: datas.length,
            datas: datas.slice((page - 1) * pageSize, page * pageSize)
        }
    },
    async getMovie(id) {
        const datas = await fetch("https://api.myjson.com/bins/15f8x1").then(resp => resp.json())
        return datas.find(item => item._id === id);
    }
}