<template>
    <div class="card">
        <div class="bubble">
            <span>同義出現率: 極高</span>
            <h2>Watch<i class="fa-solid fa-volume-high"></i></h2>
        </div>
        <h2>手錶<i class="fa-solid fa-volume-high"></i></h2>
        <span>回答正確率: 1/5 (20%)</span>
    </div>
</template>

<style scoped>
.card {
    text-align: center;
    background-color: #ED1C24;
    border: none;
    color: #fff;
    cursor: pointer;

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

    .bubble {
        position: relative;
        background-color: #323132;
        padding: 10px;
        color: #fff; 
    }

    .bubble:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-top-color: #323132;
        border-bottom: 0;
        margin-left: -15px;
        margin-bottom: -13px;
    } 
}
</style>