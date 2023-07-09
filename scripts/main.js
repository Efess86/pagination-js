document.addEventListener('DOMContentLoaded', () => {
	const itemsPerPage = 10;
	let currentPage = 1;

	async function fetchData(page) {
		try {
			const response = await fetch('data.json');
			console.log(response);

			const data = await response.json();
			const movies = await data.movies1;

			const startIndex = (page - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;


			return movies.slice(startIndex, endIndex).map((item) => ({
				id: item.id,
				title: item.title,
				year: item.year,
				img: item.img,
				plot: item.plot,
				star_rating: item.star_rating,
			}));
		} catch (error) {
			console.error('Data loading error:', error);
			throw error;
		}
	}


	function renderPage(pageData) {
		const paginationElement = document.getElementById('pagination');
		paginationElement.innerHTML = '';

		pageData.forEach((item) => {
			const movieCardElement = document.querySelector('.movie-card').cloneNode(true);

			const titleElement = movieCardElement.querySelector('.title');
			titleElement.textContent = item.title;

			const imgElement = movieCardElement.querySelector('.image');
			imgElement.src = item.img;

			const plotElement = movieCardElement.querySelector('.plot');
			plotElement.textContent = item.plot;

			const starRatingElement = movieCardElement.querySelector('.star-rating');
			starRatingElement.textContent = `Star Rating: ${item.star_rating}`;

			paginationElement.appendChild(movieCardElement);
		});
	}


	function navigateToPage(page) {
		currentPage = page;
		fetchData(currentPage)
			.then((data) => {
				renderPage(data);
			})
			.catch((error) => {
				console.error('Fetching data error!', error);
			});
	}

	navigateToPage(currentPage);

	document.getElementById('prevButton').addEventListener('click', () => {
		if (currentPage > 1) {
			navigateToPage(currentPage - 1);
		}
	});

	document.getElementById('nextButton').addEventListener('click', () => {
		currentPage++;
		navigateToPage(currentPage);
	});
});
