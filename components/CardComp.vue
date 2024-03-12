<template>
    <div class="col">
        <div class="card">
            <div class="card-header">
                <h5>watch</h5>
                <i class="fa-solid fa-volume-high"></i>
            </div>
            <div class="card-body">
                <h5>手錶</h5>
                <blockquote class="blockquote mt-5 mb-0">
                    <p><b>同義詞出現率:</b> 80%</p>
                    <p><b>回答正確率:</b> 20% (1/5)</p>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    max-width: 500px;

    .card-header {
        h5 {
            float: left;
        }

        .fa-volume-high {
            float: right;
            margin-top: 7px;
            cursor: pointer;
        }
    }
    
    .card-body {
        cursor: pointer;

        .blockquote {
            p, b {
                margin-bottom: 0;
                font-size: 11px;
                color: #777;
            }
        }
    }
}
</style>