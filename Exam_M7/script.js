let cars = [];
let editingIndex = -1;

const carForm = document.getElementById('carForm');
const carTableBody = document.getElementById('carTableBody');
const carTableContainer = document.getElementById('carTableContainer');
const emptyState = document.getElementById('emptyState');
const carCount = document.getElementById('carCount');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const yearInput = document.getElementById('year');
const colorInput = document.getElementById('color');
const priceInput = document.getElementById('price');
const engineInput = document.getElementById('engine');
const fuelInput = document.getElementById('fuel');
const mileageInput = document.getElementById('mileage');
const descriptionInput = document.getElementById('description');

document.addEventListener('DOMContentLoaded', function() {
    displayCars();

    carForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
});

function handleFormSubmit(e) {
    e.preventDefault();

    const carData = {
        brand: brandInput.value.trim(),
        model: modelInput.value.trim(),
        year: parseInt(yearInput.value),
        color: colorInput.value,
        price: parseInt(priceInput.value),
        engine: parseFloat(engineInput.value),
        fuel: fuelInput.value,
        mileage: parseInt(mileageInput.value),
        description: descriptionInput.value.trim()
    };

    if (!carData.brand || !carData.model || isNaN(carData.year) || !carData.color ||
        isNaN(carData.price) || isNaN(carData.engine) || !carData.fuel || isNaN(carData.mileage)) {
        showAlert('Barcha maydonlarni to‘ldiring!', 'danger');
        return;
    }

    if (editingIndex === -1) {
        cars.push(carData);
        showAlert('Avtomobil muvaffaqiyatli qo‘shildi!', 'success');
        carForm.reset();
        appendCarRow(carData, cars.length - 1);
        setTimeout(() => {
            const lastRow = carTableBody.lastElementChild;
            if (lastRow) lastRow.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
        updateCarCount();
        carTableContainer.style.display = 'block';
        emptyState.style.display = 'none';
    } else {
        cars[editingIndex] = carData;
        showAlert('Avtomobil ma\'lumotlari yangilandi!', 'success');
        cancelEdit();
        carForm.reset();
        displayCars();
    }
}

function appendCarRow(car, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td>
            <span class="color-badge color-${car.color.replace(/'/g, '').replace(' ', '-').toLowerCase()}"></span>
            ${car.color.charAt(0).toUpperCase() + car.color.slice(1)}
        </td>
        <td class="price-text">$${car.price.toLocaleString()}</td>
        <td>${car.engine} L</td>
        <td>
            <span class="fuel-badge fuel-${car.fuel.toLowerCase()}">${car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1)}</span>
        </td>
        <td>${car.mileage.toLocaleString()} km</td>
        <td>
            <div class="d-flex gap-1">
                <button class="btn btn-success-custom btn-sm" onclick="editCar(${index})" title="Tahrirlash">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger-custom btn-sm" onclick="deleteCar(${index})" title="O'chirish">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-info-custom btn-sm" onclick="showCarDetail(${index})" title="Batafsil">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </td>
    `;
    carTableBody.appendChild(row);
}

function displayCars() {
    updateCarCount();

    if (cars.length === 0) {
        carTableContainer.style.display = 'none';
        emptyState.style.display = 'block';
        carTableBody.innerHTML = '';
        return;
    }

    carTableContainer.style.display = 'block';
    emptyState.style.display = 'none';

    carTableBody.innerHTML = '';

    cars.forEach((car, index) => {
        appendCarRow(car, index);
    });
}

function updateCarCount() {
    carCount.textContent = cars.length;
}

function editCar(index) {
    const car = cars[index];
    editingIndex = index;

    brandInput.value = car.brand;
    modelInput.value = car.model;
    yearInput.value = car.year;
    colorInput.value = car.color;
    priceInput.value = car.price;
    engineInput.value = car.engine;
    fuelInput.value = car.fuel;
    mileageInput.value = car.mileage;
    descriptionInput.value = car.description;

    formTitle.textContent = "Avtomobilni Tahrirlash";
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Yangilash';
    cancelBtn.style.display = 'inline-block';

    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });

    showAlert('Tahrirlash rejimiga o‘tildi', 'info');
}

function cancelEdit() {
    editingIndex = -1;
    carForm.reset();
    formTitle.textContent = "Yangi Avtomobil Qo'shish";
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Saqlash';
    cancelBtn.style.display = 'none';
}

function deleteCar(index) {
    const car = cars[index];

    if (confirm(`Haqiqatan ham "${car.brand} ${car.model}" avtomobilini o‘chirmoqchimisiz?`)) {
        cars.splice(index, 1);
        displayCars();
        showAlert('Avtomobil o‘chirildi!', 'warning');

        if (editingIndex === index) {
            cancelEdit();
        } else if (editingIndex > index) {
            editingIndex--;
        }
    }
}

function addSampleData() {
    const sampleCars = [
        {
            brand: 'Chevrolet',
            model: 'Cobalt',
            year: 2022,
            color: "oq",
            price: 12000,
            engine: 1.5,
            fuel: "benzin",
            mileage: 15000,
            description: "Yangi, toza, birinchi egasi."
        },
        {
            brand: 'Kia',
            model: 'K5',
            year: 2021,
            color: "qora",
            price: 25000,
            engine: 2.0,
            fuel: "benzin",
            mileage: 30000,
            description: "Full komplektatsiya, yangi."
        }
    ];

    cars.push(...sampleCars);
    displayCars();
    showAlert('Demo ma\'lumotlar qo‘shildi!', 'info');
}


function clearAllData() {
    if (cars.length === 0) {
        showAlert('Tozalash uchun ma\'lumot yo‘q!', 'info');
        return;
    }

    if (confirm('Barcha avtomobillarni o‘chirmoqchimisiz?')) {
        cars = [];
        displayCars();
        cancelEdit();
        showAlert('Barcha ma\'lumotlar tozalandi!', 'warning');
    }
}


function showAlert(message, type) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <strong><i class="fas fa-${getAlertIcon(type)}"></i></strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const formSection = document.querySelector('.form-section');
    formSection.parentNode.insertBefore(alertDiv, formSection);

    setTimeout(() => {
        if (alertDiv) {
            alertDiv.remove();
        }
    }, 4000);
}

function getAlertIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'times-circle';
        case 'info': return 'info-circle';
        default: return 'bell';
    }
}

function showCarDetail(index) {
    const car = cars[index];
    const modal = new bootstrap.Modal(document.getElementById('carDetailModal'));
    const content = document.getElementById('carDetailContent');
    content.innerHTML = `
        <div class="car-detail-card">
            <div class="car-detail-row">
                <span class="car-detail-label">Brend:</span>
                <span class="car-detail-value">${car.brand}</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Model:</span>
                <span class="car-detail-value">${car.model}</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Yili:</span>
                <span class="car-detail-value">${car.year}</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Rang:</span>
                <span class="car-detail-value">
                    <span class="color-badge color-${car.color.replace(/'/g, '').replace(' ', '-').toLowerCase()}"></span>
                    ${car.color.charAt(0).toUpperCase() + car.color.slice(1)}
                </span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Narxi:</span>
                <span class="car-detail-value price-text">$${car.price.toLocaleString()}</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Motor:</span>
                <span class="car-detail-value">${car.engine} L</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Yoqilg'i:</span>
                <span class="car-detail-value">
                    <span class="fuel-badge fuel-${car.fuel.toLowerCase()}">${car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1)}</span>
                </span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Yurgan masofa:</span>
                <span class="car-detail-value">${car.mileage.toLocaleString()} km</span>
            </div>
            <div class="car-detail-row">
                <span class="car-detail-label">Qo'shimcha:</span>
                <span class="car-detail-value">${car.description ? car.description : '-'}</span>
            </div>
        </div>
    `;
    modal.show();
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (document.activeElement.closest('#carForm')) {
            carForm.dispatchEvent(new Event('submit'));
        }
    }
    if (e.key === 'Escape' && editingIndex !== -1) {
        cancelEdit();
    }
});

window.editCar = editCar;
window.deleteCar = deleteCar;
window.addSampleData = addSampleData;
window.clearAllData = clearAllData;
window.showCarDetail = showCarDetail;