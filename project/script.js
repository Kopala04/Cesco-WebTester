// Set the date line to the first day of the current month.
const asOfDate = document.getElementById("as-of-date");

if (asOfDate) {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const year = now.getFullYear();
	asOfDate.textContent = `(01.${month}.${year} მდგომარეობით)`;
}

// Show results only when both inputs are filled and match a record.
const searchBtn = document.getElementById("searchBtn");
const resultsSection = document.getElementById("resultsSection");
const dataUrl = "./assets/data.json";
let records = [];

const loadRecords = async () => {
	if (records.length) {
		return records;
	}

	if (Array.isArray(window.RECORDS) && window.RECORDS.length) {
		records = window.RECORDS;
		return records;
	}

	try {
		const response = await fetch(dataUrl);
		if (response.ok) {
			records = await response.json();
		}
	} catch (error) {
		records = [];
	}

	return records;
};

const updateResultRow = (record) => {
	const photo = document.getElementById("resultPhoto");
	const surname = document.getElementById("resultSurname");
	const name = document.getElementById("resultName");
	const birth = document.getElementById("resultBirth");
	const districtLabel = document.getElementById("resultDistrictLabel");
	const districtTime = document.getElementById("resultDistrictTime");
	const address = document.getElementById("resultAddress");
	const actualAddress = document.getElementById("resultActualAddress");
	const actualLocation = document.getElementById("resultActualLocation");

	if (photo) {
		photo.src = `./assets/${record.photo || "profile.svg"}`;
	}
	if (surname) {
		surname.textContent = record.surname;
	}
	if (name) {
		name.textContent = record.firstName;
	}
	if (birth) {
		birth.textContent = record.birthDate;
	}
	if (districtLabel) {
		districtLabel.textContent = record.districtLabel;
	}
	if (districtTime) {
		districtTime.textContent = record.districtTime;
	}
	if (address) {
		address.textContent = record.address;
	}
	if (actualAddress) {
		actualAddress.textContent = record.actualAddress;
	}
	if (actualLocation) {
		actualLocation.textContent = record.actualLocation;
	}
};

if (searchBtn && resultsSection) {
	searchBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const input1 = document.getElementById("personalNumber").value.trim();
		const input2 = document.getElementById("captchaInput").value.trim();

		if (input1 === "" || input2 === "") {
			return;
		}

		const data = await loadRecords();
		const match = data.find(
			(item) =>
				String(item.id).trim() === input1 &&
				String(item.surname).trim().toLowerCase() === input2.toLowerCase()
		);

		if (match) {
			updateResultRow(match);
			resultsSection.style.display = "block";
		}
	});
}
