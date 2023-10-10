/**
 * 产品评论类
 */
export default class ProductReview {
    constructor(name, review) {
        this._name = name;
        this._review = review;
    }
    get name() {
        return this._name;
    }
    get review() {
        return this._review;
    }
}
