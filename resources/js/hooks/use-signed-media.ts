import axios from 'axios';
import { useState } from 'react';

export function useSignedMedia() {
    const [loadingUUID, setLoadingUUID] = useState<string | null>(null);

    const openMedia = async (uuid: string) => {
        const win = window.open('', '_blank');

        if (!win) {
            alert('Please allow popups for this site');

            return;
        }

        try {
            setLoadingUUID(uuid);

            const res = await axios.post<{ url: string }>(`/api/v1/media/${uuid}/signed-url`);

            win.location.href = res.data.url;
        } catch (error) {
            console.error('Signing failed:', error);
            win.close();
            alert('Could not generate secure link.');
        } finally {
            setLoadingUUID(null);
        }
    };

    return { openMedia, loadingUUID };
}
