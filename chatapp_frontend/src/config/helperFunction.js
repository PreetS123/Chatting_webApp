export default function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const { label, seconds: unitSeconds } of intervals) {
        const value = Math.floor(seconds / unitSeconds);
        if (value >= 1) {
            return rtf.format(-value, label);
        }
    }
    return "just now";
}

// Usage examples:
console.log(timeAgo("2024-02-28T10:30:00"));  // Example date input
console.log(timeAgo(new Date(Date.now() - 3600000))); // 1 hour ago
