// Initial chart data and configuration for expenses
const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Groceries', 'Transport', 'Entertainment', 'Utilities', 'Others'],
        datasets: [{
            data: [500, 300, 200, 150, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
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
                text: 'Expense Breakdown by Category'
            }
        }
    }
});

// Handle adding a new expense
const expenseForm = document.getElementById('expenseForm');
const expenseTableBody = document.getElementById('expenseTableBody');
let totalExpenses = 3456.78;

expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const expenseSource = document.getElementById('expenseSource').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const currentDate = new Date().toISOString().split('T')[0];

    // Update table
    const newRow = `
         <tr class="border-b">
             <td class="p-2">${currentDate}</td>
             <td class="p-2">${expenseSource}</td>
             <td class="p-2 text-red-600">-$${expenseAmount.toFixed(2)}</td>
         </tr>
     `;
    expenseTableBody.insertAdjacentHTML('beforeend', newRow);

    // Update chart
    expenseChart.data.labels.push(expenseSource);
    expenseChart.data.datasets[0].data.push(expenseAmount);
    expenseChart.update();

    // Update total expenses
    totalExpenses += expenseAmount;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;

    // Clear the form
    expenseForm.reset();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});