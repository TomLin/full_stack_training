<script setup>
import { onMounted } from 'vue'

onMounted(() => { })
</script>

<template>
  <div class="pt-5 pb-9">
    <section class="py-0">
      <div class="container-small">
        <nav class="mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink :to="{ name: 'home' }">購物商城</RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink :to="{ name: 'product-shop' }">購物商城</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">商品</li>
          </ol>
        </nav>
        <div class="row g-5 mb-5 mb-lg-8" data-product-details="data-product-details">
          <div class="col-12 col-lg-6">
            <div class="row g-3 mb-3">
              <div class="col-12">
                <div class="d-flex align-items-center border border-translucent rounded-3 text-center p-5 h-100">
                  <img class="img-fluid" src="../../assets/img/products/1.png" alt="" />
                </div>
              </div>
            </div>
            <div class="d-flex">
              <button class="btn btn-lg btn-warning rounded-pill w-100 fs-9 fs-sm-8">
                <span class="fas fa-shopping-cart me-2"></span>
                加入購物車
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="d-flex flex-column justify-content-between h-100">
              <div class="mb-4">
                <div class="d-flex flex-wrap">
                  <div class="me-2">
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                  </div>
                </div>
                <h3 class="mb-4 lh-sm">
                  24" iMac® with Retina 4.5K display - Apple M1 8GB Memory - 256GB SSD - w/Touch ID
                  (Latest Model) - Blue
                </h3>
                <div class="d-flex flex-wrap align-items-center">
                  <h1 class="me-3">$1349</h1>
                  <p class="text-body-quaternary text-decoration-line-through fs-6 mb-0 me-3">
                    $1499
                  </p>
                  <p class="text-warning fw-bolder fs-6 mb-0">特價中</p>
                </div>
              </div>
              <div class="row g-3 g-sm-5 align-items-end">
                <div class="col-12 col-sm">
                  <p class="fw-semibold mb-2 text-body">數量 :</p>
                  <div class="d-flex justify-content-between align-items-end">
                    <div class="d-flex flex-between-center" data-quantity="data-quantity">
                      <button class="btn btn-phoenix-primary px-3" data-type="minus">
                        <span class="fas fa-minus"></span>
                      </button>
                      <input class="form-control text-center input-spin-none bg-transparent border-0 outline-none"
                        style="width: 50px" type="number" min="1" value="1" />
                      <button class="btn btn-phoenix-primary px-3" data-type="plus">
                        <span class="fas fa-plus"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-0">
      <div class="container-small">
        <h3 class="mb-0 fw-bold mb-4">商品描述</h3>
        <p class="mb-5">
          CUPERTINO, CA , The M1 CPU allows Apple to deliver an all-new iMac with a lot more compact
          and impressively thin design. The new iMac delivers tremendous performance in an
          11.5-millimeter-thin design with a stunning side profile that almost vanishes. iMac
          includes a 24-inch 4.5K Retina display with 11.3 million pixels, 500 nits of brightness,
          and over a billion colors, giving a beautiful and vivid viewing experience. It is
          available in a variety of striking colors to match a user's own style and brighten any
          area. A 1080p FaceTime HD camera, studio-quality mics, and a six-speaker sound system are
          all included in the new iMac, making it the greatest camera and audio system ever in a
          Mac. Touch ID is also making its debut on the iMac, making it easier than ever to securely
          log in, make Apple Pay transactions, and switch user accounts with the touch of a finger.
          Apps launch at lightning speed, everyday chores seem astonishingly fast and fluid, and
          demanding workloads like editing 4K video and working with large photos are faster than
          ever before thanks to the power and performance of M1 and macOS Big Sur.
        </p>
      </div>
    </section>
  </div>
</template>
