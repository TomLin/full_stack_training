<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  initializeOffcanvas()
})
</script>

<template>
  <section class="py-5">
    <div class="product-filter-container">
      <button class="btn btn-sm btn-phoenix-secondary text-body-tertiary mb-5 d-lg-none" data-phoenix-toggle="offcanvas"
        data-phoenix-target="#productFilterColumn">
        <span class="fa-solid fa-filter me-2"></span>
        Filter
      </button>

      <div class="row">
        <div class="col-lg-3 col-xxl-2 ps-2 ps-xxl-3">
          <div class="phoenix-offcanvas-filter bg-body scrollbar phoenix-offcanvas phoenix-offcanvas-fixed"
            id="productFilterColumn" style="top: 112px" data-breakpoint="lg">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="fw-bold mb-3 pt-1">篩選</h3>
              <button class="btn d-lg-none p-0 mb-2" data-phoenix-dismiss="offcanvas">
                <span class="uil uil-times fs-8"></span>
              </button>
            </div>

            <!-- 搜尋 -->
            <div class="search-box ecommerce-search-box w-100 mb-3">
              <form class="position-relative">
                <input class="form-control search-input search form-control-sm" type="search" placeholder="搜尋"
                  aria-label="Search" />
                <span class="fas fa-search search-box-icon"></span>
              </form>
            </div>

            <a class="btn px-0 d-block collapse-indicator" data-bs-toggle="collapse" href="#collapseAvailability"
              role="button" aria-expanded="true" aria-controls="collapseAvailability">
              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="fs-8 text-body-highlight">分類</div>
                <span class="fa-solid fa-angle-down toggle-icon text-body-quaternary"></span>
              </div>
            </a>
            <div class="collapse show" id="collapseAvailability">
              <div class="mb-2">
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="inStockInput" type="checkbox" name="color" checked />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="inStockInput">
                    In stock
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="preBookInput" type="checkbox" name="color" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="preBookInput">
                    Pre-book
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="outOfStockInput" type="checkbox" name="color" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="outOfStockInput">
                    Out of stock
                  </label>
                </div>
              </div>
            </div>

            <a class="btn px-0 d-block collapse-indicator" data-bs-toggle="collapse" href="#collapseBrands"
              role="button" aria-expanded="true" aria-controls="collapseBrands">
              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="fs-8 text-body-highlight">Brands</div>
                <span class="fa-solid fa-angle-down toggle-icon text-body-quaternary"></span>
              </div>
            </a>
            <div class="collapse show" id="collapseBrands">
              <div class="mb-2">
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="flexCheckBlackberry" type="checkbox" name="brands" checked />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="flexCheckBlackberry">
                    Blackberry
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="flexCheckApple" type="checkbox" name="brands" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="flexCheckApple">
                    Apple
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="flexCheckNokia" type="checkbox" name="brands" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="flexCheckNokia">
                    Nokia
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="flexCheckSony" type="checkbox" name="brands" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body fw-normal mb-0" for="flexCheckSony">
                    Sony
                  </label>
                </div>
                <div class="form-check mb-0">
                  <input class="form-check-input mt-0" id="flexCheckLG" type="checkbox" name="brands" />
                  <label class="form-check-label d-block lh-sm fs-8 text-body mb-0 fw-normal" for="flexCheckLG">
                    LG
                  </label>
                </div>
              </div>
            </div>

            <a class="btn px-0 d-block collapse-indicator" data-bs-toggle="collapse" href="#collapsePriceRange"
              role="button" aria-expanded="true" aria-controls="collapsePriceRange">
              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="fs-8 text-body-highlight">價格區間</div>
                <span class="fa-solid fa-angle-down toggle-icon text-body-quaternary"></span>
              </div>
            </a>

            <div class="collapse show" id="collapsePriceRange">
              <div class="d-flex justify-content-between mb-3">
                <div class="input-group me-2">
                  <input class="form-control" type="text" aria-label="First name" placeholder="Min" />
                  <input class="form-control" type="text" aria-label="Last name" placeholder="Max" />
                </div>
                <button class="btn btn-phoenix-primary px-3" type="button">Go</button>
              </div>
            </div>

            <a class="btn px-0 y-4 d-block collapse-indicator" data-bs-toggle="collapse" href="#collapseRating"
              role="button" aria-expanded="true" aria-controls="collapseRating">
              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="fs-8 text-body-highlight">評等</div>
                <span class="fa-solid fa-angle-down toggle-icon text-body-quaternary"></span>
              </div>
            </a>
            <div class="collapse show" id="collapseRating">
              <div class="d-flex align-items-center mb-1">
                <input class="form-check-input me-3" id="flexRadio1" type="radio" name="flexRadio" />
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
              </div>
              <div class="d-flex align-items-center mb-1">
                <input class="form-check-input me-3" id="flexRadio2" type="radio" name="flexRadio" />
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <p class="ms-1 mb-0">以上</p>
              </div>
              <div class="d-flex align-items-center mb-1">
                <input class="form-check-input me-3" id="flexRadio3" type="radio" name="flexRadio" />
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <p class="ms-1 mb-0">以上</p>
              </div>
              <div class="d-flex align-items-center mb-1">
                <input class="form-check-input me-3" id="flexRadio4" type="radio" name="flexRadio" />
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <p class="ms-1 mb-0">以上</p>
              </div>
              <div class="d-flex align-items-center mb-3">
                <input class="form-check-input me-3" id="flexRadio5" type="radio" name="flexRadio" />
                <span class="fa fa-star text-warning fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <span class="fa-regular fa-star text-warning-light fs-9 me-1"></span>
                <p class="ms-1 mb-0">以上</p>
              </div>
            </div>
          </div>
          <div class="phoenix-offcanvas-backdrop d-lg-none" data-phoenix-backdrop style="top: 112px"></div>
        </div>

        <div class="col-lg-9 col-xxl-10">
          <div class="row gx-3 gy-6 mb-8">
            <!-- 產品清單 -->
            <div class="col-12 col-sm-6 col-md-4 col-xxl-2">
              <div class="product-card-container h-100">
                <div class="position-relative text-decoration-none product-card h-100">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                      <div class="border border-1 rounded-3 position-relative mb-3">
                        <button class="btn btn-wish btn-wish-primary z-2">
                          <span class="fas fa-shopping-cart"></span>
                        </button>
                        <img class="img-fluid" src="../../assets/img/products/1.png" alt="" />
                      </div>
                      <RouterLink class="stretched-link" :to="{ name: 'product-detail', params: { id: 6 } }">
                        <h6 class="mb-2 lh-sm line-clamp-3 product-name">
                          PlayStation 5 DualSense Wireless Controller
                        </h6>
                      </RouterLink>
                      <p class="fs-9">
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                      </p>
                    </div>
                    <div>
                      <div class="d-flex align-items-center mb-1">
                        <p class="me-2 text-body text-decoration-line-through mb-0">$125</p>
                        <h3 class="text-body-emphasis mb-0">$89</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 手動初始化 offcanvas 功能 - 請勿改動此處程式碼

const initializeOffcanvas = () => {
  const { getData } = window.phoenix.utils
  const toggleEls = document.querySelectorAll("[data-phoenix-toggle='offcanvas']")
  const offcanvasBackdrops = document.querySelectorAll('[data-phoenix-backdrop]')
  const offcanvasBodyScroll = document.querySelector('[data-phoenix-scroll]')
  const offcanvases = document.querySelectorAll('.phoenix-offcanvas')
  const offcanvasFaq = document.querySelector('.faq')
  const offcanvasFaqShow = document.querySelector('.faq-sidebar')

  if (offcanvases) {
    const breakpoints = {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1540,
    }

    window.addEventListener('resize', () => {
      offcanvases.forEach(offcanvas => {
        const offcanvasInstance = new window.bootstrap.Offcanvas(offcanvas)
        const breakpoint = offcanvas.getAttribute('data-breakpoint')
        const breakpointValue = breakpoints[breakpoint]
        if (window.innerWidth >= breakpointValue) {
          document.body.style.overflow = ''
          offcanvasInstance.hide()
        }
      })
    })
  }

  const showFilterCol = offcanvasEl => {
    offcanvasEl.classList.add('show')
    if (!offcanvasBodyScroll) {
      document.body.style.overflow = 'hidden'
    }
  }
  const hideFilterCol = offcanvasEl => {
    offcanvasEl.classList.remove('show')
    document.body.style.removeProperty('overflow')
  }

  if (toggleEls) {
    toggleEls.forEach(toggleEl => {
      const offcanvasTarget = getData(toggleEl, 'phoenix-target')
      const offcanvasTargetEl = document.querySelector(offcanvasTarget)
      const closeBtn = offcanvasTargetEl.querySelectorAll("[data-phoenix-dismiss='offcanvas']")
      toggleEl.addEventListener('click', () => {
        showFilterCol(offcanvasTargetEl)
      })
      if (closeBtn) {
        closeBtn.forEach(el => {
          el.addEventListener('click', () => {
            hideFilterCol(offcanvasTargetEl)
          })
        })
      }
      if (offcanvasBackdrops) {
        offcanvasBackdrops.forEach(offcanvasBackdrop => {
          offcanvasBackdrop.addEventListener('click', () => {
            hideFilterCol(offcanvasTargetEl)
          })
        })
      }
    })
  }

  if (offcanvasFaq) {
    if (offcanvasFaqShow.classList.contains('show')) {
      offcanvasFaq.classList.add = 'newFaq'
    }
  }
}
</script>
