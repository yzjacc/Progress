# 整合 webpack 综合练习

这一小节，我们来做一个综合的练习，该练习会整合：

- *typescript*
- *webpack*
- *jest*

## 准备工作

首先创建项目目录，通过 *npm init -y* 进行初始化。

整个项目我们打算使用 *typescript* 进行开发，因此需要安装 *typescript*

```bash
npm i typescript -D
```

然后通过 *npx tsc --init* 创建 *ts* 的配置文件，简化其配置文件如下：

```ts
{
  "compilerOptions": {
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "commonjs" /* Specify what module code is generated. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["./src"]
}
```

接下来在项目根目录下创建 *src* 目录，该目录就是我们的源码目录。但是现在有一点比较麻烦的是，如果我们写了 *ts* 代码，每次都需要手动的通过 *tsc* 编译成 *js* 代码，然后在进行代码测试，整个过程是非常繁琐的。

此时我们就可以通过 *webpack* 来启动一个开发服务器，通过开发服务器访问到我们所书写的内容，并且通过开发服务器访问时能够自动的将我们的 *ts* 代码转为 *js* 代码。

安装相应的依赖：

```bash
npm i webpack webpack-cli webpack-dev-server -D
```

这一行代码使用 npm 安装了三个开发依赖包：webpack、webpack-cli 和 webpack-dev-server，使用了 -D 参数来指定这些依赖是开发依赖，而不是生产依赖。具体来说，这些依赖的作用如下：

- *webpack*：是一个现代化的 *JavaScript* 应用程序的静态模块打包器。它通过分析模块之间的依赖关系，将多个模块打包成一个或多个 *bundle*，以便在浏览器中加载。*Webpack* 支持各种前端技术，包括 *JavaScript*、*CSS*、图片等，可以通过插件和 *loader* 进行扩展和定制。
- *webpack-cli*：是 *Webpack* 的命令行工具，提供了一系列的命令和选项，用于执行 *Webpack* 的各种操作，例如打包、启动开发服务器、查看构建状态等。
- *webpack-dev-server*：是 *Webpack* 的开发服务器，可以在本地启动一个服务器，用于开发调试和热重载。它支持自动刷新、热更新、代理转发等功能，可以提高开发效率和体验。

安装完毕后，在项目根目录下面创建 *webpack.config.ts* 配置文件，书写如下的配置：

```ts
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "development",
  entry: "./src/ts/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};

export default config;
```

这个 *Webpack* 配置文件是一个基本的 *TypeScript* + *CSS* + *HTML* 项目的配置文件，主要用于将 *TypeScript* 代码编译成 *JavaScript* 代码、将 *CSS* 样式打包到单独的文件中、将 *HTML* 模板复制到输出目录，并启动一个开发服务器进行调试。

具体来说，这个配置文件的各个配置项的含义如下：

- *mode*：设置打包模式，这里设置为 *development*，表示开发模式。
- *entry*：设置入口文件，这里设置为 *./src/ts/index.ts*，表示 *TypeScript* 代码的入口文件。
- *output*：设置输出文件，这里设置输出目录为 *./dist*，输出文件名为 *bundle.js*。
- *module*：配置模块的加载规则，这里设置了两个规则：
    - 对于以 *.tsx* 或 *.ts* 结尾的文件，使用 *ts-loader* 进行编译，并排除 *node_modules* 目录。
    - 对于以 *.css* 结尾的文件，使用 *css-loader* 和 *mini-css-extract-plugin* 将 *CSS* 样式打包到单独的文件中。
- *resolve*：配置 *Webpack* 在导入模块时如何解析文件路径，这里设置了文件扩展名为 *.tsx*、*.ts* 和 *.js*。
- *plugins*：配置插件，这里使用了三个插件：
    - *html-webpack-plugin*：根据 *./src/html/index.html* 模板生成 *./dist/index.html* 文件，并自动将打包后的 *JS* 文件和 *CSS* 文件引入到 *HTML* 文件中。
    - *mini-css-extract-plugin*：将 *CSS* 样式从 *JS* 文件中提取出来，生成单独的 *CSS* 文件。
    - *clean-webpack-plugin*：在每次打包之前清空输出目录。
- *devServer*：配置 *Webpack* 开发服务器，这里设置了服务器的端口号为 *3000*，并启用了 *gzip* 压缩和自动打开浏览器功能。

注意在上面的 *webpack* 配置文件中，用到了一些 *loader* 和插件，因此这里需要进行安装：

```bash
npm i ts-loader css-loader html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin -D
```

另外，由于我们的配置文件也是以 *ts* 结尾的，因此我们还需要安装 *ts-node* 依赖，以便可以直接运行 *TypeScript* 代码类型的配置文件，而无需事先将 *TypeScript* 代码编译成 *JavaScript* 代码。

```bash
npm i ts-node -D
```

接下来我们来书写一些代码验证环境是否已经搭建完成。

```html
<p id="op">这是一个测试</p>
```
```css
#op {
    color: red;
    font-size: 32px;
    font-weight: 600;
}
```
```ts
// ts/index.ts
import { test } from "./module";
import "../css/index.css"
const op = document.querySelector("#op") as HTMLElement;
op.addEventListener("click", function () {
  test();
});
```
```ts
// ts/module.ts
export function test() {
  console.log("test");
}
```

在 *package.json* 中添加如下的命令：

```js
"scripts": {
    ...
    "start": "webpack serve"
},
```

*npm run start* 后会自动打开浏览器，访问 *3000* 端口，并且看到如下的效果

<img src="https://resource.duyiedu.com/xiejie/2023-04-28-055209.png" alt="image-20230428135208505" style="zoom:50%;" />

整理一下整个过程发生了什么，当我们执行 *npm run start*，*webpack-dev-server* 会启动一个端口 *3000* 的服务器，接下来 *webpack* 会对 *src* 目录下面的源码进行打包，这里的打包不仅仅是合并多个文件，还包括对浏览器不认识的文件进行处理，比如 *ts-loader* 会对源码中的 *ts* 代码进行处理。

浏览器会去访问这个端口为 *3000* 的服务器，拿到打包好后的资源，并在浏览器中渲染出来。

当开发完成后，我们就可以对资源进行打包操作，在 *package.json* 中添加如下的命令：

```js
"scripts": {
    ...
    "build": "webpack"
},
```

执行 *npm run build* 之后，项目就会被打包到 *dist* 目录下面。

<img src="https://resource.duyiedu.com/xiejie/2023-04-28-055247.png" alt="image-20230428135247041" style="zoom:50%;" />

## 像素鸟项目测试

准备工作做完后，接下来我们来演示一个像样一点的项目，做一个像素鸟的游戏。不过这里并不会讲具体像素鸟游戏的编码，有关该游戏的编码，请参阅源码部分。

现在假设我们已经书写完了整个游戏项目，接下来是对该项目中一些重要的模块进行测试。

首先安装如下的依赖：

```js
npm i jest ts-jest @types/jest jest-environment-jsdom -D
```

各个依赖包的作用如下：

- *jest*：*Jest* 是一个流行的 *JavaScript* 测试框架，用于编写单元测试和集成测试。它提供了一套简单而强大的 *API*，可以轻松编写测试用例，同时还能够提供代码覆盖率、快照测试、*Mock* 等功能。
- *ts-jest*：*ts-jest* 是 *Jest* 的 *TypeScript* 处理器，用于将 *TypeScript* 代码转换为 *JavaScript* 代码并运行 *Jest* 测试。它提供了一系列的配置选项，可以根据不同的需求进行配置。使用 *ts-jest* 可以让 *TypeScript* 代码进行测试变得更加方便和高效。
- *@types/jest*：*Jest* 的类型定义文件，用于在 *TypeScript* 代码中使用 *Jest API* 时进行类型检查。
- *jest-environment-jsdom*：*Jest* 的默认测试环境是 *Node.js*，但是有些测试场景需要在浏览器环境下进行测试。*jest-environment-jsdom* 提供了一个基于 *JSDOM* 的测试环境，可以在 *Node.js* 中模拟浏览器环境，用于编写浏览器相关的测试用例。当然，如果你的测试场景不需要在浏览器环境下进行测试，也可以不安装该依赖。

然后通过 *npx jest --init* 创建配置文件，注意 *test environment* 选择 *jsdom*，配置文件中的 *preset* 配置为 *ts-jest*。

之后我们需要创建测试目录，一般来说，不建议将 *test* 目录放在 *src* 目录下面，因为测试代码和源代码的职责是不同的，它们有不同的维护周期、不同的目标和不同的使用者。将测试代码与源代码混在一起会增加源代码的复杂度，不利于代码的维护和阅读。此外，将测试代码放在 *src* 目录下可能会导致一些不必要的问题，例如编译时会将测试代码也编译进去，增加了编译时间和文件大小。

通常情况下，测试代码应该放在一个单独的目录中，以便于与源代码进行分离。可以在项目的根目录下创建一个 *test* 或 \__tests__ 目录，并在该目录下组织测试文件的目录结构，以保持和源代码的相对位置关系。例如，如果源代码文件在 *src* 目录中，那么可以将测试代码文件放在 *test* 目录下，并保持相同的目录结构，如 *test/utils/format.test.ts* 对应于 *src/utils/format.ts*。

下面是一个目录示例：

```bash
my-project/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── utils/
│   │   ├── format.ts
│   │   └── validate.ts
│   └── index.ts
├── test/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── Input.test.tsx
│   └── utils/
│       ├── format.test.ts
│       └── validate.test.ts
├── package.json
├── tsconfig.json
└── jest.config.js
```
在上述目录结构中，*src* 目录包含了项目的源代码，*test* 目录包含了项目的测试代码。测试代码文件的目录结构与源代码文件的目录结构相同，以保持相对位置关系。在该目录结构中，*test* 目录位于项目的根目录下，而不是在 *src* 目录中。

这种目录结构可以有效地将测试代码与源代码分离开来，使得代码更加模块化和易于维护。同时，也方便了测试和开发的协作，使得团队成员可以更加专注于自己的工作，而不会被其他代码干扰。

了解了这一点后，在项目根目录下创建 \__tests__ 目录，然后我们对一些重要的模块进行测试。

```ts
// __tests__/getTimer.test.ts
import getTimer from "../src/ts/modules/util";

describe("getTimer", () => {
  let timer: ReturnType<typeof getTimer>;

  beforeEach(() => {
    jest.useFakeTimers(); // 开启 fake timers
    timer = getTimer(1000, {}, jest.fn());
  });

  afterEach(() => {
    jest.clearAllTimers(); // 清除所有的计时器
    jest.useRealTimers(); // 恢复真实的计时器
  });

  test("starts and stops the timer correctly", () => {
    const callback = jest.fn();
    // 替换真实的 setInterval
    const setIntervalSpy = jest.spyOn(window, "setInterval");
    const timer = getTimer(1000, {}, callback);
    timer.start();
    // setInterval 被调用第一次
    jest.advanceTimersByTime(500);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(500);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    timer.stop();
    timer.start();
    // setInterval 被调用第二次次
    jest.advanceTimersByTime(500);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(500);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(3000);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
    timer.stop();
  });

  test("executes the callback function correctly", () => {
    const callback = jest.fn();
    timer = getTimer(1000, {}, callback);
    timer.start();
    expect(callback).toHaveBeenCalledTimes(0); // callback 没有被调用
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1); // callback 被调用一次
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3); // callback 被调用三次
    timer.stop();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3); // callback 被调用三次
  });
});
```

在这段代码中，我们针对 *getTimer* 函数进行了测试。

在 *describe* 函数中，我们创建了一个测试组，用来对 *getTimer* 函数进行测试。在该测试组中，我们定义了两个测试用例。

在第一个测试用例中，我们测试了 *getTimer* 函数的计时器能否正确地启动和停止，并且能否正确地执行回调函数。为了测试这个函数，我们首先调用了 *jest.useFakeTimers( )*，这个函数可以开启 *fake timers*，用来模拟时间流逝。然后，我们创建了一个计时器，并且定义了一个回调函数。接着，我们通过调用 *timer.start( )* 启动计时器，并模拟了时间流逝，以测试计时器是否按照预期执行。最后，我们调用 *timer.stop( )* 停止计时器，结束测试。

在第二个测试用例中，我们测试了 *getTimer* 函数的回调函数能否正确地执行。和第一个测试用例类似，我们首先创建了一个计时器，并定义了一个回调函数。然后，我们启动了计时器，并模拟了时间流逝，以测试回调函数是否按照预期执行。最后，我们调用 *timer.stop( )* 停止计时器，结束测试。

在每个测试用例之前，我们调用了 *beforeEach* 函数，用来在每个测试用例执行前执行一些操作。在该函数中，我们先调用了 *jest.useFakeTimers( )* 开启 *fake timers*，然后创建了一个计时器，并将其赋值给 *timer* 变量。在每个测试用例执行完毕后，我们调用了 *afterEach* 函数，用来在每个测试用例执行后执行一些操作。在该函数中，我们调用了 *jest.clearAllTimers( )* 清除所有计时器，然后调用了 *jest.useRealTimers( )* 恢复真实的计时器。

在第一个测试用例中，我们使用了 *jest.spyOn(window, "setInterval")* 函数来替换真实的 *setInterval* 函数，这样我们就可以跟踪 *setInterval* 函数的调用次数了。我们使用了 *jest.advanceTimersByTime* 函数来模拟时间流逝，并且使用 *expect* 函数来断言 *setInterval* 函数的调用次数是否符合预期。

在第二个测试用例中，我们只需要测试回调函数是否被正确地调用即可。同样，我们使用了 *jest.advanceTimersByTime* 来模拟时间流逝，并使用 *expect* 函数来断言回调函数的调用次数是否符合预期。

除了这个工具函数，我们还可以对一些类进行测试，比如下面是针对 *Sky* 这个类进行测试：

```ts
import Sky from "../src/ts/modules/Sky";

test("测试构造函数是否正常工作", () => {
  const sky = new Sky();
  // 检查 sky 对象是否被成功创建
  expect(sky).toBeDefined();

  // 检查 Sky 类的属性是否被正确设置
  expect(sky.left).toEqual(0);
  expect(sky.dom).toBeDefined();
});

test("测试 show 方法是否正常工作", () => {
  const sky = new Sky();
  const mockDom = {
    style: {
      left: "",
    },
  };
  sky.dom = mockDom as HTMLElement;

  // 设置 left 值
  sky.left = 50;

  // 调用 show 方法
  sky.show();

  // 检查 dom 元素的 left 值是否被正确设置
  expect(mockDom.style.left).toEqual("50px");
});

test("测试定时器回调函数是否正常工作", () => {
  // 模拟 setInterval 函数
  jest.useFakeTimers();

  const sky = new Sky();
  const mockDom = {
    style: {
      left: "",
    },
  };
  sky.dom = mockDom as HTMLElement;

  // 设置 left 值
  sky.left = 0;

  // 启动定时器
  sky.timer.start();

  // 模拟时间流逝
  jest.advanceTimersByTime(300);

  // 检查 sky 对象的 left 值是否被正确修改
  expect(sky.left).toEqual(-10);

  // 检查定时器回调函数是否正确执行
  expect(mockDom.style.left).toEqual("-10px");

  // 停止定时器
  sky.timer.stop();
});

test("测试定时器是否能够正常停止", () => {
  // 模拟 setInterval 函数
  jest.useFakeTimers();

  const sky = new Sky();
  const mockDom = {
    style: {
      left: "",
    },
  };
  sky.dom = mockDom as HTMLElement;

  // 设置 left 值
  sky.left = 0;

  // 启动定时器
  sky.timer.start();

  // 模拟时间流逝
  jest.advanceTimersByTime(150);

  // 停止定时器
  sky.timer.stop();

  // 模拟时间流逝
  jest.advanceTimersByTime(300);

  // 检查 sky 对象的 left 值是否在停止定时器后停止更新
  expect(sky.left).toEqual(-5);

  // 检查定时器回调函数是否在停止定时器后停止执行
  expect(mockDom.style.left).toEqual("-5px");
});

test("是否会重置为零", () => {
  // 模拟 setInterval 函数
  jest.useFakeTimers();

  const sky = new Sky();
  const mockDom = {
    style: {
      left: "",
    },
  };
  sky.dom = mockDom as HTMLElement;

  // 设置 left 值
  sky.left = 0;

  // 启动定时器
  sky.timer.start();

  // 模拟时间流逝
  // 24000 毫秒后应该为 -800，进而一步应该为 0
  jest.advanceTimersByTime(24000);

  // 停止定时器
  sky.timer.stop();

  // 检查 sky 对象的 left 值是否在停止定时器后停止更新
  expect(sky.left).toEqual(0);

  // 检查定时器回调函数是否在停止定时器后停止执行
  expect(mockDom.style.left).toEqual("0px");
});
```

相似的 *Land* 等其他类这里不再做演示，我们可以再来看一个 *Bird* 类，在测试 *Bird* 类的时候，涉及到了引入 *Game* 类，因此这里就会涉及到屏蔽这个 *Game* 为我们测试 *Bird* 类所带来的影响，也就是需要模拟这个 *Game* 类。

*Bird* 类相关的测试用例代码如下：

```ts
import Bird from "../src/ts/modules/Bird";
import Game from "../src/ts/modules/Game";

// 使用 jest.mock 来模拟 ProductReview 类
jest.mock("../src/ts/modules/Game", () => {
  return jest.fn().mockImplementation(() => ({}));
});

test("测试show方法", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  bird.top = 100;
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  // show方法的测试重点在于有没有根据最新的wingIndex设置backgroundPosition
  bird.show();
  // 断言
  expect(bird.dom.style.top).toBe("100px");
  bird.wingIndex = 0;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-8px -10px");
  bird.wingIndex = 1;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-60px -10px");
  bird.wingIndex = 2;
  bird.show();
  expect(bird.dom.style.backgroundPosition).toBe("-113px -10px");
});

test("测试setTop方法", () => {
  // 准备测试数据
  const game = new Game();
  game.maxHeight = 600 - 112;
  const bird = new Bird(game);
  bird.top = 100;
  bird.height = 26;
  // setTop方法的测试重点在于有没有对设置的值进行边界判断
  // 调用被测试方法
  bird.setTop(-100);
  expect(bird.top).toBe(0);
  bird.setTop(600);
  expect(bird.top).toBe(600 - 112 - 26);
  bird.setTop(100);
  expect(bird.top).toBe(100);
});

// 测试 Bird 类的 jump 方法
test("测试 Bird 类的 jump 方法", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  bird.speed = 0;
  // 测试重点在于有没有改变 speed
  // 调用被测试方法
  bird.jump();
  // 断言
  expect(bird.speed).toBe(-0.5);
});

// 测试wingTimer
test("测试 wingTimer", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  bird.show = jest.fn();
  jest.useFakeTimers(); // 开启时间模拟

  // 调用被测试方法
  bird.wingTimer.start(); // 启动计时器
  jest.advanceTimersByTime(100); // 时间推进 100ms

  // 断言
  expect(bird.wingIndex).toBe(1);
  expect(bird.show).toHaveBeenCalled();

  // 清理测试环境
  bird.wingTimer.stop(); // 停止计时器
  expect(bird.wingIndex).toBe(1);
  jest.useRealTimers(); // 关闭时间模拟
});

// 测试 dropTimer
test("测试 dropTimer", () => {
  // 准备测试数据
  const game = new Game();
  const bird = new Bird(game);
  const mockDom = {
    style: {
      top: "",
    },
  };
  bird.dom = mockDom as HTMLElement;
  bird.top = 150;
  bird.show = jest.fn();
  jest.useFakeTimers(); // 开启时间模拟

  // 调用被测试方法
  bird.dropTimer.start(); // 启动计时器
  jest.advanceTimersByTime(16); // 时间推进 16ms

  // 断言
  expect(bird.top).not.toBe(150);
  expect(bird.speed).not.toBe(0);
  expect(bird.show).toHaveBeenCalled();

  // 清理测试环境
  bird.dropTimer.stop(); // 停止计时器
  jest.useRealTimers(); // 关闭时间模拟
});
```

上面的代码是一个针对游戏中的小鸟对象 *Bird* 的单元测试代码。*Bird* 是游戏的主要角色之一，代码中测试了 *Bird* 的 *show* 方法、*setTop* 方法、*jump* 方法以及 *Bird* 内部的两个计时器 *wingTimer* 和 *dropTimer*。

在这段代码中，首先使用了 *Jest* 的 *mock* 方法来模拟 *Game* 类，以便在测试 *Bird* 类时，可以不用真正的创建 *Game* 对象。然后通过 *Jest* 的 *test* 函数来对 *Bird* 类的各个方法进行测试。测试过程中，通过准备测试数据，调用被测试方法，然后使用 *Jest* 提供的 *expect* 断言来验证被测试方法的行为是否符合预期。

具体来说，在测试 *show* 方法时，通过设置 *Bird* 对象的属性和模拟一个 *DOM* 元素，来测试 *Bird* 对象在调用 *show* 方法时是否正确更新了 *DOM* 元素的 *top* 和 *backgroundPosition* 属性。在测试 *setTop* 方法时，主要测试了 *Bird* 对象在设置 *top* 属性时，是否对设置的值进行了边界判断，防止小鸟飞出游戏屏幕。在测试 *jump* 方法时，测试了 *Bird* 对象在调用 *jump* 方法时，是否正确改变了 *speed* 属性。在测试 *wingTimer* 和 *dropTimer* 时，则主要测试了 *Bird* 对象内部的计时器功能是否正常，例如启动计时器、时间推进后计时器是否按照预期执行，并且是否正确调用了 *show* 方法。

总的来说，这段代码通过单元测试的方式，保证了 *Bird* 类在游戏中的各个行为都符合预期，提高了游戏代码的质量和可靠性。

## 总结

本小节作为一个综合练习，我们将平时开发常用的 *ts、webpack、jest* 全部融入进去了，大家可以学习到一个项目从零开始搭建到最后项目测试的全部过程。

整个项目下来，大家能够收获如下的知识点：

- 了解如何从零搭建一个基于 *webpack、ts* 的项目
- 如何针对项目书写单元测试用例
- 针对项目中哪些单元需要做测试

---

-*EOF*-