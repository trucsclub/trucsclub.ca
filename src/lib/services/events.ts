import type { Repeat } from '$lib/types/common';
import type { EventTimeDate } from '$lib/types/event';

export function repeatEvent(event: EventTimeDate): EventTimeDate[] {
	if (!event.repeat) return [event];
	const { times, every, unit } = event.repeat;

	// Pick which date component we are incrementing
	let dateAccessors: {
		get: (date: Date) => number;
		set: (date: Date, value: number) => void;
	};
	switch (unit) {
		case "hours":
			dateAccessors = {
				get: (date) => date.getHours(),
				set: (date, value) => date.setHours(value)
			};
			break;
		case "days":
		case "weeks":
			dateAccessors = {
				get: (date) => date.getDate(),
				set: (date, value) => date.setDate(value)
			};
			break;
		default:
			return [event];
	}

	const result: EventTimeDate[] = [];
	for (let value = 0; value < times; value++) {
		const newEvent = { ...event };
		const baseDate = new Date(event.time);

		let increment = every * value;
		if (unit === "weeks") increment *= 7;

		const currentValue = dateAccessors.get(baseDate);
		dateAccessors.set(baseDate, currentValue + increment);
		newEvent.time = baseDate;
		delete newEvent.repeat;

		result.push(newEvent);
	}
	return result;
}

export function getLastDate(start: Date, repeat: Repeat): Date {
    if (repeat.times == 0) {
        return new Date(start);
    }
	
    const result = new Date(start);
    switch (repeat.unit) {
        case 'hours':
            result.setHours(result.getHours() + repeat.every * repeat.times);
            break;
        case 'days':
            result.setDate(result.getDate() + repeat.every * repeat.times);
            break;
        case 'weeks':
            result.setDate(result.getDate() + repeat.every * repeat.times * 7);
            break;
    }
    return result;
}
