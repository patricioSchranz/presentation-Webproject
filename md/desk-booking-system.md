# Desk Booking System

## Intro

Die Thematik meiner Abschlussarbeit an der Coding School am Wörthersee war eine Single Page Application mit Hilfe eines Modernen Java Script Frameworks zu programmieren, so wie eine Zusammenarbeit im Team über die Plattform Gitlab. Das Backend das dafür benötigt wird wurde von der Schule zur Verfügung gestellt und der Frontend Part war dann die Aufgabe von meinem Team. Die Zusammenarbeit im Team wird später noch weiter erläutert. Zuerst möchte ich den Fokus auf die App legen.

## Worum geht es

Das Desk Booking System ist eine Webapp die es Mitarbeitern eines Betriebes ermöglicht, einen Arbeitsplatz zu mieten. Dabei haben sie folgende Möglichkeiten zur Auswahl:

- einen Arbeitsplatz nur für einen kurzen Zeitraum zu mieten => die Zeitdauer ist auf maximal 3 Tage limitiert
- einen Arbeitsplatz für einen längeren Zeitraum zu mieten => hier gibt es kein Zeitlimit und ein Tisch wird unbefristet gebucht.

Ein Arbeitsplatz für einen kurzen Zeitraum wird als Flex Desk bezeichnet und kann ohne die Zustimmung eines Administrators gebucht werden.

Ein unbefristeter Arbeitsplatz wird als Fix Desk bezeichnet und erfordert die Zustimmung eines Administrators.

Insgesamt sind 4 Räumlichkeiten mit 96 Arbeitsplätze vorhanden, deren Verfügbarkeit sich nach den aktuellen Reservierungen richtet.



## Verwendete Technologien und Konzepte

Zur Umsetzung der App haben wir uns für diese Technologien und Konzepte entschieden :

- React als JS Framework
- Vanilla Java Script für die Logik - es wäre auch Typescript möglich gewesen
- SASS für das Styling
- Fetch Api zur Kommunikation mit dem Backend
- Postman um mit dem Backend vertraut zu werden und es zu testen
- React Loader spinner um einen Ladevorgang anzuzeigen



## Aufbau und die Verwendung der App

Damit ein Mitarbeiter die App nutzen kann, muss er sich zuerst einmal Registrieren und im Anschluss daran anmelden. Bei erfolgreicher Anmeldung erhält ein Mitarbeiter einen Token der es ihm ermöglicht auf die Funktionalitäten der App zuzugreifen. Der Token wird in das Local Storage gespeichert und wird dann ausgelesen, wenn er zur Authentifizierung bei den einzelnen Fetch Requests benötigt wird(was auf jeden Request zutrifft). Durch den Token kann ein Mitarbeiter auch eindeutig identifiziert werden und damit in Verbindung stehend seine Berechtigungen zur Nutzung der App. Ein normaler User hat keinen Zugriff auf die Administratoren Bereiche. Diese Identifikation spielt auch eine Rolle auf einzelnen User Unterseiten, zum Beispiel auf der Profil Seite oder der Favoriten Seite eines Users. Durch den Token erhält ein User genau seine Informationen ohne dass weitere Identifizierungsmaßnahmen nötig sind.

Auch für den Appflow spielt die Identifizierung eine ganz wesentliche Rolle => 

### Der Flow eines Users

#### User Landing Page

Ein normaler User wird auf die User Landing Page geleitet nachdem er sich angemeldet hat oder wenn er die Seite neu besucht und sein Token noch im Local Storage hinterlegt ist und eine Gültigkeit besitzt. In seiner Navigation befinden sich nur die Bereiche die für einen User von Bedeutung sind.

Auf der User Landing Page erhält ein Benutzer eine Übersicht über seine nächsten drei anstehenden Reservierungen, insofern welche vorhanden sind. 

#### Reservierungen

Der erste Navigationseintrag führt zur **Reservierungen** Seite wo alle ausstehenden, so wie alle alten Reservierungen aufgelistet sind. Zukünftige Flex Desk Buchungen kann ein Benutzer bis zum letzten Tag vor Beginn der Buchung stornieren. (Fix Desk Buchungen scheinen nicht auf)

Bei den alten Buchungen besteht die Möglichkeit einem Arbeitsplatz ein Kommentar hinzuzufügen, wenn es zum Beispiel irgendetwas zu bemängeln gibt. War man total zufrieden mit einen Platz, kann man ihn hier als Favorit markieren um später darauf schneller zugreifen zu können.

#### Favoriten





