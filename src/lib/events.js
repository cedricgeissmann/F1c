/**
 * Zentrale Events/Veranstaltungen der Klasse
 * Diese Daten können leicht erweitert und angepasst werden
 */

export const events = [
	{
		title: 'Klassentag',
		date: '25. August',
		startDate: '2025-08-25',
		description: 'Information zum Klassentag wird hier ergänzt.',
		icon: '📅'
	},
	{
		title: 'Klassenlager',
		date: '21. - 25. September',
		startDate: '2025-09-21',
		endDate: '2025-09-25',
		description: 'Informationen zum Klassenlager werden hier ergänzt.',
		icon: '⛺'
	}
];

/**
 * Prüft ob ein Event in der Zukunft liegt
 */
export function isUpcoming(event) {
	const end = event.endDate || event.startDate;
	return new Date(end) > new Date();
}

/**
 * Formatieren eines Datums für die Anzeige
 */
export function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString('de-DE', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
