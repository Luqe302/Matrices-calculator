(function ($) {

    let methodRadios = $('input[name="method"]'),
        matriceSizer2 = $('#matrice-sizer-2'),
        methodDeterminant = null;

    methodRadios.on('click', function () {
        const radio = $(this),
        secondMatrice = $('.matrices-wrapper table')[1];


        if(radio.val() == 1) {
            matriceSizer2.slideUp();
            secondMatrice && $(secondMatrice).fadeOut();
            methodDeterminant = true;

        } else {
            matriceSizer2.slideDown();
            secondMatrice && $(secondMatrice).fadeIn();
            methodDeterminant = false;
        }

    });

    let matriceInputs = $('.matrice-size-input'),
        matrice1Row = $('#matrice1Row'),
        matrice1Col = $('#matrice1Col'),
        matrice2Row = $('#matrice2Row'),
        matrice2Col = $('#matrice2Col');

    matriceInputs.on('keyup', function () {
        var input = $(this);
        input.val() > 10 && input.val('10');

        if(!methodDeterminant) {

            if( matrice1Row.val() && matrice1Col.val() && matrice2Row.val() && matrice2Col.val() ) {
                generateMatrices( matrice1Row.val(), matrice1Col.val(), matrice2Row.val(), matrice2Col.val() );
            }

        } else if( methodDeterminant && matrice1Row.val() && matrice1Col.val() ) {
            generateMatrices( matrice1Row.val(), matrice1Col.val() );
        }
    });

    let matricesWrapper = $('.matrices-wrapper');

    function generateMatrices(n1, m1, n2, m2) {

        matricesWrapper.html('');

        generateEachMatrice(n1, m1);

        if(n2 && m2) {
            generateEachMatrice(n2, m2);
        }
    };

	function generateEachMatrice(n, m) {

        let newMatrice = $('<table>');

        for(let i = 0; i < n; i++) {

            let tr = $('<tr>');

            for(let j = 0; j < m; j++) {

                let td = $('<td>'),
                    input = $('<input type="number">');

                td.append(input);
                tr.append(td);
            }

            newMatrice.append(tr);
        }

        matricesWrapper.append(newMatrice);
    };

})(jQuery);
