<template>
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>

        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="carousel-caption">
                    <h1 class="display-4">Wordz</h1>
                    <i>Scientific Learning</i>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/carousel/1.jpg" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h1 class="display-4 text-white">Easy Memorization</h1>
                    <p class="text-white">經常出現的單字，您往往能夠輕易記住，已記住的單字，可以讓它們不再頻繁地出現在您的學習中</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/carousel/2.jpg" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h1 class="display-4">Prioritize Memorizing</h1>
                    <p class="text-danger">應該優先記憶常見出現率高的單字，至於不太常見現率低的單字，可以稍後再加以記憶</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/carousel/3.jpg" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h1 class="display-4 text-white">Related Words</h1>
                    <p class="text-white">當閱讀或參與對話時，若能掌握主要單字，便能更流暢地理解內容，並更快速地抓住核心思想</p>
                </div>
            </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<style scoped lang="scss">
#carousel {
    background-color: #ffffff;
    border-top: solid 1px #f4f4f4;
    border-bottom: solid 1px #f4f4f4;
    text-align: center;  
    margin-bottom: 15px;

    .carousel-indicators {
        button {
            background-color: #f2f2f2;
        }

        button:hover {
            box-shadow: none;
        }
    }

    .carousel-inner {
        text-align: center;

        .carousel-item {
            height: 400px;
            
            .carousel-caption {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #000;

                i {
                    color: #f42929
                }
            }

            img {
                min-height: 600px;;
            }
        }    
    }

    .carousel-control-prev, .carousel-control-next {
        box-shadow: none;
    }
}
</style>