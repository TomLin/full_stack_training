$(function() {

    // 當頁面載入完成後執行以下程式碼
    $('.accordion-header').on('click',function() {
  
      // 當點擊折疊面板標題時，執行以下程式碼
  
      // 先移除所有折疊面板標題的 active class，隱藏所有折疊面板內容
      $('.accordion-header').removeClass('active');
      $('.accordion-content').slideUp();
      
      // 如果點擊的折疊面板內容沒有顯示，則顯示內容，並將該標題的 active class 添加上
      if (!$(this).next().is(':visible')) {
        $(this).addClass('active');
        $(this).next().slideDown();
      }
    });
    
    // 預設第一個折疊面板內容顯示
    $('.accordion-header').first().on('click',);
  });
  