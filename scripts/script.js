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

	/* Funkcja odpowiadająca za liczenie wyznacznika macierzy */
	function determinantMatrice(firstMatrice) {

		let resultArr = [];
		let det = 0;

		let arrsLength = firstMatrice.length,
			matricesResultWrapper = $('.matrices-result');

			if (arrsLength == 1) {
				det = firstMatrice[0]
			} else if (arrsLength == 2) {
				det = (firstMatrice[0][0] * firstMatrice[1][1]) - (firstMatrice[0][1] * firstMatrice[1][0])
			} else if (arrsLength == 3) {
				det = (firstMatrice[0][0] * firstMatrice[1][1] * firstMatrice[2][2]) +
					(firstMatrice[1][0] * firstMatrice[2][1] * firstMatrice[0][2]) +
					(firstMatrice[2][0] * firstMatrice[0][1] * firstMatrice[1][2]) -
					(firstMatrice[0][2] * firstMatrice[1][1] * firstMatrice[2][0]) -
					(firstMatrice[1][2] * firstMatrice[2][1] * firstMatrice[0][0]) -
					(firstMatrice[2][2] * firstMatrice[0][1] * firstMatrice[1][0]);
			}

			matricesResultWrapper.html('<p>det = ' + det + '</p>').css("font-weight", "bold");

	}

	 /* Funkcja odpowiadająca za walidację formularza. Zawiera inne pomocnicze funkcje.
	 Jako argumenty przyjmuje inputy poszczególnych macierzy oraz wybraną metodę.
	 Zwraca boolean w zależności jak przebiegła walidacja. */
	function validateMatriceCalculator(matriceInputs, checkedMethod) {

		let errorWrapper = $('.error-wrapper'),
			isInvalid = false;

		if(!errorWrapper.length) errorWrapper = $('<div class="error-wrapper">');

		errorWrapper.html('');

		if(!checkedMethod) {
			let error = $('<p>Wybierz metodę obliczania!</p>');
			errorWrapper.append(error);
			isInvalid = true;
		}

		if (methodDeterminant) {
			if (!buildMatrice1Row.val() || !buildMatrice1Col.val()) {
				let error = $('<p>Uzupełnij wymiary macierzy!</p>');
				errorWrapper.append(error);
				isInvalid = true;
			}
		} else if(!buildMatrice1Row.val() || !buildMatrice2Row.val() || !buildMatrice1Col.val() || !buildMatrice2Col.val()) {
			let error = $('<p>Uzupełnij wymiary macierzy!</p>');
			errorWrapper.append(error);
			isInvalid = true;
		}


		if(checkedMethod === 'addition' || checkedMethod === 'subtraction') {
			if(!(buildMatrice1Row.val() === buildMatrice2Row.val() && buildMatrice1Col.val() === buildMatrice2Col.val())) {
				let error = $('<p>Przy dodawaniu i odejmowaniu, macierze powinny miec te same wymiary!</p>');
				errorWrapper.append(error);
				isInvalid = true;
			}
		}

		if(checkedMethod === 'multiplication') {
			if(!(buildMatrice1Col.val() === buildMatrice2Row.val())) {
				let error = $('<p>Przy mnożeniu macierzy, pierwsza macierz powinna miec tyle kolumn co druga wierszy!</p>');
				errorWrapper.append(error);
				isInvalid = true;
			}
		}

		if(checkedMethod === 'determinant') {
			if(!(buildMatrice1Col.val() === buildMatrice1Row.val())) {
				let error = $('<p>Przy liczeniu wyznacznika macierzy, macierz powinna byc kwadratowa!</p>');
				errorWrapper.append(error);
				isInvalid = true;
			}
		}

		if(isMatriceEmpty()) {
			let error = $('<p>Uzupełnij wszystkie pola macierzy!</p>');
			errorWrapper.append(error);
			isInvalid = true;
		}

		function isMatriceEmpty() {

			let isEmpty = false;

			matriceInputs.each(function (index, eachInput) {
				eachInput = $(eachInput);
				if (!eachInput.val()) isEmpty = true;
			});

			return isEmpty;

		}

		if(isInvalid) $('#options-form').append(errorWrapper);

		return isInvalid;

	}

    let methodRadios = $('input[name="method"]'),
        matriceSizer2 = $('#matrice-sizer-2'),
        methodDeterminant = null;

    /* Funkcja odpowiadająca za chowanie i pokazywanie drugiej macierzy w zaleznosci od tego czy wybrana jest metoda liczenia wyznaczanika macierzy. */
    methodRadios.on('click', function () {
        const radio = $(this),
        secondMatrice = $('.matrices-wrapper table')[1];


        if(radio.val() == 'determinant') {
            matriceSizer2.slideUp();
            secondMatrice && $(secondMatrice).fadeOut();
            methodDeterminant = true;
			matricesWrapper.html(' ');

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


        let checkedMethod = $('input[name="method"]:checked').val(),
			matriceInputs = $('.matrices-wrapper input');

		let isInvalid = validateMatriceCalculator(matriceInputs, checkedMethod);

		if(isInvalid) return;

		createArraysfromMatrices(leftMatriceRows, firstMatriceArr);
		!methodDeterminant && createArraysfromMatrices(rightMatriceRows, secondMatriceArr);

		checkedMethod === 'addition' && addMatrices(firstMatriceArr, secondMatriceArr);
		checkedMethod === 'subtraction' && addMatrices(firstMatriceArr, secondMatriceArr, true);
		checkedMethod === 'multiplication' && multiplyMatrices(firstMatriceArr, secondMatriceArr);
		checkedMethod === 'determinant' && determinantMatrice(firstMatriceArr);

    });

})(jQuery);
