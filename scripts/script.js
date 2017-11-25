(function ($) {

    let methodRadios = $('input[name="method"]'),
        matriceSizer2 = $('#matrice-sizer-2'),
        methodDeterminant = null;

        methodRadios.on('click', function () {
            const radio = $(this);


            if(radio.val() == 1) {
                matriceSizer2.slideUp();
                methodDeterminant = true;

            } else {
                matriceSizer2.slideDown();
                methodDeterminant = false;
            }

        });

})(jQuery);
