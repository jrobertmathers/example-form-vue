import {
	barangays,
	municipalities,
	provinces,
	regions,
} from './data/addresses.js';

const handlingRegistration = {
	data() {
		return {
			message: '',
			isValid: false,
			regions: regions,
			customers: [],
			provinces: [],
			municipalities: [],
			barangays: [],
			customerDetails: {},
		};
	},
	methods: {
		verifyEmail: function () {
			if (!this.customerDetails.email.includes('.com')) {
				this.message =
					'Invalid email format. Please enter a valid email address. Example: testemail@example.com';
			} else {
				this.message = 'You entered a valid email!';
			}
			this.isValid = !this.isValid;
		},
		showProvinces: function () {
			this.provinces = provinces.filter((item) => {
				if (item.regCode === this.customerDetails.region) {
					return item;
				}
			});
		},
		showMunicipalities: function () {
			this.municipalities = municipalities.filter((item) => {
				if (item.provCode === this.customerDetails.province) {
					return item;
				}
			});
		},
		showBarangays: function () {
			this.barangays = barangays.filter((item) => {
				if (item.citymunCode === this.customerDetails.city) {
					return item;
				}
			});
		},
		saveCustomer: function () {
			if (Object.keys(this.customerDetails).length > 0) {
				this.customers.push(this.customerDetails);
				localStorage.setItem(
					'customers',
					JSON.stringify(this.customers)
				);
				this.customerDetails = {};
				this.message = '';
				isValid = false;
			}
		},
	},
	created() {
		if (localStorage.getItem('customers')) {
			this.customers = JSON.parse(localStorage.getItem('customers'));
		}
	},
};

Vue.createApp(handlingRegistration).mount('#app');
