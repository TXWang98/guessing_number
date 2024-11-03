class ContentGenerator {
    constructor(content) {
        this.content = content; // 保存内容到类实例中
        this.random_number = this.generateUniqueFourDigitNumber()
        console.log("嘻嘻，number is", this.random_number)
        this.guessright = false;
        this.dynamicid = 0
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
    calling_prompt(){
        guessing_number_thisturn = document.getElementById("inputguessing" + String(generator.dynamicid)).value
        string_random_number = String(this.random_number)
        string_guessing_number = String(guessing_number_thisturn)
        lis_random_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        lis_guessing_number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        cnt_complete_correct = 0
        cnt_correct = 0
        for(let i = 0; i < 4; ++i){
            lis_random_number[string_random_number[i]] += 1
            lis_guessing_number[string_guessing_number[i]] += 1
            if (string_random_number[i] == string_guessing_number[i]){
                cnt_complete_correct += 1
            }
        }
        for(let j = 0; j < 10; ++j){
            if (lis_guessing_number[j] < lis_random_number[j]){
                cnt_correct += lis_guessing_number[j]
            }
            else{
                cnt_correct += lis_random_number[j]
            }
        }
        const reactstr = 'reactstr' + String(generator.dynamicid)
        if (cnt_complete_correct == 4){
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div style="background-color: lightblue; padding: 10px; margin-top: 5px;">
                    <label for="${reactstr}" >"Congratulations! You guessed right!!!"</label>
                </div>
                `
            guessing_interaction.appendChild(newDiv.firstElementChild)
            this.guessright = true
        }
        else{
            half_correct = cnt_correct - cnt_complete_correct
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div style="background-color: lightblue; padding: 10px; margin-top: 5px;">
                    <label for="${reactstr}" >"${cnt_complete_correct} correct in both number and postion, ${half_correct} only in number"</label>
                </div>
                `
            guessing_interaction.appendChild(newDiv.firstElementChild)
            this.guessright = false
        }
    }
    
}


const content = `
    <p>Try try this!</p>
    `;
generator = new ContentGenerator(content)
generator.render('app'); // 调用实例的方法，渲染内容到id为'app'的元素中
const guessing_interaction = document.getElementById('guessing')
console.log("loading guessing")
/*
while (generator.guessright == false){
    generator.dynamicid += 1
    const inputstr = "inputguessing" + String(generator.dynamicid)
    const sumbitstr = 'submit' + String(generator.dynamicid)
    
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <div style="background-color: lightblue; padding: 10px; margin-top: 5px;">
            <label for="${inputstr}" >Please input your guessing: </label>
            <input type="number" id="${inputstr}">
            <button id="${sumbitstr}">Submit</button>    
        </div>
        `
    guessing_interaction.appendChild(newDiv.firstElementChild)
    document.getElementById(sumbitstr).addEventListener('click', generator.calling_prompt)
}
*/




/*
document.addEventListener('DOMContentLoaded', () => {

    const generator = new ContentGenerator(content); // 创建类的实例
    generator.render('app'); // 调用实例的方法，渲染内容到id为'app'的元素中
    console.log(generator)
});
*/
