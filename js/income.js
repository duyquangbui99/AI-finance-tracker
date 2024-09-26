// Initial chart data and configuration
const ctx = document.getElementById('incomeChart').getContext('2d');
let incomeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Salary', 'Freelance', 'Investments'],
        datasets: [{
            label: 'Income Sources',
            data: [3000, 1500, 265.43],
            backgroundColor: ['#36A2EB', '#4BC0C0', '#9966FF']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Income Breakdown by Source'
            }
        }
    }
});

// Handle adding a new income
const incomeForm = document.getElementById('incomeForm');
const incomeTableBody = document.getElementById('incomeTableBody');
let totalIncome = 8765.43;

incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const incomeSource = document.getElementById('incomeSource').value;
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
    const currentDate = new Date().toISOString().split('T')[0];

    // Update table
    const newRow = `
        <tr class="border-b">
            <td class="p-2">${currentDate}</td>
            <td class="p-2">${incomeSource}</td>
            <td class="p-2 text-green-600">+${incomeAmount.toFixed(2)}</td>
        </tr>
    `;
    incomeTableBody.insertAdjacentHTML('beforeend', newRow);

    // Update chart
    incomeChart.data.labels.push(incomeSource);
    incomeChart.data.datasets[0].data.push(incomeAmount);
    incomeChart.update();

    // Update total income
    totalIncome += incomeAmount;
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;

    // Clear the form
    incomeForm.reset();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});