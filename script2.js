$(document).ready(function() {
    const cartIcon = $("#cart-Icon");
    const cart = $(".cart");
    const closeCart = $("#cart-close");
    const Categories = $('.categories');
    var containerr = $('#containerr');
    const cartitems = $('#cart-items');
    const carttotal = $('.total-Price');
    let total = 0;

    cartIcon.click(function () {
      cart.addClass("active");
  });

  closeCart.click(function () {
      cart.removeClass("active");
  });
  function fetchMenuItems() {
    $.get('http://localhost:3000/api/items', function(menuData) {
      $.each(menuData, function(index, item) {
        var itemDiv = $('<div>').addClass('item').data('item-category', item.categoriesName); 
        var nameElement = $('<h1>').text(item.Name);
        var p = $('<p>').text(item.Price);
        var imagelink = $('<img>').attr('src', item.imagelink);
        var addToCartButton = $('<button>').text('Add to Cart');
        addToCartButton.click(function () {
          const cartitem = $('<div>').addClass('cart-item');
          const img = $('<img>').addClass('product-img').attr('src', item.imagelink);
          const detailBox = $('<div>').addClass('detail-box');
          const itemDetails = $('<div>').addClass('product-title');
          const itemnamee = $('<h1>').text(item.Name);
          const Price = $('<div>').addClass('price');
          const Pr = $('<p>').text(item.Price);
          const cartclose = $('<i>').addClass('fa-solid fa-trash Cart-Remove').css('color', '#310404').click(handleRemoveCartItem(item));

          itemDetails.append(itemnamee);
          Price.append(Pr);
          detailBox.append(itemDetails, Price, cartclose);
          cartitem.append(img, detailBox);
          cartitems.append(cartitem);
          total += parseFloat(item.Price);
          carttotal.text('$' + total.toFixed(2));
        });

        itemDiv.append(p, imagelink, nameElement, addToCartButton);
        containerr.append(itemDiv);

        if (Categories.find('[data-item-category="' + item.categoriesName + '"]').length === 0) {
          var categoryButton = $('<button>').text(item.categoriesName).attr('data-item-category', item.categoriesName);
          Categories.append(categoryButton);
          categoryButton.click(function() {
            var category = $(this).attr('data-item-category');
            $('.item').each(function() {
              var itemCategory = $(this).data('item-category');
              if (itemCategory === category) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          });
        }
      });
    })
    .fail(function(error) {
      console.error('Error fetching menu data:', error);
    });
  }

  fetchMenuItems();

  function handleRemoveCartItem(item) {
    return function () {
      const cartitem = $(this).closest('.cart-item');
      cartitem.remove();
      total -= parseFloat(item.Price);
      carttotal.text('$' + total.toFixed(2));
    };
  }
});