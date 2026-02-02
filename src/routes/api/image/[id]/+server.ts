import { error } from '@sveltejs/kit';

export async function GET({ params }) {
    // const imageSize = 512; // Make modifiable through Description json later on.
	const res = await fetch(
		`https://drive.google.com/uc?export=view&id=${params.id}`,
        // https://drive.google.com/thumbnail?id=${image.fileId}&sz=s${imageSize}
		{
			headers: {
				'User-Agent': 'Mozilla/5.0' // helps with Drive
			}
		}
	);

	if (!res.ok || !res.body) {
		throw error(502, 'Failed to fetch image from Google Drive');
	}

    console.log(res)

	return new Response(res.body, {
		headers: {
			'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
			'Cache-Control': 'public, max-age=86400, immutable'
		}
	});
}
