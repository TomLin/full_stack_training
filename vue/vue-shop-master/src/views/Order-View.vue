<script setup>
import { onMounted } from 'vue'

onMounted(() => { })
</script>

<template>
  <section class="py-5">
    <div class="container-small cart">
      <h3 class="fw-bold mb-6">我的訂單</h3>

      <div class="row g-5">
        <div class="col-12">
          <div id="cartTable">
            <div class="table-responsive scrollbar mx-n1 px-1">
              <table class="table fs-9 mb-0 border-top border-translucent">
                <thead>
                  <tr>
                    <th class="align-middle">訂單編號</th>
                    <th class="white-space-nowrap align-middle" style="min-width: 200px">
                      訂單明細
                    </th>
                    <th class="align-middle" style="width: 100px">付款方式</th>
                    <th class="align-middle" style="width: 100px">合計</th>
                  </tr>
                </thead>
                <tbody class="list" id="cart-table-body">
                  <tr class="cart-table-row btn-reveal-trigger">
                    <td class="align-middle ps-2">OR0001</td>
                    <td class="align-middle p-4">
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
                          </tr>
                        </thead>
                        <tbody class="list" id="cart-table-body">
                          <tr class="cart-table-row btn-reveal-trigger">
                            <td class="align-middle white-space-nowrap py-0">
                              <img src="../../assets/img/products/1.png" alt="" width="53" />
                            </td>
                            <td class="products align-middle">
                              Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress
                              Management
                            </td>
                            <td class="align-middle text-body fs-9 text-end">$998</td>
                            <td class="text-center">1</td>
                            <td class="align-middle text-body-highlight text-end">$998</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td class="align-middle text-body fs-9">信用卡</td>
                    <td class="align-middle fw-bold text-body-highlight">$998</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
