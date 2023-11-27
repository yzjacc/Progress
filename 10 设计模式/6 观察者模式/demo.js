class Subject {
    constructor() {
        this.observers = new Map();
    }

    subscribe(observer) {
        this.observers.set(observer, (data) => console.log(`${observer} received: ${data}`));
    }

    unsubscribe(observer) {
        this.observers.delete(observer);
    }

    notify(data) {
        this.observers.forEach((observerCallback, observer) => {
            observerCallback(data);
        });
    }
}

// 创建主题
const subject = new Subject();

// 订阅主题
subject.subscribe('Observer 1');
subject.subscribe('Observer 2');

// 发出通知
subject.notify('Hello, Observer!');