## 作用域

1. what
2. why
3. how

---

1. 我们将“作用域”定义为一套规则，这套规则用来管理引擎如何在当前作用
域以及嵌套的子作用域中根据标识符名称进行变量查

2. 如果没有标识状态的变量，程序将将只能执行一些简单的操作，所以程序需要变量，而变量的存储和使用需要有一定的规则，所以作用域就是关于变量存储和使用的规则
3. 存储使用规则
      - 存储
         * 编译过程声明存储空间
         * 引擎执行过程中通过使用LHS存储值到存储空间
      - 使用
         * 引擎通过使用RHS（retrieve his source value） 
4. 作用域嵌套
    当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止。

5. 作用域的分类
    1. 词法作用域
        * 词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的)
        * 欺骗词法作用域(改变词法作用域的方式)
        * eval()可以执行字符串参数，字符串参数可以动态生成
        * setTimeout(..) 和setInterval(..) 的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的函数代码
        * new Function(..) 函数的行为也很类似，最后一个参数可以接受代码字符串，并将其转化为动态生成的函数（前面的参数是这个新生成的函数的形参）
        * with  它如何同被它所影响的词法作用域进行交互。with 通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。with 声明实际上是根据你传递给它的对象凭空创建了一个全新的词法作用域,在严格模式下完全禁止
        * 这种eval和with在运行时改变词法作用域的行为，导致编译期间无法进行静态的词法分析进行优化
        * 词法作用域分类
            - 函数作用域
                - 函数执行时才生的作用域，执行完毕函数时函数作用会被垃圾回收站回收
                - 使用方式
                  - 隐藏内部实现=>减少冲突，但是依然有缺点
                  - 规避冲突
                    - 全局命名空间
                    - 模块化
                - 函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在
                    >第一个片段中foo 被绑定在所在作用域中，可以直接通过foo() 来调用它。第二个片段中foo 被绑定在函数表达式自身的函数中而不是所在作用域中
                - 匿名函数与具名函数
                    -  匿名函数在栈追踪中不会显示出有意义的函数名
                    -  没有函数名无法调用自身，特别是arguments.callee引用被废止
                    -  不便于理解和阅读
                - 立即执行函数 IIF
                    - IIFE:中函数表达式被包含在( ) 中，然后在后面用另一个() 括号来调用
                        ```
                        (function IIFE( global ) {
                            var a = 3;
                            console.log( a ); // 3
                            console.log( global.a ); // 2
                            })( window );
                        ``` 
                    - 第二种用来调用的() 括号被移进了用来包装的( ) 括号中。
                        ```
                            (function(){ .. }())。
                        ``` 
                    - 应用场景
                      - 传递参数
                      - 解决undefinded标识符的默认值被错误覆盖
                        ```
                            (function IIFE( undefined ) {
                                var a;
                                if (a === undefined) {
                                console.log( "Undefined is safe here!" );
                                }
                            })();
                        ```
                      - 倒置代码的运行顺序
                        ```
                            (function IIFE( def ) {
                                def( window );
                            })(function def( global ) {
                                var a = 3;
                                console.log( a ); // 3
                                console.log( global.a ); // 2
                            });
                        ```   
            - 块级作用域
                -  
    2. 动态作用域
