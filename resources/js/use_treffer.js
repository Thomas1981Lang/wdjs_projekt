/****************************************************
 *
 *
 * MATCH DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

/**
 * Erzeugt das Konstruktor Objekt Match mit seinen Eigenschaften id, vorname, nachname, geburstdatum, gender, genderLike, url.
 *
 * @param id
 * @param vorname
 * @param nachname
 * @param geburtsdatum
 * @param gender
 * @param genderLike
 * @param url
 * @constructor
 */
var Match = function (id, vorname, nachname, geburtsdatum, gender, genderLike, url) {
    this.id = id;
    this.vorname = vorname;
    this.nachname = nachname;
    this.geburtsdatum = geburtsdatum;
    this.gender = gender;
    this.genderLike = genderLike;
    this.url = url;
    this.vollername = `${this.vorname} ${this.nachname}`;
};


/**
 * Fügt dem Match Konstruktor eine Geburtstagsdatumskonvertierer-Methode hinzu. Ändert das übergeben Datum von JJJJ-MM-TT auf TT-MM-JJJJ
 *
 * @returns {string|*}
 */
Match.prototype.datumcov = function () {
    this.j = this.geburtsdatum.slice(0, 4);
    console.log(this.j);
    this.m = this.geburtsdatum.slice(5, 7);
    console.log(this.m);
    this.d = this.geburtsdatum.slice(8, 10);
    console.log(this.d);
    this.newDateString = (this.d + '.' + this.m + '.' + this.j);
    return this.newDateString;
};

/**
 * Fügt dem Match Konstruktor eine Übersetzungs-Methode hinzu.
 *
 * @returns {string}
 */
Match.prototype.ownGender = function () {
    switch (this.gender) {
        case 'female':
            this.geschlecht = 'Frau';
            break;
        case 'male':
            this.geschlecht = 'Mann';
            break;
    }
    return this.geschlecht;
};

/**
 * Fügt dem Match Konstruktor eine weitere Übersetzungs-Methode hinzu.
 *
 * @returns {string}
 */
Match.prototype.likeGender = function () {
    switch (this.genderLike) {
        case 'female':
            this.fremdGeschlecht = 'Frauen';
            break;
        case 'male':
            this.fremdGeschlecht = 'Männer';
            break;
        case 'bi':
            this.fremdGeschlecht = 'Frauen und Männer';
            break;
    }
    return this.fremdGeschlecht;
};


/**
 * Startet eine Ajax abfrage.
 * Bei Erfolg wird bei leerem Array 'Noch kein Treffer vorhanden' ausgegeben.
 * Wenn im Array Daten vorhanden sind werden die Daten mittels for in-Schleife und Match-Object in einem String gespeichert und mit Hilfe von jQuery im DOM einfügen.
 *
 * @returns void
 */
var fillMatchData = function () {

    $.ajax({
        url: 'https://www.lang-thomas.at/resources/php/treffer_show.php',
        method: 'POST',
        data: {
            id: localStorage.getItem('id'),
        },
        success: function (data) {
            if (data !== "Error") {
                var parseData = JSON.parse(data);
                console.log(parseData, 'parse');
                if (parseData.length == 0) {
                    $('.treffer_wrapper').html('<div class="treffer_user">' +
                        '<div class="treffer_name">' +
                        '<h2>Noch kein Treffer vorhanden</h2>' +
                        '</div></div>');
                } else {
                    for (var i = 0 in parseData) {
                        var id = parseData[i].id;
                        var vorname = parseData[i].vorname;
                        var nachname = parseData[i].nachname;
                        var geburtsdatum = parseData[i].geburtsdatum;
                        var gender = parseData[i].geschlecht;
                        var genderLike = parseData[i].orientierung;
                        var url = parseData[i].picuserpfad;

                        console.log('Line 93: genderLike', genderLike);
                        var name = 'user' + i;


                        /**
                         * Erzeugt in einer for in-Schleife neue Match Objekte, welche in einem String verwendet werden.
                         * @type {Match}
                         */
                        name = new Match(id, vorname, nachname, geburtsdatum, gender, genderLike, url);

                        var div = $('<div class="treffer_user">').html(`
            
                        <div class="treffer_name">
                            <h2>${name.vollername}</h2>
                        </div>
                        <div class="treffer_flex_wrapper">
                            <div class="treffer_image" style="background-image: url(${name.url})"></div>
                            <div class="treffer_info">
                                <p>
                                    <span class="treffer_bezeichnung">Geburtsdatum: </span>
                                    <span class="treffer_geburtsdatum">${name.datumcov()}</span>
                                </p>
            
                                <p>
                                    <span class="treffer_bezeichnung">Geschlecht: </span>
                                    <span class="treffer_gender">${name.ownGender()}</span>
                                </p>
            
                                <p>
                                    <span class="treffer_bezeichnung">Sucht nach: </span>
                                    <span class="treffer_like_gender">${name.likeGender()}</span>
                                </p>
                            </div>
                        </div>
                        <div class="treffer_dislike_footer">
                            <p>
                                <button class="treffer_dislike" data-db="${name.id}">Entfernen</button>
                            </p>
                        </div>
                    `);


                        /**
                         * Auf Knopfdruck Ajax-Request um Match in DB und Ausgabe im DOM zu entfernen.
                         *
                         * @event .treffer_dislike on click
                         */
                        $(document).on('click', '.treffer_dislike', function () {
                            var that = $(this);
                            var fk_id = $(this).data('db');
                            $.ajax({
                                url: 'https://www.lang-thomas.at/resources/php/treffer_entfernen.php',
                                method: 'POST',
                                data: {
                                    id: localStorage.getItem('id'),
                                    fk_id: fk_id
                                },
                                success: function (data) {
                                    if (data !== "Error") {
                                        console.log('Line 141: this', that);
                                        $(that).closest('.treffer_user').remove();
                                    } else {
                                        console.log(data, 'parse');
                                    }
                                }
                            });
                        });

                        /**
                         *  in den DOM einfügen
                         */
                        div.appendTo('.treffer_wrapper');
                    }
                }
            } else {
                console.log('Line 83: data error', data);
            }
        }
    });
};
