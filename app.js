class ContentGenerator {
    constructor(content) {
        this.content = content; // 保存内容到类实例中
        this.random_number = this.generateUniqueFourDigitNumber()
    }

    // 方法：将内容渲染到指定的HTML元素中
    render(elementId) {
        const container = document.getElementById(elementId); // 查找id对应的元素
        if (container) {
            container.innerHTML = this.content; // 将内容插入元素中
        } else {
            console.error(`Element with id '${elementId}' not found.`); // 如果找不到元素，输出错误
        }
    }

    generateUniqueFourDigitNumber() {
        // 创建一个包含数字 0-9 的数组
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        // 随机打乱数组顺序 (Fisher-Yates 洗牌算法)
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        
        // 取数组的前 4 个元素并组合成一个字符串
        const uniqueNumber = digits.slice(0, 4).join('');
        
        // 转换为数字类型并返回
        return parseInt(uniqueNumber, 10);
    }
    
}


const content = `
    <p>Try try this!</p>
    `;
generator = new ContentGenerator(content)
generator.render('app'); // 调用实例的方法，渲染内容到id为'app'的元素中
console.log(generator.random_number)

/*
document.addEventListener('DOMContentLoaded', () => {

    const generator = new ContentGenerator(content); // 创建类的实例
    generator.render('app'); // 调用实例的方法，渲染内容到id为'app'的元素中
    console.log(generator)
});
*/