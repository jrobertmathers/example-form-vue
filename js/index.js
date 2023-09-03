/**
 * @desc Fetch regions then populate the data to region selector
 */
fetch('../data/regions.json')
	.then((res) => res.json())
	.then((data) => populateRegions(data));
/**
 * @desc Fetch all the regions, provinces, cities, municipalities and barangays in the Philippines
 */
const getPhilippinePlaces = () => {
	return fetch(
		'../data/philippine_provinces_cities_municipalities_and_barangays_2019v2.json'
	)
		.then((res) => res.json())
		.then((data) => data.data);
};

function populateRegions({ regions }) {
	const regionSelect = document.getElementById('region');

	regions.forEach((v) => {
		regionSelect.options.add(new Option(v.region, v.region));
	});
}

const showProvince = async (e) => {
	// remove disabled property
	const provinceSelect = document.getElementById('province');
	provinceSelect.removeAttribute('disabled');
	//
	const data = await getPhilippinePlaces();
	// find by selected province
	const provinceData = data.find(
		(item) => item.region_code === e.target.value
	);

	const provinceList = provinceData.province_list;

	for (key in provinceList) {
		provinceSelect.options.add(new Option(key, key));
	}
};

const showMunicipality = async (e) => {
	const selectedRegion = document.getElementById('region').value;
	const selectedProvince = document.getElementById('province').value;

	const municipalitySelect = document.getElementById('city');
	municipalitySelect.removeAttribute('disabled');
	//
	const data = await getPhilippinePlaces();
	// find by selected province
	const provinceData = data.find(
		(item) => item.region_code === selectedRegion
	);

	const municipalityList =
		provinceData.province_list[`${selectedProvince}`].municipality_list;

	for (key in municipalityList) {
		municipalitySelect.options.add(new Option(key, key));
	}
};

const showBarangay = async (e) => {
	const selectedRegion = document.getElementById('region').value;
	const selectedProvince = document.getElementById('province').value;
	const selectedMunicipality = document.getElementById('city').value;

	const barangaySelect = document.getElementById('barangay');
	barangaySelect.removeAttribute('disabled');
	//
	const data = await getPhilippinePlaces();
	// find by selected province
	const provinceData = data.find(
		(item) => item.region_code === selectedRegion
	);

	const barangayList =
		provinceData.province_list[`${selectedProvince}`].municipality_list[
			`${selectedMunicipality}`
		].barangay_list;

	barangayList.forEach((v) => {
		barangaySelect.options.add(new Option(v, v));
	});
};
