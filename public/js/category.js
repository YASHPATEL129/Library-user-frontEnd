function categorysBooks(id) {
  var sid = (selectedCat == undefined || selectedCat == '' )? 0 : selectedCat
  $("#cat-" +sid).removeClass("active");
  $("#cat-"+id).addClass("active");
  selectedCat = id;
  var q = $('#query').val();
  var url = (q== undefined || q == null || q=='') ? '/category/' + id : '/category/' + id + "&q=" + q;
  
    $.ajax({
        type: 'GET',
        url: url, // Replace with your API endpoint
        dataType: 'json',
        success: function (response) {

          
            if (response.status == 200) {
                // Clear existing table rows
                $('#booksBox').empty();

                // Loop through the accountant data and create table rows
                response.books.forEach(books => {
                    // const row = document.createElement('div');
                    var innerHTML = `
                    <div
                    class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"
                  >
                    <div class="product__item">
                      <a href="/bookDetails/${books.bookId}">
                        <div
                          class="product__item__pic_book set-bg"
                          data-setbg="/download/${books.cover}"
                          style="background-image: url('/download/${books.cover}')"
                        >`;
                        if (books.isPrime) { 
                        innerHTML +=  `<span class="prime-icon">
                            <img src="/image/crown.png" alt="Prime Icon"
                          /></span>`;
                          }
                       innerHTML += ` </div>
                          <div class="product__item__text">
                          <h6>${books.title}</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                    `;

                    $('#booksBox').append(innerHTML);

                });
            } else {
                console.error('Data format from API is not as expected:', response);
            }
        },
        error: function (error) {
            console.error('Failed to fetch accountant data:', error);
        }
    });
}
