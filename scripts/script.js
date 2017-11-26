(function ($) {

     /* Funkcja uruchamiająca funkcję generującą macierz. 'Wrapper' to parametr odpowiadający za kontener w HTML */
	function generateMatrices(n1, m1, n2, m2, wrapper) {

		wrapper.html('');

		generateEachMatrice(n1, m1, wrapper);

		if(n2 && m2) {
			generateEachMatrice(n2, m2, wrapper);
		}

	}


     /* Funkcja generująca pojedynczą macierz i umieszczająca ją w HTML. */
	function generateEachMatrice(n, m, wrapper) {

		let newMatrice = $('<table>');

		for(let i = 0; i < n; i++) {

			let tr = $('<tr>');

			for(let j = 0; j < m; j++) {

				let td = $('<td>'),
					input = $('<input>', {
						type: 'number'
					});

				td.append(input);
				tr.append(td);
			}

			newMatrice.append(tr);
		}

		wrapper.append(newMatrice);

		return newMatrice;

	}

	/* Funkcja pobierająca liczby z macierzy do tablicy js.
    Parametr matriceRows odpowiada za pojedynczy wiersz macierzy.
    MatriceArr tablica js., która przechowuje liczby z danego wiersza. */
	function createArraysfromMatrices(matriceRows, matriceArr) {

		matriceRows.each(function (index, eachRow) {

			eachRow = $(eachRow);

			let rowArr = [],
				fields = eachRow.find('td');

			fields.each(function (index, eachField) {

				let input = $(eachField).find('input');

				rowArr.push(input.val());

			});

			matriceArr.push(rowArr);
		});

	}

    /* Funkcja uzupełniająca tabelę HTML wynikami.
    Parametr matriceInputs pobiera puste inputy z tabeli wynikowej.
    Parametr resultArr pobiera tablicę js. z wynikami gotowymi do podstawienia w tabeli HTML */
	function addResultToInputs(matriceInputs, resultArr) {

		matriceInputs.each(function (index, eachInput) {

			eachInput = $(eachInput);

			eachInput.attr({
				value: resultArr[index],
				readonly: true
			});

		})

	}

    /* Funkja odpowiadająca za dodawanie i odejmowanie macierzy.
    Parametr firstMatrice pobiera pierwszą macierz.
    Parametr secondMatrice pobiera drugą macierz.
    Parametr subtraction sprawdza czy ma byc wykonane odejmowanie. */
	function addMatrices(firstMatrice, secondMatrice, subtraction) {

		let resultArr = [];

		let arrsLength = firstMatrice.length,
			arrsInnerLength = firstMatrice[0].length,
			matricesResultWrapper = $('.matrices-result');

		for(let i = 0; i < arrsLength; i++) {

			for(let j = 0; j < arrsInnerLength; j++) {
				if(subtraction) {
					resultArr.push(parseInt(firstMatrice[i][j]) - parseInt(secondMatrice[i][j]));
				} else {
					resultArr.push(parseInt(firstMatrice[i][j]) + parseInt(secondMatrice[i][j]));
				}
			}

		}

		generateMatrices(arrsLength, arrsInnerLength, null, null, matricesResultWrapper);

		let matriceInputs = matricesResultWrapper.find($('input'));

		addResultToInputs(matriceInputs, resultArr);

	}

    /* Funkcja odpowiadająca za mnożenie macierzy. */
	function multiplyMatrices(firstMatrice, secondMatrice) {

		let resultArr = [];

		let arrsLength = firstMatrice.length,
			arrsInnerLength = secondMatrice[0].length,
			matricesResultWrapper = $('.matrices-result');

		for(let i = 0; i < firstMatrice.length; i++) {

			for(let j = 0; j < secondMatrice[0].length; j++) {

				let resultFromK = 0,
					resultFromKArr = [];

				for(let k = 0; k < secondMatrice.length; k++) {
					resultFromK += parseInt(firstMatrice[i][k]) * parseInt(secondMatrice[k][j]);
					resultFromKArr.push(parseInt(firstMatrice[i][k]) * parseInt(secondMatrice[k][j]));
				}

				resultArr.push(resultFromK);

			}

		}

		generateMatrices(arrsLength, arrsInnerLength, null, null, matricesResultWrapper);

		let matriceInputs = matricesResultWrapper.find($('input'));
		addResultToInputs(matriceInputs, resultArr);

	}

    let methodRadios = $('input[name="method"]'),
        matriceSizer2 = $('#matrice-sizer-2'),
        methodDeterminant = null;

    /* Funkcja odpowiadająca za chowanie i pokazywanie drugiej macierzy w zaleznosci od tego czy wybrana jest metoda leczenia wyznaczanika macierzy. */
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

    let buildMatriceInputs = $('.matrice-size-input'),
        buildMatrice1Row = $('#matrice1Row'),
        buildMatrice1Col = $('#matrice1Col'),
        buildMatrice2Row = $('#matrice2Row'),
        buildMatrice2Col = $('#matrice2Col'),
		matricesWrapper = $('.matrices-wrapper');


    /* Funkcja, która zabezpiecza przed zbudowaniem zbyt dużej macierzy.
    Funkcja sprawdza na podstawie wybranej metody, kiedy wygenerowac macierz. */
    buildMatriceInputs.on('keyup', function () {
        let input = $(this);
        input.val() > 10 && input.val('10');

        if(!methodDeterminant) {

            if(buildMatrice1Row.val() && buildMatrice1Col.val() && buildMatrice2Row.val() && buildMatrice2Col.val()) {
                generateMatrices(buildMatrice1Row.val(), buildMatrice1Col.val(), buildMatrice2Row.val(), buildMatrice2Col.val(), matricesWrapper);
            }

        } else if(methodDeterminant && buildMatrice1Row.val() && buildMatrice1Col.val()) {
            generateMatrices(buildMatrice1Row.val(), buildMatrice1Col.val(), null, null, matricesWrapper);
        }
    });

    let optionsForm = $('#options-form');

    optionsForm.on('submit', function (event) {
        event.preventDefault();

        let firstMatriceArr = [],
			secondMatriceArr = [],

			leftMatrice = $($('.matrices-wrapper table')[0]),
			rightMatrice = $($('.matrices-wrapper table')[1]),

			leftMatriceRows = leftMatrice.find($('tr')),
			rightMatriceRows = rightMatrice.find($('tr'));


        let isInvalid = false,
			checkedMethod = $('input[name="method"]:checked').val(),
			matriceInputs = $('.matrices-wrapper input');

        if(!checkedMethod) {
			console.log('Wybierz metodę obliczania!');
			isInvalid = true;
		}

		if(!buildMatrice1Row.val() || !buildMatrice2Row.val() || !buildMatrice1Col.val() || !buildMatrice2Col.val()) {
			console.log('Uzupełnij wymiary macierzy!');
			isInvalid = true;
		}

		if(checkedMethod === 'addition' || checkedMethod === 'subtraction') {
			if(!(buildMatrice1Row.val() === buildMatrice2Row.val() && buildMatrice1Col.val() === buildMatrice2Col.val())) {
				console.log('Przy dodawaniu i odejmowaniu, macierze powinny miec te same wymiary!');
				isInvalid = true;
			}
		}

		if(checkedMethod === 'multiplication') {
			if(!(buildMatrice1Col.val() === buildMatrice2Row.val())) {
				console.log('Przy mnożeniu macierzy, pierwsza macierz powinna miec tyle kolumn co druga wierszy!');
				isInvalid = true;
			}
		}

		matriceInputs.each(function (index, eachInput) {
			eachInput = $(eachInput);
			if(!eachInput.val()) isInvalid = true;
		});

		if(isInvalid) return;

		createArraysfromMatrices(leftMatriceRows, firstMatriceArr);
		!methodDeterminant && createArraysfromMatrices(rightMatriceRows, secondMatriceArr);

		checkedMethod === 'addition' && addMatrices(firstMatriceArr, secondMatriceArr);
		checkedMethod === 'subtraction' && addMatrices(firstMatriceArr, secondMatriceArr, true);
		checkedMethod === 'multiplication' && multiplyMatrices(firstMatriceArr, secondMatriceArr);

    });

})(jQuery);
