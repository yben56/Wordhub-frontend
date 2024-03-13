<template>
    <div :class="{'card' : true, [data.class] : true}">
        <div class="top">
            <span class="card-header">{{ $t('SynonymsProbability')}}: {{ $t(data.probability)}}</span>
            <h2>{{ data.from }}<i class="fa-solid fa-volume-high"></i></h2>
        </div>
        <div class="bottom">
            <h2>{{ data.to }}<i class="fa-solid fa-volume-high"></i></h2>
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
    border: none;
    color: #fff;
    cursor: pointer;

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

    .bottom {
        height: 150px;

        h2 {
            margin-top: 40px;
        }
    }

    .top {
        position: relative;
        background-color: #323132;
        padding: 10px;
        color: #fff;
        min-height: 150px;
    }

    .top:after {
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

.noun { background-color: #ED1C24; }
.verb { background-color: #262261; }
.adj { background-color: #F7931D; }
</style>