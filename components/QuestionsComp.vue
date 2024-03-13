<template>
    <div class="card">
        <div class="top">
            <span class="card-header">{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
            <h2>{{ data.from }}<i class="fa-solid fa-volume-high"></i></h2>
        </div>
        <div class="bottom">
            <div class="question">
                <div class="form-check" v-for="(item, index) in data.options ">
                    <input class="form-check-input" type="radio" name="flexRadioDefault">
                    <label class="form-check-label">{{ item.question }}</label>
                </div>
            </div>
            <a>* {{ $t('ShowAnswer') }}</a>
            <button type="button" class="btn btn-sm btn-warning float-end">{{ $t('Submit') }}</button>
        </div>
        <span class="card-footer">{{ $t('Accuracy') }}: {{ data.accuracy }}</span>
    </div>
</template>

<script>
export default {
    props: { 
        data: {
            type: Object,
            require: true
        }
    }, setup(props) {
        onMounted(() => {
            //console.log(props.data)
        });
    }
}
</script>

<style scoped>
.card {
    text-align: center;
    border: solid 1px #ccc;
    background-color: #fff;
    min-height: 320px;

    .fa-volume-high {
        margin-left: 5px;
        font-size: 13px;
        vertical-align: middle;
    }

    .card-header, .card-footer {
        background-color: transparent;
        border: none;
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

    .bottom {
        padding: 10px;
        height: 150px;

        .question {
            border-bottom: solid 1px #eee;
            padding: 10px;
            margin-bottom: 10px;
       

            .form-check {
                text-align: left;
                display: flex;
                align-items: center;

                .form-check-input {
                    margin-right: 10px;
                    cursor: pointer;
                }
            } 
        }

        a {
            color: red;
            float: left;
            font-size: 12px;
            margin-top: 10px;
        }
    }

    .top {
        position: relative;
        background-color: #eee;
        padding: 10px;
        min-height: 150px;
    }

    .top:after {
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