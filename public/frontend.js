/* eslint-disable no-undef */
/* eslint-disable func-names */
function showErrorToast(message) {
    const errorToast = document.getElementById('errorToast');
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast(errorToast);
    toast.show();

    document.getElementById('errorToastBody').innerHTML = message;
}

async function apiRequest(url, method, data) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return {
        response: await response.json(),
        status: response.status,
    };
}

// Open warehouse modal
const openWarehouseModalBtns = document.querySelectorAll(
    'button[name="openWarehouseModal"]'
);
openWarehouseModalBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const type = btn.getAttribute('data-toggle');
        const myModal = new bootstrap.Modal(
            document.getElementById('warehouseModal')
        );

        if (type === 'create') {
            document.getElementById('warehouseModalLabel').innerHTML =
                'Create new warehouse';

            document.getElementById('createWarehouseButton').style.display =
                'block';
            document.getElementById('editWarehouseButton').style.display =
                'none';

            document.getElementById('warehouseNameField').value = '';
            // document.getElementById('warehouseStreetField').value = '';
            document.getElementById('warehouseCityField').value = '';
            // document.getElementById('warehousePostalCodeField').value = '';
            // document.getElementById('warehouseAisleField').value = '';
            // document.getElementById('warehouseBinField').value = '';
        } else {
            document.getElementById('warehouseModalLabel').innerHTML =
                'Edit warehouse';

            document.getElementById('createWarehouseButton').style.display =
                'none';
            document.getElementById('editWarehouseButton').style.display =
                'block';

            const data = JSON.parse(btn.getAttribute('warehouse-data'));
            document.getElementById('warehouseNameField').value = data.name;
            // document.getElementById('warehouseStreetField').value =
            //     data.address.street;
            document.getElementById('warehouseCityField').value =
                data.address.city;
            // document.getElementById('warehousePostalCodeField').value =
            //     data.address.postalCode;
            // document.getElementById('warehouseAisleField').value =
            //     data.aisles.rows;
            // document.getElementById('warehouseBinField').value =
            //     data.aisles.binsPerRow;

            document
                .getElementById('editWarehouseButton')
                .setAttribute('warehouse-id', data.id);
        }

        myModal.show();
    });
});

// Edit warehouse event
const editWarehouseBtn = document.getElementById('editWarehouseButton');
editWarehouseBtn.addEventListener('click', async function () {
    const warehouseId = editWarehouseBtn.getAttribute('warehouse-id');
    const result = await apiRequest(`/warehouse/${warehouseId}`, 'PUT', {
        name: document.getElementById('warehouseNameField').value,
        address: {
            // street: document.getElementById('warehouseStreetField').value,
            city: document.getElementById('warehouseCityField').value,
            // province: document.getElementById('warehouseProvinceField').value,
            // postalCode: document.getElementById('warehousePostalCodeField')
            //     .value,
        },
        // aisles: {
        //     rows: document.getElementById('warehouseAisleField').value,
        //     binsPerRow: document.getElementById('warehouseBinField').value,
        // },
    });

    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});

// Create new warehouse event
const createWarehouseBtn = document.getElementById('createWarehouseButton');
createWarehouseBtn.addEventListener('click', async function () {
    const result = await apiRequest('/warehouse/', 'POST', {
        name: document.getElementById('warehouseNameField').value,
        address: {
            city: document.getElementById('warehouseCityField').value,
        },
    });

    if (result.status) {
    window.location.reload();
    }
});

// Delete warehouse event
const deleteWarehouseBtn = document.getElementsByName('deleteWarehouseButton');
deleteWarehouseBtn.forEach((btn) => {
    btn.addEventListener('click', async function () {
        const warehouseId = btn.getAttribute('warehouse-id');
        await apiRequest(`/warehouse/${warehouseId}`, 'DELETE');

        window.location.reload();
    });
});

// Open product modal
const openProductModalBtn = document.querySelectorAll(
    'button[name="openProductModal"]'
);
openProductModalBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        const type = btn.getAttribute('data-toggle');
        const myModal = new bootstrap.Modal(
            document.getElementById('productModal')
        );

        if (type === 'add') {
            document.getElementById('productModalLabel').innerHTML =
                'Add new product';

            document.getElementById('addProductButton').style.display = 'block';
            document.getElementById('editProductButton').style.display = 'none';

            document.getElementById('productBarcodeField').value = '';
            document.getElementById('productBarcodeField').disabled = false;
            document.getElementById('productNameField').value = '';
            document.getElementById('productDescriptionField').value = '';
            document.getElementById('productQuantityField').value = '';
        } else {
            document.getElementById('productModalLabel').innerHTML =
                'Edit product';

            document.getElementById('addProductButton').style.display = 'none';
            document.getElementById('editProductButton').style.display =
                'block';

            const data = JSON.parse(btn.getAttribute('product-data'));
            document.getElementById('productBarcodeField').value = data.barcode;
            document.getElementById('productBarcodeField').disabled = true;
            document.getElementById('productNameField').value = data.name;
            document.getElementById('productDescriptionField').value =
                data.description;
            document.getElementById('productQuantityField').value =
                data.quantity;

            document
                .getElementById('editProductButton')
                .setAttribute('product-id', data.barcode);
        }

        myModal.show();
    });
});

// Add new product event
const addProductButtonBtn = document.getElementById('addProductButton');
addProductButtonBtn.addEventListener('click', async function () {
    const result = await apiRequest('/product/', 'POST', {
        barcode: document.getElementById('productBarcodeField').value,
        name: document.getElementById('productNameField').value,
        description: document.getElementById('productDescriptionField').value,
        quantity: document.getElementById('productQuantityField').value,
    });

    if (result.status) {
        window.location.reload();
    }

    // if (result.status === 200) {
    //     window.location.reload();
    // } else {
    //     showErrorToast(result.response.message);
    // }
});

// Edit product event
const editProductBtn = document.getElementById('editProductButton');
editProductBtn.addEventListener('click', async function () {
    const result = await apiRequest('/product/', 'PATCH', {
        barcode: document.getElementById('productBarcodeField').value,
        name: document.getElementById('productNameField').value,
        description: document.getElementById('productDescriptionField').value,
        quantity: document.getElementById('productQuantityField').value,
    });

    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});

// Delete many products event
let productsToDelete = [];
const deleteProductsCheckboxes = document.querySelectorAll(
    '[name="productDeleteCheckbox"]'
);

function toggleProductAction(checkbox) {
    const productId = checkbox.getAttribute('value');
    const isChecked = checkbox.checked;

    if (isChecked) {
        productsToDelete.push(productId);
    } else {
        productsToDelete = productsToDelete.filter(
            (product) => product !== productId
        );
    }

    if (productsToDelete.length > 0) {
        document.getElementById('deleteProductsButton').disabled = false;
        document.getElementById(
            'deleteProductsButton'
        ).innerHTML = `Delete (${productsToDelete.length})`;
    } else {
        document.getElementById('deleteProductsButton').disabled = true;
        document.getElementById('deleteProductsButton').innerHTML = 'Delete';
    }
}

deleteProductsCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        toggleProductAction(checkbox);
    });
});

const deleteProductsBtn = document.getElementById('deleteProductsButton');
deleteProductsBtn.addEventListener('click', async function () {
    const result = await apiRequest('/product/', 'DELETE', {
        barcodes: productsToDelete,
    });

    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});

// Assign product to warehouse event
const assignBtns = document.querySelectorAll('[name="assignButton"]');
assignBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const productId = btn.getAttribute('product-id');
        document
            .getElementById('assignWarehouseButton')
            .setAttribute('product-id', productId);

        const myModal = new bootstrap.Modal(
            document.getElementById('assignWarehouseModal')
        );

        myModal.show();
    });
});

const assignWarehouseBtn = document.getElementById('assignWarehouseButton');
assignWarehouseBtn.addEventListener('click', async function () {
    const barcode = document
        .getElementById('assignWarehouseButton')
        .getAttribute('product-id');

    const warehouseId = document.getElementById('assignWarehouseSelect').value;

    const result = await apiRequest('/product/location', 'PATCH', {
        barcode,
        location: {
            warehouseId
        },
    });

    // if (result.status) {
    //     window.location.reload();
    // }
    
    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});
