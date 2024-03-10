<template>
  <div :id="template" class="modal fade bootstrap-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body-content"></slot>
        </div>
      </div>
    </div>
  </div>
  <slot name="toggle-btn"></slot>
</template>

<script>
export default {
  props: [
    'template',
    'title'
  ]
}
</script>

<style scoped lang="scss">
.modal {
  .btn-close {
    width: 10px;
    height: 10px;
    margin: 0;
    padding: 2px;
    border: none;
    box-shadow: none;
  }
  .modal-dialog { 
    display: table;
    margin: 0 auto;
    margin-top: 50px;
    width: 0;
  }
  .modal-contain {
    padding: 25px;	
  }

  body.modal-open {
    overflow: hidden;
    position:fixed;
    width: 100%;
  }
  .modal-title {
    font-size: 16px;
  }

  @media screen and (max-device-width: 480px){
    .modal-dialog {
      margin-top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>