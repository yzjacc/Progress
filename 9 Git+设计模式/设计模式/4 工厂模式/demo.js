//工厂模式（Factory Pattern）是一种创建型设计模式，
//主要的思路是提供一个用于创建对象的接口（即工厂），让子类决定实例化哪一个类。

// 首先，我们可以为所有动物定义一个共通的接口，比如所有动物都有发出声音（`makeSound`）的方法：
class Animal {
  makeSound() {
  }
}

// 然后，我们可以根据每种动物的特性来创建各自的类：

class Dog extends Animal {
  makeSound() {
    return 'Woof!';
  }
}

class Cat extends Animal {
  makeSound() {
    return 'Meow!';
  }
}

// 然后我们创建动物工厂：

class AnimalFactory {
  createAnimal(animalType) {
    switch (animalType) {
      case 'Dog':
        return new Dog();
      case 'Cat':
        return new Cat();
    }
  }
}

// 现在，我们可以通过工厂模式创建动物：

const animalFactory = new AnimalFactory();

const dog = animalFactory.createAnimal('Dog');
console.log(dog.makeSound()); // Woof!

const cat = animalFactory.createAnimal('Cat');
console.log(cat.makeSound()); // Meow!

//工厂负责根据输入生成具体的对象，这样当需要增加新的动物时，我们只需要在工厂里新增一个分支即可，不需要修改已有的代码。这就是工厂模式的用途。