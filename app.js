document.addEventListener('DOMContentLoaded', () => {
    class ContentGenerator {
        constructor(content) {
            this.content = content;
            this.random_number = this.generateUniqueFourDigitNumber();
            this.guessright = false;
            this.dynamicid = 0;
        }

        render(elementId) {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = this.content;
            } else {
                console.error(`Element with id '${elementId}' not found.`);
            }
        }

        generateUniqueFourDigitNumber() {
            const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = digits.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [digits[i], digits[j]] = [digits[j], digits[i]];
            }
            const uniqueNumber = digits.slice(0, 4).join('');
            return parseInt(uniqueNumber, 10);
        }

        calling_prompt(inputstr, sumbitstr) {
            const guessing_number_thisturn = document.getElementById(inputstr).value;
            const string_random_number = String(this.random_number);
            const string_guessing_number = String(guessing_number_thisturn);
            const lis_random_number = new Array(10).fill(0);
            const lis_guessing_number = new Array(10).fill(0);
            let cnt_complete_correct = 0;
            let cnt_correct = 0;

            // 计算正确的数字和位置
            for (let i = 0; i < 4; ++i) {
                lis_random_number[string_random_number[i]]++;
                lis_guessing_number[string_guessing_number[i]]++;
                if (string_random_number[i] === string_guessing_number[i]) {
                    cnt_complete_correct++;
                }
            }

            // 计算正确数字的数量
            for (let j = 0; j < 10; ++j) {
                if (lis_guessing_number[j] < lis_random_number[j]) {
                    cnt_correct += lis_guessing_number[j];
                } else {
                    cnt_correct += lis_random_number[j];
                }
            }

            // 提示用户
            const reactstr = 'reactstr' + String(this.dynamicid);
            let feedback = '';
            if (cnt_complete_correct === 4) {
                feedback = `"Congratulations! You guessed right!!!"`;
                this.guessright = true; // 用户猜对了
            } else {
                const half_correct = cnt_correct - cnt_complete_correct;
                feedback = `"${cnt_complete_correct} correct in both number and position, ${half_correct} only in number"`;
            }
            this.displayFeedback(feedback);
        }

        displayFeedback(feedback) {
            const guessing_interaction = document.getElementById('guessing');
            let newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div style="background-color: lightblue; padding: 10px; margin-top: 5px;">
                    <label>${feedback}</label>
                </div>
            `;
            guessing_interaction.appendChild(newDiv.firstElementChild);
            this.createInputField();
        }

        createInputField() {
            this.dynamicid++;
            const inputstr = "inputguessing" + String(this.dynamicid);
            const sumbitstr = 'submit' + String(this.dynamicid);

            let newDiv = document.createElement('div');
            newDiv.innerHTML = `
                <div style="background-color: lightblue; padding: 10px; margin-top: 5px;">
                    <label for="${inputstr}">Please input your guessing: </label>
                    <input type="number" id="${inputstr}">
                    <button id="${sumbitstr}">Submit</button>    
                </div>
            `;
            const guessing_interaction = document.getElementById('guessing');
            guessing_interaction.appendChild(newDiv.firstElementChild);

            // 事件监听器
            document.getElementById(sumbitstr).addEventListener('click', () => {
                this.calling_prompt(inputstr, sumbitstr);
            });
        }
    }

    const content = `<p>Try try this!</p>`;
    const generator = new ContentGenerator(content);
    generator.render('app');

    // 初始化第一个输入框
    generator.createInputField();
});
