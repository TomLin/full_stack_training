<script setup>
import { onMounted } from 'vue'

onMounted(() => { })
</script>

<template>
  <div class="row flex-center mb-15 mt-11 gy-6 gx-0">
    <div class="col-auto">
      <img class="d-dark-none" src="../assets/img/spot-illustrations/light_30.png" alt="" width="305" />
      <img class="d-light-none" src="../assets/img/spot-illustrations/dark_30.png" alt="" width="305" />
    </div>
    <div class="col-auto">
      <div class="text-center text-lg-start">
        <h3 class="text-body-highlight mb-2"><span class="fw-semibold">歡迎來到柑仔電</span></h3>
        <h1 class="display-3 mb-4">
          趕快
          <span class="text-primary fw-bolder">成為會員</span>
          吧!
        </h1>
        <!-- <a class="btn btn-lg btn-primary px-7" href="/pages/authentication/simple/sign-up.html">
          註冊
          <svg class="svg-inline--fa fa-chevron-right fs-9 ms-2" aria-hidden="true" focusable="false" data-prefix="fas"
            data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
            data-fa-i2svg="">
            <path fill="currentColor"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z">
            </path>
          </svg>
        </a> -->
      </div>
    </div>
  </div>
</template>
