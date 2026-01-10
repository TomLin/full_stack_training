<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="main" id="top">
    <section class="py-2">
      <div class="container-small">
        <div class="ecommerce-topbar">
          <nav class="navbar navbar-expand-lg navbar-light px-0">
            <div class="row gx-0 gy-2 w-100 flex-between-center">
              <div class="col-auto">
                <a class="text-decoration-none" href="/">
                  <div class="d-flex align-items-center">
                    <img src="../assets/img/icons/tangerine.png" alt="我的柑仔電" width="35" />
                    <h5 class="logo-text ms-2">我的柑仔電</h5>
                  </div>
                </a>
              </div>
              <div class="col-auto order-md-1">
                <ul class="navbar-nav navbar-nav-icons flex-row me-n2">
                  <!--會員-->
                  <li class="nav-item dropdown">
                    <a class="nav-link px-2" id="navbarDropdownUser" href="#" role="button" data-bs-toggle="dropdown"
                      data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                      <i class="far fa-user-circle"></i>
                      會員中心
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border mt-2"
                      aria-labelledby="navbarDropdownUser">
                      <div class="card position-relative border-0">
                        <div class="card-body p-0">
                          <div class="text-center pt-4 pb-3">
                            <div class="avatar avatar-xl">
                              <img class="rounded-circle" src="../assets/img/icons/user.png" alt="" />
                            </div>
                            <h6 class="mt-2 text-body-emphasis">我是會員</h6>
                          </div>
                        </div>
                        <div class="overflow-auto scrollbar">
                          <ul class="nav d-flex flex-column mb-2 pb-1">
                            <li class="nav-item">
                              <a class="nav-link px-3 d-block" href="#!">
                                <span class="me-2 text-body align-bottom" data-feather="user"></span>
                                <span>個人資料</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="card-footer p-0 border-top border-translucent">
                          <div class="px-3 py-2">
                            <a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!">
                              <span class="me-2" data-feather="log-out"></span>
                              登出
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>

    <nav class="navbar-responsive-navitems navbar-expand navbar-light bg-body-emphasis justify-content-between">
      <div class="container-small d-flex flex-between-center" data-navbar="data-navbar">
        <ul class="navbar-nav justify-content-end align-items-center py-2">
          <li class="nav-item" data-nav-item="data-nav-item">
            <RouterLink class="nav-link" :to="{ name: 'home' }">首頁</RouterLink>
          </li>
          <!--購物商城-->

          <!--購物車-->

          <!--我的訂單-->

          <!--商品管理(管理員)-->

        </ul>
      </div>
    </nav>

    <RouterView />

    <section class="bg-body-highlight dark__bg-gray-1100 py-9">
      <div class="container-small">
        <div class="row justify-content-between gy-4">
          <div class="col-12 col-lg-4">
            <div class="d-flex align-items-center mb-3">
              <img src="../assets/img/icons/logo.png" alt="phoenix" width="27" />
              <h5 class="logo-text ms-2">phoenix</h5>
            </div>
            <p class="text-body-tertiary mb-1 lh-sm fs-9">
              Phoenix
              是一個具有迷人功能和令人驚嘆佈局的管理儀表板模板。該模板對所有主流瀏覽器都具備響應式設計，並且兼容所有設備和螢幕尺寸。如果需要營利或開發，請自行至該網站購買授權。
            </p>
            <a target="_blank" href="https://themewagon.com/themes/phoenix-admin-dashboard-webapp-template/">
              https://themewagon.com/themes/phoenix-admin-dashboard-webapp-template/
            </a>
          </div>
          <div class="col-6 col-md-auto">
            <h5 class="fw-bolder mb-3">關於 Phoenix</h5>
            <div class="d-flex flex-column">
              <a class="text-body-tertiary fs-9 mb-1" href="#!">招募人才</a>
              <a class="text-body-tertiary fs-9 mb-1" href="#!">聯盟計畫</a>
              <a class="text-body-tertiary fs-9 mb-1" href="#!">隱私政策</a>
              <a class="text-body-tertiary fs-9 mb-1" href="#!">條款與條件</a>
            </div>
          </div>
          <div class="col-6 col-md-auto">
            <h5 class="fw-bolder mb-3">保持聯繫</h5>
            <div class="d-flex flex-column">
              <a class="text-body-tertiary fs-9 mb-1" href="#!">部落格</a>
              <a class="mb-1 fs-9 d-flex" href="#!">
                <span class="fab fa-facebook-square text-primary me-2 fs-8"></span>
                <span class="text-body-secondary">Facebook 臉書</span>
              </a>
              <a class="mb-1 fs-9 d-flex" href="#!">
                <span class="fab fa-twitter-square text-info me-2 fs-8"></span>
                <span class="text-body-secondary">Twitter 推特</span>
              </a>
            </div>
          </div>
          <div class="col-6 col-md-auto">
            <h5 class="fw-bolder mb-3">客服服務</h5>
            <div class="d-flex flex-column">
              <a class="text-body-tertiary fs-9 mb-1" href="#!">客服中心</a>
              <a class="text-body-tertiary fs-9 mb-1" href="#!">24/7 支援</a>
              <a class="text-body-tertiary fs-9 mb-1" href="#!">Phoenix 社群</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer position-relative">
      <div class="row g-0 justify-content-between align-items-center h-100">
        <div class="col-12 col-sm-auto text-center">
          <p class="mb-0 mt-2 mt-sm-0 text-body">
            Thank you for creating with Phoenix
            <span class="d-none d-sm-inline-block"></span>
            <span class="d-none d-sm-inline-block mx-1">|</span>
            <br class="d-sm-none" />
            2025 &copy;
            <a class="mx-1" href="https://themewagon.com">Themewagon</a>
          </p>
        </div>
        <div class="col-12 col-sm-auto text-center">
          <p class="mb-0 text-body-tertiary text-opacity-85">v1.23.0</p>
        </div>
      </div>
    </footer>
  </main>
</template>
