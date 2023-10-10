/**
 * 产品评论类
 */

export default class ProductReview {
  private _name: string; // 产品的名称
  private _review: string; // 产品的评论

  constructor(name: string, review: string){
    this._name = name;
    this._review = review;
  }

  get name():string {
    return this._name;
  }

  get review():string {
    return this._review;
  }

  static showInfo():string{
    return "这是一条产品评论";
  }
}