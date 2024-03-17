<template>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <SearchComp />
            </div>
            <div class="col-md-3 d-none d-sm-block right">
                <QuestionsComp />
                <WordsComp />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    text-align: center;
    border: none;
    cursor: pointer;
    flex-direction: row;
    justify-content: flex-start;
    
    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
    }

    .card-header, .card-footer {
        background-color: transparent;
        border: none;
        margin: 10px;
    }

    .card-header, .card-footer span, .card-footer a {
        font-size: 12px; 
    }
    
    h2 {
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 500;
        font-style: normal;
        margin: 30px 0;
    }

    .right {
        background-color: red;
        width: 100%;
        height: 150px;

        h2 {
            margin-top: 40px;
        }
    }

    .left {
        position: relative;
        background-color: #323132;
        padding: 10px;
        color: #fff;
        max-width: 300px;
        min-height: 150px;
    }

    .left:after {
        content: '';
        position: absolute;
        right: 0;
        top: 55%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-left-color: #323132;
        border-right: 0;
        border-top: 0;
        margin-top: -10px;
        margin-right: -20px;
    } 
}
</style>

<style>
.right {
    > div, > a > div {
        margin-bottom:  15px;
    }
}
</style>