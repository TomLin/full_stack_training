<script setup>
import { onMounted } from 'vue'

onMounted(() => { })
</script>

<template>
  <section class="py-5">
    <div class="container-small cart">
      <h3 class="fw-bold mb-6">我的購物車</h3>

      <div class="row g-5">
        <div class="col-12 col-lg-8">
          <div id="cartTable">
            <div class="table-responsive scrollbar mx-n1 px-1">
              <table class="table fs-9 mb-0 border-top border-translucent">
                <thead>
                  <tr>
                    <th class="white-space-nowrap align-middle fs-10"></th>
                    <th class="white-space-nowrap align-middle" style="min-width: 300px">
                      產品名稱
                    </th>
                    <th class="align-middle text-end" style="width: 100px">價格</th>
                    <th class="align-middle text-center" style="width: 100px">數量</th>
                    <th class="align-middle text-end" style="width: 100px">總計</th>
                    <th class="align-middle text-center pe-0">刪除</th>
                  </tr>
                </thead>
                <tbody class="list" id="cart-table-body">
                  <tr class="cart-table-row btn-reveal-trigger">
                    <td class="align-middle white-space-nowrap py-0">
                      <a class="d-block border border-translucent rounded-2" href="#">
                        <img src="../../assets/img/products/1.png" alt="" width="53" />
                      </a>
                    </td>
                    <td class="products align-middle">
                      <a class="fw-semibold mb-0 line-clamp-2" href="#">
                        Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress
                        Management &amp; Skin Temperature Trends, Carbon/Graphite, One Size (S &amp;
                        L Bands)
                      </a>
                    </td>
                    <td class="price align-middle text-body fs-9 text-end">$998</td>
                    <td class="fs-8">
                      <div class="d-flex justify-content-center align-items-center">
                        <select class="form-control text-center px-0" style="width: 50px">
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                      </div>
                    </td>
                    <td class="total align-middle fw-bold text-body-highlight text-end">$998</td>
                    <td class="align-middle white-space-nowrap text-end pe-0 ps-3">
                      <button class="btn btn-sm text-body-tertiary text-opacity-85 text-body-tertiary-hover me-2">
                        <span class="fas fa-trash"></span>
                      </button>
                    </td>
                  </tr>
                  <tr class="cart-table-row btn-reveal-trigger">
                    <td class="text-body-emphasis ps-0 fs-8" colspan="4">小計 :</td>
                    <td class="text-body-emphasis fw-bold text-end fs-8">$691</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-between-center mb-3">
                <h3 class="card-title mb-0">總金額</h3>
              </div>
              <select class="form-select mb-3" aria-label="delivery type">
                <option value="cod">貨到付款</option>
                <option value="card">信用卡</option>
              </select>
              <div>
                <div class="d-flex justify-content-between">
                  <p class="text-body">商品總金額 :</p>
                  <p class="text-body-emphasis">$691</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-body">折扣 :</p>
                  <p class="text-danger">9折</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-body">稅(5%) :</p>
                  <p class="text-body-emphasis">$126.20</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-body">小計 :</p>
                  <p class="text-body-emphasis">$665</p>
                </div>
              </div>
              <div class="d-flex justify-content-between border-y border-dashed py-3 mb-4">
                <h4 class="mb-0">總計 :</h4>
                <h4 class="mb-">$695</h4>
              </div>
              <button class="btn btn-primary w-100">
                結帳
                <span class="fas fa-chevron-right ms-1 fs-10"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
