# Desk Booking App

## Intro

Die (Grundthematik) Grundaufgabe von unserer letzten Challenge an der Coding School war, eine Webapp mit Hilfe von einem Java Script Framework zu bauen und dabei im Team zusammenzuarbeiten. Im speziellen ist es darum gegangen, ein Buchungssystem für Arbeitsplätze zu programmieren und wie das ganze genau aufschaut hat, schauen wir uns auf den nächsten Folien an.



## Worum geht es ?



## Meine Aufgaben


### Booging Page

Hier schauen wir uns den Funktionsablauf genauer an.

Beim Klick auf einen von den Buttons mit dem ein Benutzer die gewünschte Art der Buchung aussucht werden zwei States gesetzt.States kommt von React und dabei handelt es sich um Werte, die jedesmal wenn sie sich ändern, ein neues Rendern von Codeabschnitten mit denen diese States in Verbindung stehen auslösen. Einer von den zwei States die mit diesen Buttons verbunden sind, ist der searchState, der auf 0 oder 1 gesetzt sein kann, also einen falsy oder einen truthy Wert hat. Wenn er auf 0 gesetzt ist, bedeutet dass das noch nicht alle für eine Suche relevanten Benutzereingaben vorhanden sind, also das noch kein Start Tag oder bei einer Flex Desk Suche auch kein End Tage gesetzt wurden. Wenn er auf 1 gesetzt ist dann sind alle relevanten Daten vorhanden => das ist dann später eine von zwei Bedingungen um in weiterer Folge die Suchergebnise zu rendern.

Der zweite State der in Verbindungen mit diesen zwei Buttons gesetzt wird ist der, um welche Art der Buchung es sich handelt, also ob der Benutzer nur für eine kurze Zeit oder für einen längeren Zeitraum einen Tisch buchen will. Beim Aufruf der Seite ist der searchedDesk Zustand auf Fix Desk gestellt.

Als nächsten werden dann die Funktion ausgeführt die mit dem Date Element für den Start Tag in Verbindung stehen. Die erste setzt als vorausgewähltes Datum im Kalender den aktuellen Tag, der aber dann vom Benutzer nicht übernommen werden muss. Das setzten von diesem Wert bewirkt aber das alle Tage davor nichtmehr ausgewählt werden können und dadurch nurmehr ein gültiger Start Tag ausgewählt werden kann. Das zweite was dann hier in dieser Funktion passiert ist das auch der Search State wieder auf 0 gesetzt wird und der Wert vom End Tag auf 0 gesetzt wird. Das ist bei einer ersten Eingabe nicht nötig, aber falls der Benutzer später dann doch einen anderen Start Tag haben will, wird so die gesamte Suche resetet.

Die zweite Funktion die mit dem Start Tag Kalender Element verknüpft ist wird ausgelöst wenn der Benutzer einen Start Tag auswählt. Zuerst wird der ausgewählte Tag wird in einen State gespeichert. Dann werden je nachdem ob nach einen Fix oder Flex Desk gesucht wird, verschieden Programmzweige eingeleitet. Wenn es sich um einen Flex Desk handelt, wird das Kalender Element für den End Tag aktviert und der Search State bleibt weiterhin auf 0 gesetzt. Handelt es such um einen Fix Desk, bleibt der Kalender für den End Tag der Buchung deaktiviert, der Search State wird auf 1 gesetzt und der End Tag wird automatisch gesetzt und erhält auch den Start Tag als Wert. Was logisch nicht korrekt ist, aber keinen Einfluss darauf nimmt das dann später das fetchen von freien Tischen richtig funktioniert. Aus heutiger Sicht würde ich ihn weg lassen und die späteren Programmverwzweigungen einfach umschreiben.

Jetz beginnen zwei verschiedenen Wege die der Funktionsablauf einschlagt. Der Fix Desk Zweig überspringt alles was jetz noch für eine Flex Desk Suche wichtig ist und führt dann auch andere fetch und filter Methoden durch. Aber wir schaun uns jetzt nicht sein Code Verlauf an sondern den von einem Flex Desk.

Wenn sich der State von einem Start Tag geändert hat, also wenn er gesetzt wurde, wird eine Variable erzeugt die zum ausgewählten Start Tag zwei Tage hinzuzählt. Dieser Wert wird dann dem max Attribut vom End Tag Kalender Element übergeben, um alle Tage die nach diesen Tag liegen zu blockieren so das ein Benutzer sie nicht auswählen kann. Das min Attribut von dem End Tag Kalender erhält als Wert den ausgewählten Start Tag. Somit kann ein Benutzer dann im Bezug auf die 3 Tage Regelung für einen Flex Desk Tisch, wirklich nur eine gültige Eingabe machen. Wird der End Tag ausgesucht, wird auch er in einen State gespeichert und der Search State auf 1 gesetzt. Dann beginnt die Suche.

#### die Flex Desk Suche

Zuerst werden alle in der Datenbank existierenden Buchungen nach Buchungen durchsucht, die sich mit dem vom Benutzer gewünschten Zeitfenster überschneiden. Die Liste aller Buchungen wurden beim ersten Rendern der Seite im Hintergrund von der API gefetcht, genauso auch die Liste mit allen Tischen die dann später von Bedeutung ist. 

Um alle Überschneidungen zu finden, wird zu den registrierten Start und End Tagen der Buchungen von der Datenbank und auch zu den Start und End Tagen die der Benutzer ausgewählt hat, ein mittlerer Tag berechnet. Danach wird die Liste der Buchungen mit der filter Array Methode nach Überschneidungen durchsucht und alle gefundenen Buchungen werden in ein neues Array gespeichert.

Als nächstes werden dann alle Tische gefiltert. Alle Tische, deren ID nicht gleich ist wie die Tisch ID von den Buchungen die sich überschneiden, werden in ein neues Array gespeichert. 

Dieses Array wird dann noch ein letztes mal nach vorhandenen Fix Desk Buchungen durchsucht, weil diese dann für eine Buchung auch nichtmehr zur Verfügung stehen.

Das Ergebnis nach diesen Schritten ist dann ein Array mit allen verfügbaren Tischen, die dann mit Hilfe der Array map Methode auf der Seite gerendert und in das Dom geschrieben werden.

#### die Fix Desk Suche

Die Fix Desk Suche verläuft ein bisschen anders. Zuerst werden alle im Backend vorhandenen Tische nach Tischen gefiltert die eine Fix Desk Buchung besitzten. Diese Tische scheiden schon einmal als verfügbare Tische aus. Dann werden alle Buchungen nach Fix Desk Buchungen gefiltert. Dieser Schritt könnte eigentlich weggelassen werden.

Als nächstes wird dann bei allen Buchungen die keine Fix Desk Buchung sind, überprüft ob deren Buchungsendtag hinter dem gewünschten Start Tag der Fix Desk Buchung des Benutzers liegt. Wenn ja, scheiden diese Tische als verfügbare Tische aus, weil der User sich ja für einen längeren Zeitraum einen Tisch buchen will und keine Lust hätte den Arbeitsplatz immer wieder für ein paar Tage zu räumen. Alle diese Tische kommen in ein neues Array.

Zu guter letzt werden dann alle Tische ohne eine Fix Desk Buchung, der Liste mit den ausgeschiedenen Buchungen gegenüber gestellt. Alle Tische deren ID nicht gleich ist wie die Tisch ID der Tische aus den ausgeschiedenen Buchungen, sind die verfügbaren Tische und werden als solche zurückgegeben und gerendert.
