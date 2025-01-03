export async function radioStations() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ifox6677/cctv/main/radioStations.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        throw error;
    }
}
