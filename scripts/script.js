(function ($) {

    /*Funkcje do generowania macierzy*/
    let methodRadios = $('input[name="method"]'),
        matriceSizer2 = $('#matrice-sizer-2'),
        methodDeterminant = null;

    methodRadios.on('click', function () {
        const radio = $(this),
        secondMatrice = $('.matrices-wrapper table')[1];


        if(radio.val() == 'determinant') {
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
        let input = $(this);
        input.val() > 10 && input.val('10');

        if(!methodDeterminant) {

            if(matrice1Row.val() && matrice1Col.val() && matrice2Row.val() && matrice2Col.val()) {
                generateMatrices(matrice1Row.val(), matrice1Col.val(), matrice2Row.val(), matrice2Col.val());
            }

        } else if(methodDeterminant && matrice1Row.val() && matrice1Col.val()) {
            generateMatrices(matrice1Row.val(), matrice1Col.val());
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

    /*Funkcje do pobierania danych z macierzy*/
    let optionsForm = $('#options-form');

    generateEachMatrice(2, 3)

    optionsForm.on('submit', function (event) {
        event.preventDefault();

        let firstMatriceArr = [],
			secondMatriceArr = [],
			leftMatrice = $($('.matrices-wrapper table')[0]),
			rightMatrice = $($('.matrices-wrapper table')[1]);


        /* Umieszczanie wartoście w tablicy z LEWEJ macierzy*/
        let leftMatriceRows = leftMatrice.find($('tr'));

        leftMatriceRows.each(function (index, eachRow) {

			eachRow = $(eachRow);

			let rowArray = [],
				fields = eachRow.find('td');

			fields.each(function (index, eachField) {

				let input = $(eachField).find('input');

				input.val() && rowArray.push(input.val());

			});

			firstMatriceArr.push(rowArray);
		});


        /* Umieszczanie wartoście w tablicy z PRAWEJ macierzy*/
        if(!methodDeterminant) {
            let rightMatriceRows = rightMatrice.find($('tr'));

            rightMatriceRows.each(function (index, eachRow) {

                eachRow = $(eachRow);

                let rowArray = [],
                    fields = eachRow.find('td');

                fields.each(function (index, eachField) {

                    let input = $(eachField).find('input');

                    input.val() && rowArray.push(input.val());

                });

                secondMatriceArr.push(rowArray);
            });
        }

        /*Funkcje liczące działania na macierzach*/
        let checkedMethod = $('input[name="method"]:checked').val();

        if(checkedMethod == 'addition' && matrice1Row.val() == matrice2Row.val() && matrice1Col.val() == matrice2Col.val()) {

            for(var i = 0; i < matrice2Row.val(); i++) {

                if(secondMatriceArr[i].length == matrice2Col.val()) {
                    console.log('ok');
                } else {
                    console.log('uzupelnij pola');
                }

            }

            console.log(secondMatriceArr);

        } else {
            console.log('Dodawanie mogę wykonac tylko wtedy gdy macierze maja takie same wymiary');
        }
    });

})(jQuery);
