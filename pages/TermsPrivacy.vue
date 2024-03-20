<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card mt-5">
                    <h5 class="card-title p-3">
                        {{ $t('TermsPrivacy') }}
                    </h5>
                    <div class="card-body">
                        <figure>
                            <blockquote class="blockquote">
                                <p>{{ $t('Terms') }}</p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                Someone famous in
                            </figcaption>

                            <blockquote class="blockquote">
                                <p>{{ $t('Privacy') }}</p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                Someone famous in
                            </figcaption>
                        </figure> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    border: solid 1px #555;
    background-color: transparent;
    color: #fff;

    .card-title {
        border-bottom: solid 1px #555;
    }
}
</style>