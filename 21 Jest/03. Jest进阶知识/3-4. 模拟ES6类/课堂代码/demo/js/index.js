import ReviewCollector from "./reviewCollector.js";
import ProductReview from "./productReview.js";
const reviewCollector = new ReviewCollector();
reviewCollector.addReview(new ProductReview("小米手表", "比较好用"));
reviewCollector.addReview(new ProductReview("苹果手机", "很好用"));
reviewCollector.addReview(new ProductReview("海豚音响", "使用体验一般"));
reviewCollector.addReview(new ProductReview("小米手表", "非常好的一个手表"));
reviewCollector.addReview(new ProductReview("苹果手机", "我一直用的苹果手机"));
reviewCollector.addReview(new ProductReview("海豚音响", "还行吧"));
console.log(reviewCollector.getNumGoodReview("小米手表")); // 2
console.log(reviewCollector.getNumGoodReview("苹果手机")); // 1
console.log(reviewCollector.getNumGoodReview("海豚音响")); // 0
