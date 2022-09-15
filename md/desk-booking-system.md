# Desk Booking System
 
## Intro
 
Die Thematik meiner Abschlussarbeit an der Coding School am Wörthersee war eine Single Page Application mit Hilfe eines Modernen Java Script Frameworks zu programmieren, so wie eine Zusammenarbeit im Team über die Plattform Gitlab. Das Backend das dafür benötigt wird wurde von der Schule zur Verfügung gestellt und der Frontend Part war dann die Aufgabe von meinem Team. Die Zusammenarbeit im Team wird später noch weiter erläutert. Zuerst möchte ich den Fokus auf die App legen.
 
 
 
## Worum geht es
 
Das Desk Booking System ist eine Webapp die es Mitarbeitern eines Betriebes ermöglicht, einen Arbeitsplatz zu mieten. Dabei haben sie folgende Möglichkeiten zur Auswahl:
 
- einen Arbeitsplatz nur für einen kurzen Zeitraum zu mieten => die Zeitdauer ist auf maximal 3 Tage limitiert
- einen Arbeitsplatz für einen längeren Zeitraum zu mieten => hier gibt es kein Zeitlimit und ein Tisch wird unbefristet gebucht.
 
Ein Arbeitsplatz für einen kurzen Zeitraum wird als Flex Desk bezeichnet und kann ohne die Zustimmung eines Administrators gebucht werden.
 
Ein unbefristeter Arbeitsplatz wird als Fix Desk bezeichnet und erfordert die Zustimmung eines Administrators.
 
Insgesamt sind 4 Räumlichkeiten mit 96 Arbeitsplätzen vorhanden, deren Verfügbarkeit sich nach den aktuellen Reservierungen richtet.
 
 
 
## Verwendete Technologien und Konzepte
 
Zur Umsetzung der App haben wir uns für diese Technologien und Konzepte entschieden :
 
- Gitlab für die gemeinsame Arbeit am Code und für die Projektplanung
- Figma für den Mockup und Design Entwurf
- React als JS Framework
- Vanilla Java Script für die Logik - es wäre auch Typescript möglich gewesen
- SASS für das Styling
- Fetch Api zur Kommunikation mit dem Backend
- Postman um mit dem Backend vertraut zu werden und es zu testen
- React Loader spinner um einen Ladevorgang anzuzeigen
 
 
 
## Aufbau und die Verwendung der App
 
### Allgemeine Startseite
 
So fängt alles an.
 
Damit ein Mitarbeiter die App nutzen kann, muss er sich zuerst einmal registrieren und im Anschluss daran anmelden. Bei erfolgreicher Anmeldung erhält er einen Token der es ihm ermöglicht, auf die Funktionalitäten der App zuzugreifen. Der Token wird in das Local Storage gespeichert und wird dann ausgelesen, wenn er zur Authentifizierung bei den einzelnen Fetch Requests benötigt wird(was auf jeden Request zutrifft). Er erhält bei dieser Anmeldung auch eine ID , die ebenfalls in das Local Storage gespeichert wird, um später für verschiedene Funktionen schnell ausgelesen werden zu können. Mit diesen zwei Parametern werden dann die gesamten Userinformationen von der API geholt, um festzustellen, ob ein Benutzer die Rolle eines Administrators besitzt, oder ob er ein gewöhnlicher User ist.
 
Für den Appflow spielt diese Feststellung eine ganz wesentliche Rolle =>
 
 
### Der Flow eines Users
 
#### User Landing Page
 
Ein normaler User wird auf die User Landing Page geleitet, nachdem er sich angemeldet hat oder wenn er die Seite neu besucht und sein Token noch im Local Storage hinterlegt ist und eine Gültigkeit besitzt. In seiner Navigation befinden sich nur die Bereiche die für einen User von Bedeutung sind.
 
Auf der User Landing Page erhält ein Benutzer eine Übersicht über seine nächsten drei anstehenden Reservierungen, insofern welche vorhanden sind.
 
#### Reservierungen
 
Der erste Navigationseintrag führt zur **Reservierungen** Seite, wo alle ausstehenden, so wie alle alten Reservierungen aufgelistet sind. Zukünftige Flex Desk Buchungen kann ein Benutzer bis zum letzten Tag vor Beginn der Buchung stornieren. (Fix Desk Buchungen scheinen nicht auf)
 
Bei den alten Buchungen besteht die Möglichkeit einem Arbeitsplatz ein Kommentar hinzuzufügen, wenn es zum Beispiel irgendetwas zu bemängeln gibt. War man total zufrieden mit einem Platz, kann man ihn hier als Favorit markieren um später darauf schneller zugreifen zu können.
 
#### Favoriten
 
Der nächste Menüpunkt verlinkt zur **Favoriten** Seite. Hier findet ein User alle Arbeitsplätze aufgelistet, die er als Favorit markiert hat und kann diese bei Bedarf auch wieder aus dieser Liste entfernen. Bei jedem Tisch ist auch eine Information vorhanden, ob dieser gerade eine Fix Desk Buchung besitzt , wodurch der Tisch dann nicht gebucht werden kann.
 
Ein weiterer Bestandteil dieser Seite ist eine Suchfunktion mit der er nach freien Favoriten zu einem bestimmten Zeitpunkt suchen kann. Er kann festlegen ob er einen Fix oder Flex Desk Tisch buchen möchte und das Zeitfenster, in welchem er einen Tisch benötigt.
 
Benötigt er für einen längeren Zeitraum einen Arbeitsplatz muss er die vorausgewählte Option Fix Desk beibehalten und kann dann im ersten Date Element den Tag auswählen ab welchen er einen Tisch benötigt. Das zweite Kalender Element, bei welchem man den letzten Tag für eine Reservierung auswählt, bleibt deaktiviert.
 
Sucht der Benutzer nach einem Arbeitsplatz für einen kurzen Zeitraum, muss er auf Flex Desk switchen und sich ein Startdatum im ersten Kalenderfeld auswählen. Nachdem er den Startzeitpunkt seiner Reservierung festgelegt hat, wird das zweite Kalender-Element aktiviert und der User kann sich hier den letzten Tag seiner Reservierung auswählen. Basierend auf dem eingegebenen Startzeitpunkt, werden alle Tage des Kalenders deaktiviert, die nicht in das Zeitfenster von 3 Tagen passen.
 
Aufgelistet werden dann wirklich nur die Arbeitsplätze die er aktuell als Favorit gekennzeichnet hat.
 
#### Tisch buchen
 
Die nächste Option die ein Benutzer hat, ist eine allgemeine Suche nach einem Arbeitsplatz. Beim Aufruf dieser Seite ist zunächst nur der Suchbereich sichtbar.
 
Die Suchfunktion ist gleich aufgebaut wie die bei den Favoriten, mit dem Unterschied, dass hier der Favoriten Filter wegfällt und ihm alle zur Verfügung stehenden Tische angezeigt werden, die seinen Suchkriterien entsprechen.
 
Ein weiterer Unterschied ist auch die Darstellung eines freien Arbeitsplatzes. Hier hat ein User die Option sich Informationen über einen Tisch anzeigen zu lassen. Diese Funktion fällt bei der Favoriten Suche weg, da ein Benutzer ja schon Erfahrung mit diesem Arbeitsplatz gemacht hat und diese Informationen für ihn keine Relevanz mehr besitzen.
 
Die Metainformationen über einen Arbeitsplatz beinhalten :
 
- eine Raumübersicht => gibt Aufschluss darüber wo sich der Tisch im Raum befindet
- eine Auflistung des Equipments => liefert die Information was alles am Arbeitsplatz vorhanden ist
- Kommentare => ermöglicht eine Übersicht über etwaige Mängel die es auf diesen Tisch gibt
 
#### Profil
 
Der letzte Bereich der einen normalen Benutzer zur Verfügung steht ist die **Profil** Seite. Hier kann er seine persönlichen Daten und sein Passwort ändern. Es besteht hier auch die Möglichkeit, sich von der App abzumelden.
 
Wenn er einen oder mehrere Punkte seiner persönlichen Informationen ändern will, muss der User in den Bearbeiten Modus wechseln, was er durch den Bearbeiten Button machen kann. Dadurch werden Input Felder aktiviert, in welche er seine neuen Daten eingeben kann, so wie der Button, um seine neuen Daten zu speichern, wird sichtbar gemacht.
 
Meldet sich der Benutzer von der App ab, werden seine Informationen aus dem Local Storage gelöscht und er wird zur Allgemeinen Startseite weitergeleitet.
 
 
### der Flow eines Admins
 
#### Admin Landing Page / Hot Zone
 
Wenn sich ein Admin erfolgreich einloggt wird er auf die **Admin Landing Page** weitergeleitet und erhält in der Navigation der App ein Drop Down Menü für Bereiche, die den Admin betreffen.
 
Auf der Admin Landing Page erhält er eine schnelle Übersicht über :
 
- neue Kommentare die Nutzer Tischen hinzugefügt haben
- unbearbeitete Fix Desk Anfragen
- neu hinzugekommene Benutzer
 
Durch diese Funktionalität sieht ein Admin gleich, welche unerledigten Aufgaben auf ihn warten und er kann sich in die Arbeit stürzen.
Jede dieser Informationsboxen ist gleichzeitig ein Link um direkt in den jeweiligen Admin Bereich zu wechseln.
 
Will ein Administrator später wieder zu dieser Schnellübersicht gelangen, kann er dies unter dem Navigationspunkt **Hot Zone** im Admin Drop Down Menü.
 
#### Kommentare
 
Hier werden alle Kommentare, sortiert nach neuen und alten Beiträgen, aufgelistet. Befindet sich ein Admin auf dieser Seite, wird die aktuelle Anzahl an Kommentaren in das Local Storage gespeichert, um in späterer Folge zwischen neuen und alten Kommentaren unterscheiden zu können.
 
#### Fix Desk Anfragen
 
In diesem Admin Bereich sind alle aktuellen Fix Desk Anfragen aufgelistet, die ein Admin genehmigen oder ablehnen kann. Jede Anfrage enthält Informationen über:
 
- den Raum und den Arbeitsplatz welcher gebucht werden will
- den Name des Users der die Anfrage gestellt hat
- das Datum wann die Anfrage erstellt wurde
 
#### Userliste
 
Auf dieser Seite werden alle registrierten User der App aufgelistet, sortiert nach Usern, die seit der letzten Aktivität des Admins auf dieser Seite neu hinzugekommen sind und Usern, von denen der Admin bereits wissen müsste. Als Zusatzinformation zu jedem User ist auch vermerkt, ob dieser Administratoren Rechte besitzt oder ein gewöhnlicher User ist.
 
Auch hier wird wie auf der Kommentarseite die aktuelle Useranzahl in das Local Storage gespeichert, um den Admin eine Übersicht über die neuen User zu gewährleisten.
 
 
### Abschlussworte zum Aufbau und Verwendung der App
 
Dies war auch schon der letzte Bereich der App. Als nächstes geplant wäre ein Einblick in die Details einiger Funktionen, oder ein direkter Sprung zur Projektplanung und zur Zusammenarbeit.
 
 
 
## einige Funktionalitäten im Fokus
 
 
 
## Projektplanung, Organisation und Zusammenarbeit
 
### Zusammenarbeit
 
An diesem Projekt arbeiteten ich, Reza Hossaini und Reem Abosamra. Die Teambildung blieb uns Studenten überlassen und ich und auch mein Kollege und meine Kollegin wollten in dieser Konstellation zusammenarbeiten. Wir haben schon bei der zweiten Challenge der Coding School zusammengearbeitet und wurden dadurch auch richtige Freunde und ein gut funktionierendes Team.
 
 
### Projektplanung und Organisation
 
#### Initiale Besprechung
 
Bevor wir mit der Programmierung der App begonnen haben, besprachen wir die Anforderungen an die App und einigten uns auf die grundlegenden Technologien und Konzepte, mit welchen wir die App erstellen wollten.
 
Für die Mockup Erstellung und den Design Entwurf entschieden wir uns für Figma, da man damit wirklich sehr gut arbeiten kann und auch eine gemeinsame Bearbeitung im Team ermöglicht.
 
Als Javascript Framework für die Arbeit wählten wir React, da wir damit am meisten Erfahrung hatten.
 
Als Sprache für die Programmierung zogen wir Vanilla Javascript Typescript vor, da wir uns damit sicherer fühlten und uns auf die wesentlichen Anforderungen konzentrieren wollten.
 
Für das Styling der App entschieden wir uns für SASS, da wir alle drei darin ziemlich gut sind und es uns Spaß macht SASS zu verwenden.
 
Als Kommunikationskonzept für die Arbeit mit der API der App entschieden wir uns für die Fetch API, die ein Bestandteil von Java Script ist. Bei unserer zweiten Challenge verwendeten wir Axios, was auch sehr gut funktioniert hat, aber da die Fetch API ein fixer Bestandteil von Java Script ist und wir darin nicht so routiniert waren, wollten wir die Challenge dazu nutzen, diesen Zustand zu korrigieren.
 
(Die React Loader Spinner Komponente, um einen Ladevorgang anzuzeigen, kam dann erst im Laufe der Arbeit am Projekt dazu.)
 
(Für die gemeinsame Arbeit am Code und für die Projektplanung wurde uns von der Schule Gitlab vorgegeben.)
 
Der nächste Punkt, den wir uns ausgeredet haben, betraf die Art und Weise wie wir unsere Zusammenarbeit gestalten wollten und die Aufgabenplanung des Projekts. Wir vereinbarten, dass wir uns jeden Tag zwischen 9 und halb 10 zusammenfinden, kurz vor dem täglichen Meeting mit der Schule, um zu besprechen welche Aufgaben wir an diesem Tag in Angriff nehmen wollten. Wir entschieden uns auch dafür, jeden Tag bis mindestens 16 Uhr das Meeting offen zu halten, um bei Problemstellungen und Fragen schnell miteinander kommunizieren zu können, so wie für ein tägliches Abschlusstreffen zwischen 15 und 16 Uhr bei welchem wir dann unsere Fortschritte und Probleme dieses Tages besprochen haben.
 
Als wir diese Dinge geklärt hatten, fingen wir an die ersten Aufgaben zu verteilen.
 
#### Git und Scrumban
 
Die Projektplanung und Organisation machten wir mit einer Mischung aus Scrum und Kanban, zwei verbreiteten Projektmanagement Systemen, über die Plattform Gitlab.
 
Von Scrum übernahmen wir die Idee des Sprints => ein Zeitfenster in welchem bestimmte Aufgaben erledigt werden sollen
Von Kanban übernahmen wir die Idee der täglichen Aufgaben und der Organisation in Boards und Tickets => Boards unterteilen die Projektplanung in Unterbereiche , wie z.B aktuelle Bearbeitung und abgeschlossene Bereiche. Für einzelne Aufgaben wird ein Ticket erstellt, das man dann durch die verschiedenen Boards schiebt. Für große Themenblöcke gibt es dann die Idee der Meilensteine => z.B. für das Design, die Programmierung, das Testen usw.
 
Unsere Boards waren :
 
- ein Board mit einer Sammlung von Tickets für die noch kein fixes Bearbeitungsdatum festgelegt wurde
- ein Board für die Sprinteinheit, für dessen Länge wir uns für eine Woche entschieden haben => hier verschoben wir zum einen Tickets aus der oben genannten Sammlung, zum anderen erstellten wir hier direkt Tickets die wir in den nächsten 7 Tagen bearbeiten wollten
- ein Board für die aktuellen Aufgaben die gerade erledigt werden => die Tickets aus der Sprinteinheit wurden hierher verlegt
- ein Board für alle Aufgaben die vorübergehend abgeschlossen sind => hier kamen alle Tickets von abgeschlossenen Aufgaben
 
Ein eigenes Board für das Testing (vor den geschlossenen Aufgaben) hatten wir nicht, da jeder von uns seinen Part schon bei der Programmierung gründlich getestet hat. Am Ende des Projektes nahmen wir uns dann aber trotzdem noch 2 Tage um das gesamte Projekt, jeder für sich, zu testen und Bugs, aber auch Verbesserungen zu notieren und dann auszubessern.
 
 
 
## Meine Aufgaben bei dem Projekt
 
Meine Aufgaben bei diesem Projekt waren (chronologisch geordnet):
 
### Teamarbeit Mockup Entwurf =>
 
Das gesamte Team hat gemeinsam den grundlegenden Aufbau der App besprochen => welche Seiten und Bereiche beinhaltet die App und was befindet sich auf jeder Seite. Auch ein grob gehaltenes Layout wurde hier erstellt. Wir arbeiteten alle zeitgleich in Figma und kommunizierten über das Meeting
 
### die Einrichtung des Projekts, Lokal und auch im Gitlab Repository =>
 
Mit npx create-react-app wurde von mir zuerst eine neue React App lokal erstellt, die dann für unsere App modifiziert wurde. Alle unnötigen Files wurden gelöscht und eine grundlegende Ordnerstruktur wurde angelegt. Es wurde ein Developer Branch erstellt in welchem das Projekt gepusht wurde, so dass sich jedes Teammitglied das fundamentale App Setting klonen konnte.
 
### initiale Readme Datei =>
 
Im main Branch erstellte ich eine grundlegende Readme Datei die anfangs folgende Punkte beinhaltete :
- die Funktionalität und die Struktur der App
- einen Entwickler Codex, der Verhaltensregeln von unserem Team beinhaltet, wie z.B. im Repo keinen Code zu verändern den wir alle schon benutzen
- eine Auflistung der Technologien und Konzepte die wir verwenden wollten
 
Im Laufe des Projektes wurde die Readme Datei immer wieder von mir um Punkte erweitert.
 
### Postman Collection =>
 
Um einen guten Überblick über die Funktionalität der API zu erhalten, erstellte ich eine Postman Collection, die alle Endpunkte und Möglichkeiten der API beinhaltet. Die Collection schickte ich dann Portionsweise meiner Crew, damit auch sie mit der API vertraut werden können. In der Readme Datei erstellte ich im Anschluss eine Zusammenfassung der API Endpunkte => die URL des Endpunkts, die HTTP Methode die man verwenden muss, die Parameter die mitübergeben werden müssen
 
### die Routen der App =>
 
Mit React Router erstellte ich die Pfade für unsere Single Page Application.
 
Die Pfadstruktur besteht aus 3 großen Pfaden
- einen für nicht eingeloggte User
- einen für normale User
- einen für Admins
 
Der Pfad für normale Benutzer und für Administratoren beinhaltet dann weitere Routen => die jeweiligen Bereiche, die dieser Rolle zur Verfügung stehen.
 
Für normale Benutzer und auch für die Administratoren wurde die gleiche Layout Komponente erstellt, in welcher dann aber aus dem Storage die Rolle ausgelesen wurde und je nachdem dann die Navigationsmöglichkeiten manipuliert wurden.
 
Zum Simulieren der Wirkungsweise der Routen erstellte ich Dummy Komponenten, so dass das gesamte Team den Aufbau verstehen konnte.
 
### Select Box für den Admin =>
 
Für die Navigation eines Admins zu seinen Arbeitsbereichen erstellte ich eine Select Box welche die Links zu den einzelnen Unterbereichen enthält
 
### Pfad Weiterleitung nach Anmeldung =>
 
In die allgemeine Startseite, auf welcher man sich registrieren und einloggen kann (erstellt von meinen Teamkollegen Reza) baute ich die Pfad Weiterleitung ein, welche einen User zu der User Landingpage bringt und einen Admin zu der Admin Landing Page. Um die Rolle des Benutzers direkt feststellen zu können, sprach ich mit einer Fetch Funktion den API Endpunkt an, welcher alle Informationen eines speziellen Users zurückliefert. Als Parameter dazu brauchte ich die User Id und den Token, die ich aus dem Local Storage ausgelesen habe(bei erfolgreichen Login wurden diese zwei Werte ins Storage gespeichert). Da die speziellen Userinformationen in der gesamten App immer wieder benötigt werden, z.B. auf der Profil Unterseite, erzeugte ich einen weiteren Eintrag ins Local Storage mit diesen Userdaten.
 
Ein weiterer Bestandteil dieser Funktion war auch eine generelle Überprüfung, ob Userdaten im Storage vorhanden sind und dadurch ein eingeloggter User existiert. Falls nein, wurde der tatsächliche Inhalt der Startseite geladen => die Formularfelder zum registrieren und zum einloggen. Falls aber einer existiert, wurde die oben beschriebene Weiterleitung zur speziellen Startseite eingeleitet. Der Sinn dahinter war das ein User dadurch die Möglichkeit hatte auf der App eingeloggt zu bleiben, auch wenn er seine Browser Tabs schließ oder ähnliches(computer shut down).
 
### Admin Navigations Zugriff =>
 
Wurde oben schon kurz angesprochen. Um nur einem Admin Zugriff auf die Admin Navigation zu gewähren, wurde in der Layout Komponente die Rolle des Users ausgelesen und mit dieser in Verbindung stehend die Navigation ein- oder ausgeblendet.
 
### Design Implementierung in der Navigation =>
 
Mit Sass setzte ich die Design Vorlage für die Navigation von meiner Kollegin Reem um. Um einen aktiven Link zu kennzeichnen, verwendete ich die NavLink Komponente von React Router. Mit ihr hat man die Möglichkeit, einen Aktiven von einem passiven Link zu unterscheiden.
 
### Booking Page =>
 
Für die Booking Page Komponente erstellte ich zuerst einmal die Steuerelemente und baute nach und nach deren Funktionalität zusammen.
 
Da die Suche nach einen fixen Arbeitsplatz und einen kurzfristigen Arbeitsplatz verschiedene Funktionalitäten erfordern, erzeugte ich als ersten Schritt einen State (mit dem useState Hook von React) der Aufschluss über die vom User gewünschte Option gibt. Standardmäßig ist der State auf Flex Desk gesetzt, aber kann dann durch eine Benutzereingabe seinen Zustand wechseln (und auch wieder zurück.)
 
Die erste Programmverzweigung die von diesen State abhängig ist, ist das Verhalten und die Funktionsweise der Kalenderelemente durch die ein Benutzer Start und Endzeitpunkt seiner Buchung festlegen kann. Ist der searchedDesk Zustand auf fixDesk gestellt, wird direkt nach Eingabe eines Startdatums die Suche nach verfügbaren Tischen eingeleitet.
 
Ist der searchedDesk Zustand jedoch flexDesk, wird ein anderer Programmzweig eingeschlagen. Nach Eingabe des gewünschten Startzeitpunkts der Reservierung, wird ein maximaler Endzeitpunkt der Reservierung berechnet, da ein Flex Desk nicht länger als 3 Tage gebucht werden kann. Dann wird das Kalenderelement für die Eingabe eines Endzeitpunkts freigeschaltet, wo alle Tage, die vor dem Startzeitpunkt und alle Tage, die das Zeitlimit überschreiten, deaktiviert sind. Nach erfolgreicher Auswahl des letzten Tages der Reservierung, wird auch hier die Suche nach freien Tischen gestartet.
 
Die Suche nach verfügbaren Arbeitsplätzen =>
 
Allgemeines =>
 
Sowohl bei der Suche nach Fixen, als auch bei der Suche nach flexiblen Arbeitsplätzen, wird eine Liste aller Tische sowie eine Liste aller Buchungen benötigt. Diese zwei Listen werden bereits beim Aufruf der Buchungsseite von der API geholt und in einen React State gespeichert.
 
Fix Desk Suche =>
 
Als erstes wird bei der Suche nach einem fixen Arbeitsplatz die Liste aller Tische gefiltert. Ist ein Tisch als Fix Desk gebucht, aktuell so wie auch zukünftig, erhält er ein neues Key Value Paar => fixDeskUserId mit der ID des Users, der diesen Tisch reserviert hat. Da die Suche nach einem unbefristeten Arbeitsplatz inkludiert, dass man diesen Arbeitsplatz auch tatsächlich ohne Zeitlimit mieten kann, können alle diese Tische nicht mehr gebucht werden und es muss nicht weiter nach aktuellen und zukünftigen Reservierungen gefiltert werden. In ein neues Array kommen jetzt alle Tische ohne Fix Desk Buchungen.
 
Als zweites werden dann alle Buchungen gefiltert. Zuerst werden alle Buchungen nach Fix Desk Buchungen und Flex Desk Buchungen sortiert, um in weiterer Folge nur mit den Fix Desk Buchungen weiter zu arbeiten. Eigentlich könnte man sich diesen Arbeitsschritt sparen, da ja ohnehin schon beim vorigen Schritt auf die Fix Desk Buchungen eingegangen worden ist.
 
Aus den übrig gebliebenen Fix Desk Buchungen werden jetzt alle Buchungen herausgefiltert, deren Endtag größer oder gleich wie der ausgewählte Starttag der Reservierung ist. Da dieser Arbeitsplatz dann bereits Reservierungen besitzt, die in das offene Zeitfenster der gewünschten Reservierung fallen, scheiden auch alle diese Tische aus. Es wird ein neues Array mit diesen ausgeschiedenen Tischen erzeugt.
 
Zum Abschluss werden dann alle Tische ohne fixe Buchungen gefiltert => alle diese Tische, deren Desk-ID nicht gleich ist wie eine Desk-ID aus der Liste der Fix Desk Buchungen die in das gewünschte Zeitfenster fallen, werden zurückgegeben => die verfügbaren Tische.
 
Flex Desk Suche =>
 
Bei der Flex Desk Suche werden zuerst alle Buchungen durch gefiltert.  Alle Tische mit Buchungen, deren Start-, End- und der Mittlere Tag der Reservierung, sich mit den Tagen der gewünschten Reservierung überschneiden, scheiden als verfügbare Tische aus. Es wird ein neues Array erzeugt mit all diesen ausgeschiedenen Arbeitsplätzen.
 
Als nächstes werden dann alle Tische sortiert. Alle Tische, deren Desk-ID nicht gleich ist wie die Desk-ID eines der Arbeitsplätze, die ausgeschieden sind, kommen in ein neues Array.
 
Zum Schluss werden diese Tische dann ein letztes Mal gefiltert => alle Tische mit einer Fix Desk User ID scheiden aus. Auch wenn man logischerweise einen Tisch, der erst nach dem gewünschten Zeitraum eine fixe Buchung besitzt, davor noch als Flex Desk reservieren könnte, lässt die API dies nicht zu. Hat ein Tisch eine fixDeskUserId, ist er für alle Buchungen blockiert.
 
Nachdem die gesamte Funktionalität der Seite umgesetzt wurde, realisierte ich das Design und orientierte mich dabei an der vorhandenen Vorlage.
 
### Favoriten Page =>
 
Die Umsetzung der Favoriten Page erfolgte ziemlich gleich wie die der Booking Page, aber mit dem Unterschied, dass hier nicht mit den gesamten Tischen gearbeitet wurde, sondern nur mit denen, welche zu den Favoriten eines Users zählen.
 
Es gibt auch noch zwei weitere Unterschiede :
 
1.) Beim Aufruf dieser Unterseite gibt es zusätzlich zu den Steuerelementen noch eine Liste aller Favoriten des Benutzers. Es besteht hier die Möglichkeit, Arbeitsplätze aus der Favoritenliste zu löschen.
 
2.) Die Darstellung der verfügbaren Tische unterscheidet sich von dem, wie sie auf der Booking Page dargestellt werden. Die Metainformationen über einen Arbeitsplatz kann man hier nicht mehr einsehen, weil der Benutzer ja bereits Erfahrung mit diesem Tisch besitzt und die Raumaufteilung so wie das Equipment kennt. Nachträglich würde ich sagen, dass es schon Sinn machen würde, wenn auch hier alle Metainformationen einsehbar wären, da sich ja das Equipment und die Raumaufteilung ändern kann.
 
Nachdem die Funktionalität aufgebaut war, setzte ich auch hier wieder das Design mit SASS um (und orientierte mich dabei an der Design Vorlage)
 
### Admin Buchungsanfragen =>
 
Hier wird beim Aufruf der Seite die Liste aller Fix Desk Requests von der API geholt. Beim Rendern der Anfragen erhält jede Anfrage einen Button, mit dem der Admin diese Anfrage ablehnen kann, so wie einen Button, mit dem er diese Anfrage genehmigen kann. Beide Buttons erhalten ein Data Attribut mit der Request ID als Wert => sie wird für die Kommunikation mit der API benötigt, um die Anfrage abzulehnen oder zu genehmigen. In der onclick Funktion wird der Data Attribut Wert ausgelesen und der Fetch Funktion mitgegeben.
 
Zum Schluss wurde wieder das Design programmiert.
 
### Die letzten Aktivitäten an der App =>
 
Die letzten Arbeiten an der App betrafen das Testen, gefundene Bugs beheben und das Umsetzen von Responsiven Anpassungen.
 
 
 
## Abschlussworte
 
Tada
 
 
 
 
 
 
 
 

