// Extract the firm name from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const firm = urlParams.get('firm');

if (firm) {
    const clientDashboardLink = document.getElementById('clientDashboardLink');
    clientDashboardLink.href = `./${firm.replace('.com', '')}-client-dashboard.html`;
}
