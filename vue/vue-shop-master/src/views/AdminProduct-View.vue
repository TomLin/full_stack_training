<script setup>
import { onMounted } from 'vue'

onMounted(() => { })
</script>

<template>
  <section class="py-5">
    <div class="container-small cart">
      <h3 class="fw-bold mb-6">商品管理(管理員)</h3>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <button class="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target="#modal-product">
          新增商品
        </button>
      </div>

      <div class="row g-5">
        <div class="px-4 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
          <div class="table-responsive scrollbar mx-n1 px-1">
            <table class="table fs-9 mb-0">
              <thead>
                <tr>
                  <th class="fs-9 align-middle ps-0" style="max-width: 20px; width: 18px">
                    <div class="form-check mb-0 fs-8">
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </th>
                  <th class="align-middle" style="width: 70px"></th>
                  <th class="align-middle" style="width: 500px">商品名稱</th>
                  <th class="align-middle" style="width: 150px">類別</th>
                  <th class="align-middle" style="width: 100px">價格</th>
                  <th class="align-middle" style="width: 100px">評等</th>
                  <th class="align-middle text-end" style="width: 200px">功能</th>
                </tr>
              </thead>
              <tbody class="list" id="products-table-body">
                <tr class="position-static">
                  <td class="fs-9 align-middle">
                    <div class="form-check mb-0 fs-8">
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td class="align-middle py-0">
                    <a class="d-block border border-translucent rounded-2" href="#">
                      <img src="../../assets/img/products/1.png" alt="" width="53" />
                    </a>
                  </td>
                  <td class="align-middle">
                    <a class="" href="#">
                      商品名稱~商品名稱~商品名稱~商品名稱~商品名稱~商品名稱~商品名稱~
                    </a>
                  </td>
                  <td class="align-middle white-space-nowrap">OOO分類</td>
                  <td class="align-middle white-space-nowrap">$39 ($52)</td>
                  <td class="align-middle white-space-nowrap">
                    <span class="fa fa-star text-warning fs-9 me-1"></span>
                    <span class="fa fa-star text-warning fs-9 me-1"></span>
                    <span class="fa fa-star text-warning fs-9 me-1"></span>
                    <span class="fa-regular fa-star text-warning fs-9 me-1"></span>
                    <span class="fa-regular fa-star text-warning fs-9 me-1"></span>
                  </td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-info me-2" data-bs-toggle="modal" data-bs-target="#modal-product">
                      修改
                    </button>
                    <button class="btn btn-sm btn-danger">刪除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="modal fade" id="modal-product" tabindex="-1" aria-labelledby="modal-product-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-product-label">新增/修改商品</h5>
          <button class="btn btn-close p-1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--商品新增/修改表單-->
          <div class="mb-3">
            <label for="product-name" class="form-label fs-9">商品名稱</label>
            <input type="text" class="form-control" id="product-name" />
          </div>
          <div class="mb-3">
            <label for="product-category" class="form-label fs-9">類別</label>
            <select class="form-select" id="product-category">
              <option selected>OOO分類</option>
              <option value="1">類別1</option>
              <option value="2">類別2</option>
              <option value="3">類別3</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="product-price" class="form-label fs-9">價格</label>
            <input type="number" class="form-control" id="product-price" />
          </div>
          <div class="mb-3">
            <label for="product-stock" class="form-label fs-9">庫存</label>
            <input type="number" class="form-control" id="product-stock" />
          </div>
          <div class="mb-3">
            <label for="product-description" class="form-label fs-9">商品描述</label>
            <textarea class="form-control" id="product-description" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="button">儲存</button>
          <button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
