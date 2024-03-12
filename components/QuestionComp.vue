<template>
    <div class="question">
        <div class="bubble">
            <span>同義出現率: 極高</span>
            <h2>Watch<i class="fa-solid fa-volume-high"></i></h2>
        </div>
        <div class="answer">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">時鐘</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">蛋糕</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">眼鏡</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">手表</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">不知道, 給我答案</label>
            </div>
        </div>
        <span>回答正確率: 1/5 (20%)</span>
    </div>
</template>

<style scoped>
.question {
    text-align: center;
    border: solid 1px #ccc;
    cursor: pointer;
    background-color: #fff;

    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
    }

    span {
        font-size: 12px;
        margin: 10px;
    }
    
    h2 {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 500;
        font-style: normal;
        margin: 30px 0;
    }

    > h2 {
        margin-top: 50px;
    }

    .answer {
        padding: 10px;

        .form-check {
            text-align: left;
            display: flex;
            align-items: center;

            .form-check-input {
                margin-right: 5px;
            }
        } 
    }

    .bubble {
        position: relative;
        background-color: #eee;
        padding: 10px;
    }

    .bubble:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 84%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top-color: #eee;
        border-bottom: 0;
        border-left: 0;
        margin-left: -15px;
        margin-bottom: -15px;
    } 
}
</style>