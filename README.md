# Orc Losses

![Updated Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flod-db%2Forc-losses%2Frefs%2Fheads%2Fmain%2Frussian-losses.json&query=%24%5B%3A1%5D.date&logo=googlecalendar&logoColor=green&label=Updated&color=green&cacheSeconds=3600)


[English](#english) | [Français](#français) | [Deutsch](#deutsch) | [Українська](#українська) | [Русский](#русский)

[Contribution guide (English)](CONTRIBUTORS.md)

## 🇬🇧 English
<details id="english" open>
<summary>Russian Losses in Ukraine</summary>

### About
An open-source ([MIT](https://github.com/lod-db/orc-losses/blob/main/LICENSE.md)) dataset tracking the war losses of the Russian Federation in Ukraine since the 2022 full-scale invasion. The data contains official estimates published by the [Ministry of Defence of Ukraine](https://mod.gov.ua) and the General Staff of the Armed Forces of Ukraine on [Telegram](https://t.me/GeneralStaffZSU) and [Facebook](https://www.facebook.com/GeneralStaff.ua), including archived reports. Collection, historical backfills, and corrections are explained in the [methodology](#methodology). A visual representation of the data is available at [www.ukrainewarlosses.com](https://www.ukrainewarlosses.com).

### Dataset
The dataset is maintained as a JSON file, [russian-losses.json](https://github.com/lod-db/orc-losses/blob/main/russian-losses.json), and is updated daily. Detailed information about each data point in the dataset can be found in the JSON schema, [russian-losses.en.schema.json](https://github.com/lod-db/orc-losses/blob/main/schema/russian-losses.en.schema.json).

### Methodology

#### Sources and collection

The [Ministry of Defence (MoD)](https://mod.gov.ua) republishes the daily loss reports produced by the General Staff. Prefer a complete MoD Ukrainian article that agrees with the General Staff's report. If it is unavailable, use a dated [Wayback Machine](https://web.archive.org) capture or the MoD's English article, including an archived copy. When no usable MoD article exists or the MoD versions contain a misprint, consult the [General Staff Telegram channel](https://t.me/GeneralStaffZSU) first, then a direct [General Staff Facebook post](https://www.facebook.com/GeneralStaff.ua). Both provide official text and infographics. Check the full report and its date: posts can be edited or replaced.

The separate [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) project retrieves and parses MoD articles through an Azure-hosted API. Scheduled GitHub Actions runs download its feed and open update PRs for newer report dates, with automated approval and auto-merge after required checks pass. Existing records are preserved; historical gaps and corrections need separate review.

#### Interpreting records

Records are ordered newest first. `date` is the report date, not the collection or archive capture date; `sourceUri` links to the specific official report or archived copy. Each number is a cumulative total since 24 February 2022. Personnel means reported casualties (killed and wounded), not deaths alone. These are estimates from a party to the war, subject to rounding, bias, and revision; checking copies verifies transcription and consistency, not individual battlefield losses.

`null` means unavailable or excluded under historical dataset conventions, not zero. Preserve those conventions when filling gaps: before 30 April 2022, `unarmoredVehicles` excludes separately listed fuel tankers, and `specialEquipment` and `missiles` are null. Submarines are null before their first inclusion on 14 September 2023. The first record, 27 February 2022, combines 24–26 February; earlier partial tallies cannot be reliably split into daily records.

#### Backfills, corrections, and validation

Fill missing dates from actual official reports, never interpolation. Compare affected fields with the same date's official text or infographic and, where possible, a separately located official copy. Check that the previous total plus the published daily change equals the current total and that the next report continues the chain. For gaps, check every added date and both existing endpoints. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) and [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) help locate discrepancies but are secondary copies that may contain errors or backdate revisions.

Correct copying errors and misprints using official evidence. Use documented same-day official corrections; record later revisions on their publication date without rewriting earlier reports to make totals increase smoothly. Legitimate revisions can decrease totals or disagree with a printed daily change. Arithmetic alone does not justify a correction. Keep dates, fields, old/new values, primary-source links, and exceptions in the PR. Some corrected records retain a MoD `sourceUri` that still misprints the value; the correction PR and Git history supply the supporting evidence.

The `verify-json` workflow validates all five schemas but checks change bounds for **only the two newest records**. Historical edits also need source checks, unique dates, newest-first ordering, and the surrounding daily chain; apply the delta bounds across the affected period and explain exceptions. Backfills leave existing records untouched; corrections change only evidenced fields. Recent examples include [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796), and [2024](https://github.com/lod-db/orc-losses/pull/794) backfills and a [full-history correction review](https://github.com/lod-db/orc-losses/pull/791). See the [contribution guide](CONTRIBUTORS.md) for submission requirements.

#### Website calculations

Differences between cumulative records span the entire interval between report dates. Charts interpolate missing dates between available non-null totals and mark those points and affected daily differences as estimates (`≈`); these values are never stored in the dataset. Verified backfills replace them automatically. The daily chart clamps negative differences to zero, so consult the JSON and cumulative series for downward revisions. The past-war comparison uses separate estimates of military deaths, which are not directly equivalent to Ukraine's personnel figure including killed and wounded.

### Repository Structure
The repository contains the dataset, schema files, and the [documentation website](https://www.ukrainewarlosses.com), along with other supporting files.

```
orc-losses/
├─ .github/ (GitHub support files)
├─ docs/ (documentation website source)
├─ schema/ (JSON schema files)
├─ russian-losses.json (JSON dataset/instance)
```

</details>

---

## 🇫🇷 Français
<details id="français" open>
<summary>Perte de l'armée russe en Ukraine</summary>

### À propos
Un jeu de données open-source ([MIT](https://github.com/lod-db/orc-losses/blob/main/LICENSE.md)) suivant les pertes militaires de la Fédération de Russie en Ukraine depuis l'invasion à grande échelle de 2022. Les données contiennent les estimations officielles publiées par le [Ministère de la Défense de l'Ukraine](https://mod.gov.ua) et l'état-major des forces armées de l'Ukraine sur [Telegram](https://t.me/GeneralStaffZSU) et [Facebook](https://www.facebook.com/GeneralStaff.ua), y compris des rapports archivés. La collecte, les ajouts historiques et les corrections sont expliqués dans la [méthodologie](#méthodologie). Une représentation visuelle des données est disponible sur [www.ukrainewarlosses.com](https://www.ukrainewarlosses.com/fr).

### Jeu de données
Le jeu de données est maintenu sous forme de fichier JSON, [russian-losses.json](https://github.com/lod-db/orc-losses/blob/main/russian-losses.json), et est mis à jour quotidiennement. Des informations détaillées sur chaque point de données sont disponibles dans le schéma JSON, [pertes-russes.fr.schema.json](https://github.com/lod-db/orc-losses/blob/main/schema/pertes-russes.fr.schema.json).

### Méthodologie

#### Sources et collecte

Le [ministère de la Défense (MoD)](https://mod.gov.ua) republie les rapports quotidiens sur les pertes produits par l'état-major. Privilégiez un article complet du MoD en ukrainien dont les chiffres concordent avec ceux de l'état-major. S'il est indisponible, utilisez une capture datée de la [Wayback Machine](https://web.archive.org) ou l'article du MoD en anglais, éventuellement archivé. Lorsqu'aucun article du MoD n'est utilisable ou que ses versions contiennent une coquille, consultez d'abord le [canal Telegram de l'état-major](https://t.me/GeneralStaffZSU), puis une [publication Facebook de l'état-major](https://www.facebook.com/GeneralStaff.ua). Les deux fournissent des textes et des infographies officiels. Vérifiez le rapport complet et sa date : les publications peuvent être modifiées ou remplacées.

Le projet distinct [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) récupère et analyse les articles du MoD via une API hébergée sur Azure. Des exécutions planifiées de GitHub Actions téléchargent son flux et ouvrent des pull requests pour les nouvelles dates de rapport, avec approbation automatisée et fusion automatique après réussite des contrôles requis. Les enregistrements existants sont conservés ; les lacunes historiques et les corrections nécessitent un examen séparé.

#### Interprétation des enregistrements

Les enregistrements sont classés du plus récent au plus ancien. `date` désigne la date du rapport, et non celle de la collecte ou de la capture d'archive ; `sourceUri` renvoie au rapport officiel précis ou à sa copie archivée. Chaque nombre est un total cumulé depuis le 24 février 2022. Le personnel correspond aux pertes déclarées (tués et blessés), pas seulement aux morts. Il s'agit d'estimations d'une partie au conflit, susceptibles d'être arrondies, biaisées ou révisées ; comparer les copies vérifie la transcription et la cohérence, pas les pertes individuelles sur le champ de bataille.

`null` signifie indisponible ou exclu selon les conventions historiques du jeu de données, et non zéro. Respectez ces conventions lors des ajouts : avant le 30 avril 2022, `unarmoredVehicles` exclut les camions-citernes indiqués séparément, et `specialEquipment` et `missiles` valent `null`. Les sous-marins valent `null` avant leur première inclusion le 14 septembre 2023. Le premier enregistrement, daté du 27 février 2022, regroupe les 24–26 février ; les bilans partiels antérieurs ne permettent pas une répartition quotidienne fiable.

#### Ajouts historiques, corrections et validation

Complétez les dates manquantes à partir de rapports officiels réels, jamais par interpolation. Comparez les champs concernés au texte ou à l'infographie officielle du même jour et, si possible, à une copie officielle trouvée séparément. Vérifiez que le total précédent plus la variation quotidienne publiée donne le total actuel et que le rapport suivant poursuit cette chaîne. Pour les lacunes, vérifiez chaque date ajoutée et les deux enregistrements existants qui les encadrent. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) et [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) aident à repérer les écarts, mais restent des copies secondaires pouvant contenir des erreurs ou antidater des révisions.

Corrigez les erreurs de copie et les coquilles à partir de preuves officielles. Utilisez les corrections officielles documentées publiées le jour même ; inscrivez les révisions ultérieures à leur date de publication sans réécrire les rapports précédents pour rendre les totaux croissants. Des révisions légitimes peuvent diminuer les totaux ou contredire une variation quotidienne imprimée. L'arithmétique seule ne justifie pas une correction. Conservez dans la pull request les dates, champs, anciennes et nouvelles valeurs, liens vers les sources primaires et exceptions. Certains enregistrements corrigés gardent un `sourceUri` du MoD contenant encore la coquille ; la pull request de correction et l'historique Git fournissent les preuves.

Le workflow `verify-json` valide les cinq schémas, mais contrôle les limites de variation pour **les deux enregistrements les plus récents seulement**. Les modifications historiques exigent aussi la vérification des sources, de l'unicité des dates, de l'ordre décroissant et de la chaîne quotidienne environnante ; appliquez les limites de variation à la période concernée et expliquez les exceptions. Les ajouts ne modifient pas les enregistrements existants ; les corrections ne touchent que les champs justifiés. Exemples récents : ajouts pour [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796) et [2024](https://github.com/lod-db/orc-losses/pull/794), et [examen des corrections sur tout l'historique](https://github.com/lod-db/orc-losses/pull/791). Consultez le [guide de contribution (en anglais)](CONTRIBUTORS.md) pour les modalités de soumission.

#### Calculs du site

Les différences entre totaux cumulés couvrent tout l'intervalle entre les dates de rapport. Les graphiques interpolent les dates manquantes entre les totaux disponibles dont la valeur est différente de `null` et signalent ces points et les variations quotidiennes concernées comme des estimations (`≈`) ; ces valeurs ne sont jamais enregistrées dans le jeu de données. Les ajouts vérifiés les remplacent automatiquement. Le graphique quotidien ramène les différences négatives à zéro ; consultez le JSON et la série cumulée pour les révisions à la baisse. La comparaison avec les guerres passées utilise des estimations distinctes de morts militaires, qui ne sont pas directement équivalentes au chiffre du personnel en Ukraine comprenant les tués et les blessés.

### Structure du dépôt
Le dépôt contient le jeu de données, les fichiers de schéma, et le [site de documentation](https://www.ukrainewarlosses.com/fr), ainsi que d'autres fichiers de support.

```
orc-losses/
├─ .github/ (Fichiers de support GitHub)
├─ docs/ (Source du site de documentation)
├─ schema/ (Fichiers de schéma JSON)
├─ russian-losses.json (Jeu de données/instance JSON)
```

</details>

---

## 🇩🇪 Deutsch
<details id="deutsch" open>
<summary>Russische Verluste in der Ukraine</summary>

### Über
Ein Open-Source-Datensatz ([MIT](https://github.com/lod-db/orc-losses/blob/main/LICENSE.md)), der die Kriegsverluste der Russischen Föderation in der Ukraine seit der groß angelegten Invasion 2022 verfolgt. Die Daten enthalten offizielle Schätzungen, veröffentlicht vom [Verteidigungsministerium der Ukraine](https://mod.gov.ua) und dem Generalstab der ukrainischen Streitkräfte auf [Telegram](https://t.me/GeneralStaffZSU) und [Facebook](https://www.facebook.com/GeneralStaff.ua), einschließlich archivierter Berichte. Erhebung, historische Ergänzungen und Korrekturen werden in der [Methodik](#methodik) erläutert. Eine visuelle Darstellung der Daten ist auf [www.ukrainewarlosses.com](https://www.ukrainewarlosses.com/de) verfügbar.

### Datensatz
Der Datensatz wird als JSON-Datei, [russian-losses.json](https://github.com/lod-db/orc-losses/blob/main/russian-losses.json), gepflegt und täglich aktualisiert. Detaillierte Informationen zu jedem Dateneintrag finden Sie im JSON-Schema, [russische-verluste.de.schema.json](https://github.com/lod-db/orc-losses/blob/main/schema/russische-verluste.de.schema.json).

### Methodik

#### Quellen und Erhebung

Das [Verteidigungsministerium (MoD)](https://mod.gov.ua) veröffentlicht die vom Generalstab erstellten täglichen Verlustberichte erneut. Bevorzugen Sie einen vollständigen ukrainischen MoD-Artikel, dessen Zahlen mit dem Bericht des Generalstabs übereinstimmen. Ist er nicht verfügbar, verwenden Sie eine datierte Aufnahme der [Wayback Machine](https://web.archive.org) oder den englischen MoD-Artikel, gegebenenfalls als archivierte Kopie. Wenn kein brauchbarer MoD-Artikel existiert oder die MoD-Versionen einen Druckfehler enthalten, prüfen Sie zuerst den [Telegram-Kanal des Generalstabs](https://t.me/GeneralStaffZSU), dann einen direkten [Facebook-Beitrag des Generalstabs](https://www.facebook.com/GeneralStaff.ua). Beide liefern offizielle Texte und Infografiken. Prüfen Sie den vollständigen Bericht und sein Datum: Beiträge können geändert oder ersetzt werden.

Das separate Projekt [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) ruft MoD-Artikel über eine auf Azure gehostete API ab und verarbeitet sie. Geplante GitHub-Actions-Läufe laden den Datenfeed herunter und öffnen Update-PRs für neuere Berichtsdatumswerte, mit automatischer Genehmigung und Zusammenführung nach erfolgreichen Pflichtprüfungen. Vorhandene Einträge bleiben erhalten; historische Lücken und Korrekturen werden gesondert geprüft.

#### Bedeutung der Einträge

Die Einträge sind vom neuesten zum ältesten geordnet. `date` bezeichnet das Berichtsdatum, nicht das Erhebungs- oder Archivierungsdatum; `sourceUri` verweist auf den konkreten offiziellen Bericht oder dessen archivierte Kopie. Jede Zahl ist ein kumulierter Gesamtwert seit dem 24. Februar 2022. Personalverluste umfassen gemeldete Gefallene und Verwundete, nicht nur Todesfälle. Es handelt sich um Schätzungen einer Kriegspartei, die gerundet, verzerrt oder revidiert sein können; der Vergleich von Kopien prüft Übertragung und Konsistenz, nicht einzelne Verluste auf dem Schlachtfeld.

`null` bedeutet nicht verfügbar oder nach historischen Datensatzkonventionen ausgeschlossen, nicht den Zahlenwert 0. Behalten Sie diese Konventionen bei Ergänzungen bei: Vor dem 30. April 2022 schließt `unarmoredVehicles` separat aufgeführte Tankfahrzeuge aus, und `specialEquipment` sowie `missiles` sind `null`. U-Boote sind vor ihrer ersten Aufnahme am 14. September 2023 `null`. Der erste Eintrag vom 27. Februar 2022 fasst den 24.–26. Februar zusammen; frühere Teilmeldungen erlauben keine verlässliche Aufteilung nach Tagen.

#### Historische Ergänzungen, Korrekturen und Validierung

Ergänzen Sie fehlende Daten anhand tatsächlicher offizieller Berichte, niemals durch Interpolation. Vergleichen Sie betroffene Felder mit dem offiziellen Text oder der Infografik desselben Tages und möglichst mit einer separat gefundenen offiziellen Kopie. Prüfen Sie, ob der vorherige Gesamtwert plus der veröffentlichten Tagesänderung den aktuellen Gesamtwert ergibt und ob der nächste Bericht die Folge fortsetzt. Prüfen Sie bei Lücken jeden ergänzten Tag und beide vorhandenen Randwerte. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) und [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) helfen beim Auffinden von Abweichungen, sind aber sekundäre Kopien, die Fehler enthalten oder Revisionen zurückdatieren können.

Korrigieren Sie Übertragungs- und Druckfehler anhand offizieller Belege. Verwenden Sie dokumentierte offizielle Korrekturen desselben Tages; erfassen Sie spätere Revisionen am Veröffentlichungsdatum, ohne frühere Berichte für eine stetig steigende Folge umzuschreiben. Berechtigte Revisionen können Gesamtwerte verringern oder einer gedruckten Tagesänderung widersprechen. Rechenprüfungen allein rechtfertigen keine Korrektur. Dokumentieren Sie Datum, Felder, alte und neue Werte, Primärquellen und Ausnahmen im PR. Manche korrigierten Einträge behalten eine MoD-`sourceUri`, die weiterhin den Druckfehler enthält; der Korrektur-PR und die Git-Historie liefern die Belege.

Der Workflow `verify-json` validiert alle fünf Schemas, prüft Änderungsgrenzen aber **nur für die beiden neuesten Einträge**. Historische Änderungen erfordern zusätzlich Quellenprüfungen, eindeutige Datumswerte, absteigende Reihenfolge und die umliegende Tagesfolge; wenden Sie die Änderungsgrenzen auf den betroffenen Zeitraum an und erläutern Sie Ausnahmen. Ergänzungen lassen vorhandene Einträge unverändert; Korrekturen betreffen nur belegte Felder. Beispiele sind die Ergänzungen für [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796) und [2024](https://github.com/lod-db/orc-losses/pull/794) sowie eine [Korrekturprüfung der gesamten Historie](https://github.com/lod-db/orc-losses/pull/791). Hinweise zur Einreichung stehen im [Beitragsleitfaden (Englisch)](CONTRIBUTORS.md).

#### Berechnungen der Website

Differenzen kumulierter Einträge umfassen den gesamten Zeitraum zwischen den Berichtsdatumswerten. Diagramme interpolieren fehlende Tage zwischen verfügbaren Gesamtwerten ungleich `null` und kennzeichnen diese Punkte sowie betroffene Tagesdifferenzen als Schätzungen (`≈`); diese Werte werden niemals im Datensatz gespeichert. Überprüfte Ergänzungen ersetzen sie automatisch. Das Tagesdiagramm setzt negative Differenzen auf null; für Abwärtsrevisionen sind die JSON-Datei und die kumulierte Reihe maßgeblich. Der Vergleich mit früheren Kriegen verwendet separate Schätzungen militärischer Todesopfer, die nicht direkt mit der Ukraine-Personalzahl einschließlich Gefallener und Verwundeter vergleichbar sind.

### Repository-Struktur
Das Repository enthält den Datensatz, die Schemas und die [Dokumentationswebsite](https://www.ukrainewarlosses.com/de) sowie andere unterstützende Dateien.

```
orc-losses/
├─ .github/ (GitHub-Support-Dateien)
├─ docs/ (Dokumentations-Webseitenquelle)
├─ schema/ (JSON-Schema-Dateien)
├─ russian-losses.json (JSON-Datensatz/Instanz)
```

</details>

---

## 🇺🇦 Українська
<details id="українська" open>
<summary>Втрати Росії в Україні</summary>

### Про
Відкритий набір даних ([MIT](https://github.com/lod-db/orc-losses/blob/main/LICENSE.md)), що відстежує військові втрати Російської Федерації в Україні з моменту повномасштабного вторгнення в 2022 році. Дані містять офіційні оцінки, опубліковані [Міністерством оборони України](https://mod.gov.ua) та Генеральним штабом Збройних сил України в [Telegram](https://t.me/GeneralStaffZSU) і [Facebook](https://www.facebook.com/GeneralStaff.ua), зокрема архівні звіти. Збір даних, заповнення історичних прогалин і виправлення описано в [методології](#методологія). Візуальне зображення даних доступне на [www.ukrainewarlosses.com](https://www.ukrainewarlosses.com/ua).

### Набір даних
Набір даних підтримується у форматі JSON, [russian-losses.json](https://github.com/lod-db/orc-losses/blob/main/russian-losses.json), і оновлюється щодня. Детальна інформація про кожну одиницю даних доступна в JSON-схемі, [втрати-росії.uk.schema.json](https://github.com/lod-db/orc-losses/blob/main/schema/%D0%B2%D1%82%D1%80%D0%B0%D1%82%D0%B8-%D1%80%D0%BE%D1%81%D1%96%D1%97.uk.schema.json).

### Методологія

#### Джерела та збір даних

[Міністерство оборони (Міноборони)](https://mod.gov.ua) передруковує щоденні звіти про втрати, які готує Генеральний штаб. Надавайте перевагу повній статті Міноборони українською, що узгоджується зі звітом Генерального штабу. Якщо вона недоступна, використовуйте датовану копію з [Wayback Machine](https://web.archive.org) або англомовну статтю Міноборони, зокрема архівну. Коли придатної статті Міноборони немає або її версії містять друкарську помилку, спершу звертайтеся до [Telegram-каналу Генерального штабу](https://t.me/GeneralStaffZSU), потім до прямого [допису Генерального штабу у Facebook](https://www.facebook.com/GeneralStaff.ua). Обидва надають офіційні тексти й інфографіку. Перевіряйте повний звіт і його дату: дописи можуть бути відредаговані або замінені.

Окремий проєкт [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) отримує та обробляє статті Міноборони через API, розміщений на Azure. Заплановані запуски GitHub Actions завантажують його дані й відкривають запити на злиття для новіших дат звітів, з автоматичним схваленням і злиттям після проходження обов'язкових перевірок. Наявні записи зберігаються; історичні прогалини та виправлення потребують окремого розгляду.

#### Тлумачення записів

Записи впорядковано від найновішого до найстарішого. `date` — дата звіту, а не збору даних чи архівної копії; `sourceUri` посилається на конкретний офіційний звіт або його архівну копію. Кожне число — накопичений підсумок від 24 лютого 2022 року. Особовий склад означає заявлені втрати (вбиті та поранені), а не лише загиблих. Це оцінки сторони війни, які можуть бути округлені, упереджені або уточнені; звіряння копій перевіряє правильність перенесення й узгодженість, а не окремі втрати на полі бою.

`null` означає відсутність даних або виключення за історичними правилами набору, а не нуль. Зберігайте ці правила, заповнюючи прогалини: до 30 квітня 2022 року `unarmoredVehicles` не включає окремо зазначені паливні цистерни, а `specialEquipment` і `missiles` мають значення `null`. Підводні човни мають значення `null` до першого включення 14 вересня 2023 року. Перший запис від 27 лютого 2022 року об'єднує дані за 24–26 лютого; попередні часткові зведення не дають змоги надійно розподілити їх за днями.

#### Заповнення прогалин, виправлення та перевірка

Заповнюйте відсутні дати фактичними офіційними звітами, ніколи не інтерполяцією. Звіряйте змінювані поля з офіційним текстом або інфографікою за ту саму дату та, за можливості, з окремо знайденою офіційною копією. Перевіряйте, що попередній підсумок плюс опублікована добова зміна дорівнює поточному підсумку, а наступний звіт продовжує цей ланцюжок. Для прогалин перевіряйте кожну додану дату й обидва наявні крайні записи. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) і [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) допомагають знайти розбіжності, але є вторинними копіями, які можуть містити помилки або переносити уточнення на попередні дати.

Виправляйте помилки перенесення й друкарські помилки на основі офіційних доказів. Використовуйте задокументовані офіційні виправлення того самого дня; пізніші уточнення записуйте на дату їх публікації, не переписуючи попередні звіти заради плавного зростання підсумків. Обґрунтовані уточнення можуть зменшувати підсумки або не узгоджуватися з надрукованою добовою зміною. Самої арифметики недостатньо для виправлення. Зберігайте в запиті на злиття дати, поля, старі й нові значення, посилання на першоджерела та винятки. Деякі виправлені записи зберігають `sourceUri` Міноборони, де помилка лишилася; докази наведено в запиті на злиття та історії Git.

Процес `verify-json` перевіряє всі п'ять схем, але межі змін перевіряє **лише для двох найновіших записів**. Історичні зміни також потребують звіряння джерел, унікальності дат, порядку від найновіших до найстаріших і навколишнього добового ланцюжка; застосовуйте межі змін до відповідного періоду та пояснюйте винятки. Заповнення прогалин не змінює наявних записів; виправлення змінюють лише підтверджені поля. Нещодавні приклади: доповнення за [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796) і [2024](https://github.com/lod-db/orc-losses/pull/794) роки та [перевірка виправлень за всю історію](https://github.com/lod-db/orc-losses/pull/791). Вимоги до подання наведено в [посібнику для внесків (англійською)](CONTRIBUTORS.md).

#### Розрахунки вебсайту

Різниці між накопиченими підсумками охоплюють увесь проміжок між датами звітів. Графіки інтерполюють відсутні дати між наявними підсумками зі значеннями, відмінними від `null`, і позначають ці точки та відповідні добові різниці як оцінки (`≈`); ці значення ніколи не зберігаються в наборі даних. Перевірені доповнення автоматично їх замінюють. Добовий графік обмежує від'ємні різниці нулем, тому для уточнень у бік зменшення звертайтеся до JSON і накопиченого ряду. Порівняння з минулими війнами використовує окремі оцінки загиблих військових, які не є прямо еквівалентними показнику особового складу в Україні, що включає вбитих і поранених.

### Структура репозиторію
Репозиторій містить набір даних, схеми, а також [вебсайт документації](https://www.ukrainewarlosses.com/ua) і інші допоміжні файли.

```
orc-losses/
├─ .github/ (Файли підтримки GitHub)
├─ docs/ (Джерело вебсайту документації)
├─ schema/ (Файли JSON-схем)
├─ russian-losses.json (JSON набір даних/екземпляр)
```

</details>

---

## 🇷🇺 Русский
<details id="русский" open>
<summary>Потери России в Украине</summary>

### О проекте
Открытый набор данных ([MIT](https://github.com/lod-db/orc-losses/blob/main/LICENSE.md)), отслеживающий военные потери Российской Федерации в Украине с момента начала полномасштабного вторжения в 2022 году. Данные содержат официальные оценки, опубликованные [Министерством обороны Украины](https://mod.gov.ua) и Генеральным штабом Вооружённых сил Украины в [Telegram](https://t.me/GeneralStaffZSU) и [Facebook](https://www.facebook.com/GeneralStaff.ua), включая архивные отчёты. Сбор данных, заполнение исторических пробелов и исправления описаны в [методологии](#методология). Визуальное представление данных доступно на [www.ukrainewarlosses.com](https://www.ukrainewarlosses.com/ru).

### Набор данных
Набор данных поддерживается в формате JSON, [russian-losses.json](https://github.com/lod-db/orc-losses/blob/main/russian-losses.json), и обновляется ежедневно. Подробная информация о каждом пункте данных представлена в JSON-схеме, [потери-россии.ru.schema.json](https://github.com/lod-db/orc-losses/blob/main/schema/%D0%BF%D0%BE%D1%82%D0%B5%D1%80%D0%B8-%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8.ru.schema.json).

### Методология

#### Источники и сбор данных

[Министерство обороны (Минобороны)](https://mod.gov.ua) перепечатывает ежедневные отчёты о потерях, которые готовит Генеральный штаб. Предпочитайте полную статью Минобороны на украинском языке, согласующуюся с отчётом Генерального штаба. Если она недоступна, используйте датированную копию из [Wayback Machine](https://web.archive.org) или англоязычную статью Минобороны, в том числе архивную. Когда подходящей статьи Минобороны нет или её версии содержат опечатку, сначала обращайтесь к [Telegram-каналу Генерального штаба](https://t.me/GeneralStaffZSU), затем к прямой [публикации Генерального штаба в Facebook](https://www.facebook.com/GeneralStaff.ua). Оба предоставляют официальные тексты и инфографику. Проверяйте полный отчёт и его дату: публикации могут быть отредактированы или заменены.

Отдельный проект [orc-losses-scraper](https://github.com/lod-db/orc-losses-scraper) получает и обрабатывает статьи Минобороны через API, размещённый на Azure. Запланированные запуски GitHub Actions загружают его данные и открывают запросы на слияние для более новых дат отчётов, с автоматическим одобрением и слиянием после прохождения обязательных проверок. Существующие записи сохраняются; исторические пробелы и исправления требуют отдельного рассмотрения.

#### Толкование записей

Записи упорядочены от самых новых к самым старым. `date` — дата отчёта, а не сбора данных или архивной копии; `sourceUri` ссылается на конкретный официальный отчёт или его архивную копию. Каждое число — накопленный итог с 24 февраля 2022 года. Личный состав означает заявленные потери (убитые и раненые), а не только погибших. Это оценки стороны войны, которые могут быть округлены, предвзяты или уточнены; сверка копий проверяет правильность переноса и согласованность, а не отдельные потери на поле боя.

`null` означает отсутствие данных или исключение по историческим правилам набора, а не ноль. Сохраняйте эти правила при заполнении пробелов: до 30 апреля 2022 года `unarmoredVehicles` не включает отдельно указанные топливные цистерны, а `specialEquipment` и `missiles` имеют значение `null`. Подводные лодки имеют значение `null` до первого включения 14 сентября 2023 года. Первая запись от 27 февраля 2022 года объединяет данные за 24–26 февраля; предыдущие частичные сводки не позволяют надёжно распределить их по дням.

#### Заполнение пробелов, исправления и проверка

Заполняйте отсутствующие даты фактическими официальными отчётами, никогда не интерполяцией. Сверяйте изменяемые поля с официальным текстом или инфографикой за ту же дату и, по возможности, с отдельно найденной официальной копией. Проверяйте, что предыдущий итог плюс опубликованное суточное изменение равняется текущему итогу, а следующий отчёт продолжает эту цепочку. Для пробелов проверяйте каждую добавленную дату и обе существующие крайние записи. [Minfin](https://index.minfin.com.ua/en/russian-invading/casualties/) и [russianwarship.rip](https://russianwarship.rip/api/v2/statistics) помогают найти расхождения, но являются вторичными копиями, которые могут содержать ошибки или переносить уточнения на предыдущие даты.

Исправляйте ошибки переноса и опечатки на основании официальных доказательств. Используйте задокументированные официальные исправления того же дня; последующие уточнения записывайте на дату их публикации, не переписывая предыдущие отчёты ради плавного роста итогов. Обоснованные уточнения могут уменьшать итоги или не согласовываться с напечатанным суточным изменением. Одной арифметики недостаточно для исправления. Сохраняйте в запросе на слияние даты, поля, старые и новые значения, ссылки на первоисточники и исключения. Некоторые исправленные записи сохраняют `sourceUri` Минобороны, где опечатка осталась; доказательства приведены в запросе на слияние и истории Git.

Процесс `verify-json` проверяет все пять схем, но границы изменений проверяет **только для двух самых новых записей**. Исторические изменения также требуют сверки источников, уникальности дат, порядка от новых к старым и окружающей суточной цепочки; применяйте границы изменений к соответствующему периоду и объясняйте исключения. Заполнение пробелов не меняет существующих записей; исправления затрагивают только подтверждённые поля. Недавние примеры: дополнения за [2022](https://github.com/lod-db/orc-losses/pull/797), [2023](https://github.com/lod-db/orc-losses/pull/796) и [2024](https://github.com/lod-db/orc-losses/pull/794) годы и [проверка исправлений за всю историю](https://github.com/lod-db/orc-losses/pull/791). Требования к подаче приведены в [руководстве по внесению изменений (на английском)](CONTRIBUTORS.md).

#### Расчёты сайта

Разницы между накопленными итогами охватывают весь промежуток между датами отчётов. Графики интерполируют отсутствующие даты между имеющимися итогами со значениями, отличными от `null`, и отмечают эти точки и соответствующие суточные разницы как оценки (`≈`); эти значения никогда не сохраняются в наборе данных. Проверенные дополнения автоматически их заменяют. Суточный график ограничивает отрицательные разницы нулём, поэтому для уточнений в сторону уменьшения обращайтесь к JSON и накопленному ряду. Сравнение с прошлыми войнами использует отдельные оценки погибших военных, которые не являются прямо эквивалентными показателю личного состава в Украине, включающему убитых и раненых.

### Структура репозитория
Репозиторий содержит набор данных, схемы, а также [вебсайт документации](https://www.ukrainewarlosses.com/ru) и другие вспомогательные файлы.

```
orc-losses/
├─ .github/ (Файлы поддержки GitHub)
├─ docs/ (Исходники вебсайта документации)
├─ schema/ (Файлы JSON-схем)
├─ russian-losses.json (JSON набор данных/экземпляр)
```

</details>
