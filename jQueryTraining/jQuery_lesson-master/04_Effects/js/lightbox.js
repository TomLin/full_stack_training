$(function() {
    // 綁定 .lightbox 元素的點擊事件
    $('.lightbox').on('click',function(e) {
      // 防止點擊時跳轉到 href 指定的 URL
      e.preventDefault();
      // 取得被點擊的圖片 URL
      var imageUrl = $(this).attr('href');
      // 設置 .lightbox-image 元素的 src 屬性為所點擊圖片的 URL
      $('.lightbox-image').attr('src', imageUrl);
      // 顯示 .lightbox-overlay 元素，以顯示圖片
      $('.lightbox-overlay').fadeIn();
    });
  
    // 綁定 .lightbox-close 元素的點擊事件
    $('.lightbox-close').on('click',function() {
      // 隱藏 .lightbox-overlay 元素，以關閉圖片顯示
      $('.lightbox-overlay').fadeOut();
    });
  });
  
  