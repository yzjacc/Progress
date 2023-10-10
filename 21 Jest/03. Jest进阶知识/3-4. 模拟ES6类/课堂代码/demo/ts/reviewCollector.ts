/**
 * 评论收集类
 */

import ProductReview from "./productReview.js";

export default class ReviewCollector{
    private reviewList: ProductReview[]; // 产品评论的数组
    private productList : string[]; // 产品名称数组

    constructor(){
        this.reviewList = []; // [{_name:"小米手机",_review:"非常好"}]
        this.productList = []; // ["小米手机","苹果手机","小米音响"]
    }


    // 添加一条新的评论到 reviewList
    // 这里在添加商品评论的时候，不仅仅是将商品评论添加到 reviewList
    // 还会查找当前商品评论所对应的商品名称是否存在于 productList
    // 如果不存在，那么就还需要将当前的商品名称添加到 productList
    public addReview(productReview: ProductReview):void{
        this.reviewList.push(productReview);

        let found:boolean = false;
        for(let i=0;i<this.productList.length;i++){
            if(this.productList[i] === productReview.name){
                found = true;
                break;
            }
        }
        if(!found){
            this.productList.push(productReview.name);
        }
    }

    /**
     * 获取某一个产品的好评数
     * 假设评论里面带有“好”字，我们就认为这是一条好评
     * @param productName 小米手机
     */
    public getNumGoodReview(productName:string):number{
        let numGoodReviews = 0;

        for(let i=0;i<this.reviewList.length;i++){
            if(this.reviewList[i].name === productName){
                // 当前这条评论是传入的商品对应的评论
                // 还需要判断当前这条评论是否为好评
                let review = this.reviewList[i].review;
                if(review.indexOf("好") >= 0){
                    numGoodReviews++;
                }
            }
        }

        return numGoodReviews;
    }
}